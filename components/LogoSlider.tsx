
import React from 'react';

const PARTNERS = [
    { name: "AHLEI", logo: "components/assets/logos/american-hotel-lodging-educational-institute-r6djf1a4jfs1u9sokoij74ckub80bbe63d3o4wvozc.png" },
    { name: "École Ducasse", logo: "components/assets/logos/ecole-ducasse-logo-r6djihctlkhwessgg65ac91f968gjd2qkf7rhfrq60.jpg" },
    { name: "Fairmont Hotels", logo: "components/assets/logos/fairmont-hotels-and-resorts-logo-r6djjh2ot9usnzcknll3z00xttcenv0jdc07pyarlk.png" },
    { name: "Gordon Ramsay", logo: "components/assets/logos/gordon-ramsay-logo-r6djhkggyd8v4g48s9xcezcagoqm1yg4rwdror4i7s.png" },
    { name: "Hilton Hotels", logo: "components/assets/logos/hilton-hotels-and-resorts-logo-r6djkc3d2t19b43imgzsra75fj3ipvfohlj8k30rw8.png" },
    { name: "One&Only", logo: "components/assets/logos/one-and-only-logo-png-r6djkd179n2jmq25gzefbrym0wyvxkjetq6q1czdq0.png" },
    { name: "Protea Hotels", logo: "components/assets/logos/protea-hotels-logo-r6djhikskp6ah86z39439ztd9wzvmk8o3n2sq77ak8.png" },
    { name: "RHG", logo: "components/assets/logos/rhg-logo-r6djk2oz6goe30h65cxj2ckjhodukwed4b0drbepmg.png" },
    { name: "Sommet Education", logo: "components/assets/logos/sommet-education-logo-r6djlemqv0i0j4jjdfni3ih1sbtkhgooawa58ffmt4.png" },
    { name: "Sun International", logo: "components/assets/logos/sun-international-logo-r6djkr4s45lugvho6nhtv6eixp1e513dvnz08ieh4o.png" },
    { name: "IHS", logo: "components/assets/logos/ihs-logo-dark.png" }
];

export const LogoSlider: React.FC = () => {
    // Duplicate for infinite scroll
    const displayPartners = [...PARTNERS, ...PARTNERS];

    return (
        <div className="bg-[#062135] border-b border-white/5 py-12 overflow-hidden relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Trusted by World-Leading Hospitality Brands & Institutions
                </p>
             </div>

             <div className="relative flex overflow-hidden group logo-carousel-wrapper">
                 {/* Fade edges */}
                 <div className="logo-carousel-fade-edge left"></div>
                 <div className="logo-carousel-fade-edge right"></div>

                 <div className="flex animate-scroll whitespace-nowrap gap-24 hover:pause logo-carousel-track">
                     {displayPartners.map((partner, index) => (
                         <div
                            key={index}
                            className="logo-carousel-item"
                            style={{
                              transform: `rotateY(${(index % 11 - 5) * 8}deg) scale(${0.7 + Math.cos((index % 11 - 5) * 0.3) * 0.3})`,
                              opacity: 0.5 + Math.cos((index % 11 - 5) * 0.3) * 0.5
                            }}
                        >
                           <img
                               src={partner.logo}
                               alt={partner.name}
                               className="w-full h-auto max-w-[155px] max-h-[80px] object-contain filter brightness-0 invert transition-all duration-300"
                           />
                       </div>
                     ))}
                 </div>
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

                /* 3D Logo Carousel Styles */
                .logo-carousel-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    overflow: hidden;
                    padding: 40px 0 0;
                    perspective: 1200px;
                }

                .logo-carousel-track {
                    display: flex;
                    align-items: center;
                    gap: 100px;
                    width: max-content;
                }

                .logo-carousel-item {
                    flex-shrink: 0;
                    width: 155px;
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease, filter 0.3s ease, z-index 0s;
                    position: relative;
                    z-index: 5;
                }

                .logo-carousel-item img {
                    height: auto;
                    width: 100%;
                    max-height: 100%;
                    max-width: 155px;
                    object-fit: contain;
                    object-position: center center;
                    filter: grayscale(100%) brightness(0) invert(1);
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                /* Fade edges */
                .logo-carousel-fade-edge {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 30%;
                    z-index: 2;
                    pointer-events: none;
                }

                .logo-carousel-fade-edge.left {
                    left: 0;
                    background: linear-gradient(to right, #062135, transparent);
                }

                .logo-carousel-fade-edge.right {
                    right: 0;
                    background: linear-gradient(to left, #062135, transparent);
                }
             `}</style>
        </div>
    );
};
