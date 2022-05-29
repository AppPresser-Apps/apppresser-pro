<?php
/**
 * Block Name: Thumbnail
 *
 * Description: Thumbnails are square components that usually wrap an image.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'thumbnail-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-ion-thumbnail';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$image = get_field( 'image_url' );

?>

<div id="<?php echo $block_id; ?>" class="<?php echo $class_name; ?>">

<ion-thumbnail>
	<ion-img src="/wp-content/plugins/apppresser-pro/images/image-placeholder.png" data-src=" <?php echo $image; ?> "/>
</ion-thumbnail>

</div>
