import styled from 'styled-components';

export const Container = styled.button`
  height: 30px;
  padding: 0 16px;
  border: 1px solid var(--button-defaul-border);
  border-radius: 20px;
  color: var(--button-defaul-color);
  background: var(--button-defaul-background);
  transition: background-color 0.2s;

  svg {
    margin-left: 5px;
  }

  &:hover {
    color: var(--button-defaul-hovered-color);
    background: var(--button-defaul-hovered-background);
  }

  &.action {
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
