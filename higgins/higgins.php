<?php

add_filter(
	'appp_filter_block_categories',
	function( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'appp_higgins',
					'title' => __( 'Higgins', 'apppresser' ),
				),
			)
		);
	}
);

function higgins_init_block_types() {

		acf_register_block_type(
			array(
				'name'            => 'higgins_openweather',
				'title'           => __( 'OpenWeather' ),
				'description'     => __( 'Higgins App home page.' ),
				'render_callback' => 'higgins_openweather_view',
				'category'        => 'appp_higgins',
				'icon'            => 'cloud',
				'className'       => 'higgins-openweather',
				'keywords'        => array( 'app', 'view', 'higgins' ),
				'post_types'      => array( 'app' ),
				'mode'            => 'preview',
				'parent'          => '',
				'align'           => 'center',
				'supports'        => array(
					'mode'          => false,
					'align'         => false,
					'align_text'    => false,
					'align_content' => false,
					'full_height'   => false,
					'jsx'           => true,
				),
				'enqueue_script'  => APPPRESSER_URL . '/higgins/higgins.js',
				'enqueue_style'   => APPPRESSER_URL . '/higgins/higgins.css',
			)
		);
}
add_action( 'acf/init', 'higgins_init_block_types' );

/**
 * Higgins OpenWeather Homebage Block
 *
 * @param array $block
 * @return void
 */
function higgins_openweather_view( $block ) {

	// Dynamic block ID.
	$block_id    = 'openweather-' . $block['id'];
	$block_class = $block['className'];

	$location = 'Brisbane, AU';
	$api_key  = '9b72b80de02d0ff764d56a6c2e594bd7';

	$geo_url = 'https://api.openweathermap.org/geo/1.0/direct?q=' . $location . '&limit=5&appid=' . $api_key;

	?>

<style type="text/css">
	.<?php echo $block_class; ?> {
		border: 1px solid #e0e0e0;
		height: 640px;
		width: 320px;
		margin: 10px !important;
	}
	#<?php echo $block_id; ?> ion-content {
		height: calc(100% - 88px) !important;
	}
	ion-title {
		width: 150px;
	}
</style>

	<div id="<?php echo $block_id; ?>" class="view <?php echo $block_class; ?>">
		<ion-header>
			<ion-toolbar color="dark">
				<ion-buttons slot="start">
					<ion-menu-button color="white"></ion-menu-button>
				</ion-buttons>
				<ion-title style="width:140px;">Higgins</ion-title>
				<ion-buttons slot="end">
					<ion-button color="white">
						<ion-icon name="location"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content id="higgins-homepage" color="medium">
		</ion-content>  

		<ion-footer>
			<ion-toolbar color="dark">
				<ion-buttons slot="start">
					<ion-button color="white">
						<ion-icon name="home"></ion-icon>
					</ion-button>
				</ion-buttons>
			   
				<ion-button slot="end" expand="full" size="small" color="warning">
					Member Portal
				</ion-button>

			</ion-toolbar>
		</ion-footer>

	</div>

	<script>
		appp_remove_button_class('<?php echo esc_attr( $block_id ); ?>');
	</script>
	<?php
}
