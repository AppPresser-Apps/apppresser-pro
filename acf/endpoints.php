<?php


/**
 * Register acf feilds endpoint.
 */
function appp_app_endpoints() {

	register_rest_route(
		'apppresser/v1',
		'/fields/endpoints',
		array(
			'methods'             => 'GET',
			'permission_callback' => '__return_true',
			'callback'            => 'appp_get_endpoints_data',
		)
	);

	register_rest_route(
		'apppresser/v1',
		'/app/(?P<id>\d+)',
		array(
			'methods'             => 'GET',
			'permission_callback' => '__return_true',
			'callback'            => 'appp_get_app_data',
			'args'                => array(
				'id' => array(
					'validate_callback' => function( $param, $request, $key ) {
						return is_numeric( $param );
					},
				),
			),
		),
	);

}
add_action( 'rest_api_init', 'appp_app_endpoints' );

/**
 * Returns app data endpoints.
 *
 * @param WP_Rest_Request $request
 * @return void
 */
function appp_get_endpoints_field( $request ) {

	$url    = $request->get_param( 'base_url' );
	$postID = $request->get_param( 'post_id' );

	$data = array();

	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() == 'rest_api' ) :

				$base_url = get_sub_field( 'base_url' );

				$post = get_post( $postID );

				if ( $url === $base_url ) {
					$data['url']         = $base_url;
					$data['endpoints'][] = get_sub_field( 'rest_api_endpoints' );
				}

			endif;

			// End loop.
		endwhile;

		// No value.
	else :
		// Do something...
	endif;

	return $data;

}

/**
 * Undocumented function
 *
 * @return void
 */
function appp_get_endpoints_data() {

	$data = array();

	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() == 'rest_api' ) :

				$base_url = get_sub_field( 'base_url' );

				$data[ $base_url ] = get_sub_field( 'rest_api_endpoints' );

			endif;

			// End loop.
		endwhile;

		// No value.
	else :
		// Do something...
	endif;

	return $data;
}

function appp_get_app_data( $request ) {

	$param  = $request->get_param( 'id' );
	$post   = get_post( $param );
	$blocks = parse_blocks( $post->post_content );

	$arr = array();

	foreach ( $blocks as $index => $block ) {

		if ( ! empty( $blocks[ $index ]['blockName'] ) ) {
			$block = appp_format_block_data( $block );
			unset( $block['innerHTML'] );
			unset( $block['innerContent'] );
			$arr[] = $block;
		}
	}

	$app = array(
		'theme_colors' => appp_get_theme_colors( $param ),
		'blocks'       => (array) $arr,
	);

	return $app;
}

function appp_format_block_data( $block ) {

	foreach ( $block['innerBlocks'] as $index => $inner_block ) {
		switch ( $inner_block['blockName'] ) {
			case 'acf/ion-image':
				$block['innerBlocks'][$index]['attrs']['data']['image_id'] = $block['innerBlocks'][$index]['attrs']['data']['image_url'];
				$block['innerBlocks'][$index]['attrs']['data']['image_url'] = wp_get_attachment_image_src( $block['innerBlocks'][$index]['attrs']['data']['image_url'], 'original_image' )[0];
				error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;

			default:
				break;
		}
	}

	return $block;
}
