<?php

/**
 * Onboard Menu Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'side-menu-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'side-menu';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}



$allowed_blocks = appp_get_allowed_view_blocks();

$title           = get_field( 'title' );
$hide_toolbar    = get_field( 'hide_toolbar' );
$toolbar_color   = get_field( 'toolbar_color' );
$content_padding = get_field( 'padding' );
$left_buttons    = get_field( 'left_buttons' );
$right_buttons   = get_field( 'right_buttons' );
$background      = get_field( 'background' );
$padding         = get_field( 'padding' );
$data_source     = get_field( 'data_source' );

$fullscreen = ! $hide_toolbar ? 'false' : 'true';

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
<div class="side-menu-wrap">

    <?php if ( ! $hide_toolbar ) : ?>
		<ion-header>
			<ion-toolbar color="<?php echo $toolbar_color ? esc_attr( $toolbar_color ) : 'primary'; ?>">
				<ion-buttons slot="start">
					<?php
					if ( $left_buttons ) {
						foreach ( $left_buttons as $button ) {
							appp_process_right_button( $button );
						};
					};
					?>
				</ion-buttons>
				<ion-title style="width:304px;"><?php echo $title ? esc_attr( $title ) : ''; ?></ion-title>
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
	<?php endif; ?>

	<ion-content style="<?php echo $style; ?>" fullscreen="true">
		<InnerBlocks 
			templateInsertUpdatesSelection="true"
			templateLock="false" 
			allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
	</ion-content>
</div>
</div>



<style type="text/css">

    #<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	#<?php echo $id; ?> .block-editor-block-list__layout .wp-block {
		width: 100%;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-side-menu.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-side-menu:after {
		box-shadow: none !important;
	}

	.wp-block-acf-menu.is-selected {
		width: 100%;
	}

	.<?php echo $className; ?> .side-menu-wrap {
		border: 1px solid #e0e0e0;
		height: 667px;
		width: 306px;
		margin:  0px auto !important;
		font-family: var(--ion-font-family, inherit);
	}

    #<?php echo $id; ?> ion-content {
		<?php if ( ! $hide_toolbar ) : ?>
			height: calc(100% - 44px) !important;
		<?php else : ?>
			height: 100% !important;
			--offset-top: 0px !important;
			--offset-bottom: 0px !important;
		<?php endif; ?>
	
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
