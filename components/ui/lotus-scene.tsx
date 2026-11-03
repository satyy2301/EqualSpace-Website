'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

type Pointer = { x: number; y: number };

type PetalRingSpec = {
  count: number;
  length: number;
  width: number;
  curl: number;
  base: string;
  tip: string;
  tiltClosed: number;
  tiltOpen: number;
  delay: number;
  offset: number;
};

const PETAL_RINGS: PetalRingSpec[] = [
  { count: 7, length: 1.05, width: 0.46, curl: -0.12, base: '#FFFDFC', tip: '#F4CBD7', tiltClosed: 1.25, tiltOpen: 0.42, delay: 0, offset: 0 },
  { count: 6, length: 0.86, width: 0.4, curl: -0.1, base: '#FCE8ED', tip: '#E8A9BD', tiltClosed: 1.35, tiltOpen: 0.6, delay: 0.14, offset: 0.26 },
  { count: 5, length: 0.66, width: 0.32, curl: -0.08, base: '#FFFDFC', tip: '#FCE8ED', tiltClosed: 1.5, tiltOpen: 0.85, delay: 0.3, offset: 0.1 },
  { count: 4, length: 0.44, width: 0.24, curl: -0.04, base: '#FFFDFC', tip: '#FFF8F7', tiltClosed: 1.6, tiltOpen: 1.1, delay: 0.46, offset: 0.4 },
];

const SEGMENTS_U = 20;
const SEGMENTS_V = 6;

function createPetalGeometry(length: number, width: number, curl: number, base: string, tip: string) {
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const baseColor = new THREE.Color(base);
  const tipColor = new THREE.Color(tip);
  const color = new THREE.Color();

  for (let i = 0; i <= SEGMENTS_U; i++) {
    const u = i / SEGMENTS_U;
    const halfWidth = width * Math.sin(Math.PI * Math.pow(u, 0.7));
    color.copy(baseColor).lerp(tipColor, Math.pow(u, 1.4));
    for (let j = 0; j <= SEGMENTS_V; j++) {
      const v = -1 + (2 * j) / SEGMENTS_V;
      positions.push(v * halfWidth, u * length, curl * u * u + 0.14 * width * v * v * Math.sin(Math.PI * u));
      colors.push(color.r, color.g, color.b);
    }
  }

  for (let i = 0; i < SEGMENTS_U; i++) {
    for (let j = 0; j < SEGMENTS_V; j++) {
      const a = i * (SEGMENTS_V + 1) + j;
      const b = a + SEGMENTS_V + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function PetalRing({
  spec,
  openRef,
  reducedMotion,
}: {
  spec: PetalRingSpec;
  openRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const geometry = useMemo(
    () => createPetalGeometry(spec.length, spec.width, spec.curl, spec.base, spec.tip),
    [spec],
  );
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        roughness: 0.38,
        clearcoat: 0.55,
        clearcoatRoughness: 0.25,
        sheen: 0.6,
        sheenColor: new THREE.Color('#FCE8ED'),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.94,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    const progress = clampUnit((openRef.current - spec.delay) / (1 - spec.delay));
    const open = easeOutCubic(progress);
    const time = reducedMotion ? 0 : clock.getElapsedTime();

    groupRefs.current.forEach((group, index) => {
      if (!group) return;
      const phase = index * 1.7 + spec.offset * 10;
      const sway = reducedMotion ? 0 : Math.sin(time * 0.55 + phase) * 0.025;
      group.children[0].rotation.x = THREE.MathUtils.lerp(spec.tiltClosed, spec.tiltOpen, open) + sway;
    });
  });

  return (
    <>
      {Array.from({ length: spec.count }, (_, index) => {
        const angle = (index / spec.count) * Math.PI * 2 + spec.offset;
        return (
          <group
            key={index}
            rotation={[0, 0, angle]}
            ref={(node) => {
              groupRefs.current[index] = node;
            }}
          >
            <mesh geometry={geometry} material={material} />
          </group>
        );
      })}
    </>
  );
}

function LotusBody({
  pointer,
  openRef,
  reducedMotion,
}: {
  pointer: MutableRefObject<Pointer>;
  openRef: MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const targetY = pointer.current.x * 0.4;
    const targetX = -pointer.current.y * 0.25;
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.06);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.06);
  });

  return (
    <group ref={groupRef}>
      {PETAL_RINGS.map((ring) => (
        <PetalRing key={ring.delay} spec={ring} openRef={openRef} reducedMotion={reducedMotion} />
      ))}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#FFFDFC" emissive="#E9D8C6" emissiveIntensity={0.35} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function LotusScene({
  openRef,
  reducedMotion,
  compact,
  frameloop,
}: {
  openRef: MutableRefObject<number>;
  reducedMotion: boolean;
  compact: boolean;
  frameloop: 'always' | 'demand';
}) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion]);

  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 34 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 3, 4]} intensity={1.3} color="#FFF8F7" />
      <pointLight position={[-3, -1.5, 2]} intensity={0.9} color="#F4CBD7" />
      <LotusBody pointer={pointer} openRef={openRef} reducedMotion={reducedMotion} />
      <Sparkles
        count={compact ? 14 : 30}
        scale={[4.2, 4.2, 2]}
        size={3}
        speed={reducedMotion ? 0 : 0.25}
        color="#E8A9BD"
        opacity={0.7}
      />
    </Canvas>
  );
}
