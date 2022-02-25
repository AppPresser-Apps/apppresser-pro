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
$id = 'appview-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'appbutton';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

?>
<div mode="ios" id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<ion-button>Menu</ion-button>
</div>
