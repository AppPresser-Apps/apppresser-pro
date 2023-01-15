<?php


/**
 * Register acf feilds endpoint.
 */
function appp_app_endpoints() {

	register_rest_route(
		'apppresser/v1',
		'/fields/datatable',
		array(
			'methods'             => 'GET',
			'permission_callback' => '__return_true',
			'callback'            => 'appp_get_app_datatable',
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
function appp_get_app_datatable( $request ) {

	$post_ID     = $request->get_param( 'post_id' );
	$data_fields = get_fields( $post_ID );

	$data = array();

	switch ( $data_fields['database_type'] ) {
		case 'local':
			$data['type'] = $data_fields['database_type'];

			$items = array();

			foreach ( $data_fields['local_table']['body'] as $row ) {

				foreach ( $row as $key => $value ) {
					$col           = $data_fields['local_table']['header'][ $key ]['c'];
					$items[ $col ] = $row[ $key ]['c'];
				}
			}

			$data['items'] = $items;

			break;

		case 'external':
			$data['type']       = $data_fields['database_type'];
			$data['url']        = $data_fields['rest_url'];
			$data['headers']    = $data_fields['headers'];
			$data['parameters'] = $data_fields['parameters'];
			break;

		default:
			break;
	}

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

				foreach ( $block['attrs']['data'] as $key => $attr ) {

					$first_character = substr( $key, 0, 1 );

					if ( '_' === $first_character ) {
						unset( $block['attrs']['data'][ $key ] );
					}
				}

				// This recusivley formats all innerBlock sub arrays.
				if ( ! empty( $block ) ) {
					appp_array_walk( $block );
				}

				if ( 'acf/view' === $block['blockName'] ) {
					$block   = appp_format_toolbar( $block );
					$views[] = $block;

				}

				if ( 'acf/side-menu' === $block['blockName'] ) {
					$block = appp_format_toolbar( $block );
					$menu  = $block;
				}

				if ( 'acf/modal' === $block['blockName'] ) {
					$block    = appp_format_toolbar( $block );
					$modals[] = $block;
				}

				if ( 'acf/onboarding' === $block['blockName'] ) {
					$onboarding[] = $block;
				}

				if ( 'acf/popover' === $block['blockName'] ) {
					$popovers[] = $block;
				}

				if ( 'acf/action-sheet' === $block['blockName'] ) {
					$block           = appp_format_block_data( $block );
					$action_sheets[] = $block;
				}

				if ( 'acf/ion-tabs' === $block['blockName'] ) {
					$block    = appp_format_block_data( $block );
					$tabbar[] = $block;
				}
			}
		}

		$app = array(
			'theme_colors'  => appp_get_theme_colors( $param ),
			'theme_globals' => appp_get_theme_globals( $param ),
			'views'         => $views,
			'side_menu'     => $menu,
			'modals'        => $modals,
			'popovers'      => $popovers,
			'action_sheets' => $action_sheets,
			'onboarding'    => $onboarding,
			'tabbar'        => $tabbar,
			'database'      => appp_get_app_database( $param ),
		);

		set_transient( 'appp_data_transient_' . $param, $app, 12 * HOUR_IN_SECONDS );

		return $app;

	} else {
		return $appp_data_transient;
	}

}

function appp_format_toolbar( $block ) {

	// error_log( print_r( $block['attrs']['data'], true ) );

	$lbtns = isset( $block['attrs']['data']['left_buttons'] ) && ! empty( $block['attrs']['data']['left_buttons'] ) ? $block['attrs']['data']['left_buttons'] : array();
	$rbtns = isset( $block['attrs']['data']['right_buttons'] ) && ! empty( $block['attrs']['data']['right_buttons'] ) ? $block['attrs']['data']['right_buttons'] : array();

	$left_buttons  = array();
	$right_buttons = array();

	foreach ( $lbtns as $key => $button ) {

		// error_log( print_r( $button, true ) );

		if ( 'button' === $button ) {
			$left_buttons[] = array(
				'icon'       => $block['attrs']['data'][ 'left_buttons_' . $key . '_icon' ],
				'label'      => $block['attrs']['data'][ 'left_buttons_' . $key . '_label' ],
				'action'     => $block['attrs']['data'][ 'left_buttons_' . $key . '_action' ],
				'route'      => 'router_push' === $block['attrs']['data'][ 'left_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'left_buttons_' . $key . '_route' ] : false,
				'popover'    => 'popover' === $block['attrs']['data'][ 'left_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'left_buttons_' . $key . '_popover' ] : false,
				'modal_item' => 'modal' === $block['attrs']['data'][ 'right_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'right_buttons_' . $key . '_modal_item' ] : false,
				'type'       => $button,
			);
		} else {
			$left_buttons[] = array(
				'icon'  => $block['attrs']['data'][ 'left_buttons_' . $key . '_icon' ],
				'label' => isset( $block['attrs']['data'][ 'left_buttons_' . $key . '_label' ] ) ? $block['attrs']['data'][ 'left_buttons_' . $key . '_label' ] : '',
				'type'  => $block['attrs']['data']['left_buttons'][ $key ],
			);
		}
	}

	foreach ( $rbtns as $key => $button ) {

		$right_buttons[] = array(
			'icon'          => $block['attrs']['data'][ 'right_buttons_' . $key . '_icon' ],
			'label'         => $block['attrs']['data'][ 'right_buttons_' . $key . '_label' ],
			'action'        => $block['attrs']['data'][ 'right_buttons_' . $key . '_action' ],
			'action_sheet'  => $block['attrs']['data'][ 'right_buttons_' . $key . '_action_sheet' ],
			'custom_action' => $block['attrs']['data'][ 'right_buttons_' . $key . '_custom' ],
			'route'         => 'router_push' === $block['attrs']['data'][ 'right_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'right_buttons_' . $key . '_route' ] : false,
			'popover'       => 'popover' === $block['attrs']['data'][ 'right_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'right_buttons_' . $key . '_popover' ] : false,
			'modal_item'    => 'modal' === $block['attrs']['data'][ 'right_buttons_' . $key . '_action' ] ? $block['attrs']['data'][ 'right_buttons_' . $key . '_modal_item' ] : false,
			'type'          => $button,
		);

	}

	if ( isset( $block['attrs']['data']['logo'] ) ) {
		$block['attrs']['data']['logo'] = wp_get_attachment_image_url( $block['attrs']['data']['logo'], 'large' );
	}
	
	$block['attrs']['data']['left_buttons']  = $left_buttons;
	$block['attrs']['data']['right_buttons'] = $right_buttons;

	// error_log( print_r( $left_buttons, true ) );
	// error_log( print_r( $right_buttons, true ) );

	return $block;
}


/**
 * Delete app data transient on app update.
 *
 * @param Integar $id
 * @param Object  $post
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

	if ( isset( $block['attrs']['data'] ) ) {
		foreach ( $block['attrs']['data'] as $key => $attr ) {

			$first_character = substr( $key, 0, 1 );

			if ( '_' === $first_character ) {
				unset( $block['attrs']['data'][ $key ] );
			}
		}
	}

	unset( $block['innerContent'] );
	unset( $block['innerHTML'] );

	switch ( $block['blockName'] ) {
		case 'acf/text':
			if ( isset( $block['attrs']['data']['text'] ) ) {
				$block['attrs']['data']['text'] = $block['attrs']['data']['text'];
			}
			break;
		case 'acf/button':
			break;
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

				$bordertl = $block['attrs']['data']['border_radius_border_radius_top_left'] . 'px';
				$bordertr = $block['attrs']['data']['border_radius_border_radius_top_right'] . 'px';
				$borderbl = $block['attrs']['data']['border_radius_border_radius_bottom_left'] . 'px';
				$borderbr = $block['attrs']['data']['border_radius_border_radius_bottom_right'] . 'px';

				$block['attrs']['data']['border_radius'] = "$bordertl $bordertr $borderbl $borderbr";

				$bordetw = $block['attrs']['data']['border_top_width'] . 'px';
				$bordets = $block['attrs']['data']['border_top_style'];
				$bordetc = $block['attrs']['data']['border_top_color'];

				$block['attrs']['data']['border_top'] = "$bordetw $bordets $bordetc";

				$borderw = $block['attrs']['data']['border_right_width'] . 'px';
				$borders = $block['attrs']['data']['border_right_style'];
				$borderc = $block['attrs']['data']['border_right_color'];

				$block['attrs']['data']['border_right'] = "$borderw $borders $borderc";

				$bordelw = $block['attrs']['data']['border_left_width'] . 'px';
				$bordels = $block['attrs']['data']['border_left_style'];
				$bordelc = $block['attrs']['data']['border_left_color'];

				$block['attrs']['data']['border_left'] = "$bordelw $bordels $bordelc";

				$bordebw = $block['attrs']['data']['border_bottom_width'] . 'px';
				$bordebs = $block['attrs']['data']['border_bottom_style'];
				$bordebc = $block['attrs']['data']['border_bottom_color'];

				$block['attrs']['data']['border_bottom'] = "$bordebw $bordebs $bordebc";

			}

			if ( isset( $block['attrs']['data']['background_gradient_colors'] ) ) {
				// Creates an array from integer so we can loop through ACF data that isnt an array.
				$gradcolors = range( 0, ( $block['attrs']['data']['background_gradient_colors'] - 1 ) );
				$gradients  = array();

				foreach ( $gradcolors as $gradindex ) {
					$gradients[] = $block['attrs']['data'][ 'background_gradient_colors_' . $gradindex . '_color' ];
					unset( $block['attrs']['data'][ 'background_gradient_colors_' . $gradindex . '_color' ] );
				}

				$block['attrs']['data']['background_gradient_colors'] = $gradients;
			}

			break;
		case 'acf/ion-item':
			if ( isset( $block['attrs']['data']['icon_thumbnail'] ) ) {
				$block['attrs']['data']['image_id']      = $block['attrs']['data']['icon_thumbnail'];
				$thumbnail                               = wp_get_attachment_image_src( $block['attrs']['data']['icon_thumbnail'], 'original_image' );
				$block['attrs']['data']['thumbnail_url'] = empty( $thumbnail[0] ) ? APPPRESSER_URL . '/images/avatar-placeholder.png' : $thumbnail[0];
			}

			if ( 'select' === $block['attrs']['data']['input_type'] ) {

				$soptions = preg_split( "/\r\n|\n|\r/", $block['attrs']['data']['select_options'] );

				$options = array();

				foreach ( $soptions as $key ) {

					$option = explode( ':', $key );

					$options[] = array(
						'label' => trim( $option[1] ),
						'value' => trim( $option[0] ),
					);

				}

				$block['attrs']['data']['select_options'] = $options;
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

		case 'acf/repeater':
			$post_id = $block['attrs']['data']['data_source'];

			$fields = get_fields( $post_id );

			if ( 'local' === $fields['database_type'] ) {

				foreach ( $fields['local_table']['body'] as $row ) {

					$cells = array();

					foreach ( $row as $key => $value ) {
						$col           = $fields['local_table']['header'][ $key ]['c'];
						$cells[ $col ] = $row[ $key ]['c'];

					}

					$block['attrs']['data']['local_data'][] = $cells;
				}
			}

			$block['attrs']['data']['data_source'] = $fields;

			break;

		case 'acf/action-sheet':
			$sbuttons = range( 0, ( $block['attrs']['data']['action_buttons_buttons'] - 1 ) );

			$buttons = array();

			foreach ( $sbuttons as $key ) {

				$buttons[] = array(
					'function' => $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_function' ],
					'role'     => $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_role' ],
					'action'   => $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_sheet_action' ],
					'text'     => $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_title' ],
				);

				unset( $block['attrs']['data']['cancel_button'] );
				unset( $block['attrs']['data']['action_buttons_buttons'] );
				unset( $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_function' ] );
				unset( $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_role' ] );
				unset( $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_sheet_action' ] );
				unset( $block['attrs']['data'][ 'action_buttons_buttons_' . $key . '_title' ] );

			}

			$block['attrs']['data']['action_buttons'] = $buttons;

			break;

		case 'acf/form':
			$sinputs  = range( 0, ( $block['attrs']['data']['hidden_inputs'] - 1 ) );
			$sheaders = range( 0, ( $block['attrs']['data']['headers'] - 1 ) );
			$sparams  = range( 0, ( $block['attrs']['data']['parameters'] - 1 ) );

			/**
			 * Format input into array.
			 */
			foreach ( $sinputs as $key ) {

				$name  = $block['attrs']['data'][ 'hidden_inputs_' . $key . '_name' ];
				$value = $block['attrs']['data'][ 'hidden_inputs_' . $key . '_value' ];

				if ( ! empty( $name ) ) {

					$input[] = array(
						'name'  => $name,
						'value' => $value,
					);

					$block['attrs']['data']['hidden_inputs'] = $input;

				} else {
					$block['attrs']['data']['hidden_inputs'] = array();
				}

				unset( $block['attrs']['data'][ 'hidden_inputs_' . $key . '_name' ] );
				unset( $block['attrs']['data'][ 'hidden_inputs_' . $key . '_value' ] );

			}

			/**
			 * Format headers into array.
			 */
			foreach ( $sheaders as $key ) {

				$key   = $block['attrs']['data'][ 'headers_' . $key . '_key' ];
				$value = $block['attrs']['data'][ 'headers_' . $key . '_value' ];

				if ( ! empty( $key ) && ! empty( $value ) ) {

					$param[] = array(
						'key'   => $key,
						'value' => $value,
					);

					$block['attrs']['data']['headers'] = $param;

				} else {
					$block['attrs']['data']['headers'] = array();
				}

				unset( $block['attrs']['data'][ 'headers_' . $key . '_key' ] );
				unset( $block['attrs']['data'][ 'headers_' . $key . '_value' ] );

			}

			/**
			 * Format params into array.
			 */
			foreach ( $sparams as $key ) {

				$key   = $block['attrs']['data'][ 'parameters_' . $key . '_key' ];
				$value = $block['attrs']['data'][ 'parameters_' . $key . '_value' ];

				if ( ! empty( $key ) && ! empty( $value ) ) {

					$param[] = array(
						'key'   => $key,
						'value' => $value,
					);

					$block['attrs']['data']['parameters'] = $param;

				} else {
					$block['attrs']['data']['parameters'] = array();
				}

				unset( $block['attrs']['data'][ 'parameters_' . $key . '_key' ] );
				unset( $block['attrs']['data'][ 'parameters_' . $key . '_value' ] );

			}

			break;

		case 'acf/ion-tabs':

			$stabs  = range( 0, ( $block['attrs']['data']['tabs'] - 1 ) );

			$block['attrs']['data']['tabs'] = array();

				/**
			 * Format params into array.
			 */
			foreach ( $stabs as $key ) {

				$icon  = $block['attrs']['data'][ 'tabs_' . $key . '_icon' ];
				$label = $block['attrs']['data'][ 'tabs_' . $key . '_label' ];
				$route = $block['attrs']['data'][ 'tabs_' . $key . '_route' ];

			
				$param[] = array(
					'icon'  => $icon,
					'label' => $label,
					'route' => $route,
				);

				$block['attrs']['data']['tabs'] = $param;

				unset( $block['attrs']['data'][ 'tabs_' . $key . '_icon' ] );
				unset( $block['attrs']['data'][ 'tabs_' . $key . '_label' ] );
				unset( $block['attrs']['data'][ 'tabs_' . $key . '_route' ] );

			}

			break;
	}

	$block = apply_filters( 'appp_format_block_data', $block );

	return $block;
}
