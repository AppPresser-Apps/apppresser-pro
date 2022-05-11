<?php
/**
 * Block Name: Container
 *
 * Description: wrapper to rpovide layout options for inner blocks
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

$background = get_field( 'background' );
$padding    = get_field( 'padding' );

$style = '';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding-top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding-right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding-bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

if ( $background ) {
	$style .= 'background-color: var(--ion-color-' . $background . '); ';
}

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>
