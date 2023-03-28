<?php

/**
 * Card Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'card-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-card';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$sub_title    = get_field( 'sub_title' );
$title        = get_field( 'title' );
$title_size   = get_field( 'title_size' );
$content      = get_field( 'content' );
$header_image = get_field( 'header_image' );
$image_height = get_field( 'image_height' ) ?? 300;

$per_page = get_field( 'per_page' );

$style = '';

$style .= 'font-family: var(--ion-font-family, inherit); font-size: 15px; font-weight: 170; ';

?>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<div style="<?php echo $style; ?>">
		<ion-card href="#">
			<div style="background-image: url(<?php echo esc_url( APPPRESSER_URL . '/images/image-placeholder.png' ); ?>); height: <?php echo esc_attr( $image_height ); ?>px; background-size: cover; background-position: center; " data-bg-image=" <?php echo esc_attr( $header_image ); ?> "></div>
			<ion-card-header>
				<ion-card-subtitle><?php echo esc_attr( $sub_title ); ?></ion-card-subtitle>
				<ion-card-title style="font-size: <?php echo $title_size; ?>px;"><?php echo esc_attr( $title ); ?></ion-card-title>
			</ion-card-header>

			<?php if ( ! empty( $content ) ) : ?>
			<ion-card-content>
				<?php echo esc_attr( $content ); ?>
			</ion-card-content>
			<?php endif; ?>
		</ion-card>
	</div>
</div>
