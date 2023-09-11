'use client';

import { ReactNode, Suspense } from 'react';
import { StyledComponentsProvider } from '@/providers/StyledComponents';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <ThemeProvider>
        <StyledComponentsProvider>{children}</StyledComponentsProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default Providers;
