import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Flame, 
  Volume2, 
  Maximize2, 
  Sparkles, 
  Download, 
  MessageCircle, 
  Check 
} from 'lucide-react';
import { FINISH_OPTIONS, DIMENSION_OPTIONS, HANDLE_OPTIONS } from '../../config/productsData';
import type { DoorProduct } from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { downloadSpecAsFile } from '../../utils/specGenerator';

interface ProductDetailModalProps {
  product: DoorProduct | null;
  onClose: () => void;
  onLoadIn3D: (product: DoorProduct) => void;
  onOpenEnquiry: (product: DoorProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onLoadIn3D,
  onOpenEnquiry,
}) => {
  if (!product) return null;

  const defaultFinish = FINISH_OPTIONS.find(f => f.id === product.defaultFinish) || FINISH_OPTIONS[0];

  const handleDownloadDossier = () => {
    soundFX.playSuccessChime();
    downloadSpecAsFile({
      product,
      finish: defaultFinish,
      handle: HANDLE_OPTIONS[0],
      dimension: DIMENSION_OPTIONS[1],
      hasSmartLock: true,
      hasLedAccent: true,
      hasAcousticCore: true,
    });
  };

  const handleWhatsApp = () => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName} Concierge, I am requesting technical drawings, BIM files, and pricing for ${product.name}.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Architectural Photo & Specs Badges */}
          <div className="relative h-72 md:h-full min-h-[380px] bg-neutral-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-black/80 px-2.5 py-1 rounded border border-amber-500/30">
                {product.series}
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-2">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-300 font-mono mt-1">
                {product.pivotType}
              </p>
            </div>
          </div>

          {/* Right Column: Full Technical Dossier */}
          <div className="p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Architectural Engineering Dossier
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Verified Technical Standards */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-800 pb-1">
                Certified Engineering Standards
              </h5>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Burglar Resistance</span>
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{product.securityClass}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Fire Integrity (EI)</span>
                  <div className="flex items-center gap-1.5 text-orange-300 font-bold mt-0.5">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{product.fireRating}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Acoustic Attenuation</span>
                  <div className="flex items-center gap-1.5 text-sky-300 font-bold mt-0.5">
                    <Volume2 className="w-4 h-4 text-sky-400" />
                    <span>{product.acousticRating}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-[10px] text-neutral-500 uppercase block">Thermal Insulation</span>
                  <div className="flex items-center gap-1.5 text-purple-300 font-bold mt-0.5">
                    <Maximize2 className="w-4 h-4 text-purple-400" />
                    <span>{product.thermalInsulation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kinematic & Mechanical Details */}
            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-neutral-500">Max Permissible Dimensions:</span>
                <span className="font-semibold text-white">{product.maxDimensions}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-neutral-500">Leaf Mass:</span>
                <span className="font-semibold text-white">~{product.leafWeightKg} kg (balanced)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-neutral-500">Locking Assembly:</span>
                <span className="font-semibold text-white text-right max-w-[200px] truncate">{product.lockingSystem}</span>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-2">
              <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Design & Engineering Features
              </h5>
              <div className="space-y-1.5">
                {product.highlightFeatures.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onLoadIn3D(product);
                    onClose();
                  }}
                  className="py-3 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase text-xs font-mono tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Configure in 3D</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onOpenEnquiry(product);
                    onClose();
                  }}
                  className="py-3 rounded bg-neutral-200 hover:bg-white text-neutral-950 font-bold uppercase text-xs font-mono tracking-wider transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="py-2.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </button>

                <button
                  onClick={handleDownloadDossier}
                  className="py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
