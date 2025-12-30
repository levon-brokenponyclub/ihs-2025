import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { METRICS } from '../constants';
import { Award, ArrowRight, Search, ArrowDownCircle, Check, Play } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    preTitle: "Get started",
    title: "Study with us",
    description: "Elevate your career with our self-paced, accredited programmes. Start your journey with us today.",
    type: 'video',
    src: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
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
    type: 'image',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    primaryBtn: { label: 'Corporate Enquiries', icon: ArrowRight, action: 'link' },
    theme: 'gold',
  },
  {
    id: 2,
    preTitle: "International Hotel School",
    title: "New Programmes",
    description: "Intake One 2026 is officially open. Brave Through. It’s YOUR legacy.",
    type: 'image',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop',
    primaryBtn: { label: 'View 2026 Intake', icon: ArrowRight, action: 'scroll' },
    theme: 'gold', 
  }
];

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile to disable video autoplay
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleManualChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <>
      <section className="relative h-[calc(100vh-40px)] min-h-[600px] flex flex-col bg-brand-primary">
        
        {/* Background Layer (Absolute) - No Zoom/Pan, Opacity Crossfade Only */}
        <div className="absolute inset-0 z-0 bg-brand-primary overflow-hidden">
          {SLIDES.map((slide, index) => {
            const isActive = activeSlide === index;
            // Should render video only if active or preloading, but keeping DOM simple here.
            // On mobile, force image.
            const showVideo = slide.type === 'video' && !isMobile;
            const imgSrc = slide.type === 'video' ? slide.poster : slide.src;

            return (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1200 ease-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                {/* Overlay: Multiply blend mode, no animation */}
                <div className="absolute inset-0 z-20 bg-brand-primary/70 mix-blend-multiply" />
                
                {/* Subtle gradient for text readability */}
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-brand-primary/60 via-transparent to-transparent" />

                {showVideo ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover" // Removed scale-105
                    >
                      <source src={slide.src} type="video/mp4" />
                    </video>
                ) : (
                    <img 
                      src={imgSrc} 
                      alt={slide.title} 
                      className="absolute inset-0 w-full h-full object-cover" // Removed animate-pan-slow
                    />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Content Layer */}
        <div className="relative z-20 flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
             {/* Slide Content Container */}
             <div className="w-full pb-20 lg:pb-0 relative">
               {SLIDES.map((slide, index) => {
                 const isActive = activeSlide === index;
                 return (
                   <div 
                     key={slide.id}
                     // Desktop: Fade + Micro vertical slide (translate-y-2 -> 0)
                     // Mobile: Fade only (via media queries/conditional logic or just keep slight slide which is acceptable if subtle)
                     // Using translate-y-2 (0.5rem) is subtle enough for restrained motion.
                     className={`max-w-3xl transition-all duration-500 ease-out transform ${
                       isActive 
                         ? 'relative opacity-100 translate-y-0 z-10' 
                         : 'absolute top-0 left-0 opacity-0 translate-y-2 z-0 pointer-events-none'
                     }`}
                   >
                      {/* Eyebrow */}
                      <div className="flex items-center gap-3 mb-6">
                        {/* Divider Line: Horizontal reveal */}
                        <span className={`w-12 h-[2px] bg-brand-accent origin-left transition-transform duration-400 ease-out delay-100 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></span>
                        <span className="text-sm font-bold tracking-widest uppercase text-brand-goldMuted">
                          {slide.preTitle}
                        </span>
                      </div>
                      
                      {/* Headline */}
                      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-text-inverse font-semibold leading-[1.1] mb-8 drop-shadow-sm">
                        {slide.title}
                      </h1>
                      
                      {/* Copy */}
                      <p className="text-lg leading-relaxed mb-10 max-w-xl text-text-inverse/90 font-light">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        {/* Primary CTA */}
                        <Button 
                            variant="primary"
                            icon={<slide.primaryBtn.icon size={16} />}
                            onClick={() => {
                               document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                          {slide.primaryBtn.label}
                        </Button>
                        
                        {/* Secondary CTA */}
                        {slide.secondaryBtn && (
                          <Button variant="secondary" icon={<slide.secondaryBtn.icon size={16} />}>
                            {slide.secondaryBtn.label}
                          </Button>
                        )}
                      </div>

                      {/* Trust Badges - Static fade in */}
                      {index === 2 && (
                         <div className="mt-12 flex items-center gap-8 border-t border-border-subtle/20 pt-8 animate-in fade-in duration-700 delay-300">
                            <div className="flex flex-col">
                                <span className="text-3xl font-serif text-text-inverse font-semibold">30+</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-accent">Years Excellence</span>
                            </div>
                            <div className="w-px h-8 bg-border-subtle/20"></div>
                             <div className="flex flex-col">
                                <span className="text-3xl font-serif text-text-inverse font-semibold">Top 50</span>
                                <span className="text-[10px] uppercase tracking-widest text-brand-accent">Global Ranking</span>
                            </div>
                         </div>
                      )}
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Bottom Navigation Blocks */}
        <div className="relative z-30 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 shadow-xl">
                    
                    {/* Blocks */}
                    {[0, 1, 2].map((idx) => {
                        const s = SLIDES[idx];
                        const isActive = activeSlide === idx;
                        return (
                            <button 
                                key={idx}
                                onClick={() => handleManualChange(idx)}
                                className={`px-6 py-6 lg:px-8 lg:py-8 text-left transition-colors duration-300 relative group overflow-hidden ${
                                    isActive ? 'bg-white' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                {/* Active Indicator: Simple top border or distinct background. Chelsea uses solid active states. */}
                                {/* Using brand-surface for active background difference + top border color */}
                                <div className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-300 ${isActive ? 'bg-brand-accent' : 'bg-gray-200'}`}></div>
                                
                                <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 transition-colors ${
                                    isActive ? 'text-brand-highlight' : 'text-text-secondary/70'
                                }`}>
                                    {s.preTitle}
                                </span>
                                
                                <h3 className={`text-lg font-serif font-semibold transition-colors ${isActive ? 'text-brand-primary' : 'text-brand-primary/80'}`}>
                                    {s.title}
                                </h3>
                            </button>
                        )
                    })}

                    {/* Apply Now Block - Static scale, arrow slide on hover */}
                    <div className="relative bg-brand-accent px-6 py-6 lg:px-8 lg:py-8 cursor-pointer hover:bg-brand-goldHover transition-colors duration-200 group flex items-center justify-between z-10">
                       <div className="relative z-10">
                            <span className="text-[10px] font-bold text-brand-primary/70 uppercase tracking-widest block mb-2">Interested?</span>
                            <h3 className="text-xl font-serif font-semibold text-brand-primary">Apply Now</h3>
                       </div>
                       <div className="relative z-10 text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
                           <ArrowDownCircle size={28} strokeWidth={1.5} className="-rotate-90" /> {/* Rotating arrow to point right as per 'arrow slide' description usually implies directional movement */}
                       </div>
                    </div>

                </div>
            </div>
        </div>
      </section>
    </>
  );
};