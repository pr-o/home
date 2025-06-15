'use client';

import { useCallback, useState } from 'react';

import Preloader from '@/components/ui/preloader';
import { Index } from '@/components/views';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <div className="grid min-h-screen grid-rows-[1fr] items-center justify-items-center gap-6 font-[family-name:var(--font-geist-sans)]">
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <main className="flex h-full w-full">
        <Index />
      </main>
    </div>
  );
}
