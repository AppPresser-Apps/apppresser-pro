<?php

/**
 * Hack to stop the notice of mismatched template because guttenberg will
 * no allow you to lock the parent template and then allow child blocks to be unlocked.
 * If you read this then go to WP git forums and complain about it so its fixed!!!!
 *
 * @return void
 */
function appp_custom_editor_css() {

	echo "
    <style type='text/css'>
	div.editor-template-validation-notice.components-notice.is-warning,
	div.block-editor-block-inspector__advanced,
	div.block-editor-post-preview__dropdown,
	div.interface-more-menu-dropdown {
		display: none !important;
	}
	.is-root-container.block-editor-block-list__layout {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.edit-post-visual-editor__post-title-wrapper {
		padding: 0 20px;
		font-size: 0.8rem;
	}
	.block-editor-inserter {
		position: absolute;
		right: 20px;
		top: -50px;
	}
	.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > * {
		margin-left: 0px !important;
		margin-right: 0px !important;
		margin: 0px !important;
	}
	.edit-post-visual-editor__post-title-wrapper {
		margin-top: 1.5rem;
	}

	.no-iris-picker .wp-picker-input-wrap {
		display: none !important;
	}

	.no-iris-picker .wp-picker-clear {
		display: none !important;
	}
	
	.no-iris-picker.wp-picker-container {
		display: block;
	}
	
	.no-iris-picker .wp-picker-container input[type=text].wp-color-picker {
		outline: 0 !important;
		border: 1px solid #dddddd !important;
		box-shadow: none !important;
		pointer-events: none;
	}
	
	.no-iris-picker .wp-picker-container:active {
		display: block;
	}
	
	.no-iris-picker .iris-picker.iris-border {
		width: 100% !important;
		height: auto !important;
		padding-bottom: 0 !important;
		border: 0;
	}
	
	.no-iris-picker .iris-border .iris-picker-inner {
		display: none;
	}
	
	.no-iris-picker .iris-palette-container {
		position: static !important;
		font-size: 0;
		line-height: 1;
		padding: 3px;
	}
	
	.no-iris-picker .iris-palette {
		border: 3px solid white;
		border-radius: 5px !important;
		box-shadow: inset 0 0 1px black !important;
		display: inline-block;
		float: none !important;
		height: 36.9px !important;
		margin: 0 !important;
		margin-left: 0 !important;
		width: 36.9px !important;
	}
	
	.no-iris-picker .wp-picker-clear {
		display: inline-block !important;
	}
	.post-type-app .row-actions {
		display: none;
	}

	:root {
		--ion-color-white: #ffffff;
		--ion-color-white-rgb: 255,255,255;
		--ion-color-white-contrast: #000000;
		--ion-color-white-contrast-rgb: 0,0,0;
		--ion-color-white-shade: #e0e0e0;
		--ion-color-white-tint: #ffffff;

		--ion-color-black: #000000;
		--ion-color-black-rgb: 0,0,0;
		--ion-color-black-contrast: #ffffff;
		--ion-color-black-contrast-rgb: 255,255,255;
		--ion-color-black-shade: #000000;
		--ion-color-black-tint: #1a1a1a;
	}
	
	.ion-color-white {
		--ion-color-base: var(--ion-color-white);
		--ion-color-base-rgb: var(--ion-color-white-rgb);
		--ion-color-contrast: var(--ion-color-white-contrast);
		--ion-color-contrast-rgb: var(--ion-color-white-contrast-rgb);
		--ion-color-shade: var(--ion-color-white-shade);
		--ion-color-tint: var(--ion-color-white-tint);
	}

	.ion-color-black {
		--ion-color-base: var(--ion-color-black);
		--ion-color-base-rgb: var(--ion-color-black-rgb);
		--ion-color-contrast: var(--ion-color-black-contrast);
		--ion-color-contrast-rgb: var(--ion-color-black-contrast-rgb);
		--ion-color-shade: var(--ion-color-black-shade);
		--ion-color-tint: var(--ion-color-black-tint);
	}
    </style>
    ";
}
add_action( 'admin_footer', 'appp_custom_editor_css', 999 );

function dashboard_logo() {
	echo '
        <style type="text/css">
			#wpadminbar #wp-admin-bar-wp-logo>.ab-item {
				padding: 0 7px;
				background-image: url(' . esc_url( APPPRESSER_URL . '/images/appp-icon.png' ) . ') !important;
				background-size: 70%;
				background-position: center;
				background-repeat: no-repeat;
				opacity: 0.8;
			}
			#wpadminbar #wp-admin-bar-wp-logo>.ab-item .ab-icon:before {
				content: " ";
				top: 2px;
			}
			a.components-button.edit-post-fullscreen-mode-close.has-icon {
				background-image: url(' . esc_url( APPPRESSER_URL . '/images/appp-icon.png' ) . ') !important;
				background-position: center;
				margin: 0;
				padding: 0;
				background-size: 100%;
				background-repeat: no-repeat;
				color: rgba(0,0,0,0);
			}
			.edit-post-fullscreen-mode-close.has-icon:before,
			.edit-post-fullscreen-mode-close.has-icon:hover:before {
				box-shadow: none;
			}
        </style>
    ';
}
add_action( 'wp_before_admin_bar_render', 'dashboard_logo' );

function appp_set_root_theme_styles() {

	global $post, $pagenow;

	if ( ( $pagenow == 'post.php' ) || ( get_post_type() == 'app' ) ) {

		//error_log( print_r( $post, true, ) );

		$fields = array(
			'primary',
			'secondary',
			'tertiary',
			'success',
			'warning',
			'danger',
			'dark',
			'medium',
			'light',
		);

		$palette = array();

		foreach ( $fields as $field ) {
			$palette[ $field ] = get_field( $field, $post->ID );
		}

		//error_log(print_r($palette, true,));

	}

}
add_action( 'admin_head', 'appp_set_root_theme_styles' );
