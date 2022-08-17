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

$class_name = '';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$icon_type         = get_field( 'item_icon_type' );
$icon              = get_field( 'icon' );
$icon_thumbnail    = get_field( 'icon_thumbnail' );
$label             = get_field( 'label' );
$description       = get_field( 'description' );
$detail            = get_field( 'detail' ) ? 'true' : 'false';
$background_color  = get_field( 'background_color' );
$icon_color        = get_field( 'icon_color' );
$label_color       = get_field( 'label_color' );
$description_color = get_field( 'description_color' );

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

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">

	<div class="clickable"></div>

	<ion-item color="<?php echo esc_attr( 'default' !== $background_color ? $background_color : ''); ?>" href="#" detail="<?php echo esc_attr( $detail ); ?>">
		<?php if ( 'icon' === $icon_type ) : ?>
			<ion-icon color="<?php echo esc_attr( 'default' !== $icon_color ? $icon_color : '' ); ?>" size="large" slot="start" name="<?php echo esc_attr( $icon ); ?>"></ion-icon>
		<?php endif; ?>
		<?php if ( 'thumbnail' === $icon_type ) : ?>
			<ion-thumbnail slot="start">
				<ion-img src="<?php echo esc_url( $icon_thumbnail ); ?>"></ion-img>
			</ion-thumbnail>
		<?php endif; ?>
		<ion-label color="<?php echo esc_attr( 'default' !== $label_color ? $label_color : '' ); ?>">
			<?php echo esc_attr( $label ); ?>
			<ion-text color="<?php echo esc_attr( $description_color ); ?>"><p> <?php echo esc_attr( $description ); ?> </p></iom-text>
		</ion-label>
	</ion-item>

</div>
