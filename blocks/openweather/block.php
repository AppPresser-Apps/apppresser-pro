<?php
/**
 * Block Name: OpenWeather Api Block
 *
 * Description: OpenWeather Api Block
 */

// Dynamic block ID.
$block_id     = 'openweather-' . $block['id'];
$blockClasses = implode( ' ', array( $block['className'] ) );

$type          = get_field( 'type' );
$location      = get_field( 'location' );
$data_source   = get_field( 'data_source' );
$color         = get_field( 'color' );
$background    = get_field( 'background' );
$border_radius = get_field( 'border_radius' );
$aspect_ratio  = get_field( 'aspect_ratio' );
$max_width     = get_field( 'max_width' );

$api_key = '9b72b80de02d0ff764d56a6c2e594bd7';
$geo     = 'http://api.openweathermap.org/geo/1.0/direct?q=' . $location . '&limit=5&appid=9b72b80de02d0ff764d56a6c2e594bd7';

?>

<style>

	.opw-small-header {
		font-size: 12px;
		font-weight: 800;
		padding: 10px 0 0 20px;
	}

	.opw-item-flex {
		display: flex;
		align-items: center;
	}

	.list-5-day .weather-day {
		min-width: 70px;
	}

	.list-5-day .weather-icon {
		color: <?php echo $color; ?>;
	}

	.list-5-day .weather-icon svg {
		height: 22px;
		display: block;
		margin: 0 auto;
	}

	.list-5-day .weather-icon svg path {
		fill: <?php echo $color; ?>;
	}

	#<?php echo $block_id; ?> {
		margin: 16px;
	}
	#<?php echo $block_id; ?> .opw-today {
		margin-left: auto;
		margin-right: auto;
		padding: 16px;
		color: <?php echo $color; ?>;
		background: <?php echo $background; ?>;
		border-radius: <?php echo $border_radius; ?><?php echo 'auto' === $aspect_ratio ? 'px' : '%' ?>;
		aspect-ratio: <?php echo $aspect_ratio; ?>;
		max-width: <?php echo $max_width; ?>px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	#<?php echo $block_id; ?> .opw-today .opw-location {
		text-align: center;
		font-size: 30px;
		line-height: 34px;
	}
	#<?php echo $block_id; ?> .opw-today .opw-temp {
		text-align: center;
		font-size: 50px;
		line-height: 50px;
	}
	#<?php echo $block_id; ?> .opw-today .opw-description {
		text-align: center;
	}
	#<?php echo $block_id; ?> .opw-today .opw-temps {
		display: flex;
		justify-content: center;
	}
	#<?php echo $block_id; ?> .opw-today .opw-temps > * {
		padding: 0 5px;
	}

	#<?php echo $block_id; ?> .list-5-day {
		-webkit-margin-start: 0px;
		margin-inline-start: 0px;
		-webkit-margin-end: 0px;
		margin-inline-end: 0px;
		box-shadow: none;

		background: <?php echo $background; ?>;
		border-radius: <?php echo $border_radius; ?><?php echo 'auto' === $aspect_ratio ? 'px' : '%' ?>;
		max-width: <?php echo $max_width; ?>px;
	}
	#<?php echo $block_id; ?> .list-5-day ion-list,
	#<?php echo $block_id; ?> .list-5-day ion-item {
		background: transparent !important;
		--background: transparent !important;
		color: <?php echo $color; ?>;
		--color: <?php echo $color; ?>;
		--border-color: <?php echo $color; ?>;
	}



</style>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">



</div>

<script>

	async function appp_load_opw_current() {

		const $geo_location = await fetch('<?php echo $geo; ?>');
		const $rsp_geo_location = await $geo_location.json();

		//console.log($rsp_geo_location[0]);

		const $api = `http://api.openweathermap.org/data/2.5/weather?lat=${$rsp_geo_location[0].lat}&lon=${$rsp_geo_location[0].lon}&appid=<?php echo $api_key; ?>&units=imperial`;

		const response = await fetch($api);
		const data = await response.json();

		var template = `
			<div class="opw-today">
				<div class="opw-location">${data.name}</div>
				<div class="opw-temp">${parseInt(data.main.temp)}º</div>
				<div class="opw-description">${data.weather[0].main}</div>
				<div class="opw-temps">
					<div class="opw-temp-high">H: ${parseInt(data.main.temp_max)}º</div>
					<div class="opw-temp_low">L: ${parseInt(data.main.temp_min)}º</div>
				</div>
			</div>
		`;

		const block = document.querySelector('#<?php echo $block_id; ?>');

		block.innerHTML = template;

	};

	async function appp_load_opw_list() {
		const block = document.querySelector('#<?php echo $block_id; ?>');
		block.innerHTML = '';

		const $geo_location = await fetch('<?php echo $geo; ?>');
		const $rsp_geo_location = await $geo_location.json();

		//console.log($rsp_geo_location[0]);

		const $api = `http://api.openweathermap.org/data/2.5/onecall?lat=${$rsp_geo_location[0].lat}&lon=${$rsp_geo_location[0].lon}&appid=<?php echo $api_key; ?>&cnt=5&units=imperial&exclude=current,hourly,minutely,alerts`;

		const response = await fetch($api);
		const data = await response.json();

		console.log(data);

		let items = '';

		data.daily.slice(0, -2).map( (item, index) => {
			var dayName = new Date(item.dt * 1000).toLocaleDateString("en", {
						weekday: "long",
					});
			items += `
			<ion-item>
				<ion-label>
				<div class="opw-item-flex">
				<div class="weather-day">${ 0 === index ? 'Today' : dayName.substring(0,3)}</div>
				<div class="weather-icon">
					${opw_icons[item.weather[0].icon]}
				</div>
				</div>
				</ion-label>
				${parseInt(item.temp.max)}º
			</ion-item>
			`;
		});

		var template = `
			<ion-card class="list-5-day">
				<ion-list>
					<div class="opw-small-header">
						5-DAY FORECAST
					</div>
					${items}
				</ion-list>
			<ion-card>
		`;

		block.innerHTML = template;
	}

	async function appp_load_opw_slider() {
		const block = document.querySelector('#<?php echo $block_id; ?>');
		block.innerHTML = '';
	}



	<?php if ( 'current' === $type ) : ?>
		appp_load_opw_current();
	<?php endif; ?>

	<?php if ( 'slider-hourly' === $type ) : ?>
		appp_load_opw_slider();
	<?php endif; ?>

	<?php if ( 'list-5-day' === $type ) : ?>
		appp_load_opw_list();
	<?php endif; ?>

var opw_icons = {
	'01d' : `
	<svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<g id="Page-1" stroke="currentColor" stroke-width="1" fill="currentColor" fill-rule="evenodd">
			<g id="01d" transform="translate(-0.000387, -0.002881)" fill-rule="nonzero">
				<path d="M40.0003872,16.6698814 C27.1163872,16.6698814 16.6673872,27.1188814 16.6673872,40.0028814 C16.6673872,52.8908814 27.1163872,63.3358814 40.0003872,63.3358814 C52.8843872,63.3358814 63.3333872,52.8908814 63.3333872,40.0028814 C63.3333872,27.1188814 52.8843872,16.6698814 40.0003872,16.6698814 Z M40.0003872,56.6698814 C30.7943872,56.6698814 23.3333872,49.2088814 23.3333872,40.0028814 C23.3333872,30.7968814 30.7943872,23.3358814 40.0003872,23.3358814 C49.2023872,23.3358814 56.6673872,30.7958814 56.6673872,40.0028814 C56.6673872,49.2098814 49.2023872,56.6698814 40.0003872,56.6698814 Z" id="Shape"></path>
				<rect id="Rectangle" x="36.6673872" y="0.0028814" width="6.666" height="10"></rect>
				<rect id="Rectangle" x="36.6673872" y="70.0028814" width="6.666" height="10"></rect>
				<rect id="Rectangle" x="0.0003872" y="36.6698814" width="10" height="6.666"></rect>
				<rect id="Rectangle" x="70.0003872" y="36.6698814" width="10" height="6.666"></rect>
				<rect id="Rectangle" transform="translate(10.572941, 10.573034) rotate(-134.991897) translate(-10.572941, -10.573034) " x="-1.04294812" y="7.23756565" width="23.2317774" height="6.67093609"></rect>
				<rect id="Rectangle" transform="translate(69.428673, 69.431204) rotate(-135.000000) translate(-69.428673, -69.431204) " x="57.8117844" y="66.0972358" width="23.2337772" height="6.66793605"></rect>
				<rect id="Rectangle" transform="translate(10.573034, 69.428536) rotate(135.008103) translate(-10.573034, -69.428536) " x="-1.04285502" y="66.0930682" width="23.2317774" height="6.67093609"></rect>
				<rect id="Rectangle" transform="translate(69.428101, 10.572759) rotate(135.000000) translate(-69.428101, -10.572759) " x="57.8112128" y="7.23879097" width="23.2337772" height="6.66793605"></rect>
			</g>
		</g>
	</svg>
	`,
};

</script>

