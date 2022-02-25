<?php

/**
 * Testimonial Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'appview-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'appview';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

// Load values and assing defaults.
$visibility = get_field( 'visibility' );

$allowed_blocks = array( 'core/image', 'core/paragraph', 'core/spacer' );
$toolbar_blocks = array( 'core/paragraph' );

$template = array(
	array(
		'acf/button',
		array(
			'placeholder' => 'Add a root-level paragraph',
		),
	),
);

?>
<div mode="ios" id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">

	<ion-header>
		<ion-toolbar color="primary">
			<ion-buttons slot="start">
				
			</ion-buttons>
			<ion-title><?php echo $title ? $title : 'View'; ?></ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content>
		<InnerBlocks templateInsertUpdatesSelection="false" templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>" />
	</ion-content>

</div>


<style type="text/css">
	.<?php echo $className; ?> {
		border: 1px solid #e0e0e0;
		height: 640px;
		width: 320px;
		margin-bottom: 40px;
	}
	ion-content {
		height: calc(100% - 44px);
	}
	ion-title {
		width: 150px;
	}
</style>
