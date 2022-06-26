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
				$block['innerBlocks'][ $index ]['attrs']['data']['image_id'] = $block['innerBlocks'][ $index ]['attrs']['data']['image_url'];
				$image = wp_get_attachment_image_src( $block['innerBlocks'][ $index ]['attrs']['data']['image_url'], 'original_image' )[0];
				$block['innerBlocks'][ $index ]['attrs']['data']['image_url'] = empty( $image ) ? APPPRESSER_URL . '/images/image-placeholder.png' : $image;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;
			case 'acf/ion-avatar':
				$block['innerBlocks'][ $index ]['attrs']['data']['image_id'] = $block['innerBlocks'][ $index ]['attrs']['data']['image_url'];
				$avatar = wp_get_attachment_image_src( $block['innerBlocks'][ $index ]['attrs']['data']['image_url'], 'original_image' )[0];
				$block['innerBlocks'][ $index ]['attrs']['data']['image_url'] = empty( $avatar ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $avatar;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;
			case 'acf/ion-thumbnail':
				$block['innerBlocks'][ $index ]['attrs']['data']['image_id'] = $block['innerBlocks'][ $index ]['attrs']['data']['image_url'];
				$thumbnail = wp_get_attachment_image_src( $block['innerBlocks'][ $index ]['attrs']['data']['image_url'], 'original_image' )[0];
				$block['innerBlocks'][ $index ]['attrs']['data']['image_url'] = empty( $thumbnail ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $thumbnail;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;
			case 'acf/container':
				$block['innerBlocks'][ $index ]['attrs']['data']['image_id'] = $block['innerBlocks'][ $index ]['attrs']['data']['background_image'];
				$image = wp_get_attachment_image_src( $block['innerBlocks'][ $index ]['attrs']['data']['background_image'], 'original_image' )[0];
				$block['innerBlocks'][ $index ]['attrs']['data']['background_image_url'] = empty( $image ) ? '' : $image;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;
			case 'acf/ion-item':
				$block['innerBlocks'][ $index ]['attrs']['data']['image_id'] = $block['innerBlocks'][ $index ]['attrs']['data']['icon_thumbnail'];
				$thumbnail = wp_get_attachment_image_src( $block['innerBlocks'][ $index ]['attrs']['data']['icon_thumbnail'], 'original_image' )[0];
				$block['innerBlocks'][ $index ]['attrs']['data']['thumbnail_url'] = empty( $thumbnail ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $thumbnail;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
				break;
			case 'acf/breadcrumbs':
				// error_log( print_r( $block['innerBlocks'][$index], true ) );

				// Creates an array from integer so we can loop through ACF data that isnt an array. 
				$bcrumbs     = range( 0, ( $block['innerBlocks'][ $index ]['attrs']['data']['breadcrumb'] - 1 ) );
				$breadcrumbs = array();

				foreach ( $bcrumbs as $breadcrumb ) {

					$breadcrumbs[] = array(
						'title' => $block['innerBlocks'][ $index ]['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_title' ],
						'link'  => $block['innerBlocks'][ $index ]['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_link' ],
						'icon'  => $block['innerBlocks'][ $index ]['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_icon' ],
					);

				}

				$block['innerBlocks'][ $index ]['attrs']['data']['breadcrumbs'] = $breadcrumbs;

				break;
			case 'acf/segment':
				// Creates an array from integer so we can loop through ACF data that isnt an array. 
				$segs     = range( 0, ( $block['innerBlocks'][ $index ]['attrs']['data']['segments'] - 1 ) );
				$segments = array();

				foreach ( $segs as $segment ) {

					$segments[] = array(
						'label' => $block['innerBlocks'][ $index ]['attrs']['data'][ 'segments_' . $segment . '_label' ],
					);

				}

				$block['innerBlocks'][ $index ]['attrs']['data'] = array( 'segments' => $segments );

				break;

			default:
				break;
		}
	}

	return $block;
}
