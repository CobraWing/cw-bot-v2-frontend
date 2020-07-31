import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #EE0000;
    --secondary: #23272A;
    --tertiary: #36393f;
    --quaternary: #40444b;
    --quinary: #7289DA;

    --cw: #EE0000;
    --text: #dcddde;
    --text-link: #00b0f4;
    --discord: #6e86d6;

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

  body, input, button {
    font-family: 'Roboto', serif;
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
    z-index: 10 !important;
    background: rgba(0, 0, 0, 0.7) !important;
  }
`;
