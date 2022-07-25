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

	$param = $request->get_param( 'id' );

	$appp_data_transient = get_transient( 'appp_data_transient_' . $param );

	// Get any existing copy of our transient data.
	if ( false === $appp_data_transient ) {

		$post   = get_post( $param );
		$blocks = parse_blocks( $post->post_content );

		$menu       = false;
		$views      = false;
		$modals     = false;
		$onboarding = false;

		// error_log( print_r( $blocks, true ) );

		// array_walk_recursive_array( $blocks, 'appp_format_block_data' );

		// error_log( print_r( $blocks, true ) );

		foreach ( $blocks as $index => &$block ) {

			if ( ! empty( $blocks[ $index ]['blockName'] ) ) {

				unset( $block['innerHTML'] );
				unset( $block['innerContent'] );

				// This recusivley formats all innerBlock sub arrays.
				if ( ! empty( $block ) ) {
					appp_array_walk( $block );
				}

				if ( 'acf/view' === $block['blockName'] ) {
					$views[] = $block;

				}

				if ( 'acf/side-menu' === $block['blockName'] ) {
					$menu = $block;
				}

				if ( 'acf/modal' === $block['blockName'] ) {
					$modals[] = $block;
				}

				if ( 'acf/onboarding' === $block['blockName'] ) {
					$onboarding[] = $block;
				}
			}
		}

		$app = array(
			'theme_colors' => appp_get_theme_colors( $param ),
			'views'        => $views,
			'side_menu'    => $menu,
			'modals'       => $modals,
			'onboarding'   => $onboarding,
		);

		set_transient( 'appp_data_transient_' . $param, $app, 12 * HOUR_IN_SECONDS );

		return $app;

	} else {
		return $appp_data_transient;
	}

}

/**
 * Delete app data transient on app update.
 *
 * @param Integar $id
 * @param Object $post
 * @return void
 */
function appp_delete_transient( $id, $post ) {
	if ( 'app' === $post->post_type ) {
		delete_transient( 'appp_data_transient_' . $id );
	}
}
add_action( 'post_updated', 'appp_delete_transient', 10, 2 );

/**
 * Formats each innerBlocks nested array recursivley.
 *
 * @param array $block
 * @return void
 */
function appp_array_walk( &$block ) {

	if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) ) {

		foreach ( $block['innerBlocks'] as &$value ) {

			$value = appp_format_block_data( $value );

			if ( isset( $value['innerBlocks'] ) && ! empty( $value['innerBlocks'] ) ) {

				appp_array_walk( $value );
			}
		}
	}
}

/**
 * Formats each ACF block data to fit ionic component app data.
 *
 * @param array $block
 * @return array
 */
function appp_format_block_data( $block ) {

	if ( ! isset( $block['blockName'] ) ) {
		return $block;
	}

	switch ( $block['blockName'] ) {
		case 'acf/ion-image':
			if ( isset( $block['attrs']['data']['image_url'] ) ) {
				$block['attrs']['data']['image_id']  = $block['attrs']['data']['image_url'];
				$image                               = wp_get_attachment_image_src( $block['attrs']['data']['image_url'], 'original_image' )[0];
				$block['attrs']['data']['image_url'] = empty( $image ) ? APPPRESSER_URL . '/images/image-placeholder.png' : $image;
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
			}
			// error_log( print_r( $block, true ) );
			break;
		case 'acf/ion-avatar':
			if ( isset( $block['attrs']['data']['image_url'] ) ) {
				$block['attrs']['data']['image_id']  = $block['attrs']['data']['image_url'];
				$avatar                              = wp_get_attachment_image_src( $block['attrs']['data']['image_url'], 'original_image' );
				$block['attrs']['data']['image_url'] = empty( $avatar[0] ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $avatar[0];
				// error_log( print_r( $block, true ) );
			}
			break;
		case 'acf/ion-thumbnail':
			if ( isset( $block['attrs']['data']['image_url'] ) ) {
				$block['attrs']['data']['image_id']  = $block['attrs']['data']['image_url'];
				$thumbnail                           = wp_get_attachment_image_src( $block['attrs']['data']['image_url'], 'original_image' );
				$block['attrs']['data']['image_url'] = empty( $thumbnail[0] ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $thumbnail[0];
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
			}
			break;
		case 'acf/container':
			if ( isset( $block['attrs']['data']['background_image'] ) ) {
				$block['attrs']['data']['image_id'] = $block['attrs']['data']['background_image'];
				$image                              = wp_get_attachment_image_src( $block['attrs']['data']['background_image'], 'original_image' );
				$block['attrs']['data']['background_image_url'] = empty( $image[0] ) ? '' : $image[0];
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
			}
			break;
		case 'acf/ion-item':
			if ( isset( $block['attrs']['data']['icon_thumbnail'] ) ) {
				$block['attrs']['data']['image_id']      = $block['attrs']['data']['icon_thumbnail'];
				$thumbnail                               = wp_get_attachment_image_src( $block['attrs']['data']['icon_thumbnail'], 'original_image' );
				$block['attrs']['data']['thumbnail_url'] = empty( $thumbnail[0] ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $thumbnail[0];
				// error_log( print_r( $block['innerBlocks'][$index], true ) );
			}
			break;
		case 'acf/breadcrumbs':
			// error_log( print_r( $block['innerBlocks'][$index], true ) );

			// Creates an array from integer so we can loop through ACF data that isnt an array.
			$bcrumbs     = range( 0, ( $block['attrs']['data']['breadcrumb'] - 1 ) );
			$breadcrumbs = array();

			foreach ( $bcrumbs as $breadcrumb ) {

				$breadcrumbs[] = array(
					'title' => $block['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_title' ],
					'link'  => $block['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_link' ],
					'icon'  => $block['attrs']['data'][ 'breadcrumb_' . $breadcrumb . '_icon' ],
				);

			}

			$block['attrs']['data']['breadcrumbs'] = $breadcrumbs;

			break;
		case 'acf/segment':
			// Creates an array from integer so we can loop through ACF data that isnt an array.
			$segs     = range( 0, ( $block['attrs']['data']['segments'] - 1 ) );
			$segments = array();

			foreach ( $segs as $segment ) {

				$segments[] = array(
					'label' => $block['attrs']['data'][ 'segments_' . $segment . '_label' ],
				);

			}

			$block['attrs']['data'] = array( 'segments' => $segments );

			break;
	}

	$block = apply_filters( 'appp_format_block_data', $block );

	return $block;
}
