// 'use client';

import { FC } from 'react';
// import Gallery from '@/components/Gallery/Gallery';

import Slideshow from '@/components/Slideshow/SlideShow';

export default function Page({ params }: { params: { showcase: string } }) {
  console.log('params =>', params);
  return showcaseMap[params.showcase];
}

type Map = {
  [key: string]: FC;
};

const showcaseMap: Map = {
  scratchCards: <Slideshow />,
};
