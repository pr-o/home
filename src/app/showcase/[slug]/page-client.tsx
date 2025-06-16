'use client';

// import Image from 'next/image'
import Image from 'next/image';
import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

import { type Place } from '@/lib/constants';

export default function Place({ place }: { place: Place }) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-0 md:flex-row md:px-8">
        <div className="group relative w-full sm:w-auto">
          <ViewTransition name="back-button">
            <Link
              href="/showcase"
              className="bg-opacity-50 hover:bg-opacity-75 absolute top-4 left-4 z-10 rounded-full py-1 text-gray-100 drop-shadow-[2px_2px_6px_#666] filter transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          </ViewTransition>

          <ViewTransition name={`place-image-${place.id}`}>
            <div className="y-full relative h-[70vh] w-full cursor-pointer overflow-clip transition-all duration-300 ease-in-out md:w-[70vw] md:rounded-lg">
              <Image
                fill
                loading="eager"
                decoding="sync"
                src={place.image}
                alt={place.name}
                className="overflow-clip object-cover transition-all duration-300 ease-in-out group-hover:scale-105 md:rounded-lg"
              />
            </div>
          </ViewTransition>

          <ViewTransition name="place-name">
            <div className="absolute inset-0 h-full w-full overflow-clip drop-shadow-[2px_2px_12px_#333] filter transition-all duration-300 ease-out md:rounded-lg">
              <div className="bg-opacity-50 absolute right-4 bottom-4 rounded-xl text-3xl text-gray-100 drop-shadow-xs">
                {place.name}
              </div>
            </div>
          </ViewTransition>
        </div>
      </div>
    </div>
  );
}
