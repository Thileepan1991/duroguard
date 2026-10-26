import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Volume2, 
  Thermometer, 
  CheckCircle, 
  Award 
} from 'lucide-react';
import { soundFX } from '../../utils/audioSynthesizer';

export const SecurityEngineering: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'fire' | 'acoustic' | 'thermal'>('security');

  return (
    <section id="security" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Technical Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight uppercase">
            Unyielding Security. Certified Precision.
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-sans leading-relaxed">
            Every Ferrolux portal is engineered to rigorous European architectural and defense standards. We never make unsubstantiated claims — all metrics are tested under standardized laboratory protocols.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: 'security', label: 'EN 1627 Burglar Armor', icon: ShieldAlert },
            { id: 'fire', label: 'EN 1634-1 Fire Barriers', icon: Flame },
            { id: 'acoustic', label: 'ISO 10140-2 Acoustics (48dB)', icon: Volume2 },
            { id: 'thermal', label: 'Thermal Break (Ud 0.76)', icon: Thermometer },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 sm:p-10 backdrop-blur-md">
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                  Class RC4 & RC5 Burglar Resistance (EN 1627)
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Tested Against Heavy Power Drills, Crowbars & Saws
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  Resistance Class RC5 represents one of the highest civilian security ratings in Europe. Tested to withstand planned forced-entry attacks using heavy power tools (including angle grinders, reciprocating sabre saws, and carbide drills) for up to 15 continuous minutes.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Hardened Manganese Anti-Drill Plates</h4>
                      <p className="text-xs text-neutral-400">Protects lock gearbox and cylinder with 6mm rotary manganese alloy that blunts carbide and diamond drill bits.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">7 to 14-Point Motorized Deadbolts</h4>
                      <p className="text-xs text-neutral-400">Solid 20mm hardened steel pins with anti-saw rotating sleeves that prevent blade friction.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Concealed Anti-Pry Hinge Claws</h4>
                      <p className="text-xs text-neutral-400">Fixed rear interlocks anchor the door leaf directly into the reinforced steel frame when closed.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Spec Card */}
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Test Standard</span>
                  <span className="text-xs font-mono text-amber-400 font-bold">EN 1627 / EN 1630</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-400">Static Load Resistance:</span>
                      <span className="text-white font-bold">15,000 N (1.5 Metric Tons)</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-amber-400 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-400">Dynamic Pendulum Impact:</span>
                      <span className="text-white font-bold">50 kg Soft Body Drop @ 1.2m</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-[95%] h-full bg-amber-400 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-neutral-400">Manual Attack Duration:</span>
                      <span className="text-white font-bold">15 min continuous contact</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-amber-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fire' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded">
                  Certified EI 60 / EI 90 / EI 120 (EN 1634-1)
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Up to 120 Minutes of Thermal & Flame Containment
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  European standard EN 1634-1 tests both Integrity (E) and Thermal Insulation (I). While standard steel doors conduct scorching heat within minutes, Ferrolux doors maintain surface temperature below 140°C on the unexposed side for up to 2 full hours.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Triple Intumescent Perimeter Gaskets</h4>
                      <p className="text-xs text-neutral-400">Expand up to 25x their volume at 180°C, hermetically sealing gaps against lethal toxic gases and smoke.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Non-Toxic Mineral Silicate Core</h4>
                      <p className="text-xs text-neutral-400">Endothermic core releases bound moisture during extreme heat, delaying temperature rise without off-gassing.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Spec Card */}
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Test Standard</span>
                  <span className="text-xs font-mono text-orange-400 font-bold">EN 1634-1 / EN 13501-2</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Integrity Classification:</span>
                    <span className="text-white font-bold">E 60 / E 90 / E 120</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Insulation Classification:</span>
                    <span className="text-white font-bold">I 60 / I 90 / I 120</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Smoke Containment:</span>
                    <span className="text-white font-bold">Sa (Cold) & Sm (Hot Gas)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Furnace Temp Test:</span>
                    <span className="text-white font-bold">1,049°C for 120 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'acoustic' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded">
                  Acoustic Attenuation (ISO 10140-2)
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  48 dB Noise Reduction — Sanctuary Silence
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  A 48 dB reduction reduces loud street traffic, sirens, or storm winds to the faint whisper of a quiet library. Multi-density core dampening eliminates metallic resonance.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Automated Drop-Down Acoustic Guillotine Seal</h4>
                      <p className="text-xs text-neutral-400">Mechanically deploys upon door closure to seal the threshold gap with zero floor dragging.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Dual EPDM Compressed Gaskets</h4>
                      <p className="text-xs text-neutral-400">Magnetic perimeter seals create an airtight acoustic envelope around all four edges.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Spec Card */}
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Test Standard</span>
                  <span className="text-xs font-mono text-sky-400 font-bold">ISO 10140-2 / ISO 717-1</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Weighted Sound Reduction:</span>
                    <span className="text-white font-bold">Rw = 46 to 48 dB</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Traffic Noise Spectrum:</span>
                    <span className="text-white font-bold">Rw + Ctr = 42 dB</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Air Permeability:</span>
                    <span className="text-white font-bold">Class 4 (EN 12207)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'thermal' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                  Thermal Insulation (EN ISO 10077-1)
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Ud = 0.76 W/m²K — Passive House Compatible
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  Thermal bridging is eliminated using high-performance glass-fiber reinforced polyamide thermal barriers. Even during sub-zero alpine winters, the interior stainless surface remains warm to the touch with zero condensation.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Dual Polyamide Thermal Break Bars</h4>
                      <p className="text-xs text-neutral-400">Physically separates exterior and interior steel envelopes to block thermal conduction.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">Aerogel & Rockwool Insulation</h4>
                      <p className="text-xs text-neutral-400">Ultra-low thermal conductivity lambda of 0.034 W/mK ensures superior energy efficiency.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Spec Card */}
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 space-y-4">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Test Standard</span>
                  <span className="text-xs font-mono text-purple-400 font-bold">EN ISO 10077-1</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Overall Thermal Value:</span>
                    <span className="text-white font-bold">Ud = 0.76 to 0.82 W/m²K</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Wind Load Resistance:</span>
                    <span className="text-white font-bold">Class C5 (EN 12210)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono py-1 border-b border-neutral-900">
                    <span className="text-neutral-400">Water Tightness:</span>
                    <span className="text-white font-bold">Class 9A (600 Pa)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
