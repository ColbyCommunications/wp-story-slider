import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import Slider from 'react-slick';

import { Story } from './Story';
import { PrevArrow, NextArrow } from './arrows';

injectGlobal`
  * {
    min-width: 0;
    min-height: 0;
  }
`;

const SLIDER_SETTINGS = {
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
};

const StyledSlider = styled(Slider)`
  position: relative;
  box-sizing: border-box;
  display: block;
  -webkit-touch-callout: none;
  touch-action: pan-y;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transform: translateZ(0);

  .slick-list {
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    overflow: hidden;
    transform: translate3d(0, 0, 0);

    &.dragging {
      cursor: pointer;
      cursor: hand;
    }
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    transform: translate3d(0, 0, 0);

    &::before,
    &::after {
      display: table;
      content: '';
    }

    &::after {
      clear: both;
    }

    .slick-loading & {
      visibility: hidden;
    }
  }

  .slick:focus {
    outline: none;
  }

  .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;

    .slick-initialized & {
      display: block;
    }

    .slick-loading & {
      visibility: hidden;
    }

    .slick-vertical & {
      display: block;
      height: auto;
      border: 1px solid transparent;
    }
  }

  .slick-arrow.slick-hidden {
    display: none;
  }
`;

const StyledStoryContainer = styled.div`
  padding: 0.75rem;
`;

class StorySlider extends React.Component {
  static propTypes = {
    totalPosts: PropTypes.number,
    postsEndpoint: PropTypes.string.isRequired,
    mediaEndpoint: PropTypes.string,
    mediaSize: PropTypes.string,
    mediaBackupSize: PropTypes.string,
    sliderSettings: PropTypes.object,
  };

  static defaultProps = {
    totalPosts: 10,
    mediaEndpoint: null,
    mediaSize: 'large',
    mediaBackupSize: 'medium',
    sliderSettings: {},
  };

  constructor(props) {
    super(props);

    this.state = { posts: [], media: {}, mediaFetched: false };
  }

  async componentDidMount() {
    await this.fetchPosts();
    if (this.props.mediaEndpoint) {
      this.fetchMedia();
    } else {
      this.setState({ mediaFetched: true });
    }
  }

  fetchPosts = ({ totalPosts, postsEndpoint } = this.props) =>
    new Promise(async resolve => {
      let response, posts;

      const url =
        postsEndpoint.indexOf('?') === -1
          ? `${postsEndpoint}?`
          : `${postsEndpoint}&`;

      try {
        response = await fetch(`${url}per_page=${totalPosts}`);
        posts = await response.json();
      } catch (e) {
        return;
      }

      this.setState({ posts }, resolve);
    });

  async fetchMedia() {
    const ids = this.state.posts
      .filter(post => post.featured_media)
      .map(post => post.featured_media)
      .join(',');

    if (!ids.length) {
      this.setState({ mediaFetched: true });
      return;
    }

    const mediaEndpoint =
      this.props.mediaEndpoint.indexOf('?') === -1
        ? `${this.props.mediaEndpoint}?`
        : `${this.props.mediaEndpoint}&`;

    const url = `${this.props.mediaEndpoint}/?include=${ids}&per_page=${
      this.props.totalPosts
    }`.replace('//?', '/?');

    const response = await fetch(url);
    const mediaArray = await response.json();

    const media = mediaArray.reduce(
      (output, item) => Object.assign({}, output, { [item.id]: item }),
      {}
    );

    this.setState({ media, mediaFetched: true });
  }

  render = (
    { mediaSize, mediaBackupSize, sliderSettings, mediaEndpoint } = this.props,
    { posts, media, mediaFetched } = this.state
  ) => {
    return mediaFetched === false ? null : (
      <StyledSlider {...Object.assign({}, SLIDER_SETTINGS, sliderSettings)}>
        {posts.map(post => (
          <StyledStoryContainer key={post.id}>
            <Story
              post={post}
              media={media[post.featured_media]}
              mediaSize={mediaSize}
              mediaBackupSize={mediaBackupSize}
              mediaEndpoint={mediaEndpoint}
            />
          </StyledStoryContainer>
        ))}
      </StyledSlider>
    );
  };
}

export default StorySlider;
