import React from 'react';
import styled from 'styled-components';

const StyledStory = styled.a`
  display: block;
  padding: 0;
  color: black;
  transition: transform 0.1s ease-out;
  transform: scale(0.99);

  @media screen and (min-width: 768px) {
    padding: 0 0.75rem;
  }

  &:hover {
    color: inherit;
    text-decoration: none;
    opacity: 1;
    transform: scale(1);
  }

  h4 {
    width: 100%;
    padding: 0.75rem 1.25rem;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    line-height: 1.414;
    color: white;
    text-align: center;
    background: #214280;
    background: var(--primary, #214280);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

const StyledStoryInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;

  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
`;

const StyledExcerpt = styled.div`
  padding: 1.5rem 1rem 0.75rem;
  font-size: 89.1%;

  p {
    margin-top: 0;
  }

  p:empty {
    display: none;
  }
`;

const Image = ({ media = {}, mediaSize, mediaBackupSize, title }) => {
  if (!media.media_details || !media.media_details.sizes) {
    return null;
  }

  try {
    const image =
      media.media_details.sizes[mediaSize] ||
      media.media_details.sizes[mediaBackupSize];

    return (
      <img
        src={image.source_url}
        width={image.width}
        height={image.height}
        alt={title.rendered}
      />
    );
  } catch (e) {
    return null;
  }
};

export const Story = ({ post, media, mediaSize, mediaBackupSize }) => (
  <StyledStory href={post.link}>
    <StyledStoryInner>
      <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {media ? (
        <Image
          media={media}
          mediaSize={mediaSize}
          mediaBackupSize={mediaBackupSize}
          title={post.title.rendered}
        />
      ) : null}
      <StyledExcerpt
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
    </StyledStoryInner>
  </StyledStory>
);
