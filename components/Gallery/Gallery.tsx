'use client';

import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload, Image as ImageImpl } from '@react-three/drei';
import { ScrollControls, Scroll, useScroll } from './ScrollControls';
import { ImageMaterialType } from '@/types/three';

function Images(props: { position: THREE.Vector3; scale: number | [number, number]; url: string }) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();
  const group = useRef<THREE.Group>(null);
  const data = useScroll();
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

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
      : ((ref.current.material as ImageMaterialType).grayscale = THREE.MathUtils.damp(
          (ref.current.material as ImageMaterialType).grayscale as number,
          // Math.max(0, 1 - data.delta * 1000),
          Math.max(0, 1 - data.delta * 10000),
          4,
          delta
        ));
  });
  return (
    <group ref={group}>
      <ImageImpl
        ref={ref as MutableRefObject<THREE.Mesh>}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        onClick={(e) => console.log('clicked -', ref.current)}
        {...props}
      />
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
          position={new THREE.Vector3(width * gap * index - 4.25, 0, 0)}
          scale={[width * w - m * 2, 5]}
          url={url}
          key={`${index}-${url}`}
        />
      ))}
    </>
  );
}

export default function App() {
  const numImages = fullPaths.length;

  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={numImages * 0.33} distance={1}>
          <Scroll>
            <Pages urls={fullPaths} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
}

const dir = '/images/gallery/';
const paths = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'trip1.jpg',
  'trip2.jpg',
  'trip3.jpg',
];
const fullPaths = paths.map((path) => `${dir}${path}`);
