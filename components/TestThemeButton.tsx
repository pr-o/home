'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'next-themes';

export default function Button() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <StyledButton
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      suppressHydrationWarning>
      TOGGLE
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: 2px solid red;

  font-size: 2rem;
  margin: 2em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;
