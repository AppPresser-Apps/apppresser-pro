<?php
/**
 * Block Name: Avatar
 * Avatars are circular components that usually wrap an image. They can be used to represent a person or an object.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'avatar-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$image      = get_field( 'image_url' ) ? get_field( 'image_url' ) : APPPRESSER_URL . '/images/avatar-placeholder.png';
$image_size = get_field( 'image_size' );
$alt_text   = get_field( 'alt_text' );
$border   = get_field( 'border' );

$styles = '';

$styles .= 'width: ' . $image_size . 'px; ';
$styles .= 'height: ' . $image_size . 'px; ';
$styles .= 'border: ' . $border['width'] . 'px solid ' . $border['color'] . '; ';

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">
	<ion-avatar style="<?php echo $styles; ?>">
		<ion-img src="<?php echo esc_attr( $image ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>"/>
	</ion-avatar>
</div>
