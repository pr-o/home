'use client';

import * as THREE from 'three';
import React, { Suspense, useRef, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload, Image as ImageImpl } from '@react-three/drei';
import { ScrollControls, Scroll, useScroll } from './ScrollControls';
import { ImageMaterialType } from '@/types/three';

function Images(props: { position: THREE.Vector3; scale: number | [number, number]; url: string }) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();
  const group = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (!group.current?.position) return;

    group.current.position.z = THREE.MathUtils.damp(
      group.current?.position.z,
      Math.max(0, data.delta * 75),
      4,
      delta
    );

    if (!ref.current) return;

    (ref.current.material as ImageMaterialType).grayscale = THREE.MathUtils.damp(
      (ref.current.material as ImageMaterialType).grayscale as number,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref as MutableRefObject<THREE.Mesh>} {...props} />
    </group>
  );
}

function Pages({ m = 0.4, urls }: { m?: number; urls: string[] }) {
  const { width } = useThree((state) => state.viewport);

  const gap = 0.3;

  const w = width < 10 ? 1.5 / 3 : 1 / 3;

  return (
    <>
      {urls.map((url, index) => (
        <Images
          position={new THREE.Vector3(width * gap * index - 4.5, 0, 0)}
          scale={[width * w - m * 2, 5]}
          url={url}
          key={`${index}-${url}`}
        />
      ))}
    </>
  );
}

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={3.1} distance={1}>
          <Scroll>
            <Pages urls={urls} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
}

const path = '/images/gallery/';
const urls = [
  `${path}img1.jpg`,
  `${path}img2.jpg`,
  `${path}img3.jpg`,
  `${path}img4.jpg`,
  `${path}img5.jpg`,
  `${path}img6.jpg`,
  `${path}trip1.jpg`,
  `${path}trip2.jpg`,
  `${path}trip3.jpg`,
  `${path}img1.jpg`,
  `${path}img2.jpg`,
  `${path}img3.jpg`,
];
