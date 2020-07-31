import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ffffff;
  height: 40px;
  border-radius: 7px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  transition: background-color 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${shade(0.2, '#ffffff')};
  }

  &.positive {
    background: transparent;
    color: var(--button-positive);
    border: 1px solid var(--button-positive);

    transition: color 0.2s;
    &:hover {
      background: var(--button-positive);
      color: var(--white);
    }
  }

  &.negative {
    background: transparent;
    color: var(--button-negative);
    border: 1px solid var(--button-negative);

    transition: color 0.2s;
    &:hover {
      background: var(--button-negative);
      color: var(--white);
    }
  }

  &.loading {
    padding-right: 16px;
    svg {
      -webkit-animation: spin 4s linear infinite;
      -moz-animation: spin 4s linear infinite;
      animation: spin 4s linear infinite;
    }
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
