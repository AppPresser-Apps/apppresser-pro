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

$image_field   = get_field( 'image_url' );
$image         = $image_field ? $image_field : APPPRESSER_URL . '/images/image-placeholder.png';
$alt_text      = get_field( 'alt_text' );
$image_size    = get_field( 'image_size' );
$border_radius = get_field( 'border_radius' );

$styles = '';

$styles .= '--size: ' . $image_size . 'px; ';
$styles .= '--border-radius: ' . $border_radius . '%; ';

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">

<ion-thumbnail style="<?php echo $styles; ?>">
	<ion-img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>"/>
</ion-thumbnail>

</div>
