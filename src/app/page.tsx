import { ChromeGrids } from '@/components/three/chrome-grids';
import { SITE_NAME } from '@/lib/constants';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[1fr] items-center justify-items-center gap-6 font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-full w-full">
        <ChromeGrids />
        <h1 className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-4xl font-extrabold tracking-wider whitespace-nowrap text-[#ffffffee] italic text-shadow-[#00808088] text-shadow-lg md:text-6xl">
          {SITE_NAME}
        </h1>
      </main>
    </div>
  );
}
