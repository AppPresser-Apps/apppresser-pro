<?php
/**
 * Block Name: List header
 * Description: List Header a header component for a list. Unlike Item Divider, List Headers are styled to be stand-out from the rest of the list items.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'list-header-' . $block['id'];

if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$label        = get_field( 'label' );
$label_border  = get_field( 'label_border' );
$color_label  = get_field( 'color_label' );
$button_label = get_field( 'button_label' );
$color_button = get_field( 'color_button' );

?>

<style>

</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

	<ion-list-header lines="<?php echo esc_attr( $label_border ); ?>">
		<ion-label color="<?php echo esc_attr( $color_label ); ?>"><?php echo esc_attr( $label ); ?></ion-label>
		<?php if ( ! empty( $button_label ) ) : ?>
		<ion-button color="<?php echo esc_attr( $color_button ); ?>"><?php echo esc_attr( $button_label ); ?></ion-button>
		<?php endif ; ?>	
	</ion-list-header>

</div>

<script>
	// We need this because ion-button has a class
	// .button and WordPress editor styles is screwing up the design
setTimeout(() => {
	const view = document.querySelector("#<?php echo esc_attr( $block_id ); ?>");

	console.log(view);

	var btns = view.querySelectorAll("ion-button"),
		i;

	for (i = 0; i < btns.length; ++i) {
		btns[i].classList.remove("button");
	}

}, 500);
</script>
