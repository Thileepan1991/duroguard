import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { soundFX } from '../../utils/audioSynthesizer';

export interface Hotspot {
  id: string;
  title: string;
  category: string;
  position: [number, number, number];
  spec: string;
  detail: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'pivot-hinge',
    title: '3D Offset Hydraulic Pivot Spindle',
    category: 'Kinematics',
    position: [-0.45, -1.35, 0.08],
    spec: '800 kg load rating • 1,000,000 cycle tested',
    detail: 'Concealed in-floor stainless steel bearing assembly with dual-speed hydraulic latching and 3-axis on-site alignment.'
  },
  {
    id: 'multi-lock',
    title: '7-Point Motorized Deadbolts',
    category: 'Security',
    position: [0.65, 0.1, 0.08],
    spec: 'EN 1627 Class RC4 / RC5 anti-drill protection',
    detail: 'Case-hardened steel pins with manganese rotary escutcheons resisting electric drills, hydraulic wedges, and saws.'
  },
  {
    id: 'laser-weld',
    title: 'Robotic Fiber-Laser Seams',
    category: 'Manufacturing',
    position: [0.62, 1.3, 0.08],
    spec: '±0.2mm aerospace tolerance • Continuous weld',
    detail: 'Hermetically sealed perimeter seams executed in an inert argon chamber to prevent atmospheric oxidation.'
  },
  {
    id: 'thermal-core',
    title: 'Acoustic & Fire Barrier Sandwich',
    category: 'Thermal & Fire',
    position: [-0.1, 0.5, 0.08],
    spec: 'Ud = 0.78 W/m²K • 48 dB sound dampening • EI 60/90',
    detail: 'Hydrophobic high-density basalt rockwool bonded with thermoset elastomer to eliminate resonance and heat transfer.'
  }
];

interface AnnotationHotspotsProps {
  visible: boolean;
  onSelectHotspot?: (hotspot: Hotspot | null) => void;
}

export const AnnotationHotspots: React.FC<AnnotationHotspotsProps> = ({
  visible,
  onSelectHotspot
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {HOTSPOTS.map((spot) => {
        const isActive = activeId === spot.id;

        return (
          <group key={spot.id} position={spot.position}>
            {/* 3D Pulse Anchor Ring */}
            <mesh>
              <ringGeometry args={[0.025, 0.038, 32]} />
              <meshBasicMaterial color={isActive ? '#ffffff' : '#d4af37'} side={2} />
            </mesh>
            <mesh>
              <circleGeometry args={[0.015, 32]} />
              <meshBasicMaterial color={isActive ? '#d4af37' : '#0c0e12'} side={2} />
            </mesh>

            {/* Interactive HTML Card */}
            <Html
              position={[0.05, 0.05, 0]}
              center={false}
              distanceFactor={8}
              zIndexRange={[100, 0]}
            >
              <div className="select-none pointer-events-auto">
                {!isActive ? (
                  <button
                    onClick={() => {
                      soundFX.playTactileClick();
                      setActiveId(spot.id);
                      onSelectHotspot?.(spot);
                    }}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-white border border-amber-500/50 hover:border-amber-400 backdrop-blur-md shadow-lg transition-all transform hover:scale-105 cursor-pointer whitespace-nowrap group"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-[11px] font-mono tracking-wider text-neutral-300 group-hover:text-amber-300">
                      {spot.title}
                    </span>
                  </button>
                ) : (
                  <div className="w-72 p-3.5 rounded-lg bg-neutral-950/95 border border-amber-500/70 shadow-2xl backdrop-blur-xl text-left animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        {spot.category}
                      </span>
                      <button
                        onClick={() => {
                          soundFX.playTactileClick();
                          setActiveId(null);
                          onSelectHotspot?.(null);
                        }}
                        className="text-neutral-400 hover:text-white text-xs px-1.5 py-0.5 hover:bg-neutral-800 rounded"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold text-white tracking-wide mb-1">
                      {spot.title}
                    </h4>
                    <p className="text-xs text-amber-300 font-mono mb-2">
                      {spot.spec}
                    </p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {spot.detail}
                    </p>
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
