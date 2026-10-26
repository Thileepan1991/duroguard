import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Maximize2, 
  Lock, 
  Unlock, 
  Lightbulb, 
  Download, 
  MessageCircle, 
  FileCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { 
  FINISH_OPTIONS, 
  HANDLE_OPTIONS, 
  DIMENSION_OPTIONS, 
} from '../../config/productsData';
import type { 
  FinishOption, 
  HandleOption, 
  DimensionOption, 
  DoorProduct 
} from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { downloadSpecAsFile, generateWhatsAppLink } from '../../utils/specGenerator';

interface ConfiguratorPanelProps {
  currentProduct: DoorProduct;
  selectedFinish: FinishOption;
  selectedHandle: HandleOption;
  selectedDimension: DimensionOption;
  selectedStyle: string;
  isDoorOpen: boolean;
  isLocked: boolean;
  hasLedAccent: boolean;
  hasSmartLock: boolean;
  onSelectFinish: (finish: FinishOption) => void;
  onSelectHandle: (handle: HandleOption) => void;
  onSelectDimension: (dim: DimensionOption) => void;
  onSelectStyle: (style: string) => void;
  onToggleDoorOpen: () => void;
  onToggleLock: () => void;
  onToggleLed: () => void;
  onToggleSmartLock: () => void;
  onOpenEnquiryModal: () => void;
}

export const ConfiguratorPanel: React.FC<ConfiguratorPanelProps> = ({
  currentProduct,
  selectedFinish,
  selectedHandle,
  selectedDimension,
  selectedStyle,
  isDoorOpen,
  isLocked,
  hasLedAccent,
  hasSmartLock,
  onSelectFinish,
  onSelectHandle,
  onSelectDimension,
  onSelectStyle,
  onToggleDoorOpen,
  onToggleLock,
  onToggleLed,
  onToggleSmartLock,
  onOpenEnquiryModal,
}) => {
  const styles = [
    { id: 'monolith', label: 'Monolith Flush', desc: 'Minimalist continuous steel' },
    { id: 'fluted', label: '3D Fluted Ribs', desc: 'Vertical architectural fins' },
    { id: 'glass-corten', label: 'Smoked Glass Inset', desc: 'Triple-glazed acoustic insert' },
  ];

  const handleDownloadSpec = () => {
    soundFX.playSuccessChime();
    downloadSpecAsFile({
      product: currentProduct,
      finish: selectedFinish,
      handle: selectedHandle,
      dimension: selectedDimension,
      hasSmartLock,
      hasLedAccent,
      hasAcousticCore: true,
    });
  };

  const handleWhatsAppSend = () => {
    soundFX.playTactileClick();
    const link = generateWhatsAppLink({
      product: currentProduct,
      finish: selectedFinish,
      handle: selectedHandle,
      dimension: selectedDimension,
      hasSmartLock,
      hasLedAccent,
      hasAcousticCore: true,
    });
    window.open(link, '_blank');
  };

  return (
    <div className="bg-neutral-950/90 border border-neutral-800/80 rounded-lg p-5 backdrop-blur-xl shadow-2xl text-neutral-200 text-left max-w-md w-full space-y-5">
      {/* Header & Product Label */}
      <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
            Interactive 3D Configurator
          </span>
          <h3 className="text-base font-serif font-bold text-white mt-1">
            {currentProduct.name}
          </h3>
          <p className="text-xs text-neutral-400 font-mono">
            Kinematics: {currentProduct.pivotType}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Quick Door Swing Button */}
          <button
            onClick={() => {
              soundFX.playDoorSwing();
              onToggleDoorOpen();
            }}
            title={isDoorOpen ? "Close Door" : "Open Door"}
            className="p-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-amber-400 transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isDoorOpen ? "Close" : "Swing"}</span>
          </button>
        </div>
      </div>

      {/* 1. Finishes & Metallurgy */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Finish Metallurgy</span>
          </label>
          <span className="text-[11px] font-mono text-amber-300 truncate max-w-[180px]">
            {selectedFinish.tag}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {FINISH_OPTIONS.map((f) => {
            const isSelected = selectedFinish.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  onSelectFinish(f);
                }}
                className={`relative flex items-center gap-2 p-2 rounded border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-neutral-900 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-800/50'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-neutral-600 shrink-0 shadow-inner"
                  style={{ backgroundColor: f.hex }}
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-neutral-200 truncate">
                    {f.name.split(' ')[0]}
                  </p>
                  <p className="text-[9px] text-neutral-400 truncate">
                    {f.tag}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-3 h-3 text-amber-400 absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Facade Style / Texture */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>2. Architectural Surface Style</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {styles.map((st) => (
            <button
              key={st.id}
              onClick={() => {
                soundFX.playTactileClick();
                onSelectStyle(st.id);
              }}
              className={`p-2 rounded border text-left transition-all cursor-pointer ${
                selectedStyle === st.id
                  ? 'border-amber-400 bg-neutral-900 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
              }`}
            >
              <p className="text-xs font-semibold text-neutral-200">{st.label}</p>
              <p className="text-[9px] text-neutral-400 mt-0.5">{st.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Handle Architecture */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
          <FileCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>3. Pull Hardware</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {HANDLE_OPTIONS.map((h) => {
            const isSelected = selectedHandle.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  onSelectHandle(h);
                }}
                className={`p-2 rounded border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-neutral-900 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                }`}
              >
                <p className="text-xs font-semibold text-neutral-200 truncate">{h.name}</p>
                <p className="text-[10px] text-amber-400/90 font-mono mt-0.5">{h.lengthMm} mm</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Dimensions & Scale */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>4. Portal Span & Dimensions</span>
        </label>
        <div className="space-y-1.5">
          {DIMENSION_OPTIONS.map((dim) => {
            const isSelected = selectedDimension.id === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  onSelectDimension(dim);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-neutral-900 text-amber-300'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <span className="text-xs font-mono">{dim.label}</span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {dim.thicknessMm}mm leaf depth
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Toggles: Smart Lock & Warm LED Accent */}
      <div className="pt-2 border-t border-neutral-800 grid grid-cols-3 gap-2">
        {/* Motorized Deadbolt Lock Toggle */}
        <button
          onClick={() => {
            soundFX.playLockSound(!isLocked);
            onToggleLock();
          }}
          className={`flex items-center justify-between px-2.5 py-2 rounded border text-xs font-mono transition-all cursor-pointer ${
            isLocked
              ? 'border-rose-500/60 bg-rose-950/20 text-rose-300'
              : 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
          }`}
        >
          <span className="flex items-center gap-1">
            {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            <span className="text-[11px]">7-Pt</span>
          </span>
          <span className="text-[9px] font-bold">{isLocked ? 'LOCK' : 'OPEN'}</span>
        </button>

        {/* Biometric Smart Sensor Toggle */}
        <button
          onClick={() => {
            soundFX.playTactileClick();
            onToggleSmartLock();
          }}
          className={`flex items-center justify-between px-2.5 py-2 rounded border text-xs font-mono transition-all cursor-pointer ${
            hasSmartLock
              ? 'border-sky-500/80 bg-sky-950/30 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
              : 'border-neutral-800 bg-neutral-900 text-neutral-400'
          }`}
        >
          <span className="text-[11px]">BioLock</span>
          <span className="text-[9px] font-bold">{hasSmartLock ? 'ACTIVE' : 'OFF'}</span>
        </button>

        {/* LED Linear Glow Toggle */}
        <button
          onClick={() => {
            soundFX.playTactileClick();
            onToggleLed();
          }}
          className={`flex items-center justify-between px-2.5 py-2 rounded border text-xs font-mono transition-all cursor-pointer ${
            hasLedAccent
              ? 'border-amber-400/80 bg-amber-950/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
              : 'border-neutral-800 bg-neutral-900 text-neutral-400'
          }`}
        >
          <span className="flex items-center gap-1">
            <Lightbulb className="w-3 h-3" />
            <span className="text-[11px]">LED</span>
          </span>
          <span className="text-[9px] font-bold">{hasLedAccent ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* 6. Action CTAs */}
      <div className="pt-3 border-t border-neutral-800 space-y-2">
        <button
          onClick={() => {
            soundFX.playTactileClick();
            onOpenEnquiryModal();
          }}
          className="w-full py-2.5 rounded-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold uppercase tracking-wider text-xs shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
        >
          Request Specification & Quote
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsAppSend}
            className="flex items-center justify-center gap-1.5 py-2 rounded bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-mono transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleDownloadSpec}
            className="flex items-center justify-center gap-1.5 py-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-mono transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Spec</span>
          </button>
        </div>
      </div>
    </div>
  );
};
