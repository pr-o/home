// 'use client';

import { FC } from 'react';
// import Gallery from '@/components/Gallery/Gallery';

import Slideshow from '@/components/Slideshow/SlideShow';
import TextShuffle from '@/components/TextShuffle/TextShuffle';

export default function Page({ params }: { params: { showcase: string } }) {
  console.log('params =>', params);
  return showcaseMap[params.showcase];
}

type Map = {
  [key: string]: FC;
};

const showcaseMap: Map = {
  'scratch-cards': <Slideshow />,
  'text-shuffle': <TextShuffle />,
};
