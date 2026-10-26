import React, { useMemo } from 'react';
import * as THREE from 'three';

export type EnvironmentType = 'modern-villa' | 'minimalist-concrete' | 'alpine-chalet';

interface ArchitecturalSceneProps {
  environmentType: EnvironmentType;
  lightingIntensity?: number;
}

export const ArchitecturalScene: React.FC<ArchitecturalSceneProps> = ({
  environmentType,
  lightingIntensity = 1.0,
}) => {
  // Concrete/Stone materials for the portal
  const floorMaterial = useMemo(() => {
    const isChalet = environmentType === 'alpine-chalet';
    const isConcrete = environmentType === 'minimalist-concrete';

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isChalet ? '#1a1816' : isConcrete ? '#242830' : '#14171d'),
      roughness: 0.35,
      metalness: 0.15,
    });
  }, [environmentType]);

  const wallMaterial = useMemo(() => {
    const isChalet = environmentType === 'alpine-chalet';
    const isConcrete = environmentType === 'minimalist-concrete';

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isChalet ? '#25211c' : isConcrete ? '#303642' : '#1c2028'),
      roughness: 0.75,
      metalness: 0.05,
    });
  }, [environmentType]);

  const ceilingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#16181f'),
      roughness: 0.8,
      metalness: 0.1,
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ================= ARCHITECTURAL ENTRANCE PORTAL ================= */}

      {/* 1. Travertine/Granite Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.45, 0]}
        receiveShadow
      >
        <planeGeometry args={[16, 16]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      {/* Exterior Entry Step / Plinth */}
      <mesh position={[0, -1.48, 1.2]} receiveShadow>
        <boxGeometry args={[4.2, 0.06, 2.4]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      {/* Recessed Linear Ground Uplight Slot */}
      <mesh position={[0, -1.44, 0.4]}>
        <boxGeometry args={[2.2, 0.01, 0.04]} />
        <meshBasicMaterial color="#d4a359" />
      </mesh>
      <pointLight
        position={[0, -1.4, 0.4]}
        color="#f59e0b"
        intensity={0.6 * lightingIntensity}
        distance={2.0}
      />

      {/* 2. Left Architectural Flank Wall */}
      <mesh position={[-1.6, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.6, 3.2, 0.8]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* 3. Right Architectural Flank Wall */}
      <mesh position={[1.6, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.6, 3.2, 0.8]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* 4. Overhead Cantilevered Concrete Soffit / Canopy */}
      <mesh position={[0, 1.7, 0.4]} receiveShadow castShadow>
        <boxGeometry args={[4.8, 0.35, 1.8]} />
        <primitive object={ceilingMaterial} attach="material" />
      </mesh>

      {/* Recessed Downlight Fixtures in Ceiling Soffit */}
      {[-0.8, 0, 0.8].map((x, idx) => (
        <group key={idx} position={[x, 1.52, 0.6]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.015, 24]} />
            <meshBasicMaterial color="#fff3db" />
          </mesh>
          <spotLight
            position={[0, 0, 0]}
            target-position={[x, -1.4, 0.6]}
            angle={0.45}
            penumbra={0.7}
            intensity={1.2 * lightingIntensity}
            color="#ffeacc"
            castShadow
          />
        </group>
      ))}

      {/* Sconce Wall Lights on Concrete Portal Flanks */}
      <group position={[-1.8, 0.2, 0.42]}>
        {/* Sleek Minimalist Vertical Sconce */}
        <mesh>
          <boxGeometry args={[0.04, 0.45, 0.06]} />
          <meshStandardMaterial color="#0c0e12" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[0.02, 0.42, 0.005]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <pointLight color="#f59e0b" intensity={0.5 * lightingIntensity} distance={1.8} />
      </group>

      <group position={[1.8, 0.2, 0.42]}>
        <mesh>
          <boxGeometry args={[0.04, 0.45, 0.06]} />
          <meshStandardMaterial color="#0c0e12" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[0.02, 0.42, 0.005]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <pointLight color="#f59e0b" intensity={0.5 * lightingIntensity} distance={1.8} />
      </group>

      {/* Interior Foyer Atmosphere (Visible through open door) */}
      <group position={[0, 0, -2.5]}>
        {/* Soft Warm Foyer Wall */}
        <mesh receiveShadow>
          <planeGeometry args={[10, 6]} />
          <meshStandardMaterial color="#1f232b" roughness={0.9} />
        </mesh>
        {/* Warm Ambient Foyer Chandelier Glow */}
        <pointLight
          position={[0, 1.2, 0.5]}
          color="#ffddaa"
          intensity={1.4 * lightingIntensity}
          distance={5.0}
        />
      </group>

      {/* Deep Atmospheric Horizon Fog / Shadow Plane */}
      <mesh position={[0, 0, -4.5]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial color="#07090c" />
      </mesh>
    </group>
  );
};
