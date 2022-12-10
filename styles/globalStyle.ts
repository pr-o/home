import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', '-apple-system', BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100vh;
  }

  h1 {
    color: red;
    background-color: blue;
  }

  a {
    color: inherit;
    padding: 0 0.25rem;
    text-decoration: none;
    cursor: pointer;
  }
`;
