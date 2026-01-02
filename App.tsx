import React, { useEffect, useState } from 'react';
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
import { TransitionProvider } from './context/TransitionContext';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { LogoSlider } from './components/LogoSlider';
import GreetingLoader from './components/GreetingLoader';

// ✅ Import WhatsApp widget
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <CompareProvider>
        <TransitionProvider>
          {loading && <GreetingLoader onComplete={() => setLoading(false)} />}
          
          <div className="min-h-screen bg-brand-dark text-brand-text font-sans antialiased selection:bg-brand-gold selection:text-brand-dark">
            <Header />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/programmes/:type" element={<ProgrammeArchive />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <CompareBar />
            <CompareModal />
            <Footer />

            {/* WhatsApp Widget */}
            <WhatsAppWidget
              phoneNumber="541112222222" // replace with your number in international format
              companyName="International Hotel School"
              replyTimeText="Typically replies within a day"
              message="Hello! 👋🏼 \n\nHow can we help you today?"
            />
          </div>
        </TransitionProvider>
      </CompareProvider>
    </CartProvider>
  );
}

export default App;