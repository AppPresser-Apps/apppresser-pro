<?php
/**
 * Block Name: Repeater
 * Description: repeats a child block
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */


// Dynamic block ID.
$block_id = 'repeater-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$per_page    = get_field( 'per_page' );
$data_source = get_field( 'data_source' );
$request_method = get_field( 'request_method' );

$allowed_blocks = array( 'acf/card', 'acf/button', 'acf/openweather', 'acf/ion-image', 'acf/ion-thumbnail', 'acf/ion-item'  );

?>
<style>
	.block-tag {
		font-size: 12px;
		padding: 4px;
		color: #555555;
		background: #e0e0e0;
		display: flex;

	}
	.block-tag-actions {
		display: none;
		
	}
	.block-tag > * {
		flex: 1 100%;
	}
	.is-selected.wp-block-acf-repeater .block-tag {
		color: #ffffff;
		background: var(--wp-admin-theme-color);
	}
	.is-selected.wp-block-acf-repeater .block-tag-actions {
		display: flex;
		justify-content: flex-end;
	}

	.load-repeater-<?php echo $block['id']; ?>.spin .spinr.dashicons {
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


<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
	<div class="block-tag">
		<div>Repeater</div>
		<div class="block-tag-actions">
			<div class="load-repeater-<?php echo $block['id']; ?>" style="cursor:pointer;">
			<div class="spinr dashicons dashicons-update"></div>
		</div>
		</div>
		
	</div>
	<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"/>
</div>

<div style="opacity: 0.5;" class="items-repeat-<?php echo $block['id']; ?>"></div>

<script>
	var <?php echo $block['id']; ?> = {
		'per_page': <?php echo $per_page; ?>,
		'data_source': "<?php echo $data_source; ?>",
		'request_method': "<?php echo $request_method; ?>"
	}
	jQuery(document).ready(function() {

		jQuery('.load-repeater-<?php echo $block['id']; ?>').click( function(e) {
			jQuery(this).toggleClass("spin");
			appp_load_repeater();
		});

		jQuery(document).on("stopSpinner", ()=> {
			jQuery('.load-repeater-<?php echo $block['id']; ?>').removeClass("spin");
		});
	});
</script>
