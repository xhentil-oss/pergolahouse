import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Html, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── color map from label to hex ── */
const colorMap: Record<string, string> = {
  "White 9016 T": "#E8E4DF",
  "Ivory 1015 T": "#D9C87A",
  "Gray 7046 T": "#8E9196",
  "Gray 7016 T": "#2E3234",
  "Black 9005 T": "#0A0A0D",
};

/* ── Dimension line with tick marks ── */
const DimensionLine = ({ from, to, label, tickDir }: {
  from: [number, number, number];
  to: [number, number, number];
  label: string;
  tickDir: [number, number, number];
}) => {
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ];
  const t = 0.06;
  const [tx, ty, tz] = tickDir;
  const tickA: [number, number, number][] = [[from[0]-tx*t, from[1]-ty*t, from[2]-tz*t], [from[0]+tx*t, from[1]+ty*t, from[2]+tz*t]];
  const tickB: [number, number, number][] = [[to[0]-tx*t, to[1]-ty*t, to[2]-tz*t], [to[0]+tx*t, to[1]+ty*t, to[2]+tz*t]];
  return (
    <>
      <Line points={[from, to]} color="#555" lineWidth={1.2} />
      <Line points={tickA} color="#555" lineWidth={1.2} />
      <Line points={tickB} color="#555" lineWidth={1.2} />
      <Html position={mid} center distanceFactor={9}>
        <div style={{ background: 'rgba(255,255,255,0.93)', color: '#222', padding: '2px 7px', borderRadius: 3, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', pointerEvents: 'none', border: '1px solid rgba(0,0,0,0.13)', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>
          {label}
        </div>
      </Html>
    </>
  );
};

interface PergolaModelProps {
  width: number;
  depth: number;
  height: number;
  color: string;
}

/* ── Individual Louver Blade ── */
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

const PergolaModel = ({ width, depth, height, color, louversOpen, showDimensions }: PergolaModelProps & { louversOpen: boolean; showDimensions: boolean }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const hex = colorMap[color] ?? color;

  useFrame((_, delta) => {
    if (groupRef.current && !showDimensions) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  /* ── Dimensions ── */
  const postW = 0.12;
  const postD = 0.12;
  const mainBeamH = 0.18;
  const mainBeamW = 0.10;
  const rafterH = 0.10;
  const rafterW = 0.05;
  const louverCount = Math.max(6, Math.round(width / 0.18));
  const innerW = width - mainBeamW * 2;
  const bladeW = innerW / louverCount - 0.012; // ~12mm gap between blades — shows parallel lines when closed
  const bladeD = depth - mainBeamW * 2;

  const halfW = width / 2;
  const halfD = depth / 2;

  /* ── Materials ── */
  const mainMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.28, metalness: 0.75 }),
    [hex]
  );
/* ── Post positions ── */
  const posts: [number, number, number][] = useMemo(() => [
    [-halfW + postW / 2, height / 2, -halfD + postD / 2],
    [halfW - postW / 2, height / 2, -halfD + postD / 2],
    [halfW - postW / 2, height / 2, halfD - postD / 2],
    [-halfW + postW / 2, height / 2, halfD - postD / 2],
  ], [halfW, halfD, height]);

  /* ── Louver positions — edge-to-edge tiling ── */
  const louvers = useMemo(() => {
    const items: number[] = [];
    const lInnerW = width - mainBeamW * 2;
    const spacing = lInnerW / louverCount;
    const startX = -halfW + mainBeamW;
    for (let i = 0; i < louverCount; i++) {
      items.push(startX + spacing / 2 + i * spacing);
    }
    return items;
  }, [width, louverCount, halfW]);

  /* ── Rafter positions ── */
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

  const roofY = height;
  const beamCenterY = roofY - mainBeamH / 2;

  return (
    <group ref={groupRef} position={[0, -height / 2, 0]}>

      {/* ── 4 Vertical Posts ── */}
      {posts.map((pos, i) => (
        <RoundedBox key={`post-${i}`} args={[postW, height, postD]} radius={0.015} smoothness={4} position={pos} material={mainMat} castShadow />
      ))}


      {/* ── Main Perimeter Beams (front & back) ── */}
      <RoundedBox args={[width, mainBeamH, mainBeamW]} radius={0.01} smoothness={4} position={[0, beamCenterY, -halfD + mainBeamW / 2]} material={mainMat} castShadow />
      <RoundedBox args={[width, mainBeamH, mainBeamW]} radius={0.01} smoothness={4} position={[0, beamCenterY, halfD - mainBeamW / 2]} material={mainMat} castShadow />

      {/* ── Main Perimeter Beams (left & right) ── */}
      <RoundedBox args={[mainBeamW, mainBeamH, depth - mainBeamW * 2]} radius={0.01} smoothness={4} position={[-halfW + mainBeamW / 2, beamCenterY, 0]} material={mainMat} castShadow />
      <RoundedBox args={[mainBeamW, mainBeamH, depth - mainBeamW * 2]} radius={0.01} smoothness={4} position={[halfW - mainBeamW / 2, beamCenterY, 0]} material={mainMat} castShadow />

      {/* ── Louver Blades ── */}
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

      {/* ── Dimension lines ── */}
      {showDimensions && (
        <>
          {/* Länge — right side of roof, front to back (depth direction) */}
          <DimensionLine
            from={[halfW + 0.18, height + 0.04, -halfD]}
            to={[halfW + 0.18, height + 0.04, halfD]}
            label={`${Math.round(width * 1000)} mm`}
            tickDir={[1, 0, 0]}
          />
          {/* Höhe — front-left post, vertical */}
          <DimensionLine
            from={[-halfW - 0.2, 0, -halfD]}
            to={[-halfW - 0.2, height, -halfD]}
            label={`${Math.round(height * 1000)} mm`}
            tickDir={[1, 0, 0]}
          />
          {/* Breite — below front edge, left to right (width direction) */}
          <DimensionLine
            from={[-halfW, -0.12, -halfD - 0.18]}
            to={[halfW, -0.12, -halfD - 0.18]}
            label={`${Math.round(depth * 1000)} mm`}
            tickDir={[0, 0, 1]}
          />
        </>
      )}
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

/* ── Toggle switch ── */
const ToggleSwitch = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <button onClick={onChange} className="flex items-center gap-2 cursor-pointer select-none">
    <div className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${checked ? "bg-[#344148]" : "bg-zinc-300"}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
    </div>
    <span className="text-xs text-zinc-600 font-medium">{label}</span>
  </button>
);

/* ── exported component ── */
interface Pergola3DViewerProps {
  breite: number;    // mm
  laenge: number;    // mm
  hoehe: number;     // mm
  color: string;
  louversOpen?: boolean;
}

export const Pergola3DViewer = ({ breite, laenge, hoehe, color }: Pergola3DViewerProps) => {
  const [louversOpen, setLouversOpen] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);

  const w = breite / 1000;
  const d = laenge / 1000;
  const h = hoehe / 1000;

  const maxDim = Math.max(w, d, h);
  const camDist = maxDim * 1.8;

  return (
    <div className="relative h-full w-full" style={{ minHeight: 360 }}>
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [camDist * 0.6, camDist * 1.5, camDist * 0.6], fov: 40, near: 0.1, far: 200 }}
          style={{ background: "#e8e8e8", position: "absolute", inset: 0, width: "100%", height: "calc(100% - 44px)" }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[6, 10, 4]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-4, 6, -3]} intensity={0.5} color="#ffffff" />
          <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#e0e0e0" />

          <PergolaModel width={w} depth={d} height={h} color={color} louversOpen={louversOpen} showDimensions={showDimensions} />

          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI * 0.85}
            minDistance={maxDim * 0.6}
            maxDistance={maxDim * 4}
          />

          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* dimension badge */}
      <div className="pointer-events-none absolute left-3 rounded-lg bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur" style={{ bottom: 52 }}>
        {(breite / 1000).toFixed(1)}m × {(laenge / 1000).toFixed(1)}m × {(hoehe / 1000).toFixed(1)}m
      </div>

      {/* 3D interaction hint */}
      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs text-zinc-600 backdrop-blur">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
        3D drehen
      </div>

      {/* Toggle buttons row */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-8 bg-white border-t border-zinc-200" style={{ height: 44 }}>
        <ToggleSwitch checked={louversOpen} onChange={() => setLouversOpen(v => !v)} label="Lamellen öffnen" />
        <ToggleSwitch checked={showDimensions} onChange={() => setShowDimensions(v => !v)} label="Maße anzeigen" />
      </div>
    </div>
  );
};
