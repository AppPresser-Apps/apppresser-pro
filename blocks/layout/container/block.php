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
	$style .= 'background-image: url(' . $background_image . '); ';
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

if ( $height && $height === 'pixels' ) {
	$style .= 'height: ' . $height_amount . 'px; ';
}

if ( $height && $height === 'percentage' ) {
	$style .= 'height: ' . $height_amount . '%; ';
}

$style .= 'overflow: hidden; ';

?>

<style>
	#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks {
		height: 100%
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
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
