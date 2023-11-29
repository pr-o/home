'use client';
import './Expose.css';
import { gsap } from 'gsap';
import React, { useMemo, useRef, useEffect } from 'react';
import localFont from 'next/font/local';
import HomeButton from '@/components/HomeButton/HomeButton';

const BlackOpsOneFont = localFont({
  src: '../../assets/fonts/BlackOpsOne/BlackOpsOne-Regular.ttf',
});

const imagePaths = [
  '1-1.jpg',
  '1-2.jpg',
  '2-1.jpg',
  '2-2.jpg',
  '3-1.jpg',
  '3-2.jpg',
  '4-1.jpg',
  '4-2.jpg',
  '5-1.jpg',
  '5-2.jpg',
  '6-1.jpg',
  '6-2.jpg',
  '7-1.jpg',
  '7-2.jpg',
  '8-1.jpg',
  '8-2.jpg',
  '9-2.jpg',
  '9-1.jpg',
].map((path) => `/images/scratchCards/${path}`);

const positions = [
  { top: '2%', left: '23%' },
  { top: '4%', left: '10%' },
  { top: '9%', left: '60%' },
  { top: '13%', left: '15%' },
  { top: '16%', left: '40%' },
  { top: '19%', left: '90%' },
  { top: '31%', left: '50%' },
  { top: '34%', left: '75%' },
  { top: '38%', left: '75%' },
  { top: '43%', left: '23%' },
  { top: '49%', left: '44%' },
  { top: '52%', left: '56%' },
  { top: '56%', left: '77%' },
  { top: '61%', left: '30%' },
  { top: '68%', left: '50%' },
  { top: '64%', left: '90%' },
  { top: '83%', left: '20%' },
  { top: '86%', left: '40%' },
];

const Expose = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set('.img', {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(0)',
      opacity: 1,
    });

    gsap.from('p', {
      y: 40,
      ease: 'power4.inOut',
      duration: 1,
      stagger: {
        amount: 0.15,
      },
      delay: 0.5,
      opacity: 0,
    });

    gsap.to('.img', {
      scale: 1,
      width: '450px',
      height: '600px',
      stagger: 0.15,
      duration: 0.75,
      ease: 'power2.out',
      delay: 1,
      onComplete: scatterAndShrink,
    });

    gsap.to('p', {
      top: '40px',
      ease: 'power4.inOut',
      duration: 2,
      stagger: {
        amount: 0.15,
      },
      delay: 2,
      opacity: 1,
      onComplete: () => {
        gsap.to('p', {
          top: '80px',
          ease: 'power4.inOut',
          duration: 2,
          stagger: { amount: 0.3 },
          delay: 1,
          opacity: 0,
        });

        headerRef.current?.remove();
      },
    });
  });

  function scatterAndShrink() {
    gsap.to('.img', {
      top: (i) => positions[i].top,
      left: (i) => positions[i].left,
      transform: 'none',
      width: '100px',
      height: '125px',
      stagger: 0.09,
      duration: 1.5,
      ease: 'power2.out',
    });
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          <p className={BlackOpsOneFont.className}>In a future</p>
        </div>

        <div className="text">
          <p className={BlackOpsOneFont.className}>not too distant</p>
        </div>
      </div>
      <div className="gallery">
        {imagePaths.map((path, index) => (
          <div className="img">
            <img src={path} alt={`image-${index}`} width="0" height="0" />
          </div>
        ))}
      </div>
      <HomeButton size="24px" />
    </div>
  );
};

export default Expose;
