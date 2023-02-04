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
$block_id = 'wysiwyg-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-wysiwyg';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$editor       = get_field( 'editor' );
$visibility = get_field( 'visibility' );

if ( 'hidden' === $visibility ) {
	$style .= 'display: none; ';
}

?>
<style>
	#<?php echo esc_attr( $block_id ); ?> {
	
	}

</style>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<?php echo $editor ? $editor : ''; ?>
</div>
