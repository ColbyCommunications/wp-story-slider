import React from 'react';
import ReactDOM from 'react-dom';
import StorySlider from '.';

window.addEventListener('load', () => {
  const root = document.querySelector('[data-story-slider]');

  if (!root) {
    return;
  }

  const postsEndpoint = root.getAttribute('data-posts-endpoint');
  const mediaEndpoint = root.getAttribute('data-media-endpoint');
  if (postsEndpoint) {
    ReactDOM.render(
      <StorySlider
        postsEndpoint={postsEndpoint}
        mediaEndpoint={mediaEndpoint}
      />,
      root
    );
  }
});
