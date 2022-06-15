<?php

/**
 * Create ACF options pages.
 *
 * @return void
 */
function appp_acf_op_init() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		$args        = array(
			'page_title'  => 'Integrations',
			'menu_title'  => 'Integrations',
			'parent_slug' => 'edit.php?post_type=app',
		);
		$option_page = acf_add_options_page( $args );
	}
}
add_action( 'acf/init', 'appp_acf_op_init' );

/**
 * Load action route select with route entered on each view.
 *
 * @param array $field
 * @return array
 */
function appp_load_route_field_choices( $field ) {
	global $post;

	$data = appp_get_block_data( $post );

	$choices = array();

	foreach ( $data as $key => $value ) {
		$choices[ $value ] = $value;
	}

	$field['choices'] = $choices;

	return $field;

}
add_filter( 'acf/load_field/name=route', 'appp_load_route_field_choices' );

/**
 * Parse Block data helper function
 *
 * @param WP_Post $post
 * @param string  $block_name
 * @param string  $field_name
 * @return array
 */
function appp_get_block_data( $post, $block_name = 'acf/view', $field_name = 'view_route' ) {

	if ( ! $post ) {
		return;
	}

	$content = array();

	if ( has_blocks( $post->post_content ) && ! empty( $field_name ) ) {
		$blocks = parse_blocks( $post->post_content );
		foreach ( $blocks as $block ) {
			if ( $block['blockName'] === $block_name ) {
				if ( isset( $block['attrs']['data'][ $field_name ] ) ) {
					$content[] = $block['attrs']['data'][ $field_name ];
				}
			}
		}
	}
	return $content;
}

/**
 * Builds left toolbar button from fields data
 *
 * @param array $button
 * @return echo
 */
function appp_process_left_button( $button ) {

	switch ( $button['acf_fc_layout'] ) {
		case 'menu_button':
			if ( '0' !== $button['icon'] ) {
				echo '<ion-button><ion-icon name="' . $button['icon'] . '"></ion-icon></ion-button>';
			} else {
				echo '<ion-menu-button style="font-size: 30px;"></ion-menu-button>';
			}
			break;
		case 'back_button':
			echo '<ion-back-button text="' . $button['label'] . '" icon="' . $button['icon'] . '"></ion-back-button>';
			break;
		case 'button':
			if ( '0' === $button['icon'] ) {
				echo '<ion-button>' . $button['label'] . '</ion-button>';
			} else {
				echo '<ion-button><ion-icon name="heart"></ion-icon></ion-button>';
			}
			break;

	}

}

/**
 * Builds right toolbar buttons from fields data
 *
 * @param array $button
 * @return echo
 */
function appp_process_right_button( $button ) {

	switch ( $button['acf_fc_layout'] ) {
		case 'button':
			if ( '0' === $button['icon'] ) {
				echo '<ion-button>' . $button['label'] . '</ion-button>';
			} else {
				echo '<ion-button><ion-icon name="' . $button['icon'] . '"></ion-icon></ion-button>';
			}

			break;

	}

}

/**
 * Swap menu button flexible content title with label entered.
 *
 * @param string  $title
 * @param array   $field
 * @param string  $layout
 * @param integer $i
 * @return string
 */
function appp_fields_flexible_content_layout_title( $title, $field, $layout, $i ) {

	$label = get_sub_field( 'label' );
	$icon  = get_sub_field( 'icon' );

	if ( $label ) {
		$title = esc_html( $label );
	}

	if ( $icon && ! $label ) {
		$title = esc_html( $icon );
	}

	return $title;
}
add_filter( 'acf/fields/flexible_content/layout_title/name=right_buttons', 'appp_fields_flexible_content_layout_title', 10, 4 );

/**
 * Adds processed theme css variables into the header of WordPress as json data.
 *
 * @return void
 */
function appp_localize_scripts() {

	global $post, $pagenow;

	if ( ( $pagenow !== 'post.php' ) || ( get_post_type() !== 'app' ) ) {
		return array();
	}

	$palette = appp_get_theme_colors( $post->ID );

	wp_localize_script( 'appp-block-script', 'appp_data', array( 'color_palettes' => json_encode( $palette ) ) );
}
add_action( 'acf/input/admin_enqueue_scripts', 'appp_localize_scripts' );

/**
 * Gets app theme colors and returns array of processed hex values into ionic css variables.
 *
 * @param integer $post_id
 * @return array
 */
function appp_get_theme_colors( $post_id ) {

	$fields = get_field( 'light_mode', $post_id );

	$palette = array();

	foreach ( $fields as $field => $value ) {

		$colors = appp_process_colors( '--ion-color-' . $field, $value );

		$palette[ $field ] = $colors;
	}

	return $palette;
}

function appp_allow_acf_block( $block ) {

	return $block;
}
add_filter( 'acf/register_block_type_args', 'appp_allow_acf_block' );


/**
 * Save acf json to plugin folder
 *
 * @param string $path
 * @return string
 */
function appp_acf_json_save_point( $path ) {

	// update path.
	$path = APPPRESSER_DIR . '/acf-json';

	// return.
	return $path;

}
add_filter( 'acf/settings/save_json', 'appp_acf_json_save_point' );

/**
 * Get acf json from plugin folder
 *
 * @param array $path
 * @return array
 */
function appp_acf_json_load_point( $paths ) {

	// remove original path (optional).
	unset( $paths[0] );

	// append path.
	$paths[] = APPPRESSER_DIR . '/acf-json';

	// return.
	return $paths;

}
add_filter( 'acf/settings/load_json', 'appp_acf_json_load_point' );
