<?php
/**
 * Block Name: OpenWeather Api Block
 *
 * Description: OpenWeather Api Block
 */

// Dynamic block ID.
$block_id     = 'openweather-' . $block['id'];
$blockClasses = implode( ' ', array( $block['className'] ) );

$type             = get_field( 'type' );
$location         = get_field( 'location' );
$current_location = get_field( 'geo_location' );
$api_key          = get_field( 'api_key' );
$color            = get_field( 'color' );
$background       = get_field( 'background' );
$border_radius    = get_field( 'border_radius' );
$aspect_ratio     = get_field( 'aspect_ratio' );
$max_width        = get_field( 'max_width' );

$geo_url = 'https://api.openweathermap.org/geo/1.0/direct?q=' . $location . '&limit=5&appid=' . $api_key;

?>

<style>

	.opw-small-header {
		font-size: 12px;
		font-weight: 800;
		padding: 20px 10px;
	}

	.opw-city {
		font-weight: 400;
		font-size: 16px;
		float: right;
		line-height: 14px;
	}

	.opw-item-flex {
		display: flex;
		align-items: center;
	}

	.list-5-day .weather-day {
		min-width: 50px;
	}

	.list-5-day .weather-icon {
		color: <?php echo $color; ?>;
		font-size: 22px;
		line-height: 22px;
		display: block;
		margin: 0 auto;
	}

	.list-5-day ion-item:last-child {
		--inner-border-width: 0px !important;
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
		border-radius: <?php echo $border_radius; ?><?php echo 'auto' === $aspect_ratio ? 'px' : '%'; ?>;
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
		border-radius: <?php echo $border_radius; ?>px;
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

	#<?php echo $block_id; ?> .slider-hourly {
		margin-left: auto;
		margin-right: auto;
		color: <?php echo $color; ?>;
		background: <?php echo $background; ?>;
		border-radius: <?php echo $border_radius; ?>px;
	}

	.slider-hourly .slider-items {
		display: flex;
		overflow: auto;
		scroll-snap-type: x mandatory;
		-ms-overflow-style: none;  /* IE and Edge */
		  scrollbar-width: none;  /* Firefox */
	}

	.slider-hourly .slider-items::-webkit-scrollbar {
		display:none !important;
	}

	.slider-items > div {
		min-width: 35px;
		height: 90px;
		padding: 0 10px;
		scroll-snap-align: start;
	}

	.slider-hourly .hourly-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.slider-hourly .hourly-time {
		font-size: 14px;
	}

	.slider-hourly .weather-icon-slider {
		padding: 6px 0;
	}


</style>

<div id="<?php echo $block_id; ?>" class="<?php echo $blockClasses; ?>">



</div>

<script>

	/**
	 * Current day weather widget.
	 *
	 * @return void
	 */
	async function appp_load_opw_current() {

		var latitude = '';
		var longitude = '';

		const geo = '<?php echo $current_location; ?>';

		console.log(geo);

		if ('1' !== geo) {

			const $geo_location = await fetch('<?php echo $geo_url; ?>');
			const $rsp_geo_location = await $geo_location.json();

			console.log($rsp_geo_location[0]);

			latitude = $rsp_geo_location[0].lat;
			longitude = $rsp_geo_location[0].lon;

		} else {

			const position = await getLongAndLat();
			console.log(position);

			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

		}

		const $api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<?php echo $api_key; ?>&units=imperial`;

		const response = await fetch($api);
		const data = await response.json();

		//console.log(data);

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

	/**
	 * 5 day forecst list.
	 *
	 * @return void
	 */
	async function appp_load_opw_list() {

		const block = document.querySelector('#<?php echo $block_id; ?>');
		block.innerHTML = '';

		var latitude = '';
		var longitude = '';

		const geo = '<?php echo $current_location; ?>';

		console.log(geo);

		if ('1' !== geo) {

			const $geo_location = await fetch('<?php echo $geo_url; ?>');
			const $rsp_geo_location = await $geo_location.json();

			console.log($rsp_geo_location[0]);

			latitude = $rsp_geo_location[0].lat;
			longitude = $rsp_geo_location[0].lon;

		} else {

			const position = await getLongAndLat();
			console.log(position);

			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

		}

		const $api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=<?php echo $api_key; ?>&cnt=5&units=imperial&exclude=current,hourly,minutely,alerts`;

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
					<i class="wi wi-${wiToOWM[getDayNight(item.sunrise*1000,item.sunset*1000)+item.weather[0].id]}"></i>
					</div>

					<div>
					${parseInt(item.temp.min)}º
					-------
					${parseInt(item.temp.max)}º
					</div>
				</div>
				</ion-label>
		
			</ion-item>
			`;
		});

		var template = `
			<ion-card class="list-5-day">
				<ion-list>
					<div class="opw-small-header">
						5-DAY FORECAST <span class="opw-city">${formatTimezone(data.timezone).city}</span>
					</div>
					${items}
				</ion-list>
			</ion-card>
		`;

		block.innerHTML = template;
	}

	/**
	 * Hourly weather slider.
	 *
	 * @return void
	 */
	async function appp_load_opw_slider() {

		const block = document.querySelector('#<?php echo $block_id; ?>');
		block.innerHTML = '';

		var latitude = '';
		var longitude = '';

		const geo = '<?php echo $current_location; ?>';

		if ('1' !== geo) {

			const $geo_location = await fetch('<?php echo $geo_url; ?>');
			const $rsp_geo_location = await $geo_location.json();

			latitude = $rsp_geo_location[0].lat;
			longitude = $rsp_geo_location[0].lon;

		} else {

			const position = await getLongAndLat();
			console.log(position);

			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

		}

		const $api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=<?php echo $api_key; ?>&cnt=5&units=imperial&exclude=minutely,alerts,daily`;

		const response = await fetch($api);
		const data = await response.json();

		console.log('slider', data);

		let items = '';

		data.hourly.slice(0, -2).map( (item, index) => {
			//console.log(item);
			items += `
				<div class="hourly-item">
					<div class="hourly-time">${ 0 === index ? 'Now' : formatTime(item.dt)}</div>
					<div class="weather-icon-slider">
						<i class="wi wi-${wiToOWM[getDayNight(item.sunrise*1000, item.sunset*1000)+item.weather[0].id]}"></i>
					</div>
					<div>
						${parseInt(item.temp)}º
					</div>
				</div>
			`;
		});

		var template = `
			<div class="slider-hourly">
				<div class="opw-small-header">
					HOURLY FORECAST <span class="opw-city">${formatTimezone(data.timezone).city}</span>
				</div>
				<div class="slider-items">
					${items}
				</div>
			</div>
		`;

		block.innerHTML = template;

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

</script>
