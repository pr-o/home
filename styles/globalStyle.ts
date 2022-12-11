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

  div[data-nextjs-scroll-focus-boundary] {
    padding-top: 10rem;
  }

  header {
    color: transparent; /* to prevent the initial layout shift */
  }

  a {
    color: inherit;
    padding: 0 0.25rem;
    text-decoration: none;
    cursor: pointer;
  }
`;
