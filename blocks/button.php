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

$color = get_field( 'color' );
$fill  = get_field( 'fill' );
$size  = get_field( 'size' );
$expand  = get_field( 'expand' );

?>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<ion-button 
		color="<?php echo $color ? $color : 'primary'; ?>"
		fill="<?php echo $fill ? $fill : 'solid'; ?>"
		size="<?php echo $size ? $size : 'default'; ?>"
		expand="<?php echo $expand ? $expand : 'expand'; ?>"
	>Menu</ion-button>
</div>

<script>
	// We need this because ion-button has a class 
	// .button and WordPress editor styles is screwing up the design
	setTimeout(() => {
		const btn = document.querySelector('#<?php echo esc_attr( $block_id ); ?> ion-button');
		btn.classList.remove('button')
	}, 200);
</script>
