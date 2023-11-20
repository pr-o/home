import '@/styles/global.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Providers from '@/app/providers';
// import Transition from './transition-y';
import { motion, AnimatePresence } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Sung',
  description: 'root',
};

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <>
            {children}
            {/* TODO: footer */}
          </>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
