'use client';

import { CameraShake } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ExtrudeGeometry, Shape } from 'three';
import * as THREE from 'three';

interface BoxProps {
  position: [number, number, number];
  width?: number;
  length?: number;
  cornerRadius?: number;
  gridPosition: [number, number];
  hoveredBox: [number, number] | null;
  rippleScale?: number;
  rippleRadius?: number;
}

const Box = ({
  position,
  width = 4,
  length = 4,
  cornerRadius = 2,
  gridPosition,
  hoveredBox,
  rippleScale = 0.3,
  rippleRadius = 3,
}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentScale, setCurrentScale] = useState(1);

  const geometry = useMemo(() => {
    const shape = new Shape();
    const angleStep = Math.PI * 0.5;
    const radius = cornerRadius;

    const halfWidth = width / 2;
    const halfLength = length / 2;

    shape.absarc(halfWidth - radius, halfLength - radius, radius, angleStep * 0, angleStep * 1);
    shape.absarc(-halfWidth + radius, halfLength - radius, radius, angleStep * 1, angleStep * 2);
    shape.absarc(-halfWidth + radius, -halfLength + radius, radius, angleStep * 2, angleStep * 3);
    shape.absarc(halfWidth - radius, -halfLength + radius, radius, angleStep * 3, angleStep * 4);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 20,
      curveSegments: 20,
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    return geometry;
  }, [width, length, cornerRadius]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(() => {
    if (meshRef.current) {
      let targetScale = 1;

      const isThisBoxHovered =
        hoveredBox && gridPosition[0] === hoveredBox[0] && gridPosition[1] === hoveredBox[1];

      if (isThisBoxHovered) {
        targetScale = 5;
      } else if (hoveredBox) {
        const dx = gridPosition[0] - hoveredBox[0];
        const dz = gridPosition[1] - hoveredBox[1];
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance <= rippleRadius && distance > 0) {
          const falloff = Math.max(0, 1 - distance / rippleRadius);
          const rippleEffect = falloff * rippleScale;
          targetScale = 1 + rippleEffect * 3;
        }
      }

      const lerpFactor = 0.1;
      const newScale = currentScale + (targetScale - currentScale) * lerpFactor;
      setCurrentScale(newScale);

      meshRef.current.scale.z = newScale;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.gridPosition = gridPosition;
    }
  }, [gridPosition]);

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <meshPhysicalMaterial
        color="#232323"
        roughness={0.5}
        metalness={1}
        clearcoat={1}
        clearcoatRoughness={0}
        clearcoatNormalScale={1}
        clearcoatNormalMap={null}
      />
    </mesh>
  );
};

function HoverDetector({
  onHoverChange,
}: {
  gridSize: number;
  spacingX: number;
  spacingZ: number;
  onHoverChange: (hoveredBox: [number, number] | null) => void;
}) {
  const { camera, raycaster, pointer, scene } = useThree();

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      for (const intersect of intersects) {
        const mesh = intersect.object;
        if (mesh.userData && mesh.userData.gridPosition) {
          const gridPos = mesh.userData.gridPosition as [number, number];
          onHoverChange(gridPos);
          return;
        }
      }
    }

    onHoverChange(null);
  });

  return null;
}

function GridOfBoxes() {
  const gridSize = 12;
  const boxWidth = 3.6;
  const boxLength = 3.6;
  const gap = 0.048;
  const spacingX = boxWidth + gap;
  const spacingZ = boxLength + gap;

  const [hoveredBox, setHoveredBox] = useState<[number, number] | null>(null);
  const rippleScale = 3.2;
  const rippleRadius = 1.6;

  const boxes: React.ReactNode[] = [];

  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const posX = (x - (gridSize - 1) / 2) * spacingX;
      const posZ = (z - (gridSize - 1) / 2) * spacingZ;

      boxes.push(
        <Box
          key={`${x}-${z}`}
          position={[posX, -0.85, posZ]}
          width={boxWidth}
          length={boxLength}
          cornerRadius={0.8}
          gridPosition={[x, z]}
          hoveredBox={hoveredBox}
          rippleScale={rippleScale}
          rippleRadius={rippleRadius}
        />,
      );
    }
  }

  return (
    <>
      <HoverDetector
        gridSize={gridSize}
        spacingX={spacingX}
        spacingZ={spacingZ}
        onHoverChange={setHoveredBox}
      />
      {boxes}
    </>
  );
}

export function ChromeGrids() {
  return (
    <div className="relative z-0 h-full w-full bg-black">
      <Canvas
        camera={{
          position: [-9.32, 12, 24.68],
          rotation: [-0.64, -0.2, -0.12],
          fov: 35,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 15, 10]} intensity={10} castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={8} color="#ffffff" />
          <directionalLight position={[5, -10, 15]} intensity={4} color="#008080" />
          <pointLight position={[0, 20, 3]} intensity={2} distance={50} />
          <pointLight position={[15, 5, 15]} intensity={1.2} distance={30} color="#ffffff" />
          <GridOfBoxes />
          <CameraShake
            maxYaw={0.02}
            maxPitch={0.02}
            maxRoll={0.02}
            yawFrequency={0.4}
            pitchFrequency={0.4}
            rollFrequency={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
