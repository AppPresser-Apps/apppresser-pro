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

<style type="text/css">

	#<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-view.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-view:after {
		box-shadow: none !important;
	}

	.wp-block-acf-view.is-selected {
		width: 100%;
	}

	.<?php echo $className; ?> .view-wrap {
		border: 1px solid #e0e0e0;
		height: 667px;
		width: 375px;
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

<style>
	.block-tag {
		font-size: 12px;
		padding: 2px 15px;
		color: #555555;
		display: flex;

	}
	.block-tag-actions {
		display: flex;
		justify-content: flex-end;
	
	}
	.block-tag > * {
		flex: 1 100%;
		height: 0px;
	}
	.is-selected.wp-block-acf-view .block-tag {
		/* color: #ffffff;
		background: var(--wp-admin-theme-color); */
	}
	.is-selected.wp-block-acf-view .block-tag-actions {
		display: flex;
		justify-content: flex-end;
	}

	.load-repeater-<?php echo esc_attr( $id ); ?>.spin .spinr.dashicons {
		animation: 1.5s linear infinite spinner;
		/* transform: translate3d(-50%, -50%, 0); */
		will-change: transform;
		/* position: absolute;
		left: 50%;
		top: 50%; */
	}



	@keyframes spinner {
		0% {
		  transform: rotate(0deg);
		}
		100% {
		  transform: rotate(360deg);
		}
	  }
</style>

<div id="<?php echo esc_attr( $id ); ?>" class="view <?php echo esc_attr( $className ); ?>">

	<div class="view-wrap">

		<?php if ( ! $hide_toolbar ) : ?>
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
					<ion-title style="width:373px;"><?php echo $title ? esc_attr( $title ) : ''; ?></ion-title>
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
		<ion-content style="<?php echo $style; ?>" fullscreen="<?php echo $fullscreen; ?>">
			<InnerBlocks 
				templateInsertUpdatesSelection="true" 
				templateLock="false" 
				allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
			/>
		</ion-content>
	</div>
</div>

<script>
	appp_remove_button_class("#<?php echo esc_attr( $id ); ?>");
</script>
