<?php
/**
 * Plugin Name: Story Slider
 * Description: A shortcode for a panel with a background image and a superimposed content block.
 * Author: John Watkins, Colby Communications
 * 
 * @package colbycomms/wp-story-slider
 */

register_shutdown_function( function() {
    print_r( error_get_last() );
});

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}