'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'next-themes';

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  // TODO:
  // replace text to icon
  return (
    <StyledButton
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      suppressHydrationWarning>
      {resolvedTheme === 'light' ? 'dark' : 'light'}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 2px solid red;

  font-size: 1rem;

  padding: 0.25em 1em;
  border-radius: 3px;
`;
