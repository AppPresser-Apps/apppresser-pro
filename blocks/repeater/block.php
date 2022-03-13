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

// error_log(print_r($content,true));

// Dynamic block ID.
$block_id = 'repeater-' . $block['id'];

$blockClasses = implode( ' ', array( $block['className'] ) );

$per_page = get_field( 'per_page' );


$allowed_blocks = array( 'acf/card', 'acf/button' );

$block['custom'] = 'sssssss';

?>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">
	<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"/>
</div>
<!-- <div style="text-align:center; font-size: 12px;">Example Items</div> -->
<div style="opacity: 0.4;" class="items-repeat-<?php echo $block['id']; ?>"></div>

<script>
	var <?php echo $block['id']; ?> = {
		'per_page': <?php echo $per_page; ?>
	}
	appp_update_repeater('<?php echo $block['id']; ?>', <?php echo $per_page; ?>);
</script>
