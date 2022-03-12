<?php

 /**
  * Register AppPresser post fields.
  *
  * WordPress doesnt add block data to api requests so we need to add it during api requests.
  *
  * @return void
  */
function appp_add_blocks_data_rest_api() {

	if ( ! function_exists( 'use_block_editor_for_post_type' ) ) {
		require ABSPATH . 'wp-admin/includes/post.php';
	}

	// Surface all core Gutenberg blocks in the WordPress REST API.
	$post_types = get_post_types_by_support( array( 'editor' ) );

	foreach ( $post_types as $post_type ) {

		if ( use_block_editor_for_post_type( $post_type ) ) {

			register_rest_field(
				$post_type,
				'appp_settings',
				array(
					'get_callback' => function ( array $post ) {

						return get_editor_settings();
					},
				)
			);

			register_rest_field(
				$post_type,
				'appp_blocks',
				array(
					'get_callback' => function ( array $post ) {

						$core_blocks = appp_get_allowed_blocks();

						$blocks = parse_blocks( $post['content']['raw'] );

						$blks = array();

						foreach ( $blocks as $block ) {

							if ( null !== $block['blockName'] && in_array( $block['blockName'], $core_blocks, true ) ) {

								$block = appp_proccess_block( $block );

								$blks[] = $block;
							}
						}

						return $blks;
					},
				)
			);
		}
	}
}
add_action( 'rest_api_init', 'appp_add_blocks_data_rest_api' );

/**
 * Modify blocks during parse.
 *
 * Some blocks dont have any api data as its all done via php on front end.
 * We add the extra data needed to display content in AppPresser.
 *
 * @param array $block
 * @return array
 */
function appp_proccess_block( $block ) {

	switch ( $block['blockName'] ) {
		case 'core/embed':
			$block['embed'] = wp_oembed_get( $block['attrs']['url'] );

			break;
		case 'core/archives':
			$block['links'] = wp_get_archives(
				array(
					'echo'   => false,
					'format' => 'anchor',
				)
			);
			break;

	}

	return $block;

}

/**
 * Returns the theme.json data
 *
 * @return array
 */
function get_editor_settings() {

	$settings = wp_get_global_settings();

	return $settings;

}

/**
 * White listed blocks that can be consumed by AppPresser.
 * This prevents blocks loading that could break app.
 *
 * @return array
 */
function appp_get_allowed_blocks() {
	return array(
		'core/spacer',
		'acf/image',
		'acf/button',
		'acf/list',
		'acf/text',
		'acf/card',
		'acf/repeater',
	);
}

/**
 * Register ACF blocks
 *
 * @return void
 */
function appp_init_block_types() {

	// Check function exists.
	if ( function_exists( 'acf_register_block_type' ) ) {

		// register a view block.
		acf_register_block_type(
			array(
				'name'            => 'view',
				'title'           => __( 'View (empty)' ),
				'description'     => __( 'A custom view block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/view.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'view' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
				// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
			)
		);

		// register a onboard view.
		acf_register_block_type(
			array(
				'name'            => 'onboard',
				'title'           => __( 'OnBoarding' ),
				'description'     => __( 'A custom onboard view.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/onboard.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'component', 'onboard' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
				// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
			)
		);

		// register a button block.
		acf_register_block_type(
			array(
				'name'            => 'button',
				'title'           => __( 'Button' ),
				'description'     => __( 'A custom button block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/button.php',
				'category'        => 'appp_component',
				'icon'            => 'button',
				'keywords'        => array( 'component', 'button' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register a list block.
		acf_register_block_type(
			array(
				'name'            => 'list',
				'title'           => __( 'List' ),
				'description'     => __( 'A custom list block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/list.php',
				'category'        => 'appp_component',
				'icon'            => 'editor-ul',
				'keywords'        => array( 'component', 'list' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register a text block.
		acf_register_block_type(
			array(
				'name'            => 'text',
				'title'           => __( 'Text' ),
				'description'     => __( 'A custom text block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/text.php',
				'category'        => 'appp_component',
				'icon'            => 'editor-paragraph',
				'keywords'        => array( 'component', 'text' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register a card block.
		acf_register_block_type(
			array(
				'name'            => 'card',
				'title'           => __( 'Card' ),
				'description'     => __( 'A custom card block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/card.php',
				'category'        => 'appp_component',
				'icon'            => 'excerpt-view',
				'keywords'        => array( 'component', 'card' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// Begin Create-ACF-Block
		acf_register_block_type(
			array(
				'name'            => 'image',
				'title'           => __( 'Image' ),
				'description'     => __( 'custom image block' ),
				'category'        => 'appp_component',
				'icon'            => 'format-image',
				'keywords'        => array( 'component', 'image' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'className'       => 'appp-image',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/image/block.php',
			)
		);
		acf_register_block_type(
			array(
				'name'            => __( 'repeater' ),
				'title'           => __( 'Repeater' ),
				'description'     => __( 'repeats a child block' ),
				'category'        => 'appp_component',
				'icon'            => 'format-image',
				'keywords'        => array( 'component', 'repeater', 'data' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'className'       => 'appp-repeater',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/repeater/block.php',
			)
		);
		// End Create-ACF-Block

	}
}
add_action( 'acf/init', 'appp_init_block_types' );

/**
 * Whitelist of blocks available to Gutenberg editor.
 *
 * @param array  $allowed_block_types
 * @param object $editor_context
 * @return array
 */
function appp_allowed_post_type_blocks( $allowed_block_types, $editor_context ) {

	if ( 'app' === $editor_context->post->post_type ) {

		$blocks = array_merge(
			appp_get_allowed_blocks(),
			array(
				'acf/view',
				'acf/onboard',
			)
		);
	}

	return $blocks;
}

add_filter( 'allowed_block_types_all', 'appp_allowed_post_type_blocks', 10, 2 );

/**
 * Undocumented function
 *
 * @param [type] $categories
 * @param [type] $post
 * @return void
 */
function appp_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'appp_view',
				'title' => __( 'Views', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_component',
				'title' => __( 'Components', 'apppresser' ),
			),
		)
	);
}
add_filter( 'block_categories_all', 'appp_block_category', 10, 2 );

function remove_wp_block_library_css() {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
}
add_filter( 'wp_enqueue_scripts', 'remove_wp_block_library_css', 100 );

function appp_acf_show_admin( $show ) {
	return current_user_can( 'manage_options' );
}
add_filter( 'acf/settings/show_admin', 'appp_acf_show_admin' );


add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'apppresser/v1',
			'/colors',
			array(
				'method'              => WP_REST_Server::READABLE,
				'callback'            => 'appp_rest_route_colors',
				'permission_callback' => '__return_true',
				'args'                => array(
					'hex' => array(
						'required'          => false,
						'type'              => 'string',
						'validate_callback' => '__return_true',
					),
				),
			)
		);
	}
);

function appp_rest_route_colors( $data ) {
	$hex  = $data->get_param( 'hex' );
	$name = $data->get_param( 'name' );

	$colors = appp_process_colors( '--ion-color-' . $name, $hex );

	return rest_ensure_response( $colors );
}
