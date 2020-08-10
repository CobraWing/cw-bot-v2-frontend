import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--input-default-background);
  border-radius: 10px;
  padding: 6px 8px;
  width: 100%;

  border: 2px solid var(--input-default-border);
  color: var(--input-default-color);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--error);
    `}

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

  &:hover {
    border-color: var(--input-default-hovered-border);
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--input-default-text);
    font-size: 14px;

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
