<?php

/**
 * Popover Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Create id attribute allowing for custom "anchor" value.
$id = 'popover-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$className = 'popover';
if ( ! empty( $block['className'] ) ) {
	$className .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

?>

<style type="text/css">

	#<?php echo esc_attr( $id ); ?> {
		display: none;
	}

	.is-selected #<?php echo esc_attr( $id ); ?>,
	.has-child-selected #<?php echo esc_attr( $id ); ?> {
		display: block;
	}

	.wp-block-acf-popover.is-highlighted::after,
	.block-editor-block-list__layout .block-editor-block-list__block.wp-block-acf-popover:after {
		box-shadow: none !important;
	}

	.wp-block-acf-popover.is-highlighted {
		outline: 0px !important;
		box-shadow: none !important;
	}

	.<?php echo $className; ?> .popover-wrap {
		border: 1px solid #e0e0e0;
		height: 367px;
		width: 275px;
		margin:  0px auto !important;
		font-family: var(--ion-font-family, inherit);
		overflow: hidden;
		border-radius: 9px;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);

	}

</style>


<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">

	<div class="popover-wrap">
		<ion-content>
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
