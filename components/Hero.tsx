
import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { METRICS } from '../constants';
import { Award, ArrowRight, Search, ArrowDownCircle, Check, Play } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    preTitle: "Get started",
    title: "Study with us",
    description: "Elevate your career with our self-paced, accredited programmes. Start your journey with us today and become part of a global community of forward-thinkers.",
    type: 'video',
    src: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940',
    primaryBtn: { label: 'Find a Programme', icon: Search, action: 'finder' },
    secondaryBtn: { label: 'Apply Now', icon: ArrowRight, action: 'link' },
    theme: 'navy',
    accent: 'text-brand-gold',
    barColor: 'bg-brand-gold'
  },
  {
    id: 1,
    preTitle: "IHS Corporate",
    title: "Training Solutions",
    description: "Bespoke training solutions for industry partners. Upskill your workforce with our world-class hospitality curriculum and leadership development.",
    type: 'image',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    primaryBtn: { label: 'Corporate Enquiries', icon: ArrowRight, action: 'link' },
    theme: 'gold',
    accent: 'text-brand-gold',
    barColor: 'bg-brand-gold'
  },
  {
    id: 2,
    preTitle: "International Hotel School",
    title: "New Programmes",
    description: "Intake One 2026 is officially open. Brave Through. It’s YOUR legacy. Discover our newly accredited degrees and diplomas.",
    type: 'image',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop',
    primaryBtn: { label: 'View 2026 Intake', icon: ArrowRight, action: 'scroll' },
    theme: 'gold', // Changed from green
    accent: 'text-white',
    barColor: 'bg-brand-gold' // Changed from green
  }
];

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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

  const currentSlide = SLIDES[activeSlide];

  return (
    <>
      <section className="relative h-[calc(100vh-40px)] min-h-[600px] flex flex-col">
        
        {/* Background Layer (Absolute) */}
        <div className="absolute inset-0 z-0 bg-brand-dark overflow-hidden">
          {SLIDES.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Overlay for contrast */}
              <div className={`absolute inset-0 z-10 ${
                slide.theme === 'green' // Keep logic for green if reused, but config is updated to gold
                  ? 'bg-[#0d643f]/90 mix-blend-multiply' 
                  : 'bg-brand-dark/60'
              }`} />
              
              <div className={`absolute inset-0 z-10 ${
                 slide.theme === 'green'
                 ? 'bg-gradient-to-r from-[#0d643f] to-transparent'
                 : 'bg-gradient-to-r from-black/80 via-black/40 to-transparent'
              }`} />

              {slide.type === 'video' ? (
                <>
                  <img 
                    src={slide.poster} 
                    alt="Poster" 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} 
                  />
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                </>
              ) : (
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  className="absolute inset-0 w-full h-full object-cover animate-pan-slow"
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Content Layer */}
        <div className="relative z-20 flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
             {/* Slide Content Container */}
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
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`w-10 h-1 rounded-full ${slide.theme === 'green' ? 'bg-white' : 'bg-brand-gold'}`}></span>
                      <span className={`text-sm font-bold tracking-widest uppercase ${slide.theme === 'green' ? 'text-white' : 'text-brand-gold'}`}>
                        {slide.preTitle}
                      </span>
                    </div>
                    
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-medium leading-[1.1] mb-8">
                      {slide.title}
                    </h1>
                    
                    <p className="text-lg leading-relaxed mb-10 max-w-xl text-gray-200">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                          variant={slide.theme === 'green' ? 'secondary' : 'primary'}
                          className={slide.theme === 'green' ? 'bg-white text-[#0d643f] hover:bg-gray-100' : ''}
                          icon={<slide.primaryBtn.icon size={16} />}
                          onClick={() => {
                             // Default scroll behavior as finder is in header now
                             document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                      >
                        {slide.primaryBtn.label}
                      </Button>
                      {slide.secondaryBtn && (
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark" icon={<slide.secondaryBtn.icon size={16} />}>
                          {slide.secondaryBtn.label}
                        </Button>
                      )}
                    </div>

                    {/* Trust Badges - Only on Slide 3 (Index 2) */}
                    {index === 2 && (
                       <div className="mt-12 flex items-center gap-8 border-t border-white/20 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                          <div className="flex flex-col">
                              <span className="text-3xl font-serif text-white">30+</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-400">Years Excellence</span>
                          </div>
                          <div className="w-px h-8 bg-white/20"></div>
                           <div className="flex flex-col">
                              <span className="text-3xl font-serif text-white">Top 50</span>
                              <span className="text-[10px] uppercase tracking-widest text-gray-400">Global Ranking</span>
                          </div>
                       </div>
                    )}
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Bottom Navigation Blocks */}
        <div className="relative z-30 bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    
                    {/* Block 1 - Study with us */}
                    <button 
                      onClick={() => handleManualChange(0)}
                      className={`bg-white px-6 py-6 lg:px-8 lg:py-8 border-r border-gray-100 text-left transition-all duration-300 relative group overflow-hidden`}
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${activeSlide === 0 ? 'bg-brand-gold' : 'bg-transparent'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-2 transition-colors ${activeSlide === 0 ? 'text-brand-gold' : 'text-gray-400'}`}>
                          Get Started
                        </span>
                        <h3 className={`text-xl font-serif transition-colors ${activeSlide === 0 ? 'text-brand-dark' : 'text-gray-600'}`}>Study with us</h3>
                        {activeSlide === 0 && <div className="absolute bottom-0 left-0 h-0.5 bg-brand-gold animate-progress-load w-full opacity-30"></div>}
                    </button>

                    {/* Block 2 - Training Solutions */}
                    <button 
                      onClick={() => handleManualChange(1)}
                      className={`bg-white px-6 py-6 lg:px-8 lg:py-8 border-r border-gray-100 text-left transition-all duration-300 relative group`}
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${activeSlide === 1 ? 'bg-brand-gold' : 'bg-transparent'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-2 transition-colors ${activeSlide === 1 ? 'text-brand-gold' : 'text-gray-400'}`}>
                          IHS Corporate
                        </span>
                        <h3 className={`text-xl font-serif transition-colors ${activeSlide === 1 ? 'text-brand-dark' : 'text-gray-600'}`}>Training Solutions</h3>
                        {activeSlide === 1 && <div className="absolute bottom-0 left-0 h-0.5 bg-brand-gold animate-progress-load w-full opacity-30"></div>}
                    </button>

                    {/* Block 3 - New Programmes */}
                    <button 
                      onClick={() => handleManualChange(2)}
                      className={`bg-white px-6 py-6 lg:px-8 lg:py-8 border-r border-gray-100 text-left transition-all duration-300 relative group`}
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${activeSlide === 2 ? 'bg-brand-gold' : 'bg-transparent'}`}></div>
                        <span className={`text-xs font-bold uppercase tracking-widest block mb-2 transition-colors ${activeSlide === 2 ? 'text-brand-gold' : 'text-gray-400'}`}>
                          International Hotel School
                        </span>
                        <h3 className={`text-xl font-serif transition-colors ${activeSlide === 2 ? 'text-brand-dark' : 'text-gray-600'}`}>New Programmes</h3>
                        {activeSlide === 2 && <div className="absolute bottom-0 left-0 h-0.5 bg-brand-gold animate-progress-load w-full opacity-30"></div>}
                    </button>

                    {/* Block 4 - Apply Now (Gold Background) */}
                    <div className="relative bg-brand-gold px-6 py-6 lg:px-8 lg:py-8 cursor-pointer hover:bg-brand-goldHover transition-colors group flex items-center justify-between z-10">
                       {/* This pseudo-element creates the infinite gold background to the right */}
                       <div className="absolute inset-y-0 left-0 w-[100vw] bg-brand-gold -z-10 group-hover:bg-brand-goldHover transition-colors"></div>
                       
                       <div className="relative z-10">
                            <span className="text-xs font-bold text-brand-dark/70 uppercase tracking-widest block mb-2 group-hover:translate-x-1 transition-transform">Interested?</span>
                            <h3 className="text-xl font-serif text-brand-dark transition-colors">Apply Now</h3>
                       </div>
                       <div className="relative z-10 text-brand-dark text-3xl font-thin group-hover:scale-110 transition-transform">
                           <ArrowDownCircle size={32} strokeWidth={1} />
                       </div>
                    </div>

                </div>
            </div>
        </div>
      </section>
    </>
  );
};
