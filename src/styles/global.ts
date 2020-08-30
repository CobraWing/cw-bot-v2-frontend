import '@progress/kendo-theme-default/dist/all.css';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #EE0000;
    --secondary: #2f3136;
    --tertiary: #36393f;
    --quaternary: #40444b;
    --quinary: #53565d;
    --secnary:#74777a
    --octnary: #8a8c90;

    --cw: #EE0000;
    --text: #dcddde;
    --text-link: #00b0f4;
    --discord: #6e86d6;

    --input-default-background: #23272A;
    --input-default-border: #53565d;
    --input-default-color: #dcddde;
    --input-default-focused: #8a8c90;
    --input-default-text: #dcddde;
    --input-default-placeholder: #666360;
    --input-default-hovered-border: #8a8c90;
    --input-default-hovered-placeholder: #8a8c90;

    --button-defaul-color: #fff;
    --button-defaul-border: #8a8c90;
    --button-defaul-background: tranparent;
    --button-defaul-hovered-color: #23272A;
    --button-defaul-hovered-background: #dcddde;

    --button-primary: #007bff;
    --button-secondary: #6c757d;
    --button-positive: #28a745;
    --button-negative: #c53030;
    --button-success: #28a745;
    --button-danger: #dc3545;
    --button-warning: #ffc107;
    --button-info: #17a2b8;

    --black: #000;
    --white: #fff;
    --gray: #8a8c90;
    --symbol: #74777a;

    --error: #c53030;
    --error-light: #fddede;
    --success: #2e656a;
    --success-light: #e6fffa;
    --info: #3172b7;
    --info-light: #ebf8ff;
    --mention-detail: #f9a839;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  a {
    color: var(--text-link);
  }

  body {
    color: var(--text);
    -webkit-font-smoothing: antialiased;

    background: linear-gradient(
      to bottom,
      var(--secondary) 100px,
      var(--tertiary) 100px,
      var(--tertiary) calc(100vh - 50px),
      var(--secondary) 50px
    );

    &.ReactModal__Body--open {
      overflow: hidden;
    }
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4 , h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .rdt_Pagination {
    justify-content: center;

    > span {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .ReactModal__Overlay {
    z-index: 6 !important;
    background: rgba(0, 0, 0, 0.7) !important;
  }

  .k-dialog-wrapper {
    input {
      border-radius: 10px;
      border: 2px solid var(--input-default-border) !important;
      color: var(--input-default-color) !important;
      background: transparent !important;

      &:hover {
        border-color: var(--input-default-hovered-border) !important;
      }
    }

    .k-dialog-titlebar {
      background-color: var(--secondary);
      color: var(--text);
      border-bottom: 0;
    }

    .k-dialog-content {
      background-color: var(--tertiary);
      color: var(--text);
    }

    .DISABLE-k-dialog-buttongroup {
      .k-button {
        background-color: var(--tertiary) !important;
        color: var(--text) !important;
        background-image: none;
        &:hover {
          background-color: var(--text) !important;
          color: var(--quaternary) !important;
        }
        &.k-primary {
          border-color: var(--tertiary) !important;
          &:hover {
            background-color: var(--text) !important;
            color: var(--quaternary) !important;
          }
          &.k-state-focused {
            box-shadow: none !important;
          }
          &:focus {
            box-shadow: none !important;
          }
        }
      }
    }
  }
`;
