'use client';

import { ReactNode, Suspense } from 'react';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children?: ReactNode }) => {
  return (
    <Suspense fallback={<>loading...</>}>
      <ThemeProvider>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </ThemeProvider>
    </Suspense>
  );
};

export default Providers;
