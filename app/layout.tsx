import { ReactNode } from 'react';
import RootStyleRegistry from '@/components/RootStyleRegistry';

type Props = { children?: ReactNode };

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
