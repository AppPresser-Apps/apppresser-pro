<?php
/**
 * Block Name: Segment
 * Description: Segments are useful for toggling between different views inside of the content.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'segment-' . $block['id'];

$block_classes = '';
if ( ! empty( $block['className'] ) ) {
	$block_classes .= ' ' . $block['className'];
}

$segments = get_field( 'segments' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">
	<div style="margin:16px;">
		<ion-segment  value="<?php echo str_replace( ' ', '_', $segments[0]['label'] ); ?>">

		<?php foreach ( $segments as $segment ) : ?>
			<ion-segment-button value="<?php echo str_replace( ' ', '_', $segment['label'] ); ?>">
				<ion-label><?php echo $segment['label']; ?></ion-label>
			</ion-segment-button>
		<?php endforeach; ?>
		</ion-segment>
	</div>

	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( array( 'acf/segment' ) ) ); ?>"
		/>

</div>


<script>
	const block = document.querySelectorAll('#<?php echo esc_attr( $block_id ); ?>');

	const segments = block[0].querySelectorAll('ion-segment');

	setTimeout(() => {
		apppSelectSegement(block, segments[0].getAttribute('value'));
	}, 100);


	for (let i = 0; i < segments.length; i++) {
		segments[i].addEventListener('ionChange', (ev) => {
			console.log('Segment changed', ev.detail.value);
			apppSelectSegement(block, ev.detail.value);
		});
	}

	function apppSelectSegement(block, segment) {

		const segents = document.querySelectorAll('[data-segment]');
		for (let i = 0; i < segents.length; i++) {
			segents[i].classList.add('hidden');
		}

		const el1 = block[0].querySelector('[data-segment="' + segment + '"]');

		el1.classList.toggle('hidden');

	}
</script>
