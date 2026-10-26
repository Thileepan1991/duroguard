import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { FinishOption, HandleOption } from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { ExplodedLayers } from './ExplodedLayers';

interface SteelDoorModelProps {
  finish: FinishOption;
  handle: HandleOption;
  openProgress: number; // 0 (closed) to 1 (fully open)
  explodedProgress: number; // 0 (assembled) to 1 (exploded)
  isLocked: boolean;
  hasLedAccent: boolean;
  onToggleOpen?: () => void;
  doorStyle?: string; // 'fluted' | 'monolith' | 'geometric' | 'glass-corten'
}

export const SteelDoorModel: React.FC<SteelDoorModelProps> = ({
  finish,
  handle,
  openProgress,
  explodedProgress,
  isLocked,
  hasLedAccent,
  onToggleOpen,
  doorStyle = 'monolith'
}) => {
  const pivotGroupRef = useRef<THREE.Group>(null);
  const deadboltsRef = useRef<THREE.Group>(null);

  // Door dimensions
  const doorWidth = 1.36;
  const doorHeight = 2.76;
  const doorThickness = 0.09;
  const pivotOffset = -0.42; // offset from center along x

  // Target angle: max 78 degrees (approx 1.36 radians)
  const targetAngle = openProgress * 1.36;

  // Frame dimensions
  const frameWidth = 1.48;
  const frameHeight = 2.88;
  const frameDepth = 0.22;
  const frameJambThickness = 0.06;

  // Dynamic procedural materials
  const mainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(finish.hex),
      metalness: finish.metalness,
      roughness: finish.roughness,
      envMapIntensity: 1.4,
    });
  }, [finish.hex, finish.metalness, finish.roughness]);

  const frameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#15171b'),
      metalness: 0.7,
      roughness: 0.45,
      envMapIntensity: 0.8,
    });
  }, []);

  const stainlessMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      metalness: 0.98,
      roughness: 0.18,
      envMapIntensity: 1.8,
    });
  }, []);

  const ledAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fff0d4'),
      emissive: new THREE.Color(hasLedAccent ? '#f59e0b' : '#332211'),
      emissiveIntensity: hasLedAccent ? 3.0 : 0.2,
      roughness: 0.3,
    });
  }, [hasLedAccent]);

  // Smooth lerp on each frame
  useFrame((_, delta) => {
    if (pivotGroupRef.current) {
      pivotGroupRef.current.rotation.y = THREE.MathUtils.damp(
        pivotGroupRef.current.rotation.y,
        targetAngle,
        6,
        delta
      );
    }

    if (deadboltsRef.current) {
      // If locked, deadbolt pins extend outwards (x offset = 0.025m)
      const targetPinX = isLocked ? 0.025 : 0;
      deadboltsRef.current.position.x = THREE.MathUtils.damp(
        deadboltsRef.current.position.x,
        targetPinX,
        12,
        delta
      );
    }
  });

  // Vertical fluted slats generation (if fluted style selected)
  const flutedSlatCount = 22;
  const slats = useMemo(() => {
    return Array.from({ length: flutedSlatCount }).map((_, i) => {
      const step = (doorWidth * 0.88) / flutedSlatCount;
      const x = -doorWidth * 0.44 + i * step + step / 2;
      return x;
    });
  }, [doorWidth]);

  return (
    <group position={[0, 0, 0]}>
      {/* ================= FIXED FRAME & REVEAL ================= */}
      <group position={[0, 0, 0]}>
        {/* Left Vertical Jamb */}
        <mesh position={[-frameWidth / 2 + frameJambThickness / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[frameJambThickness, frameHeight, frameDepth]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>

        {/* Right Vertical Jamb (Strike plate side) */}
        <mesh position={[frameWidth / 2 - frameJambThickness / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[frameJambThickness, frameHeight, frameDepth]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>

        {/* Frame Strike Plates with precision CNC receptor cutouts */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((yPos, idx) => (
          <group key={idx} position={[frameWidth / 2 - frameJambThickness - 0.002, yPos, 0]}>
            <mesh>
              <boxGeometry args={[0.004, 0.12, 0.03]} />
              <primitive object={stainlessMaterial} attach="material" />
            </mesh>
            {/* Strike pocket cavity */}
            <mesh position={[0.005, 0, 0]}>
              <boxGeometry args={[0.015, 0.08, 0.022]} />
              <meshBasicMaterial color="#050608" />
            </mesh>
          </group>
        ))}

        {/* Top Header Transom Frame */}
        <mesh position={[0, frameHeight / 2 - frameJambThickness / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[frameWidth, frameJambThickness, frameDepth]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>

        {/* Architectural Stainless Steel Flush Sill / Threshold */}
        <mesh position={[0, -frameHeight / 2 + 0.015, 0]} receiveShadow>
          <boxGeometry args={[frameWidth, 0.03, frameDepth + 0.06]} />
          <primitive object={stainlessMaterial} attach="material" />
        </mesh>

        {/* Bottom Pivot Floor Receiver Plate (Round 316 Stainless Disk) */}
        <mesh position={[pivotOffset, -frameHeight / 2 + 0.031, 0]} receiveShadow>
          <cylinderGeometry args={[0.085, 0.085, 0.006, 32]} />
          <primitive object={stainlessMaterial} attach="material" />
        </mesh>

        {/* Top Pivot Ceiling Spindle Receiver */}
        <mesh position={[pivotOffset, frameHeight / 2 - frameJambThickness - 0.008, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.016, 32]} />
          <primitive object={stainlessMaterial} attach="material" />
        </mesh>
      </group>

      {/* ================= PIVOT ROTATION GROUP ================= */}
      {/* Positioned at genuine offset pivot axis */}
      <group ref={pivotGroupRef} position={[pivotOffset, 0, 0]}>
        {/* Child container shifted inversely so door leaf remains centered properly */}
        <group position={[-pivotOffset, 0, 0]}>
          {/* Top Pivot Spindle Pin */}
          <mesh position={[pivotOffset, doorHeight / 2 + 0.02, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.045, 24]} />
            <primitive object={stainlessMaterial} attach="material" />
          </mesh>

          {/* Bottom Pivot Heavy-Duty Hydraulic Spindle Bearing */}
          <mesh position={[pivotOffset, -doorHeight / 2 - 0.02, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.045, 24]} />
            <primitive object={stainlessMaterial} attach="material" />
          </mesh>

          {/* Exploded Engineering Anatomy (Active when explodedProgress > 0) */}
          <ExplodedLayers
            explodedProgress={explodedProgress}
            finishHex={finish.hex}
            metalness={finish.metalness}
            roughness={finish.roughness}
          />

          {/* Main Assembled Door Leaf (Fades or hides during exploded mode) */}
          {explodedProgress < 0.95 && (
            <group
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playTactileClick();
                onToggleOpen?.();
              }}
            >
              {/* Primary Heavy Steel Monolithic Core & Faceplates */}
              <mesh
                castShadow
                receiveShadow
                position={[0, 0, 0]}
              >
                <boxGeometry args={[doorWidth, doorHeight, doorThickness]} />
                <primitive object={mainMaterial} attach="material" />
              </mesh>

              {/* Edge Stainless Protective Banding */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[doorWidth + 0.002, doorHeight + 0.002, 0.004]} />
                <primitive object={stainlessMaterial} attach="material" />
              </mesh>

              {/* Architectural Shadow Grooves (Vertical Minimalist Haillines) */}
              {[-0.3, 0.1, 0.35].map((xOffset, i) => (
                <mesh key={i} position={[xOffset, 0, doorThickness / 2 + 0.001]}>
                  <boxGeometry args={[0.006, doorHeight * 0.95, 0.002]} />
                  <meshBasicMaterial color="#0a0c10" />
                </mesh>
              ))}

              {/* STYLE VARIATION: 3D Vertical Fluted Ribs */}
              {doorStyle === 'fluted' && (
                <group position={[0, 0, doorThickness / 2 + 0.01]}>
                  {slats.map((xVal, idx) => (
                    <mesh key={idx} position={[xVal, 0, 0]} castShadow>
                      <boxGeometry args={[0.018, doorHeight * 0.96, 0.02]} />
                      <primitive object={mainMaterial} attach="material" />
                    </mesh>
                  ))}
                </group>
              )}

              {/* STYLE VARIATION: Glass & Steel Central Translucent Slit */}
              {doorStyle === 'glass-corten' && (
                <group position={[0.2, 0, 0]}>
                  <mesh>
                    <boxGeometry args={[0.22, doorHeight * 0.92, 0.03]} />
                    <meshPhysicalMaterial
                      color="#0c1218"
                      transmission={0.65}
                      opacity={0.88}
                      transparent={true}
                      roughness={0.1}
                      ior={1.52}
                      metalness={0.1}
                    />
                  </mesh>
                  {/* Subtle warm backlight through glass */}
                  <pointLight
                    position={[0, 0, -0.05]}
                    color="#f59e0b"
                    intensity={0.6}
                    distance={1.5}
                  />
                </group>
              )}

              {/* ================= HARDWARE & HANDLES ================= */}
              {/* Type 1: Full-Height Linear Recessed LED Channel */}
              {handle.type === 'recessed-led' && (
                <group position={[doorWidth / 2 - 0.16, 0, 0]}>
                  {/* Recessed Pocket Shell */}
                  <mesh position={[0, 0, doorThickness / 2 + 0.001]} castShadow>
                    <boxGeometry args={[0.045, 2.3, 0.025]} />
                    <primitive object={frameMaterial} attach="material" />
                  </mesh>
                  {/* Glowing 2700K Linear LED Diffuser Strip */}
                  <mesh position={[0, 0, doorThickness / 2 + 0.01]}>
                    <boxGeometry args={[0.018, 2.26, 0.005]} />
                    <primitive object={ledAccentMaterial} attach="material" />
                  </mesh>
                  {/* Subtle point light along handle */}
                  {hasLedAccent && (
                    <pointLight
                      position={[0, 0, doorThickness / 2 + 0.05]}
                      color="#f59e0b"
                      intensity={0.8}
                      distance={1.2}
                    />
                  )}
                </group>
              )}

              {/* Type 2: Solid 316 Machined Steel Bar */}
              {handle.type === 'machined-bar' && (
                <group position={[doorWidth / 2 - 0.18, 0, doorThickness / 2 + 0.06]}>
                  {/* Main Rectilinear Steel Bar */}
                  <mesh castShadow>
                    <boxGeometry args={[0.035, 1.8, 0.035]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                  {/* Standoff Mounts (Top and Bottom) */}
                  <mesh position={[0, 0.7, -0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.015, 0.015, 0.06, 24]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                  <mesh position={[0, -0.7, -0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.015, 0.015, 0.06, 24]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                </group>
              )}

              {/* Type 3: Integrated Biometric Sensor Pull */}
              {handle.type === 'biometric-flush' && (
                <group position={[doorWidth / 2 - 0.16, 0, doorThickness / 2 + 0.008]}>
                  {/* Outer Bezel */}
                  <mesh castShadow>
                    <boxGeometry args={[0.055, 1.2, 0.016]} />
                    <primitive object={frameMaterial} attach="material" />
                  </mesh>
                  {/* Capacitive Fingerprint / Optical Scanner Window */}
                  <mesh position={[0, 0.35, 0.009]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.018, 0.018, 0.004, 32]} />
                    <meshBasicMaterial color={isLocked ? '#ef4444' : '#10b981'} />
                  </mesh>
                  {/* Grip recess strip */}
                  <mesh position={[-0.01, -0.1, 0.005]}>
                    <boxGeometry args={[0.02, 0.7, 0.006]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                </group>
              )}

              {/* Type 4: Sculpted Monolith Architectural Push Plate */}
              {handle.type === 'sculpted-slab' && (
                <group position={[doorWidth / 2 - 0.18, 0, doorThickness / 2 + 0.02]}>
                  <mesh castShadow>
                    <boxGeometry args={[0.08, 0.85, 0.03]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                  <mesh position={[0, 0, 0.016]}>
                    <boxGeometry args={[0.05, 0.8, 0.004]} />
                    <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.3} />
                  </mesh>
                </group>
              )}

              {/* ================= MOTORIZED DEADBOLT PINS ================= */}
              {/* Located on the latching edge (x = doorWidth/2) */}
              <group ref={deadboltsRef} position={[0, 0, 0]}>
                {[-0.8, -0.4, 0, 0.4, 0.8].map((yPos, i) => (
                  <mesh
                    key={i}
                    position={[doorWidth / 2, yPos, 0]}
                    rotation={[0, 0, Math.PI / 2]}
                    castShadow
                  >
                    <cylinderGeometry args={[0.01, 0.01, 0.035, 24]} />
                    <primitive object={stainlessMaterial} attach="material" />
                  </mesh>
                ))}
              </group>

              {/* Brand Hallmark Emblem (Laser-engraved FERROLUX crest) */}
              <mesh position={[0, -doorHeight / 2 + 0.15, doorThickness / 2 + 0.001]}>
                <planeGeometry args={[0.12, 0.02]} />
                <meshStandardMaterial
                  color="#d4af37"
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
};
