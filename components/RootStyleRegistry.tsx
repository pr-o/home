'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useStyledComponentsRegistry } from '@/lib/styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/globalStyle';
import { useTheme } from '@/hooks/useTheme';

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] = useStyledComponentsRegistry();
  const [theme, _] = useTheme();

  useServerInsertedHTML(() => <>{styledComponentsFlushEffect()}</>);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme === true ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
