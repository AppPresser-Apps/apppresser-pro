<?php

/**
 * Button Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'button-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-button';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}



$title = get_field( 'title' );
$color = get_field( 'color' );
$fill  = get_field( 'fill' );
$size  = get_field( 'size' );
$expand  = get_field( 'expand' );
$margin  = get_field( 'margin' );
$alignment  = get_field( 'alignment' );
$css = get_field( 'css' );

$style = '';

if( $margin ) {
	$style .= 'margin-left:' . $margin['margin_left'] . 'px; ';
	$style .= 'margin-right:' . $margin['margin_right'] . 'px; ';
	$style .= 'margin-top:' . $margin['margin_top'] . 'px; ';
	$style .= 'margin-bottom:' . $margin['margin_right'] . 'px; ';
}

if( 'inline' === $expand && $alignment ) {
	$style .= 'display: flex; ';
	$style .= 'justify-content:' . $alignment . '; ';
}

?>

<style>
	#<?php echo esc_attr( $block_id ); ?> ion-button::part(native) {
		<?php echo ( $css ); ?>
	}

	ion-button {
		--border-radius: var(--ion-border-radius);
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<div style="<?php echo $style; ?>">
		<ion-button
			color="<?php echo $color ? $color : 'primary'; ?>"
			fill="<?php echo $fill ? $fill : 'solid'; ?>"
			size="<?php echo $size ? $size : 'default'; ?>"
			expand="<?php echo $expand ? $expand : 'inline'; ?>"
		><?php echo $title ? $title : 'Button'; ?></ion-button>
	</div>
</div>
