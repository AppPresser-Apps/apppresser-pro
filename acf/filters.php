<?php

function appp_acf_show_admin( $show ) {
	return current_user_can( 'manage_options' );
}
add_filter( 'acf/settings/show_admin', 'appp_acf_show_admin' );


function appp_acf_dynamic_icons( $field ) {

	if ( 0 !== strpos( $field['name'], 'icon' ) ) {
		return $field;
	}

	$icons = array(
		'heart-outline'    => 'Heart Outline',
		'location-outline' => 'Location Outline',
	);

	$field['choices'] = array( 0 => '(None)' );
	foreach ( $icons as $icon => $value ) {
		$field['choices'][ $icon ] = $value;
	}

	return $field;
}
add_filter( 'acf/load_field', 'appp_acf_dynamic_icons' );


function appp_acf_update_value( $value, $post_id, $field, $original ) {

	if ( 'fetch_result' === $field['name'] ) {
		$value = '';
	}

	return $value;
}
  add_filter( 'acf/update_value', 'appp_acf_update_value', 10, 4 );


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

function appp_filter_rest_api_select( $field ) {

	// Check value exists.
	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() == 'rest_api' ) :
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


function wporg_block_wrapper( $block_content, $block ) {
	if ( $block['blockName'] === 'acf/fetch' ) {

		$block['attrs']['data']['endpoints'] = appp_get_endpoints_data();
		error_log( print_r( $block, true ) );
	}
	return $block_content;
}

add_filter( 'render_block', 'wporg_block_wrapper', 10, 2 );
