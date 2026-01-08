import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ValuePillars } from './components/ValuePillars'
import { GuidanceSupport } from './components/GuidanceSupport'
import { CoreOfferings } from './components/CoreOfferings'
import { ProgrammeMultiGroup } from './components/ProgrammeMultiGroup'
import { SuccessFramework } from './components/SuccessFramework'
import { GettingStarted } from './components/GettingStarted'
import { Testimonial } from './components/Testimonial'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { CourseDetail } from './components/CourseDetail'
import { ProgrammeArchive } from './components/ProgrammeArchive'
import { PaymentOptions } from './components/PaymentOptions'
import { RegistrationsAccreditations } from './components/RegistrationsAccreditations'
import { CartProvider } from './context/CartContext'
import { CompareProvider } from './context/CompareContext'
import { TransitionProvider } from './context/TransitionContext'
import { LayoutProvider, useLayout } from './context/LayoutContext'
import { CompareBar } from './components/CompareBar'
import { CompareModal } from './components/CompareModal'
import { LayoutSettings } from './components/LayoutSettings'
import { LogoSlider } from './components/LogoSlider'
// import GreetingLoader from './components/GreetingLoader'

// ✅ Import react-whatsapp-widget
import { WhatsAppWidget } from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'

const HomePage = () => {
  const { programmeDisplay } = useLayout();
  return (
    <>
      <Hero />
      <ValuePillars />
      <GuidanceSupport />
      <LogoSlider />
      {programmeDisplay === 'core' ? <CoreOfferings /> : <ProgrammeMultiGroup />}
      <SuccessFramework />
      <GettingStarted />
      <Testimonial />
      <FinalCTA />
    </>
  )
}

function App() {
  const { pathname } = useLocation()
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <CartProvider>
      <CompareProvider>
        <TransitionProvider>
          <LayoutProvider>
            {/* {loading && <GreetingLoader onComplete={() => setLoading(false)} />} */}

            <div className="min-h-screen bg-brand-dark text-brand-text font-sans antialiased selection:bg-brand-gold selection:text-brand-dark">
              <Header />

              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/programmes/:type" element={<ProgrammeArchive />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/admissions/payment-options" element={<PaymentOptions />} />
                  <Route path="/admissions/registrations-and-accreditations" element={<RegistrationsAccreditations />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <LayoutSettings />
              <CompareBar />
              <CompareModal />
              <Footer />

              {/* ✅ WhatsApp Widget with default WhatsApp icon */}
              <WhatsAppWidget
                phoneNumber="541112222222"                // your WhatsApp number
                companyName="International Hotel School"  // name shown in chat bubble
                replyTimeText="Typically replies within an hour"
                message="Hello! 👋🏼\n\nHow can we help you today?"
                sendButtonText="Send"
                inputPlaceHolder="Type a message..."
                open={false}                              // closed by default
              />
            </div>
          </LayoutProvider>
        </TransitionProvider>
      </CompareProvider>
    </CartProvider>
  )
}

export default App
