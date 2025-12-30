
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const BENEFITS = [
    {
        title: "Graduate Job Ready",
        description: "All our programmes contain unrivalled practical work experience, ensuring you step into the industry with confidence and competence.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000"
    },
    {
        title: "30 Years of Excellence",
        description: "Established for over 3 decades, providing you with the best reputational head start in the competitive hospitality market.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000"
    },
    {
        title: "Global Recognition",
        description: "The only Hospitality & Culinary school in Africa ranked in the top 50 Hospitality Universities in the world.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000"
    },
    {
        title: "International Accreditation",
        description: "Proudly part of Sommet Education, the World's Leader in Hospitality Management Education, offering globally recognized qualifications.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000"
    }
];

const DURATION = 5000; // ms per slide

export const GuidanceSupport: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Animation Loop for Progress Bar
  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    
    const newProgress = Math.min((elapsed / DURATION) * 100, 100);
    setProgress(newProgress);

    if (elapsed < DURATION) {
        requestRef.current = requestAnimationFrame(animate);
    } else {
        // Next slide
        startTimeRef.current = 0;
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % BENEFITS.length);
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [activeIndex]);

  // Handle manual click
  const handleItemClick = (index: number) => {
      cancelAnimationFrame(requestRef.current);
      setActiveIndex(index);
      setProgress(0);
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-12">
                <h2 className="font-serif text-3xl md:text-5xl text-brand-text mb-4 leading-tight font-semibold">
                    We're Here To Help You <br/>
                    <span className="text-brand-gold italic">Make The Best Choice</span>
                </h2>
                <p className="text-brand-textSecondary max-w-2xl">
                    Discover why thousands of students choose International Hotel School as their launchpad to a global career.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                
                {/* Left: Cards List with Progress */}
                <div className="flex flex-col gap-4">
                    {BENEFITS.map((benefit, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div 
                                key={index}
                                onClick={() => handleItemClick(index)}
                                className={`relative p-6 rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden ${
                                    isActive 
                                    ? 'bg-brand-surface border-brand-gold/50 shadow-md' 
                                    : 'bg-white border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <div className="relative z-10 flex flex-col gap-2">
                                    <h3 className={`font-serif text-xl font-bold transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-500'}`}>
                                        {benefit.title}
                                    </h3>
                                    
                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-brand-textSecondary text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>
                                        <div className="mt-4">
                                            <Button variant="ghost" className="!p-0 !text-xs !font-bold flex items-center gap-1">
                                                Learn More <ArrowRight size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar Background (Only if active) */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
                                        <div 
                                            className="h-full bg-brand-gold transition-all duration-100 ease-linear"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right: Image Display */}
                <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-2xl">
                    {BENEFITS.map((benefit, index) => (
                         <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                         >
                            <img 
                                src={benefit.image} 
                                alt={benefit.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent"></div>
                            
                            {/* Overlay Text (Optional) */}
                            <div className="absolute bottom-8 left-8 right-8 z-20">
                                <span className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-3 inline-block">
                                    Why Choose Us
                                </span>
                                <h3 className="text-white font-serif text-2xl font-bold">
                                    {benefit.title}
                                </h3>
                            </div>
                         </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};
