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
$margin     = get_field( 'margin' );
$padding    = get_field( 'padding' );
$alignment  = get_field( 'alignment' );

// error_log(print_r(get_field( 'padding' ),true));

$style = '';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding_top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding_right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding_bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

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

if ( $alignment ) {
	$style .= 'align-text:' . $alignment . '; ';
}

$style .= 'font-family: var(--ion-font-family, inherit); font-size: 15px; font-weight: 300; ';

?>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<div style="<?php echo $style; ?>">
		<p style="padding: 0px; margin: 0px; font-size:<?php echo $size; ?>px; font-weight: <?php echo $weight; ?>; line-height:<?php echo $size; ?>px; "><?php echo $text ? $text : 'add text...'; ?></p>
	</div>
</div>
