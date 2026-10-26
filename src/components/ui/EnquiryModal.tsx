import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Download 
} from 'lucide-react';
import type { DoorProduct, FinishOption, DimensionOption, HandleOption } from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { saveEnquiryToStorage, downloadSpecAsFile, generateWhatsAppLink } from '../../utils/specGenerator';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: DoorProduct;
  finish: FinishOption;
  handle: HandleOption;
  dimension: DimensionOption;
  hasSmartLock: boolean;
  hasLedAccent: boolean;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  finish,
  handle,
  dimension,
  hasSmartLock,
  hasLedAccent,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    clientType: 'Architect / Interior Designer' as const,
    projectLocation: '',
    estimatedTimeline: 'Planning (3-6 Months)',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docId = `FX-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(docId);

    saveEnquiryToStorage({
      id: docId,
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      clientType: formData.clientType,
      projectLocation: formData.projectLocation,
      estimatedTimeline: formData.estimatedTimeline,
      notes: formData.notes,
      configuration: {
        productName: product.name,
        finishName: finish.name,
        dimensions: dimension.label,
        handle: handle.name,
        smartLock: hasSmartLock,
        ledAccent: hasLedAccent,
        acousticCore: true,
        securityClass: product.securityClass,
        fireRating: product.fireRating,
      },
    });

    soundFX.playSuccessChime();
    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    soundFX.playTactileClick();
    const link = generateWhatsAppLink({
      product,
      finish,
      handle,
      dimension,
      hasSmartLock,
      hasLedAccent,
      hasAcousticCore: true,
    }, `Ref ${referenceId}: Contact ${formData.name}`);
    window.open(link, '_blank');
  };

  const handleDownloadSpec = () => {
    soundFX.playSuccessChime();
    downloadSpecAsFile({
      product,
      finish,
      handle,
      dimension,
      hasSmartLock,
      hasLedAccent,
      hasAcousticCore: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-8 text-neutral-200 text-left animate-in fade-in zoom-in-95 duration-200">
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

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                Official Architectural Quotation & Dossier
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-2">
                Project Specification & Ingress Inquiry
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Direct factory engineering calculation & showroom consultation scheduling.
              </p>
            </div>

            {/* Current Configuration Summary Box */}
            <div className="mb-6 p-4 rounded-lg bg-neutral-900/70 border border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Selected System</span>
                <span className="font-bold text-white truncate block">{product.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Finish</span>
                <span className="font-bold text-amber-300 truncate block">{finish.tag}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Dimensions</span>
                <span className="font-bold text-white truncate block">{dimension.widthMm}x{dimension.heightMm}mm</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Security Grade</span>
                <span className="font-bold text-amber-400 truncate block">{product.securityClass.split(' ')[0]}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Lord Alexander Sterling"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="alexander@architecture.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Phone / Mobile (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="+44 7911 123456"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Project Country & City *</label>
                  <input
                    type="text"
                    required
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    placeholder="e.g. Zurich, Switzerland"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Your Role / Client Category</label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value as typeof formData.clientType })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  >
                    <option>Private Homeowner</option>
                    <option>Architect / Interior Designer</option>
                    <option>General Contractor</option>
                    <option>Commercial Developer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Project Stage / Timeline</label>
                  <select
                    value={formData.estimatedTimeline}
                    onChange={(e) => setFormData({ ...formData, estimatedTimeline: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  >
                    <option>Immediate Construction (1-3 Months)</option>
                    <option>Planning & Permits (3-6 Months)</option>
                    <option>Architectural Concept (6-12 Months)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Project Notes / Architectural Customizations</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  placeholder="Include custom rough opening dimensions, automation protocols (KNX/Crestron), or specific security requirements..."
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-neutral-950 font-bold uppercase tracking-wider text-xs font-mono shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Specification Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded">
                Dossier Inquiry Registered
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-3">
                Thank You, {formData.name}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Reference ID: <span className="text-amber-400 font-bold">{referenceId}</span>
              </p>
            </div>

            <p className="text-sm text-neutral-300 max-w-lg mx-auto font-sans leading-relaxed">
              Your custom specification package for the <strong className="text-white">{product.name}</strong> ({finish.name}) has been dispatched to our architectural engineering team. A technical concierge will respond with preliminary CAD elevations and structural anchoring details.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleWhatsAppInstant}
                className="w-full sm:w-auto px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Concierge Follow-Up</span>
              </button>

              <button
                onClick={handleDownloadSpec}
                className="w-full sm:w-auto px-6 py-3 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Spec Schedule</span>
              </button>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="text-xs font-mono text-neutral-500 hover:text-neutral-300 underline block mx-auto pt-2 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
