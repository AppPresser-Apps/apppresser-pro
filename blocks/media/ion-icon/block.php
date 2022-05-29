<?php
/**
 * Block Name: Icon
 * Lazily loaded icons.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'icon-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$icon = get_field( 'icon' ) ?? 'heart-outline';
$size = get_field( 'size' ) ?? 'large';
$color = get_field( 'color' ) ?? 'primary';

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">
	<ion-icon name="<?php echo esc_attr( $icon ); ?>" size="<?php echo esc_attr( $size ); ?>" color="<?php echo esc_attr( $color ); ?>"></ion-icon>
</div>