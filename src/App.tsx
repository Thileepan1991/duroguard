import { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { StudioSection } from './components/ui/StudioSection';
import { ProductCatalogue } from './components/ui/ProductCatalogue';
import { ProductDetailModal } from './components/ui/ProductDetailModal';
import { SecurityEngineering } from './components/ui/SecurityEngineering';
import { ArchitecturalShowcase } from './components/ui/ArchitecturalShowcase';
import { DealerNetwork } from './components/ui/DealerNetwork';
import { EnquiryModal } from './components/ui/EnquiryModal';
import { SampleKitModal } from './components/ui/SampleKitModal';
import { Footer } from './components/ui/Footer';
import { 
  PRODUCT_CATALOGUE, 
  FINISH_OPTIONS, 
  HANDLE_OPTIONS, 
  DIMENSION_OPTIONS, 
} from './config/productsData';
import type { 
  DoorProduct, 
  FinishOption, 
  HandleOption, 
  DimensionOption 
} from './config/productsData';
import type { EnvironmentType } from './components/3d/ArchitecturalScene';

export function App() {
  // State for 3D Product & Configuration
  const [selectedProduct, setSelectedProduct] = useState<DoorProduct>(PRODUCT_CATALOGUE[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISH_OPTIONS[0]);
  const [selectedHandle, setSelectedHandle] = useState<HandleOption>(HANDLE_OPTIONS[0]);
  const [selectedDimension, setSelectedDimension] = useState<DimensionOption>(DIMENSION_OPTIONS[1]);
  const [selectedStyle, setSelectedStyle] = useState<string>('monolith');

  // Kinematic & Interactive 3D States
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [hasLedAccent, setHasLedAccent] = useState(true);
  const [hasSmartLock, setHasSmartLock] = useState(true);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [environmentType, setEnvironmentType] = useState<EnvironmentType>('modern-villa');

  // Modals
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<DoorProduct | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);

  // Handlers
  const handleToggleDoorOpen = () => {
    setIsDoorOpen(prev => !prev);
  };

  const handleToggleLock = () => {
    setIsLocked(prev => !prev);
  };

  const handleToggleLed = () => {
    setHasLedAccent(prev => !prev);
  };

  const handleToggleSmartLock = () => {
    setHasSmartLock(prev => !prev);
  };

  const handleToggleOrbit = () => {
    setIsOrbitMode(prev => !prev);
  };

  const handleSelectProduct = (product: DoorProduct) => {
    setSelectedProduct(product);
    // Set matching default finish
    const matchingFinish = FINISH_OPTIONS.find(f => f.id === product.defaultFinish);
    if (matchingFinish) setSelectedFinish(matchingFinish);

    // Style adjustments
    if (product.id.includes('fluted')) {
      setSelectedStyle('fluted');
    } else if (product.id.includes('corten')) {
      setSelectedStyle('glass-corten');
    } else {
      setSelectedStyle('monolith');
    }
  };

  const handleSelectProductForStudio = (product: DoorProduct) => {
    handleSelectProduct(product);
    handleScrollToSection('studio');
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-neutral-100 selection:bg-amber-400 selection:text-black font-sans antialiased">
      {/* ================= FIXED NAVBAR ================= */}
      <Navbar
        isOrbitMode={isOrbitMode}
        onToggleOrbit={handleToggleOrbit}
        onOpenCatalogue={() => handleScrollToSection('catalogue')}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        onOpenSampleKit={() => setIsSampleKitOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* ================= MAIN CONTENT FLOW ================= */}
      <main className="relative z-10 w-full">
        {/* Section 1: Hero Entrance with Dedicated 3D Stage */}
        <HeroSection
          selectedProduct={selectedProduct}
          selectedFinish={selectedFinish}
          selectedHandle={selectedHandle}
          selectedStyle={selectedStyle}
          isDoorOpen={isDoorOpen}
          isLocked={isLocked}
          hasLedAccent={hasLedAccent}
          isOrbitMode={isOrbitMode}
          environmentType={environmentType}
          onToggleDoorOpen={handleToggleDoorOpen}
          onToggleLock={handleToggleLock}
          onToggleOrbit={handleToggleOrbit}
          onSelectFinish={setSelectedFinish}
          onScrollToSection={handleScrollToSection}
          onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
        />

        {/* Section 2: Dedicated 3D Bespoke Studio & Engineering Anatomy Lab */}
        <StudioSection
          selectedProduct={selectedProduct}
          selectedFinish={selectedFinish}
          selectedHandle={selectedHandle}
          selectedDimension={selectedDimension}
          selectedStyle={selectedStyle}
          isDoorOpen={isDoorOpen}
          isLocked={isLocked}
          hasLedAccent={hasLedAccent}
          hasSmartLock={hasSmartLock}
          isOrbitMode={isOrbitMode}
          environmentType={environmentType}
          onToggleDoorOpen={handleToggleDoorOpen}
          onToggleLock={handleToggleLock}
          onToggleLed={handleToggleLed}
          onToggleSmartLock={handleToggleSmartLock}
          onToggleOrbit={handleToggleOrbit}
          onSelectProduct={handleSelectProduct}
          onSelectFinish={setSelectedFinish}
          onSelectHandle={setSelectedHandle}
          onSelectDimension={setSelectedDimension}
          onSelectStyle={setSelectedStyle}
          onChangeEnvironment={setEnvironmentType}
          onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
        />

        {/* Section 3: Product Catalogue (4 Core Categories) */}
        <ProductCatalogue
          onSelectProductFor3D={handleSelectProductForStudio}
          onOpenProductDetail={(prod) => setSelectedDetailProduct(prod)}
          onOpenEnquiry={(prod) => {
            if (prod) handleSelectProduct(prod);
            setIsEnquiryModalOpen(true);
          }}
        />

        {/* Section 4: Security & Fire-Rated Certified European Standards */}
        <SecurityEngineering />

        {/* Section 5: Architectural In Situ Showcase & Environment Switcher */}
        <ArchitecturalShowcase
          currentEnv={environmentType}
          onChangeEnv={setEnvironmentType}
          onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        />

        {/* Section 6: Global Showrooms & Dealer Network */}
        <DealerNetwork
          onOpenConsultation={() => setIsEnquiryModalOpen(true)}
        />

        {/* Section 7: Global Footer */}
        <Footer
          onOpenCatalogue={() => handleScrollToSection('catalogue')}
          onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
          onOpenSampleKit={() => setIsSampleKitOpen(true)}
          onScrollToSection={handleScrollToSection}
        />
      </main>

      {/* ================= MODALS ================= */}
      {/* 1. Technical Dossier Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        onClose={() => setSelectedDetailProduct(null)}
        onLoadIn3D={(prod) => {
          handleSelectProductForStudio(prod);
        }}
        onOpenEnquiry={(prod) => {
          handleSelectProduct(prod);
          setIsEnquiryModalOpen(true);
        }}
      />

      {/* 2. Quotation & Specification Request Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={selectedProduct}
        finish={selectedFinish}
        handle={selectedHandle}
        dimension={selectedDimension}
        hasSmartLock={hasSmartLock}
        hasLedAccent={hasLedAccent}
      />

      {/* 3. Physical Material Sample Kit Request Modal */}
      <SampleKitModal
        isOpen={isSampleKitOpen}
        onClose={() => setIsSampleKitOpen(false)}
      />
    </div>
  );
}

export default App;
