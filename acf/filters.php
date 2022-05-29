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
 * Filters the icon acf field with dynamic choices.
 *
 * @param array $field
 * @return array
 */
function appp_acf_dynamic_icons( $field ) {

	if ( 0 !== strpos( $field['name'], 'icon' ) ) {
		return $field;
	}

	$icons = array(
		'accessibility'         => 'Accessibility',
		'accessibility-outline' => 'Accessibility Outline',
		'accessibility-sharp'   => 'Accessibility Sharp',
		'add-circle'            => 'Add Circle',
		'add-circle-outline'    => 'Add Circle Outline',
		'add-circle-sharp'      => 'Add Circle Sharp',
		'add'                   => 'Add',
		'add-outline'           => 'Add Outline',
		'add-sharp'             => 'Add Sharp',
		'airplane'              => 'Airplane',
		'airplane-outline'      => 'Airplane Outline',
		'airplane-sharp'        => 'Airplane Sharp',
		'alarm'                 => 'Alarm',
		'alarm-outline'         => 'Alarm Outline',
		'alarm-sharp'           => 'Alarm Sharp',
		'albums'                => 'Albums',
		'albums-outline'        => 'Albums Outline',
		'albums-sharp'          => 'Albums sharp',
		'alert'                 => 'Alert',
		'alert-sharp'           => 'Alert Sharp',
		'alert-circle'          => 'Alert Circle',
		'alert-circle-outline'  => 'Alert Circle Outline',
		'alert-circle-sharp'    => 'Alert Circle Sharp',
		'heart-outline'         => 'Heart Outline',
		'location-outline'      => 'Location Outline',
	);

	$field['choices'] = array( 0 => '(None)' );
	foreach ( $icons as $icon => $value ) {
		$field['choices'][ $icon ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_icons' );

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
		error_log( print_r( $block, true ) );
	}
	return $block_content;
}
add_filter( 'render_block', 'appp_block_wrapper', 10, 2 );
