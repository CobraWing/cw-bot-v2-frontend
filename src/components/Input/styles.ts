import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 6px 8px;
  width: 100%;

  border: 2px solid var(--quinary);
  color: var(--text);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--discord);
      border-color: var(--discord);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--discord);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--text);
    font-size: 14px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
