# wp-story-slider

A horizontal slider displaying posts (with featured images and excerpts) from a WordPress REST endpoint.

[Demo](https://colbycommunications.github.io/wp-story-slider/demo/).

## Install

```
npm install wp-story-slider
```

Or:

```
yarn add wp-story-slider
```

## Usage

### Example

```Javascript
import React from 'react';
import ReactDOM from 'react-dom';
import StorySlider from 'wp-story-slider'

const postsEndpoint = 'http://my-site.com/wp-json/wp/v2/posts/';
const mediaEndpoint = 'http://my-site.com/wp-json/wp/v2/media/';
const myElement = document.querySelector('#my-element');

ReactDOM.render(<StorySlider postsEndpoint={postsEndpoint} mediaEndpoint={mediaEndpoint} />, myElement);
```

### Props

#### `postsEndpoint` {string} **required**

A WordPress REST endpoint to query the most recent posts from. Custom endpoints need to handle the `per_page` REST parameter.

#### `postsEndpoint` {string} **default = null**

A WordPress media endpoint. If the prop is not set, no media will be shown. Custom endpoints need to support the `include` and `per_page` REST parameters.

#### `totalPosts` {string|number} **default = 10**

The number of posts to request.

#### `mediaSize` {string} **default = large**

The WordPress image size to use.

#### `mediaBackupSize` {string} **default = medium**

The image size to use if a request file doesn't have `mediaSize`. If the image has neither the `mediaSize` nor the `mediaBackupSize`, it will not show.

#### `sliderSettings` {object}

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
