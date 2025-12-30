
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OFFERINGS } from '../constants';
import { ArrowRight } from 'lucide-react';

const PROGRAMME_TYPES = [
    { label: 'Full Time Learning', value: 'Full Time Learning' },
    { label: 'Blended Learning', value: 'Blended Learning' },
    { label: 'In-Service Traineeship', value: 'In-Service Traineeship' },
    { label: 'Part Time Learning', value: 'Part Time Learning' },
    { label: 'Online Learning', value: 'Online Learning' },
];

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

// ------------------------------------------
// Sub-Component: Vertical Marquee Link
// ------------------------------------------
const MenuLink = ({ 
    text, 
    isActive = false, 
    onClick, 
    to,
    delayIndex = 0,
    isOpen 
}: { 
    text: string; 
    isActive?: boolean; 
    onClick?: () => void;
    to?: string;
    delayIndex: number;
    isOpen: boolean;
}) => {
    // Base Classes
    const containerClasses = `relative block overflow-hidden group cursor-pointer py-1`;
    
    // Animation State Classes for Entrance
    const entranceClasses = `transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform`;
    const entranceState = isOpen 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0';

    const innerContent = (
        <div className="relative">
            {/* Primary Text (Slides up on hover) */}
            <div className={`transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${isActive ? 'text-[#C2B067]' : 'text-white'}`}>
                {text}
            </div>
            
            {/* Duplicate Text (Slides up from bottom on hover) */}
            <div className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 ${isActive ? 'text-[#C2B067]' : 'text-white'}`}>
                {text}
            </div>
        </div>
    );

    if (to) {
        return (
            <Link 
                to={to} 
                className={`${containerClasses} ${entranceClasses} ${entranceState}`}
                style={{ transitionDelay: `${isOpen ? 100 + (delayIndex * 30) : 0}ms` }}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <div 
            onClick={onClick}
            className={`${containerClasses} ${entranceClasses} ${entranceState}`}
            style={{ transitionDelay: `${isOpen ? 100 + (delayIndex * 30) : 0}ms` }}
        >
            {innerContent}
        </div>
    );
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    const [activeType, setActiveType] = useState(PROGRAMME_TYPES[0].value);
    
    // Reset active type when closed to ensure animation consistency on reopen
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setActiveType(PROGRAMME_TYPES[0].value), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const displayedOfferings = OFFERINGS.filter(o => 
        o.programmeTypes.includes(activeType)
    );

    return (
        <div 
            className="fixed top-[80px] left-0 right-0 z-50 overflow-hidden pointer-events-none"
            style={{ height: 'calc(100vh - 80px)', maxHeight: '600px' }}
        >
            {/* Curtain Container */}
            <div 
                className={`w-full h-full bg-[#002B4E] shadow-2xl flex transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-auto`}
                style={{ 
                    clipPath: isOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                    opacity: isOpen ? 1 : 0 
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full h-full flex flex-col lg:flex-row">
                    
                    {/* Left Column: Categories */}
                    <div className="w-full lg:w-1/3 border-r border-white/10 h-full bg-[#002B4E] relative z-10">
                        <div className="py-12 pr-12 flex flex-col h-full justify-between">
                            
                            <div className="space-y-1">
                                <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 transition-opacity duration-700 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                    Programme Categories
                                </p>
                                {PROGRAMME_TYPES.map((type, index) => (
                                    <div 
                                        key={type.value} 
                                        className="relative text-2xl lg:text-3xl font-serif font-bold leading-tight"
                                        onMouseEnter={() => setActiveType(type.value)}
                                    >
                                        <MenuLink 
                                            text={type.label}
                                            isActive={activeType === type.value}
                                            onClick={() => setActiveType(type.value)}
                                            delayIndex={index}
                                            isOpen={isOpen}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Callout */}
                            <div className={`mt-auto pt-12 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <a href="#" className="flex items-center gap-2 text-[#C2B067] text-sm font-bold uppercase tracking-widest group">
                                    View All Programmes <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Specific Links */}
                    <div className="w-full lg:w-2/3 bg-[#002240] h-full relative overflow-hidden">
                        {/* Background Marquee Text */}
                        <div className="absolute -right-20 top-0 h-full flex items-center justify-center opacity-5 pointer-events-none select-none">
                             <div className="whitespace-nowrap text-[20vh] font-serif font-bold text-white transform -rotate-90 origin-center leading-none">
                                {activeType}
                             </div>
                        </div>

                        <div className="relative z-10 py-12 px-12 h-full flex flex-col">
                            <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 transition-opacity duration-700 delay-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                Available Programmes
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 overflow-y-auto custom-scrollbar pb-12">
                                {displayedOfferings.length > 0 ? (
                                    displayedOfferings.map((offering, index) => (
                                        <div key={offering.id} className="text-lg font-medium">
                                            <MenuLink 
                                                to={`/course/${offering.id}`}
                                                text={offering.title}
                                                delayIndex={index + 2} // Slight offset from left column
                                                isOpen={isOpen}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className={`text-white/40 italic transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                        Select a category to view programmes.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Gold Accent Bar (Animated) */}
                <div 
                    className="absolute bottom-0 left-0 h-1.5 bg-[#C2B067] transition-all duration-1000 ease-out delay-300"
                    style={{ 
                        width: isOpen ? '100%' : '0%' 
                    }}
                ></div>
            </div>
        </div>
    );
};
