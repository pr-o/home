import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Providers from '@/app/providers';

export const metadata = {
  title: 'Sung',
  description: 'root',
};

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header color={'transparent'} />
          <main>{children}</main>
          {/* TODO: footer */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
