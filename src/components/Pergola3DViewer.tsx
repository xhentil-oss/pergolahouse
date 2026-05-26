import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Html, Line, Sky } from "@react-three/drei";
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
  louversOpen: boolean;
  louversRetracted: boolean;
  showDimensions: boolean;
  leftPanel: string;
  rightPanel: string;
  frontPanel: string;
  backPanel: string;
  faltOpen: boolean;
  schOpen: boolean;
  zipDown: boolean;
}

/* ── Individual Louver Blade ── */
const LouverBlade = ({ position, bladeW, bladeD, material, targetAngle, targetX, delay, speed }: {
  position: [number, number, number];
  bladeW: number;
  bladeD: number;
  material: THREE.MeshStandardMaterial;
  targetAngle: number;
  targetX: number;
  delay: number;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const curAngle = useRef(0);
  const curX = useRef(position[0]);
  const timer = useRef(0);
  const prevRef = useRef({ angle: targetAngle, x: targetX });

  useFrame((_, delta) => {
    if (prevRef.current.angle !== targetAngle || prevRef.current.x !== targetX) {
      timer.current = 0;
      prevRef.current = { angle: targetAngle, x: targetX };
    }
    timer.current += delta;
    if (timer.current < delay) return;
    const lf = Math.min(delta * speed, 1);
    curAngle.current += (targetAngle - curAngle.current) * lf;
    curX.current += (targetX - curX.current) * lf;
    if (meshRef.current) {
      meshRef.current.rotation.z = curAngle.current;
      meshRef.current.position.x = curX.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position} material={material} castShadow>
      <boxGeometry args={[bladeW, 0.008, bladeD]} />
    </mesh>
  );
};

const PergolaModel = ({ width, depth, height, color, louversOpen, louversRetracted, showDimensions, leftPanel, rightPanel, frontPanel, backPanel, faltOpen, schOpen, zipDown }: PergolaModelProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const hex = colorMap[color] ?? color;

  /* ── Structural dimensions ── */
  const postW     = 0.12;
  const postD     = 0.12;
  const mainBeamH = 0.18;
  const mainBeamW = 0.10;
  const louverCount = Math.max(6, Math.round(width / 0.18));
  const innerW    = width - mainBeamW * 2;
  const bladeW    = innerW / louverCount - 0.012;
  const bladeD    = depth - mainBeamW * 2;
  const halfW     = width / 2;
  const halfD     = depth / 2;

  /* ── Shared panel constants ── */
  const glassTh   = 0.010;
  const trackH    = 0.060;
  const trackD    = 0.060;

  /* ── Faltglas constants ── */
  const faltCount  = 4;
  const faltFrameW = 0.042;
  const handleThk  = 0.022;
  const handleH    = height * 0.32;
  const fPW        = (width - postW * 2) / faltCount;
  const sPW        = (depth - postD * 2) / faltCount;

  /* ── Schiebeglas constants ── */
  const schCount     = 3;
  const schHandleH   = height * 0.35;
  const schHandleThk = 0.026;
  const frontInnerW  = width - postW * 2;
  const schPanelW    = frontInnerW / schCount;
  const sSPW         = (depth - postD * 2) / schCount;

  // Front panels: 3 layers at slightly different Z offsets (stacked depth)
  const schTracks_front = [-halfD + 0.005, -halfD + 0.022, -halfD + 0.038] as const;
  const schTracks_back  = [ halfD - 0.005,  halfD - 0.022,  halfD - 0.038] as const;
  const schSideTracks_L = [-halfW + 0.005, -halfW + 0.022, -halfW + 0.038] as const;
  const schSideTracks_R = [ halfW - 0.005,  halfW - 0.022,  halfW - 0.038] as const;

  // Front/Back closed X positions (evenly spread)
  const schClosedXs = [
    -halfW + postW + schPanelW * 0.5,
    -halfW + postW + schPanelW * 1.5,
    -halfW + postW + schPanelW * 2.5,
  ];
  // Open: all stack to left corner
  const schOpenXs = [
    -halfW + postW + schPanelW * 0.5,
    -halfW + postW + schPanelW * 0.5,
    -halfW + postW + schPanelW * 0.5,
  ];
  // Side closed Z positions (evenly spread)
  const schSideClosedZs = [
    -halfD + postD + sSPW * 0.5,
    -halfD + postD + sSPW * 1.5,
    -halfD + postD + sSPW * 2.5,
  ];
  // Side open: all stack to back corner
  const schSideOpenZs = [
    halfD - postD - sSPW * 0.5,
    halfD - postD - sSPW * 0.5,
    halfD - postD - sSPW * 0.5,
  ];

  /* ── Faltglas animation refs ── */
  const foldCurrentRef = useRef(faltOpen ? 1.30 : 0.03);
  const frontPanelRefs = useRef<(THREE.Group | null)[]>([]);
  const backPanelRefs  = useRef<(THREE.Group | null)[]>([]);
  const leftPanelRefs  = useRef<(THREE.Group | null)[]>([]);
  const rightPanelRefs = useRef<(THREE.Group | null)[]>([]);

  /* ── Schiebeglas animation refs ── */
  const frontSchRefs = useRef<(THREE.Group | null)[]>([]);
  const backSchRefs  = useRef<(THREE.Group | null)[]>([]);
  const leftSchRefs  = useRef<(THREE.Group | null)[]>([]);
  const rightSchRefs = useRef<(THREE.Group | null)[]>([]);

  /* ── Zip screen animation refs ── */
  const zipCurrentRef   = useRef(1);
  const zipFrontRef     = useRef<THREE.Mesh | null>(null);
  const zipFrontRailRef = useRef<THREE.Mesh | null>(null);
  const zipBackRef      = useRef<THREE.Mesh | null>(null);
  const zipBackRailRef  = useRef<THREE.Mesh | null>(null);
  const zipLeftRef      = useRef<THREE.Mesh | null>(null);
  const zipLeftRailRef  = useRef<THREE.Mesh | null>(null);
  const zipRightRef     = useRef<THREE.Mesh | null>(null);
  const zipRightRailRef = useRef<THREE.Mesh | null>(null);

  /* ── Materials ── */
  const mainMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.55, metalness: 0.1 }),
    [hex]
  );
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ddeeff", transparent: true, opacity: 0.18, roughness: 0.0, metalness: 0.15, side: THREE.DoubleSide }), []);
  const zipFabricMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3a3a3a", transparent: true, opacity: 0.90, roughness: 0.96, metalness: 0.02, side: THREE.DoubleSide }), []);
  const panelT   = 0.012;

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

  const roofY       = height;
  const beamCenterY = roofY - mainBeamH / 2;

  const sides4 = [leftPanel, rightPanel, frontPanel, backPanel];
  const hasFaltglas    = sides4.includes("faltglas");
  const hasZip         = sides4.includes("zip");
  const hasSchiebeglas = sides4.includes("schiebeglas");

  /* ── Animation frame ── */
  useFrame((_, delta) => {
    // Faltglas
    if (hasFaltglas) {
      const target = faltOpen ? 1.30 : 0.03;
      foldCurrentRef.current = THREE.MathUtils.lerp(foldCurrentRef.current, target, Math.min(1, delta * 2.2));
      const fold   = foldCurrentRef.current;
      const projW  = fPW * Math.cos(fold);
      const projZ  = sPW * Math.cos(fold);
      const sX     = -halfW + postW;
      const sZ     = -halfD + postD;
      frontPanelRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.position.x = sX + projW * i + projW / 2;
        ref.rotation.y = i % 2 === 0 ? -fold : fold;
      });
      backPanelRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.position.x = sX + projW * i + projW / 2;
        ref.rotation.y = i % 2 === 0 ? fold : -fold;
      });
      leftPanelRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.position.z = sZ + projZ * i + projZ / 2;
        ref.rotation.y = i % 2 === 0 ? -fold : fold;
      });
      rightPanelRefs.current.forEach((ref, i) => {
        if (!ref) return;
        ref.position.z = sZ + projZ * i + projZ / 2;
        ref.rotation.y = i % 2 === 0 ? fold : -fold;
      });
    }

    // Zip screens
    if (hasZip) {
      const zipTarget = zipDown ? 1 : 0;
      zipCurrentRef.current = THREE.MathUtils.lerp(zipCurrentRef.current, zipTarget, Math.min(1, delta * 2.5));
      const zc   = zipCurrentRef.current;
      const sc   = Math.max(0.001, zc);
      const zipH = height - mainBeamH * 0.6;
      const screenCY = zipH - (zipH * sc) / 2;
      const railY    = zipH - zipH * zc;
      if (zipFrontRef.current)     { zipFrontRef.current.scale.y = sc;     zipFrontRef.current.position.y = screenCY; }
      if (zipFrontRailRef.current)   zipFrontRailRef.current.position.y = railY;
      if (zipBackRef.current)      { zipBackRef.current.scale.y = sc;      zipBackRef.current.position.y = screenCY; }
      if (zipBackRailRef.current)    zipBackRailRef.current.position.y = railY;
      if (zipLeftRef.current)      { zipLeftRef.current.scale.y = sc;      zipLeftRef.current.position.y = screenCY; }
      if (zipLeftRailRef.current)    zipLeftRailRef.current.position.y = railY;
      if (zipRightRef.current)     { zipRightRef.current.scale.y = sc;     zipRightRef.current.position.y = screenCY; }
      if (zipRightRailRef.current)   zipRightRailRef.current.position.y = railY;
    }

    // Schiebeglas
    if (hasSchiebeglas) {
      frontSchRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const tx = schOpen ? schOpenXs[i] : schClosedXs[i];
        ref.position.x = THREE.MathUtils.lerp(ref.position.x, tx, Math.min(1, delta * 2.8));
      });
      backSchRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const tx = schOpen ? schOpenXs[i] : schClosedXs[i];
        ref.position.x = THREE.MathUtils.lerp(ref.position.x, tx, Math.min(1, delta * 2.8));
      });
      [leftSchRefs, rightSchRefs].forEach((refsObj) => {
        refsObj.current.forEach((ref, i) => {
          if (!ref) return;
          const tz = schOpen ? schSideOpenZs[i] : schSideClosedZs[i];
          ref.position.z = THREE.MathUtils.lerp(ref.position.z, tz, Math.min(1, delta * 2.8));
        });
      });
    }
  });

  /* ── Schiebeglas panel builder ── */
  const buildSchPanel = (
    panelW: number,
    pH: number,
    pCy: number,
    isHorizontal: boolean, // true = front/back (X-wide), false = left/right (Z-wide)
    showHandle: boolean,
    handleSide: "right" | "left" | "front" | "back"
  ) => {
    const divThk  = 0.008;
    const divCount = 2;
    return (
      <>
        <mesh position={[0, pCy, 0]}>
          <boxGeometry args={
            isHorizontal
              ? [panelW + 0.004, pH, glassTh * 1.5]
              : [glassTh * 1.5, pH, panelW + 0.004]
          } />
          <meshStandardMaterial color="#d8eef6" transparent opacity={0.19}
            roughness={0.01} metalness={0.08} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        {Array.from({ length: divCount }, (_, d) => {
          const frac = (panelW / (divCount + 1)) * (d + 1) - panelW / 2;
          return isHorizontal ? (
            <mesh key={d} position={[frac, pCy, 0]}>
              <boxGeometry args={[divThk, pH, glassTh * 2.8]} />
              <meshStandardMaterial color="#b8ccd4" transparent opacity={0.60} roughness={0.15} metalness={0.35} />
            </mesh>
          ) : (
            <mesh key={d} position={[0, pCy, frac]}>
              <boxGeometry args={[glassTh * 2.8, pH, divThk]} />
              <meshStandardMaterial color="#b8ccd4" transparent opacity={0.60} roughness={0.15} metalness={0.35} />
            </mesh>
          );
        })}
        {showHandle && handleSide === "right" && (
          <RoundedBox args={[schHandleThk * 0.8, schHandleH, schHandleThk * 0.45]} radius={0.005} smoothness={4}
            position={[panelW / 2 - schHandleThk * 1.4, pCy, -schHandleThk * 0.22]}
            material={mainMat} castShadow />
        )}
        {showHandle && handleSide === "left" && (
          <RoundedBox args={[schHandleThk * 0.8, schHandleH, schHandleThk * 0.45]} radius={0.005} smoothness={4}
            position={[-panelW / 2 + schHandleThk * 1.4, pCy, -schHandleThk * 0.22]}
            material={mainMat} castShadow />
        )}
        {showHandle && handleSide === "front" && (
          <RoundedBox args={[schHandleThk * 0.45, schHandleH, schHandleThk * 0.8]} radius={0.005} smoothness={4}
            position={[schHandleThk * 0.3, pCy, -panelW / 2 + schHandleThk * 1.4]}
            material={mainMat} castShadow />
        )}
        {showHandle && handleSide === "back" && (
          <RoundedBox args={[schHandleThk * 0.45, schHandleH, schHandleThk * 0.8]} radius={0.005} smoothness={4}
            position={[-schHandleThk * 0.3, pCy, -panelW / 2 + schHandleThk * 1.4]}
            material={mainMat} castShadow />
        )}
      </>
    );
  };

  const schPH  = height - trackH;
  const schPCy = trackH + schPH / 2;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

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
      {louvers.map((x, i) => {
        const stackX   = -halfW + mainBeamW + bladeW / 2 + i * 0.006;
        const txX      = louversRetracted ? stackX : x;
        const txAngle  = louversRetracted ? 0 : (louversOpen ? Math.PI / 2.5 : 0);
        const delay    = louversRetracted ? (louverCount - 1 - i) * 0.20 : i * 0.20;
        return (
          <LouverBlade key={`louver-${i}`}
            position={[x, roofY + 0.004, 0]}
            bladeW={bladeW} bladeD={bladeD} material={mainMat}
            targetAngle={txAngle} targetX={txX} delay={delay} speed={0.45}
          />
        );
      })}

      {/* ── Static side panels (guillotine) — per side ── */}
      {(() => {
        const mW      = 0.038;
        const innerD  = depth - postD * 2;
        const innerWp = width - postW * 2;
        const midY    = height / 2;
        const glassY  = height / 2;
        return (
          <>
            {leftPanel === "guillotine" && (
              <>
                <mesh position={[-halfW + panelT / 2, glassY, 0]} material={glassMat}><boxGeometry args={[panelT, height, innerD]} /></mesh>
                <mesh position={[-halfW + panelT / 2, glassY, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, height, mW]} /></mesh>
                <mesh position={[-halfW + panelT / 2, midY, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, mW, innerD]} /></mesh>
                <mesh position={[-halfW + panelT / 2, mW / 2, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, mW, innerD]} /></mesh>
              </>
            )}
            {rightPanel === "guillotine" && (
              <>
                <mesh position={[halfW - panelT / 2, glassY, 0]} material={glassMat}><boxGeometry args={[panelT, height, innerD]} /></mesh>
                <mesh position={[halfW - panelT / 2, glassY, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, height, mW]} /></mesh>
                <mesh position={[halfW - panelT / 2, midY, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, mW, innerD]} /></mesh>
                <mesh position={[halfW - panelT / 2, mW / 2, 0]} material={mainMat}><boxGeometry args={[panelT + 0.01, mW, innerD]} /></mesh>
              </>
            )}
            {frontPanel === "guillotine" && (
              <>
                <mesh position={[0, glassY, -halfD + panelT / 2]} material={glassMat}><boxGeometry args={[innerWp, height, panelT]} /></mesh>
                <mesh position={[0, glassY, -halfD + panelT / 2]} material={mainMat}><boxGeometry args={[mW, height, panelT + 0.01]} /></mesh>
                <mesh position={[0, midY, -halfD + panelT / 2]} material={mainMat}><boxGeometry args={[innerWp, mW, panelT + 0.01]} /></mesh>
                <mesh position={[0, mW / 2, -halfD + panelT / 2]} material={mainMat}><boxGeometry args={[innerWp, mW, panelT + 0.01]} /></mesh>
              </>
            )}
            {backPanel === "guillotine" && (
              <>
                <mesh position={[0, glassY, halfD - panelT / 2]} material={glassMat}><boxGeometry args={[innerWp, height, panelT]} /></mesh>
                <mesh position={[0, glassY, halfD - panelT / 2]} material={mainMat}><boxGeometry args={[mW, height, panelT + 0.01]} /></mesh>
                <mesh position={[0, midY, halfD - panelT / 2]} material={mainMat}><boxGeometry args={[innerWp, mW, panelT + 0.01]} /></mesh>
                <mesh position={[0, mW / 2, halfD - panelT / 2]} material={mainMat}><boxGeometry args={[innerWp, mW, panelT + 0.01]} /></mesh>
              </>
            )}
          </>
        );
      })()}

      {/* ── Faltglas animated panels — per side ── */}
      {hasFaltglas && (() => {
        const fold0       = foldCurrentRef.current;
        const projW0      = fPW * Math.cos(fold0);
        const projZ0      = sPW * Math.cos(fold0);
        const stackStartX = -halfW + postW;
        const stackStartZ = -halfD + postD;
        const panH        = height;
        return (
          <>
            {/* Front — only if frontPanel === faltglas */}
            {frontPanel === "faltglas" && Array.from({ length: faltCount }, (_, i) => {
              const pcx0  = stackStartX + projW0 * i + projW0 / 2;
              const hSide = i % 2 === 0 ? 1 : -1;
              const hx    = hSide * (fPW / 2 - faltFrameW - handleThk * 1.2);
              return (
                <group key={i} ref={el => { frontPanelRefs.current[i] = el; }}
                  position={[pcx0, 0, -halfD]} rotation={[0, i % 2 === 0 ? -fold0 : fold0, 0]}>
                  <mesh position={[0, panH / 2, 0]}>
                    <boxGeometry args={[fPW - faltFrameW * 2, panH - faltFrameW * 2, glassTh * 2]} />
                    <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32} roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                  </mesh>
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[-fPW / 2 + faltFrameW / 2, panH / 2, 0]} material={mainMat} castShadow />
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[fPW / 2 - faltFrameW / 2, panH / 2, 0]} material={mainMat} castShadow />
                  <RoundedBox args={[handleThk, handleH, handleThk]} radius={0.004} smoothness={4} position={[hx, panH * 0.5, -handleThk * 0.8]} material={mainMat} castShadow />
                </group>
              );
            })}
            {/* Back — only if backPanel === faltglas */}
            {backPanel === "faltglas" && Array.from({ length: faltCount }, (_, i) => {
              const pcx0  = stackStartX + projW0 * i + projW0 / 2;
              const hSide = i % 2 === 0 ? 1 : -1;
              const hx    = hSide * (fPW / 2 - faltFrameW - handleThk * 1.2);
              return (
                <group key={i} ref={el => { backPanelRefs.current[i] = el; }}
                  position={[pcx0, 0, halfD]} rotation={[0, i % 2 === 0 ? fold0 : -fold0, 0]}>
                  <mesh position={[0, panH / 2, 0]}>
                    <boxGeometry args={[fPW - faltFrameW * 2, panH - faltFrameW * 2, glassTh * 2]} />
                    <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32} roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                  </mesh>
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[-fPW / 2 + faltFrameW / 2, panH / 2, 0]} material={mainMat} castShadow />
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[fPW / 2 - faltFrameW / 2, panH / 2, 0]} material={mainMat} castShadow />
                  <RoundedBox args={[handleThk, handleH, handleThk]} radius={0.004} smoothness={4} position={[hx, panH * 0.5, handleThk * 0.8]} material={mainMat} castShadow />
                </group>
              );
            })}
            {/* Left — only if leftPanel === faltglas */}
            {leftPanel === "faltglas" && Array.from({ length: faltCount }, (_, i) => {
              const pcz0    = stackStartZ + projZ0 * i + projZ0 / 2;
              const hSide   = i % 2 === 0 ? 1 : -1;
              const handleZ = hSide * (sPW / 2 - faltFrameW - handleThk * 1.2);
              return (
                <group key={i} ref={el => { leftPanelRefs.current[i] = el; }}
                  position={[-halfW, 0, pcz0]} rotation={[0, i % 2 === 0 ? -fold0 : fold0, 0]}>
                  <mesh position={[0, panH / 2, 0]}>
                    <boxGeometry args={[glassTh * 2, panH - faltFrameW * 2, sPW - faltFrameW * 2]} />
                    <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32} roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                  </mesh>
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[0, panH / 2, -sPW / 2 + faltFrameW / 2]} material={mainMat} castShadow />
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[0, panH / 2, sPW / 2 - faltFrameW / 2]} material={mainMat} castShadow />
                  <RoundedBox args={[handleThk, handleH * 0.75, handleThk]} radius={0.004} smoothness={4} position={[-handleThk * 0.8, panH * 0.5, handleZ]} material={mainMat} castShadow />
                </group>
              );
            })}
            {/* Right — only if rightPanel === faltglas */}
            {rightPanel === "faltglas" && Array.from({ length: faltCount }, (_, i) => {
              const pcz0    = stackStartZ + projZ0 * i + projZ0 / 2;
              const hSide   = i % 2 === 0 ? 1 : -1;
              const handleZ = hSide * (sPW / 2 - faltFrameW - handleThk * 1.2);
              return (
                <group key={i} ref={el => { rightPanelRefs.current[i] = el; }}
                  position={[halfW, 0, pcz0]} rotation={[0, i % 2 === 0 ? fold0 : -fold0, 0]}>
                  <mesh position={[0, panH / 2, 0]}>
                    <boxGeometry args={[glassTh * 2, panH - faltFrameW * 2, sPW - faltFrameW * 2]} />
                    <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32} roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                  </mesh>
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[0, panH / 2, -sPW / 2 + faltFrameW / 2]} material={mainMat} castShadow />
                  <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4} position={[0, panH / 2, sPW / 2 - faltFrameW / 2]} material={mainMat} castShadow />
                  <RoundedBox args={[handleThk, handleH * 0.75, handleThk]} radius={0.004} smoothness={4} position={[handleThk * 0.8, panH * 0.5, handleZ]} material={mainMat} castShadow />
                </group>
              );
            })}
            {/* Bottom tracks — per side */}
            {frontPanel === "faltglas" && <RoundedBox args={[width - postW * 2, trackH * 0.7, trackD * 0.7]} radius={0.006} smoothness={4} position={[0, trackH * 0.35, -halfD + trackD * 0.35]} material={mainMat} castShadow />}
            {backPanel === "faltglas" && <RoundedBox args={[width - postW * 2, trackH * 0.7, trackD * 0.7]} radius={0.006} smoothness={4} position={[0, trackH * 0.35, halfD - trackD * 0.35]} material={mainMat} castShadow />}
            {leftPanel === "faltglas" && <RoundedBox args={[trackD * 0.7, trackH * 0.7, depth - postD * 2]} radius={0.007} smoothness={4} position={[-halfW + trackD * 0.35, trackH * 0.35, 0]} material={mainMat} castShadow />}
            {rightPanel === "faltglas" && <RoundedBox args={[trackD * 0.7, trackH * 0.7, depth - postD * 2]} radius={0.007} smoothness={4} position={[halfW - trackD * 0.35, trackH * 0.35, 0]} material={mainMat} castShadow />}
            {/* Corner feet */}
            <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
            <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
            <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
            <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
          </>
        );
      })()}

      {/* ── Schiebeglas animated sliding panels — per side ── */}
      {hasSchiebeglas && (
        <>
          {frontPanel === "schiebeglas" && Array.from({ length: schCount }, (_, i) => (
            <group key={i} ref={el => { frontSchRefs.current[i] = el; }}
              position={[schClosedXs[i], 0, schTracks_front[i]]}>
              {buildSchPanel(schPanelW, schPH, schPCy, true, i === 2, "right")}
            </group>
          ))}
          {backPanel === "schiebeglas" && Array.from({ length: schCount }, (_, i) => (
            <group key={i} ref={el => { backSchRefs.current[i] = el; }}
              position={[schClosedXs[i], 0, schTracks_back[i]]}>
              {buildSchPanel(schPanelW, schPH, schPCy, true, i === 2, "left")}
            </group>
          ))}
          {leftPanel === "schiebeglas" && Array.from({ length: schCount }, (_, i) => (
            <group key={i} ref={el => { leftSchRefs.current[i] = el; }}
              position={[schSideTracks_L[i], 0, schSideClosedZs[i]]}>
              {buildSchPanel(sSPW, schPH, schPCy, false, i === 0, "front")}
            </group>
          ))}
          {rightPanel === "schiebeglas" && Array.from({ length: schCount }, (_, i) => (
            <group key={i} ref={el => { rightSchRefs.current[i] = el; }}
              position={[schSideTracks_R[i], 0, schSideClosedZs[i]]}>
              {buildSchPanel(sSPW, schPH, schPCy, false, i === 0, "back")}
            </group>
          ))}
          {/* Bottom floor tracks — per side */}
          {frontPanel === "schiebeglas" && <RoundedBox args={[width - postW * 2, trackH * 0.5, trackH * 0.65]} radius={0.005} smoothness={4} position={[0, trackH * 0.25, -halfD + trackH * 0.33]} material={mainMat} castShadow />}
          {backPanel === "schiebeglas" && <RoundedBox args={[width - postW * 2, trackH * 0.5, trackH * 0.65]} radius={0.005} smoothness={4} position={[0, trackH * 0.25, halfD - trackH * 0.33]} material={mainMat} castShadow />}
          {leftPanel === "schiebeglas" && <RoundedBox args={[trackH * 0.65, trackH * 0.5, depth - postD * 2]} radius={0.005} smoothness={4} position={[-halfW + trackH * 0.33, trackH * 0.25, 0]} material={mainMat} castShadow />}
          {rightPanel === "schiebeglas" && <RoundedBox args={[trackH * 0.65, trackH * 0.5, depth - postD * 2]} radius={0.005} smoothness={4} position={[halfW - trackH * 0.33, trackH * 0.25, 0]} material={mainMat} castShadow />}
          {/* Corner feet */}
          <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
          <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
          <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
          <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
        </>
      )}

      {/* ── Zip screens animated roll-down — per side ── */}
      {hasZip && (() => {
        const zipH       = height - mainBeamH * 0.6;   // stops just below top beam, same as Wintergarten
        const hsH        = mainBeamH * 1.4;             // roller housing height
        const hsY        = zipH - hsH / 2;              // housing center — top flush with zipH
        const chW        = 0.032;                       // guide channel size
        const railH      = 0.032;                       // bottom rail height
        const floorRailH = trackH * 0.7;
        const innerWp    = width - postW * 2;
        const innerD     = depth - postD * 2;

        return (
          <>
            {/* ── Front ── */}
            {frontPanel === "zip" && (<>
              <RoundedBox args={[innerWp + chW * 2, hsH, mainBeamW * 1.1]} radius={0.010} smoothness={4} position={[0, hsY, -halfD + mainBeamW * 0.55]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[-halfW + postW + chW * 0.5, zipH / 2, -halfD + chW * 0.5]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[halfW - postW - chW * 0.5, zipH / 2, -halfD + chW * 0.5]} material={mainMat} castShadow />
              <mesh ref={el => { zipFrontRef.current = el; }} position={[0, zipH / 2, -halfD + glassTh * 2]} material={zipFabricMat}><boxGeometry args={[innerWp - chW * 2 - 0.008, zipH, glassTh * 2]} /></mesh>
              <mesh ref={el => { zipFrontRailRef.current = el; }} position={[0, 0, -halfD + glassTh * 2]}><boxGeometry args={[innerWp - chW * 2, railH, railH]} /><meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} /></mesh>
              <RoundedBox args={[innerWp, floorRailH, floorRailH]} radius={0.005} smoothness={4} position={[0, floorRailH / 2, -halfD + floorRailH / 2]} material={mainMat} castShadow />
              <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
              <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, -halfD + postD / 2]} material={mainMat} castShadow />
            </>)}

            {/* ── Back ── */}
            {backPanel === "zip" && (<>
              <RoundedBox args={[innerWp + chW * 2, hsH, mainBeamW * 1.1]} radius={0.010} smoothness={4} position={[0, hsY, halfD - mainBeamW * 0.55]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[-halfW + postW + chW * 0.5, zipH / 2, halfD - chW * 0.5]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[halfW - postW - chW * 0.5, zipH / 2, halfD - chW * 0.5]} material={mainMat} castShadow />
              <mesh ref={el => { zipBackRef.current = el; }} position={[0, zipH / 2, halfD - glassTh * 2]} material={zipFabricMat}><boxGeometry args={[innerWp - chW * 2 - 0.008, zipH, glassTh * 2]} /></mesh>
              <mesh ref={el => { zipBackRailRef.current = el; }} position={[0, 0, halfD - glassTh * 2]}><boxGeometry args={[innerWp - chW * 2, railH, railH]} /><meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} /></mesh>
              <RoundedBox args={[innerWp, floorRailH, floorRailH]} radius={0.005} smoothness={4} position={[0, floorRailH / 2, halfD - floorRailH / 2]} material={mainMat} castShadow />
              <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
              <RoundedBox args={[postW + 0.02, trackH, postD + 0.02]} radius={0.010} smoothness={4} position={[halfW - postW / 2, trackH / 2, halfD - postD / 2]} material={mainMat} castShadow />
            </>)}

            {/* ── Left ── */}
            {leftPanel === "zip" && (<>
              <RoundedBox args={[mainBeamW * 1.1, hsH, innerD + chW * 2]} radius={0.010} smoothness={4} position={[-halfW + mainBeamW * 0.55, hsY, 0]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[-halfW + chW * 0.5, zipH / 2, -halfD + postD + chW * 0.5]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[-halfW + chW * 0.5, zipH / 2, halfD - postD - chW * 0.5]} material={mainMat} castShadow />
              <mesh ref={el => { zipLeftRef.current = el; }} position={[-halfW + glassTh * 2, zipH / 2, 0]} material={zipFabricMat}><boxGeometry args={[glassTh * 2, zipH, innerD - chW * 2 - 0.008]} /></mesh>
              <mesh ref={el => { zipLeftRailRef.current = el; }} position={[-halfW + glassTh * 2, 0, 0]}><boxGeometry args={[railH, railH, innerD - chW * 2]} /><meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} /></mesh>
              <RoundedBox args={[floorRailH, floorRailH, innerD]} radius={0.005} smoothness={4} position={[-halfW + floorRailH / 2, floorRailH / 2, 0]} material={mainMat} castShadow />
            </>)}

            {/* ── Right ── */}
            {rightPanel === "zip" && (<>
              <RoundedBox args={[mainBeamW * 1.1, hsH, innerD + chW * 2]} radius={0.010} smoothness={4} position={[halfW - mainBeamW * 0.55, hsY, 0]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[halfW - chW * 0.5, zipH / 2, -halfD + postD + chW * 0.5]} material={mainMat} castShadow />
              <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4} position={[halfW - chW * 0.5, zipH / 2, halfD - postD - chW * 0.5]} material={mainMat} castShadow />
              <mesh ref={el => { zipRightRef.current = el; }} position={[halfW - glassTh * 2, zipH / 2, 0]} material={zipFabricMat}><boxGeometry args={[glassTh * 2, zipH, innerD - chW * 2 - 0.008]} /></mesh>
              <mesh ref={el => { zipRightRailRef.current = el; }} position={[halfW - glassTh * 2, 0, 0]}><boxGeometry args={[railH, railH, innerD - chW * 2]} /><meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} /></mesh>
              <RoundedBox args={[floorRailH, floorRailH, innerD]} radius={0.005} smoothness={4} position={[halfW - floorRailH / 2, floorRailH / 2, 0]} material={mainMat} castShadow />
            </>)}
          </>
        );
      })()}

      {/* ── Dimension lines ── */}
      {showDimensions && (
        <>
          <DimensionLine
            from={[-halfW, height + 0.18, halfD + 0.15]}
            to={[halfW, height + 0.18, halfD + 0.15]}
            label={`${Math.round(width * 1000)} mm`}
            tickDir={[0, 0, 1]}
          />
          <DimensionLine
            from={[halfW + 0.18, height + 0.04, -halfD]}
            to={[halfW + 0.18, height + 0.04, halfD]}
            label={`${Math.round(depth * 1000)} mm`}
            tickDir={[1, 0, 0]}
          />
          <DimensionLine
            from={[-halfW - 0.2, 0, -halfD]}
            to={[-halfW - 0.2, height, -halfD]}
            label={`${Math.round(height * 1000)} mm`}
            tickDir={[1, 0, 0]}
          />
        </>
      )}
    </group>
  );
};

/* ── Backyard scene environment ── */
const BackyardScene = ({ width, depth, height }: { width: number; depth: number; height: number }) => {
  const gs    = Math.max(width, depth) * 14;
  const halfW = width / 2;
  const halfD = depth / 2;
  const tw    = width + 3.2;
  const td    = depth + 5.5;

  /* Helper: small round bush */
  const Bush = ({ x, y = 0, z, r = 0.38, color = "#3a6422" }: { x: number; y?: number; z: number; r?: number; color?: string }) => (
    <group position={[x, y, z]}>
      <mesh position={[0, r * 0.45, 0]} castShadow>
        <cylinderGeometry args={[r * 0.35, r * 0.45, r * 0.5, 7]} />
        <meshStandardMaterial color="#5a4030" roughness={0.97} />
      </mesh>
      <mesh position={[0, r * 0.9, 0]} castShadow>
        <sphereGeometry args={[r, 9, 7]} />
        <meshStandardMaterial color={color} roughness={0.97} />
      </mesh>
    </group>
  );

  /* Helper: tall tree */
  const Tree = ({ x, z, trunkH = 1.6, crownR = 0.9, color = "#2e6020" }: { x: number; z: number; trunkH?: number; crownR?: number; color?: string }) => (
    <group position={[x, 0, z]}>
      <mesh position={[0, trunkH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.10, 0.16, trunkH, 7]} />
        <meshStandardMaterial color="#6b4828" roughness={0.96} />
      </mesh>
      <mesh position={[0, trunkH + crownR * 0.7, 0]} castShadow>
        <sphereGeometry args={[crownR, 10, 8]} />
        <meshStandardMaterial color={color} roughness={0.97} />
      </mesh>
    </group>
  );

  /* Helper: potted plant */
  const Pot = ({ x, z }: { x: number; z: number }) => (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.15, 0.11, 0.42, 8]} />
        <meshStandardMaterial color="#7a5838" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.60, 0]}>
        <sphereGeometry args={[0.28, 8, 6]} />
        <meshStandardMaterial color="#4e8830" roughness={0.96} />
      </mesh>
    </group>
  );

  return (
    <>
      {/* Sky */}
      <Sky distance={450000} sunPosition={[2, 0.22, -1]} turbidity={4} rayleigh={0.5} mieCoefficient={0.004} mieDirectionalG={0.82} />

      {/* Grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <planeGeometry args={[gs, gs]} />
        <meshStandardMaterial color="#4d7e32" roughness={0.96} />
      </mesh>

      {/* Stone terrace */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.6]} receiveShadow>
        <planeGeometry args={[tw, td]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.90} metalness={0.02} />
      </mesh>
      {/* Terrace front border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -halfD - 2.0]}>
        <planeGeometry args={[tw + 0.1, 0.16]} />
        <meshStandardMaterial color="#8e8070" roughness={0.92} />
      </mesh>

      {/* House wall */}
      <mesh position={[0, height * 0.65, halfD + 2.2]} receiveShadow castShadow>
        <boxGeometry args={[width + 5.5, height * 1.38, 0.38]} />
        <meshStandardMaterial color="#e0d6c8" roughness={0.93} />
      </mesh>
      {/* Plinth */}
      <mesh position={[0, 0.18, halfD + 2.02]}>
        <boxGeometry args={[width + 5.7, 0.36, 0.42]} />
        <meshStandardMaterial color="#c4b8a8" roughness={0.95} />
      </mesh>
      {/* Window left */}
      <mesh position={[-width * 0.22, height * 0.62, halfD + 2.03]}>
        <boxGeometry args={[width * 0.26, height * 0.32, 0.04]} />
        <meshStandardMaterial color="#78afc8" transparent opacity={0.52} roughness={0.06} metalness={0.1} />
      </mesh>
      {/* Window right */}
      <mesh position={[width * 0.22, height * 0.62, halfD + 2.03]}>
        <boxGeometry args={[width * 0.26, height * 0.32, 0.04]} />
        <meshStandardMaterial color="#78afc8" transparent opacity={0.52} roughness={0.06} metalness={0.1} />
      </mesh>

      {/* ── Trees — far outside, no overlap with pergola ── */}
      <Tree x={-halfW - 3.5} z={halfD + 1.2} trunkH={1.8} crownR={1.0} color="#2c5a1c" />
      <Tree x={ halfW + 3.5} z={halfD + 0.8} trunkH={2.0} crownR={0.88} color="#326618" />
      <Tree x={-halfW - 4.2} z={-halfD - 1.5} trunkH={1.5} crownR={0.75} color="#3a6e22" />

      {/* ── Bushes — back row near house wall ── */}
      <Bush x={-halfW - 1.8} z={halfD + 1.6} r={0.45} color="#2e5e1a" />
      <Bush x={-halfW - 0.9} z={halfD + 1.8} r={0.36} color="#3d7226" />
      <Bush x={ halfW + 1.8} z={halfD + 1.6} r={0.42} color="#347020" />
      <Bush x={ halfW + 0.9} z={halfD + 1.8} r={0.34} color="#2e5e1a" />

      {/* ── Bushes — terrace sides (set back, not next to pergola) ── */}
      <Bush x={-halfW - 2.0} z={0}      r={0.40} color="#38681e" />
      <Bush x={-halfW - 2.0} z={halfD}  r={0.32} color="#2e6020" />
      <Bush x={ halfW + 2.0} z={0}      r={0.38} color="#38681e" />
      <Bush x={ halfW + 2.0} z={halfD}  r={0.30} color="#3a6e22" />

      {/* ── Potted plants at pergola front corners ── */}
      <Pot x={-halfW + 0.3} z={-halfD - 0.55} />
      <Pot x={ halfW - 0.3} z={-halfD - 0.55} />
    </>
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
  breite: number;
  laenge: number;
  hoehe: number;
  color: string;
  louversOpen?: boolean;
  showRetract?: boolean;
  leftPanel?: string;
  rightPanel?: string;
  frontPanel?: string;
  backPanel?: string;
}

export const Pergola3DViewer = ({ breite, laenge, hoehe, color, showRetract = true, leftPanel = "none", rightPanel = "none", frontPanel = "none", backPanel = "none" }: Pergola3DViewerProps) => {
  const [louversOpen, setLouversOpen]           = useState(true);
  const [louversRetracted, setLouversRetracted] = useState(false);
  const [showDimensions, setShowDimensions]     = useState(false);
  const [faltOpen, setFaltOpen]                 = useState(true);
  const [schOpen, setSchOpen]                   = useState(false);
  const [zipDown, setZipDown]                   = useState(true);

  const hasFaltglas    = [leftPanel, rightPanel, frontPanel, backPanel].includes("faltglas");
  const hasSchiebeglas = [leftPanel, rightPanel, frontPanel, backPanel].includes("schiebeglas");
  const hasZip         = [leftPanel, rightPanel, frontPanel, backPanel].includes("zip");

  const w = breite / 1000;
  const d = laenge / 1000;
  const h = hoehe / 1000;

  const maxDim  = Math.max(w, d, h);
  const camDist = maxDim * 1.8;

  return (
    <div className="relative h-full w-full" style={{ minHeight: 360 }}>
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [camDist * 0.65, h * 0.5 + camDist * 0.75, -camDist * 1.35], fov: 40, near: 0.1, far: 200 }}
          style={{ background: "#b8d4e8", position: "absolute", inset: 0, width: "100%", height: "calc(100% - 44px)" }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        >
          <ambientLight intensity={0.9} color="#d6eaf8" />
          <directionalLight position={[8, 12, 4]} intensity={1.2} castShadow
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-far={60} shadow-camera-left={-12} shadow-camera-right={12}
            shadow-camera-top={12} shadow-camera-bottom={-12} />
          <directionalLight position={[-5, 8, -4]} intensity={0.4} color="#ffe8c8" />
          <hemisphereLight intensity={0.55} color="#c9e8f5" groundColor="#7aaa50" />

          <BackyardScene width={w} depth={d} height={h} />

          <PergolaModel
            width={w} depth={d} height={h} color={color}
            louversOpen={louversOpen} louversRetracted={louversRetracted}
            showDimensions={showDimensions}
            leftPanel={leftPanel} rightPanel={rightPanel} frontPanel={frontPanel} backPanel={backPanel}
            faltOpen={faltOpen} schOpen={schOpen} zipDown={zipDown}
          />

          <OrbitControls enablePan={false}
            target={[0, h * 0.5, 0]}
            minPolarAngle={Math.PI / 8} maxPolarAngle={Math.PI * 0.85}
            minDistance={maxDim * 0.6} maxDistance={maxDim * 4} />

          <Environment preset="park" />
        </Canvas>
      </Suspense>

      {/* dimension badge */}
      <div className="pointer-events-none absolute left-3 rounded-lg bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur" style={{ bottom: 52 }}>
        {(laenge / 1000).toFixed(1)}m × {(breite / 1000).toFixed(1)}m × {(hoehe / 1000).toFixed(1)}m
      </div>

      {/* 3D interaction hint */}
      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs text-zinc-600 backdrop-blur">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
        3D drehen
      </div>

      {/* Toggle buttons row */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 bg-white border-t border-zinc-200 flex-wrap px-3" style={{ height: 44 }}>
        <ToggleSwitch checked={louversOpen} onChange={() => setLouversOpen(v => !v)} label="Lamellen öffnen" />
        {showRetract && <ToggleSwitch checked={louversRetracted} onChange={() => setLouversRetracted(v => !v)} label="Lamellen einziehen" />}
        {hasFaltglas && (
          <ToggleSwitch checked={faltOpen} onChange={() => setFaltOpen(v => !v)} label={faltOpen ? "Geöffnet" : "Geschlossen"} />
        )}
        {hasSchiebeglas && (
          <ToggleSwitch checked={schOpen} onChange={() => setSchOpen(v => !v)} label={schOpen ? "Geöffnet" : "Geschlossen"} />
        )}
        {hasZip && (
          <div className="flex items-center gap-1">
            <button onClick={() => setZipDown(false)}
              className={`flex items-center gap-1 rounded-lg px-3 py-1 text-[11px] font-semibold border transition-all ${!zipDown ? "bg-[#344148] text-white border-[#344148]" : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"}`}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              Heben
            </button>
            <button onClick={() => setZipDown(true)}
              className={`flex items-center gap-1 rounded-lg px-3 py-1 text-[11px] font-semibold border transition-all ${zipDown ? "bg-[#344148] text-white border-[#344148]" : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"}`}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              Senken
            </button>
          </div>
        )}
        <ToggleSwitch checked={showDimensions} onChange={() => setShowDimensions(v => !v)} label="Maße anzeigen" />
      </div>
    </div>
  );
};
