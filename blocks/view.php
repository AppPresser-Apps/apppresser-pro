<?php

/**
 * Blank View Block Template.
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

$allowed_blocks = appp_get_allowed_blocks();

$title           = get_field( 'title' );
$toolbar_color   = get_field( 'toolbar_color' );
$content_padding = get_field( 'padding' );
$left_buttons    = get_field( 'left_buttons' );
$right_buttons   = get_field( 'right_buttons' );
$background      = get_field( 'background' );
$padding         = get_field( 'padding' );

error_log(print_r($padding,true));

$style = '';

if ( 'default' !== $background ) {
	$style .= '--background: var(--ion-color-' . $background . '); ';
}

$style .= '--padding-start:' . ( $padding['padding_left'] ?? '0' ) . 'px; ';
$style .= '--padding-top:' . ( $padding['padding_top'] ?? '0' ) . 'px; ';
$style .= '--padding-end:' . ( $padding['padding_right'] ?? '0' ) . 'px; ';
$style .= '--padding-bottom:' . ( $padding['padding_bottom'] ?? '0' ) . 'px; ';

?>
<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<ion-header>
		<ion-toolbar color="<?php echo $toolbar_color ? esc_attr( $toolbar_color ) : 'primary'; ?>">
			<ion-buttons slot="start">
				<?php
				if ( $left_buttons ) {
					foreach ( $left_buttons as $button ) {
						appp_process_left_button( $button );
					};
				};
				?>
			</ion-buttons>
			<ion-title style="width:140px;"><?php echo $title ? esc_attr( $title ) : 'View'; ?></ion-title>
			<ion-buttons slot="end">
				<?php
				if ( $right_buttons ) {
					foreach ( $right_buttons as $button ) {
						appp_process_right_button( $button );
					};
				};
				?>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content style="<?php echo $style; ?>">
		<InnerBlocks 
			templateInsertUpdatesSelection="false" 
			templateLock="false" 
			allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
			renderAppender="InnerBlocks.ButtonBlockAppender" 
		/>
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


<script>

	// We need this because ion-button has a class 
	// .button and WordPress editor styles is screwing up the design
	setTimeout(() => {
		const view = document.querySelector('#<?php echo esc_attr( $id ); ?>');

		var content = view.querySelector('ion-content');
		<?php if ( $content_padding ) : ?>
			content.classList.add('ion-padding');
		<?php endif; ?>

		var menubtns = view.querySelectorAll('ion-menu-button'), i;

		for (i = 0; i < menubtns.length; ++i) {
			menubtns[i].classList.remove('button');
			menubtns[i].setAttribute('auto-hide', false);
			menubtns[i].classList.remove('menu-button-hidden');
		}

		var btns = view.querySelectorAll('ion-button'), i;

		for (i = 0; i < btns.length; ++i) {
			btns[i].classList.remove('button');
		}

	}, 500);


</script>
