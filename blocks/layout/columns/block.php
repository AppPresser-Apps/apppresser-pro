<?php
/**
 * Block Name: Columns
 *
 * Description: Wrapper block to allow inner blocks to be formatted into columns.
 */

// Dynamic block ID.
$block_id = 'columns-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-columns';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$allowed_blocks = array( 'acf/inner-columns' );

?>
<style>
#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks .block-editor-block-list__layout {
	display: flex;
	flex-direction: row;
}

#<?php echo esc_attr( $block_id ); ?> .wp-block-acf-inner-column {
	flex: 1;
}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="true" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
