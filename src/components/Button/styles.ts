import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ffffff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${shade(0.2, '#ffffff')};
  }

  &.loading {
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
