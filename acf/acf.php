<?php

/**
 * Load action route select with route entered on each view.
 *
 * @param array $field
 * @return array
 */
function appp_load_route_field_choices( $field ) {
	global $post;

	$data = appp_get_block_data( $post );

	$field['choices'] = $data;

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
			if ( 'none' === $button['icon'] ) {
				echo '<ion-button style="color: inherit;">' . $button['label'] . '</ion-button>';
			} else {
				echo '<ion-menu-button style="color: inherit;"><ion-icon name="menu-outline"></ion-icon></ion-menu-button>';
			}
			break;
		case 'button':
			if ( 'none' === $button['icon'] ) {
				echo '<ion-button style="color: inherit;">' . $button['label'] . '</ion-button>';
			} else {
				echo '<ion-button style="color: inherit;"><ion-icon name="menu-outline"></ion-icon></ion-button>';
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
			if ( 'none' === $button['icon'] ) {
				echo '<ion-button style="color: inherit;">' . $button['label'] . '</ion-icon></ion-button>';
			} else {
				echo '<ion-button style="color: inherit;"><ion-icon name="' . $button['icon'] . '"></ion-icon></ion-button>';
			}

			break;

	}

}

/**
 * Swap menu button flexible content title with label entered.
 *
 * @param string $title
 * @param array  $field
 * @param [type] $layout
 * @param [type] $i
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


function appp_localize_scripts() {

	$palette = appp_get_theme_colors( 0 );

	wp_localize_script( 'appp-block-script', 'appp_data', array( 'color_palettes' => json_encode( $palette ) ) );
}
add_action( 'acf/input/admin_enqueue_scripts', 'appp_localize_scripts' );


function appp_get_theme_colors( $post_id ) {

	global $post, $pagenow;

	if ( ( $pagenow !== 'post.php' ) || ( get_post_type() !== 'app' ) ) {
		return [];
	}

	$fields = array(
		'primary',
		'secondary',
		'tertiary',
		'success',
		'warning',
		'danger',
		'dark',
		'medium',
		'light',
	);

	$palette = array();

	foreach ( $fields as $field ) {
		$color = get_field( $field, $post_id );

		$colors = appp_process_colors( '--ion-color-' . $field, $color );

		$palette[ $field ] = $colors;
	}

	return $palette;
}

function appp_allow_acf_block( $block ) {

	return $block;
}
//add_filter( 'acf/register_block_type_args', 'appp_allow_acf_block' );