<?php

/**
 * Action Sheet Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'action-sheet-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'action-sheet';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$header         = get_field( 'header' );
$subheader      = get_field( 'subheader' );
$cancel_button  = get_field( 'cancel_button' );
$action_buttons = get_field( 'action_buttons' );

$buttons = isset( $buttons['buttons'] ) ? $buttons['buttons'] : array();

?>

<style>

	#<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-action-sheet.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-action-sheet:after {
		box-shadow: none !important;
	}

	.wp-block-acf-view.is-selected {
		width: 100%;
	}

	.wp-block-acf-view.is-highlighted {
		outline: 0px !important;
		box-shadow: none !important;
	}


	.<?php echo $className; ?> .action-sheet-wrap {
		border: 1px solid #e0e0e0;
		height: 667px;
		width: 375px;
		margin:  0px auto !important;
		font-family: var(--ion-font-family, inherit);
		background: #e6e6e6;
		padding: 0 16px;
		display: flex;
		flex-direction: column;
		justify-content: end;
	}

	.action-sheet-group.sc-ion-action-sheet-ios {
		border-radius: 13px;
		margin-bottom: 8px;
	}

	.action-sheet-group.sc-ion-action-sheet-ios {
		-ms-flex-negative: 2;
		flex-shrink: 2;
		overscroll-behavior-y: contain;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		pointer-events: all;
		background: var(--background, #ffffff);
	}

	.action-sheet-title.sc-ion-action-sheet-ios {
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 14px;
		padding-bottom: 13px;
		color: var(--color, var(--ion-color-step-400, #999999));
		font-size: 13px;
		font-weight: 400;
		text-align: center;
	}

	.action-sheet-sub-title.sc-ion-action-sheet-ios {
		padding-left: 0;
		padding-right: 0;
		padding-top: 6px;
		padding-bottom: 0;
		font-size: 13px;
		font-weight: 400;
	}

	.action-sheet-button.sc-ion-action-sheet-ios {
		padding-left: 18px;
		padding-right: 18px;
		padding-top: 18px;
		padding-bottom: 18px;
		height: 56px;
		font-size: 20px;
		contain: strict;
	}

	.action-sheet-destructive.sc-ion-action-sheet-ios {
		color: var(--ion-color-danger, #eb445a) !important;
	}

	.action-sheet-destructive.sc-ion-action-sheet-ios:hover {
		color: var(--ion-color-danger, #eb445a);
	}

	.action-sheet-group.sc-ion-action-sheet-ios:last-child {
		margin-bottom: 10px;
	}

	.action-sheet-button.sc-ion-action-sheet-ios {
		display: block;
		position: relative;
		width: 100%;
		border: 0;
		outline: none;
		background: var(--button-background);
		color: var(--button-color);
		font-family: inherit;
		overflow: hidden;
	}

	.action-sheet-button-inner.sc-ion-action-sheet-ios {
		display: -ms-flexbox;
		display: flex;
		position: relative;
		-ms-flex-flow: row nowrap;
		flex-flow: row nowrap;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		-ms-flex-align: center;
		align-items: center;
		-ms-flex-pack: center;
		justify-content: center;
		pointer-events: none;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.action-sheet-selected.sc-ion-action-sheet-ios {
		font-weight: bold;
	}

	.action-sheet-button::after {
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		position: absolute;
		content: "";
		opacity: 0;
	}

	.action-sheet-button:hover::after {
		background: var(--button-background-selected, #b3b3b3);
		opacity: var(--button-background-selected-opacity, 0.1);
	}

	.action-sheet-selected:hover::after {
		background: var(--button-background-selected, #b3b3b3);
		opacity: var(--button-background-selected-opacity, 0.1);
	}

	.action-sheet-destructive:hover::after {
		background: var(--ion-color-danger, #eb445a);
		opacity: var(--button-background-selected-opacity, 0.1);
	}

</style>


<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<div id="action" class="action-sheet-wrap">
		<div class="action-sheet">
			<div class="action-sheet-group sc-ion-action-sheet-ios">
				<div class="action-sheet-title action-sheet-has-sub-title sc-ion-action-sheet-ios"><?php echo esc_attr( $header ); ?><div class="action-sheet-sub-title sc-ion-action-sheet-ios"><?php echo esc_attr( $subheader ); ?></div></div>
				<?php foreach ( $buttons as $button ) : ?>
					<button type="button" class="action-sheet-button ion-activatable ion-focusable action-sheet-<?php echo esc_attr( $button['role'] ); ?> sc-ion-action-sheet-ios"><span class="action-sheet-button-inner sc-ion-action-sheet-ios"><?php echo esc_attr( $button['title'] ); ?></span></button>
				<?php endforeach; ?>
			</div>
			<div class="action-sheet-group action-sheet-group-cancel sc-ion-action-sheet-ios">
				<button type="button" class="action-sheet-button ion-activatable ion-focusable action-sheet-cancel sc-ion-action-sheet-ios">
					<span class="action-sheet-button-inner sc-ion-action-sheet-ios"><?php echo esc_attr( $cancel_button['title'] ); ?></span>
				</button>
			</div>
		</div>
	</div>
</div>
