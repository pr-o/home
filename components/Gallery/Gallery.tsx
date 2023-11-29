'use client';

import * as THREE from 'three';
import React, { Suspense, useRef, useState, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload, Image as ImageImpl, useCursor } from '@react-three/drei';
import { ScrollControls, Scroll, useScroll } from './ScrollControls';
import { ImageMaterialType } from '@/types/three';
import Header from '@/components/Header/Header';

function Images(props: {
  position: THREE.Vector3;
  scale: number | [number, number];
  pageUrl: string;
  url: string;
}) {
  const { position, pageUrl, url } = props;
  const ref =
    useRef<
      THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
    >();
  const group = useRef<THREE.Group>(null);
  const data = useScroll();
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);
  const { width } = useThree((state) => state.viewport);

  // fade logic
  useFrame((state, delta) => {
    if (!group.current?.position) return;

    group.current.position.z = THREE.MathUtils.damp(
      group.current?.position.z,
      Math.max(0, data.delta * 75),
      5,
      delta
    );

    if (!ref.current) return;

    hovered
      ? ((ref.current.material as ImageMaterialType).grayscale = 0)
      : ((ref.current.material as ImageMaterialType).grayscale =
          THREE.MathUtils.damp(
            (ref.current.material as ImageMaterialType).grayscale as number,
            Math.max(0, 1 - data.delta * 10000),
            4,
            delta
          ));
  });

  return (
    <group ref={group}>
      <ImageImpl
        ref={ref as MutableRefObject<THREE.Mesh>}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
        onClick={(e) => (window.location.href = pageUrl)}
        {...props}
      />
    </group>
  );
}

function Pages({
  info,
}: {
  info: {
    id: string;
    title: string;
    description: string;
    pageUrl: string;
    url: string;
  }[];
}) {
  const { width, height } = useThree((state) => state.viewport);

  const ratio = width / height;

  const w = width < 10 ? 0.45 : 0.4;
  const gap = w * 0.9;

  return (
    <>
      {info.map(({ id, title, description, pageUrl, url }, index) => (
        <Images
          position={new THREE.Vector3(index * ratio * 9 * gap - 0.25, 0, 0)}
          scale={[ratio * 3, ratio * 2]}
          pageUrl={pageUrl}
          url={url}
        />
      ))}
    </>
  );
}

export default function App() {
  const numImages = frameInfo.length;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
      <Header />
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal
            damping={4}
            pages={numImages * 0.5}
            distance={1}>
            <Scroll>
              <Pages info={frameInfo} />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </div>
  );
}

const frameInfo = [
  {
    id: '00',
    title: 'Scratch Cards',
    description: 'description',
    url: '/images/showcase/scratch-cards.png',
    pageUrl: '/scratch-cards',
  },
  {
    id: '01',
    title: 'Text Shuffle',
    description: 'description',
    url: '/images/showcase/text-shuffle.png',
    pageUrl: '/text-shuffle',
  },
  {
    id: '02',
    title: 'Next Conf Ticket',
    description: 'description',
    url: '/images/showcase/next-conf-ticket-clone.png',
    pageUrl: '/next-conf-ticket',
  },
  {
    id: '03',
    title: 'Particles Blob',
    description: 'description',
    url: '/images/showcase/particles-blob.png',
    pageUrl: '/particles-blob',
  },
  {
    id: '04',
    title: 'Particles Blob',
    description: 'description',
    url: '/images/gallery/img5.jpg',
    pageUrl: '/particles-blob',
  },
  {
    id: '05',
    title: 'title 6',
    description: 'description',
    url: '/images/gallery/img6.jpg',
    pageUrl: '/scratch-card',
  },
];
