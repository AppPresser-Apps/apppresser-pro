<?php

/**
 * List Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'button-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-button';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$color       = get_field( 'color' );
$list_header = get_field( 'list_header' );
$list_items  = get_field( 'list_items' );

?>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">

	<ion-list style="overflow: hidden;">
	<?php if ( $list_header ) : ?>
		<ion-list-header color="<?php echo esc_attr( $color ); ?>" style="padding-top:16px;">
			<?php echo esc_attr( $list_header ); ?>
		</ion-list-header>
	<?php endif; ?>

	<?php if ( is_countable( $list_items ) && count( $list_items ) > 0 ) : ?>
		<?php foreach ( $list_items as $item ) : ?>
		<ion-item color="<?php echo esc_attr( $color ); ?>">
			<label><?php echo esc_attr( $item['label'] ); ?></label>
		</ion-item>
		<?php endforeach; ?>
	<?php else : ?>
		<ion-item color="<?php echo esc_attr( $color ); ?>">
			<label>Item</label>
		</ion-item>
	<?php endif; ?>

	<ion-list>
</div>
