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
$label             = get_field( 'label' );
$description       = get_field( 'description' );
$detail            = get_field( 'detail' ) ? 'true' : 'false';
$detail_icon       = get_field( 'icon_detail' );
$lines             = get_field( 'lines' );
$background_color  = get_field( 'background_color' );
$icon_color        = get_field( 'icon_color' );
$label_color       = get_field( 'label_color' );
$label_position    = get_field( 'label_position' );
$description_color = get_field( 'description_color' );
$input_type        = get_field( 'input_type' );
$toggle            = get_field( 'toggle' );
$checkbox          = get_field( 'checkbox' );

$select = get_field( 'select' );
$input  = get_field( 'input' );

$position = 'default' === $label_position ? '' : 'position="' . $label_position . '"';

$required = $input['required'] ? 'required=true' : '';
$disabled = $input['disabled'] ? 'disabled=true' : '';

$required_text = empty( $input['required_text'] ) ? '*' : '';

$is_required = $required ? $required_text : '';

// error_log( print_r( $required_text, true ) );

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
	
	<ion-item style="width: 100%;" color="<?php echo esc_attr( 'default' !== $background_color ? $background_color : '' ); ?>" 
			  href="#" detail="<?php echo '0' === $detail_icon ? 'false' : 'true'; ?>" 
			  detail-icon="<?php echo '0' === $detail_icon ? 'false' : $detail_icon; ?>"
			  lines="<?php echo $lines; ?>"
	>
		<?php if ( 'icon' === $icon_type ) : ?>
			<ion-icon color="<?php echo esc_attr( 'default' !== $icon_color ? $icon_color : '' ); ?>" size="large" slot="start" name="<?php echo esc_attr( $icon ); ?>"></ion-icon>
		<?php endif; ?>
		<?php if ( 'thumbnail' === $icon_type ) : ?>
			<ion-thumbnail slot="start">
				<ion-img src="<?php echo esc_url( $icon_thumbnail ); ?>"></ion-img>
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
				echo '<ion-select value="' . $select['default'] . '">';

				foreach ( $select['options'] as $key => $value ) {
					echo '<ion-select-option value="' . $value['value'] . '">' . $value['label'] . '</ion-select-option>';
				}

				echo '</ion-select>';
				break;
			case 'input':
				switch ( $input['input_type'] ) {
					case 'number':
						echo '<ion-input inputmode="numeric" ' . $disabled . ' ' . $required . ' readonly="true" placeholder="' . $input['placeholder'] . '" type="' . $input['input_type'] . '" value="' . $input['input_value'] . '"></ion-input>';
						break;
					case 'textarea':
						echo '<ion-textarea ' . $disabled . ' ' . $required . ' readonly="true" placeholder="' . $input['placeholder'] . '" type="' . $input['input_type'] . '" value="' . $input['input_value'] . '" autogrow="' . $input['autogrow'] . '" rows="' . $input['rows'] . '"></ion-textarea>';
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
