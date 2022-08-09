<?php
/**
 * Block Name: Menu Toggle
 *
 * Description: wrapper to provide toggling menu
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'menu-toggle-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-menu-toggle';
if ( ! empty( $block['className'] ) ) {
	  $class_name .= ' ' . $block['className'];
}

$allowed_blocks = array( 'acf/ion-item' );
?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false"
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>