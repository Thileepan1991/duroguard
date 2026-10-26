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
      color: new THREE.Color(isChalet ? '#25211c' : isConcrete ? '#323946' : '#262c36'),
      roughness: 0.3,
      metalness: 0.2,
    });
  }, [environmentType]);

  const wallMaterial = useMemo(() => {
    const isChalet = environmentType === 'alpine-chalet';
    const isConcrete = environmentType === 'minimalist-concrete';

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(isChalet ? '#302a24' : isConcrete ? '#3d4654' : '#2d3340'),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, [environmentType]);

  const ceilingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#222733'),
      roughness: 0.7,
      metalness: 0.15,
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
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <pointLight
        position={[0, -1.4, 0.4]}
        color="#f59e0b"
        intensity={1.2 * lightingIntensity}
        distance={2.5}
      />

      {/* Architectural Halo Reveal Frame behind the door */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[1.62, 3.02, 0.04]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.8 * lightingIntensity}
          roughness={0.4}
        />
      </mesh>

      {/* 2. Left Architectural Flank Wall - Recessed slightly */}
      <mesh position={[-1.8, 0.1, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[1.8, 3.2, 0.45]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* 3. Right Architectural Flank Wall - Recessed slightly */}
      <mesh position={[1.8, 0.1, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[1.8, 3.2, 0.45]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      {/* 4. Overhead Cantilevered Concrete Soffit / Canopy */}
      <mesh position={[0, 1.7, 0.4]} receiveShadow castShadow>
        <boxGeometry args={[4.8, 0.35, 1.8]} />
        <primitive object={ceilingMaterial} attach="material" />
      </mesh>

      {/* Direct Key Spot Light on Door Leaf */}
      <spotLight
        position={[0, 3.2, 3.2]}
        target-position={[0, 0, 0]}
        angle={0.65}
        penumbra={0.7}
        intensity={2.8 * lightingIntensity}
        color="#fffaf0"
        castShadow
      />

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
