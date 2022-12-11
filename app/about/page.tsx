'use client';

// import dynamic from 'next/dynamic';
// import styled from 'styled-components';
import SlideShow from '@/components/Slideshow/SlideShow';

// const Slideshow = dynamic(import('components/Slideshow/Slideshow'), { ssr: false });

const AboutPage = () => {
  return <SlideShow />;
};

export default AboutPage;

// const Page = styled.div`
//   position: relative;
//   display: block;
//   z-index: 5;
//   height: 100%;
//   overflow: hidden;
//   background-color: #525252;
//   cursor: ew-resize;
// `;
