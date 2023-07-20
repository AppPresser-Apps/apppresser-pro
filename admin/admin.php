<?php

/**
 * Remove un-needed admin screens and functionality.
 */
add_filter( 'screen_options_show_screen', '__return_false' );
add_filter( 'wp_is_application_passwords_available', '__return_false' );
remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );

add_filter(
	'site_status_tests',
	function ( array $test_type ) {
		unset(
			$test_type['direct']['php_version'],
			$test_type['direct']['theme_version'],
			$test_type['async']['background_updates']
		);
		return $test_type;
	},
	10,
	1
);

/**
 * Remove un-needed dashboard widgets.
 *
 * @return void
 */
function appp_wp_dashboard_setup() {

	remove_action( 'welcome_panel', 'wp_welcome_panel' );

	remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );

	remove_meta_box( 'dashboard_php_nag', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_browser_nag', 'dashboard', 'normal' );
	remove_meta_box( 'health_check_status', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
	remove_meta_box( 'network_dashboard_right_now', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
}
add_action( 'wp_dashboard_setup', 'appp_wp_dashboard_setup' );

/**
 * Remove un-needed menu items.
 *
 * @return void
 */
function appp_remove_menu_items() {
	global $menu;

	error_log( print_r( $menu, true ) );

	remove_menu_page( 'index.php' );

	remove_menu_page( 'edit.php' );
	remove_menu_page( 'edit.php?post_type=page' );
	remove_menu_page( 'edit-comments.php' );

	remove_menu_page( 'plugins.php' );
	remove_menu_page( 'tools.php' );
	remove_menu_page( 'options-general.php' );

	remove_menu_page( 'one-user-avatar' );

	remove_menu_page( 'themes.php' );
	remove_submenu_page( 'options-general.php', 'options-media.php' );
	remove_submenu_page( 'options-general.php', 'options-discussion.php' );
	remove_submenu_page( 'options-general.php', 'akismet-key-config' );

	remove_submenu_page( 'index.php', 'update-core.php' );
}
add_action( 'admin_menu', 'appp_remove_menu_items', 999 );

/**
 * Redirect from dashboard to app post type.
 *
 * @return void
 */
function appp_dashboard_redirect() {
	wp_redirect( admin_url( 'edit.php?post_type=app' ) );
}
add_action( 'load-index.php', 'appp_dashboard_redirect' );

/**
 * Remove the ability for admininistrator to change a user to an administrator.
 * This needs blocked becasue the app administrators will be a custom role with limited admin capabilities.
 *
 * @param array $all_roles WordPress user roles.
 * @return array
 */
function appp_filter_editable_roles( $all_roles ) {

	if ( ! current_user_can( 'manage_options' ) ) {
		unset( $all_roles['administrator'] );
	}

	return $all_roles;
}
add_filter( 'editable_roles', 'appp_filter_editable_roles' );

/**
 * Remove help tabs on edit screens.
 *
 * @return void
 */
function appp_remove_help_tabs() {
	$screen = get_current_screen();
	$screen->remove_help_tabs();
}
add_action( 'admin_head', 'appp_remove_help_tabs' );


if ( ! function_exists( 'appp_remove_personal_options' ) ) {

	/**
	 * Remove sections of user profile edit.
	 * No hooks for this so it's string replace hacking :P
	 *
	 * @param string $subject page php output html.
	 * @return string
	 */
	function appp_remove_personal_options( $subject ) {
		$subject = preg_replace( '#<h2>' . __( 'Personal Options' ) . '</h2>#s', '', $subject, 1 ); // Remove the "Personal Options" title.
		$subject = preg_replace( '#<tr class="user-rich-editing-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Visual Editor" field.
		$subject = preg_replace( '#<tr class="user-syntax-highlighting-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Syntax Highting" field.
		$subject = preg_replace( '#<tr class="user-comment-shortcuts-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Keyboard Shortcuts" field.
		$subject = preg_replace( '#<tr class="show-admin-bar(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Toolbar" field.
		$subject = preg_replace( '#<h2>' . __( 'Name' ) . '</h2>#s', '', $subject, 1 ); // Remove the "Name" title.
		$subject = preg_replace( '#<tr class="user-display-name-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Display name publicly as" field.
		$subject = preg_replace( '#<h2>' . __( 'Contact Info' ) . '</h2>#s', '', $subject, 1 ); // Remove the "Contact Info" title.
		$subject = preg_replace( '#<tr class="user-url-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Website" field.
		$subject = preg_replace( '#<h2>' . __( 'About Yourself' ) . '</h2>#s', '', $subject, 1 ); // Remove the "About Yourself" title.
		$subject = preg_replace( '#<tr class="user-description-wrap(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Biographical Info" field.
		$subject = preg_replace( '#<tr class="user-profile-picture(.*?)</tr>#s', '', $subject, 1 ); // Remove the "Profile Picture" field.
		return $subject;
	}

	/**
	 * Start removal
	 *
	 * @return void
	 */
	function appp_profile_subject_start() {

		$screen = get_current_screen();

		if ( 'profile' === $screen->id ) {
			ob_start( 'appp_remove_personal_options' );
		}
	}
	add_action( 'admin_head', 'appp_profile_subject_start' );

	/**
	 * End removal
	 *
	 * @return void
	 */
	function appp_profile_subject_end() {

		$screen = get_current_screen();

		if ( 'profile' === $screen->id ) {
			ob_end_flush();
		}
	}
	add_action( 'admin_footer', 'appp_profile_subject_end' );
}

/**
 * Filter new post title placeholder.
 */
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

/******** DISABLE COMMENTING ********* */

add_action(
	'admin_init',
	function () {
		// Redirect any user trying to access comments page.
		global $pagenow;

		if ( 'edit-comments.php' === $pagenow ) {
			wp_safe_redirect( admin_url() );
			exit;
		}

		// Remove comments metabox from dashboard.
		remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );

		// Disable support for comments and trackbacks in post types.
		foreach ( get_post_types() as $post_type ) {
			if ( post_type_supports( $post_type, 'comments' ) ) {
				remove_post_type_support( $post_type, 'comments' );
				remove_post_type_support( $post_type, 'trackbacks' );
			}
		}
	}
);

// Close comments on the front-end.
add_filter( 'comments_open', '__return_false', 20, 2 );
add_filter( 'pings_open', '__return_false', 20, 2 );

// Hide existing comments.
add_filter( 'comments_array', '__return_empty_array', 10, 2 );

// Remove comments page in menu.
add_action(
	'admin_menu',
	function () {
		remove_menu_page( 'edit-comments.php' );
	}
);

// Remove comments links from admin bar.
add_action(
	'init',
	function () {
		if ( is_admin_bar_showing() ) {
			remove_action( 'admin_bar_menu', 'wp_admin_bar_comments_menu', 60 );
		}
	}
);

function filter_media_comment_status( $open, $post_id ) {
	$post = get_post( $post_id );
	if ( $post->post_type === 'attachment' ) {
		return false;
	}
	return $open;
}
add_filter( 'comments_open', 'filter_media_comment_status', 10, 2 );
