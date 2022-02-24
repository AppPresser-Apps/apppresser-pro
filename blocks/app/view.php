<?php

/**
 * Testimonial Block Template.
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

// Load values and assing defaults.
$text = get_field( 'title' ) ?: 'Your title here...';

$allowed_blocks = array( 'core/image', 'core/paragraph', 'core/list' );

?>
<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $className ); ?>">

<style type="text/css">
		.<?php echo $className; ?> {
			border: 1px solid #efefef;
			height: 640px;
			width: 320px;
			display: block;
			position: relative;
			margin-bottom: 40px;
		}
		.toolbar {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			background: lightblue;
			height: 44px;
		}
		.title {
			text-align: center;
			line-height: 44px;
		}
		.content {
			margin-top: 44px;
		}
	</style>

	<div class="toolbar">
		<div class="title">
			<?php echo $text; ?>
		</div>
	</div>
	<div class="content">
		<InnerBlocks templateLock="false" allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>" />
	<div>

</div>
