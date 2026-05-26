import { Suspense, useMemo, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const colorMap: Record<string, string> = {
  "7016 T": "#2E3234",
  "Gray 7016 T": "#2E3234",
  "9016 T": "#F0EDE8",
  "White 9016 T": "#F0EDE8",
};

type SideSystem = "none" | "guillotine" | "faltglas" | "schiebeglas" | "zip";

const SIDE_SYSTEMS: { value: SideSystem; label: string }[] = [
  { value: "none",        label: "Keine" },
  { value: "guillotine",  label: "Guillotine" },
  { value: "faltglas",    label: "Faltglas" },
  { value: "schiebeglas", label: "Schiebeglas" },
  { value: "zip",         label: "Zip-Screens" },
];

const DimensionLine = ({ from, to, label, tickDir }: {
  from: [number, number, number];
  to: [number, number, number];
  label: string;
  tickDir: [number, number, number];
}) => {
  const mid: [number, number, number] = [(from[0]+to[0])/2, (from[1]+to[1])/2, (from[2]+to[2])/2];
  const t = 0.06;
  const [tx, ty, tz] = tickDir;
  const tickA: [number,number,number][] = [[from[0]-tx*t,from[1]-ty*t,from[2]-tz*t],[from[0]+tx*t,from[1]+ty*t,from[2]+tz*t]];
  const tickB: [number,number,number][] = [[to[0]-tx*t,to[1]-ty*t,to[2]-tz*t],[to[0]+tx*t,to[1]+ty*t,to[2]+tz*t]];
  return (
    <>
      <Line points={[from, to]} color="#555" lineWidth={1.2} />
      <Line points={tickA} color="#555" lineWidth={1.2} />
      <Line points={tickB} color="#555" lineWidth={1.2} />
      <Html position={mid} center distanceFactor={9}>
        <div style={{ background:"rgba(255,255,255,0.93)", color:"#222", padding:"2px 7px", borderRadius:3, fontSize:11, fontWeight:600, whiteSpace:"nowrap", pointerEvents:"none", border:"1px solid rgba(0,0,0,0.13)", boxShadow:"0 1px 4px rgba(0,0,0,0.10)" }}>
          {label}
        </div>
      </Html>
    </>
  );
};

interface WintergartenModelProps {
  width: number; depth: number; backH: number; frontH: number;
  color: string; showDimensions: boolean;
  leftSystem: SideSystem; rightSystem: SideSystem; frontSystem: SideSystem;
  faltOpen: boolean; schOpen: boolean; zipDown: boolean;
}

const WintergartenModel = ({ width, depth, backH, frontH, color, showDimensions, leftSystem, rightSystem, frontSystem, faltOpen, schOpen, zipDown }: WintergartenModelProps) => {
  const hex = colorMap[color] ?? "#2E3234";
  const halfW = width / 2;
  const halfD = depth / 2;

  const postS   = 0.12;
  const beamH   = 0.10;
  const beamD   = 0.09;
  const glassTh = 0.010;
  const rafterD = 0.055;
  const rafterH = 0.065;
  const mullS   = 0.045;  // mullion cross-section

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.38, metalness: 0.28 }),
    [hex]
  );

  // Zip screen — solid dark fabric material
  const zipFabricMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a3a3a',
    transparent: true,
    opacity: 0.90,
    roughness: 0.96,
    metalness: 0.02,
    side: THREE.DoubleSide,
  }), []);

  const pitchAngle = Math.atan2(backH - frontH, depth);
  const slopedLen  = Math.sqrt(depth * depth + (backH - frontH) * (backH - frontH));

  // Side guillotine divider (runs at half height, sloped front→back)
  const sideDivRise    = (backH - frontH) / 2;
  const sideDivAngle   = Math.atan2(sideDivRise, depth);
  const sideDivLen     = Math.sqrt(depth * depth + sideDivRise * sideDivRise);
  const sideDivCenterY = (frontH + backH) / 4;

  const roofGlassGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array([
      -halfW, frontH, -halfD,
       halfW, frontH, -halfD,
       halfW, backH,   halfD,
      -halfW, backH,   halfD,
    ]);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();
    return g;
  }, [halfW, halfD, frontH, backH]);

  const rafterCount   = Math.max(2, Math.round(width / 0.45) - 1);
  const rafterSpacing = (width - beamD * 2) / (rafterCount + 1);
  const slopeCenterY  = (frontH + backH) / 2;

  // ── Side glass / screen geometry ──
  const sides3 = [leftSystem, rightSystem, frontSystem];
  const hasFaltglas    = sides3.includes("faltglas");
  const hasSchiebeglas = sides3.includes("schiebeglas");
  const hasZip         = sides3.includes("zip");

  // Trapezoidal side shape — stops at the inner face of each corner post
  const sideShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-halfD + postS,     0);
    s.lineTo( halfD - postS,     0);
    s.lineTo( halfD - postS,     backH  - beamH * 0.6);
    s.lineTo(-halfD + postS,     frontH - beamH * 0.6);
    s.closePath();
    return s;
  }, [halfD, postS, backH, frontH, beamH]);

  // Triangular glass above the traversa — fills the 8° wedge on each side
  const upperSideShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-halfD + postS, frontH - beamH * 0.6);
    s.lineTo( halfD - postS, frontH - beamH * 0.6);
    s.lineTo( halfD - postS, backH  - beamH * 0.6);
    s.closePath();
    return s;
  }, [halfD, postS, frontH, backH, beamH]);

  const mullionDivs = 0; // Schiebeglas now uses individual panels, not mullions

  const frontInnerW   = width - postS * 2;

  // Faltglas panel constants
  const faltCount  = 4;
  const faltFrameW = 0.042;
  const faltPanelW = frontInnerW / faltCount;
  const handleThk  = 0.022;
  const handleH    = frontH * 0.32;

  // Schiebeglas panel constants
  const schCount   = 3;
  const schFrameW  = 0.038;
  const schPanelW  = frontInnerW / schCount;
  const schHandleH = frontH * 0.35;
  const schHandleThk = 0.026;
  const isSchiebeglas = hasSchiebeglas; // kept for animation refs compatibility

  const trackH = 0.082;
  const trackD = 0.082;

  // Animated fold angle (smooth open/close)
  const foldCurrentRef = useRef(faltOpen ? 1.30 : 0.03);
  const frontPanelRefs = useRef<(THREE.Group | null)[]>([]);
  const leftPanelRefs  = useRef<(THREE.Group | null)[]>([]);
  const rightPanelRefs = useRef<(THREE.Group | null)[]>([]);

  // Schiebeglas sliding animation refs
  const frontSchRefs = useRef<(THREE.Group | null)[]>([]);
  const leftSchRefs  = useRef<(THREE.Group | null)[]>([]);
  const rightSchRefs = useRef<(THREE.Group | null)[]>([]);

  // Zip screen roll-down refs
  const zipCurrentRef   = useRef(1); // start fully down
  const zipFrontRef     = useRef<THREE.Mesh | null>(null);
  const zipFrontRailRef = useRef<THREE.Mesh | null>(null);
  const zipLeftRef      = useRef<THREE.Mesh | null>(null);
  const zipLeftRailRef  = useRef<THREE.Mesh | null>(null);
  const zipRightRef     = useRef<THREE.Mesh | null>(null);
  const zipRightRailRef = useRef<THREE.Mesh | null>(null);
  // Front: Z-tracks fixed, X moves
  const schTracks = [-halfD + 0.005, -halfD + 0.022, -halfD + 0.038];
  const schClosedXs = [
    -halfW + postS + (frontInnerW / schCount) * 0.5,
    -halfW + postS + (frontInnerW / schCount) * 1.5,
    -halfW + postS + (frontInnerW / schCount) * 2.5,
  ];
  const schOpenXs = [
    -halfW + postS + (frontInnerW / schCount) * 0.5,
    -halfW + postS + (frontInnerW / schCount) * 0.5,
    -halfW + postS + (frontInnerW / schCount) * 0.5,
  ];
  // Side: X-tracks fixed, Z moves
  const sSPW = (depth - postS * 2) / schCount;
  const schSideClosedZs = [
    -halfD + postS + sSPW * 0.5,
    -halfD + postS + sSPW * 1.5,
    -halfD + postS + sSPW * 2.5,
  ];
  const schSideOpenZs = [
    halfD - postS - sSPW * 0.5,
    halfD - postS - sSPW * 0.5,
    halfD - postS - sSPW * 0.5,
  ];
  const schSideTracks_L = [-halfW + 0.005, -halfW + 0.022, -halfW + 0.038];
  const schSideTracks_R = [ halfW - 0.005,  halfW - 0.022,  halfW - 0.038];

  useFrame((_, delta) => {
    const target = faltOpen ? 1.30 : 0.03;
    foldCurrentRef.current = THREE.MathUtils.lerp(foldCurrentRef.current, target, Math.min(1, delta * 2.2));
    const fold = foldCurrentRef.current;

    // Front panels: stack in X, fold in Z
    const projW = faltPanelW * Math.cos(fold);
    const stackStartX = -halfW + postS;
    frontPanelRefs.current.forEach((ref, i) => {
      if (!ref) return;
      ref.position.x = stackStartX + projW * i + projW / 2;
      ref.rotation.y = i % 2 === 0 ? -fold : fold;
    });

    // Side panels: stack in Z, fold in X — scale.y tracks the sloped beam height
    const sPW = (depth - postS * 2) / faltCount;
    const projZ = sPW * Math.cos(fold);
    const stackStartZ = -halfD + postS;
    const depthInner = depth - postS * 2;
    const hFrontSide = frontH - beamH * 0.6;
    const hBackSide  = backH  - beamH * 0.6;
    leftPanelRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const pcz = stackStartZ + projZ * i + projZ / 2;
      ref.position.z = pcz;
      ref.rotation.y = i % 2 === 0 ? -fold : fold;
    });
    rightPanelRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const pcz = stackStartZ + projZ * i + projZ / 2;
      ref.position.z = pcz;
      ref.rotation.y = i % 2 === 0 ? fold : -fold;
    });

    // Schiebeglas front: slide in X
    frontSchRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const targetX = schOpen ? schOpenXs[i] : schClosedXs[i];
      ref.position.x = THREE.MathUtils.lerp(ref.position.x, targetX, Math.min(1, delta * 2.8));
    });
    // Schiebeglas sides: slide in Z (fixed height, no scale.y needed)
    [leftSchRefs, rightSchRefs].forEach((refsObj) => {
      refsObj.current.forEach((ref, i) => {
        if (!ref) return;
        const targetZ = schOpen ? schSideOpenZs[i] : schSideClosedZs[i];
        ref.position.z = THREE.MathUtils.lerp(ref.position.z, targetZ, Math.min(1, delta * 2.8));
      });
    });

    // Zip screen roll-down animation
    if (hasZip) {
      const zipTarget = zipDown ? 1 : 0;
      zipCurrentRef.current = THREE.MathUtils.lerp(zipCurrentRef.current, zipTarget, Math.min(1, delta * 2.5));
      const zc  = zipCurrentRef.current;
      const sc  = Math.max(0.001, zc);
      const zipH = frontH - beamH * 0.6;
      // Screen: scale from top → position.y = topY - visibleH/2
      const screenCY = zipH - (zipH * sc) / 2;
      // Bottom rail follows the bottom edge of the screen
      const railY = zipH - zipH * zc;
      if (zipFrontRef.current) { zipFrontRef.current.scale.y = sc; zipFrontRef.current.position.y = screenCY; }
      if (zipFrontRailRef.current) zipFrontRailRef.current.position.y = railY;
      if (zipLeftRef.current) { zipLeftRef.current.scale.y = sc; zipLeftRef.current.position.y = screenCY; }
      if (zipLeftRailRef.current) zipLeftRailRef.current.position.y = railY;
      if (zipRightRef.current) { zipRightRef.current.scale.y = sc; zipRightRef.current.position.y = screenCY; }
      if (zipRightRailRef.current) zipRightRailRef.current.position.y = railY;
    }
  });

  return (
    <group position={[0, -backH / 2, 0]}>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width * 5, depth * 5]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>

      {/* House wall */}
      <mesh position={[0, (backH + 0.6) / 2, halfD + 0.15]} receiveShadow castShadow>
        <boxGeometry args={[width + 1.4, backH + 0.6, 0.3]} />
        <meshStandardMaterial color="#111111" roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Wall windows */}
      <mesh position={[-width * 0.18, backH * 0.62, halfD + 0.005]}>
        <boxGeometry args={[width * 0.22, backH * 0.28, 0.01]} />
        <meshStandardMaterial color="#7a9fb0" transparent opacity={0.45} roughness={0.1} />
      </mesh>
      <mesh position={[width * 0.18, backH * 0.62, halfD + 0.005]}>
        <boxGeometry args={[width * 0.22, backH * 0.28, 0.01]} />
        <meshStandardMaterial color="#7a9fb0" transparent opacity={0.45} roughness={0.1} />
      </mesh>

      {/* Front posts */}
      <RoundedBox args={[postS, frontH, postS]} radius={0.012} smoothness={4}
        position={[-halfW + postS/2, frontH/2, -halfD + postS/2]} material={frameMat} castShadow />
      <RoundedBox args={[postS, frontH, postS]} radius={0.012} smoothness={4}
        position={[ halfW - postS/2, frontH/2, -halfD + postS/2]} material={frameMat} castShadow />

      {/* Back corner posts — flush with house wall, frame the back edge of side glass */}
      <RoundedBox args={[postS, backH, postS]} radius={0.012} smoothness={4}
        position={[-halfW + postS/2, backH/2, halfD - postS/2]} material={frameMat} castShadow />
      <RoundedBox args={[postS, backH, postS]} radius={0.012} smoothness={4}
        position={[ halfW - postS/2, backH/2, halfD - postS/2]} material={frameMat} castShadow />

      {/* Front top beam */}
      <RoundedBox args={[width - postS*2, beamH, beamD]} radius={0.009} smoothness={4}
        position={[0, frontH - beamH/2, -halfD + beamD/2]} material={frameMat} castShadow />

      {/* Wandanschlussprofil */}
      <RoundedBox args={[width + 0.04, beamH*0.6, beamD*0.4]} radius={0.005} smoothness={4}
        position={[0, backH - beamH*0.3, halfD]} material={frameMat} castShadow />

      {/* Left outer sloped beam (roof edge) */}
      <RoundedBox args={[beamD, beamH, slopedLen]} radius={0.008} smoothness={4}
        rotation={[-pitchAngle, 0, 0]}
        position={[-halfW + beamD/2, slopeCenterY - beamH/2, 0]} material={frameMat} castShadow />

      {/* Right outer sloped beam (roof edge) */}
      <RoundedBox args={[beamD, beamH, slopedLen]} radius={0.008} smoothness={4}
        rotation={[-pitchAngle, 0, 0]}
        position={[ halfW - beamD/2, slopeCenterY - beamH/2, 0]} material={frameMat} castShadow />


      {/* ── Side panels — per side ── */}
      <>
          {/* ── Left side glass ── */}
          {leftSystem !== "none" && leftSystem !== "zip" && (leftSystem === "faltglas" ? (
            (() => {
              const fold0 = foldCurrentRef.current;
              const sPW   = (depth - postS * 2) / faltCount;
              const projZ0 = sPW * Math.cos(fold0);
              const stackStartZ = -halfD + postS;
              const hPanel = frontH - beamH * 0.6;
              return Array.from({ length: faltCount }, (_, i) => {
                const pcz0  = stackStartZ + projZ0 * i + projZ0 / 2;
                const hSide = i % 2 === 0 ? 1 : -1;
                const handleZ = hSide * (sPW / 2 - faltFrameW - handleThk * 1.2);
                return (
                  <group key={i} ref={el => { if (el) { el.userData.baseH = hPanel; } leftPanelRefs.current[i] = el; }}
                    position={[-halfW, 0, pcz0]} rotation={[0, i % 2 === 0 ? -fold0 : fold0, 0]}>
                    <mesh position={[0, hPanel / 2, 0]}>
                      <boxGeometry args={[glassTh * 2, hPanel - faltFrameW * 2, sPW - faltFrameW * 2]} />
                      <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32}
                        roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                    <RoundedBox args={[faltFrameW, hPanel, faltFrameW]} radius={0.005} smoothness={4}
                      position={[0, hPanel / 2, -sPW / 2 + faltFrameW / 2]} material={frameMat} castShadow />
                    <RoundedBox args={[faltFrameW, hPanel, faltFrameW]} radius={0.005} smoothness={4}
                      position={[0, hPanel / 2,  sPW / 2 - faltFrameW / 2]} material={frameMat} castShadow />
                    <RoundedBox args={[handleThk, handleH * 0.75, handleThk]} radius={0.004} smoothness={4}
                      position={[-handleThk * 0.8, hPanel * 0.5, handleZ]} material={frameMat} castShadow />
                  </group>
                );
              });
            })()
          ) : leftSystem === "schiebeglas" ? (
            (() => {
              const pH = frontH - beamH * 0.6 - trackH;
              const pCy = trackH + pH / 2;
              const divThk = 0.008; const divCount = 2;
              return Array.from({ length: schCount }, (_, i) => {
                const initZ = schSideClosedZs[i];
                const xOff  = schSideTracks_L[i];
                return (
                  <group key={i} ref={el => { leftSchRefs.current[i] = el; }}
                    position={[xOff, 0, initZ]}>
                    <mesh position={[0, pCy, 0]}>
                      <boxGeometry args={[glassTh * 1.5, pH, sSPW + 0.004]} />
                      <meshStandardMaterial color="#d8eef6" transparent opacity={0.19}
                        roughness={0.01} metalness={0.08} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                    {Array.from({ length: divCount }, (_, d) => {
                      const zPos = -sSPW / 2 + (sSPW / (divCount + 1)) * (d + 1);
                      return (
                        <mesh key={d} position={[0, pCy, zPos]}>
                          <boxGeometry args={[glassTh * 2.8, pH, divThk]} />
                          <meshStandardMaterial color="#b8ccd4" transparent opacity={0.60}
                            roughness={0.15} metalness={0.35} />
                        </mesh>
                      );
                    })}
                    {i === 0 && (
                      <RoundedBox args={[schHandleThk * 0.45, schHandleH, schHandleThk * 0.8]} radius={0.005} smoothness={4}
                        position={[schHandleThk * 0.3, pCy, -sSPW / 2 + schHandleThk * 1.4]}
                        material={frameMat} castShadow />
                    )}
                  </group>
                );
              });
            })()
          ) : (
            <mesh position={[-halfW + glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[sideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          ))}

          {/* ── Right side glass ── */}
          {rightSystem !== "none" && rightSystem !== "zip" && (rightSystem === "faltglas" ? (
            (() => {
              const fold0 = foldCurrentRef.current;
              const sPW   = (depth - postS * 2) / faltCount;
              const projZ0 = sPW * Math.cos(fold0);
              const stackStartZ = -halfD + postS;
              const hPanel = frontH - beamH * 0.6;
              return Array.from({ length: faltCount }, (_, i) => {
                const pcz0  = stackStartZ + projZ0 * i + projZ0 / 2;
                const hSide = i % 2 === 0 ? 1 : -1;
                const handleZ = hSide * (sPW / 2 - faltFrameW - handleThk * 1.2);
                return (
                  <group key={i} ref={el => { if (el) { el.userData.baseH = hPanel; } rightPanelRefs.current[i] = el; }}
                    position={[halfW, 0, pcz0]} rotation={[0, i % 2 === 0 ? fold0 : -fold0, 0]}>
                    <mesh position={[0, hPanel / 2, 0]}>
                      <boxGeometry args={[glassTh * 2, hPanel - faltFrameW * 2, sPW - faltFrameW * 2]} />
                      <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32}
                        roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                    <RoundedBox args={[faltFrameW, hPanel, faltFrameW]} radius={0.005} smoothness={4}
                      position={[0, hPanel / 2, -sPW / 2 + faltFrameW / 2]} material={frameMat} castShadow />
                    <RoundedBox args={[faltFrameW, hPanel, faltFrameW]} radius={0.005} smoothness={4}
                      position={[0, hPanel / 2,  sPW / 2 - faltFrameW / 2]} material={frameMat} castShadow />
                    <RoundedBox args={[handleThk, handleH * 0.75, handleThk]} radius={0.004} smoothness={4}
                      position={[handleThk * 0.8, hPanel * 0.5, handleZ]} material={frameMat} castShadow />
                  </group>
                );
              });
            })()
          ) : rightSystem === "schiebeglas" ? (
            (() => {
              const pH = frontH - beamH * 0.6 - trackH;
              const pCy = trackH + pH / 2;
              const divThk = 0.008; const divCount = 2;
              return Array.from({ length: schCount }, (_, i) => {
                const initZ = schSideClosedZs[i];
                const xOff  = schSideTracks_R[i];
                return (
                  <group key={i} ref={el => { rightSchRefs.current[i] = el; }}
                    position={[xOff, 0, initZ]}>
                    <mesh position={[0, pCy, 0]}>
                      <boxGeometry args={[glassTh * 1.5, pH, sSPW + 0.004]} />
                      <meshStandardMaterial color="#d8eef6" transparent opacity={0.19}
                        roughness={0.01} metalness={0.08} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                    {Array.from({ length: divCount }, (_, d) => {
                      const zPos = -sSPW / 2 + (sSPW / (divCount + 1)) * (d + 1);
                      return (
                        <mesh key={d} position={[0, pCy, zPos]}>
                          <boxGeometry args={[glassTh * 2.8, pH, divThk]} />
                          <meshStandardMaterial color="#b8ccd4" transparent opacity={0.60}
                            roughness={0.15} metalness={0.35} />
                        </mesh>
                      );
                    })}
                    {i === 0 && (
                      <RoundedBox args={[schHandleThk * 0.45, schHandleH, schHandleThk * 0.8]} radius={0.005} smoothness={4}
                        position={[-schHandleThk * 0.3, pCy, -sSPW / 2 + schHandleThk * 1.4]}
                        material={frameMat} castShadow />
                    )}
                  </group>
                );
              });
            })()
          ) : (
            <mesh position={[halfW - glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[sideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          ))}

          {/* Front glass — Faltglas: 4 individual framed panels with handles */}
          {frontSystem !== "none" && frontSystem !== "zip" && (frontSystem === "faltglas" ? (
            <>
              {(() => {
                const fold0 = foldCurrentRef.current;
                const fPW   = faltPanelW;
                const projW0 = fPW * Math.cos(fold0);
                const stackStartX = -halfW + postS;
                const panH = frontH - beamH * 0.6;
                return Array.from({ length: faltCount }, (_, i) => {
                  const pcx0 = stackStartX + projW0 * i + projW0 / 2;
                  const hSide = i % 2 === 0 ? 1 : -1;
                  const hx   = hSide * (fPW / 2 - faltFrameW - handleThk * 1.2);
                  return (
                    <group key={i} ref={el => { frontPanelRefs.current[i] = el; }}
                      position={[pcx0, 0, -halfD]} rotation={[0, i % 2 === 0 ? -fold0 : fold0, 0]}>
                      <mesh position={[0, panH / 2, 0]}>
                        <boxGeometry args={[fPW - faltFrameW * 2, panH - faltFrameW * 2, glassTh * 2]} />
                        <meshStandardMaterial color="#c8e4ee" transparent opacity={0.32}
                          roughness={0.03} metalness={0.06} side={THREE.DoubleSide} depthWrite={false} />
                      </mesh>
                      <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4}
                        position={[-fPW / 2 + faltFrameW / 2, panH / 2, 0]} material={frameMat} castShadow />
                      <RoundedBox args={[faltFrameW, panH, faltFrameW]} radius={0.005} smoothness={4}
                        position={[ fPW / 2 - faltFrameW / 2, panH / 2, 0]} material={frameMat} castShadow />
                      <RoundedBox args={[handleThk, handleH, handleThk]} radius={0.004} smoothness={4}
                        position={[hx, panH * 0.5, -handleThk * 0.8]} material={frameMat} castShadow />
                    </group>
                  );
                });
              })()}
              {/* Front bottom rail */}
              <RoundedBox args={[width - postS * 2, trackH * 0.7, trackD * 0.7]} radius={0.006} smoothness={4}
                position={[0, trackH * 0.35, -halfD + trackD * 0.35]} material={frameMat} castShadow />
              {/* Left front corner foot */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[-halfW + postS / 2, trackH / 2, -halfD + postS / 2]} material={frameMat} castShadow />
              {/* Right front corner foot */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[ halfW - postS / 2, trackH / 2, -halfD + postS / 2]} material={frameMat} castShadow />
              {/* Left side bottom track */}
              <RoundedBox args={[trackD * 0.7, trackH * 0.7, depth - postS * 2]} radius={0.007} smoothness={4}
                position={[-halfW + trackD * 0.35, trackH * 0.35, 0]} material={frameMat} castShadow />
              {/* Right side bottom track */}
              <RoundedBox args={[trackD * 0.7, trackH * 0.7, depth - postS * 2]} radius={0.007} smoothness={4}
                position={[ halfW - trackD * 0.35, trackH * 0.35, 0]} material={frameMat} castShadow />
              {/* Back left corner foot */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[-halfW + postS / 2, trackH / 2, halfD - postS / 2]} material={frameMat} castShadow />
              {/* Back right corner foot */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[ halfW - postS / 2, trackH / 2, halfD - postS / 2]} material={frameMat} castShadow />
              {/* Horizontal top rail — separates glass from 8° sloped corner */}
              <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4}
                position={[-halfW + beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
              <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4}
                position={[ halfW - beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
            </>
          ) : frontSystem === "schiebeglas" ? (
            /* Schiebeglas: 3 frameless sliding glass panels — thin horizontal dividers, one handle */
            <>
              {Array.from({ length: schCount }, (_, i) => {
                const initX   = schClosedXs[i];
                const zOff    = schTracks[i];
                const pH      = frontH - beamH * 0.6 - trackH;
                const pCy     = trackH + pH / 2;
                const divThk  = 0.008;
                const divCount = 2;
                return (
                  <group key={i} ref={el => { frontSchRefs.current[i] = el; }}
                    position={[initX, 0, zOff]}>
                    {/* Glass — full height, nearly frameless */}
                    <mesh position={[0, pCy, 0]}>
                      <boxGeometry args={[schPanelW + 0.004, pH, glassTh * 1.5]} />
                      <meshStandardMaterial color="#d8eef6" transparent opacity={0.19}
                        roughness={0.01} metalness={0.08} side={THREE.DoubleSide} depthWrite={false} />
                    </mesh>
                    {/* Thin vertical dividers within each panel */}
                    {Array.from({ length: divCount }, (_, d) => {
                      const xPos = -schPanelW / 2 + (schPanelW / (divCount + 1)) * (d + 1);
                      return (
                        <mesh key={d} position={[xPos, pCy, 0]}>
                          <boxGeometry args={[divThk, pH, glassTh * 2.8]} />
                          <meshStandardMaterial color="#b8ccd4" transparent opacity={0.60}
                            roughness={0.15} metalness={0.35} />
                        </mesh>
                      );
                    })}
                    {/* Handle on third panel — left edge */}
                    {i === 2 && (
                      <RoundedBox args={[schHandleThk * 0.8, schHandleH, schHandleThk * 0.45]} radius={0.005} smoothness={4}
                        position={[schPanelW / 2 - schHandleThk * 1.4, pCy, -schHandleThk * 0.22]}
                        material={frameMat} castShadow />
                    )}
                  </group>
                );
              })}
              {/* Bottom track (2 grooves) */}
              <RoundedBox args={[width - postS * 2, trackH * 0.45, trackH * 0.70]} radius={0.005} smoothness={4}
                position={[0, trackH * 0.22, -halfD + trackH * 0.35]} material={frameMat} castShadow />
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[-halfW + postS / 2, trackH / 2, -halfD + postS / 2]} material={frameMat} castShadow />
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[ halfW - postS / 2, trackH / 2, -halfD + postS / 2]} material={frameMat} castShadow />
            </>
          ) : (
            /* All other glass systems (guillotine): single front panel */
            <mesh position={[0, (frontH - beamH * 0.6) / 2, -halfD + glassTh/2]}>
              <boxGeometry args={[width - postS*2, frontH - beamH * 0.6, glassTh]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22}
                roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          ))}

          {/* Guillotine framing — per side */}
          {frontSystem === "guillotine" && (
            <>
              {/* Center vertical mullion */}
              <RoundedBox args={[mullS, frontH, mullS]} radius={0.005} smoothness={4}
                position={[0, frontH/2, -halfD + mullS/2]} material={frameMat} castShadow />
              {/* Horizontal divider at 50% height */}
              <RoundedBox args={[width - postS, 0.052, 0.052]} radius={0.005} smoothness={4}
                position={[0, frontH * 0.50, -halfD + 0.026]} material={frameMat} castShadow />

              {/* Front bottom rail (between the two corner feet) */}
              <RoundedBox args={[width - postS*2, trackH, trackD]} radius={0.008} smoothness={4}
                position={[0, trackH/2, -halfD + trackD/2]} material={frameMat} castShadow />

              {/* Left corner foot — directly below left front post */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[-halfW + postS/2, trackH/2, -halfD + postS/2]} material={frameMat} castShadow />

              {/* Right corner foot — directly below right front post */}
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
                position={[ halfW - postS/2, trackH/2, -halfD + postS/2]} material={frameMat} castShadow />

            </>
          )}
          {leftSystem === "guillotine" && (
            <>
              <RoundedBox args={[mullS, slopeCenterY, mullS]} radius={0.005} smoothness={4} position={[-halfW + mullS/2, slopeCenterY/2, 0]} material={frameMat} castShadow />
              <RoundedBox args={[0.052, 0.052, depth - postS * 2]} radius={0.005} smoothness={4} position={[-halfW + 0.026, frontH * 0.5, 0]} material={frameMat} castShadow />
              <RoundedBox args={[trackD, trackH, depth - postS * 2]} radius={0.008} smoothness={4} position={[-halfW + trackD/2, trackH/2, 0]} material={frameMat} castShadow />
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postS/2, trackH/2, halfD - postS/2]} material={frameMat} castShadow />
              <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4} position={[-halfW + beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
            </>
          )}
          {rightSystem === "guillotine" && (
            <>
              <RoundedBox args={[mullS, slopeCenterY, mullS]} radius={0.005} smoothness={4} position={[halfW - mullS/2, slopeCenterY/2, 0]} material={frameMat} castShadow />
              <RoundedBox args={[0.052, 0.052, depth - postS * 2]} radius={0.005} smoothness={4} position={[halfW - 0.026, frontH * 0.5, 0]} material={frameMat} castShadow />
              <RoundedBox args={[trackD, trackH, depth - postS * 2]} radius={0.008} smoothness={4} position={[halfW - trackD/2, trackH/2, 0]} material={frameMat} castShadow />
              <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4} position={[halfW - postS/2, trackH/2, halfD - postS/2]} material={frameMat} castShadow />
              <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4} position={[halfW - beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
            </>
          )}

          {/* Upper triangular glass — per side (faltglas & schiebeglas) */}
          {(leftSystem === "faltglas" || leftSystem === "schiebeglas") && (
            <mesh position={[-halfW + glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[upperSideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          )}
          {(rightSystem === "faltglas" || rightSystem === "schiebeglas") && (
            <mesh position={[halfW - glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[upperSideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          )}

          {/* Schiebeglas side tracks — per side */}
          {leftSystem === "schiebeglas" && (<>
            <RoundedBox args={[trackH * 0.55, trackH, depth - postS * 2]} radius={0.007} smoothness={4} position={[-halfW + trackH * 0.27, trackH / 2, 0]} material={frameMat} castShadow />
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4} position={[-halfW + postS / 2, trackH / 2, halfD - postS / 2]} material={frameMat} castShadow />
            <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4} position={[-halfW + beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
          </>)}
          {rightSystem === "schiebeglas" && (<>
            <RoundedBox args={[trackH * 0.55, trackH, depth - postS * 2]} radius={0.007} smoothness={4} position={[halfW - trackH * 0.27, trackH / 2, 0]} material={frameMat} castShadow />
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4} position={[halfW - postS / 2, trackH / 2, halfD - postS / 2]} material={frameMat} castShadow />
            <RoundedBox args={[beamD, beamH * 0.75, depth - postS * 2]} radius={0.006} smoothness={4} position={[halfW - beamD / 2, frontH - beamH * 0.6, 0]} material={frameMat} castShadow />
          </>)}
      </>

      {/* Zip screens — animated roll-down — per side */}
      {hasZip && (() => {
        const zipH   = frontH - beamH * 0.6;
        const hsH    = beamH * 1.4;        // housing height
        const hsY    = zipH - hsH / 2;     // housing center — hangs below traversa, top flush with it
        const chW    = 0.032;          // channel width
        const railH  = 0.032;          // bottom rail height
        const floorRailH = trackH * 0.7;

        return (
          <>
            {/* ── Front wall ── */}
            {/* Housing / kasete — roller box flush with traversa top */}
            <RoundedBox args={[width - postS * 2 + chW * 2, hsH, beamD * 1.1]} radius={0.010} smoothness={4}
              position={[0, hsY, -halfD + beamD * 0.55]} material={frameMat} castShadow />
            {/* Side guide channels */}
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[-halfW + postS + chW * 0.5, zipH / 2, -halfD + chW * 0.5]} material={frameMat} castShadow />
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[ halfW - postS - chW * 0.5, zipH / 2, -halfD + chW * 0.5]} material={frameMat} castShadow />
            {/* Screen fabric */}
            <mesh ref={el => { zipFrontRef.current = el; }}
              position={[0, zipH / 2, -halfD + glassTh * 2]}
              material={zipFabricMat}>
              <boxGeometry args={[width - postS * 2 - chW * 2 - 0.008, zipH, glassTh * 2]} />
            </mesh>
            {/* Moving bottom rail */}
            <mesh ref={zipFrontRailRef} position={[0, 0, -halfD + glassTh * 2]}>
              <boxGeometry args={[width - postS * 2 - chW * 2, railH, railH]} />
              <meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} />
            </mesh>
            {/* Floor traversa (fixed) */}
            <RoundedBox args={[width - postS * 2, floorRailH, floorRailH]} radius={0.005} smoothness={4}
              position={[0, floorRailH / 2, -halfD + floorRailH / 2]} material={frameMat} castShadow />
            {/* Corner feet front */}
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
              position={[-halfW + postS/2, trackH/2, -halfD + postS/2]} material={frameMat} castShadow />
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
              position={[ halfW - postS/2, trackH/2, -halfD + postS/2]} material={frameMat} castShadow />

            {/* ── Left wall ── */}
            <RoundedBox args={[beamD * 1.1, hsH, depth - postS * 2 + chW * 2]} radius={0.010} smoothness={4}
              position={[-halfW + beamD * 0.55, hsY, 0]} material={frameMat} castShadow />
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[-halfW + chW * 0.5, zipH / 2, -halfD + postS + chW * 0.5]} material={frameMat} castShadow />
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[-halfW + chW * 0.5, zipH / 2,  halfD - postS - chW * 0.5]} material={frameMat} castShadow />
            <mesh ref={el => { zipLeftRef.current = el; }}
              position={[-halfW + glassTh * 2, zipH / 2, 0]}
              material={zipFabricMat}>
              <boxGeometry args={[glassTh * 2, zipH, depth - postS * 2 - chW * 2 - 0.008]} />
            </mesh>
            <mesh ref={zipLeftRailRef} position={[-halfW + glassTh * 2, 0, 0]}>
              <boxGeometry args={[railH, railH, depth - postS * 2 - chW * 2]} />
              <meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} />
            </mesh>
            {/* Floor traversa left */}
            <RoundedBox args={[floorRailH, floorRailH, depth - postS * 2]} radius={0.005} smoothness={4}
              position={[-halfW + floorRailH / 2, floorRailH / 2, 0]} material={frameMat} castShadow />
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
              position={[-halfW + postS/2, trackH/2, halfD - postS/2]} material={frameMat} castShadow />

            {/* ── Right wall ── */}
            <RoundedBox args={[beamD * 1.1, hsH, depth - postS * 2 + chW * 2]} radius={0.010} smoothness={4}
              position={[ halfW - beamD * 0.55, hsY, 0]} material={frameMat} castShadow />
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[ halfW - chW * 0.5, zipH / 2, -halfD + postS + chW * 0.5]} material={frameMat} castShadow />
            <RoundedBox args={[chW, zipH, chW]} radius={0.004} smoothness={4}
              position={[ halfW - chW * 0.5, zipH / 2,  halfD - postS - chW * 0.5]} material={frameMat} castShadow />
            <mesh ref={el => { zipRightRef.current = el; }}
              position={[halfW - glassTh * 2, zipH / 2, 0]}
              material={zipFabricMat}>
              <boxGeometry args={[glassTh * 2, zipH, depth - postS * 2 - chW * 2 - 0.008]} />
            </mesh>
            <mesh ref={zipRightRailRef} position={[halfW - glassTh * 2, 0, 0]}>
              <boxGeometry args={[railH, railH, depth - postS * 2 - chW * 2]} />
              <meshStandardMaterial color={hex} roughness={0.38} metalness={0.28} />
            </mesh>
            {/* Floor traversa right */}
            <RoundedBox args={[floorRailH, floorRailH, depth - postS * 2]} radius={0.005} smoothness={4}
              position={[ halfW - floorRailH / 2, floorRailH / 2, 0]} material={frameMat} castShadow />
            <RoundedBox args={[postS + 0.02, trackH, postS + 0.02]} radius={0.010} smoothness={4}
              position={[ halfW - postS/2, trackH/2, halfD - postS/2]} material={frameMat} castShadow />

            {/* Upper triangular glass — 8° wedge above traversa */}
            <mesh position={[-halfW + glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[upperSideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
            <mesh position={[halfW - glassTh / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <shapeGeometry args={[upperSideShape]} />
              <meshStandardMaterial color="#c8e4ee" transparent opacity={0.22} roughness={0.04} metalness={0.05} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          </>
        );
      })()}

      {/* Roof glass */}
      <mesh geometry={roofGlassGeom}>
        <meshStandardMaterial color="#a8d0e0" transparent opacity={0.20}
          roughness={0.03} metalness={0.07} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Roof rafters */}
      {Array.from({ length: rafterCount }, (_, i) => {
        const x = -halfW + beamD + rafterSpacing * (i + 1);
        return (
          <RoundedBox key={i} args={[rafterD, rafterH, slopedLen]} radius={0.005} smoothness={4}
            rotation={[-pitchAngle, 0, 0]}
            position={[x, slopeCenterY, 0]} material={frameMat} castShadow />
        );
      })}

      {/* Dimension lines */}
      {showDimensions && (
        <>
          <DimensionLine from={[-halfW, backH+0.22, halfD+0.18]} to={[halfW, backH+0.22, halfD+0.18]}
            label={`${Math.round(width*1000)} mm`} tickDir={[0,0,1]} />
          <DimensionLine from={[halfW+0.2, frontH+0.06, -halfD]} to={[halfW+0.2, backH+0.06, halfD]}
            label={`${Math.round(depth*1000)} mm`} tickDir={[1,0,0]} />
          <DimensionLine from={[-halfW-0.22, 0, -halfD]} to={[-halfW-0.22, frontH, -halfD]}
            label={`${Math.round(frontH*1000)} mm`} tickDir={[1,0,0]} />
          <DimensionLine from={[-halfW-0.22, 0, halfD]} to={[-halfW-0.22, backH, halfD]}
            label={`${Math.round(backH*1000)} mm`} tickDir={[1,0,0]} />
        </>
      )}
    </group>
  );
};

const Loader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
      <span className="text-xs text-zinc-500">3D wird geladen…</span>
    </div>
  </div>
);

const ToggleSwitch = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
  <button onClick={onChange} className="flex items-center gap-2 cursor-pointer select-none">
    <div className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${checked ? "bg-[#344148]" : "bg-zinc-300"}`}>
      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`} />
    </div>
    <span className="text-xs text-zinc-600 font-medium">{label}</span>
  </button>
);

interface Wintergarten3DViewerProps {
  breite: number; tiefe: number; hoehe: number; color: string;
}

export const Wintergarten3DViewer = ({ breite, tiefe, hoehe, color }: Wintergarten3DViewerProps) => {
  const [showDimensions, setShowDimensions] = useState(false);
  const [sideSystem, setSideSystem] = useState<SideSystem>("none");
  const [faltOpen, setFaltOpen] = useState(true);
  const [schOpen, setSchOpen] = useState(false);
  const [zipDown, setZipDown] = useState(true);

  const w = breite / 1000;
  const d = tiefe / 1000;
  const backH = hoehe / 1000;
  const PITCH = 8 * Math.PI / 180;
  const frontH = Math.max(backH * 0.5, backH - d * Math.tan(PITCH));

  const maxDim = Math.max(w, d, backH);
  const camDist = maxDim * 1.5;

  return (
    <div className="relative h-full w-full" style={{ minHeight: 360 }}>
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          camera={{ position: [camDist*1.1, camDist*0.9, camDist*0.8], fov: 40, near: 0.1, far: 200 }}
          style={{ background: "#e8e8e8", position: "absolute", inset: 0, width: "100%", height: "calc(100% - 90px)" }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        >
          <ambientLight intensity={1.3} />
          <directionalLight position={[6,10,4]} intensity={1.0} castShadow
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-far={50} shadow-camera-left={-10} shadow-camera-right={10}
            shadow-camera-top={10} shadow-camera-bottom={-10} />
          <directionalLight position={[-4,6,-3]} intensity={0.5} color="#ffffff" />
          <directionalLight position={[0,-6,0]} intensity={0.55} color="#ffffff" />
          <hemisphereLight intensity={0.45} color="#d4ecf5" groundColor="#ffffff" />

          <WintergartenModel width={w} depth={d} backH={backH} frontH={frontH}
            color={color} showDimensions={showDimensions} sideSystem={sideSystem} faltOpen={faltOpen} schOpen={schOpen} zipDown={zipDown} />

          <OrbitControls enablePan={false} minPolarAngle={Math.PI/10} maxPolarAngle={Math.PI*0.82}
            minDistance={maxDim*0.7} maxDistance={maxDim*5} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Dimension badge */}
      <div className="pointer-events-none absolute left-3 rounded-lg bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
        style={{ bottom: 98 }}>
        {(breite/1000).toFixed(1)}m × {(tiefe/1000).toFixed(1)}m
      </div>

      {/* 3D hint */}
      <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs text-zinc-600 backdrop-blur">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
        </svg>
        3D drehen
      </div>

      {/* Control bar — 2 rows */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-white" style={{ height: 90 }}>

        {/* Row 1: Side system buttons */}
        <div className="flex items-center justify-center gap-1.5 px-3 pt-2 pb-1">
          {SIDE_SYSTEMS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSideSystem(value)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all border ${
                sideSystem === value
                  ? "bg-[#344148] text-white border-[#344148]"
                  : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Row 2: Maße toggle + Faltglas open/close */}
        <div className="flex items-center justify-center gap-6 pb-2">
          <ToggleSwitch checked={showDimensions} onChange={() => setShowDimensions(v => !v)} label="Maße anzeigen" />
          {sideSystem === "faltglas" && (
            <ToggleSwitch checked={faltOpen} onChange={() => setFaltOpen(v => !v)} label={faltOpen ? "Geöffnet" : "Geschlossen"} />
          )}
          {sideSystem === "schiebeglas" && (
            <ToggleSwitch checked={schOpen} onChange={() => setSchOpen(v => !v)} label={schOpen ? "Geöffnet" : "Geschlossen"} />
          )}
          {sideSystem === "zip" && (
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
        </div>
      </div>
    </div>
  );
};
