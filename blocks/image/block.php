<?php
/**
 * Block Name: Image
 *
 * Description: custom image block
 */

error_log( print_r( $block, true ) );

// Dynamic block ID.
$block_id = 'image-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$image         = get_field( 'image' );
$caption       = get_field( 'caption' );
$border_radius = get_field( 'border_radius' );

$style = '';

if ( $border_radius > 0 ) {
  $style .= 'overflow:hidden; ';
  $style .= 'border-radius:' . $border_radius . '%; ';
}

?>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
  <div>
	<ion-img style="<?php echo $style; ?>" src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $caption ); ?>" ></ion-img>
	<div style="font-size: 14px; color: var(--ion-color-medium); text-align: center;"><?php echo esc_attr( $caption ); ?></div>
  </div>
</div>
