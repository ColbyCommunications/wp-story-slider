<?php
/**
 * StorySlider.php
 *
 * @package colbycomms/wp-story-slider
 */

namespace ColbyComms\StorySlider;

/**
 * Sets up the plugin.
 */
class StorySlider {
	/**
	 * Whether to load production assets.
	 *
	 * @var bool
	 */
	const PROD = true ;

	/**
	 * Plugin text domain.
	 *
	 * @var string
	 */
	const TEXT_DOMAIN = 'wp-story-slider';

	/**
	 * Vendor name.
	 *
	 * @var string
	 */
	const VENDOR = 'colbycomms';

	/**
	 * Version.
	 *
	 * @var string
	 */
	const VERSION = '1.0.0';

	/**
	 * String preceding this plugin's filter.
	 *
	 * @var string
	 */
	const FILTER_NAMESPACE = 'colbycomms__story_slider__';

	/**
	 * Filter name for this plugin's dist directory.
	 *
	 * @var string
	 */
	const DIST_DIRECTORY_FILTER = self::FILTER_NAMESPACE . 'dist_directory';

	/**
	 * Filter for whether to enqueue the plugin's script.
	 * 
	 * @var string
	 */
	const ENQUEUE_SCRIPT_FILTER = self::FILTER_NAMESPACE . 'enqueue_script';

	/**
	 * The plugin's shortcode tag.
	 */
	const SHORTCODE_TAG = 'story-slider';

	/**
	 * Add hooks.
	 */
	public function __construct() {
		add_action( 'init', [ __CLASS__, 'register_shortcode' ] );
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueue_script' ] );
		add_filter( 'template_redirect', [ __CLASS__, 'maybe_disable_script' ] );
	}

	/**
	 * Adds the shortcode.
	 */
	public static function register_shortcode() {
		add_shortcode( self::SHORTCODE_TAG, [ \ColbyComms\StorySlider\Block::class, 'render' ] );
	}

	/**
	 * Enqueue the stylesheet.
	 */
	public static function enqueue_script() {
		/**
		 * Filters whether to enqueue this plugin's stylesheet.
		 *
		 * @param bool Yes or no.
		 */
		if ( apply_filters( self::ENQUEUE_SCRIPT_FILTER, true ) !== true ) {
			return;
		}

		$min  = self::PROD === true ? '.min' : '';
		$dist = self::get_dist_directory();
		wp_enqueue_script(
			self::TEXT_DOMAIN,
			"$dist/" . self::TEXT_DOMAIN . "$min.js",
			[],
			self::VERSION,
			true
		);
	}

	/**
	 * Disable the script if the shortcode is not present.
	 */
	public static function maybe_disable_script() {
		global $post;

		if ( empty( $post ) ) {
			return;
		}

		if ( has_shortcode( $post->post_content, self::SHORTCODE_TAG ) ) {
			return;
		}

		add_filter(
			self::ENQUEUE_SCRIPT_FILTER, function() {
				return false;
			}, 1
		);
	}

	/**
	 * Gets the plugin's dist/ directory URL, whether this package is installed as a plugin
	 * or in a theme via composer. If the package is in neither of those places and the filter
	 * is not used, this whole thing will fail.
	 *
	 * @return string The URL.
	 */
	public static function get_dist_directory() : string {
		/**
		 * Filters the URL location of the /dist directory.
		 *
		 * @param string The URL.
		 */
		$dist = apply_filters( self::DIST_DIRECTORY_FILTER, '' );
		if ( ! empty( $dist ) ) {
			return $dist;
		}

		if ( file_exists( dirname( __DIR__, 3 ) . '/plugins' ) ) {
			return plugin_dir_url( dirname( __DIR__ ) . '/index.php' ) . 'dist';
		}

		return get_template_directory_uri() . '/vendor/' . self::VENDOR . '/' . self::TEXT_DOMAIN . '/dist/';
	}

}