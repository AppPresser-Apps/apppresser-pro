<?php
/**
 * Block Name: Conditional
 *
 * Description: wrapper to provide display options for inner blocks
 *
 * @package AppPresser
 */

// Create id attribute value.
$id = 'conditional-' . $block['id'];

$block_id = str_replace( 'block_', 'block-', $block['id'] );

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-conditional';
if ( ! empty( $block['className'] ) ) {
		$class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$allowed_blocks[] = 'acf/columns';

?>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
