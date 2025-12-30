
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { ArrowRight, Search } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    preTitle: "Get started",
    title: "Study with us",
    description: "Elevate your career with our self-paced, accredited programmes. Start your journey with us today.",
    type: 'video',
    src: 'https://media.istockphoto.com/id/472897860/video/culinary-school-intructor-teaching-students-in-commercial-kitchen.mp4?s=mp4-640x640-is&k=20&c=hsucGTdCRxP4qSN4fHeX9YW7_qNeeNno0dfHRiaB5_k=',
    poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940',
    primaryBtn: { label: 'Find a Programme', icon: Search, action: 'finder' },
    secondaryBtn: { label: 'Apply Now', icon: ArrowRight, action: 'link' },
    theme: 'navy',
  },
  {
    id: 1,
    preTitle: "IHS Corporate",
    title: "Training Solutions",
    description: "Bespoke training solutions for industry partners. Upskill your workforce with world-class curriculum.",
    type: 'video',
    src: 'https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm',
    primaryBtn: { label: 'Corporate Enquiries', icon: ArrowRight, action: 'link' },
    theme: 'gold',
  },
  {
    id: 2,
    preTitle: "International Hotel School",
    title: "New Programmes",
    description: "Intake One 2026 is officially open. Brave Through. It's YOUR legacy.",
    type: 'video',
    src: 'https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm',
    primaryBtn: { label: 'View 2026 Intake', icon: ArrowRight, action: 'scroll' },
    theme: 'gold',
  }
];

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Auto-advance slider every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleManualChange = (index: number) => {
    setActiveSlide(index);
  };

  const currentSlide = SLIDES[activeSlide];

  return (
    <section className="relative min-h-[calc(100vh-40px)] flex flex-col bg-brand-primary">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-brand-primary overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Gradient overlays for text readability */}
            <div className="absolute inset-0 z-10 bg-brand-primary/30" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-transparent" />

            {slide.type === 'video' ? (
              <>
                <img
                  src={slide.poster}
                  alt="Background"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isVideoLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <img
                src={slide.src}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full pb-20 lg:pb-0 relative">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`max-w-3xl transition-all duration-700 ease-out transform ${
                  activeSlide === index
                    ? 'relative opacity-100 translate-x-0 z-10'
                    : 'absolute top-0 left-0 opacity-0 -translate-x-10 z-0 pointer-events-none'
                }`}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-brand-accent"></span>
                  <span className="text-sm font-bold tracking-widest uppercase text-brand-accent">
                    {slide.preTitle}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-[1.1] mb-8 drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl text-white/90 font-light">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    icon={<slide.primaryBtn.icon size={16} />}
                    onClick={() => {
                      document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    {slide.primaryBtn.label}
                  </Button>

                  {slide.secondaryBtn && (
                    <Button
                      variant="secondary"
                      icon={<slide.secondaryBtn.icon size={16} />}
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      {slide.secondaryBtn.label}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {/* Navigation Blocks */}
            {[0, 1, 2].map((idx) => {
              const s = SLIDES[idx];
              const isActive = activeSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleManualChange(idx)}
                  className={`px-6 py-6 lg:px-8 lg:py-8 text-left transition-all duration-300 relative group overflow-hidden ${
                    isActive ? 'bg-brand-surface' : 'bg-white hover:bg-brand-surface'
                  }`}
                >
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
                  {isActive && (
                    <div className="absolute top-0 left-0 h-1 bg-brand-accent animate-progress-load z-10"></div>
                  )}

                  <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 transition-colors ${
                    isActive ? 'text-brand-highlight' : 'text-text-secondary/70 group-hover:text-brand-highlight'
                  }`}>
                    {s.preTitle}
                  </span>

                  <h3 className="text-lg font-serif font-semibold transition-colors text-brand-primary">
                    {s.title}
                  </h3>
                </button>
              );
            })}

            {/* Apply Now Block */}
            <div className="relative bg-brand-accent px-6 py-6 lg:px-8 lg:py-8 cursor-pointer hover:bg-opacity-90 transition-colors group flex items-center justify-between z-10">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-brand-primary/70 uppercase tracking-widest block mb-2 group-hover:translate-x-1 transition-transform">
                  Interested?
                </span>
                <h3 className="text-xl font-serif font-semibold text-brand-primary transition-colors">
                  Apply Now
                </h3>
              </div>
              <div className="relative z-10 text-brand-primary group-hover:scale-110 transition-transform">
                <ArrowRight size={28} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
