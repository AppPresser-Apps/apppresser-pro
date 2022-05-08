<?php
/**
 * Block Name: Fetch
 *
 * Description: fetch component
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'ion-img-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-ion-image';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_blocks();

error_log(print_r($block['data'], true));

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<InnerBlocks 
	templateInsertUpdatesSelection="false" 
	templateLock="false" 
	allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
	/>
</div>
