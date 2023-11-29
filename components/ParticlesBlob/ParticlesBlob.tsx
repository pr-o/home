'use client';

import React, { useMemo, useRef } from 'react';
import { OrbitControls, useFBO } from '@react-three/drei';
import { Canvas, useFrame, extend, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';

import SimulationMaterial from './simulationMaterial';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';
import HomeButton from '@/components/HomeButton/HomeButton';

extend({ SimulationMaterial });

const FBOParticles = () => {
  const levaOptions = useMemo(() => {
    return {
      size: {
        value: 128,
        min: 8,
        max: 256,
        step: 4,
      },
    };
  }, []);

  // const size = 128;
  const { size } = useControls(levaOptions);

  const points = useRef(null);
  const simulationMaterialRef = useRef(null);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    1 / Math.pow(2, 53),
    1
  );
  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: null,
      },
    }),
    []
  );

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (!points.current) return;
    (points.current as any).material.uniforms.uPositions.value =
      renderTarget.texture;

    if (!simulationMaterialRef.current) return;
    (simulationMaterialRef.current as any).uniforms.uTime.value =
      clock.elapsedTime;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[size]} />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};

const Scene = () => {
  const levaOptions = useMemo(() => {
    return {
      backgroundColor: {
        value: '#000000',
      },
    };
  }, []);
  const { backgroundColor } = useControls(levaOptions);

  return (
    <>
      <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
        <color args={[backgroundColor]} attach="background" />
        <ambientLight intensity={0.5} />
        <FBOParticles />
        <OrbitControls />
      </Canvas>
      <HomeButton size={'24px'} />
    </>
  );
};

export default Scene;
