import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SteelDoorModel } from './SteelDoorModel';
import { ArchitecturalScene } from './ArchitecturalScene';
import type { EnvironmentType } from './ArchitecturalScene';
import { AnnotationHotspots } from './AnnotationHotspots';
import type { Hotspot } from './AnnotationHotspots';
import type { FinishOption, HandleOption } from '../../config/productsData';

export type CameraPreset = 'front' | 'pivot' | 'exploded' | 'lock' | 'orbit';

interface CameraRigProps {
  cameraPreset: CameraPreset;
  isOrbitMode: boolean;
  selectedHotspot: Hotspot | null;
}

const CameraRig: React.FC<CameraRigProps> = ({
  cameraPreset,
  isOrbitMode,
  selectedHotspot
}) => {
  const targetPos = useRef(new THREE.Vector3(0, 0.05, 3.4));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (isOrbitMode) return; // OrbitControls handles camera in free mode

    const isMobile = state.viewport.width < 5.0 || (typeof window !== 'undefined' && window.innerWidth < 768);
    const zOffset = isMobile ? 0.6 : 0;

    if (selectedHotspot) {
      // Zoom in towards selected technical hotspot
      targetPos.current.set(
        selectedHotspot.position[0] + 0.35,
        selectedHotspot.position[1] + 0.1,
        selectedHotspot.position[2] + 1.25 + zOffset
      );
      targetLookAt.current.set(
        selectedHotspot.position[0],
        selectedHotspot.position[1],
        selectedHotspot.position[2]
      );
    } else {
      switch (cameraPreset) {
        case 'front':
          targetPos.current.set(0, 0.05, 3.4 + zOffset);
          targetLookAt.current.set(0, 0, 0);
          break;
        case 'pivot':
          // 3/4 perspective emphasizing the grand pivot spindle & clearance
          targetPos.current.set(1.05, 0.15, 2.95 + zOffset);
          targetLookAt.current.set(0.12, 0, 0);
          break;
        case 'exploded':
          // Elevated 3/4 angle showcasing all 6 separated defensive layers
          targetPos.current.set(1.4, 0.35, 2.85 + zOffset);
          targetLookAt.current.set(0.15, 0.05, 0);
          break;
        case 'lock':
          // Macro focus on right jamb strike plate pockets and deadbolts
          targetPos.current.set(0.85, 0.05, 1.75 + zOffset * 0.5);
          targetLookAt.current.set(0.55, 0, 0);
          break;
        default:
          targetPos.current.set(0, 0.05, 3.4 + zOffset);
          targetLookAt.current.set(0, 0, 0);
          break;
      }
    }

    // Smooth cinematic dampening
    state.camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(delta * 4.2, 0, 0.25));
    state.camera.lookAt(targetLookAt.current);
  });

  return null;
};

export interface DoorCanvasProps {
  finish: FinishOption;
  handle: HandleOption;
  openProgress: number;
  explodedProgress: number;
  isLocked: boolean;
  hasLedAccent: boolean;
  isOrbitMode: boolean;
  environmentType: EnvironmentType;
  doorStyle?: string;
  showHotspots?: boolean;
  cameraPreset?: CameraPreset;
  onToggleOpen?: () => void;
  onSelectHotspot?: (hotspot: Hotspot | null) => void;
}

export const DoorCanvas: React.FC<DoorCanvasProps> = ({
  finish,
  handle,
  openProgress,
  explodedProgress,
  isLocked,
  hasLedAccent,
  isOrbitMode,
  environmentType,
  doorStyle = 'monolith',
  showHotspots = true,
  cameraPreset = 'front',
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
          position: [0, 0.05, 3.4],
          fov: 42,
          near: 0.1,
          far: 35,
        }}
        dpr={[1, 2]} // Crisp rendering on Retina/high-DPI screens
      >
        <color attach="background" args={['#080a0f']} />

        {/* ================= PROCEDURAL STUDIO ENVIRONMENT ================= */}
        {/* Generates brilliant HDR specular reflections for brushed metal, stainless 316 & steel */}
        <Environment resolution={512}>
          {/* Overhead Main Softbox */}
          <Lightformer
            form="rect"
            intensity={3.8}
            position={[0, 6, -1]}
            scale={[14, 6, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          {/* Right Front Key Light */}
          <Lightformer
            form="rect"
            intensity={4.2}
            position={[4, 2, 3]}
            scale={[5, 8, 1]}
            target={[0, 0, 0]}
            color="#f8fafc"
          />
          {/* Left Rim Cool Metallic Strip */}
          <Lightformer
            form="rect"
            intensity={3.4}
            position={[-5, 2, -1]}
            scale={[3, 9, 1]}
            target={[0, 0, 0]}
            color="#93c5fd"
          />
          {/* Front Specular Glint Strip */}
          <Lightformer
            form="rect"
            intensity={2.8}
            position={[0, 0, 5]}
            scale={[8, 3, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          {/* Warm Architectural Ground Accent */}
          <Lightformer
            form="circle"
            intensity={2.0}
            position={[0, -2, 2]}
            scale={3}
            target={[0, 0, 0]}
            color="#f59e0b"
          />
        </Environment>

        {/* Global Ambient Fill */}
        <ambientLight intensity={0.95} />

        {/* Key Studio Sun/Spot Light with castShadow */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Cool Rim / Glint Light for Brushed Stainless Precision */}
        <directionalLight
          position={[-4, 4, 2]}
          intensity={2.2}
          color="#cbd5e1"
        />

        {/* Front Architectural Fill Light - illuminates door surface directly */}
        <directionalLight
          position={[0, 1.5, 5]}
          intensity={2.0}
          color="#f8fafc"
        />

        {/* Warm Portal Ground Uplight */}
        <pointLight
          position={[0, -1.3, 0.6]}
          intensity={1.6}
          color="#f59e0b"
          distance={3.5}
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
            visible={showHotspots && !isOrbitMode && cameraPreset !== 'exploded'}
            onSelectHotspot={handleHotspotClick}
          />

          {/* Contact Shadows grounding the door on the travertine floor */}
          <ContactShadows
            position={[0, -1.44, 0]}
            opacity={0.82}
            scale={10}
            blur={1.8}
            far={2.5}
          />
        </Suspense>

        {/* Orbit Controls (Active in Orbit Mode) */}
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
            cameraPreset={cameraPreset}
            isOrbitMode={isOrbitMode}
            selectedHotspot={selectedHotspot}
          />
        )}
      </Canvas>
    </div>
  );
};
