<?php
/**
 * Block Name: Iframe
 *
 * Description: loads a url in iframe
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'iframe-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-iframe';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

?>

<style>
	#<?php echo $block_id; ?> {
		margin: 16px;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		height: 180px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #e0e0e0;

	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<div>Iframe</div>
</div>
