// Product Catalogue and Specification Data for Ferrolux
// Covers all 4 verified architectural categories:
// 1. Premium steel main doors for villas and houses
// 2. Stainless steel doors
// 3. Designer steel doors with decorative finishes
// 4. Security / fire-rated steel doors

export type CategoryId = 
  | 'villa-doors' 
  | 'stainless-steel' 
  | 'designer-finishes' 
  | 'security-fire';

export interface FinishOption {
  id: string;
  name: string;
  hex: string;
  roughness: number;
  metalness: number;
  description: string;
  tag: string;
}

export interface HandleOption {
  id: string;
  name: string;
  type: 'recessed-led' | 'machined-bar' | 'biometric-flush' | 'sculpted-slab';
  lengthMm: number;
  material: string;
  description: string;
}

export interface DimensionOption {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  recommendedApplication: string;
}

export interface DoorProduct {
  id: string;
  name: string;
  series: string;
  category: CategoryId;
  tagline: string;
  description: string;
  pivotType: 'Offset Monumental Pivot' | 'Concealed Heavy-Duty Hinges' | 'Motorized Double Portal';
  defaultFinish: string;
  availableFinishes: string[];
  securityClass: 'RC3 (EN 1627)' | 'RC4 (EN 1627)' | 'RC5 (EN 1627)';
  fireRating: 'EI 60 (EN 1634-1)' | 'EI 90 (EN 1634-1)' | 'EI 120 (EN 1634-1)' | 'Non-Rated Architectural';
  acousticRating: string;
  thermalInsulation: string;
  leafWeightKg: number;
  maxDimensions: string;
  lockingSystem: string;
  featured: boolean;
  architecturalStyle: string;
  highlightFeatures: string[];
  idealFor: string;
  image: string;
}

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'brushed-stainless',
    name: 'Grade 316 Marine Brushed Stainless',
    hex: '#c0c7d0',
    roughness: 0.28,
    metalness: 0.95,
    description: 'Precision longitudinal hand-brushed grain with anti-fingerprint nano-shield.',
    tag: 'Marine-Grade 316'
  },
  {
    id: 'charcoal-obsidian',
    name: 'Industrial Charcoal Powdercoat',
    hex: '#1e2126',
    roughness: 0.45,
    metalness: 0.82,
    description: 'Deep architectural graphite micro-texture with high UV weather endurance.',
    tag: 'Architectural Grade'
  },
  {
    id: 'corten-patina',
    name: 'Atmospheric Corten Steel',
    hex: '#78432b',
    roughness: 0.72,
    metalness: 0.55,
    description: 'Natural stabilized oxide patina with organic warm rust undertones.',
    tag: 'Artisan Patina'
  },
  {
    id: 'champagne-bronze',
    name: 'PVD Champagne Bronze Titanium',
    hex: '#a38965',
    roughness: 0.25,
    metalness: 0.92,
    description: 'Physical Vapor Deposition titanium coating with rich warm metallic luster.',
    tag: 'PVD Vapor Infused'
  },
  {
    id: 'titanium-silver',
    name: 'Raw Satin Titanium Silver',
    hex: '#9ba4b0',
    roughness: 0.22,
    metalness: 0.96,
    description: 'Ultra-refined bead-blasted satin titanium finish with crisp cold reflections.',
    tag: 'Aerospace Grade'
  },
  {
    id: 'midnight-matte',
    name: 'Jet Obsidian Midnight Black',
    hex: '#0d0e12',
    roughness: 0.55,
    metalness: 0.75,
    description: 'Ultra-low-sheen stealth black architectural coating with deep absorption.',
    tag: 'Monolithic Stealth'
  }
];

export const HANDLE_OPTIONS: HandleOption[] = [
  {
    id: 'recessed-led',
    name: 'Full-Height Linear LED Channel',
    type: 'recessed-led',
    lengthMm: 2400,
    material: 'Anodized Dark Billet Aluminum with 2700K Warm LED',
    description: 'Architectural recessed vertical light trough illuminating the grip edge.'
  },
  {
    id: 'machined-bar',
    name: 'Solid 316 Machined Steel Bar',
    type: 'machined-bar',
    lengthMm: 1800,
    material: 'Solid Grade 316 Stainless Steel (50x25mm Profile)',
    description: 'Heavy architectural rectilinear pull bar with hand-radiused corners.'
  },
  {
    id: 'biometric-flush',
    name: 'Integrated Biometric Sensor Pull',
    type: 'biometric-flush',
    lengthMm: 1200,
    material: 'Micro-Bead Blasted Titanium with Capacitive Fingerprint',
    description: 'Concealed grip pocket with sub-second biometric sensor and haptic confirmation.'
  },
  {
    id: 'sculpted-slab',
    name: 'Monolith Architectural Push Plate',
    type: 'sculpted-slab',
    lengthMm: 800,
    material: 'Forged Industrial Steel with Bronze Inlay',
    description: 'Tactile minimalist flat plate for double-action automatic pivot installations.'
  }
];

export const DIMENSION_OPTIONS: DimensionOption[] = [
  {
    id: 'dim-estate',
    label: 'Standard Villa Grand (1200 x 2400 mm)',
    widthMm: 1200,
    heightMm: 2400,
    thicknessMm: 95,
    recommendedApplication: 'Luxury private residences, executive guest suites, courtyard portals.'
  },
  {
    id: 'dim-monumental',
    label: 'Monumental Pivot Portal (1600 x 3000 mm)',
    widthMm: 1600,
    heightMm: 3000,
    thicknessMm: 105,
    recommendedApplication: 'Double-height villa foyers, contemporary beachfront estates, private galleries.'
  },
  {
    id: 'dim-sovereign',
    label: 'Colossal Architectural Pivot (1800 x 3400 mm)',
    widthMm: 1800,
    heightMm: 3400,
    thicknessMm: 115,
    recommendedApplication: 'Grand monumental residences, flagship embassies, presidential architecture.'
  }
];

export const PRODUCT_CATALOGUE: DoorProduct[] = [
  // 1. Premium steel main doors for villas and houses
  {
    id: 'ferrolux-titan-pivot',
    name: 'AURA 3400 MONUMENTAL PIVOT',
    series: 'Villa Grand Series',
    category: 'villa-doors',
    tagline: 'Monumental 3.4-meter architectural steel pivot entrance with hydraulic damping.',
    description: 'Engineered specifically for expansive luxury villa entrances. Featuring an offset pivot spindle capable of supporting up to 800 kg leaf weight with finger-touch motion, full thermal break frame, and seamless laser-welded seams.',
    pivotType: 'Offset Monumental Pivot',
    defaultFinish: 'brushed-stainless',
    availableFinishes: ['brushed-stainless', 'charcoal-obsidian', 'titanium-silver', 'champagne-bronze'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '46 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.78 W/m²K',
    leafWeightKg: 420,
    maxDimensions: '2000 x 3800 mm',
    lockingSystem: 'Motorized 7-Point Automatic Deadbolt System with Concealed Electric Strikes',
    featured: true,
    architecturalStyle: 'Modernist Concrete & Minimalist Travertine Villas',
    highlightFeatures: [
      'Concealed floor hydraulic pivot with 3-dimensional on-site adjustment',
      'Dual thermal break barrier with polyamide insulating ribs',
      'Continuous magnetic perimeter weather gasket (airtight class 4)',
      'Subtle vertical shadow gaps with architectural precision'
    ],
    idealFor: 'Main entrance for contemporary multi-million dollar luxury villas.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ferrolux-vanguard-portal',
    name: 'VANGUARD DOUBLE GRAND PORTAL',
    series: 'Villa Grand Series',
    category: 'villa-doors',
    tagline: 'Symmetrical double-leaf steel portal for monumental architectural facades.',
    description: 'A stately double-door entrance system combining dual motorized active/passive locking leaves, synchronized concealed soft-closers, and architectural brushed steel cladding over an armored multi-chamber subframe.',
    pivotType: 'Motorized Double Portal',
    defaultFinish: 'charcoal-obsidian',
    availableFinishes: ['charcoal-obsidian', 'brushed-stainless', 'champagne-bronze'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 90 (EN 1634-1)',
    acousticRating: '48 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.82 W/m²K',
    leafWeightKg: 680,
    maxDimensions: '2800 x 3200 mm (Pair)',
    lockingSystem: '14-Point Heavy Motorized Interlocking System with Synchronized Relays',
    featured: true,
    architecturalStyle: 'Contemporary Classical & Modern Monumental Estates',
    highlightFeatures: [
      'Motorized auto-unlocking for passive leaf upon request',
      'Armored anti-pry threshold with motorized drop-down acoustic seal',
      'Biometric fingerprint scanner integrated flush into primary handle',
      'Triple-glazed safety glass side-lights with steel mullion reinforcement'
    ],
    idealFor: 'Expansive private estates, palatial homes, and executive residences.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  },

  // 2. Stainless steel doors
  {
    id: 'ferrolux-marine-316',
    name: 'CHRONOS 316 MARINE STAINLESS',
    series: 'Pure Inox Series',
    category: 'stainless-steel',
    tagline: 'High-alloy 316 marine-grade brushed stainless steel for coastal & alpine endurance.',
    description: 'Crafted entirely from surgical-grade AISI 316 austenitic stainless steel with molybdenum infusion for supreme corrosion resistance in harsh maritime salt-spray environments. Finished with longitudinal satin brushing and clear ceramic nano-coat.',
    pivotType: 'Offset Monumental Pivot',
    defaultFinish: 'brushed-stainless',
    availableFinishes: ['brushed-stainless', 'titanium-silver'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '44 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.84 W/m²K',
    leafWeightKg: 380,
    maxDimensions: '1600 x 3200 mm',
    lockingSystem: 'High-Security Stainless Steel Multi-Point Multipoint with Anti-Saw Pins',
    featured: true,
    architecturalStyle: 'Coastal Waterfront Residences & High-Altitude Alpine Chalets',
    highlightFeatures: [
      '100% AISI 316 Marine-grade stainless steel faceplates and internal chassis',
      'Corrosion warranty rated for Class C5-M extreme marine atmospheres',
      'Hand-dressed 45-degree chamfered seams with micro-bead welded corners',
      'Integrated hidden thermal barrier to prevent condensation'
    ],
    idealFor: 'Oceanfront villas, cliffside properties, and minimalist waterfront homes.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ferrolux-inox-satin',
    name: 'SILVERLINE SATIN MONOLITH',
    series: 'Pure Inox Series',
    category: 'stainless-steel',
    tagline: 'Continuous seamless stainless steel facade with flush floor-to-ceiling alignment.',
    description: 'A razor-sharp architectural door that sits perfectly coplanar with the adjacent stainless wall cladding. Features concealed 3D adjustable TECTUS hinges and automated biometric latch release.',
    pivotType: 'Concealed Heavy-Duty Hinges',
    defaultFinish: 'titanium-silver',
    availableFinishes: ['titanium-silver', 'brushed-stainless'],
    securityClass: 'RC3 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '42 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.88 W/m²K',
    leafWeightKg: 310,
    maxDimensions: '1400 x 2900 mm',
    lockingSystem: 'Motorized Magnetic Silent Latch with 5-Point Locking Pins',
    featured: false,
    architecturalStyle: 'Ultra-Minimalist & High-Tech Contemporary Architecture',
    highlightFeatures: [
      'Zero exterior frame reveal — 100% flush wall integration',
      'Motorized silent magnetic latch mechanism (zero metallic rattle)',
      'Sub-millimeter alignment tolerances (±0.2mm precision)',
      'Compatible with Crestron, Lutron, and KNX smart building protocols'
    ],
    idealFor: 'Interior courtyard entrances and ultra-clean modern architectural villas.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
  },

  // 3. Designer steel doors with decorative finishes
  {
    id: 'ferrolux-kuro-fluted',
    name: 'KURO SLAT FLUTED OBSIDIAN',
    series: 'Artisan Architectural',
    category: 'designer-finishes',
    tagline: 'Deep 3D vertical steel fluting with dramatic architectural shadow play.',
    description: 'Sculpted with custom-extruded heavy steel vertical fins finished in ultra-matte obsidian. The alternating 25mm blade profiles create hypnotic depth and shadow gradients as daylight shifts across the facade.',
    pivotType: 'Offset Monumental Pivot',
    defaultFinish: 'midnight-matte',
    availableFinishes: ['midnight-matte', 'charcoal-obsidian', 'champagne-bronze'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '46 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.79 W/m²K',
    leafWeightKg: 460,
    maxDimensions: '1700 x 3400 mm',
    lockingSystem: '7-Point Motorized Biometric Deadbolt with Keypad Override',
    featured: true,
    architecturalStyle: 'Moody Architectural Villas, Japanese Minimalist & Brutalist Estates',
    highlightFeatures: [
      'Three-dimensional vertical fins milled from architectural alloy steel',
      'Concealed full-height linear warm LED backlighting (2700K)',
      'Tactile deep charcoal anti-scratch powdercoat',
      'Solid bronze inset reveal along the pivot edge'
    ],
    idealFor: 'Architects seeking strong sculptural identity and texture for statement entrances.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ferrolux-corten-elysium',
    name: 'ELYSIUM CORTEN & SMOKED GLASS',
    series: 'Artisan Architectural',
    category: 'designer-finishes',
    tagline: 'Weathering Corten steel framed around triple-pane acoustic privacy glass.',
    description: 'Combines the organic, earthy warmth of pre-patinated Corten steel with a structural floor-to-ceiling dark smoked glass vision panel. Fitted with warm concealed edge lighting that turns the door into a glowing lantern at dusk.',
    pivotType: 'Offset Monumental Pivot',
    defaultFinish: 'corten-patina',
    availableFinishes: ['corten-patina', 'champagne-bronze', 'charcoal-obsidian'],
    securityClass: 'RC3 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '45 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.85 W/m²K',
    leafWeightKg: 410,
    maxDimensions: '1500 x 3100 mm',
    lockingSystem: 'Multi-Point Motorized Hook Bolts with Electric Rim Strike',
    featured: true,
    architecturalStyle: 'Earthy Organic Modernism & Desert Concrete Architecture',
    highlightFeatures: [
      'Naturally stabilized oxide layer sealed with UV matte polyurethane',
      'Laminated P6B anti-bandit smoked acoustic glass strip',
      'Internal warm LED halo illumination controllable via DMX/KNX',
      'Handcrafted artisan patina variations making each door unique'
    ],
    idealFor: 'Desert modern villas, vineyard estates, and timber/stone architecture.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ferrolux-bronze-matrix',
    name: 'TITAN BRONZE GEOMETRIC MATRIX',
    series: 'Artisan Architectural',
    category: 'designer-finishes',
    tagline: 'PVD Champagne Bronze with precision laser-engraved geometric tessellation.',
    description: 'A masterpiece of precision manufacturing. The steel panel undergoes 5-axis laser grooving to create a bespoke parametric facet pattern, followed by titanium vapor deposition to yield a durable, radiant champagne bronze sheen.',
    pivotType: 'Offset Monumental Pivot',
    defaultFinish: 'champagne-bronze',
    availableFinishes: ['champagne-bronze', 'charcoal-obsidian', 'titanium-silver'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 60 (EN 1634-1)',
    acousticRating: '46 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.80 W/m²K',
    leafWeightKg: 440,
    maxDimensions: '1600 x 3200 mm',
    lockingSystem: '11-Point High-Security Electro-Mechanical Locking Shield',
    featured: false,
    architecturalStyle: 'Metropolitan Penthouses & Contemporary Luxury Villas',
    highlightFeatures: [
      'Bespoke laser-milled geometric relief with 0.1mm accuracy',
      'Hardened PVD surface hardness reaching 2400 Vickers',
      'Cast bronze custom pull handle machined from solid ingot',
      'Integrated door position monitoring and tamper sensors'
    ],
    idealFor: 'High-end penthouses and exclusive residences demanding bespoke decorative art.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
  },

  // 4. Security / fire-rated steel doors
  {
    id: 'ferrolux-fortress-rc5',
    name: 'VALKYRIE RC5 ARMORED SANCTUARY',
    series: 'Security & Fire Barrier',
    category: 'security-fire',
    tagline: 'Maximum security rating Class 5 (EN 1627) with certified ballistic manganese armor.',
    description: 'Designed for private estate master suites, safe rooms, and high-security residences. Built with a 6mm hardened manganese alloy anti-drill plate, continuous multi-hook motorized locking bars, and armored hinge protectors that resist diamond drills, plasma cutters, and wedge attacks.',
    pivotType: 'Concealed Heavy-Duty Hinges',
    defaultFinish: 'charcoal-obsidian',
    availableFinishes: ['charcoal-obsidian', 'brushed-stainless', 'midnight-matte'],
    securityClass: 'RC5 (EN 1627)',
    fireRating: 'EI 90 (EN 1634-1)',
    acousticRating: '48 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.76 W/m²K',
    leafWeightKg: 520,
    maxDimensions: '1400 x 2800 mm',
    lockingSystem: '11-Point Hardened Manganese Deadbolts + Independent Panic Bypass Mechanism',
    featured: true,
    architecturalStyle: 'Discreet Armored Luxury Residences & High-Value Asset Estates',
    highlightFeatures: [
      'Certified Class 5 Burglar Resistance under European Standard EN 1627',
      'Hardened manganese alloy armor resisting power tools up to 15+ minutes',
      'Heavy-duty armored cylinder with magnetic anti-picking rotary pins',
      'Secondary manual mechanical override isolated inside security core'
    ],
    idealFor: 'Safe rooms, master villa wings, art collectors, and diplomatic residences.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ferrolux-pyro-ei120',
    name: 'IGNIS EI 120 CERTIFIED FIRE PORTAL',
    series: 'Security & Fire Barrier',
    category: 'security-fire',
    tagline: '120-minute integrity & insulation fire barrier with intumescent thermal expansion seals.',
    description: 'Certified under European Norm EN 1634-1 for 120 minutes of continuous fire resistance. Utilizes proprietary non-toxic high-density mineral silicates within an insulated steel sandwich chassis, preventing both flame breakthrough and radiant heat transfer.',
    pivotType: 'Concealed Heavy-Duty Hinges',
    defaultFinish: 'brushed-stainless',
    availableFinishes: ['brushed-stainless', 'charcoal-obsidian', 'titanium-silver'],
    securityClass: 'RC4 (EN 1627)',
    fireRating: 'EI 120 (EN 1634-1)',
    acousticRating: '48 dB (ISO 10140-2)',
    thermalInsulation: 'Ud = 0.74 W/m²K',
    leafWeightKg: 490,
    maxDimensions: '1500 x 3000 mm',
    lockingSystem: 'Fire-Safe Multi-Point Panic Release with Auto-Sealing Drop Seal',
    featured: true,
    architecturalStyle: 'Luxury Commercial Enclaves, Helipad Entrances & Villa Garages',
    highlightFeatures: [
      'Certified 120 Minutes Fire Integrity (E) and Thermal Insulation (I) (EN 1634-1)',
      'Triple perimeter intumescent graphite seals expanding at 180°C',
      'Cold smoke and hot toxic gas containment seals (Sa and Sm rated)',
      'Architectural luxury aesthetic matching living room doors with no industrial look'
    ],
    idealFor: 'Underground exotic car garages, high-rise luxury towers, and commercial pavilions.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'villa-doors' as CategoryId,
    name: 'Villa & House Main Doors',
    subtitle: 'Monumental pivot portals & insulated grand architectural entrances',
    count: 2,
    badge: 'Flagship Collection'
  },
  {
    id: 'stainless-steel' as CategoryId,
    name: 'Stainless Steel Doors',
    subtitle: 'Marine-grade AISI 316 brushed steel with maritime endurance',
    count: 2,
    badge: 'Coastal & Inox'
  },
  {
    id: 'designer-finishes' as CategoryId,
    name: 'Designer Steel Doors',
    subtitle: 'Fluted slats, Corten rust patinas & PVD champagne bronze',
    count: 3,
    badge: 'Artisan Bespoke'
  },
  {
    id: 'security-fire' as CategoryId,
    name: 'Security & Fire-Rated Doors',
    subtitle: 'RC4/RC5 burglar resistance & EI 60/90/120 certified thermal barriers',
    count: 2,
    badge: 'Certified Armor'
  }
];
