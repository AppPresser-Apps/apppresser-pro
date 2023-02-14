<?php
/**
 * Block Name: BP Groups
 *
 * Description: Display BuddyPress groups.
 *
 * @package AppPresser
 */

// Create id attribute value.
$block_id = 'bp-groups-' . $block['id'];

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-bp-groups';
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
		color: #cfcece;
	}
</style>

<div id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
	<div>BuddyPress Groups</div>
</div>
