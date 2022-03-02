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

$title = get_field( 'title' );
$toolbar_color = get_field( 'toolbar_color' );

$allowed_blocks = appp_get_allowed_blocks();


?>
<div mode="ios" id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<ion-header>
		<ion-toolbar color="<?php echo $toolbar_color ? esc_attr( $toolbar_color ) : 'primary'; ?>">
			<ion-buttons slot="start">
			</ion-buttons>
			<ion-title><?php echo $title ? esc_attr( $title ) : 'View'; ?></ion-title>
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
		margin: 10px !important;
	}
	ion-content {
		height: calc(100% - 44px);
	}
	ion-title {
		width: 150px;
	}
</style>
