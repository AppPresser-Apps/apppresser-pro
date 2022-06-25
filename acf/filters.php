<?php
/**
 * Only show acf to admins
 *
 * @param boolean $show
 * @return boolean
 */
function appp_acf_show_admin( $show ) {
	return current_user_can( 'manage_options' );
}
add_filter( 'acf/settings/show_admin', 'appp_acf_show_admin' );


/**
 * Filters the color acf field with dynamic choices.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_colors( $field ) {

	if ( 0 !== strpos( $field['name'], 'color' ) ) {
		return $field;
	}

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
	);

	foreach ( $colors as $color => $value ) {
		$field['choices'][ $color ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_colors' );

/**
 * Filters the action acf field with dynamic choices.
 * The value should be the naem of the function to run when the button is clicked.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_action( $field ) {

	if ( 0 !== strpos( $field['name'], 'action' ) ) {
		return $field;
	}

	$actions = array(
		'none'         => 'None',
		'router_push'  => 'Navigate to Route',
		'router_back'  => 'Navigate Back',
		'alert'        => 'Alert Message',
		'popover'      => 'Popover',
		'action_sheet' => 'Action Sheet',
		'modal'        => 'Modal',
	);

	$actions = apply_filters( 'appp_acf_dynamic_action', $actions );

	foreach ( $actions as $action => $value ) {
		$field['choices'][ $action ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_action' );

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

	if ( 'fetch_result' === $field['name'] ) {
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

	// Check value exists.
	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() === 'rest_api' ) :
				$url                      = get_sub_field( 'base_url' );
				$field['endpoints'][]     = get_sub_field( 'rest_api_endpoints' );
				$field['choices'][ $url ] = $url;
			endif;

			// End loop.
		endwhile;

		// No value.
	else :
		// Do something...
	endif;

	// error_log( print_r( $integration, true ) );
	// error_log( print_r( $field, true ) );

	return $field;
}
add_filter( 'acf/load_field/name=rest_api_source', 'appp_filter_rest_api_select', 0, 1 );

function appp_acf_dynamic_segements( $field ) {

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
add_filter( 'acf/load_field', 'appp_acf_dynamic_segements', 999, 1 );

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
