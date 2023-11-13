'use client';

import * as THREE from 'three';
import React, { Suspense, useRef, useState, useEffect, MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload, Image as ImageImpl, Text, useCursor } from '@react-three/drei';
import { ScrollControls, Scroll, useScroll } from './ScrollControls';
import { ImageMaterialType } from '@/types/three';
import { suspend } from 'suspend-react';
import Header from '@/components/Header/Header';

const regular = import('@pmndrs/assets/fonts/inter_regular.woff');
const medium = import('@pmndrs/assets/fonts/inter_medium.woff');

function Images(props: {
  position: THREE.Vector3;
  scale: number | [number, number];
  index: number;
  title: string;
  description: string;
  url: string;
}) {
  const { position, index, title, description, url } = props;
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>();
  const group = useRef<THREE.Group>(null);
  const data = useScroll();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

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
      : ((ref.current.material as ImageMaterialType).grayscale = THREE.MathUtils.damp(
          (ref.current.material as ImageMaterialType).grayscale as number,
          Math.max(0, 1 - data.delta * 10000),
          4,
          delta
        ));
  });

  const { x, y } = position;
  return (
    <group ref={group}>
      <ImageImpl
        ref={ref as MutableRefObject<THREE.Mesh>}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
        onClick={(e) => window.alert('clicked -')}
        {...props}
      />
      <Text
        font={suspend(medium).default}
        fontSize={0.6}
        lineHeight={1}
        anchorY="top"
        anchorX="left"
        position={[x - 1.75, y + 2.25, 0.01]}
        material-toneMapped={false}>
        {title}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.15}
        anchorX="left"
        position={[x - 1.795, y - 2.25, 0.01]}
        material-toneMapped={false}>
        {description}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.2}
        anchorX="left"
        position={[x + 1.625, y - 2.25, 0.01]}
        material-toneMapped={false}>
        {index.toString().padStart(2, '0')}
      </Text>
    </group>
  );
}

function Pages({
  info,
}: {
  info: { id: string; title: string; description: string; url: string }[];
}) {
  const { width } = useThree((state) => state.viewport);

  const w = width < 10 ? 0.5 : 0.33;
  const gap = w * 0.9;

  return (
    <>
      {info.map(({ id, title, description, url }, index) => (
        <Images
          position={new THREE.Vector3(index * width * gap - 2.25, 0, 0)}
          scale={[width * w - 0.8, 5]}
          index={index}
          title={title}
          description={description}
          url={url}
          key={`${index}-${url}`}
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
      <Header color={'transparent'} />

      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} zIndex={3}>
        <Suspense fallback={null}>
          <ScrollControls infinite horizontal damping={4} pages={numImages * 0.37} distance={1}>
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
  { id: '00', title: 'title 1', description: 'description', url: '/images/gallery/img1.jpg' },
  { id: '01', title: 'title 2', description: 'description', url: '/images/gallery/img2.jpg' },
  { id: '02', title: 'title 3', description: 'description', url: '/images/gallery/img3.jpg' },
  { id: '03', title: 'title 4', description: 'description', url: '/images/gallery/img4.jpg' },
  { id: '04', title: 'title 5', description: 'description', url: '/images/gallery/img5.jpg' },
  { id: '05', title: 'title 6', description: 'description', url: '/images/gallery/img6.jpg' },
];
