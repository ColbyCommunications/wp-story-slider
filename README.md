# wp-story-slider

A horizontal slider displaying posts (with featured images and excerpts) from a WordPress REST endpoint. Includes a shortcode and a block for the WordPress 5 editor.

[Demo](https://colbycommunications.github.io/wp-story-slider/demo/).

## Install

```
npm install wp-story-slider
```

Or:

```
yarn add wp-story-slider
```

### WordPress shortcode/editor block

Installing through NPM does not make the WordPress shortcode or editor block available. They require installation through Composer with `composer require colbycomms/wp-story-slider`. Alternatively, clone this repository into your WordPress plugins directory and activate it through the WP admin.

If this package is installed by either of these means, its compiled Javascript file will load automatically and will hook into the shortcode output. The script can be dequeued -- e.g., if you're using this package as an ES6 module -- with the `colbycomms__story_slider__enqueue_script` WordPress filter. Simply provide a callback to that filter returning `false`, e.g.:

```PHP
add_filter( 'colbycomms__story_slider__enqueue_script', function() {
  return false;
} );
```

## Usage

### In Javascript

#### Example

```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import StorySlider from 'wp-story-slider'

const postsEndpoint = 'http://my-site.com/wp-json/wp/v2/posts/';
const mediaEndpoint = 'http://my-site.com/wp-json/wp/v2/media/';
const myElement = document.querySelector('#my-element');

ReactDOM.render(<StorySlider postsEndpoint={postsEndpoint} mediaEndpoint={mediaEndpoint} />, myElement);
```

#### Props

##### `postsEndpoint` {string} **required**

A WordPress REST endpoint to query the most recent posts from. Custom endpoints need to handle the `per_page` REST parameter.

##### `mediaEndpoint` {string} **default = null**

A WordPress media endpoint. If the prop is not set, no media will be shown. Custom endpoints need to support the `include` and `per_page` REST parameters.

##### `totalPosts` {string|number} **default = 10**

The number of posts to request.

##### `mediaSize` {string} **default = large**

The WordPress image size to use.

##### `mediaBackupSize` {string} **default = medium**

The image size to use if a request file doesn't have `mediaSize`. If the image has neither the `mediaSize` nor the `mediaBackupSize`, it will not show.

##### `sliderSettings` {object}

Settings to pass to the underlying [`react-slick`](https://github.com/akiran/react-slick) component. See that package's documentation for options. The defaults used here are:

```Javascript
{
  dots: false,
  speed: 500,
  infinite: false,
  autoplay: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  accessibility: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    { breakpoint: 767, settings: { slidesToScroll: 1, slidesToShow: 1 } },
    { breakpoint: 991, settings: { slidesToScroll: 2, slidesToShow: 2 } },
  ],
}
```

### WordPress shortcode

The WordPress shortcode is `story-slider`. Example:

```HTML
[story-slider posts-endpoint="http://my-site.com/wp-json/wp/v2/posts/" media-endpoint="http://my-site.com/wp-json/wp/v2/media/"]
```

#### Shortcode attributes

##### `posts-endpoint` (required)

The REST endpoint to retreive posts from.

##### `media-endpoint`

The REST endpoint to retreive media from.

### Editor block

The editor block will be available as "Story Slider" where the Gutenberg editor is active. 
