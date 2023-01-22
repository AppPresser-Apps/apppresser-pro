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
				'description'     => __( 'The view consists of a toolbar and content. These are the pages in your app.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/view.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'view' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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

		acf_register_block_type(
			array(
				'name'            => 'ion-tabs',
				'title'           => __( 'Tabbar' ),
				'description'     => __( 'Tabs are a top level navigation component to implement a tab-based navigation. The component is a container of individual Tab components.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/tabs/block.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'modal' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'supports'        => array(
					'multiple'      => false,
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
				'usesContext'     => array( 'acf/fields' ),
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

		// register a popover block.
		acf_register_block_type(
			array(
				'name'            => 'popover',
				'title'           => __( 'Popover' ),
				'description'     => __( 'A Popover is a dialog that appears on top of the current page. It can be used for anything, but generally it is used for overflow actions that don\'t fit in the toolbar.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/popover/block.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'popover' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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

		acf_register_block_type(
			array(
				'name'            => 'side-menu',
				'title'           => __( 'Side Menu' ),
				'description'     => __( 'The Side Menu block is a navigation drawer that slides in from the side of the current view. ' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/menu/block.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'menu' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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

		acf_register_block_type(
			array(
				'name'            => 'action-sheet',
				'title'           => __( 'Action Sheet' ),
				'description'     => __( 'An Action Sheet is a dialog that displays a set of options. It appears on top of the app\'s content, and must be manually dismissed by the user before they can resume interaction with the app.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/action-sheet/block.php',
				'category'        => 'appp_view',
				'icon'            => 'admin-page',
				'keywords'        => array( 'app', 'menu' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
		// acf_register_block_type(
		// array(
		// 'name'            => 'onboard',
		// 'title'           => __( 'OnBoarding' ),
		// 'description'     => __( 'App onboarding success is crucial for users as it helps establish the tone of your app. These are views outside the main apps navigation and only load when the app is first installed.' ),
		// 'render_template' => APPPRESSER_DIR . '/blocks/layout/onboard.php',
		// 'category'        => 'appp_view',
		// 'icon'            => 'admin-page',
		// 'keywords'        => array( 'component', 'onboard' ),
		// 'post_types'      => array( 'app' ),
		// 'mode'            => 'preview',
		// 'align'           => 'center',
		// 'supports'        => array(
		// 'mode'          => false,
		// 'align'         => false,
		// 'align_text'    => false,
		// 'align_content' => false,
		// 'full_height'   => false,
		// 'jsx'           => true,
		// ),
		// 'enqueue_script'  => 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js',
		// 'enqueue_style'   => 'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
		// )
		// );

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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'render_template' => APPPRESSER_DIR . '/blocks/layout/ion-segment/block.php',
				'category'        => 'appp_patterns',
				'icon'            => 'ellipsis',
				'keywords'        => array( 'component', 'segment' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
				'name'            => 'inner-segment',
				'title'           => __( 'Inner Segment' ),
				'description'     => __( 'Segments are useful for toggling between different views inside of the content.' ),
				'render_template' => APPPRESSER_DIR . '/blocks/layout/inner-segment/block.php',
				'category'        => 'appp_patterns',
				'icon'            => 'ellipsis',
				'keywords'        => array( 'component', 'segment' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'icon'            => 'excerpt-view',
				'keywords'        => array( 'component', 'card' ),
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
				'description'     => __( 'Repeats all inner blocks for each item in array of data.' ),
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

		// acf_register_block_type(
		// array(
		// 'name'            => 'openweather',
		// 'title'           => 'OpenWeather',
		// 'description'     => 'OpenWeather Api',
		// 'icon'            => 'cloud',
		// 'category'        => 'appp_third_party',
		// 'keywords'        => array( 'component', 'openweather' ),
		// 'post_types'      => array( 'app' ),
		// 'mode'            => 'preview',
		// 'align'           => 'center',
		// 'className'       => 'appp-openweather',
		// 'parent'          => array( 'acf/view' ),
		// 'supports'        => array(
		// 'mode'          => false,
		// 'align'         => false,
		// 'align_text'    => false,
		// 'align_content' => false,
		// 'full_height'   => false,
		// 'jsx'           => true,
		// ),
		// 'render_template' => APPPRESSER_DIR . 'blocks/third-party/openweather/block.php',
		// )
		// );

		acf_register_block_type(
			array(
				'name'            => 'ion-image',
				'title'           => 'Image',
				'description'     => 'Image is a block that will lazily load an image when ever the tag is in the viewport',
				'category'        => 'appp_media',
				'keywords'        => array( 'component', 'image', 'photo' ),
				'icon'            => 'format-image',
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'name'            => 'ion-menu-toggle',
				'title'           => 'Menu Toggle',
				'description'     => 'The Menu Toggle block can be used to toggle a menu open or closed.',
				'category'        => 'appp_layout',
				'keywords'        => array( 'component', 'menu', 'item' ),
				'icon'            => 'menu',
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
				'mode'            => 'preview',
				'align'           => 'center',
				'parent'          => array( 'acf/view', 'acf/side-menu' ),
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/menu-toggle/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'ion-item',
				'title'           => 'Item',
				'description'     => 'Items are elements that can contain text, icons, avatars, images, inputs, and other elements.',
				'category'        => 'appp_text',
				'keywords'        => array( 'component', 'list', 'item' ),
				'icon'            => 'list-view',
				'post_types'      => array( 'app' ),
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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
				'usesContext'     => array( 'acf/fields' ),
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

		acf_register_block_type(
			array(
				'name'            => 'action',
				'title'           => 'Action',
				'description'     => 'Action block wraps an element to provide different navigation and functionality',
				'category'        => 'appp_layout',
				'usesContext'     => array( 'acf/fields' ),
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'icon'            => 'superhero',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/action/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'iframe',
				'title'           => 'Iframe',
				'description'     => '',
				'category'        => 'appp_layout',
				'usesContext'     => array( 'acf/fields' ),
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'icon'            => 'visibility',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/iframe/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'bp-profile',
				'title'           => 'Profile Fields',
				'description'     => '',
				'category'        => 'appp_buddypress',
				'usesContext'     => array( 'acf/fields' ),
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'icon'            => 'buddicons-buddypress-logo',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/buddypress/profile.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'form',
				'title'           => 'Form Builder',
				'description'     => 'An HTML form is used to collect user input. The user input is most often sent to a server for processing.',
				'category'        => 'appp_data',
				'usesContext'     => array( 'acf/fields' ),
				'post_types'      => array( 'app' ),
				'parent'          => array( 'acf/view' ),
				'icon'            => 'editor-kitchensink',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/data/form/block.php',
			)
		);

		acf_register_block_type(
			array(
				'name'            => 'accordion',
				'title'           => 'Accordion',
				'description'     => 'Accordions provide collapsible sections in your content to reduce vertical space while providing a way of organizing and grouping information.',
				'category'        => 'appp_layout',
				'usesContext'     => array( 'acf/fields' ),
				'post_types'      => array( 'app' ),
				'icon'            => 'editor-insertmore',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'render_template' => APPPRESSER_DIR . 'blocks/layout/accordian/block.php',
			)
		);

		// End Create-ACF-Block

	}
}
add_action( 'acf/init', 'appp_init_block_types' );
