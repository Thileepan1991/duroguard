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
  const targetPos = useRef(new THREE.Vector3(-0.45, 0.08, 3.5));
  const targetLookAt = useRef(new THREE.Vector3(0.3, 0, 0));

  useFrame((state, delta) => {
    if (isOrbitMode) return; // OrbitControls handles camera in free mode

    const isDesktop = state.viewport.width > 7.0 || (typeof window !== 'undefined' && window.innerWidth >= 1024);
    const heroCameraX = isDesktop ? -0.55 : 0;
    const heroTargetX = isDesktop ? 0.35 : 0;

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
        // Hero: framed clearly in view
        const t = scrollProgress / 0.2;
        targetPos.current.set(
          THREE.MathUtils.lerp(heroCameraX, heroCameraX * 0.4, t),
          THREE.MathUtils.lerp(0.08, 0.0, t),
          THREE.MathUtils.lerp(3.5, 3.0, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(heroTargetX, 0.1, t),
          0,
          0
        );
      } else if (scrollProgress < 0.45) {
        // Engineering Anatomy: 3/4 perspective for exploded view
        const t = (scrollProgress - 0.2) / 0.25;
        targetPos.current.set(
          THREE.MathUtils.lerp(heroCameraX * 0.4, 1.2, t),
          THREE.MathUtils.lerp(0.0, 0.25, t),
          THREE.MathUtils.lerp(3.0, 2.9, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0.1, 0.15, t),
          THREE.MathUtils.lerp(0, 0.05, t),
          0
        );
      } else if (scrollProgress < 0.7) {
        // Lock and hardware close-up
        const t = (scrollProgress - 0.45) / 0.25;
        targetPos.current.set(
          THREE.MathUtils.lerp(1.2, 0.75, t),
          THREE.MathUtils.lerp(0.25, 0.05, t),
          THREE.MathUtils.lerp(2.9, 1.9, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0.15, 0.48, t),
          0,
          0
        );
      } else {
        // Finish Customization / Grand Showcase
        const t = (scrollProgress - 0.7) / 0.3;
        targetPos.current.set(
          THREE.MathUtils.lerp(0.75, heroCameraX * 0.7, t),
          THREE.MathUtils.lerp(0.05, 0.08, t),
          THREE.MathUtils.lerp(1.9, 3.4, t)
        );
        targetLookAt.current.set(
          THREE.MathUtils.lerp(0.48, heroTargetX * 0.8, t),
          0,
          0
        );
      }
    }

    // Smooth dampening
    state.camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(delta * 3.5, 0, 0.2));
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
          position: [-0.45, 0.08, 3.5],
          fov: 42,
          near: 0.1,
          far: 35,
        }}
        dpr={[1, 2]} // Crisp rendering on high-DPI screens
      >
        <color attach="background" args={['#090c12']} />

        {/* ================= PROCEDURAL STUDIO ENVIRONMENT ================= */}
        {/* Generates brilliant HDR specular reflections for brushed metal and steel */}
        <Environment resolution={512}>
          {/* Overhead Main Softbox */}
          <Lightformer
            form="rect"
            intensity={3.5}
            position={[0, 6, -1]}
            scale={[14, 6, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          {/* Right Front Key Light */}
          <Lightformer
            form="rect"
            intensity={4.0}
            position={[4, 2, 3]}
            scale={[5, 8, 1]}
            target={[0, 0, 0]}
            color="#f8fafc"
          />
          {/* Left Rim Cool Metallic Strip */}
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[-5, 2, -1]}
            scale={[3, 9, 1]}
            target={[0, 0, 0]}
            color="#93c5fd"
          />
          {/* Front Specular Glint Strip */}
          <Lightformer
            form="rect"
            intensity={2.5}
            position={[0, 0, 5]}
            scale={[8, 3, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          {/* Warm Architectural Ground Accent */}
          <Lightformer
            form="circle"
            intensity={1.8}
            position={[0, -2, 2]}
            scale={3}
            target={[0, 0, 0]}
            color="#f59e0b"
          />
        </Environment>

        {/* Global Ambient Fill */}
        <ambientLight intensity={0.9} />

        {/* Key Studio Sun/Spot Light */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Cool Rim / Glint Light for Brushed Stainless Precision */}
        <directionalLight
          position={[-4, 4, 2]}
          intensity={2.0}
          color="#cbd5e1"
        />

        {/* Front Architectural Fill Light - illuminates door surface directly */}
        <directionalLight
          position={[0, 1.5, 5]}
          intensity={1.8}
          color="#f8fafc"
        />

        {/* Warm Portal Ground Uplight */}
        <pointLight
          position={[0, -1.3, 0.6]}
          intensity={1.4}
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
            visible={showHotspots && !isOrbitMode}
            onSelectHotspot={handleHotspotClick}
          />

          {/* Contact Shadows grounding the door on the travertine floor */}
          <ContactShadows
            position={[0, -1.44, 0]}
            opacity={0.8}
            scale={10}
            blur={1.8}
            far={2.5}
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
