import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SteelDoorModel } from './SteelDoorModel';
import { ArchitecturalScene } from './ArchitecturalScene';
import type { EnvironmentType } from './ArchitecturalScene';
import { AnnotationHotspots } from './AnnotationHotspots';
import type { Hotspot } from './AnnotationHotspots';
import type { FinishOption, HandleOption } from '../../config/productsData';

interface CameraRigProps {
  scrollProgress: number; // 0 to 1
  isOrbitMode: boolean;
  selectedHotspot: Hotspot | null;
}

const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgress,
  isOrbitMode,
  selectedHotspot
}) => {
  const targetPos = useRef(new THREE.Vector3(0.3, 0.0, 4.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (isOrbitMode) return; // OrbitControls handles camera in free mode

    if (selectedHotspot) {
      // Zoom in towards selected hotspot
      targetPos.current.set(
        selectedHotspot.position[0] + 0.35,
        selectedHotspot.position[1] + 0.1,
        selectedHotspot.position[2] + 1.2
      );
      targetLookAt.current.set(
        selectedHotspot.position[0],
        selectedHotspot.position[1],
        selectedHotspot.position[2]
      );
    } else {
      // Cinematic Scroll Waypoints
      if (scrollProgress < 0.2) {
        // Hero: cinematic approach
        const t = scrollProgress / 0.2;
        targetPos.current.set(
          THREE.MathUtils.lerp(0.3, 0.1, t),
          THREE.MathUtils.lerp(0.1, 0.0, t),
          THREE.MathUtils.lerp(4.4, 3.4, t)
        );
        targetLookAt.current.set(0, 0, 0);
      } else if (scrollProgress < 0.45) {
        // Engineering Anatomy: 3/4 perspective for exploded view
        const t = (scrollProgress - 0.2) / 0.25;
        targetPos.current.set(
          THREE.MathUtils.lerp(0.1, 1.4, t),
          THREE.MathUtils.lerp(0.0, 0.3, t),
          THREE.MathUtils.lerp(3.4, 3.1, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0, 0.2, t),
          THREE.MathUtils.lerp(0, 0.1, t),
          0
        );
      } else if (scrollProgress < 0.7) {
        // Lock and hardware close-up
        const t = (scrollProgress - 0.45) / 0.25;
        targetPos.current.set(
          THREE.MathUtils.lerp(1.4, 0.8, t),
          THREE.MathUtils.lerp(0.3, 0.05, t),
          THREE.MathUtils.lerp(3.1, 2.0, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0.2, 0.5, t),
          0,
          0
        );
      } else {
        // Finish Customization / Grand Showcase
        const t = (scrollProgress - 0.7) / 0.3;
        targetPos.current.set(
          THREE.MathUtils.lerp(0.8, 0.4, t),
          THREE.MathUtils.lerp(0.05, 0.1, t),
          THREE.MathUtils.lerp(2.0, 3.6, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0.5, 0, t),
          0,
          0
        );
      }
    }

    // Smooth dampening
    state.camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(delta * 3.5, 0, 0.2));
    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

interface DoorCanvasProps {
  finish: FinishOption;
  handle: HandleOption;
  scrollProgress: number;
  openProgress: number;
  explodedProgress: number;
  isLocked: boolean;
  hasLedAccent: boolean;
  isOrbitMode: boolean;
  environmentType: EnvironmentType;
  doorStyle?: string;
  showHotspots?: boolean;
  onToggleOpen?: () => void;
  onSelectHotspot?: (hotspot: Hotspot | null) => void;
}

export const DoorCanvas: React.FC<DoorCanvasProps> = ({
  finish,
  handle,
  scrollProgress,
  openProgress,
  explodedProgress,
  isLocked,
  hasLedAccent,
  isOrbitMode,
  environmentType,
  doorStyle = 'monolith',
  showHotspots = true,
  onToggleOpen,
  onSelectHotspot,
}) => {
  const [selectedHotspot, setSelectedHotspot] = React.useState<Hotspot | null>(null);

  const handleHotspotClick = (h: Hotspot | null) => {
    setSelectedHotspot(h);
    onSelectHotspot?.(h);
  };

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{
          position: [0.3, 0.1, 4.2],
          fov: 42,
          near: 0.1,
          far: 25,
        }}
        dpr={[1, 2]} // Crisp rendering on high-DPI screens
      >
        <color attach="background" args={['#080a0d']} />
        <fog attach="fog" args={['#080a0d', 5, 18]} />

        {/* Global Lights */}
        <ambientLight intensity={0.45} />

        {/* Key Studio / Sun Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color="#fffaf0"
        />

        {/* Cool Rim / Glint Light for Brushed Stainless Precision */}
        <directionalLight
          position={[-4, 3, -2]}
          intensity={1.2}
          color="#94a3b8"
        />

        {/* Architectural Low Fill */}
        <directionalLight
          position={[0, -2, 3]}
          intensity={0.3}
          color="#cbd5e1"
        />

        <Suspense fallback={null}>
          <ArchitecturalScene environmentType={environmentType} />

          <SteelDoorModel
            finish={finish}
            handle={handle}
            openProgress={openProgress}
            explodedProgress={explodedProgress}
            isLocked={isLocked}
            hasLedAccent={hasLedAccent}
            onToggleOpen={onToggleOpen}
            doorStyle={doorStyle}
          />

          <AnnotationHotspots
            visible={showHotspots && !isOrbitMode}
            onSelectHotspot={handleHotspotClick}
          />
        </Suspense>

        {/* Orbit Controls (Active when user clicks Inspect / Orbit Mode) */}
        {isOrbitMode ? (
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
            minDistance={1.2}
            maxDistance={7}
            target={[0, 0, 0]}
          />
        ) : (
          <CameraRig
            scrollProgress={scrollProgress}
            isOrbitMode={isOrbitMode}
            selectedHotspot={selectedHotspot}
          />
        )}
      </Canvas>
    </div>
  );
};
