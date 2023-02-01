<?php

/**
 * Date Time Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'date-time-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'date-time';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

?>
<style>
	#<?php echo esc_attr( $block_id ); ?> {
	
	}
</style>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
    <ion-datetime></ion-datetime>
</div>
