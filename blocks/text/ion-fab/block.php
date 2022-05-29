<?php
/**
 * Block Name: Floating Action Button
 * Fabs are container elements that contain one or more fab buttons. They should be placed in a fixed position that does not scroll with the content. Fab should have one main fab-button.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'fab-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$icon  = get_field( 'icon' );
$color = get_field( 'color' );

$vert  = get_field( 'vertical' );
$horiz = get_field( 'horizontal' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
	<ion-fab-button color="<?php echo esc_attr( $color ); ?>">
	  <ion-icon name="<?php echo esc_attr( $icon ); ?>"></ion-icon>
	</ion-fab-button>
  </ion-fab>

</div>
