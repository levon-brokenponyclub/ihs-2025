
import React, { useRef, useEffect } from 'react';
import { Globe, Award, TrendingUp, Users, Star, ArrowRight, AlertTriangle, TrendingDown } from 'lucide-react';

const PILLARS = [
    {
        id: 1,
        title: "Global Recognition",
        description: "The only Hospitality & Culinary school in Africa ranked in the top 50 Hospitality Universities in the world. Your qualification travels with you.",
        icon: Globe
    },
    {
        id: 2,
        title: "93% Employability",
        description: "Our graduates are highly sought after. We provide dedicated career support, CV workshops, and placement assistance to ensure you start strong.",
        icon: TrendingUp
    },
    {
        id: 3,
        title: "International Accreditation",
        description: "Proudly part of Sommet Education, the world leader in hospitality management education. Dual accreditation opportunities available.",
        icon: Award
    },
    {
        id: 4,
        title: "Practical Excellence",
        description: "Hands-on training in real-world environments. We believe in learning by doing, with 50% of coursework focused on practical experience.",
        icon: Star
    },
    {
        id: 5,
        title: "Alumni Network",
        description: "Join 35,000+ successful graduates working in 5-star establishments, cruise liners, and luxury resorts across the globe.",
        icon: Users
    }
];

const PROBLEMS = [
    {
        id: 'p1',
        title: "An Unrecognised Qualification",
        description: "Receive poor quality education which cannot be used locally or internationally.",
        icon: AlertTriangle
    },
    {
        id: 'p2',
        title: "No Career Prospects",
        description: "No post-graduation employment support or industry recognition.",
        icon: TrendingDown
    }
];

export const ValuePillars: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const problemStartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !stickyRef.current || !trackRef.current) return;

            const container = containerRef.current;
            const track = trackRef.current;
            const sticky = stickyRef.current;
            
            // Dimensions
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Calculate progress
            const start = containerTop;
            const end = containerTop + containerHeight - windowHeight;
            
            if (end <= start) return;

            let progress = (scrollY - start) / (end - start);
            progress = Math.max(0, Math.min(progress, 1)); // Clamp 0-1

            // Calculate translation
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            
            if (trackWidth <= viewportWidth) {
                track.style.transform = `translateX(0px)`;
                return;
            }
            
            const maxTranslate = trackWidth - viewportWidth;
            const translateX = maxTranslate * progress;

            track.style.transform = `translateX(-${translateX}px)`;

            // Background Color Transition Logic
            // We want to fade when the Problem section enters the viewport.
            // Let's find the X position of the problem section relative to the track start
            // and compare with translateX.
            
            // Approximate threshold: when we are about 60% through the scroll (tuned for 500vh)
            // Or calculate dynamically if possible, but simple progress mapping is smoother.
            
            const colorThreshold = 0.65; 
            const fadeRange = 0.15; // Duration of fade

            if (progress < colorThreshold) {
                sticky.style.backgroundColor = '#f8fafc'; // Light
            } else if (progress > (colorThreshold + fadeRange)) {
                sticky.style.backgroundColor = '#002a4e'; // Dark Navy
            } else {
                // Interpolate
                const fadeProgress = (progress - colorThreshold) / fadeRange;
                // Simple interpolation from white-ish to navy
                // #f8fafc = 248, 250, 252
                // #002a4e = 0, 42, 78
                
                const r = 248 - (248 * fadeProgress);
                const g = 250 - ((250 - 42) * fadeProgress);
                const b = 252 - ((252 - 78) * fadeProgress);
                
                sticky.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-[550vh]">
            <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#f8fafc] transition-colors duration-100 will-change-[background-color]">
                
                {/* Horizontal Track */}
                <div ref={trackRef} className="flex items-center pl-6 md:pl-20 pr-20 gap-8 md:gap-16 will-change-transform h-full">
                    
                    {/* --- VALUE SECTION --- */}
                    
                    {/* Intro Block (Value) */}
                    <div className="w-[300px] md:w-[450px] shrink-0">
                        <h2 className="font-serif text-4xl md:text-6xl text-[#0f0f0f] leading-[1.1] mb-8 font-light">
                            Why Choose <br/>
                            <span className="font-semibold">International Hotel School?</span>
                        </h2>
                        <p className="text-[#666666] text-lg md:text-xl leading-relaxed max-w-sm">
                            We design educational experiences that make a difference. Discover what sets us apart in the global industry.
                        </p>
                        <div className="mt-12 flex items-center gap-4 text-brand-primary font-bold uppercase tracking-widest text-xs">
                            <div className="w-12 h-[1px] bg-brand-primary"></div>
                            <span>Scroll to explore</span>
                        </div>
                    </div>

                    {/* Value Cards */}
                    {PILLARS.map((pillar, index) => (
                        <div 
                            key={pillar.id}
                            className="w-[320px] md:w-[420px] shrink-0 bg-white p-8 md:p-12 border border-[#E5E5E5] hover:border-brand-gold/50 hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between h-[420px] md:h-[500px]"
                        >
                            <div>
                                <div className="w-14 h-14 bg-[#F5F5F5] rounded-full flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors duration-500">
                                    <pillar.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif text-[#0f0f0f] mb-4 md:mb-6 leading-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-[#666666] text-sm md:text-base leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-6 mt-6">
                                <span className="text-brand-gold font-serif font-bold text-xl">0{index + 1}</span>
                                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* --- SPACER FOR TRANSITION --- */}
                    <div className="w-[30vw] shrink-0"></div>

                    {/* --- PROBLEM AWARENESS SECTION --- */}
                    
                    {/* Intro Block (Problem) */}
                    <div ref={problemStartRef} className="w-[300px] md:w-[500px] shrink-0">
                        <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 font-semibold leading-tight">
                            Avoid the Stress of Making the <span className="text-brand-gold italic">Incorrect Choice</span>
                        </h2>
                        <p className="text-white/80 text-lg font-light leading-relaxed max-w-sm">
                            Incorrect choices leave you with qualifications that limit your potential rather than expanding it.
                        </p>
                    </div>

                    {/* Problem Cards */}
                    {PROBLEMS.map((problem, index) => (
                        <div 
                            key={problem.id}
                            className="w-[320px] md:w-[400px] shrink-0 bg-[#041424] border border-brand-goldMuted/20 p-10 rounded-sm hover:border-brand-gold transition-colors duration-300 h-[350px] md:h-[400px] flex flex-col justify-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                                <problem.icon size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {problem.description}
                            </p>
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[10vw] shrink-0"></div>
                </div>
            </div>
        </section>
    );
};
