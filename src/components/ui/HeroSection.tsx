import React from 'react';
import { 
  RotateCw, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Lock,
  Unlock
} from 'lucide-react';
import { DoorCanvas } from '../3d/DoorCanvas';
import { FINISH_OPTIONS } from '../../config/productsData';
import type { DoorProduct, FinishOption, HandleOption } from '../../config/productsData';
import type { EnvironmentType } from '../3d/ArchitecturalScene';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { soundFX } from '../../utils/audioSynthesizer';

interface HeroSectionProps {
  selectedProduct: DoorProduct;
  selectedFinish: FinishOption;
  selectedHandle: HandleOption;
  selectedStyle: string;
  isDoorOpen: boolean;
  isLocked: boolean;
  hasLedAccent: boolean;
  isOrbitMode: boolean;
  environmentType: EnvironmentType;
  onToggleDoorOpen: () => void;
  onToggleLock: () => void;
  onToggleOrbit: () => void;
  onSelectFinish: (finish: FinishOption) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenEnquiryModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedProduct,
  selectedFinish,
  selectedHandle,
  selectedStyle,
  isDoorOpen,
  isLocked,
  hasLedAccent,
  isOrbitMode,
  environmentType,
  onToggleDoorOpen,
  onToggleLock,
  onToggleOrbit,
  onSelectFinish,
  onScrollToSection,
  onOpenEnquiryModal,
}) => {
  const handleWhatsAppClick = () => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName} Concierge, I am inquiring about architectural steel & stainless entrance doors for an upcoming project.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* ================= LEFT COLUMN: NARRATIVE & SPECIFICATIONS ================= */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Swiss Engineering Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-700/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300 font-semibold">
              Swiss Engineering • Monumental Portals
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight uppercase leading-[1.08]">
            Architectural Steel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-amber-200">
              & Inox Mastery
            </span>
          </h1>

          {/* Clear Subtitle */}
          <p className="text-base text-neutral-300 max-w-xl font-sans leading-relaxed">
            Custom heavy-pivot entrance systems, marine-grade 316 stainless steel, and certified RC4/RC5 ballistic fire barriers. Handcrafted with industrial silver & charcoal elegance for monumental residences and villas.
          </p>

          {/* 4 Technical Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">SPINDLE LOAD</span>
              <span className="text-base font-mono font-bold text-white">800 KG</span>
              <span className="text-[9px] font-mono text-neutral-400 block">Hydraulic Pivot</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">BURGLAR RESIST</span>
              <span className="text-base font-mono font-bold text-amber-400">RC4 / RC5</span>
              <span className="text-[9px] font-mono text-neutral-400 block">EN 1627 Certified</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">ACOUSTIC DAMP</span>
              <span className="text-base font-mono font-bold text-sky-400">48 dB</span>
              <span className="text-[9px] font-mono text-neutral-400 block">ISO 10140-2</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">THERMAL VALUE</span>
              <span className="text-base font-mono font-bold text-emerald-400">0.76 Ud</span>
              <span className="text-[9px] font-mono text-neutral-400 block">W/m²K Barrier</span>
            </div>
          </div>

          {/* Action Pathways */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFX.playTactileClick();
                onScrollToSection('studio');
              }}
              className="px-6 py-3.5 rounded-md bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase text-xs font-mono tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all transform hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <span>Launch 3D Customizer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFX.playTactileClick();
                onScrollToSection('catalogue');
              }}
              className="px-5 py-3.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
            >
              Catalogue (4 Categories)
            </button>

            <button
              onClick={() => {
                soundFX.playTactileClick();
                onOpenEnquiryModal();
              }}
              className="px-4 py-3.5 rounded-md bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Request Quote
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="px-4 py-3.5 rounded-md bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-600/50 text-emerald-300 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Concierge</span>
            </button>
          </div>

          {/* Quick Helper Note */}
          <div className="text-xs font-mono text-neutral-400 pt-1 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Click on the 3D door leaf on the right to test physical pivot swing and deadbolt action.</span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: DEDICATED 3D STAGE ================= */}
        <div className="lg:col-span-6 w-full">
          <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[620px] rounded-2xl border border-neutral-800 bg-neutral-950/90 shadow-2xl overflow-hidden group">
            {/* 3D Canvas Viewport */}
            <DoorCanvas
              finish={selectedFinish}
              handle={selectedHandle}
              openProgress={isDoorOpen ? 1 : 0}
              explodedProgress={0}
              isLocked={isLocked}
              hasLedAccent={hasLedAccent}
              isOrbitMode={isOrbitMode}
              environmentType={environmentType}
              doorStyle={selectedStyle}
              showHotspots={false}
              cameraPreset={isOrbitMode ? 'orbit' : 'front'}
              onToggleOpen={onToggleDoorOpen}
            />

            {/* Top Overlay Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-700/60 backdrop-blur-md text-[11px] font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">{selectedProduct.name}</span>
                <span className="text-neutral-500">|</span>
                <span className="text-amber-400">{selectedFinish.name}</span>
              </div>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onToggleOrbit();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider border backdrop-blur-md transition-all cursor-pointer ${
                  isOrbitMode
                    ? 'bg-amber-400 text-neutral-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-950/80 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isOrbitMode ? 'Exit Orbit' : '360° Orbit'}</span>
              </button>
            </div>

            {/* Bottom Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2.5 pointer-events-auto">
              {/* Kinematic Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-950/85 border border-neutral-800 p-2 rounded-xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFX.playDoorSwing();
                      onToggleDoorOpen();
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                      isDoorOpen
                        ? 'bg-amber-400 text-neutral-950 shadow-md'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700'
                    }`}
                  >
                    <span>{isDoorOpen ? 'Close Portal (0°)' : 'Swing Open (78°)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playLockSound(!isLocked);
                      onToggleLock();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
                  </button>
                </div>

                {/* Quick Finish Swatches */}
                <div className="flex items-center gap-1.5">
                  {FINISH_OPTIONS.slice(0, 4).map((f) => {
                    const isSelected = selectedFinish.id === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          soundFX.playTactileClick();
                          onSelectFinish(f);
                        }}
                        title={f.name}
                        className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                          isSelected ? 'border-amber-400 ring-2 ring-amber-400/30 scale-110' : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        style={{ backgroundColor: f.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Direct Banner to 3D Customizer Studio */}
              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onScrollToSection('studio');
                }}
                className="w-full py-2 px-3 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 text-[11px] font-mono text-neutral-300 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Customize handles, dimensions & inspect exploded 6-layer armor</span>
                </span>
                <span className="text-amber-400 font-bold">Open Studio ↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
