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

?>

<style>
  #<?php echo esc_attr( $block_id ); ?> {
  	word-break: break-all;
  }

</style>
  
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
  <InnerBlocks 
    templateInsertUpdatesSelection="false" 
    templateLock="false" 
    allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
    />
</div>
