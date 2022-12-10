'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/theme';

export default function Button() {
  const [theme, toggle] = useTheme();

  return (
    <ThemeProvider theme={theme === true ? darkTheme : lightTheme}>
      <StyledButton onClick={() => toggle()}> TOGGLE</StyledButton>
    </ThemeProvider>
  );
}

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.custom};
  border: 2px solid red;
  background: ${(props) => props.theme.colors.white};

  font-size: 2rem;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;
