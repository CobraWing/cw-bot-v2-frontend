import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
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
    props.isErrored &&
    css`
      border-color: var(--error);
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
      background: var(--tertiary);
      border: 1px solid var(--input-default-border);

      &.react-select__control--is-focused {
        border-color: var(--input-default-focused);
        box-shadow: 0 0 0 1px var(--input-default-focused);
      }
      .react-select__value-container--has-value {
        div {
          color: var(--input-default-text);
        }
      }
    }

    .react-select__menu {
      z-index: 3;
      background: var(--tertiary);

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
  margin-left: 16px;
  margin-top: -5px;

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
