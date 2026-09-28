"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Ring({ radius, tube, speed, offset, color }: {
  radius: number;
  tube: number;
  speed: number;
  offset: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * speed + offset;
    meshRef.current.rotation.y = t * speed * 0.7 + offset;
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <torusGeometry args={[radius, tube, 32, 100]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.2}
          clearcoat={0.8}
        />
      </mesh>
    </Float>
  );
}

function RingsGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Ring radius={1.8} tube={0.04} speed={0.15} offset={0} color="#C0C0C0" />
      <Ring radius={2.2} tube={0.03} speed={-0.1} offset={1.2} color="#C9A96E" />
      <Ring radius={2.6} tube={0.025} speed={0.08} offset={2.4} color="#8A8782" />
      <Ring radius={3.0} tube={0.02} speed={-0.06} offset={3.6} color="#C0C0C0" />
    </group>
  );
}

export default function RingsScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[4, 4, 4]} intensity={1} color="#ffffff" />
        <directionalLight position={[-4, -2, -4]} intensity={0.3} color="#C9A96E" />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#C9A96E" />

        <RingsGroup />
        <Environment preset="city" environmentIntensity={0.3} />
      </Canvas>
    </div>
  );
}
