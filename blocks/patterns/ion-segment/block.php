<?php
/**
 * Block Name: Segment
 * Description: Segments are useful for toggling between different views inside of the content.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'segment-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$text  = get_field( 'text' );
$color = get_field( 'color' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

<ion-segment>
	<ion-segment-button value="friends">
		<ion-label>Friends</ion-label>
	</ion-segment-button>
	<ion-segment-button value="enemies">
		<ion-label>Enemies</ion-label>
	</ion-segment-button>
</ion-segment>


</div>
