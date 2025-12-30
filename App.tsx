
import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { GuidanceSupport } from './components/GuidanceSupport';
import { CoreOfferings } from './components/CoreOfferings';
import { SuccessFramework } from './components/SuccessFramework';
import { GettingStarted } from './components/GettingStarted';
import { Testimonial } from './components/Testimonial';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CourseDetail } from './components/CourseDetail';
import { ProgrammeArchive } from './components/ProgrammeArchive';
import { CartProvider } from './context/CartContext';
import { CompareProvider } from './context/CompareContext';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { LogoSlider } from './components/LogoSlider';

const HomePage = () => (
  <>
    <Hero />
    <ValuePillars />
    <GuidanceSupport />
    <LogoSlider />
    <CoreOfferings />
    <SuccessFramework />
    <GettingStarted />
    <Testimonial />
    <FinalCTA />
  </>
);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <CompareProvider>
        <div className="min-h-screen bg-brand-dark text-brand-text font-sans antialiased selection:bg-brand-gold selection:text-brand-dark">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/programmes/:type" element={<ProgrammeArchive />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              {/* Catch-all route to prevent blank pages */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <CompareBar />
          <CompareModal />
          <Footer />
        </div>
      </CompareProvider>
    </CartProvider>
  );
}

export default App;
