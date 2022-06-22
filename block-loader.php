<?php 

/**
 * Register ACF blocks
 *
 * @return void
 */
function appp_init_block_types() {

	// Check function exists.
	if ( function_exists( 'acf_register_block_type' ) ) {

		// register a view block.
		acf_register_block_type(
			array(
				'name'            => 'view',
				'title'           => __( 'View' ),
				'description'     => __( 'The most simple layout available consists of a toolbar and content. Most views in an app generally have both of these, but a toobar is not required in order to use content.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/view.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'view' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
				// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
			)
		);

		// register a modal block.
		acf_register_block_type(
			array(
				'name'            => 'modal',
				'title'           => __( 'Modal' ),
				'description'     => __( 'A Modal is a dialog that appears on top of the app\'s content, and must be dismissed by the app before interaction can resume.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/modal/block.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'modal' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
				// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
			)
		);

		// register a onboard view.
		acf_register_block_type(
			array(
				'name'            => 'onboard',
				'title'           => __( 'OnBoarding' ),
				'description'     => __( 'Onboard view' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/onboard.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'component', 'onboard' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
				// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
			)
		);

		// register a button block.
		acf_register_block_type(
			array(
				'name'            => 'button',
				'title'           => __( 'Button' ),
				'description'     => __( 'Button' ),
				'render_template' => APPPRESSER_DIR . '/blocks/text/button.php',
				'category'        => 'appp_text',
				'icon'            => 'button',
				'keywords'        => array( 'component', 'button' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register a list block.
		acf_register_block_type(
			array(
				'name'            => 'list_header',
				'title'           => __( 'List Header' ),
				'description'     => __( 'List Header a header component for a list. Unlike Item Divider, List Headers are styled to be stand-out from the rest of the list items.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/text/list-header/block.php',
				'category'        => 'appp_text',
				'icon'            => 'editor-ul',
				'keywords'        => array( 'component', 'list' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register breadcrumbs block.
		acf_register_block_type(
			array(
				'name'            => 'breadcrumbs',
				'title'           => __( 'Breadcrumbs' ),
				'description'     => __( 'Breadcrumbs are navigation items that are used to indicate where a user is on an app.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/text/ion-breadcrumbs/block.php',
				'category'        => 'appp_text',
				'icon'            => 'pressthis',
				'keywords'        => array( 'component', 'breadcrumb' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register segemnt block.
		acf_register_block_type(
			array(
				'name'            => 'segment',
				'title'           => __( 'Segment' ),
				'description'     => __( 'Segments are useful for toggling between different views inside of the content.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/patterns/ion-segment/block.php',
				'category'        => 'appp_patterns',
				'icon'            => 'ellipsis',
				'keywords'        => array( 'component', 'segment' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);


		// register a text block.
		acf_register_block_type(
			array(
				'name'            => 'text',
				'title'           => __( 'Paragraph' ),
				'description'     => __( 'Multi-line paragraph of text' ),
				'render_template' => APPPRESSER_DIR . '/blocks/text/text.php',
				'category'        => 'appp_text',
				'icon'            => 'editor-paragraph',
				'keywords'        => array( 'component', 'text' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// register a card block.
		acf_register_block_type(
			array(
				'name'            => 'card',
				'title'           => __( 'Card' ),
				'description'     => __( 'Card' ),
				'render_template' => APPPRESSER_DIR . '/blocks/patterns/card.php',
				'category'        => 'appp_patterns',
				'icon'            => 'feedback',
				'keywords'        => array( 'component', 'card' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
			)
		);

		// Begin Create-ACF-Block

		acf_register_block_type(
			array(
				'name'            => __( 'repeater' ),
				'title'           => __( 'Repeater' ),
				'description'     => __( 'Repeats a child block' ),
				'category'        => 'appp_data',
				'icon'            => 'update',
				'keywords'        => array( 'component', 'repeater', 'data' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'className'       => 'appp-repeater',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/data/repeater/block.php',
				'example'         => array(
					'attributes' => array(
						'mode' => 'preview',
						'data' => array(
							'_is_preview' => 'true',
						),
					),
				),
			)
		);
		acf_register_block_type(
			array(
				'name'            => 'openweather',
				'title'           => 'OpenWeather',
				'description'     => 'OpenWeather Api',
				'icon'            => 'cloud',
				'category'        => 'appp_third_party',
				'keywords'        => array( 'component', 'openweather' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'className'       => 'appp-openweather',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/third-party/openweather/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-image',
				'title'           => 'Image',
				'description'     => 'Image is a block that will lazily load an image when ever the tag is in the viewport',
				'category'        => 'appp_media',
				'keywords'        => array( 'component', 'image', 'photo' ),
				'icon'            => 'format-image',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/media/ion-image/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-thumbnail',
				'title'           => 'Thumbnail',
				'description'     => 'Image thumbnail',
				'category'        => 'appp_media',
				'keywords'        => array( 'component', 'image', 'photo' ),
				'icon'            => 'format-image',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/media/ion-thumbnail/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-item',
				'title'           => 'Item',
				'description'     => 'List item',
				'category'        => 'appp_text',
				'keywords'        => array( 'component', 'list', 'item' ),
				'icon'            => 'list-view',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/text/ion-item/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-chip',
				'title'           => 'Chip',
				'description'     => 'Chips represent complex entities in small blocks, such as a contact. A chip can contain several different elements such as avatars, text, and icons.',
				'category'        => 'appp_text',
				'keywords'        => array( 'component', 'text', 'chip', 'item' ),
				'icon'            => 'tag',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/text/ion-chip/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-avatar',
				'title'           => 'Avatar',
				'description'     => 'Avatars are circular components that usually wrap an image. They can be used to represent a person or an object',
				'category'        => 'appp_media',
				'keywords'        => array( 'component', 'avatar', 'image', 'media' ),
				'icon'            => 'buddicons-buddypress-logo',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/media/ion-avatar/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-icon',
				'title'           => 'Icon',
				'description'     => 'lazily loaded svg icons.',
				'category'        => 'appp_media',
				'keywords'        => array( 'component', 'icon', 'image', 'media' ),
				'icon'            => 'admin-generic',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/media/ion-icon/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-fab',
				'title'           => 'Floating Action Button',
				'description'     => 'Fabs are container elements that contain one or more fab buttons. They should be placed in a fixed position that does not scroll with the content. Fab should have one main fab-button.',
				'category'        => 'appp_text',
				'keywords'        => array( 'component', 'text', 'fab', 'item' ),
				'icon'            => 'button',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/text/ion-fab/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'fetch',
				'title'           => 'Fetch',
				'description'     => 'Fetches data from api endpoints and is available to the view and blocks.',
				'category'        => 'appp_data',
				'icon'            => 'database',
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/data/fetch/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'container',
				'title'           => 'Container',
				'description'     => 'Container block wraps an element to provide different layouts and design options',
				'category'        => 'appp_layout',
				'mode'            => 'preview',
				'align'           => 'center',
				'icon'            => 'layout',
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/container/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'columns',
				'title'           => 'Columns',
				'description'     => 'Wrapper block to allow inner blocks to be formatted into columns.',
				'category'        => 'appp_layout',
				'mode'            => 'preview',
				'align'           => 'center',
				'icon'            => 'columns',
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/columns/block.php',
			)
		);
		acf_register_block_type(
			array(
				'name'            => 'inner-column',
				'title'           => 'Inner Column',
				'description'     => 'inner column for columns block.',
				'category'        => 'appp_layout',
				'mode'            => 'preview',
				'align'           => 'center',
				'icon'            => 'columns',
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/columns' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/inner-column/block.php',
			)
		);
		// End Create-ACF-Block

	}
}
add_action( 'acf/init', 'appp_init_block_types' );