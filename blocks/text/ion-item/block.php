<?php
/**
 * Block Name: Item
 * Description: List item
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'item-' . $block['id'];

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$icon_type      = get_field( 'item_icon_type' );
$icon           = get_field( 'icon' );
$icon_thumbnail = get_field( 'icon_thumbnail' );
$label          = get_field( 'label' );
$description    = get_field( 'description' );
$detail         = get_field( 'detail' ) ? 'true' : 'false';

?>

<style>
	.clickable {
		z-index: 999;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

	<div class="clickable"></div>

	<ion-item href="#" detail="<?php echo esc_attr( $detail ); ?>">
		<?php if ( 'icon' === $icon_type ) : ?>
			<ion-icon size="large" slot="start" name="<?php echo esc_attr( $icon ); ?>"></ion-icon>
		<?php endif; ?>
		<?php if ( 'thumbnail' === $icon_type ) : ?>
			<ion-thumbnail slot="start">
				<ion-img src="<?php echo esc_url( $icon_thumbnail ); ?>"></ion-img>
			</ion-thumbnail>
		<?php endif; ?>
		<ion-label>
			<?php echo esc_attr( $label ); ?>
			<p> <?php echo esc_attr( $description ); ?> </p>
		</ion-label>
	</ion-item>

</div>
