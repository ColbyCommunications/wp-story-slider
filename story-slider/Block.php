<?php
/**
 * Block.php
 *
 * @package colbycomms/wp-story-slider
 */

namespace ColbyComms\StorySlider;

/**
 * Renders the block.
 */
class Block {
	const OPTIONS_DEFAULTS = [];

	/**
	 * Checks whether the options are valid.
	 *
	 * @param array $options The options.
	 * @return boolean Whether they are valid.
	 */
	public static function options_are_valid( $options = [] ) : bool {
		if ( ! isset( $options['posts-endpoint'] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Renders the block.
	 *
	 * @param array $options Shortcode $atts or a passed-in array.
	 * @return string The generated HTML.
	 */
	public static function render( $options = [] ) : string {
		$options = is_array( $options ) ? $options : [];

		$options = array_merge( self::OPTIONS_DEFAULTS, $options );

		if ( ! self::options_are_valid( $options ) ) {
			return '';
		}

		ob_start();
		?>
<div data-story-slider
	data-posts-endpoint="<?php echo $options['posts-endpoint']; ?>"
	<?php if ( isset( $options['media-endpoint'] ) ) : ?>
	data-media-endpoint="<?php echo $options['media-endpoint']; ?>"
	<?php endif; ?>
	>
</div>

		<?php

		return ob_get_clean();
	}
}
