import { ReactNode, Suspense } from 'react';
import RootStyleRegistry from '@/components/RootStyleRegistry';
import Header from '@/components/Header/Header';

type Props = { children?: ReactNode };

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Suspense fallback={<></>}>
          <Header
            color={'transparent'}
            changeColorOnScroll={{
              height: 100,
              color: '#008080',
            }}
          />
        </Suspense>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
