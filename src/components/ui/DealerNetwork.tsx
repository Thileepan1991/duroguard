import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Calendar, 
  UserCheck, 
  MessageCircle, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brandConfig';
import { soundFX } from '../../utils/audioSynthesizer';

interface DealerNetworkProps {
  onOpenConsultation: () => void;
}

export const DealerNetwork: React.FC<DealerNetworkProps> = ({ onOpenConsultation }) => {
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerData, setPartnerData] = useState({
    firmName: '',
    contactName: '',
    email: '',
    country: '',
    annualVolume: '10-25 Custom Doors / Year',
    message: '',
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccessChime();
    setPartnerSubmitted(true);
  };

  const handleWhatsAppShowroom = (city: string) => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName}, I would like to schedule a private architectural consultation at your ${city} flagship atelier.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <section id="dealers" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Global Atelier & Dealer Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight uppercase">
            Private Consultations & Partners
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-sans leading-relaxed">
            Experience the monumental scale, acoustic silence, and hand-finished metallurgy in person at our flagship studios in Europe, North America, the Middle East, and Asia.
          </p>
        </div>

        {/* Global Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {BRAND_CONFIG.showrooms.map((room, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-neutral-900/50 border border-neutral-800/80 hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    {room.city}, {room.country}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {room.status}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-2">
                  {room.city} Flagship Atelier
                </h3>

                <p className="text-xs text-neutral-400 font-mono flex items-start gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>{room.address}</span>
                </p>

                <div className="space-y-1.5 text-xs font-mono text-neutral-300 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{room.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>Lead Architect: {room.leadArchitect}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onOpenConsultation();
                  }}
                  className="flex-1 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>

                <button
                  onClick={() => handleWhatsAppShowroom(room.city)}
                  title="WhatsApp Showroom"
                  className="p-2 rounded bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dealer / Architectural Partnership Application Section */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                Trade & Commercial Representation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-3">
                Architectural & Dealer Partnership
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-sans">
                We partner with select luxury door distributors, high-end facade contractors, and award-winning architectural practices. Certified partners receive priority engineering support, direct factory dispatch, custom BIM libraries, and branded showroom sample displays.
              </p>

              <div className="mt-6 space-y-2.5 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Exclusive territorial representation rights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Direct factory CAD/CAM engineering collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Full certification dossiers & fire-resistance documentation</span>
                </div>
              </div>
            </div>

            {/* Partnership Form */}
            <div>
              {!partnerSubmitted ? (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1">Company / Firm Name</label>
                      <input
                        type="text"
                        required
                        value={partnerData.firmName}
                        onChange={(e) => setPartnerData({ ...partnerData, firmName: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                        placeholder="e.g. Studio Arc Architects"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1">Contact Person</label>
                      <input
                        type="text"
                        required
                        value={partnerData.contactName}
                        onChange={(e) => setPartnerData({ ...partnerData, contactName: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
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
                        value={partnerData.email}
                        onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                        placeholder="contact@studio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1">Country / Region</label>
                      <input
                        type="text"
                        required
                        value={partnerData.country}
                        onChange={(e) => setPartnerData({ ...partnerData, country: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                        placeholder="e.g. United Kingdom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">Estimated Annual Portal Volume</label>
                    <select
                      value={partnerData.annualVolume}
                      onChange={(e) => setPartnerData({ ...partnerData, annualVolume: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    >
                      <option>5-10 Custom Monumental Doors / Year</option>
                      <option>10-25 Custom Doors / Year</option>
                      <option>25-50+ Commercial & Residential Projects</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">Project Portfolio / Overview</label>
                    <textarea
                      rows={2}
                      value={partnerData.message}
                      onChange={(e) => setPartnerData({ ...partnerData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                      placeholder="Brief description of your target clientele or upcoming residential developments..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold uppercase text-xs font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Dealer Application</span>
                  </button>
                </form>
              ) : (
                <div className="p-8 rounded bg-neutral-950 border border-emerald-500/50 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-white">Application Received</h4>
                  <p className="text-xs text-neutral-400 font-mono">
                    Thank you. Our Head of Global Partnerships will contact you within 24 business hours with commercial tier pricing and digital dealer sample kits.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
