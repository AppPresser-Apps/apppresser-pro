<?php
/**
 * Plugin Name:       AppPresser Pro Beta
 * Description:       Functionality for AppPresser Pro.
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

require __DIR__ . '/vendors/advanced-custom-fields-pro/acf.php';
require __DIR__ . '/vendors/acf-code-field/acf-code-field.php';
require __DIR__ . '/vendors/advanced-custom-fields-table-field/acf-table.php';
require __DIR__ . '/vendors/acf-unique-id-field/acf-unique-id-field.php';

require __DIR__ . '/post-type.php';
require __DIR__ . '/admin/admin.php';
require __DIR__ . '/admin/css.php';
require __DIR__ . '/admin/media.php';
require __DIR__ . '/helpers/colors.php';
require __DIR__ . '/block-loader.php';
require __DIR__ . '/gutenberg.php';

require __DIR__ . '/acf/icons.php';
require __DIR__ . '/acf/endpoints.php';
require __DIR__ . '/acf/acf.php';
require __DIR__ . '/acf/filters.php';


/**
 * Allow cross domain api access from iOS and Android
 *
 * @param WP_Rest_Request $request
 * @return void
 */
function appp_init_cors( $request ) {
	$origin_url = '*';

	header( 'Access-Control-Allow-Origin: ' . $origin_url );
	header( 'Access-Control-Allow-Methods: GET,DELETE,POST,PUT,PATCH,OPTIONS' );
	header( 'Access-Control-Allow-Credentials: true' );
	return $request;
}
add_action(
	'rest_api_init',
	function() {
		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
		add_filter( 'rest_pre_serve_request', 'appp_init_cors' );
	},
	15
);

/**
 * Register editor scripts
 *
 * @return void
 */
function appp_gutenberg_register_files() {

	wp_enqueue_script(
		'appp-block-script',
		APPPRESSER_URL . '/js/block-script.js',
		array( 'wp-element' ),
		'1.1.9',
		true,
	);

	wp_localize_script(
		'appp-block-script',
		'custom_data',
		array(
			'siteURL' => get_site_url(),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'appp_gutenberg_register_files' );

/**
 * Loads up admin scripts
 *
 * @param string $hook_suffix
 * @return void
 */
function appp_admin_enqueue_scripts( $hook_suffix ) {
	global $typenow;
	if ( ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) && 'app' === $typenow ) {

		wp_enqueue_style( 'ionic-css', 'https://cdn.jsdelivr.net/npm/@ionic/core@6.0.10/css/ionic.bundle.css', array(), '1.0.0' );
		wp_enqueue_script( 'ionic-js', 'https://cdn.jsdelivr.net/npm/@ionic/core@6.0.10/dist/ionic/ionic.js', array(), '1.0.0', false );
		wp_enqueue_script( 'ionicons-js', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js', array(), '1.0.0', false );

		wp_enqueue_style( 'owm-icon-css', APPPRESSER_URL . '/images/opw-icons/css/weather-icons.min.css', array(), '1.0.0' );
	}
}
add_action( 'admin_enqueue_scripts', 'appp_admin_enqueue_scripts' );

/**
 * Loads up ACF admin scripts.
 *
 * @return void
 */
function appp_acf_admin_enqueue_scripts() {

	wp_enqueue_script( 'beautify-js', 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify.min.js', array(), '1.0.0', false );
	wp_enqueue_script( 'beautify-css', 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-css.min.js', array(), '1.0.0', false );
	wp_enqueue_script( 'beautify-html', 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.3/beautify-html.min.js', array(), '1.0.0', false );

	wp_enqueue_script( 'acf-admin-js', APPPRESSER_URL . '/js/acf.js', array( 'lodash', 'jquery' ), '1.1.0', true );

	wp_localize_script(
		'acf-admin-js',
		'site_data',
		array(
			'siteUrl' => get_site_url(),
		)
	);
}
add_action( 'acf/input/admin_enqueue_scripts', 'appp_acf_admin_enqueue_scripts', 99 );

// Hide ACF in production.
if ( ! defined( 'ACF_MENU' ) ) {
	add_filter( 'acf/settings/show_admin', '__return_false' );
}
