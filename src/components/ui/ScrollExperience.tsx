import React from 'react';
import { 
  ChevronDown, 
  RotateCw, 
  Layers, 
  Lock, 
  Unlock,
  Sliders,
  Box
} from 'lucide-react';
import { 
  PRODUCT_CATALOGUE, 
} from '../../config/productsData';
import type { 
  DoorProduct, 
  FinishOption, 
  HandleOption, 
  DimensionOption 
} from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { ConfiguratorPanel } from './ConfiguratorPanel';

interface ScrollExperienceProps {
  scrollProgress: number;
  openProgress: number;
  explodedProgress: number;
  isDoorOpen: boolean;
  isLocked: boolean;
  hasLedAccent: boolean;
  hasSmartLock: boolean;
  isOrbitMode: boolean;
  selectedProduct: DoorProduct;
  selectedFinish: FinishOption;
  selectedHandle: HandleOption;
  selectedDimension: DimensionOption;
  selectedStyle: string;
  onToggleDoorOpen: () => void;
  onToggleLock: () => void;
  onToggleLed: () => void;
  onToggleSmartLock: () => void;
  onToggleOrbit: () => void;
  onSelectProduct: (p: DoorProduct) => void;
  onSelectFinish: (f: FinishOption) => void;
  onSelectHandle: (h: HandleOption) => void;
  onSelectDimension: (d: DimensionOption) => void;
  onSelectStyle: (st: string) => void;
  onOpenCatalogue: () => void;
  onOpenEnquiryModal: () => void;
  onOpenSampleKit: () => void;
  onScrollToSection: (id: string) => void;
}

export const ScrollExperience: React.FC<ScrollExperienceProps> = ({
  scrollProgress,
  openProgress,
  explodedProgress,
  isDoorOpen,
  isLocked,
  hasLedAccent,
  hasSmartLock,
  isOrbitMode,
  selectedProduct,
  selectedFinish,
  selectedHandle,
  selectedDimension,
  selectedStyle,
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
  onOpenCatalogue,
  onOpenEnquiryModal,
  onOpenSampleKit,
  onScrollToSection,
}) => {
  return (
    <div className="relative pointer-events-none z-10 w-full text-neutral-200">
      {/* ================= CHAPTER 1: HERO ENTRANCE ================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto"
      >
        {/* Top Spacer for Navbar */}
        <div className="h-20" />

        {/* Hero Narrative Overlay & 3D Interactive Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Headline, Specs & Actions */}
          <div className="lg:col-span-7 max-w-xl text-left pointer-events-auto space-y-5 animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-amber-300">
                Monumental Architectural Portals
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight uppercase leading-[1.05]">
              Steel & Stainless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-amber-200">
                Mastery
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-sans leading-relaxed">
              Monumental pivot doors for luxury villas and houses, marine-grade 316 stainless steel, and certified RC4/RC5 high-security fire barriers. Designed with silver & charcoal industrial elegance.
            </p>

            {/* Quick Interaction Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundFX.playDoorSwing();
                  onToggleDoorOpen();
                }}
                className="px-6 py-3 rounded-sm bg-neutral-100 hover:bg-white text-neutral-950 font-bold uppercase text-xs font-mono tracking-wider shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer flex items-center gap-2"
              >
                <span>{isDoorOpen ? 'Close Entrance Portal' : 'Open Entrance Portal'}</span>
                <span className="text-[10px] text-neutral-500 font-mono">(Kinematics)</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onToggleOrbit();
                }}
                className="px-5 py-3 rounded-sm bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>{isOrbitMode ? 'Exit Orbit Mode' : 'Free 3D Orbit'}</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onOpenCatalogue();
                }}
                className="px-5 py-3 rounded-sm bg-neutral-900/60 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
              >
                Catalogue (4 Categories)
              </button>
            </div>

            {/* Live Engineering Telemetry */}
            <div className="pt-4 grid grid-cols-4 gap-2 max-w-lg text-[10px] sm:text-xs font-mono text-neutral-400 border-t border-neutral-800/80">
              <div>
                <span className="text-neutral-500 block">SPINDLE:</span>
                <span className="text-white font-bold">800 KG</span>
              </div>
              <div>
                <span className="text-neutral-500 block">AXIS:</span>
                <span className="text-white font-bold">+180 MM</span>
              </div>
              <div>
                <span className="text-neutral-500 block">SWING:</span>
                <span className="text-amber-300 font-bold">{(openProgress * 78).toFixed(0)}°</span>
              </div>
              <div>
                <span className="text-neutral-500 block">SECURITY:</span>
                <span className="text-amber-400 font-bold">RC4</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive 3D Model HUD */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-end pointer-events-auto">
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl space-y-3 max-w-xs text-left animate-in fade-in duration-1000">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive 3D Portal</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">WebGL 2.0</span>
              </div>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Rendered with physical brushed metallic shaders, warm architectural downlights, and genuine offset pivot kinematics.
              </p>

              <div className="pt-2 border-t border-neutral-800/80 space-y-1.5 text-xs font-mono">
                <button
                  onClick={() => {
                    soundFX.playDoorSwing();
                    onToggleDoorOpen();
                  }}
                  className="w-full py-2 px-3 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>Door Kinematics:</span>
                  <span className={`font-bold ${isDoorOpen ? 'text-amber-300' : 'text-neutral-400'}`}>
                    {isDoorOpen ? 'OPEN (78°)' : 'CLOSED (0°)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onToggleOrbit();
                  }}
                  className={`w-full py-2 px-3 rounded flex items-center justify-between cursor-pointer transition-all ${
                    isOrbitMode
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  <span>360° Free Orbit:</span>
                  <span>{isOrbitMode ? 'ACTIVE' : 'START'}</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 pt-1 flex items-center gap-1.5">
                <span>💡 Click on the door leaf to open / close</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pointer-events-auto flex items-center justify-between pb-6 border-t border-neutral-900/60 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
            <span>Scroll down to initiate engineering inspection</span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400">
            Current Model: <strong className="text-white">{selectedProduct.name}</strong>
          </div>
        </div>
      </section>

      {/* ================= CHAPTER 2: ENGINEERING & EXPLODED ANATOMY ================= */}
      <section
        id="engineering"
        className="min-h-screen flex flex-col justify-center p-6 sm:p-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl text-left pointer-events-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/40 text-amber-400 text-xs font-mono tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Chapter 02 • Internal Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase">
              Anatomy of Unyielding Armor
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              Beneath the hand-brushed Grade 316 stainless and charcoal steel facades lies a multi-chamber reinforced defensive subframe. Engineered with 4mm hardened manganese anti-drill plates, continuous laser welds, and high-density basalt rockwool acoustic core.
            </p>

            {/* Exploded Layers Breakdown */}
            <div className="space-y-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">01. Armor Faceplate Skin</span>
                <span className="text-amber-400 font-bold">3.0mm Galvanized Steel / 316 Inox</span>
              </div>
              <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">02. Ballistic Anti-Drill Core</span>
                <span className="text-amber-400 font-bold">4.0mm Hardened Manganese Alloy</span>
              </div>
              <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">03. High-Acoustic Core</span>
                <span className="text-amber-400 font-bold">48 dB Reduction • Ud 0.78 W/m²K</span>
              </div>
              <div className="p-3 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">04. Motorized Locking Transmission</span>
                <span className="text-amber-400 font-bold">7 to 11 Stainless Deadbolt Rods</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundFX.playLockSound(!isLocked);
                  onToggleLock();
                }}
                className="px-5 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
              >
                {isLocked ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                <span>Test Deadbolts ({isLocked ? 'Locked' : 'Unlocked'})</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onOpenSampleKit();
                }}
                className="px-4 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Box className="w-3.5 h-3.5 text-amber-400" />
                <span>Request Material Kit</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onScrollToSection('security');
                }}
                className="px-4 py-2.5 rounded text-neutral-400 hover:text-white text-xs font-mono underline transition-colors cursor-pointer"
              >
                Full Test Standards →
              </button>
            </div>

            {/* Live Kinematic HUD */}
            <div className="pt-2 flex items-center gap-4 text-[10px] font-mono text-neutral-500">
              <span>DISPLACEMENT: {(explodedProgress * 350).toFixed(0)}mm</span>
              <span>•</span>
              <span>SCROLL INDEX: {(scrollProgress * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Right spacer for 3D view */}
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* ================= CHAPTER 3: INTERACTIVE 3D CONFIGURATOR STUDIO ================= */}
      <section
        id="configurator"
        className="min-h-screen flex flex-col justify-center p-6 sm:p-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-5 max-w-lg text-left pointer-events-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/40 text-amber-400 text-xs font-mono tracking-widest uppercase">
              <Sliders className="w-3.5 h-3.5" />
              <span>Chapter 03 • Custom Studio</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase">
              Bespoke Architectural Metallurgy
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              Tailor every element of your entrance portal. Select verified industrial finishes: marine-grade 316 brushed stainless, charcoal powdercoat, corten patina, or champagne bronze. Update the 3D model in real time and generate instant architectural specification documents.
            </p>

            {/* Category Switcher Shortcuts */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Switch Architectural Model:
              </span>
              <div className="space-y-1.5">
                {PRODUCT_CATALOGUE.slice(0, 4).map((p) => {
                  const isSelected = selectedProduct.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        soundFX.playTactileClick();
                        onSelectProduct(p);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-left text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                          : 'bg-neutral-900/70 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-[10px] opacity-80">{p.series}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Configurator Floating Dock */}
          <div className="lg:col-span-7 flex justify-end pointer-events-auto">
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
    </div>
  );
};
