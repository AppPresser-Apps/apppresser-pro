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

	$data = appp_get_block_data( $post, 'acf/view', 'view_route' );

	if ( $data ) {
		$choices = array();

		foreach ( $data as $key => $value ) {
			$choices[ $value ] = $value;
		}

		$field['choices'] = $choices;
	}

	return $field;
}
add_filter( 'acf/load_field/name=route', 'appp_load_route_field_choices' );


/**
 * Load popover select with name entered on each view.
 *
 * @param array $field
 * @return array
 */
function appp_load_popover_field_choices( $field ) {
	global $post;

	$data = appp_get_block_data( $post, 'acf/popover', 'name' );

	if ( $data ) {
		$choices = array( 'none' => 'None' );

		foreach ( $data as $key => $value ) {
			$choices[ $value ] = $value;
		}

		$field['choices'] = $choices;
	}

	return $field;
}
add_filter( 'acf/load_field/name=popover', 'appp_load_popover_field_choices' );

/**
 * Load theme select with theme items.
 *
 * @param array $field
 * @return array
 */
function appp_load_theme_field_choices( $field ) {
	global $post;

	$data = get_field( 'themes', 'option' );

	$choices = array( 'default' => 'Default' );

	if ( $data ) {
		foreach ( $data as $key => $value ) {
			$choices[ $value['theme_name'] ] = $value['theme_name'];
		}
	}

	$field['choices'] = $choices;

	return $field;
}
add_filter( 'acf/load_field/name=theme_select', 'appp_load_theme_field_choices' );

/**
 * Load action route select with route entered on each view.
 *
 * @param array $field
 * @return array
 */
function appp_load_modal_field_choices( $field ) {
	global $post;

	$data = appp_get_block_data( $post, 'acf/modal', 'modal_name' );

	if ( $data ) {

		$choices = array( 'none' => 'None' );

		foreach ( $data  as $key => $value ) {
			$choices[ $value['attrs']['data']['modal_name'] ] = $value['attrs']['data']['modal_name'];
		}

		$field['choices'] = $choices;

	}

	return $field;
}
add_filter( 'acf/load_field/name=modal_item', 'appp_load_modal_field_choices' );

/**
 * Parse Block data helper function
 *
 * @param WP_Post $post
 * @param string  $block_name
 * @param string  $field_name
 * @return array
 */
function appp_get_block_data( $post, $block_name, $field_name ) {

	if ( ! $post ) {
		return;
	}

	$content = array();

	if ( has_blocks( $post->post_content ) && ! empty( $field_name ) ) {
		$blocks = parse_blocks( $post->post_content );
		foreach ( $blocks as $block ) {
			if ( $block['blockName'] === $block_name ) {
				if ( isset( $block['attrs']['data'][ $field_name ] ) ) {

					switch ( $block['blockName'] ) {
						case 'acf/view':
							$content[] = $block['attrs']['data'][ $field_name ];
							break;
						case 'acf/modal':
							$content[] = $block;
							break;
						case 'acf/popover':
							$content[] = $block['attrs']['data'][ $field_name ];
							break;
					}
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
				echo '<ion-button><ion-icon name="' . $button['icon'] . '"></ion-icon></ion-button>';
			}
			break;
		case 'close_button':
			if ( '0' === $button['icon'] ) {
				echo '<ion-button>' . $button['label'] . '</ion-button>';
			} else {
				echo '<ion-button><ion-icon name="' . $button['icon'] . '"></ion-icon></ion-button>';
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
// add_filter( 'acf/fields/flexible_content/layout_title/name=right_buttons', 'appp_fields_flexible_content_layout_title', 10, 4 );
// add_filter( 'acf/fields/flexible_content/layout_title/name=left_buttons', 'appp_fields_flexible_content_layout_title', 10, 4 );

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
	$globals = appp_get_theme_globals( $post->ID );

	wp_localize_script(
		'appp-block-script',
		'appp_data',
		array(
			'color_palettes' => wp_json_encode( $palette ),
			'theme_globals'  => wp_json_encode( $globals ),
			'themes'         => wp_json_encode( get_field( 'themes', 'option' ) ),
		)
	);
}
add_action( 'acf/input/admin_enqueue_scripts', 'appp_localize_scripts' );

/**
 * Gets app theme colors and returns array of processed hex values into ionic css variables.
 *
 * @param integer $post_id
 * @return array
 */
function appp_get_theme_colors( $post_id ) {

	$colors = array(
		'primary'      => 'Primary',
		'secondary'    => 'Secondary',
		'tertiary'     => 'Tertiary',
		'warning'      => 'Warning',
		'success'      => 'Success',
		'danger'       => 'Danger',
		'dark'         => 'Dark',
		'medium'       => 'Medium',
		'light'        => 'Light',
		'custom_color' => 'Custom color',
	);

	$palette = array();

	foreach ( $colors as $key => $value ) {

		if ( 'custom_color' === $key ) {
			$color = get_field( $key, $post_id );

			if ( ! empty( $color ) ) {
				foreach ( $color as $key => $value ) {
					$name             = strtolower( str_replace( ' ', '-', $value['name'] ) );
					$colors           = appp_process_colors( '--ion-color-' . $name, $value['light'] );
					$palette[ $name ] = $colors;
				}
			}
		} else {
			$color           = get_field( $key, $post_id );
			$colors          = appp_process_colors( '--ion-color-' . $key, $color[ "{$key}_light" ] );
			$palette[ $key ] = $colors;
		}
	}

	return $palette;
}

function appp_get_app_database( $post_id ) {

	// $database_id = get_field( 'app_database', $post_id );
	// $data        = get_field( 'database', $database_id );

	$data = array(
		'version' => get_field( 'version', $post_id ),
		'tables'  => get_field( 'tables', $post_id ),
	);

	return $data;
}

function appp_get_app_attrs( $post_id ) {

	$data = array(
		'biometric_auth'      => get_field( 'biometric_auth', $post_id ),
		'biometric_auth_view' => get_field( 'biometric_auth_view', $post_id ),
		'javascript'          => get_field( 'javascript', $post_id ),
		'on_load_code'        => get_field( 'on_load', $post_id ),
		'on_resume_code'      => get_field( 'on_resume', $post_id ),
		'on_background_code'  => get_field( 'on_background', $post_id ),
		'app_icon_background' => get_field( 'icon_background_color', $post_id ),
	);

	return $data;
}

function appp_get_theme_globals( $post_id ) {

	$globals = array(
		'--ion-background-color' => get_field( 'background_color', $post_id ),
		'--ion-text-color'       => get_field( 'text_color', $post_id ),
		// '--ion-font-family'      => $needed_object['font_family'],
		// '--ion-safe-area-top'    => $needed_object['safe_area_top'] . 'px',
		// '--ion-safe-area-bottom' => $needed_object['safe_area_bottom'] . 'px',
		// '--ion-safe-area-left'   => $needed_object['safe_area_left'] . 'px',
		// '--ion-safe-area-right'  => $needed_object['safe_area_right'] . 'px',
		'--ion-margin'           => get_field( 'ion_margin', $post_id ) . 'px',
		'--ion-padding'          => get_field( 'ion_padding', $post_id ) . 'px',
		'--ion-border-radius'    => get_field( 'border_radius', $post_id ) . 'px',
	);

	return $globals;
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
