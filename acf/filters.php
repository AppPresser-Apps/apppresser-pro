<?php
/**
 * Only show acf to admins
 *
 * @param boolean $show
 * @return boolean
 */
function appp_acf_show_admin( $show ) {
	return current_user_can( 'update_core' );
}
add_filter( 'acf/settings/show_admin', 'appp_acf_show_admin' );


/**
 * Filters the color acf field with dynamic choices.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_colors( $field ) {

	global $post;

	$colors = array(
		'primary'   => 'Primary',
		'secondary' => 'Secondary',
		'tertiary'  => 'Tertiary',
		'warning'   => 'Warning',
		'success'   => 'Success',
		'danger'    => 'Danger',
		'dark'      => 'Dark',
		'medium'    => 'Medium',
		'light'     => 'Light',
		'white'     => 'White',
		'black'     => 'Black',
	);

	$colors = apply_filters( 'appp_acf_dynamic_colors', $colors, $post );

	foreach ( $colors as $color => $value ) {
		$field['choices'][ $color ] = $value;
	}

	return $field;
}
add_filter( 'acf/prepare_field/name=color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=background', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=background_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=icon_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=detail_icon_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=label_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=description_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=toolbar_color', 'appp_acf_dynamic_colors' );
add_filter( 'acf/prepare_field/name=color_button', 'appp_acf_dynamic_colors' );


function appp_add_custom_colors_select( $colors, $post ) {

	if ( ! $post ) {
		return array();
	}

	$custom_color = get_field( 'custom_color', $post->ID );

	if ( ! empty( $custom_color ) ) {
		foreach ( $custom_color as $key => $color ) {
			$value            = strtolower( str_replace( ' ', '-', $color['name'] ) );
			$colors[ $value ] = $color['name'];
		}
	}

	return $colors;
}
add_filter( 'appp_acf_dynamic_colors', 'appp_add_custom_colors_select', 10, 2 );

/**
 * Filters the action acf field with dynamic choices.
 * The value should be the naem of the function to run when the button is clicked.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_action( $field ) {

	$actions = array(
		'none'         => 'None',
		'router_push'  => 'Navigate to View',
		'router_back'  => 'Navigate Back',
		'alert'        => 'Alert Message',
		'external_url' => 'External URL',
		'internal_url' => 'Internal URL',
		'popover'      => 'Popover',
		'action_sheet' => 'Action Sheet',
		'modal'        => 'Modal',
		'auth_null'    => 'Unauthenticate',
		'custom'       => 'Custom Function',
	);

	$actions = apply_filters( 'appp_acf_dynamic_action', $actions );

	foreach ( $actions as $action => $value ) {
		$field['choices'][ $action ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field/name=action', 'appp_acf_dynamic_action' );

/**
 * Filters the action acf field with dynamic choices.
 * The value should be the naem of the function to run when the button is clicked.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_sheet_action( $field ) {

	$actions = array(
		'none'         => 'None',
		'router_push'  => 'Navigate to View',
		'router_back'  => 'Navigate Back',
		'alert'        => 'Alert Message',
		'external_url' => 'External URL',
		'internal_url' => 'Internal URL',
		'auth_null'    => 'Unauthenticate',
		'custom'       => 'Custom Function',
	);

	$actions = apply_filters( 'appp_acf_dynamic_sheet_action', $actions );

	foreach ( $actions as $action => $value ) {
		$field['choices'][ $action ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field/name=sheet_action', 'appp_acf_dynamic_sheet_action' );

/**
 * Filters the action acf field with dynamic choices.
 * The value should be the naem of the function to run when the button is clicked.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_action_sheet( $field ) {

	global $post;

	$sheets = array(
		'none' => 'None',
	);

	if ( $post ) {
		$blocks = parse_blocks( $post->post_content );

		foreach ( $blocks as $block ) {

			if ( ! empty( $block['blockName'] ) ) {

				if ( 'acf/action-sheet' === $block['blockName'] ) {
					$name            = $block['attrs']['data']['name'];
					$sheets[ $name ] = $name;
				}
			}
		}
	}

	$actions = apply_filters( 'appp_acf_dynamic_action_sheet', $sheets );

	foreach ( $sheets as $sheet => $value ) {
		$field['choices'][ $sheet ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field/name=action_sheet', 'appp_acf_dynamic_action_sheet' );

/**
 * Filters the database acf field with dynamic choices.
 * The value should be the naem of the function to run when the button is clicked.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_database( $field ) {

	if ( 0 !== strpos( $field['name'], 'app_database' ) ) {
		return $field;
	}

	$field['choices']['none'] = 'None';

	$args = array(
		'post_type'   => 'datatable',
		'numberposts' => -1,
	);

	$posts = get_posts( $args );

	foreach ( $posts as $key => $value ) {

		$type = get_field( 'database_type', $value->ID );

		if ( 'database' === $type ) {
			$field['choices'][ $value->ID ] = $value->post_title;
		}
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_database' );

/**
 * Undocumented function
 *
 * @param [type] $value
 * @param [type] $post_id
 * @param [type] $field
 * @param [type] $original
 * @return void
 */
function appp_acf_update_value( $value, $post_id, $field, $original ) {

	if ( 'data_response' === $field['name'] ) {
		$value = '';
	}

	return $value;
}
add_filter( 'acf/update_value', 'appp_acf_update_value', 10, 4 );

/**
 * Updates the layout label to include first feild value.
 * Hack to label what is inside the repeatable layout.
 *
 * @param string  $title
 * @param object  $field
 * @param array   $layout
 * @param integer $i
 * @return string
 */
function appp_filter_rest_api_layout_label( $title, $field, $layout, $i ) {

	if ( 'rest_api' === $layout['name'] ) {

		$key   = $layout['sub_fields'][0]['key'];
		$value = get_sub_field( $key );

		// error_log( print_r( $key, true ) );
		// error_log( print_r( $value, true ) );

		return $title . ' - ' . $value;

	}

	return $title;
}
add_filter( 'acf/fields/flexible_content/layout_title/name=integration', 'appp_filter_rest_api_layout_label', 10, 4 );

/**
 * Formats the rest api select to show correct endpoints for chosen api resource.
 *
 * @param array $field
 * @return void
 */
function appp_filter_rest_api_select( $field ) {

	$field['choices']['none'] = 'None';

	$args = array(
		'post_type'   => 'datatable',
		'numberposts' => -1,
	);

	$posts = get_posts( $args );

	foreach ( $posts as $key => $value ) {

		$type = get_field( 'database_type', $value->ID );

		if ( 'external' === $type ) {
			$field['choices'][ $value->ID ] = $value->post_title;
		}
	}

	return $field;
}
add_filter( 'acf/load_field/name=data_source', 'appp_filter_rest_api_select', 0, 1 );


/**
 * Formats the rest api select to show correct endpoints for chosen api resource.
 *
 * @param array $field
 * @return void
 */
function appp_filter_database_select( $field ) {

	$field['choices']['none'] = 'None';

	$args = array(
		'post_type'   => 'datatable',
		'numberposts' => -1,
	);

	$posts = get_posts( $args );

	foreach ( $posts as $key => $value ) {

		$type = get_field( 'database_type', $value->ID );

		if ( 'database' === $type ) {
			$field['choices'][ $value->ID ] = $value->post_title;
		}
	}

	return $field;
}
add_filter( 'acf/load_field/name=database_source', 'appp_filter_database_select', 0, 1 );

/**
 * Formats the rest api select to show correct endpoints for chosen api resource.
 *
 * @param array $field
 * @return void
 */
function appp_filter_simple_table_select( $field ) {

	$field['choices']['none'] = 'None';

	$args = array(
		'post_type'   => 'datatable',
		'numberposts' => -1,
	);

	$posts = get_posts( $args );

	foreach ( $posts as $key => $value ) {

		$type = get_field( 'database_type', $value->ID );

		if ( 'simple' === $type ) {
			$field['choices'][ $value->ID ] = $value->post_title;
		}
	}

	return $field;
}
add_filter( 'acf/load_field/name=simple_table', 'appp_filter_simple_table_select', 0, 1 );

/**
 * Formats the rest api select to show correct endpoints for chosen api resource.
 *
 * @param array $field
 * @return void
 */
function appp_filter_formatting_select( $field ) {

	$options = array(
		'none'      => 'None',
		'date'      => 'Format Date',
		'uppercase' => 'Uppercase',
		'lowercase' => 'Lowercase',
	);

	$options = apply_filters( 'appp_filter_formatting_select', $options );

	foreach ( $options as $option => $value ) {
		$field['choices'][ $option ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field/name=formatting', 'appp_filter_formatting_select', 0, 1 );

function appp_acf_dynamic_segments( $field ) {

	global $post;

	if ( 'segment' === $field['name'] ) {

		$choices = array(
			'none' => 'None',
		);

		if ( $post ) {
			$blocks = parse_blocks( $post->post_content );

			foreach ( $blocks as $block ) {
				// error_log( print_r( $block, true ) );

				if ( ! empty( $block['blockName'] ) ) {

					foreach ( $block['innerBlocks'] as $innerBlock ) {

						if ( 'acf/segment' === $innerBlock['blockName'] ) {
							// error_log( print_r( $innerBlock['attrs']['data'], true ) );

							foreach ( range( 0, ( $innerBlock['attrs']['data']['segments'] - 1 ) ) as $key ) {
								$label             = $innerBlock['attrs']['data'][ 'segments_' . $key . '_label' ];
								$choices[ $label ] = $label;
							}
						}
					}
				}
			}
		}

		foreach ( $choices as $choice => $value ) {
			$field['choices'][ $choice ] = $value;
		}
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_segments', 999, 1 );

/**
 * Edit block before render.
 *
 * @param string $block_content
 * @param array  $block
 * @return string
 */
function appp_block_wrapper( $block_content, $block ) {
	if ( $block['blockName'] === 'acf/fetch' ) {

		$block['attrs']['data']['endpoints'] = appp_get_endpoints_data();
		// error_log( print_r( $block, true ) );
	}
	return $block_content;
}
add_filter( 'render_block', 'appp_block_wrapper', 10, 2 );

/**
 * Allow Super Admin to view post when someone else is editing.
 * TODO: enhance this with messages in admin that the post is being editied elsewhere and block saving.
 *
 * @return void
 */
function appp_post_edit_block() {
	if ( is_super_admin() ) {
		add_filter( 'wp_check_post_lock_window', '__return_false' );
		add_filter(
			'heartbeat_settings',
			function( $settings ) {
				return wp_parse_args( array( 'autostart' => false ), $settings );
			}
		);
	}
}
add_action( 'load-post.php', 'appp_post_edit_block' );


/**
* Set Default Value on view route.
*/
add_filter(
	'acf/load_field/name=view_route',
	function ( $field ) {
		$default_value          = '/' . time();
		$field['default_value'] = $default_value;
		return $field;
	}
);
