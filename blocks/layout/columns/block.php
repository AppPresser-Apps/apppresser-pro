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

$margin  = get_field( 'margin' );
$padding = get_field( 'padding' );

$style = '';

$style .= 'margin-left:' . ( $margin['margin_left'] ?? '0' ) . 'px; ';
$style .= 'margin-top:' . ( $margin['margin_top'] ?? '0' ) . 'px; ';
$style .= 'margin-right:' . ( $margin['margin_right'] ?? '0' ) . 'px; ';
$style .= 'margin-bottom:' . ( $margin['margin_bottom'] ?? '0' ) . 'px; ';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding-top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding-right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding-bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

?>
<style>

.wp-block-acf-columns {
	width: 100%;
}
#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks > .block-editor-block-list__layout {
	display: flex;
	flex-direction: row;
	/* justify-content: center;
	align-items: center; */
}

</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo esc_attr( $style ); ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="true" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
