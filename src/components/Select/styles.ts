import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Label = styled.span`
  margin-left: 10px;
`;

export const Tip = styled.span`
  margin-left: 10px;
`;

export const Container = styled.div<ContainerProps>`
  background: var(--input-default-background);
  border-radius: 10px;
  width: 100%;

  color: var(--input-default-color);

  display: flex;
  align-items: center;

  &.isError {
    border: 2px solid var(--error);
    .with-error > .react-select__control {
      border: 0;
      border-right: 1px solid var(--input-default-border);
    }
  }

  &:not(.isError):hover {
    border-color: var(--input-default-hovered-border);
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--input-default-focused);
      border-color: var(--input-default-focused);
    `}

  > div {
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

    .react-select__control {
      background: var(--input-default-background);
      border: 2px solid var(--input-default-border);
      border-radius: 10px;

      &.react-select__control--is-focused {
        border-color: var(--input-default-focused);
        box-shadow: 0 0 0 1px var(--input-default-focused);
      }
      .react-select__value-container--has-value {
        div {
          color: var(--input-default-text);
        }
      }
      .react-select__input {
        input {
          color: var(--input-default-text) !important;
        }
      }
    }

    .react-select__menu {
      z-index: 3;
      background: var(--tertiary);
      border: 2px solid var(---input-default-hovered-border);
      margin-top: 0;

      .react-select__option--is-focused:not(.react-select__option--is-selected) {
        background-color: var(--quinary);
      }

      .react-select__option--is-selected {
        font-weight: 500;
      }
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 16px;
  margin-top: -5px;
  margin-right: 8px;

  text-align: right;
  max-width: 30px;

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
