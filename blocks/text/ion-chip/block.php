<?php
/**
 * Block Name: Chip
 * Description: Chips represent complex entities in small blocks, such as a contact. A chip can contain several different elements such as avatars, text, and icons.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'chip-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$text = get_field( 'text' );
$color = get_field( 'color' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

	<ion-chip color="<?php echo esc_attr( $color ); ?>">
		<ion-label><?php echo esc_attr( $text ); ?></ion-label>
	</ion-chip>

</div>
