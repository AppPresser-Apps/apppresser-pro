<?php

add_action(
	'rest_api_init',
	function () {

		register_rest_route(
			'apppresser/v1',
			'/fields/endpoints',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => 'appp_get_endpoints_data',
			)
		);

	}
);

function appp_get_endpoints_field( $request ) {

	$url    = $request->get_param( 'base_url' );
	$postID = $request->get_param( 'post_id' );

	$data = array();

	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() == 'rest_api' ) :

				$base_url = get_sub_field( 'base_url' );

				$post = get_post( $postID );

				if ( $url === $base_url ) {
					$data['url']         = $base_url;
					$data['endpoints'][] = get_sub_field( 'rest_api_endpoints' );
				}

			endif;

			// End loop.
		endwhile;

		// No value.
	else :
		// Do something...
	endif;

	return $data;

}


function appp_get_endpoints_data() {

	$data = array();

	if ( have_rows( 'integration', 'options' ) ) :

		// Loop through rows.
		while ( have_rows( 'integration', 'options' ) ) :
			the_row();

			// Case: Paragraph layout.
			if ( get_row_layout() == 'rest_api' ) :

				$base_url = get_sub_field( 'base_url' );

				$data[ $base_url ] = get_sub_field( 'rest_api_endpoints' );

			endif;

			// End loop.
		endwhile;

		// No value.
	else :
		// Do something...
	endif;

	return $data;
}
