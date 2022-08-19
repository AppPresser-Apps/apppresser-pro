<?php
/**
 * Block Name: Container
 *
 * Description: wrapper to provide layout options for inner blocks
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'container-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-container';
if ( ! empty( $block['className'] ) ) {
	  $class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$background          = get_field( 'color' );
$background_image    = get_field( 'background_image' );
$background_position = get_field( 'background_position' );
$position            = get_field( 'custom_position' );
$background_size     = get_field( 'background_size' );
$background_repeat   = get_field( 'background_repeat' );
$background_gradient = get_field( 'background_gradient' );
$margin              = get_field( 'margin' );
$padding             = get_field( 'padding' );
$border_radius       = get_field( 'border_radius' );
$height              = get_field( 'height' );
$height_amount       = get_field( 'height_amount' );

$flex = get_field( 'flex' );

$style = '';

$style .= 'margin-left:' . ( $margin['margin_left'] ?? '0' ) . 'px; ';
$style .= 'margin-top:' . ( $margin['margin_top'] ?? '0' ) . 'px; ';
$style .= 'margin-right:' . ( $margin['margin_right'] ?? '0' ) . 'px; ';
$style .= 'margin-bottom:' . ( $margin['margin_bottom'] ?? '0' ) . 'px; ';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding-top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding-right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding-bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

$topl = $border_radius['border_radius_top_left'] . 'px';
$topr = $border_radius['border_radius_top_right'] . 'px';
$botl = $border_radius['border_radius_bottom_left'] . 'px';
$botr = $border_radius['border_radius_bottom_right'] . 'px';

$style .= "border-radius: $topl $topr $botl $botr; ";

if ( $background ) {
	$style .= 'background-color: var(--ion-color-' . $background . '); ';
}

if ( $background_image ) {
	//$style .= 'background-image: url(' . $background_image . '); ';
}

if ( $background_size ) {
	$style .= 'background-size: ' . $background_size . '; ';
}

if ( $background_repeat ) {
	$style .= 'background-repeat: ' . $background_repeat . '; ';
}

if ( $background_position && $background_position !== 'custom' ) {
	$style .= 'background-position: ' . $background_position . '; ';
}

if ( $background_position && $background_position === 'custom' ) {
	$style .= 'background-position: ' . $position . '; ';
}

if ( $background_gradient && 'none' !== $background_gradient['type'] && ! empty( $background_gradient['colors'] ) ) {

	$colors = array();

	foreach ( $background_gradient['colors'] as $index => $color ) {
		$colors[] = 'var(--ion-color-' . $background_gradient['colors'][ $index ]['color'] . ')';
	}

	switch ( $background_gradient['type'] ) {
		case 'linear':
			$style .= 'background-image: linear-gradient( ' . $background_gradient['angle'] . 'deg, ' . implode( ', ', $colors ) . '; ';
			break;
		case 'radial':
			$style .= 'background-image: radial-gradient( circle at ' . $background_gradient['position'] . ', ' . implode( ', ', $colors ) . '; ';
			break;
		case 'conic':
			$style .= 'background-image: conic-gradient( from ' . $background_gradient['angle'] . 'deg,' . implode( ', ', $colors ) . '; ';
			break;
		case 'repeating-linear':
			$style .= 'background-image: repeating-linear-gradient(-45deg, white, white 20px, black 20px, black 40px); ';

			// $style .= 'background-image: repeating-linear-gradient( ' . $background_gradient['angle'] . 'deg, ' . implode( ', ', $colors ) . ' ' . $background_gradient['size'] . 'px; ';
			break;


	}
}

// background: repeating-linear-gradient(#e66465, #e66465 20px, #9198e5 20px, #9198e5 25px);
// background: repeating-linear-gradient(45deg, #3f87a6, #ebf8e1 15%, #f69d3c 20%);

if ( $height && $height === 'pixels' ) {
	$style .= 'height: ' . $height_amount . 'px; ';
}

if ( $height && $height === 'percentage' ) {
	$style .= 'height: ' . $height_amount . '%; ';
}

if ( $height && $height === 'auto' ) {
	$style .= 'height: 100%; ';
}

$style .= 'overflow: hidden; ';

?>

<style>
	#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks {
		height: 100%;
		width: 100%;
	}
	#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks > div {
		display: flex;
		flex-direction: <?php echo esc_attr( $flex['flex_direction'] ); ?>;
		justify-content: <?php echo esc_attr( $flex['justify_content'] ); ?>;
		align-items: <?php echo esc_attr( $flex['align_items'] ); ?>;
		height: 100%;
	}
	#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks .wp-block {
	
	}
	.appp-container {
		/* height: 100%; */
	}
	.wp-block-acf-container {
		/* width: 100%; */
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
