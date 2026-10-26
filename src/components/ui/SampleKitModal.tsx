import React, { useState } from 'react';
import { X, Box, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../../utils/audioSynthesizer';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firm: '',
    contactName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    postalCode: '',
    country: '',
    currentProjects: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccessChime();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-8 text-neutral-200 text-left animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => {
            soundFX.playTactileClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                For Architects & Interior Designers
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-2">
                Order Architectural Material Sample Box
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Complimentary curated tactile kit shipped via DHL Express worldwide.
              </p>
            </div>

            {/* Sample Box Contents Preview */}
            <div className="mb-6 p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                Box Includes 4 Precision Material Tiles & Extrusion Section:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="w-3 h-3 rounded-full bg-[#c0c7d0] inline-block mr-1.5 align-middle" />
                  <span>316 Stainless</span>
                </div>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="w-3 h-3 rounded-full bg-[#1e2126] inline-block mr-1.5 align-middle" />
                  <span>Charcoal Matte</span>
                </div>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="w-3 h-3 rounded-full bg-[#78432b] inline-block mr-1.5 align-middle" />
                  <span>Corten Patina</span>
                </div>
                <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
                  <span className="w-3 h-3 rounded-full bg-[#a38965] inline-block mr-1.5 align-middle" />
                  <span>PVD Bronze</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Architecture / Design Firm</label>
                  <input
                    type="text"
                    required
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="Studio / Practice Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Principal / Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="specifier@firm.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Delivery Address & Country</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  placeholder="Street Address, Suite / Floor, City, Postal Code, Country"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase tracking-wider text-xs font-mono shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Box className="w-4 h-4" />
                <span>Request Sample Kit Dispatch</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Sample Box Dispatch Scheduled
            </h3>
            <p className="text-xs text-neutral-400 font-mono max-w-md mx-auto">
              Thank you, {formData.contactName}. Your curated box of 316 brushed stainless, charcoal obsidian, corten patina, and bronze finish tiles is being prepared for express delivery to {formData.firm}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
