import { ChromeGrids } from "@/components/three/chrome-grids";
import { SITE_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen gap-6 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full h-full">
        <ChromeGrids />
        <h1 className="absolute top-1/2 left-1/2 -translate-1/2 text-4xl md:text-6xl italic font-extrabold tracking-wider text-[#ffffffee] text-shadow-lg text-shadow-[#00808088] whitespace-nowrap pointer-events-none">
          {SITE_NAME}
        </h1>
      </main>
    </div>
  );
}
