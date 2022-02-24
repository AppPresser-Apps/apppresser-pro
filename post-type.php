<?php

// Register Custom Post Type
function app_post_type() {

	$labels       = array(
		'name'                  => _x( 'Apps', 'Post Type General Name', 'apppresser' ),
		'singular_name'         => _x( 'App', 'Post Type Singular Name', 'apppresser' ),
		'menu_name'             => __( 'Apps', 'apppresser' ),
		'name_admin_bar'        => __( 'App', 'apppresser' ),
		'archives'              => __( 'App Archives', 'apppresser' ),
		'attributes'            => __( 'App Attributes', 'apppresser' ),
		'parent_item_colon'     => __( 'Parent Item:', 'apppresser' ),
		'all_items'             => __( 'All Apps', 'apppresser' ),
		'add_new_item'          => __( 'Add New App', 'apppresser' ),
		'add_new'               => __( 'Add New', 'apppresser' ),
		'new_item'              => __( 'New App', 'apppresser' ),
		'edit_item'             => __( 'Edit App', 'apppresser' ),
		'update_item'           => __( 'Update app', 'apppresser' ),
		'view_item'             => __( 'View App', 'apppresser' ),
		'view_items'            => __( 'View Apps', 'apppresser' ),
		'search_items'          => __( 'Search App', 'apppresser' ),
		'not_found'             => __( 'Not found', 'apppresser' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'apppresser' ),
		'featured_image'        => __( 'Featured Image', 'apppresser' ),
		'set_featured_image'    => __( 'Set featured image', 'apppresser' ),
		'remove_featured_image' => __( 'Remove featured image', 'apppresser' ),
		'use_featured_image'    => __( 'Use as featured image', 'apppresser' ),
		'insert_into_item'      => __( 'Insert into app', 'apppresser' ),
		'uploaded_to_this_item' => __( 'Uploaded to this app', 'apppresser' ),
		'items_list'            => __( 'Apps list', 'apppresser' ),
		'items_list_navigation' => __( 'Apps list navigation', 'apppresser' ),
		'filter_items_list'     => __( 'Filter apps list', 'apppresser' ),
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
		'supports'            => array( 'title', 'editor' ),
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
			array( 'acf/app', '', array( array( 'acf/view' ) ) ),
		),
		'template_lock'       => 'all',
	);
	register_post_type( 'app', $args );

}
add_action( 'init', 'app_post_type', 0 );
