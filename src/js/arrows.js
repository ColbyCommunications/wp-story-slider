import React from 'react';
import styled from 'styled-components';

import { removeTroublesomeArrowProps } from './utils';

const StyledArrow = styled.button`
  position: absolute;
  top: 50%;
  z-index: 4444;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  background: rgba(209, 65, 36, 0.9);
  border-radius: 2rem;
  transition: transform 0.1s ease-out;
  transform: scale(1);

  &:hover {
    background: rgba(209, 65, 36, 0.9);
  }

  &::before {
    font-family: serif;
    content: '';
  }

  &.slick-disabled {
    display: none !important;
  }

  &.slick-next {
    right: -0.75rem;
  }

  &.slick-prev {
    left: -0.75rem;
  }

  &:focus {
    background: rgba(209, 65, 36, 1);
  }

  &:not(.slick-disabled):hover {
    opacity: 1;
    transform: scale(1.1);
  }

  svg {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }

  @media screen and (min-width: 768px) {
    &.slick-next {
      right: -1rem;
    }

    &.slick-prev {
      left: -1rem;
    }
  }
`;

export function NextArrow(rawProps) {
  return (
    <StyledArrow {...removeTroublesomeArrowProps(rawProps)}>
      <svg
        width="1792"
        height="1792"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          /* eslint-disable max-len  */
          d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"
          /* eslint-enable max-len  */
        />
      </svg>
    </StyledArrow>
  );
}

export function PrevArrow(rawProps) {
  return (
    <StyledArrow {...removeTroublesomeArrowProps(rawProps)}>
      <svg
        width="1792"
        height="1792"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          /* eslint-disable max-len  */
          d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"
          /* eslint-enable max-len */
        />
      </svg>
    </StyledArrow>
  );
}
