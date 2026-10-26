import React from 'react';
import { Camera, Sun, Moon, Mountain, MapPin } from 'lucide-react';
import type { EnvironmentType } from '../3d/ArchitecturalScene';
import { soundFX } from '../../utils/audioSynthesizer';

interface ArchitecturalShowcaseProps {
  currentEnv: EnvironmentType;
  onChangeEnv: (env: EnvironmentType) => void;
  onOpenEnquiry: () => void;
}

export const ArchitecturalShowcase: React.FC<ArchitecturalShowcaseProps> = ({
  currentEnv,
  onChangeEnv,
  onOpenEnquiry,
}) => {
  const environments = [
    {
      id: 'modern-villa' as EnvironmentType,
      name: 'Modernist Villa Portal',
      location: 'Lake Como, Italy',
      desc: 'Travertine stone portal with warm 2700K recessed architectural illumination.',
      icon: Sun,
    },
    {
      id: 'minimalist-concrete' as EnvironmentType,
      name: 'Brutalist Concrete Residence',
      location: 'Kyoto / Bel Air',
      desc: 'Board-formed exposed concrete with sharp architectural shadow gaps.',
      icon: Moon,
    },
    {
      id: 'alpine-chalet' as EnvironmentType,
      name: 'High-Altitude Alpine Chalet',
      location: 'St. Moritz, Switzerland',
      desc: 'Charred timber and flamed Swiss granite facade with cold mountain lighting.',
      icon: Mountain,
    },
  ];

  const showcaseProjects = [
    {
      title: 'Villa Seraphina',
      location: 'Lake Como, Italy',
      doorModel: 'AURA 3400 Monumental Pivot',
      finish: 'AISI 316 Marine Brushed Stainless',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      specs: 'Span: 1800 x 3400 mm • Leaf: 480 kg • RC4 Armored',
    },
    {
      title: 'The Monolith Penthouse',
      location: 'Mayfair, London',
      doorModel: 'KURO Slat Fluted Obsidian',
      finish: 'Industrial Charcoal Powdercoat with 2700K LED',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      specs: 'Span: 1500 x 3000 mm • 48 dB Acoustic Rating',
    },
    {
      title: 'Alpine Sanctuary Estate',
      location: 'St. Moritz, Switzerland',
      doorModel: 'VALKYRIE RC5 Armored Portal',
      finish: 'Atmospheric Corten Steel & Titanium',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      specs: 'Ud = 0.74 W/m²K • Ballistic RC5 Manganese Shield',
    },
  ];

  return (
    <section id="showcase" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Architectural Contexts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight uppercase">
            In Situ Architectural Grandeur
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-sans leading-relaxed">
            Switch the real-time 3D environment lighting above to visualize how steel and brushed stainless surfaces interact with distinct architectural backdrops.
          </p>
        </div>

        {/* Realtime 3D Environment Switcher Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {environments.map((env) => {
            const Icon = env.icon;
            const isSelected = currentEnv === env.id;
            return (
              <button
                key={env.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  onChangeEnv(env.id);
                }}
                className={`p-5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-neutral-900/90 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      {env.name}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                      Active In 3D
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 font-mono flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-amber-400/80" />
                  <span>{env.location}</span>
                </p>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                  {env.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Curated In Situ Project Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {showcaseProjects.map((proj, idx) => (
            <div
              key={idx}
              className="group relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between"
            >
              <div className="relative h-72 overflow-hidden bg-neutral-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-amber-300 uppercase tracking-widest border border-neutral-800">
                    {proj.location}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-neutral-300 font-mono mt-1">
                  Model: {proj.doorModel}
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Finish: {proj.finish}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{proj.specs}</span>
                </div>

                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onOpenEnquiry();
                  }}
                  className="mt-5 w-full py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Similar Project Spec
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
