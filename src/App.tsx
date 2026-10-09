import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Navigation & Global Components
import { GlobalHeader } from './components/navigation/GlobalHeader';
import { MegaMenu } from './components/navigation/MegaMenu';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { Preloader } from './components/common/Preloader';
import { CommandPalette } from './components/common/CommandPalette';
import { ExportModal } from './components/editor/ExportModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './pages/home/HomePage';
import { StudioPage } from './pages/studio/StudioPage';
import { TemplatesPage } from './pages/templates/TemplatesPage';
import { MaterialsPage } from './pages/materials/MaterialsPage';
import { MotionPage } from './pages/motion/MotionPage';
import { ShowcasePage } from './pages/showcase/ShowcasePage';
import { ShowcaseDetailPage } from './pages/showcase/ShowcaseDetailPage';
import { LearnPage } from './pages/learn/LearnPage';
import { LearnDetailPage } from './pages/learn/LearnDetailPage';
import { PricingPage } from './pages/pricing/PricingPage';
import { AboutPage } from './pages/about/AboutPage';
import { ContactPage } from './pages/contact/ContactPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { AccountPage } from './pages/account/AccountPage';
import { NotFoundPage } from './pages/notfound/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Main App Shell with Page Transitions
function AppShell() {
  const location = useLocation();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transitioningModule, setTransitioningModule] = useState<string | null>(null);

  const isStudio = location.pathname.startsWith('/studio');

  // Initialize Lenis Smooth Scroll on non-studio routes
  useEffect(() => {
    if (isStudio) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isStudio]);

  // Page Transition Module Animation on route changes
  useEffect(() => {
    if (!isLoaded) return;
    const pathSegment = location.pathname.replace('/', '').toUpperCase() || 'HOME';
    setTransitioningModule(`MODULE: ${pathSegment}_01`);

    const t = setTimeout(() => {
      setTransitioningModule(null);
    }, 450);

    return () => clearTimeout(t);
  }, [location.pathname, isLoaded]);

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* 2. Custom Cursor */}
      <CustomCursor />

      {/* 3. Global Header (Hidden on Studio for pure software immersion) */}
      {!isStudio && (
        <GlobalHeader
          onOpenMegaMenu={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          isMegaMenuOpen={isMegaMenuOpen}
        />
      )}

      {/* 4. Mega Menu Modal */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* 5. Software Module Transition Shutter */}
      {transitioningModule && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: 'var(--acid)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px var(--acid)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '24px',
              backgroundColor: '#111111',
              color: 'var(--acid)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '2px 8px',
              border: '1px solid var(--acid)'
            }}
          >
            {transitioningModule}
          </div>
        </div>
      )}

      {/* 6. Main Route View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/motion" element={<MotionPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
            <Route path="/showcase/:slug" element={<ShowcaseDetailPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:slug" element={<LearnDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </div>

      {/* 7. Footer (On non-Studio routes) */}
      {!isStudio && <Footer />}

      {/* 8. Global Modals (Command Palette & Export) */}
      <CommandPalette />
      <ExportModal />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
