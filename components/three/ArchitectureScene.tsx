"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function Monolith({ position, height, color }: {
  position: [number, number, number];
  height: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.3 + position[0]) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, height, 0.3]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.85}
        roughness={0.2}
        envMapIntensity={1}
        clearcoat={0.5}
      />
    </mesh>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshPhysicalMaterial
        color="#0A0A0A"
        metalness={0.9}
        roughness={0.3}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

function ArchitectureGroup() {
  const groupRef = useRef<THREE.Group>(null);

  const monoliths = useMemo(() => {
    const items: { pos: [number, number, number]; h: number; c: string }[] = [];
    const colors = ["#1a1a1a", "#222222", "#1a1a1a", "#2a2a2a", "#1a1a1a"];
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10 - 3;
      const h = 1 + Math.random() * 3;
      items.push({ pos: [x, -2.5 + h / 2, z], h, c: colors[i % colors.length] });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow camera drift
    groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Floor />
      {monoliths.map((m, i) => (
        <Monolith key={i} position={m.pos} height={m.h} color={m.c} />
      ))}
    </group>
  );
}

export default function ArchitectureScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.08} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.2} color="#C9A96E" />
        <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={0.6} color="#ffffff" />

        <ArchitectureGroup />
        <Environment preset="city" environmentIntensity={0.25} />
      </Canvas>
    </div>
  );
}
