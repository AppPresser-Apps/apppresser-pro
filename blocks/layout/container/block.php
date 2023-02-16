<?php
/**
 * Block Name: Container
 *
 * Description: wrapper to provide layout options for inner blocks
 *
 * @package AppPresser
 */

// Create id attribute value.
$id = 'container-' . $block['id'];

$block_id = str_replace( 'block_', 'block-', $block['id'] );

// Create class attribute allowing for custom "className" values.
$class_name = 'appp-container';
if ( ! empty( $block['className'] ) ) {
	  $class_name .= ' ' . $block['className'];
}

$allowed_blocks = appp_get_allowed_innerblocks();

$allowed_blocks[] = 'acf/columns';

$background          = get_field( 'color' );
$background_img      = get_field( 'background_image' );
$background_position = get_field( 'background_position' );
$position            = get_field( 'custom_position' );
$background_size     = get_field( 'background_size' );
$background_repeat   = get_field( 'background_repeat' );
$background_opacity  = get_field( 'background_opacity' );
$background_gradient = get_field( 'background_gradient' );
$margin              = get_field( 'margin' );
$padding             = get_field( 'padding' );
$border_radius       = get_field( 'border_radius' );
$height              = get_field( 'height' );
$height_amount       = get_field( 'height_amount' );
$width               = get_field( 'width' );
$width_amount        = get_field( 'width_amount' );

$bordertop    = get_field( 'border_top' );
$borderright  = get_field( 'border_right' );
$borderleft   = get_field( 'border_left' );
$borderbottom = get_field( 'border_bottom' );

$flex = get_field( 'flex' );

$style = '';

$style .= 'margin-left:' . ( $margin['margin_left'] ?? '0' ) . 'px; ';
$style .= 'margin-top:' . ( $margin['margin_top'] ?? '0' ) . 'px; ';
$style .= 'margin-right:' . ( $margin['margin_right'] ?? '0' ) . 'px; ';
$style .= 'margin-bottom:' . ( $margin['margin_bottom'] ?? '0' ) . 'px; ';

$style .= 'padding-left:' . ( $padding['padding_left'] ?? '16' ) . 'px; ';
$style .= 'padding-top:' . ( $padding['padding_top'] ?? '16' ) . 'px; ';
$style .= 'padding-right:' . ( $padding['padding_right'] ?? '16' ) . 'px; ';
$style .= 'padding-bottom:' . ( $padding['padding_bottom'] ?? '16' ) . 'px; ';

$topl = $border_radius['border_radius_top_left'] . 'px; ';
$topr = $border_radius['border_radius_top_right'] . 'px; ';
$botl = $border_radius['border_radius_bottom_left'] . 'px; ';
$botr = $border_radius['border_radius_bottom_right'] . 'px; ';

$style .= 'border-top: ' . $bordertop['width'] . 'px ' . $bordertop['style'] . ' ' . $bordertop['color'] . '; ';
$style .= 'border-right: ' . $borderright['width'] . 'px ' . $borderright['style'] . ' ' . $borderright['color'] . '; ';
$style .= 'border-left: ' . $borderleft['width'] . 'px ' . $borderleft['style'] . ' ' . $borderleft['color'] . '; ';
$style .= 'border-bottom: ' . $borderbottom['width'] . 'px ' . $borderbottom['style'] . ' ' . $borderbottom['color'] . '; ';

$style .= "border-radius: $topl $topr $botl $botr; ";

if ( $height && $height === 'pixels' ) {
	$style .= 'height: ' . $height_amount . 'px; ';
}

if ( $height && $height === 'percentage' ) {
	$style .= 'height: ' . $height_amount . '%; ';
}

if ( $width && $width === 'pixels' ) {
	$style .= 'width: ' . $width_amount . 'px; ';
}

if ( $width && $width === 'percentage' ) {
	$style .= 'width: ' . $width_amount . '%; ';
}

$style .= 'overflow: hidden; ';
$style .= 'position: relative; ';

// ::before styles

$background_image     = '';
$background_gradients = '';

$border_radius = "border-radius: $topl $topr $botl $botr; ";

if ( $background ) {
	$background_color = 'background-color: var(--ion-color-' . $background . '); ';
}

if ( $background_size ) {
	$background_size = 'background-size: ' . $background_size . '; ';
}

if ( $background_repeat ) {
	$background_repeat = 'background-repeat: ' . $background_repeat . '; ';
}

if ( $background_position && $background_position === 'custom' ) {
	$background_position = 'background-position: ' . $position . '; ';
} else {
	$background_position = 'background-position: ' . $background_position . '; ';
}

if ( $background_gradient && 'none' !== $background_gradient['type'] && ! empty( $background_gradient['colors'] ) ) {

	$colors = array();

	foreach ( $background_gradient['colors'] as $index => $color ) {
		$colors[] = 'var(--ion-color-' . $background_gradient['colors'][ $index ]['color'] . ')';
	}

	switch ( $background_gradient['type'] ) {
		case 'linear':
			$background_gradients = ' linear-gradient( ' . $background_gradient['angle'] . 'deg, ' . implode( ', ', $colors ) . ')';
			break;
		case 'radial':
			$background_gradients = ' radial-gradient( circle at ' . $background_gradient['position'] . ', ' . implode( ', ', $colors ) . ')';
			break;
		case 'conic':
			$background_gradients = ' conic-gradient( from ' . $background_gradient['angle'] . 'deg,' . implode( ', ', $colors ) . ')';
			break;
		case 'repeating-linear':
			$background_gradients = ' repeating-linear-gradient( ' . $background_gradient['angle'] . 'deg, ' . $colors[0] . ', ' . $colors[0] . ' ' . ( $background_gradient['size'] / 2 ) . 'px, ' . $colors[1] . ' ' . ( $background_gradient['size'] / 2 ) . 'px, ' . $colors[1] . ' ' . $background_gradient['size'] . 'px) ';
			break;
		case 'repeating-radial':
			$background_gradients = ' repeating-radial-gradient( circle at ' . $background_gradient['position'] . ', ' . $colors[0] . ', ' . $colors[0] . ' ' . ( $background_gradient['size'] / 2 ) . 'px, ' . $colors[1] . ' ' . ( $background_gradient['size'] / 2 ) . 'px, ' . $colors[1] . ' ' . $background_gradient['size'] . 'px) ';
			break;
	}
}

if ( $background_img ) {
	$background_image = 'url(' . $background_img . ')';
}

$comma = $background_img && 'none' !== $background_gradient['type'] ? ', ' : ' ';

?>

<style>

	#<?php echo esc_attr( $id ); ?>::before {
		content:"";
		background-image: <?php echo $background_image; ?> <?php echo $comma; ?> <?php echo $background_gradients; ?>;
		<?php echo $background_color; ?>;
		<?php echo $background_size; ?>;
		<?php echo $background_position; ?>;
		<?php echo $background_repeat; ?>;
		<?php echo $border_radius; ?>;
		opacity: <?php echo $background_opacity; ?>;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		width: auto;
		height: auto;
		z-index:-3;
		overflow: hidden;
	}


	#<?php echo esc_attr( $block_id ); ?> .block-editor-inner-blocks > div {
		width: 100%;
	}

	#<?php echo esc_attr( $block_id ); ?> .acf-block-body {
		width: 100%;
	}

	<?php
	if ( $height === 'auto' ) {
		$flexheight = 'auto';
	} else {

		if ( $height === 'pixels' ) {
			$flexheight = $height_amount . 'px';
		}

		if ( $height === 'percentage' ) {
			$flexheight = '100%';
		}
	}

	?>

	#<?php echo esc_attr( $id ); ?> .block-editor-block-list__layout {
		display: flex;
		flex-direction: <?php echo esc_attr( $flex['flex_direction'] ); ?> !important;
		justify-content: <?php echo esc_attr( $flex['justify_content'] ); ?>;
		align-items: <?php echo esc_attr( $flex['align_items'] ); ?>;
		height: <?php echo $flexheight; ?>;
	}

	#<?php echo esc_attr( $id ); ?>.block-editor-block-list__layout .block-editor-block-list__block {
		height: 100%;
	}

</style>

<div id="<?php echo esc_attr( $id ); ?>" class="<?php echo esc_attr( $class_name ); ?>" style="<?php echo $style; ?>">
	<InnerBlocks 
		templateInsertUpdatesSelection="false" 
		templateLock="false" 
		allowedBlocks="<?php echo esc_attr( wp_json_encode( $allowed_blocks ) ); ?>"
		/>
</div>

<!-- Set the height when a percentage with js because gutenberg is a bastard! -->
<script>
	function containerSetHeight() {
		const height = jQuery('ion-content').height();
		const percent = ( parseInt('<?php echo $height_amount; ?>') / 100) * height;
		console.log(percent);
		jQuery('#<?php echo esc_attr( $id ); ?>').height( percent );
		jQuery('#<?php echo esc_attr( $id ); ?> .block-editor-block-list__layout').height( percent );
	}

	<?php if ( $height === 'percentage' ) : ?>
		setTimeout(() => {
			containerSetHeight();
		}, 500);
		
	<?php endif; ?>

</script>
