<?php

/**
 * Accordian Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$block_id = 'accordian-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'accordian';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$accordions = get_field( 'accordion' );

?>
<style>
	#<?php echo esc_attr( $block_id ); ?> {
	
	}
</style>
<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<ion-accordion-group>

		<?php foreach ( $accordions as $key => $value ) : ?>
			<ion-accordion value="first">
				<ion-item slot="header" color="light">
				<ion-label><?php echo esc_attr( $value['title'] ); ?></ion-label>
				</ion-item>
				<div class="ion-padding" slot="content">
				<?php echo $value['content']; ?>
				</div>
			</ion-accordion>
		<?php endforeach; ?>

	</ion-accordion-group>
</div>
