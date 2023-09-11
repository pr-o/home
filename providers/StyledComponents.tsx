'use client';

import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { GlobalStyle } from '@/styles/globalStyle';

export const StyledComponentsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <>
        <GlobalStyle />
        {children}
      </>
    </StyledComponentsRegistry>
  );
};
