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

require dirname( __FILE__ ) . '/admin/admin.php';
require dirname( __FILE__ ) . '/admin/css.php';
require dirname( __FILE__ ) . '/admin/media.php';
require dirname( __FILE__ ) . '/helpers/colors.php';
require dirname( __FILE__ ) . '/post-type.php';
require dirname( __FILE__ ) . '/gutenberg.php';

require dirname( __FILE__ ) . '/acf/acf.php';
require dirname( __FILE__ ) . '/acf/filters.php';

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
		'1.1.3',
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

		wp_enqueue_style( 'owm-icon-css', APPPRESSER_URL . '/images/opw-icons/css/weather-icons.min.css', array(), '1.0.0' );
	}
}

add_action( 'admin_enqueue_scripts', 'appp_admin_enqueue_scripts' );

function appp_acf_admin_enqueue_scripts() {
	wp_enqueue_script( 'acf-admin-js', APPPRESSER_URL . '/js/acf.js', array( 'lodash' ), '1.0.7', true );
}

add_action( 'acf/input/admin_enqueue_scripts', 'appp_acf_admin_enqueue_scripts' );
