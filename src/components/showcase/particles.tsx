'use client';

import React from 'react';

import { Particles as PTC } from '@/components/three/particles';

export const Particles = () => {
  const color = '#fff';
  const quantity = 2048;
  const ease = 80;

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
          Particles
        </span>
      </div>
      <PTC className="absolute inset-0" quantity={quantity} ease={ease} color={color} refresh />
    </>
  );
};
