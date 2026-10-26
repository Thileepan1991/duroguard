# FERROLUX® | Monumental Steel & Stainless Architectural Portals

An award-winning, cinematic, scroll-driven 3D brand experience for a high-end luxury steel & stainless steel door manufacturer.

Built with **React**, **Three.js** (`@react-three/fiber` & `@react-three/drei`), **Tailwind CSS**, and procedural Web Audio synthesis.

---

## 🌟 Executive Overview & Architectural Scope

The application covers four primary product categories:

1. **Premium Steel Main Doors for Villas & Houses**
   - Monumental 3.4m - 3.8m offset pivot entrance systems (e.g., *Aura 3400 Monumental Pivot*, *Vanguard Double Grand Portal*).
   - Concealed in-floor hydraulic pivot spindles with 800 kg load capacity and 3D on-site alignment.
   - Flush architectural travertine and concrete portal surrounds with recessed 2700K warm linear illumination.

2. **Stainless Steel Doors**
   - High-alloy **AISI 316 Marine-Grade** brushed stainless steel for harsh maritime salt-spray and high-altitude alpine endurance (*Chronos 316 Marine Stainless*, *Silverline Satin Monolith*).
   - 45-degree chamfered laser-welded seams, micro-bead blasted titanium finishes, and nano-ceramic anti-fingerprint shield.

3. **Designer Steel Doors with Decorative Finishes**
   - Sculptural 3D vertical fluted steel slats (*Kuro Slat Fluted Obsidian*).
   - Atmospheric stabilized oxide Corten steel paired with acoustic dark smoked triple-pane privacy glass (*Elysium Corten*).
   - PVD Titanium Champagne Bronze with 5-axis precision laser tessellation (*Titan Bronze Geometric Matrix*).

4. **Security & Fire-Rated Certified Steel Doors**
   - Certified **EN 1627 Class RC4 & RC5 Burglar Resistance** with 6mm hardened manganese anti-drill plates and 7–14 point motorized deadbolts.
   - Certified **EN 1634-1 EI 60, EI 90 & EI 120 Fire Barriers** with intumescent expanding graphite seals and mineral silicate cores.
   - **ISO 10140-2 Acoustic Insulation** achieving **48 dB** noise attenuation with automated guillotine drop-down threshold seals.
   - **EN ISO 10077-1 Thermal Break** achieving **Ud = 0.76 W/m²K** for Passive House compliance.

---

## 🎨 Visual Identity: Silver & Charcoal — Industrial Premium

- **Deep Charcoal & Slate Palette**: `#060709`, `#0c0e12`, `#13171f`, `#1b202a`
- **Silver & Brushed Stainless**: `#f8fafc`, `#c0c7d0`, `#94a3b8`, `#64748b`
- **Architectural Lighting**: 2700K warm recessed linear LED accents (`#f59e0b`, `#fff0d4`), champagne bronze PVD (`#a38965`).
- **Typography**: 
  - Headings: `Cinzel` (sculptural luxury architectural serif)
  - UI & Copy: `Plus Jakarta Sans` (refined Swiss precision)
  - Engineering & Telemetry: `JetBrains Mono` (cad coordinate markings, certified test data)

---

## 🚀 Key Interactive & 3D Engineering Features

### 1. Dual 3D Interaction Modes
- **Guided Cinematic Scroll Mode**:
  - **Stage 1 (Hero)**: Forward camera tracking into a luxury villa entrance portal; door smoothly swings open on its offset pivot axis with realistic physical damping.
  - **Stage 2 (Engineering Anatomy)**: Exploded 3D cutaway view separating the door leaf into 6 anatomical layers:
    1. 3mm Cold-Rolled Galvanized Steel / 316 Inox Faceplate
    2. 4mm Hardened Manganese Anti-Drill Shield
    3. Tubular Steel Chassis & 7-Point Motorized Deadbolt Transmission
    4. High-Density Basalt Rockwool Insulation Core (48 dB sound reduction)
    5. Double EPDM Magnetic Acoustic Weatherseals
    6. Interior Architectural Stainless Facade
  - **Stage 3 (Lock Kinematics)**: Close-up macro inspection with motorized deadbolts that extend and retract with synchronized sound.
- **Free 3D Orbit & Inspection Mode**:
  - One-click toggle (`Orbit 3D` in navbar or hero) enables 360° orbit, pan, and zoom via `OrbitControls`.

### 2. Interactive 3D Configurator Studio
- **Finishes**: Grade 316 Marine Brushed Stainless, Industrial Charcoal Powdercoat, Atmospheric Corten Patina, PVD Champagne Bronze, Satin Titanium Silver, Jet Obsidian Black.
- **Surface Styles**: Monolithic Flush, 3D Vertical Fluted Ribs, Smoked Glass & Steel insert.
- **Hardware**: Full-Height Linear Recessed LED Channel, Solid 316 Machined Steel Bar, Integrated Biometric Sensor Pull, Monolith Push Plate.
- **Dimensions**: Villa Grand (1200x2400mm), Monumental Pivot (1600x3000mm), Colossal Sovereign (1800x3400mm).
- **Toggles**: Motorized Deadbolt engagement, 2700K warm linear LED glow, Biometric smart sensor.

### 3. Procedural Web Audio Sound Synthesizer (`src/utils/audioSynthesizer.ts`)
- Pure Web Audio API procedural synthesis (0 external audio files needed):
  - Heavy mechanical magnetic lock clunk and motorized deadbolt whir
  - Smooth low-frequency hydraulic door swing resonance
  - Tactile brushed steel UI click
  - Audio mute/unmute toggle in header with localStorage persistence.

### 4. High-Conversion Enquiry Engine & Dealer Network
- **WhatsApp Concierge Integration**: Pre-formats full configuration details into WhatsApp chat:
  - Selected model, finish, dimensions, hardware, smart lock status, security class.
- **Dynamic Specification Sheet Generator (`src/utils/specGenerator.ts`)**: Instant one-click download of an official confidential text specification schedule.
- **Direct Quotation Modal (`EnquiryModal.tsx`)**: Generates unique reference code (`FX-XXXXXX`), persists submissions to localStorage, and provides instant download and WhatsApp escalation.
- **Material Sample Kit Request (`SampleKitModal.tsx`)**: Allows architects and interior designers to order physical metal sample tiles.
- **Global Showroom Locator (`DealerNetwork.tsx`)**: Flagship ateliers in Zurich, London, Dubai, New York, Milan, and Mumbai with direct private consultation booking and dealer partnership application form.

---

## 🛠️ Technology Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (architectural icons)
- **Web Audio API** (procedural audio synthesizer)

---

## 📦 Setup & Deployment Instructions

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm `v10+`

### Installation
```bash
# Clone or navigate to the project directory
cd c:/xampp_lite_8_5/www/premium_doors

# Install dependencies (if not already installed)
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Generates the optimized production bundle in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Brand & Product Customization Guide

All company metadata, contacts, WhatsApp concierge numbers, showrooms, and product catalogue items are completely configurable in two files:

1. **Brand Identity & Showrooms**: `src/config/brandConfig.ts`
   ```typescript
   export const BRAND_CONFIG = {
     brandName: "FERROLUX",
     brandTagline: "Monumental Steel & Stainless Portals",
     contact: {
       phone: "+44 (0) 20 7946 0888",
       whatsappNumber: "442079460888", // international without +
       email: "concierge@ferrolux-doors.com",
       headquarters: "Zurich & London"
     },
     showrooms: [ ... ]
   };
   ```

2. **Products, Materials & Finishes**: `src/config/productsData.ts`
   - Modify existing doors or add new products under any of the 4 verified categories.
   - Adjust finishes, roughness, metalness, and hex codes.
   - Adjust handles and dimension presets.

---

## 🛡️ Engineering Credential Standards

- **EN 1627 / EN 1630**: Resistance Classes RC3, RC4, and RC5 (Manual & Power Tool Attack Resistance)
- **EN 1634-1 / EN 13501-2**: Fire Resistance Classes EI 60, EI 90, and EI 120 (Integrity and Thermal Insulation)
- **ISO 10140-2 / ISO 717-1**: Acoustic Attenuation Rw = 42 dB to 48 dB
- **EN ISO 10077-1**: Thermal Transmittance Ud = 0.76 to 0.84 W/m²K
- **AISI 316 Stainless Steel**: Marine-grade austenitic alloy with 2-3% molybdenum infusion
