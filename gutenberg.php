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

	$blocks = acf_get_store( 'block-types' );

	$arr = array();

	foreach ( $blocks->data as $block => $value ) {
		if ( ! empty( $value['parent'] ) ) {
			$arr[] = $block;
		}
	}

	return array_merge(
		array(
			'core/spacer',
		),
		$arr
	);
}

/**
 * Filter blocks available to the view block type.
 *
 * @return array
 */
function appp_get_allowed_view_blocks() {

	$blocks = acf_get_store( 'block-types' );

	$arr = $blocks->data;

	unset( $arr['acf/view'] );
	unset( $arr['acf/modal'] );
	unset( $arr['acf/onboard'] );
	unset( $arr['acf/inner-column'] );

	return array_merge(
		array(
			'core/spacer',
		),
		$arr
	);
}

/**
 * Filter inner blocks available.
 *
 * @return array
 */
function appp_get_allowed_innerblocks() {

	return array(
		'acf/card',
		'acf/button',
		'acf/openweather',
		'acf/ion-image',
		'acf/ion-thumbnail',
		'acf/ion-item',
		'acf/text',
		'acf/ion-chip',
		'acf/ion-avatar',
		'acf/ion-icon',
		'acf/container',
	);
}


/**
 * Whitelist of blocks available to Gutenberg editor.
 *
 * @param array  $allowed_block_types
 * @param object $editor_context
 * @return array
 */
function appp_allowed_post_type_blocks( $allowed_block_types, $editor_context ) {

	if ( 'app' === $editor_context->post->post_type ) {

		$blocks = acf_get_store( 'block-types' );

		$arr = array();

		foreach ( $blocks->data as $block => $value ) {
			if ( empty( $value['parent'] ) ) {
				$arr[] = $block;
			}
		}

		$blocks = array_merge(
			appp_get_allowed_blocks(),
			$arr
		);
	}

	return $blocks;
}

add_filter( 'allowed_block_types_all', 'appp_allowed_post_type_blocks', 10, 2 );


/**
 * Custom block categories.
 *
 * @param array $categories
 * @param WP_Post $post
 * @return array
 */
function appp_block_category( $categories, $post ) {

	$categories = apply_filters( 'appp_filter_block_categories', $categories );

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
			array(
				'slug'  => 'appp_media',
				'title' => __( 'Media', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_text',
				'title' => __( 'Text', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_patterns',
				'title' => __( 'Patterns', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_layout',
				'title' => __( 'Layout', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_data',
				'title' => __( 'Data', 'apppresser' ),
			),
			array(
				'slug'  => 'appp_third_party',
				'title' => __( 'Third Party', 'apppresser' ),
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
				'args'                => array(
					'name' => array(
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
