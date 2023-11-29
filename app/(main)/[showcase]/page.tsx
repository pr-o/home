import React, { FC } from 'react';

import Slideshow from '@/components/Slideshow/SlideShow';
import TextShuffle from '@/components/TextShuffle/TextShuffle';
import NextConfTicket from '@/components/NextConfTicket/NextConfTicket';
import ParticlesBlob from '@/components/ParticlesBlob/ParticlesBlob';
import Expose from '@/components/Expose/Expose';

export default function Page({ params }: { params: { showcase: string } }) {
  console.log('params =>', params);
  return showcaseMap[params.showcase];
}

type Map = {
  [key: string]: React.ReactNode;
};

const showcaseMap: Map = {
  'scratch-cards': <Slideshow />,
  'text-shuffle': <TextShuffle />,
  'next-conf-ticket': <NextConfTicket />,
  'particles-blob': <ParticlesBlob />,
  expose: <Expose />,
};
