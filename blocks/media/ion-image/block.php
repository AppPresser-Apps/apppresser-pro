<?php
/**
 * Block Name: Ion Img.
 *
 * Description: Img is a tag that will lazily load an image when ever the tag is in the viewport.
 *
 * @package AppPresser
 */

// Create id attribute value.
$id = 'ion-img-' . $block['id'];

$block_id = str_replace('block_', 'block-', $block['id']);

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-ion-image';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$image_url     = get_field( 'image_url' );
$border_radius = get_field( 'border_radius' );
$width         = get_field( 'width' );
$width_amount  = get_field( 'width_amount' );

$margin        = get_field( 'margin' );
$margin_top    = $margin['margin_top'] ?? 0;
$margin_right  = $margin['margin_right'] ?? 0;
$margin_bottom = $margin['margin_bottom'] ?? 0;
$margin_left   = $margin['margin_left'] ?? 0;


$image = $image_url ? $image_url : APPPRESSER_URL . '/images/image-placeholder.png';

?>
	<style>

		#<?php echo esc_attr( $block_id ); ?> div {
			width: auto !important;
		}

		#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks {
			width: auto !important;
		}

		#<?php echo esc_attr( $block_id ); ?> .block-editor-block-list__layout {
			width: auto !important;
		}

		#<?php echo esc_attr( $block_id ); ?> ion-img {
			border-radius: <?php echo esc_attr( $border_radius ); ?>px;
			overflow: hidden;
			margin-top: <?php echo esc_attr( $margin_top ); ?>px;
			margin-right: <?php echo esc_attr( $margin_right ); ?>px;
			margin-bottom: <?php echo esc_attr( $margin_bottom ); ?>px;
			margin-left: <?php echo esc_attr( $margin_left ); ?>px;
		}

		<?php if ( 'pixels' === $width ) : ?>
			#<?php echo esc_attr( $block_id ); ?>,
			#<?php echo esc_attr( $block_id ); ?> ion-img {
				width: <?php echo esc_attr( $width_amount ); ?>px;
			}
		<?php endif ; ?>

		<?php if ( 'percentage' === $width ) : ?>
			#<?php echo esc_attr( $block_id ); ?>,
			#<?php echo esc_attr( $block_id ); ?> ion-img {
				width: <?php echo esc_attr( $width_amount ); ?>%;
			}
		<?php endif ; ?>

	</style>

	<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
		<ion-img src="<?php echo esc_attr( $image ); ?>"/>
	</div>
