<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Include class
 *
 * @return void
 */
function include_field_types_unique_field() {
	include_once APPPRESSER_DIR . 'vendors/acf-unique-id-field/class-acf-field.php';
}
add_action( 'acf/include_field_types', 'include_field_types_unique_field' );
