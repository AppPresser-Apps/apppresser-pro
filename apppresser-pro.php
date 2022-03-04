<?php
/**
 * Plugin Name:       AppPresser Pro
 * Description:       Functionality for custom AppPresser Apps.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            AppPresser
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       apppresser-pro
 *
 * @package           apppresser
 */

define( 'APPPRESSER_VERSION', '1.0.0' );
define( 'APPPRESSER_PLUGIN_NAME', 'AppPresser Pro' );
define( 'APPPRESSER_DIR', plugin_dir_path( __FILE__ ) );
define( 'APPPRESSER_URL', plugins_url( basename( __DIR__ ) ) );
define( 'APPPRESSER_SLUG', plugin_basename( __FILE__ ) );
define( 'APPPRESSER_FILE', __FILE__ );

require dirname( __FILE__ ) . '/vendors/advanced-custom-fields-pro/acf.php';

require dirname( __FILE__ ) . '/helpers/colors.php';
require dirname( __FILE__ ) . '/post-type.php';
require dirname( __FILE__ ) . '/gutenberg.php';
require dirname( __FILE__ ) . '/acf.php';



add_action(
	'rest_api_init',
	function() {

		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

		add_filter( 'rest_pre_serve_request', 'initCors' );
	},
	15
);


function initCors( $value ) {
	$origin_url = '*';

	header( 'Access-Control-Allow-Origin: ' . $origin_url );
	header( 'Access-Control-Allow-Methods: GET,DELETE,POST,PUT,PATCH,OPTIONS' );
	header( 'Access-Control-Allow-Credentials: true' );
	return $value;
}

// Fixes broken routing on directly linked content.
remove_filter( 'template_redirect', 'redirect_canonical' );

/**
 * Hack to stop the notice of mismatched template because guttenberg will
 * no allow you to lock the parent template and then allow child blocks to be unlocked.
 * If you read this then go to WP git forums and complain about it so its fixed!!!!
 *
 * @return void
 */
function appp_custom_editor_css() {

	echo "
    <style type='text/css'>
	div.editor-template-validation-notice.components-notice.is-warning,
	div.block-editor-block-inspector__advanced,
	div.block-editor-post-preview__dropdown,
	div.interface-more-menu-dropdown {
		display: none !important;
	}
	.is-root-container.block-editor-block-list__layout {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.edit-post-visual-editor__post-title-wrapper {
		padding: 0 20px;
		font-size: 0.8rem;
	}
	.block-editor-inserter {
		position: absolute;
		right: 20px;
		top: -50px;
	}
	.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > * {
		margin-left: 0px !important;
		margin-right: 0px !important;
		margin: 0px !important;
	}
	.edit-post-visual-editor__post-title-wrapper {
		margin-top: 1.5rem;
	}

	.no-iris-picker .wp-picker-input-wrap {
		display: none !important;
	}

	.no-iris-picker .wp-picker-clear {
		display: none !important;
	}
	
	.no-iris-picker.wp-picker-container {
		display: block;
	}
	
	.no-iris-picker .wp-picker-container input[type=text].wp-color-picker {
		outline: 0 !important;
		border: 1px solid #dddddd !important;
		box-shadow: none !important;
		pointer-events: none;
	}
	
	.no-iris-picker .wp-picker-container:active {
		display: block;
	}
	
	.no-iris-picker .iris-picker.iris-border {
		width: 100% !important;
		height: auto !important;
		padding-bottom: 0 !important;
		border: 0;
	}
	
	.no-iris-picker .iris-border .iris-picker-inner {
		display: none;
	}
	
	.no-iris-picker .iris-palette-container {
		position: static !important;
		font-size: 0;
		line-height: 1;
		padding: 3px;
	}
	
	.no-iris-picker .iris-palette {
		border: 3px solid white;
		border-radius: 5px !important;
		box-shadow: inset 0 0 1px black !important;
		display: inline-block;
		float: none !important;
		height: 36.9px !important;
		margin: 0 !important;
		margin-left: 0 !important;
		width: 36.9px !important;
	}
	
	.no-iris-picker .wp-picker-clear {
		display: inline-block !important;
	}
    </style>
    ";
}
add_action( 'admin_footer', 'appp_custom_editor_css', 999 );

if ( is_admin() ) {
	add_filter(
		'enter_title_here',
		function( $input ) {
			if ( 'app' === get_post_type() ) {
				return __( 'App Name', 'appppresser' );
			} else {
				return $input;
			}
		}
	);
}

/**
 * Register editor scripts
 *
 * @return void
 */
function appp_gutenberg_register_files() {

	wp_register_script(
		'appp-block-script',
		APPPRESSER_URL . '/js/block-script.js',
		array( 'wp-blocks', 'wp-edit-post' ),
		'1.1.2',
		true,
	);

	register_block_type(
		'appp/app-block-files',
		array(
			'editor_script' => 'appp-block-script',
		)
	);

}
add_action( 'init', 'appp_gutenberg_register_files' );

function appp_admin_enqueue_scripts( $hook_suffix ) {
	global $typenow;
	if ( ( 'post.php' == $hook_suffix || 'post-new.php' == $hook_suffix ) && $typenow === 'app' ) {
		wp_enqueue_style( 'ionic-css', 'https://cdn.jsdelivr.net/npm/@ionic/core@6.0.10/css/ionic.bundle.css', array(), '1.0.0' );
		wp_enqueue_script( 'ionic-js', 'https://cdn.jsdelivr.net/npm/@ionic/core@6.0.10/dist/ionic/ionic.js', array(), '1.0.0', false );
		wp_enqueue_script( 'ionicons-js', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js', array(), '1.0.0', false );
	}
}

add_action( 'admin_enqueue_scripts', 'appp_admin_enqueue_scripts' );

function appp_acf_admin_enqueue_scripts() {
	wp_enqueue_script( 'acf-admin-js', APPPRESSER_URL . '/js/acf.js', array(), '1.0.3', true );
}

add_action( 'acf/input/admin_enqueue_scripts', 'appp_acf_admin_enqueue_scripts' );
