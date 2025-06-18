import './globals.css';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Geist, Geist_Mono } from 'next/font/google';

import { GNB } from '@/components/ui/gnb';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SUNG',
  description: "Sung's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <GNB />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
