<?php

// exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// check if class already exists
if ( ! class_exists( 'acf_field_unique_id' ) ) :

	/**
	 * acf_field_unique_id class
	 */
	class acf_field_unique_id extends acf_field {

		/**
		 * Loader
		 */
		function __construct() {

			/*
			*  name (string) Single word, no spaces. Underscores allowed
			*/

			$this->name = 'unique_id';

			/*
			*  label (string) Multiple words, can include spaces, visible when selecting a field type
			*/

			$this->label = __( 'Unique ID', 'acf-unique_id' );

			/*
			*  category (string) basic | content | choice | relational | jquery | layout | CUSTOM GROUP NAME
			*/

			$this->category = 'basic';

			/*
			*  l10n (array) Array of strings that are used in JavaScript. This allows JS strings to be translated in PHP and loaded via:
			*  var message = acf._e('unique_id', 'error');
			*/

			$this->l10n = array();

			// do not delete!
			parent::__construct();

		}


		/**
		 *  render_field()
		 *
		 *  Create the HTML interface for your field
		 *
		 *  @param   $field (array) the $field being rendered
		 *  @type    action
		 *  @since   3.6
		 *  @date    23/01/13
		 *  @param   $field (array) the $field being edited
		 *  @return  n/a
		 */
		function render_field( $field ) {

			$uuid36 = wp_generate_uuid4();
			$uuid32 = str_replace( '-', '', $uuid36 );

			$value = '' !== $field['value'] ? $field['value'] : $uuid32;
			?>
			<input type="text" readonly="readonly" input[type="hidden"] name="<?php echo esc_attr( $field['name'] ); ?>" value="<?php echo esc_attr( $value ); ?>" />
			<?php
		}
	}


	// create field
	new acf_field_unique_id();

	// class_exists check
endif;
