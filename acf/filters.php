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
