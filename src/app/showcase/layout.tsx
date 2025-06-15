import { ViewTransitions } from 'next-view-transitions';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ViewTransitions>{children}</ViewTransitions>;
}
