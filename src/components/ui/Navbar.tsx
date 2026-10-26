import React, { useState } from 'react';
import { 
  RotateCw, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Menu, 
  X 
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { soundFX } from '../../utils/audioSynthesizer';

interface NavbarProps {
  isOrbitMode: boolean;
  onToggleOrbit: () => void;
  onOpenCatalogue: () => void;
  onOpenEnquiry: () => void;
  onOpenSampleKit: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOrbitMode,
  onToggleOrbit,
  onOpenCatalogue,
  onOpenEnquiry,
  onOpenSampleKit,
  onScrollToSection,
}) => {
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  interface NavItem {
    label: string;
    id?: string;
    action?: () => void;
  }

  const navLinks: NavItem[] = [
    { label: '3D Studio', id: 'studio' },
    { label: 'Collections', action: onOpenCatalogue },
    { label: 'Security & Fire', id: 'security' },
    { label: 'Showcase', id: 'showcase' },
    { label: 'Showrooms', id: 'dealers' },
  ];

  const handleWhatsAppClick = () => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName} Concierge, I am inquiring about architectural steel & stainless entrance doors for an upcoming project.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => {
            soundFX.playTactileClick();
            onScrollToSection('hero');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700 flex items-center justify-center shadow-lg group-hover:border-amber-400/80 transition-colors">
            <span className="font-serif text-lg font-bold text-neutral-100 group-hover:text-amber-400">F</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-[0.25em] text-neutral-100 uppercase font-serif group-hover:text-amber-400 transition-colors">
              {BRAND_CONFIG.brandName}
            </span>
            <span className="hidden md:block text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-mono">
              {BRAND_CONFIG.brandTagline}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFX.playTactileClick();
                if (item.action) {
                  item.action();
                } else if (item.id) {
                  onScrollToSection(item.id);
                }
              }}
              className="text-xs uppercase tracking-widest font-mono text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer py-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* 3D Orbit Mode Toggle */}
          <button
            onClick={() => {
              soundFX.playTactileClick();
              onToggleOrbit();
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider border transition-all cursor-pointer ${
              isOrbitMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isOrbitMode ? 'animate-spin' : ''}`} />
            <span>{isOrbitMode ? 'Exit 3D Orbit' : 'Orbit 3D'}</span>
          </button>

          {/* WhatsApp Concierge */}
          <button
            onClick={handleWhatsAppClick}
            title="Chat on WhatsApp"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">WhatsApp</span>
          </button>

          {/* Request Quote Button */}
          <button
            onClick={() => {
              soundFX.playTactileClick();
              onOpenEnquiry();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-neutral-200 to-neutral-400 hover:from-white hover:to-neutral-300 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <span>Request Spec</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={handleToggleSound}
            className="p-2 text-neutral-400 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onToggleOrbit();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded bg-neutral-900 text-neutral-300 text-xs font-mono border border-neutral-800"
            >
              <RotateCw className="w-4 h-4 text-amber-400" />
              <span>{isOrbitMode ? 'Exit Orbit' : 'Orbit 3D'}</span>
            </button>
            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded bg-emerald-950/60 text-emerald-400 text-xs font-mono border border-emerald-800"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>

          <div className="pt-2 space-y-2 border-t border-neutral-900">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundFX.playTactileClick();
                  setMobileMenuOpen(false);
                  if (item.action) {
                    item.action();
                  } else if (item.id) {
                    onScrollToSection(item.id);
                  }
                }}
                className="block w-full text-left py-2 text-sm uppercase tracking-widest font-mono text-neutral-300 hover:text-amber-400"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                soundFX.playTactileClick();
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 rounded-sm bg-neutral-200 text-neutral-950 font-bold uppercase tracking-wider text-xs"
            >
              Request Specification & Quote
            </button>
            <button
              onClick={() => {
                soundFX.playTactileClick();
                setMobileMenuOpen(false);
                onOpenSampleKit();
              }}
              className="w-full py-2.5 rounded-sm bg-neutral-900 text-neutral-300 border border-neutral-800 text-xs font-mono"
            >
              Request Finish Sample Box
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
