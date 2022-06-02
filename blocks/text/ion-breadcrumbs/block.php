<?php
/**
 * Block Name: Breadcrumbs
 * Description: Breadcrumbs are navigation items that are used to indicate where a user is on an app or site. .
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'breadcrumbs-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$breadcrumbs = get_field( 'breadcrumb' );
$separator   = get_field( 'separator' );
$color       = get_field( 'color' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">
	<ion-breadcrumbs color="<?php echo esc_attr( $color ); ?>">

		<?php foreach ( $breadcrumbs as $breadcrumb ) : ?>
			<ion-breadcrumb href="#">
				<?php if ( 0 !== $breadcrumb['icon'] ) : ?>
					<ion-icon slot="start" name="<?php echo esc_attr( $breadcrumb['icon'] ); ?>"></ion-icon>
				<?php endif; ?>
				<?php echo esc_attr( $breadcrumb['title'] ); ?>
				<?php if ( 0 !== $separator ) : ?>
					<ion-icon slot="separator" name="<?php echo esc_attr( $separator ); ?>"></ion-icon>
				<?php endif; ?>
			</ion-breadcrumb>
		<?php endforeach; ?>

	</ion-breadcrumbs>
</div>
