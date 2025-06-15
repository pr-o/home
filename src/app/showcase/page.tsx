import PageWrapper from '@/components/ui/animated-page-wrapper';

export default function Showcase() {
  return (
    <PageWrapper>
      <div className="grid min-h-screen grid-rows-[1fr] items-center justify-items-center gap-6 font-[family-name:var(--font-geist-sans)]">
        <main className="flex h-full w-full">
          <h1 className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-4xl font-extrabold tracking-wider whitespace-nowrap text-[#ffffffee] italic text-shadow-[#00808088] text-shadow-lg md:text-6xl">
            Hi
          </h1>
        </main>
      </div>
    </PageWrapper>
  );
}
