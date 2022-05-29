<?php
/**
 * Block Name: Ion Img.
 *
 * Description: Img is a tag that will lazily load an image when ever the tag is in the viewport.
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'ion-img-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-ion-image';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$select_source = get_field( 'select_source' );
$border_radius = get_field( 'border_radius' );

$margin        = get_field( 'margin' );
$margin_top    = $margin['margin_top'];
$margin_right  = $margin['margin_right'];
$margin_bottom = $margin['margin_bottom'];
$margin_left   = $margin['margin_left'];

$image = APPPRESSER_URL . '/images/image-placeholder.png';

switch ( $select_source ) {
	case 'media':
		$image = get_field( 'media_library' );
		break;
	case 'url':
		$image = get_field( 'image_url' );
		break;
	case 'data':
		$image = get_field( 'data_source' );
		break;
}

?>
	<style>
		#<?php echo esc_attr( $block_id ); ?> {
		}

		#<?php echo esc_attr( $block_id ); ?> ion-img {
			border-radius: <?php echo esc_attr( $border_radius ); ?>px;
			overflow: hidden;
			margin-top: <?php echo esc_attr( $margin_top ); ?>px;
			margin-right: <?php echo esc_attr( $margin_right ); ?>px;
			margin-bottom: <?php echo esc_attr( $margin_bottom ); ?>px;
			margin-left: <?php echo esc_attr( $margin_left ); ?>px;
		}

	</style>

	<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
		<ion-img src="<?php echo esc_attr( $image ); ?>"/>
	</div>
