<?php

/**
 * Onboard View Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'appview-onboard' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'onboard';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$template = array(
	array(
		'acf/ion-image',
		array(
			'data' => array(
				'image'         => APPPRESSER_URL . 'images/image-placeholder.png',
				'border_radius' => 0,
			),
		),
	),
	array(
		'acf/text',
		array(
			'data' => array(
				'text'      => 'Onboard Heading here',
				'font_size' => 32,
			),
		),
	),
	array(
		'acf/text',
		array(
			'data' => array(
				'text' => 'Onboard message here.',
			),
		),
	),
	array(
		'acf/button',
		array(
			'data' => array(
				'title'  => 'Next',
				'expand' => 'block',
			),
		),
	),
);

$allowed_blocks = array(
	'core/image',
	'acf/button',
	'acf/text',
);


$title      = get_field( 'title' );
$background = get_field( 'background' );
$padding    = get_field( 'padding' );

$style = '';

if ( 'default' !== $background ) {
	$style .= '--background: var(--ion-color-' . $background . '); ';
}

$style .= '--padding-start: 16px; ';
$style .= '--padding-top: 16px; ';
$style .= '--padding-end: 16px; ';
$style .= '--padding-bottom: 16px; ';

?>
<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">
<div class="onboard-wrap">
	<ion-content style="<?php echo $style; ?>" fullscreen="true">
		<InnerBlocks 
			templateInsertUpdatesSelection="false" 
			template="<?php echo esc_attr( wp_json_encode( $template ) ); ?>"
			templateLock="all" 
			allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
	</ion-content>
</div>
</div>


<style type="text/css">
	#<?php echo $id; ?> .block-editor-block-list__layout {
		height: 605px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#<?php echo $id; ?> .block-editor-block-list__layout .wp-block {
		width: 100%;
	}
	#<?php echo $id; ?> .wp-block-acf-image {
		margin-top: auto;
	}
	#<?php echo $id; ?> .wp-block-acf-button {
		margin-top: auto;
	}
	#<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-onboard.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-onboard:after {
		box-shadow: none !important;
	}

	.wp-block-acf-onboard.is-selected {
		width: 100%;
	}

	.<?php echo $className; ?> .onboard-wrap {
		border: 1px solid #e0e0e0;
		height: 667px;
		width: 375px;
		margin:  0px auto !important;
		font-family: var(--ion-font-family, inherit);
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
