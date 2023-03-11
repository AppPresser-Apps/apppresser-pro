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
$block_id = 'item-' . $block['id'];

$class_name = '';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}

$icon_type         = get_field( 'item_icon_type' );
$icon              = get_field( 'icon' );
$icon_thumbnail    = get_field( 'icon_thumbnail' );
$thumbnail_size    = get_field( 'thumbnail_size' );
$thumbnail_radius  = get_field( 'thumbnail_radius' );
$label             = get_field( 'label' );
$description       = get_field( 'description' );
$detail            = get_field( 'detail' ) ? 'true' : 'false';
$detail_icon       = get_field( 'icon_detail' );
$lines             = get_field( 'lines' );
$background_color  = get_field( 'background_color' );
$icon_color        = get_field( 'icon_color' );
$detail_icon_color = get_field( 'detail_icon_color' );
$label_color       = get_field( 'label_color' );
$label_position    = get_field( 'label_position' );
$description_color = get_field( 'description_color' );
$input_type        = get_field( 'input_type' );
$toggle            = get_field( 'toggle' );
$checkbox          = get_field( 'checkbox' );
$padding_top       = get_field( 'padding_top' );
$padding_bottom    = get_field( 'padding_bottom' );

$select = get_field( 'select' );
$input  = get_field( 'input' );

$position = 'default' === $label_position ? '' : 'position="' . $label_position . '"';

$required = isset( $input['required'] ) ? 'required=true' : '';
$disabled = isset( $input['disabled'] ) ? 'disabled=true' : '';

$range_min = isset( $input['range_min'] );
$range_max = isset( $input['range_max'] );
$step_size = isset( $input['step_size'] );

$required_text = empty( $input['required_text'] ) ? '*' : '';

$is_required = $required ? $required_text : '';

$thumbnail = ! empty( $icon_thumbnail ) ? $icon_thumbnail : APPPRESSER_URL . '/images/avatar-placeholder.png';

// error_log( print_r( $icon_thumbnail, true ) );

?>

<style>
	.clickable {
		z-index: 999;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.wp-block-acf-ion-item {
		width: 100%;
	}
</style>

<div style="width: 100%;" id="<?php echo esc_attr( $block_id ); ?>" class="<?php echo esc_attr( $class_name ); ?>">

	<div class="clickable"></div>
	
	<ion-item style="width: 100%; --padding-top: <?php echo $padding_top; ?>px; --padding-bottom: <?php echo $padding_bottom; ?>px; --detail-icon-color: var( --ion-color-<?php echo $detail_icon_color; ?>); --detail-icon-opacity: 1; " color="<?php echo esc_attr( 'default' !== $background_color ? $background_color : '' ); ?>" 
			  href="#" detail="<?php echo '0' === $detail_icon ? 'false' : 'true'; ?>" 
			  detail-icon="<?php echo '0' === $detail_icon ? 'false' : $detail_icon; ?>"
			  lines="<?php echo $lines; ?>"
	>
		<?php if ( 'icon' === $icon_type ) : ?>
			<ion-icon color="<?php echo esc_attr( 'default' !== $icon_color ? $icon_color : '' ); ?>" size="large" slot="start" name="<?php echo esc_attr( $icon ); ?>"></ion-icon>
		<?php endif; ?>
		<?php if ( 'thumbnail' === $icon_type ) : ?>
			<ion-thumbnail style="width: <?php echo $thumbnail_size; ?>px; height: <?php echo $thumbnail_size; ?>px; --border-radius: <?php echo $thumbnail_radius; ?>px" slot="start">
				<ion-img src="<?php echo esc_url( $thumbnail ); ?>"></ion-img>
			</ion-thumbnail>
		<?php endif; ?>

		<?php if ( ! empty( $label ) ) : ?>
		<ion-label <?php echo $position; ?> color="<?php echo esc_attr( 'default' !== $label_color ? $label_color : '' ); ?>">
			<?php echo esc_attr( $label ); ?> <?php echo esc_attr( $is_required ); ?>
			<ion-text color="<?php echo esc_attr( $description_color ); ?>"><p> <?php echo esc_attr( $description ); ?> </p></iom-text>
		</ion-label>
			<?php
		endif;

		switch ( $input_type ) {
			case 'checkbox':
				echo '<ion-checkbox color=' . $checkbox['color'] . ' checked slot="start">ddddddd</ion-checkbox> 
					<ion-label>' . $checkbox['description'] . '</ion-label>';
				break;
			case 'toggle':
				echo '<ion-toggle color=' . $toggle['color'] . ' checked></ion-toggle>';
				break;
			case 'select':
				echo '<ion-select>';

				// foreach ( $select['options'] as $key => $value ) {
				// echo '<ion-select-option value="' . $value['value'] . '">' . $value['label'] . '</ion-select-option>';
				// }

				echo '</ion-select>';
				break;
			case 'input':
				switch ( $input['input_type'] ) {
					case 'number':
						echo '<ion-input inputmode="numeric" ' . $disabled . ' ' . $required . ' readonly="true" placeholder="' . $input['placeholder'] . '" type="' . $input['input_type'] . '" value="' . $input['input_value'] . '"></ion-input>';
						break;
					case 'textarea':
						echo '<ion-textarea ' . $disabled . ' ' . $required . ' readonly="true" placeholder="' . $input['placeholder'] . '" type="' . $input['input_type'] . '" value="' . esc_attr( $input['input_value'] ) . '" autogrow="' . $input['autogrow'] . '" rows="' . $input['rows'] . '"></ion-textarea>';
						break;
					case 'range':
						echo '<ion-range min=' . $range_min . '  max=' . $range_min . ' step=' . $step_size . ' ></ion-range>';
						break;
					default:
						echo '<ion-input autocomplete="off" inputmode="text" ' . $disabled . ' ' . $required . ' readonly="true" placeholder="' . $input['placeholder'] . '" type="' . $input['input_type'] . '" value="' . $input['input_value'] . '"></ion-input>';
						break;
				}

				break;

			default:
				break;
		}
		?>
	</ion-item>

</div>
