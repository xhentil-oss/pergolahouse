import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ── color map from label to hex ── */
const colorMap: Record<string, string> = {
  "White 9016 T": "#E8E4DF",
  "Ivory 1015 T": "#D9C87A",
  "Gray 7046 T": "#8E9196",
  "Gray 7016 T": "#2E3234",
  "Black 9005 T": "#0A0A0D",
};

/* ── Realistic Pergola 3D Model ── */
interface PergolaModelProps {
  width: number;   // metres
  depth: number;   // metres
  height: number;  // metres
  color: string;
}

/* ── Individual Louver Blade (rotatable with animation) ── */
const LouverBlade = ({ position, bladeW, bladeD, material, targetAngle, delay }: {
  position: [number, number, number];
  bladeW: number;
  bladeD: number;
  material: THREE.MeshStandardMaterial;
  targetAngle: number;
  delay: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const currentAngle = useRef(0);
  const delayTimer = useRef(0);
  const prevTarget = useRef(targetAngle);

  useFrame((_, delta) => {
    if (prevTarget.current !== targetAngle) {
      delayTimer.current = 0;
      prevTarget.current = targetAngle;
    }
    delayTimer.current += delta;
    if (delayTimer.current < delay) return;
    currentAngle.current += (targetAngle - currentAngle.current) * Math.min(delta * 3, 1);
    if (meshRef.current) {
      meshRef.current.rotation.z = currentAngle.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]} material={material} castShadow>
      <boxGeometry args={[bladeW, 0.008, bladeD]} />
    </mesh>
  );
};

const PergolaModel = ({ width, depth, height, color, louversOpen }: PergolaModelProps & { louversOpen: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const hex = colorMap[color] ?? color;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  /* ── Dimensions ── */
  const postW = 0.12;         // post cross-section
  const postD = 0.12;
  const mainBeamH = 0.18;     // main perimeter beam height
  const mainBeamW = 0.10;     // main perimeter beam width/depth
  const gutterH = 0.06;       // integrated gutter
  const gutterW = 0.14;
  const rafterH = 0.10;       // rafter (cross beams under louvers)
  const rafterW = 0.05;
  const louverCount = Math.max(6, Math.round(width / 0.18));
  const bladeW = 0.15;        // louver blade width
  const bladeD = depth - mainBeamW * 2 - 0.04;

  const halfW = width / 2;
  const halfD = depth / 2;

  /* ── Materials ── */
  const mainMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.28, metalness: 0.75 }),
    [hex]
  );
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: new THREE.Color(hex).multiplyScalar(0.7),
      roughness: 0.35,
      metalness: 0.8,
    }),
    [hex]
  );
  const floorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c4b5a0", roughness: 0.9, metalness: 0.0 }),
    []
  );
  const tileMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#a89279", roughness: 0.85, metalness: 0.0 }),
    []
  );
  const grassMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#7da55a", roughness: 1, metalness: 0 }),
    []
  );

  /* ── Post positions ── */
  const posts: [number, number, number][] = useMemo(() => [
    [-halfW + postW / 2, height / 2, -halfD + postD / 2],
    [halfW - postW / 2, height / 2, -halfD + postD / 2],
    [halfW - postW / 2, height / 2, halfD - postD / 2],
    [-halfW + postW / 2, height / 2, halfD - postD / 2],
  ], [halfW, halfD, height]);

  /* ── Louver positions ── */
  const louvers = useMemo(() => {
    const items: number[] = [];
    const innerW = width - mainBeamW * 2;
    const spacing = innerW / (louverCount + 1);
    for (let i = 1; i <= louverCount; i++) {
      items.push(-halfW + mainBeamW + spacing * i);
    }
    return items;
  }, [width, louverCount, halfW]);

  /* ── Rafter positions (every ~0.6m along depth) ── */
  const rafters = useMemo(() => {
    const count = Math.max(2, Math.round(depth / 0.6));
    const innerD = depth - mainBeamW * 2;
    const spacing = innerD / (count + 1);
    const items: number[] = [];
    for (let i = 1; i <= count; i++) {
      items.push(-halfD + mainBeamW + spacing * i);
    }
    return items;
  }, [depth, halfD]);

  /* ── Floor tiles ── */
  const tiles = useMemo(() => {
    const tileSize = 0.5;
    const gap = 0.015;
    const items: [number, number][] = [];
    const startX = -halfW - 0.3;
    const endX = halfW + 0.3;
    const startZ = -halfD - 0.3;
    const endZ = halfD + 0.3;
    for (let x = startX; x < endX; x += tileSize + gap) {
      for (let z = startZ; z < endZ; z += tileSize + gap) {
        items.push([x + tileSize / 2, z + tileSize / 2]);
      }
    }
    return { items, tileSize };
  }, [halfW, halfD]);

  const roofY = height;
  const beamCenterY = roofY - mainBeamH / 2;

  return (
    <group ref={groupRef} position={[0, -height / 2, 0]}>

      {/* ── 4 Vertical Posts (rounded aluminum) ── */}
      {posts.map((pos, i) => (
        <RoundedBox key={`post-${i}`} args={[postW, height, postD]} radius={0.015} smoothness={4} position={pos} material={mainMat} castShadow />
      ))}

      {/* ── Post base plates ── */}
      {posts.map((pos, i) => (
        <mesh key={`base-${i}`} position={[pos[0], 0.01, pos[2]]} material={darkMat}>
          <boxGeometry args={[postW + 0.04, 0.02, postD + 0.04]} />
        </mesh>
      ))}

      {/* ── Post top caps ── */}
      {posts.map((pos, i) => (
        <mesh key={`cap-${i}`} position={[pos[0], height + 0.005, pos[2]]} material={darkMat}>
          <boxGeometry args={[postW + 0.02, 0.01, postD + 0.02]} />
        </mesh>
      ))}

      {/* ── Main Perimeter Beams (front & back) ── */}
      <RoundedBox args={[width, mainBeamH, mainBeamW]} radius={0.01} smoothness={4} position={[0, beamCenterY, -halfD + mainBeamW / 2]} material={mainMat} castShadow />
      <RoundedBox args={[width, mainBeamH, mainBeamW]} radius={0.01} smoothness={4} position={[0, beamCenterY, halfD - mainBeamW / 2]} material={mainMat} castShadow />

      {/* ── Main Perimeter Beams (left & right) ── */}
      <RoundedBox args={[mainBeamW, mainBeamH, depth - mainBeamW * 2]} radius={0.01} smoothness={4} position={[-halfW + mainBeamW / 2, beamCenterY, 0]} material={mainMat} castShadow />
      <RoundedBox args={[mainBeamW, mainBeamH, depth - mainBeamW * 2]} radius={0.01} smoothness={4} position={[halfW - mainBeamW / 2, beamCenterY, 0]} material={mainMat} castShadow />

      {/* ── Integrated Gutter (front & back bottom edge) ── */}
      <mesh position={[0, roofY - mainBeamH - gutterH / 2, -halfD + gutterW / 2]} material={darkMat}>
        <boxGeometry args={[width + 0.02, gutterH, gutterW]} />
      </mesh>
      <mesh position={[0, roofY - mainBeamH - gutterH / 2, halfD - gutterW / 2]} material={darkMat}>
        <boxGeometry args={[width + 0.02, gutterH, gutterW]} />
      </mesh>

      {/* ── Rafters (cross beams running front-to-back, under louvers) ── */}
      {rafters.map((z, i) => (
        <mesh key={`rafter-${i}`} position={[0, roofY - rafterH / 2, z]} material={darkMat} castShadow>
          <boxGeometry args={[width - mainBeamW * 2 - 0.02, rafterH, rafterW]} />
        </mesh>
      ))}

      {/* ── Louver Blades (the signature aluminum slats) ── */}
      {louvers.map((x, i) => (
        <LouverBlade
          key={`louver-${i}`}
          position={[x, roofY + 0.004, 0]}
          bladeW={bladeW}
          bladeD={bladeD}
          material={mainMat}
          targetAngle={louversOpen ? Math.PI / 2.5 : 0}
          delay={i * 0.04}
        />
      ))}

      {/* ── Top rail over louvers (front & back) ── */}
      <mesh position={[0, roofY + 0.015, -halfD + mainBeamW / 2]} material={darkMat}>
        <boxGeometry args={[width + 0.04, 0.025, 0.04]} />
      </mesh>
      <mesh position={[0, roofY + 0.015, halfD - mainBeamW / 2]} material={darkMat}>
        <boxGeometry args={[width + 0.04, 0.025, 0.04]} />
      </mesh>

      {/* ── Terrace / patio floor with tiles ── */}
      {/* base slab */}
      <mesh position={[0, -0.025, 0]} receiveShadow material={floorMat}>
        <boxGeometry args={[width + 0.8, 0.05, depth + 0.8]} />
      </mesh>
      {/* individual tiles */}
      {tiles.items.map(([tx, tz], i) => (
        <mesh key={`tile-${i}`} position={[tx, 0.001, tz]} receiveShadow material={tileMat}>
          <boxGeometry args={[tiles.tileSize - 0.01, 0.003, tiles.tileSize - 0.01]} />
        </mesh>
      ))}

      {/* ── Grass ground ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow material={grassMat}>
        <planeGeometry args={[width * 4, depth * 4]} />
      </mesh>
    </group>
  );
};

/* ── loading fallback ── */
const Loader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
      <span className="text-xs text-zinc-500">3D wird geladen…</span>
    </div>
  </div>
);

/* ── exported component ── */
interface Pergola3DViewerProps {
  breite: number;    // mm
  laenge: number;    // mm
  hoehe: number;     // mm
  color: string;     // color label
}

export const Pergola3DViewer = ({ breite, laenge, hoehe, color, louversOpen = false }: Pergola3DViewerProps & { louversOpen?: boolean }) => {
  const w = breite / 1000;
  const d = laenge / 1000;
  const h = hoehe / 1000;

  const maxDim = Math.max(w, d, h);
  const camDist = maxDim * 1.8;

  return (
    <div className="relative h-full w-full" style={{ minHeight: 320 }}>
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [camDist * 0.9, camDist * 0.6, camDist * 0.9], fov: 40, near: 0.1, far: 200 }}
          style={{ background: "linear-gradient(180deg, #c9daf0 0%, #e2e8ec 35%, #eae6df 70%, #d5cfc5 100%)" }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[6, 10, 4]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-4, 6, -3]} intensity={0.25} color="#b0c4de" />
          <hemisphereLight intensity={0.3} color="#87ceeb" groundColor="#8b7355" />

          <PergolaModel width={w} depth={d} height={h} color={color} louversOpen={louversOpen} />

          <ContactShadows position={[0, -h / 2 - 0.05, 0]} opacity={0.4} scale={maxDim * 5} blur={2.5} far={maxDim * 3} />

          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.15}
            minDistance={maxDim * 0.6}
            maxDistance={maxDim * 4}
          />

          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* dimension badge */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
        {(breite / 1000).toFixed(1)}m × {(laenge / 1000).toFixed(1)}m × {(hoehe / 1000).toFixed(1)}m
      </div>

      {/* 3D interaction hint */}
      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs text-zinc-600 backdrop-blur">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
        3D drehen
      </div>
    </div>
  );
};
