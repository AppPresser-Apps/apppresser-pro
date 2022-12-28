<?php
/**
 * Block Name: Repeater
 * Description: repeats a child block
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Dynamic block ID.
$block_id = 'repeater-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$per_page       = get_field( 'per_page' );
$data_source    = get_field( 'data_source' );
$request_method = get_field( 'request_method' );

$allowed_blocks = array( 'acf/card', 'acf/button', 'acf/openweather', 'acf/ion-image', 'acf/ion-thumbnail', 'acf/ion-item', 'acf/action', "acf/container" );

?>
<style>

</style>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
	<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"/>
</div>
