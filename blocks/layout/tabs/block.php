<?php

/**
 * Tabs Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'tabs-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'tabs';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$color = get_field( 'color' );

$tabs  = get_field( 'tabs' );

?>

<style type="text/css">

	#<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-ion-tabs.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-ion-tabs:after {
		box-shadow: none !important;
	}

	.wp-block-acf-ion-tabs.is-highlighted {
		outline: 0px !important;
		box-shadow: none !important;
	}

	.wp-block-acf-tabs.is-selected {
		width: 100%;
	}

	.<?php echo $className; ?> .tabs-wrap {
		border: 1px solid #e0e0e0;
		height: 667px;
		width: 375px;
		margin:  0px auto !important;
		font-family: var(--ion-font-family, inherit);
	}
</style>


<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
	<div class="tabs-wrap">
		<ion-content>
			<ion-tabs>
				<ion-tab-bar slot="bottom" color="<?php echo esc_attr( $color ); ?>">
                <?php foreach ( $tabs as $tab ) : ?>
					<ion-tab-button tab="schedule">
						<ion-icon name="<?php echo esc_attr( $tab['icon'] ); ?>" aria-hidden="true"></ion-icon>
						<ion-label><?php echo esc_attr( $tab['label'] ); ?></ion-label>
					</ion-tab-button>
                <?php endforeach ; ?>
				</ion-tab-bar>
			</ion-tabs>
		</ion-content>
	</div>
</div>
