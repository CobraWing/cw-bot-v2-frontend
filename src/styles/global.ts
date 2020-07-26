import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #EE0000;
    --secondary: #23272A;
    --tertiary: #2C2F33;
    --quaternary: #99AAB5;
    --quinary: #7289DA;

    --cw: #EE0000;
    --text: #f4ede8;
    --discord: #6e86d6;

    --button-primary: #007bff;
    --button-secondary: #6c757d;
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

  body {
    color: #FFF;
    -webkit-font-smoothing: antialiased;

    background: linear-gradient(
      to bottom,
      var(--secondary) 100px,
      var(--tertiary) 100px,
      var(--tertiary) calc(100vh - 50px),
      var(--secondary) 50px
    );
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
`;
