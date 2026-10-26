import React, { useState } from 'react';
import { 
  RotateCw, 
  Layers, 
  Lock, 
  Unlock, 
  Lightbulb, 
  Eye, 
  Sliders, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { DoorCanvas, type CameraPreset } from '../3d/DoorCanvas';
import { ConfiguratorPanel } from './ConfiguratorPanel';
import { PRODUCT_CATALOGUE } from '../../config/productsData';
import type { 
  DoorProduct, 
  FinishOption, 
  HandleOption, 
  DimensionOption 
} from '../../config/productsData';
import type { EnvironmentType } from '../3d/ArchitecturalScene';
import { soundFX } from '../../utils/audioSynthesizer';

interface StudioSectionProps {
  selectedProduct: DoorProduct;
  selectedFinish: FinishOption;
  selectedHandle: HandleOption;
  selectedDimension: DimensionOption;
  selectedStyle: string;
  isDoorOpen: boolean;
  isLocked: boolean;
  hasLedAccent: boolean;
  hasSmartLock: boolean;
  isOrbitMode: boolean;
  environmentType: EnvironmentType;
  onToggleDoorOpen: () => void;
  onToggleLock: () => void;
  onToggleLed: () => void;
  onToggleSmartLock: () => void;
  onToggleOrbit: () => void;
  onSelectProduct: (product: DoorProduct) => void;
  onSelectFinish: (finish: FinishOption) => void;
  onSelectHandle: (handle: HandleOption) => void;
  onSelectDimension: (dimension: DimensionOption) => void;
  onSelectStyle: (style: string) => void;
  onChangeEnvironment: (env: EnvironmentType) => void;
  onOpenEnquiryModal: () => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({
  selectedProduct,
  selectedFinish,
  selectedHandle,
  selectedDimension,
  selectedStyle,
  isDoorOpen,
  isLocked,
  hasLedAccent,
  hasSmartLock,
  isOrbitMode,
  environmentType,
  onToggleDoorOpen,
  onToggleLock,
  onToggleLed,
  onToggleSmartLock,
  onToggleOrbit,
  onSelectProduct,
  onSelectFinish,
  onSelectHandle,
  onSelectDimension,
  onSelectStyle,
  onChangeEnvironment,
  onOpenEnquiryModal,
}) => {
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('front');
  const [explodedProgress, setExplodedProgress] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);

  // Preset Switcher Handler
  const handleSelectPreset = (preset: CameraPreset) => {
    soundFX.playTactileClick();
    setCameraPreset(preset);

    if (preset === 'orbit') {
      if (!isOrbitMode) onToggleOrbit();
    } else {
      if (isOrbitMode) onToggleOrbit();
    }

    if (preset === 'exploded') {
      setExplodedProgress(1);
    } else if (preset === 'front') {
      setExplodedProgress(0);
    } else if (preset === 'pivot') {
      setExplodedProgress(0);
      if (!isDoorOpen) onToggleDoorOpen();
    }
  };

  const cameraPresetsList: { id: CameraPreset; label: string; icon: React.ReactNode }[] = [
    { id: 'front', label: '1. Front Elevation', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'pivot', label: '2. Pivot Swing (78°)', icon: <Maximize2 className="w-3.5 h-3.5" /> },
    { id: 'exploded', label: '3. Exploded Armor (6 Layers)', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'lock', label: '4. Deadbolts & Locks', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'orbit', label: '5. 360° Free Orbit', icon: <RotateCw className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="studio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-900">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive 3D Configurator & Engineering Lab</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight uppercase">
          Bespoke Metallurgy Studio
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
          Configure dimensions, finishes, and handles with instant 3D feedback. Switch camera presets to inspect internal manganese armor layers and motorized 7-point locking systems.
        </p>

        {/* Quick Model Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          <span className="text-xs font-mono text-neutral-500 uppercase mr-1">Door Model:</span>
          {PRODUCT_CATALOGUE.slice(0, 4).map((p) => {
            const isSelected = selectedProduct.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  onSelectProduct(p);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                    : 'bg-neutral-900/90 text-neutral-300 border border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: 3D STAGE & CAMERA PRESETS ================= */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main 3D Stage Container */}
          <div className="relative w-full h-[580px] sm:h-[660px] rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
            {/* 3D Canvas */}
            <DoorCanvas
              finish={selectedFinish}
              handle={selectedHandle}
              openProgress={isDoorOpen ? 1 : 0}
              explodedProgress={explodedProgress}
              isLocked={isLocked}
              hasLedAccent={hasLedAccent}
              isOrbitMode={isOrbitMode}
              environmentType={environmentType}
              doorStyle={selectedStyle}
              showHotspots={showHotspots}
              cameraPreset={cameraPreset}
              onToggleOpen={onToggleDoorOpen}
            />

            {/* Top Toolbar: Camera Presets */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-1.5 bg-neutral-950/85 border border-neutral-800/90 p-1 rounded-xl backdrop-blur-xl">
                {cameraPresetsList.map((cp) => {
                  const isActive = (cp.id === 'orbit' && isOrbitMode) || (!isOrbitMode && cameraPreset === cp.id);
                  return (
                    <button
                      key={cp.id}
                      onClick={() => handleSelectPreset(cp.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      {cp.icon}
                      <span className="hidden sm:inline">{cp.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hotspot Toggle Button */}
              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  setShowHotspots(prev => !prev);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono backdrop-blur-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  showHotspots
                    ? 'bg-neutral-950/85 border-amber-500/50 text-amber-300'
                    : 'bg-neutral-950/85 border-neutral-800 text-neutral-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D Badges: {showHotspots ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Dynamic Exploded Anatomy Slider (Active when exploded preset is chosen or explodedProgress > 0) */}
            {cameraPreset === 'exploded' && (
              <div className="absolute top-18 left-4 right-4 bg-neutral-950/90 border border-amber-500/40 p-3 rounded-xl backdrop-blur-xl pointer-events-auto space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Armor Layer Separation</span>
                  </span>
                  <span className="text-neutral-300">{(explodedProgress * 100).toFixed(0)}% Displaced</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={explodedProgress}
                  onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>0% Assembled</span>
                  <span>50% Inspect Chassis</span>
                  <span>100% 6 Separate Defensive Layers</span>
                </div>
              </div>
            )}

            {/* Bottom Overlay Kinematic Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2 bg-neutral-950/85 border border-neutral-800 p-2 rounded-xl backdrop-blur-xl">
                {/* Swing Portal */}
                <button
                  onClick={() => {
                    soundFX.playDoorSwing();
                    onToggleDoorOpen();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isDoorOpen
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700'
                  }`}
                >
                  {isDoorOpen ? 'Close Portal' : 'Open Portal (78°)'}
                </button>

                {/* Deadbolts Lock */}
                <button
                  onClick={() => {
                    soundFX.playLockSound(!isLocked);
                    onToggleLock();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  {isLocked ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isLocked ? 'Deadbolts Engaged' : 'Unlocked'}</span>
                </button>

                {/* LED Reveal Accent */}
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onToggleLed();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                    hasLedAccent
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>LED Reveal</span>
                </button>
              </div>

              {/* In Situ Environment Switcher Pills */}
              <div className="flex items-center gap-1 bg-neutral-950/85 border border-neutral-800 p-1.5 rounded-xl backdrop-blur-xl text-[11px] font-mono">
                <span className="text-neutral-500 px-1 hidden sm:inline">Scene:</span>
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onChangeEnvironment('modern-villa');
                  }}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    environmentType === 'modern-villa' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Villa
                </button>
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onChangeEnvironment('minimalist-concrete');
                  }}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    environmentType === 'minimalist-concrete' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Concrete
                </button>
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onChangeEnvironment('alpine-chalet');
                  }}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    environmentType === 'alpine-chalet' ? 'bg-neutral-800 text-amber-300 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Chalet
                </button>
              </div>
            </div>
          </div>

          {/* Helper Tips Under Stage */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-2">
            <span>💡 Click and drag with mouse or touch to inspect 360°</span>
            <span>Offset Spindle: +180mm from frame</span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONFIGURATOR DOCK ================= */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <ConfiguratorPanel
            currentProduct={selectedProduct}
            selectedFinish={selectedFinish}
            selectedHandle={selectedHandle}
            selectedDimension={selectedDimension}
            selectedStyle={selectedStyle}
            isDoorOpen={isDoorOpen}
            isLocked={isLocked}
            hasLedAccent={hasLedAccent}
            hasSmartLock={hasSmartLock}
            onSelectFinish={onSelectFinish}
            onSelectHandle={onSelectHandle}
            onSelectDimension={onSelectDimension}
            onSelectStyle={onSelectStyle}
            onToggleDoorOpen={onToggleDoorOpen}
            onToggleLock={onToggleLock}
            onToggleLed={onToggleLed}
            onToggleSmartLock={onToggleSmartLock}
            onOpenEnquiryModal={onOpenEnquiryModal}
          />
        </div>
      </div>
    </section>
  );
};
