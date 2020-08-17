import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Label = styled.span`
  margin-left: 10px;
`;

export const Container = styled.div<ContainerProps>`
  background: var(--input-default-background);
  border-radius: 10px;
  padding: 6px 8px;
  width: 100%;
  height: 80px;

  border: 2px solid var(--input-default-border);
  color: var(--input-default-color);

  display: flex;
  align-items: center;

  &:not(.isError):hover {
    border-color: var(--input-default-hovered-border);
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--input-default-focused);
      border-color: var(--input-default-focused);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--discord);
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--error);
    `}


  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--input-default-text);
    font-size: 14px;
    height: 100%;
    resize: none;

    &::placeholder {
      color: var(--input-default-placeholder);
    }

    &:hover {
      &::placeholder {
        color: var(--input-default-hovered-placeholder);
      }
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
