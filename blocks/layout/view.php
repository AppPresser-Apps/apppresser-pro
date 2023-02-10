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

$block_id = str_replace( 'block_', 'block-', $block['id'] );

// Create class attribute allowing for custom "className" values.
$className = 'appview';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_view_blocks();

$title               = get_field( 'title' );
$logo                = get_field( 'logo' );
$hide_toolbar        = get_field( 'hide_toolbar' );
$toolbar_color       = get_field( 'toolbar_color' );
$content_padding     = get_field( 'padding' );
$left_buttons        = get_field( 'left_buttons' );
$right_buttons       = get_field( 'right_buttons' );
$background          = get_field( 'background' );
$background_image    = get_field( 'background_image' );
$background_size     = get_field( 'background_size' );
$background_size     = get_field( 'background_position' );
$background_position = get_field( 'background_position' );
$padding             = get_field( 'padding' );
$data_source         = get_field( 'data_source' );
$display             = get_field( 'display' );
$flex                = get_field( 'flex' );

$fullscreen = ! $hide_toolbar ? 'false' : 'true';

$style = '';

$style .= '--padding-start:' . ( $padding['padding_left'] ?? '0' ) . 'px; ';
$style .= '--padding-top:' . ( $padding['padding_top'] ?? '0' ) . 'px; ';
$style .= '--padding-end:' . ( $padding['padding_right'] ?? '0' ) . 'px; ';
$style .= '--padding-bottom:' . ( $padding['padding_bottom'] ?? '0' ) . 'px; ';

if ( $background_image ) {
	$style .= '--background: url(' . $background_image . '); ';
	$style .= 'background-size: ' . $background_size . '; ';
	$style .= 'background-position: ' . $background_position . '; ';
}


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

	ion-content .block-editor-block-list__layout,
	ion-content .block-editor-inner-blocks {
		height: 100%;
	}

	<?php if ( 'flex' === $display ) : ?>

	#<?php echo $block_id; ?> ion-content > .block-editor-inner-blocks > .block-editor-block-list__layout {
		display: <?php echo esc_attr( $display ); ?>;
		flex-direction: <?php echo esc_attr( $flex['flex_direction'] ); ?>;
		justify-content: <?php echo esc_attr( $flex['justify_content'] ); ?>;
		align-items: <?php echo esc_attr( $flex['align_items'] ); ?>;
		gap: <?php echo esc_attr( $flex['gap'] ); ?>px;
		height: 100%;
	}
	<?php endif; ?>

	.wp-block-acf-view.is-highlighted {
		outline: 0px !important;
		box-shadow: none !important;
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
					<ion-title style="width:373px;">
						<?php if ( $logo ) : ?>
							<img src="<?php echo esc_url( wp_get_attachment_image_url( $logo, 'large' ) ); ?>" style="height: 40px; margin-top: 4px;" />
						<?php else : ?>
							<?php echo $title ? esc_attr( $title ) : ''; ?>
						<?php endif; ?>
					</ion-title>
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
		<ion-content color="<?php echo $background ? esc_attr( $background ) : 'default'; ?>" style="<?php echo $style; ?>" fullscreen="<?php echo $fullscreen; ?>">
			<InnerBlocks 
				templateInsertUpdatesSelection="true" 
				templateLock="false" 
				allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
			/>
		</ion-content>
	</div>
</div>
