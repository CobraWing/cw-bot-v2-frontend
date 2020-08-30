import styled, { css } from 'styled-components';

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
  padding: 8px;
  width: 100%;

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

  .editor-input {
    flex: 1;
    background: transparent;
    border: 0;

    .k-toolbar {
      background: var(--input-default-border);
      border-radius: 5px;

      .k-button {
        box-shadow: none !important;
        background-image: none !important;
        &.k-state-active {
          border-color: var(--discord);
          background-color: var(--discord);
        }
        &:active {
          border-color: var(--discord);
          background-color: var(--discord);
        }
        &:first-child {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        &:last-child {
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }
  }

  svg {
    margin-right: 16px;
  }
`;
