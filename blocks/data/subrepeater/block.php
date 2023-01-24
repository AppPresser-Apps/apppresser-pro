<?php
/**
 * Block Name: Subrepeater
 * Description: repeats a child block with data from parent repeater
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Dynamic block ID.
$block_id = 'subrepeater-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$subdata = get_field( 'subdata' );

$allowed_blocks = appp_get_allowed_innerblocks();

//$allowed_blocks = array_push($allowed_blocks, 'acf/subrepeater');

?>
<style>

</style>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
	<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"/>
</div>
