<?php
/**
 * Block Name: Form Builder
 *
 * Description: form component
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'form' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-form';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$allowed_blocks = array( 'acf/ion-item', 'acf/button' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<InnerBlocks 
	templateInsertUpdatesSelection="false" 
	templateLock="false" 
	allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
	/>
</div>
