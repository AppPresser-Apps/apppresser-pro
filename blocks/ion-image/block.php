<?php
  /**
   * Block Name: Ion-Image
   *
   * Description: ionic image component
   */


  // Create id attribute allowing for custom "anchor" value.
  $block_id = 'ion-img-' . $block['id'];

  // Create class attribute allowing for custom "className" values.
  $class_name = 'appp-ion-image';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

  $image = get_field( 'image_url' );

?>


  
  <div id="<?php echo $block_id; ?>" class="<?php echo $class_name; ?>">

    <ion-img src="https://plugin-dev.local/wp-content/plugins/apppresser-pro/images/image-placeholder.png" data-src=" <?php echo $image; ?> "/>
	
  </div>
