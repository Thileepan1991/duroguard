import React from 'react';
import * as THREE from 'three';

interface ExplodedLayersProps {
  explodedProgress: number; // 0 (assembled) to 1 (fully exploded)
  finishHex: string;
  metalness: number;
  roughness: number;
}

export const ExplodedLayers: React.FC<ExplodedLayersProps> = ({
  explodedProgress,
  finishHex,
  metalness,
  roughness,
}) => {
  if (explodedProgress <= 0.01) return null;

  // Door leaf dimensions: width 1.4, height 2.8, base thickness 0.09
  const w = 1.36;
  const h = 2.76;
  const offset = explodedProgress * 0.35; // expansion distance along z

  return (
    <group position={[0, 0, 0]}>
      {/* LAYER 1: Exterior Armored Steel Skin (Front Z+) */}
      <group position={[0, 0, offset * 1.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, 0.012]} />
          <meshStandardMaterial
            color={finishHex}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={1.5}
          />
        </mesh>
        {/* Callout wireframe outline */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(w, h, 0.012)]} />
          <lineBasicMaterial color="#d4af37" transparent opacity={0.6 * explodedProgress} />
        </lineSegments>
      </group>

      {/* LAYER 2: 4mm Hardened Manganese Anti-Drill Plate */}
      <group position={[0, 0, offset * 0.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w * 0.96, h * 0.96, 0.008]} />
          <meshStandardMaterial
            color="#2a2e36"
            metalness={0.9}
            roughness={0.35}
            envMapIntensity={1.0}
          />
        </mesh>
      </group>

      {/* LAYER 3: Internal Tubular Steel Framework & Locking Rods */}
      <group position={[0, 0, offset * 0.3]}>
        {/* Perimeter tubular steel frame */}
        <mesh position={[0, h * 0.46, 0]} castShadow>
          <boxGeometry args={[w * 0.94, 0.04, 0.04]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -h * 0.46, 0]} castShadow>
          <boxGeometry args={[w * 0.94, 0.04, 0.04]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-w * 0.46, 0, 0]} castShadow>
          <boxGeometry args={[0.04, h * 0.92, 0.04]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[w * 0.46, 0, 0]} castShadow>
          <boxGeometry args={[0.04, h * 0.92, 0.04]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Diagonal and cross stiffeners */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[w * 0.9, 0.03, 0.03]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Vertical motorized locking transmission rods */}
        <mesh position={[w * 0.42, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, h * 0.88, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Central motorized lock gearbox module */}
        <mesh position={[w * 0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.09, 0.28, 0.045]} />
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* LAYER 4: High-Density High-Acoustic Rockwool Insulation Core */}
      <group position={[0, 0, -offset * 0.3]}>
        <mesh receiveShadow>
          <boxGeometry args={[w * 0.92, h * 0.94, 0.038]} />
          <meshStandardMaterial
            color="#8c7853" // mineral rockwool / acoustic insulation tone
            roughness={0.95}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* LAYER 5: Perimeter EPDM Double Gasket Acoustic Weatherseals */}
      <group position={[0, 0, -offset * 0.8]}>
        <mesh>
          <boxGeometry args={[w * 0.98, h * 0.98, 0.015]} />
          <meshStandardMaterial
            color="#14161a"
            roughness={0.8}
            metalness={0.2}
            wireframe={true}
          />
        </mesh>
      </group>

      {/* LAYER 6: Interior Architectural Steel/PVD Cladding (Back Z-) */}
      <group position={[0, 0, -offset * 1.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, 0.012]} />
          <meshStandardMaterial
            color={finishHex}
            metalness={metalness}
            roughness={roughness}
            envMapIntensity={1.4}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(w, h, 0.012)]} />
          <lineBasicMaterial color="#94a3b8" transparent opacity={0.6 * explodedProgress} />
        </lineSegments>
      </group>
    </group>
  );
};
