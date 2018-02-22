import StorySlider from '../StorySlider';
import styled from 'styled-components';

const StyledInputLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;

  button {
    margin-top: 0.25rem;
    display: block;
  }

  input {
    display: block;
    width: 100%;
  }
`;

const StyledPlaceholderBlock = styled.div`
  background: #214280;
  padding: 1.5rem;
  color: white;
  text-align: center;
`;

const { registerBlockType, UrlInputButton, InspectorControls } = wp.blocks;

registerBlockType('colbycomms/story-slider', {
  title: 'Story Slider',

  category: 'layout',

  attributes: {
    postsEndpoint: {
      type: 'string',
    },
    mediaEndpoint: {
      type: 'string',
    },
    loadInEditor: {
      type: 'boolean',
      source: 'attribute',
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { postsEndpoint, loadInEditor, mediaEndpoint } = attributes;

    const controls = (
      <InspectorControls key="controls">
        <StyledInputLabel>
          Enter the REST endpoint for posts.
          <input
            type="url"
            placeholder="Enter a URL"
            value={postsEndpoint}
            onChange={event => {
              if (event.target.value.indexOf('wp-json')) {
                setAttributes({ postsEndpoint: event.target.value });
              }
            }}
          />
        </StyledInputLabel>
        <br />
        <StyledInputLabel>
          Enter the REST endpoint for media.
          <input
            type="url"
            placeholder="Enter a URL"
            value={mediaEndpoint}
            onChange={event => {
              if (event.target.value.indexOf('wp-json')) {
                setAttributes({ mediaEndpoint: event.target.value });
              }
            }}
          />
        </StyledInputLabel>
        <br />
        {loadInEditor === true ? null : (
          <StyledInputLabel>
            Load in editor? (Works only once per pageload.)
            <button
              onClick={event => {
                setAttributes({ loadInEditor: true });
              }}
            >
              Load
            </button>
          </StyledInputLabel>
        )}

        <br />
      </InspectorControls>
    );

    if (loadInEditor) {
      return [
        controls,
        <StorySlider
          postsEndpoint={postsEndpoint}
          mediaEndpoint={mediaEndpoint}
        />,
      ];
    }

    return [
      controls,
      <StyledPlaceholderBlock>
        Story slider.{' '}
        <button
          onClick={event => {
            setAttributes({ loadInEditor: true });
          }}
        >
          Show
        </button>
      </StyledPlaceholderBlock>,
    ];
  },

  save({ attributes }) {
    const { postsEndpoint, mediaEndpoint } = attributes;

    return (
      <div
        data-story-slider
        data-posts-endpoint={postsEndpoint}
        data-media-endpoint={mediaEndpoint}
      />
    );
  },
});
