<?php

/**
 * Process a hex color into ionic theme variables.
 * EXAMPLE Usage: $primary_colors = appp_process_colors( '--ion-color-primary', '#ffffff' );
 *
 * @param string $rule
 * @param string $hex
 * @return array ths required css variable for custom ionic theme colors
 */
function appp_process_colors( $rule, $hex ) {

	$rgb      = appp_rgb2hex( $hex );
	$contrast = appp_contrast( $hex );

	$colors = array(
		$rule                   => $hex,
		$rule . '-rgb'          => implode( ',', $rgb ),
		$rule . '-shade'        => appp_rgb2hex( appp_mix_colors( $rgb, 'shade', 0.88 ) ),
		$rule . '-tint'         => appp_rgb2hex( appp_mix_colors( $rgb, 'tint', 0.90 ) ),
		$rule . '-contrast'     => $contrast,
		$rule . '-contrast-rgb' => implode( ',', appp_rgb2hex( $contrast ) ),
	);

	return $colors;
}

/**
 * Calculates and returns a threshold of color.
 *
 * @param array $rgb
 * @return integar
 */
function appp_rgbToYIQ( $rgb ) {
	$threshhold = ( ( $rgb['r'] * 299 ) + ( $rgb['g'] * 587 ) + ( $rgb['b'] * 114 ) ) / 1000;
	return $threshhold;
}

/**
 * Returns a contrast color for supplied hex.
 * TODO: make this return a darker or lighter color based on hex if requested instead of just black or white.
 *
 * @param string  $hex
 * @param integer $threshold
 * @return string
 */
function appp_contrast( $hex, $threshold = 168 ) {
	$rgb = appp_rgb2hex( $hex );
	return appp_rgbToYIQ( $rgb ) >= $threshold ? '#000000' : '#ffffff';
}

/**
 * Mixes color to produce a tint or shade from supplied hex.
 *
 * @param array  $rgb
 * @param string $type
 * @param float  $weight
 * @return array
 */
function appp_mix_colors( $rgb, $type = 'tint', $weight = 0.88 ) {

	$mixed = array();

	$type = 'tint' === $type ? 255 : 0;

	foreach ( $rgb as $key => $value ) {
		$mixed[ $key ] = round( $weight * $value + ( 1 - $weight ) * $type );
	}

	$colors = implode( ',', $mixed );

	return $colors;
}

/**
 * Converts rgb to hex color.
 *
 * @param array $c Color to convert.
 * @return string
 */
function appp_rgb2hex( $c ) {
	if ( ! $c ) {
		return false;
	}
	$c   = trim( $c );
	$out = false;
	if ( preg_match( '/^[0-9ABCDEFabcdef\#]+$/i', $c ) ) {
		$c = str_replace( '#', '', $c );
		$l = strlen( $c ) == 3 ? 1 : ( strlen( $c ) == 6 ? 2 : false );

		if ( $l ) {
			unset( $out );
			$out['r'] = hexdec( substr( $c, 0, 1 * $l ) );
			$out['g'] = hexdec( substr( $c, 1 * $l, 1 * $l ) );
			$out['b'] = hexdec( substr( $c, 2 * $l, 1 * $l ) );
		} else {
			$out = false;
		}
	} elseif ( preg_match( '/^[0-9]+(,| |.)+[0-9]+(,| |.)+[0-9]+$/i', $c ) ) {
		$spr = str_replace( array( ',', ' ', '.' ), ':', $c );
		$e   = explode( ':', $spr );
		if ( count( $e ) != 3 ) {
			return false;
		}
		$out = '#';
		for ( $i = 0; $i < 3; $i++ ) {
			$e[ $i ] = dechex( ( $e[ $i ] <= 0 ) ? 0 : ( ( $e[ $i ] >= 255 ) ? 255 : $e[ $i ] ) );
		}

		for ( $i = 0; $i < 3; $i++ ) {
			$out .= ( ( strlen( $e[ $i ] ) < 2 ) ? '0' : '' ) . $e[ $i ];
		}

		$out = strtoupper( $out );
	} else {
		$out = false;
	}

	return $out;
}

/**
 * Converts hex to hue, saturation and lightness.
 *
 * @param string $hex Color to convert
 * @return array
 */
function hexToHsl( $hex ) {
	$red   = hexdec( substr( $hex, 0, 2 ) ) / 255;
	$green = hexdec( substr( $hex, 2, 2 ) ) / 255;
	$blue  = hexdec( substr( $hex, 4, 2 ) ) / 255;

	$cmin  = min( $red, $green, $blue );
	$cmax  = max( $red, $green, $blue );
	$delta = $cmax - $cmin;

	if ( $delta === 0 ) {
		$hue = 0;
	} elseif ( $cmax === $red ) {
		$hue = ( ( $green - $blue ) / $delta ) % 6;
	} elseif ( $cmax === $green ) {
		$hue = ( $blue - $red ) / $delta + 2;
	} else {
		$hue = ( $red - $green ) / $delta + 4;
	}

	$hue = round( $hue * 60 );
	if ( $hue < 0 ) {
		$hue += 360;
	}

	$lightness  = ( ( $cmax + $cmin ) / 2 ) * 100;
	$saturation = $delta === 0 ? 0 : ( $delta / ( 1 - abs( 2 * $lightness - 1 ) ) ) * 100;
	if ( $saturation < 0 ) {
		$saturation += 100;
	}

	$lightness  = round( $lightness );
	$saturation = round( $saturation );

	return array( $hue, $saturation, $lightness );
}
