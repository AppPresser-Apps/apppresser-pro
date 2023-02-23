<?php
/**
 * Block Name: BP Profile
 *
 * Description: Display BuddyPress profile.
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'bp-profile' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-bp-profile';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();
?>

<style>
	#<?php echo $block_id; ?> {
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
    <InnerBlocks 
    templateInsertUpdatesSelection="false" 
    templateLock="false" 
    allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
    />
</div>
