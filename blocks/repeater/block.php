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

if ( ! empty( $block['data']['_is_preview'] ) ) {
	?>
		<img src="<?php echo APPPRESSER_URL; ?>/images/image-placeholder.png" alt="Preview of the repeater block">
	<?php
} else {

// Dynamic block ID.
$block_id = 'repeater-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$per_page = get_field( 'per_page' );


$allowed_blocks = array( 'acf/card', 'acf/button' );

$block['custom'] = 'sssssss';

?>
<style>
	.block-tag {
		font-size: 12px;
		padding: 4px;
		color: #ffffff;
		background: var(--wp-admin-theme-color);
		display: none;

	}
	.is-selected.wp-block-acf-repeater .block-tag {
		display: block;
	}
</style>


<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
	<div class="block-tag">Repeater</div>
	<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"/>
</div>

<div style="opacity: 0.4;" class="items-repeat-<?php echo $block['id']; ?>"></div>

<script>
	var <?php echo $block['id']; ?> = {
		'per_page': <?php echo $per_page; ?>
	}
	// appp_update_repeater('<?php echo $block['id']; ?>', <?php echo $per_page; ?>);
</script>
<? }
