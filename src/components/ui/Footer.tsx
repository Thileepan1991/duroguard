import React from 'react';
import { ShieldCheck, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { CATEGORIES_LIST } from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';

interface FooterProps {
  onOpenCatalogue: () => void;
  onOpenEnquiry: () => void;
  onOpenSampleKit: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCatalogue,
  onOpenEnquiry,
  onOpenSampleKit,
  onScrollToSection,
}) => {
  const handleWhatsApp = () => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName} Concierge, I would like to enquire about bespoke architectural steel doors.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-left pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-white">F</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-[0.25em] text-white uppercase font-serif">
                  {BRAND_CONFIG.brandName}
                </span>
                <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-mono">
                  {BRAND_CONFIG.brandTagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              Dedicated to the engineering of monumental steel pivot portals, AISI 316 marine-grade stainless doors, and certified high-security architectural entrances for luxury private residences worldwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-mono transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onOpenSampleKit();
                }}
                className="px-3.5 py-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
              >
                Request Material Kit
              </button>

              <button
                onClick={() => {
                  soundFX.playTactileClick();
                  onOpenEnquiry();
                }}
                className="px-3.5 py-2 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Core Product Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      soundFX.playTactileClick();
                      onOpenCatalogue();
                    }}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onScrollToSection('configurator');
                  }}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-amber-300/80"
                >
                  3D Customizer Studio →
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Engineering Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Verified Metrics
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>EN 1627 Class RC4 / RC5</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>EN 1634-1 EI 60 / EI 120</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>ISO 10140-2 (Rw 48 dB)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>EN ISO 10077-1 (Ud 0.76)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                <span>AISI 316 Marine Stainless</span>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Direct Atelier
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </p>
              <p className="flex items-start gap-2 pt-1 text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.headquarters}</span>
              </p>
              <p className="text-[11px] text-neutral-500 pt-1">
                Hours: {BRAND_CONFIG.contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.brandName} ARCHITECTURAL PORTALS. All engineering rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors">Structural Warranties</span>
            <span className="hover:text-neutral-400 transition-colors">BIM CAD Library</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
