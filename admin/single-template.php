<?php
/**
 * The template for displaying app preview
 *
 * @package WordPress
 * @subpackage AppPresser
 * @since 1.0.0
 */

get_header(); ?>

    <?php $parts = wp_parse_url(site_url()) ; ?>
    <?php $url = $parts['scheme'] . '://' . $parts['host']; ?>

    <?php if ( 'local' === explode('.', $parts['host'] )[1] ) : ?>
        <app-root url="<?php echo esc_url( $url ); ?>/preview" app-url="<?php echo 'https://localhost:3333?url=' . get_rest_url() . 'apppresser/v1/app/' . get_the_ID(); ?>"></app-root>
    <? else : ?>
        <app-root url="<?php echo esc_url( APPPRESSER_URL ); ?>" app-url="<?php echo 'https://preview.apppresser.com/?url=' . get_rest_url() . 'apppresser/v1/app/' . get_the_ID(); ?>"></app-root>
    <?php endif ; ?>

<?php get_footer(); ?>
