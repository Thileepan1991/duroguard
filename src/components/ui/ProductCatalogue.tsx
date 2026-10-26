import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Volume2, 
  Maximize2, 
  Sparkles, 
  MessageCircle, 
  ArrowUpRight, 
  Search,
  CheckCircle2,
  Box
} from 'lucide-react';
import { 
  PRODUCT_CATALOGUE, 
  CATEGORIES_LIST, 
} from '../../config/productsData';
import type { 
  CategoryId, 
  DoorProduct 
} from '../../config/productsData';
import { soundFX } from '../../utils/audioSynthesizer';
import { BRAND_CONFIG } from '../../config/brandConfig';

interface ProductCatalogueProps {
  onSelectProductFor3D: (product: DoorProduct) => void;
  onOpenProductDetail: (product: DoorProduct) => void;
  onOpenEnquiry: (product?: DoorProduct) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onSelectProductFor3D,
  onOpenProductDetail,
  onOpenEnquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCT_CATALOGUE.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleWhatsAppProduct = (item: DoorProduct) => {
    soundFX.playTactileClick();
    const phone = BRAND_CONFIG.contact.whatsappNumber;
    const text = encodeURIComponent(
      `Hello ${BRAND_CONFIG.brandName} Concierge, I am interested in specifications and pricing for the ${item.name} (${item.series}). Please send technical dossier.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  };

  return (
    <section id="catalogue" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Box className="w-3.5 h-3.5" />
            <span>Architectural Systems Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight uppercase">
            Mastery in Steel & Inox
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-sans leading-relaxed">
            Engineered exclusively for monumental villas, luxury waterfront residences, and high-security architectural masterworks. Certified European standards with zero compromises.
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by series, pivot kinematics, or finish..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 4 Primary Categories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => {
              soundFX.playTactileClick();
              setActiveCategory('all');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-neutral-100 text-neutral-950 font-bold shadow-lg'
                : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            All Systems ({PRODUCT_CATALOGUE.length})
          </button>

          {CATEGORIES_LIST.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playTactileClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-neutral-950 text-amber-300' : 'bg-neutral-800 text-neutral-300'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((door) => (
            <div
              key={door.id}
              className="group bg-neutral-900/50 rounded-lg border border-neutral-800/80 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/20"
            >
              <div>
                {/* Product Imagery */}
                <div className="relative h-64 overflow-hidden bg-neutral-950">
                  <img
                    src={door.image}
                    alt={door.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-neutral-700/60 text-[10px] font-mono text-amber-300 uppercase tracking-widest">
                      {door.series}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-300">
                      {door.securityClass.split(' ')[0]}
                    </span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-300 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                      {door.pivotType}
                    </span>
                    <button
                      onClick={() => {
                        soundFX.playTactileClick();
                        onSelectProductFor3D(door);
                      }}
                      className="px-3 py-1 rounded bg-white hover:bg-amber-400 text-neutral-950 text-xs font-mono font-bold flex items-center gap-1 shadow-lg transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Configure in 3D</span>
                    </button>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                    {door.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {door.tagline}
                  </p>

                  {/* Technical Specifications Matrix */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/80 grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{door.securityClass}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span className="truncate">{door.fireRating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Volume2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{door.acousticRating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Maximize2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{door.thermalInsulation}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-4 pt-4 border-t border-neutral-800/60 space-y-1.5">
                    {door.highlightFeatures.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onOpenProductDetail(door);
                  }}
                  className="flex-1 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-medium tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Full Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleWhatsAppProduct(door)}
                  title="WhatsApp Enquiry"
                  className="p-2.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    soundFX.playTactileClick();
                    onOpenEnquiry(door);
                  }}
                  className="px-4 py-2.5 rounded bg-neutral-200 hover:bg-amber-400 text-neutral-950 text-xs font-bold font-mono tracking-wider transition-colors cursor-pointer"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
