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

$image = get_field( 'image' ) ?? APPPRESSER_URL . '/images/avatar-placeholder.png';

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">
	<ion-avatar>
		<img src="<?php echo esc_attr( $image ); ?>"/>
	</ion-avatar>
</div>
