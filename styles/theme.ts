import {
  // light
  gray,
  blue,
  red,
  green,
  teal,
  // dark
  grayDark,
  blueDark,
  redDark,
  greenDark,
  tealDark,
} from '@radix-ui/colors';

const base = {
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Ubuntu, Helvetica Neue, sans-serif',
};

export const lightTheme = {
  ...base,
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...teal,
  },
};

export const darkTheme = {
  ...base,
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...tealDark,
  },
};
