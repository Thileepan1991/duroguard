import { useState, useEffect } from 'react';
import { DoorCanvas } from './components/3d/DoorCanvas';
import { Navbar } from './components/ui/Navbar';
import { ScrollExperience } from './components/ui/ScrollExperience';
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
  const [openProgress, setOpenProgress] = useState(0);
  const [explodedProgress, setExplodedProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [hasLedAccent, setHasLedAccent] = useState(true);
  const [hasSmartLock, setHasSmartLock] = useState(true);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [environmentType, setEnvironmentType] = useState<EnvironmentType>('modern-villa');

  // Modals
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<DoorProduct | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);

  // Scroll Tracking
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
      setScrollProgress(progress);

      // Automated Kinematics based on scroll position (when not manually overridden in orbit mode)
      if (!isOrbitMode) {
        // Stage 1: Door swings open as visitor scrolls down from hero
        if (progress > 0.04 && progress < 0.28) {
          const doorSwingRatio = Math.min(1, (progress - 0.04) / 0.12);
          setOpenProgress(doorSwingRatio);
          setIsDoorOpen(doorSwingRatio > 0.4);
        } else if (progress <= 0.04) {
          setOpenProgress(0);
          setIsDoorOpen(false);
        }

        // Stage 2: Exploded construction view active in Chapter 2
        if (progress >= 0.20 && progress <= 0.42) {
          const explodeRatio = Math.sin(((progress - 0.20) / 0.22) * Math.PI);
          setExplodedProgress(Math.max(0, explodeRatio));
        } else {
          setExplodedProgress(0);
        }

        // Stage 3: Lock state demonstration
        if (progress > 0.42 && progress < 0.55) {
          setIsLocked(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOrbitMode]);

  // Handlers
  const handleToggleDoorOpen = () => {
    const nextState = !isDoorOpen;
    setIsDoorOpen(nextState);
    setOpenProgress(nextState ? 1 : 0);
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
    // Find matching default finish
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

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080a] text-neutral-100 selection:bg-amber-400 selection:text-black font-sans antialiased">
      {/* ================= FIXED 3D WEBGL CANVAS BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <DoorCanvas
          finish={selectedFinish}
          handle={selectedHandle}
          scrollProgress={scrollProgress}
          openProgress={openProgress}
          explodedProgress={explodedProgress}
          isLocked={isLocked}
          hasLedAccent={hasLedAccent}
          isOrbitMode={isOrbitMode}
          environmentType={environmentType}
          doorStyle={selectedStyle}
          showHotspots={explodedProgress > 0.1 || scrollProgress < 0.5}
          onToggleOpen={handleToggleDoorOpen}
        />
      </div>

      {/* Subtle Atmospheric Vignette & Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,7,9,0.75)_80%)]" />

      {/* ================= FIXED NAVBAR ================= */}
      <Navbar
        isOrbitMode={isOrbitMode}
        onToggleOrbit={handleToggleOrbit}
        onOpenCatalogue={() => handleScrollToSection('catalogue')}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        onOpenSampleKit={() => setIsSampleKitOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* ================= SCROLL EXPERIENCE CONTENT ================= */}
      <main className="relative z-10 w-full">
        {/* Chapters 1, 2, 3: Hero, Engineering Anatomy, 3D Configurator Studio */}
        <ScrollExperience
          scrollProgress={scrollProgress}
          openProgress={openProgress}
          explodedProgress={explodedProgress}
          isDoorOpen={isDoorOpen}
          isLocked={isLocked}
          hasLedAccent={hasLedAccent}
          hasSmartLock={hasSmartLock}
          isOrbitMode={isOrbitMode}
          selectedProduct={selectedProduct}
          selectedFinish={selectedFinish}
          selectedHandle={selectedHandle}
          selectedDimension={selectedDimension}
          selectedStyle={selectedStyle}
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
          onOpenCatalogue={() => handleScrollToSection('catalogue')}
          onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
          onOpenSampleKit={() => setIsSampleKitOpen(true)}
          onScrollToSection={handleScrollToSection}
        />

        {/* Chapter 4: Full Systems Product Catalogue (4 Core Categories) */}
        <ProductCatalogue
          onSelectProductFor3D={(prod) => {
            handleSelectProduct(prod);
            handleScrollToSection('hero');
          }}
          onOpenProductDetail={(prod) => setSelectedDetailProduct(prod)}
          onOpenEnquiry={(prod) => {
            if (prod) handleSelectProduct(prod);
            setIsEnquiryModalOpen(true);
          }}
        />

        {/* Chapter 5: Security & Fire-Rated Certified Standards */}
        <SecurityEngineering />

        {/* Chapter 6: Architectural Showcase & In Situ Lighting Switcher */}
        <ArchitecturalShowcase
          currentEnv={environmentType}
          onChangeEnv={setEnvironmentType}
          onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        />

        {/* Chapter 7: Global Showrooms & Dealer Network */}
        <DealerNetwork
          onOpenConsultation={() => setIsEnquiryModalOpen(true)}
        />

        {/* Footer */}
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
          handleSelectProduct(prod);
          handleScrollToSection('hero');
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
