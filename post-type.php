<?php

// Register Custom Post Type
function app_post_type() {

	$labels = array(
		'name'                   => _x( 'Apps', 'Post Type General Name', 'apppresser' ),
		'singular_name'          => _x( 'App', 'Post Type Singular Name', 'apppresser' ),
		'menu_name'              => __( 'Apps', 'apppresser' ),
		'name_admin_bar'         => __( 'App', 'apppresser' ),
		'archives'               => __( 'App Archives', 'apppresser' ),
		'attributes'             => __( 'App Attributes', 'apppresser' ),
		'parent_item_colon'      => __( 'Parent Item:', 'apppresser' ),
		'all_items'              => __( 'All Apps', 'apppresser' ),
		'add_new_item'           => __( 'Add New App', 'apppresser' ),
		'add_new'                => __( 'Add New', 'apppresser' ),
		'new_item'               => __( 'New App', 'apppresser' ),
		'edit_item'              => __( 'Edit App', 'apppresser' ),
		'update_item'            => __( 'Update app', 'apppresser' ),
		'view_item'              => __( 'View App', 'apppresser' ),
		'view_items'             => __( 'View Apps', 'apppresser' ),
		'search_items'           => __( 'Search Apps', 'apppresser' ),
		'not_found'              => __( 'Not found', 'apppresser' ),
		'not_found_in_trash'     => __( 'Not found in Trash', 'apppresser' ),
		'featured_image'         => __( 'Featured Image', 'apppresser' ),
		'set_featured_image'     => __( 'Set featured image', 'apppresser' ),
		'remove_featured_image'  => __( 'Remove featured image', 'apppresser' ),
		'use_featured_image'     => __( 'Use as featured image', 'apppresser' ),
		'insert_into_item'       => __( 'Insert into app', 'apppresser' ),
		'uploaded_to_this_item'  => __( 'Uploaded to this app', 'apppresser' ),
		'items_list'             => __( 'Apps list', 'apppresser' ),
		'items_list_navigation'  => __( 'Apps list navigation', 'apppresser' ),
		'filter_items_list'      => __( 'Filter apps list', 'apppresser' ),
		'item_updated'           => __( 'App updated.', 'apppresser' ),
		'item_published'         => __( 'App published.', 'apppresser' ),
		'item_reverted_to_draft' => __( 'App reverted to draft.', 'apppresser' ),

	);
	$capabilities = array(
		// 'edit_post'     => 'edit_post',
		// 'read_post'     => 'read_post',
		// 'delete_post'   => 'delete_post',
		// 'publish_posts' => 'publish_posts',
	);
	$args = array(
		'label'               => __( 'App', 'apppresser' ),
		'description'         => __( 'App Builder', 'apppresser' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'custom-fields' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-smartphone',
		'show_in_admin_bar'   => false,
		'show_in_nav_menus'   => false,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => true,
		'publicly_queryable'  => true,
		'capabilities'        => $capabilities,
		'show_in_rest'        => true,
		'template'            => array(
			array( 'acf/view' ),
		),
		'template_lock'       => false,
	);
	register_post_type( 'app', $args );

	register_post_meta(
		'app',
		'acf_sync',
		array(
			'auth_callback'     => function() {
				return current_user_can( 'edit_posts' );
			},
			'sanitize_callback' => 'sanitize_text_field',
			'show_in_rest'      => true,
			'single'            => true,
			'type'              => 'string',
		)
	);

}
add_action( 'init', 'app_post_type', 0 );


// Register Custom Post Type
function data_post_type() {

	$labels = array(
		'name'                   => _x( 'Data', 'Post Type General Name', 'apppresser' ),
		'singular_name'          => _x( 'Data', 'Post Type Singular Name', 'apppresser' ),
		'menu_name'              => __( 'Data', 'apppresser' ),
		'name_admin_bar'         => __( 'Data', 'apppresser' ),
		'archives'               => __( 'Data Archives', 'apppresser' ),
		'attributes'             => __( 'Data Attributes', 'apppresser' ),
		'parent_item_colon'      => __( 'Parent Item:', 'apppresser' ),
		'all_items'              => __( 'All Data', 'apppresser' ),
		'add_new_item'           => __( 'Add New Datable', 'apppresser' ),
		'add_new'                => __( 'Add New', 'apppresser' ),
		'new_item'               => __( 'New Data', 'apppresser' ),
		'edit_item'              => __( 'Edit Data', 'apppresser' ),
		'update_item'            => __( 'Update Data', 'apppresser' ),
		'view_item'              => __( 'View Data', 'apppresser' ),
		'view_items'             => __( 'View Data', 'apppresser' ),
		'search_items'           => __( 'Search Data', 'apppresser' ),
		'not_found'              => __( 'Not found', 'apppresser' ),
		'not_found_in_trash'     => __( 'Not found in Trash', 'apppresser' ),
		'featured_image'         => __( 'Featured Image', 'apppresser' ),
		'set_featured_image'     => __( 'Set featured image', 'apppresser' ),
		'remove_featured_image'  => __( 'Remove featured image', 'apppresser' ),
		'use_featured_image'     => __( 'Use as featured image', 'apppresser' ),
		'insert_into_item'       => __( 'Insert into Data Table', 'apppresser' ),
		'uploaded_to_this_item'  => __( 'Uploaded to this Data Table', 'apppresser' ),
		'items_list'             => __( 'Data list', 'apppresser' ),
		'items_list_navigation'  => __( 'Data list navigation', 'apppresser' ),
		'filter_items_list'      => __( 'Filter data list', 'apppresser' ),
		'item_updated'           => __( 'Data updated.', 'apppresser' ),
		'item_published'         => __( 'Data published.', 'apppresser' ),
		'item_reverted_to_draft' => __( 'Data reverted to draft.', 'apppresser' ),

	);
	$capabilities = array(
		// 'edit_post'     => 'edit_post',
		// 'read_post'     => 'read_post',
		// 'delete_post'   => 'delete_post',
		// 'publish_posts' => 'publish_posts',
	);
	$args = array(
		'label'               => __( 'Data', 'apppresser' ),
		'description'         => __( 'Data', 'apppresser' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'custom-fields' ),
		'hierarchical'        => false,
		'public'              => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-database',
		'show_in_admin_bar'   => false,
		'show_in_nav_menus'   => false,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => true,
		'publicly_queryable'  => false,
		'capabilities'        => $capabilities,
		'show_in_rest'        => true,
		'template_lock'       => false,
	);
	register_post_type( 'datatable', $args );

}
add_action( 'init', 'data_post_type', 0 );

add_filter(
	'manage_app_posts_columns',
	function( $columns ) {
		unset( $columns['date'] );
		unset( $columns['title'] );
		return array_merge(
			array(
				'cb'  => '<input type="checkbox" />',
				'app' => __( 'App', 'apppresser' ),
			),
			$columns
		);
	}
);

add_action(
	'manage_app_posts_custom_column',
	function( $column_key, $post_id ) {

		if ( 'app' === $column_key ) {
			$icon  = get_field( 'icon', $post_id );
			$title = get_the_title( $post_id );
			echo '<div style="display:flex; align-items: center;">';
				echo '<a href="' . esc_attr( get_edit_post_link( $post_id ) ) . '">';
			if ( $icon ) {
				echo '<style>';
				echo '.app-image { width: 40px; height: 40px; border-radius:6px; background-size: cover; background-position: center; background-image: url(' . esc_url( $icon ) . '); }';
				echo '</style>';
				echo '<div class="app-image"></div>';
			} else {
				echo '<style>';
				echo '.app-icon { width: 40px; height: 40px; border-radius:6px; background-size: cover; background-position: center; background-image: url(' . esc_url( APPPRESSER_URL . '/images/appp-icon.png' ) . '); }';
				echo '</style>';
				echo '<div class="app-icon"></div>';
			}
				echo '<a/>';

				echo '<div style="padding: 0 15px">';
					echo '<a href="' . esc_attr( get_edit_post_link( $post_id ) ) . '">';
						echo '<strong>' . esc_attr( '' === $title ? '(No Name)' : $title ) . '</strong>';
					echo '<a/>';
				echo '</div>';

			echo '</div>';
		}

	},
	10,
	2
);

/**
 * Filter admin notice wehn datatable cpt is updated / saved.
 *
 * @param array $messages
 * @return array
 */
function datatable_updated_messages( $messages ) {
	global $post, $post_ID;

	$messages['datatable'] = array(
		0  => '',
		1  => sprintf( __( 'Data updated.' ), esc_url( get_permalink( $post_ID ) ) ),
		2  => __( 'Custom field updated.' ),
		3  => __( 'Custom field deleted.' ),
		4  => __( 'Data updated.' ),
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Data restored to revision from %s' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6  => sprintf( __( 'Data published. <a href="%s">View data</a>' ), esc_url( get_permalink( $post_ID ) ) ),
		7  => __( 'Data saved.' ),
		8  => sprintf( __( 'Data submitted.' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) ),
		9  => sprintf( __( 'Data scheduled for: <strong>%1$s</strong>.' ), date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink( $post_ID ) ) ),
		10 => sprintf( __( 'Data draft updated.' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID ) ) ) ),
	);
	return $messages;
}
add_filter( 'post_updated_messages', 'datatable_updated_messages' );
