import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  padding: 0,
  margin: 0,
  color: 'red',
  // fontFamily:
  //   '-apple-system, BlinkMacSystemFont, Segoe UI, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
});

globalStyle('a', { color: 'inherit', textDecoration: 'none' });

globalStyle('*', { boxSizing: 'border-box' });
