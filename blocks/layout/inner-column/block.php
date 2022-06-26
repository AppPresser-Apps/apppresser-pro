<?php
  /**
   * Block Name: Inner Column
   *
   * Description: inner column for cloumns block.
   */

  // Dynamic block ID
// Create id attribute value.
$block_id = 'inner-column-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-inner-column';
if ( ! empty( $block['className'] ) ) {
	  $class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$alignment = get_field( 'alignment' );
$vertical  = get_field( 'alignment_vertical' );
$padding  = get_field( 'padding' );

$style = '';

if ( $alignment ) {
	$style .= 'display: flex; ';
	$style .= 'justify-content: ' . $alignment . '; ';
	$style .= 'align-items: ' . $vertical . '; ';
	$style .= 'height: 100%; ';
}

if ( $padding ) {
	$style .= 'padding-top: ' . $padding['padding_top'] . 'px; ';
	$style .= 'padding-bottom: ' . $padding['padding_bottom'] . 'px; ';
	$style .= 'padding-left: ' . $padding['padding_left'] . 'px; ';
	$style .= 'padding-right: ' . $padding['padding_right'] . 'px; ';
}

?>

<style>
	#<?php echo esc_attr( $block_id ); ?> {
		word-break: break-all;
	}
	.wp-block-acf-inner-column .acf-block-body,
	.wp-block-acf-inner-column .acf-block-body > div,
	.wp-block-acf-inner-column .acf-block-preview {
		height: 100%;
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
	templateInsertUpdatesSelection="true" 
	templateLock="false" 
	allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
	/>
</div>
