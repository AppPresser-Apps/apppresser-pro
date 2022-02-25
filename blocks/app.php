<?php

/**
 * App Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Create id attribute allowing for custom "anchor" value.
$id = 'app-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'app';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$allowed_blocks = array( 'acf/view' );

?>
<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<InnerBlocks templateInsertUpdatesSelection="false" templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>" />
</div>
