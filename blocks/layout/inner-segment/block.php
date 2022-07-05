<?php
/**
 * Block Name: Inner Segment
 * Description: Segments are useful for toggling between different views inside of the content.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'inner-segment-' . $block['id'];

$block_classes = 'hidden';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$segment = get_field( 'segment' );

?>

<style>
	.wp-block-acf-inner-segment .acf-block-body .acf-block-preview {
		min-height: 0px !important;
	}
</style>

<div data-segment="<?php echo $segment; ?>" id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>

</div>