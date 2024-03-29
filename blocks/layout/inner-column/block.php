<?php
  /**
   * Block Name: Inner Column
   *
   * Description: inner column for cloumns block.
   */

  // Dynamic block ID
// Create id attribute value.
$block_id = 'inner-column-' . $block['id'];

$parent_id = str_replace( '_', '-', $block['id']);

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-inner-column';
if ( ! empty( $block['className'] ) ) {
	  $class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$alignment = get_field( 'alignment' );
$vertical  = get_field( 'alignment_vertical' );
$padding  = get_field( 'padding' );
$flex_grow  = get_field( 'flex_grow' );

$style = '';

if ( $alignment ) {
	// $style .= 'display: flex; ';
	// $style .= 'justify-content: ' . $alignment . '; ';
	// $style .= 'align-items: ' . $vertical . '; ';
	// $style .= 'height: 100%; ';
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
		height: 100%;
		word-break: break-all;
	}
	.wp-block-acf-inner-column .acf-block-body,
	.wp-block-acf-inner-column .acf-block-body > div,
	.wp-block-acf-inner-column .acf-block-preview,
	.wp-block-acf-inner-column .block-editor-inner-blocks,
	.wp-block-acf-inner-column .block-editor-block-list__layout {
		height: 100%;
	}

	/* .wp-block-acf-inner-column .block-editor-block-list__layout < div {
		flex: 1;
	} */

	#<?php echo esc_attr( $parent_id ); ?> {
		flex-grow: <?php echo esc_attr( $flex_grow ); ?>;
	}

	#<?php echo esc_attr( $block_id ); ?> .block-editor-block-list__layout {
		display: flex !important;
		flex-direction: column !important;
		justify-content: <?php echo esc_attr( $vertical ); ?> ;
		align-items: <?php echo esc_attr( $alignment ); ?>;
		height: 100%;
		width: 100%;
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
	templateInsertUpdatesSelection="true" 
	templateLock="false" 
	allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
	/>
</div>


