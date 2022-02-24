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
 *
 * This prevents blocks loading that could break app.
 *
 * @return array
 */
function appp_get_allowed_blocks() {
	return array(
		'core/heading',
		'core/list',
		'core/paragraph',
		'core/cover',
		'core/image',
		'core/gallery',
		'core/quote',
		'core/pullquote',
		'core/verse',
		'core/buttons',
		'core/button',
		'core/separator',
		'core/social-links',
		'core/text-columns',
		'core/columns',
		'core/column',
		'core/audio',
		'core/video',
		'core/code',
		'core/page-list',
		'core/latest-posts',
		'core/categories',
		'core/table',
		'core/embed',
		'core/group',
		'core/file',
		'core/media-text',
		'core/spacer',
		'core/archives',
		'core/preformatted',
	);
}



function my_acf_init_block_types() {

	// Check function exists.
	if ( function_exists( 'acf_register_block_type' ) ) {

		// register a testimonial block.
		acf_register_block_type(
			array(
				'name'            => 'app',
				'title'           => __( 'App' ),
				'description'     => __( 'App block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/app/app.php',
				'category'        => 'formatting',
				'icon'            => 'smartphone',
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
			)
		);

		// register a testimonial block.
		acf_register_block_type(
			array(
				'name'            => 'view',
				'title'           => __( 'View' ),
				'description'     => __( 'A custom view block.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/app/view.php',
				'category'        => 'formatting',
				'icon'            => 'smartphone',
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
			)
		);
	}
}
add_action( 'acf/init', 'my_acf_init_block_types' );


function appp_allowed_post_type_blocks( $allowed_block_types, $editor_context ) {

	if ( 'app' === $editor_context->post->post_type ) {
		return array(
			'core/paragraph',
			'core/list',
			'core/image',
			'core/buttons',
			'acf/view',
		);
	}

	return $blocks;
}

add_filter( 'allowed_block_types_all', 'appp_allowed_post_type_blocks', 10, 2 );
