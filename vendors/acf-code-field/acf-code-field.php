<?php

/*
Plugin Name: Advanced Custom Fields: ACF Code Field
Plugin URI: http://petetasker.com
Description: ACF Code field using Codemirror
Version: 1.8
Author: Peter Tasker
Author URI: http://petetasker.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// 1. set text domain
// Reference: https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
load_plugin_textdomain( 'acf-code-field', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );

define( 'ACFCF_CODEMIRROR_VERSION', 'codemirror-5.23.0' );
define( 'ACFCF_PLUGIN_DIR', dirname( __FILE__ ) );

require_once 'lib/class.acf-code-field-util.php';

// 2. Include field type for ACF5
// $version = 5 and can be ignored until ACF6 exists
function include_field_types_code_field( $version ) {
	include_once 'acf-code-field-v5.php';
}

add_action( 'acf/include_field_types', 'include_field_types_code_field' );


// 3. Include field type for ACF4
function register_fields_code_field() {
	 include_once 'acf-code-field-v4.php';
}

add_action( 'acf/register_fields', 'register_fields_code_field' );


add_action( 'admin_notices', 'acf_check' );

function acf_check() {
	if ( ! class_exists( 'acf' ) && current_user_can( 'manage_options' ) ) {
		$class   = 'notice notice-error';
		$message = sprintf( __( 'Uh-oh. ACF not installed. Please install the <a href="%s" class="thickbox">Advanced Custom Fields plugin.</a>', 'sample-text-domain' ), '/wp-admin/plugin-install.php?tab=plugin-information&plugin=advanced-custom-fields&TB_iframe=true&width=600&height=550' );
		printf( '<div class="%1$s"><p>%2$s</p></div>', $class, $message );
	}
}

/**
 * Enqueue block JavaScript and CSS for the editor
 */
function my_block_plugin_editor_scripts() {

	if ( function_exists( 'acf_get_field_groups' ) ) {

		$dir  = plugin_dir_url( __FILE__ );
		$post = get_page_by_title( 'Advanced', OBJECT, 'acf-field-group' );

		// $acf_field_group = acf_get_field_group( $post->ID );
		$acf_field = acf_get_field( 'javascript', $post->ID );

		// Enqueue block editor styles
		wp_enqueue_style(
			'codemirror-curr-style',
			"{$dir}js/" . ACFCF_CODEMIRROR_VERSION . "/theme/{$acf_field['theme']}.css",
			array( 'wp-edit-blocks' ),
			'1.0.2'
		);
	}

}
add_action( 'enqueue_block_assets', 'my_block_plugin_editor_scripts' );
