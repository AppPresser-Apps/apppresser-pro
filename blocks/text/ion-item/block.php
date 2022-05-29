<?php
/**
 * Block Name: Item
 * Description: List item
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Dynamic block ID.
$block_id = 'repeater-' . $block['id'];

$block_classes = implode( ' ', array( $block['className'] ) );

$image = get_field( 'image_url' );
$label = get_field( 'label' );
$description = get_field( 'description' );

?>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $block_classes ); ?>">

	<ion-item>
		<ion-avatar slot="start">
			<img src="/wp-content/plugins/apppresser-pro/images/avatar-placeholder.png" data-src=" <?php echo esc_attr( $image ); ?> ">
		</ion-avatar>
		<ion-label>
		<?php echo esc_attr( $label ); ?>
		<p> <?php echo esc_attr( $description ); ?> </p>
		</ion-label>
		
	</ion-item>

</div>
