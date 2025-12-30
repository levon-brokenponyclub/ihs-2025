
import React from 'react';

const PARTNERS = [
    "Les Roches",
    "École Ducasse",
    "AHLEI",
    "CTH",
    "Hilton Hotels",
    "One&Only",
    "Fairmont Hotels",
    "Tsogo Sun",
    "Marriott International",
    "Radisson"
];

export const LogoSlider: React.FC = () => {
    // Duplicate for infinite scroll
    const displayPartners = [...PARTNERS, ...PARTNERS];

    return (
        <div className="bg-[#050911] border-b border-white/5 py-12 overflow-hidden relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Trusted by World-Leading Hospitality Brands & Institutions
                </p>
             </div>

             <div className="relative flex overflow-hidden group">
                 <div className="flex animate-scroll whitespace-nowrap gap-8 md:gap-16 hover:pause">
                     {displayPartners.map((partner, index) => (
                         <div 
                            key={index} 
                            className="flex items-center justify-center min-w-[150px] md:min-w-[200px] opacity-40 hover:opacity-100 transition-opacity duration-300"
                        >
                            {/* In a real app, use <img> tags here. Using styled text for demo purposes to match requested visual style without external assets */}
                             <span className="text-xl md:text-2xl font-serif text-white whitespace-nowrap border border-white/10 px-6 py-3 rounded-sm">
                                {partner}
                             </span>
                         </div>
                     ))}
                 </div>
                 
                 {/* Fade Edges */}
                 <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#050911] to-transparent pointer-events-none"></div>
                 <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#050911] to-transparent pointer-events-none"></div>
             </div>
             
             <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
             `}</style>
        </div>
    );
};
