<?php
/**
 * The template for displaying app preview
 *
 * @package WordPress
 * @subpackage AppPresser
 * @since 1.0.0
 */

get_header(); ?>
    <app-root url="<?php echo esc_url( APPPRESSER_URL ); ?>" app-url="<?php echo 'https://apppresser.pages.dev?url=' . get_rest_url() . 'apppresser/v1/app/' . get_the_ID(); ?>"></app-root>
<?php get_footer(); ?>
