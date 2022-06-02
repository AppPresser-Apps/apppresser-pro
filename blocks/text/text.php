<?php

/**
 * Text Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'text-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-text';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$text       = get_field( 'text' );
$color      = get_field( 'color' );
$background = get_field( 'background' );
$size       = get_field( 'font_size' );
$weight     = get_field( 'font_weight' );
$margin     = get_field( 'margin' ) ?? 0;
$padding    = get_field( 'padding' );
$alignment  = get_field( 'alignment' );

$style = '';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding-top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding-right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding-bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

if ( $margin ) {
	$style .= 'margin-left:' . $margin . 'px; ';
	$style .= 'margin-right:' . $margin . 'px; ';
	$style .= 'margin-top:' . $margin . 'px; ';
	$style .= 'margin-bottom:' . $margin . 'px; ';
}

if ( $background ) {
	$style .= 'background-color: var(--ion-color-' . $background . '); ';
}

if ( 'default' === $color ) {
	$style .= 'color: var(--ion-color-' . $background . '-contrast); ';
} else {
	$style .= 'color: var(--ion-color-' . $color . '); ';
}

$style .= 'font-family: var(--ion-font-family, inherit); font-size: ' . $size . 'px; font-weight: ' . $weight .'; box-sizing: border-box; margin: 0px;';

?>
<style>
	#<?php echo esc_attr( $block_id ); ?> {
	
	}
</style>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<p style="<?php echo $style; ?>"><?php echo $text ? $text : ''; ?></p>
</div>
