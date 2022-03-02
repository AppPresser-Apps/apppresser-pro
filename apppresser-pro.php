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

require dirname( __FILE__ ) . '/post-type.php';
require dirname( __FILE__ ) . '/gutenberg.php';

require dirname( __FILE__ ) . '/vendors/advanced-custom-fields-pro/acf.php';

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
    </style>
    ";
}
add_action( 'admin_footer', 'appp_custom_editor_css', 999 );

if( is_admin() ) {
    add_filter( 'enter_title_here', function( $input ) {
        if( 'app' === get_post_type() ) {
            return __( 'App Name', 'appppresser' );
        } else {
            return $input;
        }
    } );
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
add_action( 'init', 'appp_gutenberg_register_files', 999 );

function appp_admin_enqueue_scripts() {
	wp_enqueue_script( 'acf-admin-js', APPPRESSER_URL . '/js/acf.js', array(), '1.0.0', true );
}

add_action( 'acf/input/admin_enqueue_scripts', 'appp_admin_enqueue_scripts' );
