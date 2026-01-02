
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OFFERINGS, FOCUS_AREAS } from '../constants';
import { ArrowRight, Clock, ShoppingBag, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Offering } from '../types';

const PROGRAMME_TYPES = [
    { label: 'Full Time Learning', value: 'Full Time Learning', slug: 'full-time' },
    { label: 'Blended Learning', value: 'Blended Learning', slug: 'blended' },
    { label: 'In-Service Traineeship', value: 'In-Service Traineeship', slug: 'in-service' },
    { label: 'Part Time Learning', value: 'Part Time Learning', slug: 'part-time' },
    { label: 'Online Learning', value: 'Online Learning', slug: 'online' },
];

const STUDY_LEVELS = ['Degrees', 'Diplomas', 'Certificates'];

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

// Helper to determine if a course is e-commerce (Buy Now) vs Application (Apply Now)
const checkIsEcommerce = (course: Offering) => {
    if (['Degree', 'Diploma', 'Certificate', 'Higher Certificate'].includes(course.qualification)) {
        return false;
    }
    if (['Specialisation', 'Short Course'].includes(course.qualification)) {
        return true;
    }
    return false;
};

// ------------------------------------------
// Sub-Component: Programme Type Link (Col 1)
// ------------------------------------------
const MenuLink = ({ 
    text, 
    isActive = false, 
    onClick, 
    to,
    delayIndex = 0,
    isOpen,
    baseDelay = 0
}: { 
    text: string; 
    isActive?: boolean; 
    onClick?: () => void;
    to?: string;
    delayIndex: number;
    isOpen: boolean;
    baseDelay?: number;
}) => {
    // Base Classes
    const containerClasses = `relative block overflow-hidden group cursor-pointer py-2`;
    
    // Animation State Classes for Entrance
    const animClasses = `transition-all duration-500 ease-out transform`;
    const stateClasses = isOpen 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-4 opacity-0';

    const innerContent = (
        <div className="relative">
            {/* Primary Text (Slides up) */}
            <div className={`transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%] whitespace-nowrap text-2xl font-serif font-bold leading-tight ${isActive ? 'text-[#C2B067]' : 'text-white'}`}>
                {text}
            </div>
            
            {/* Duplicate Text (Slides up from bottom) */}
            <div className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] group-hover:translate-y-0 whitespace-nowrap text-2xl font-serif font-bold leading-tight text-[#C2B067]`}>
                {text}
            </div>
        </div>
    );

    const delay = isOpen ? baseDelay + (delayIndex * 50) : 0; // Stagger on open, instant on close

    if (to) {
        return (
            <Link 
                to={to} 
                className={`${containerClasses} ${animClasses} ${stateClasses}`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {innerContent}
            </Link>
        );
    }

    return (
        <div 
            onClick={onClick}
            className={`${containerClasses} ${animClasses} ${stateClasses}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {innerContent}
        </div>
    );
};

// ------------------------------------------
// Sub-Component: Filter Link (Col 2)
// ------------------------------------------
interface FilterLinkProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    isOpen: boolean;
    baseDelay: number;
    index: number;
}

const FilterLink: React.FC<FilterLinkProps> = ({ 
    label, 
    isActive, 
    onClick, 
    isOpen, 
    baseDelay, 
    index 
}) => {
    const delay = isOpen ? baseDelay + (index * 40) : 0;
    
    return (
        <button
            onClick={onClick}
            className={`block text-left text-base transition-all duration-500 ease-out transform ${
                isActive ? 'text-brand-gold translate-x-2 font-bold' : 'text-gray-300 font-medium hover:text-brand-gold'
            } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ 
                transitionDelay: `${delay}ms`
            }}
        >
            {label}
        </button>
    );
};

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    const [activeTypeObj, setActiveTypeObj] = useState(PROGRAMME_TYPES[0]);
    const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    // Reset state when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setActiveTypeObj(PROGRAMME_TYPES[0]);
                setActiveSubFilter(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // 1. Get Base Offerings for the Active Type
    const baseOfferings = useMemo(() => {
        return OFFERINGS.filter(o => o.programmeTypes.includes(activeTypeObj.value));
    }, [activeTypeObj]);

    // 2. Derive Available Filters based on Base Offerings
    const availableFocusAreas = useMemo(() => {
        const categories = new Set(baseOfferings.map(o => o.category));
        return FOCUS_AREAS.filter(area => categories.has(area.value));
    }, [baseOfferings]);

    const availableLevels = useMemo(() => {
        const quals = new Set(baseOfferings.map(o => o.qualification));
        return STUDY_LEVELS.filter(level => {
            const singular = level.slice(0, -1);
            return quals.has(singular);
        });
    }, [baseOfferings]);

    // 3. Final Displayed Offerings (Base + SubFilter)
    const displayedOfferings = useMemo(() => {
        if (!activeSubFilter) return baseOfferings;
        
        const cleanFilter = activeSubFilter === 'Degrees' ? 'Degree' :
                            activeSubFilter === 'Diplomas' ? 'Diploma' :
                            activeSubFilter === 'Certificates' ? 'Certificate' : activeSubFilter;
                            
        return baseOfferings.filter(o => o.category === cleanFilter || o.qualification === cleanFilter);
    }, [baseOfferings, activeSubFilter]);

    const handleApplyClick = (course: Offering) => {
        const isEcommerce = checkIsEcommerce(course);
        if (isEcommerce) {
            addToCart(course);
        } else {
            navigate(`/course/${course.id}`);
        }
    };

    return (
        <div 
            className="fixed top-[80px] left-0 right-0 z-50 overflow-hidden pointer-events-none"
            style={{ height: '600px' }}
        >
            {/* Curtain Container */}
            <div 
                className={`w-full h-full shadow-2xl flex relative transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-auto`}
                style={{ 
                    clipPath: isOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                    opacity: isOpen ? 1 : 0 
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {/* Background Layer - 2 Part Split (Col 1+2 Merged, Col 3 Darker) */}
                <div className="absolute inset-0 flex z-0">
                    {/* Col 1 (30%) + Col 2 (28%) = 58% */}
                    <div className="w-[58%] bg-[#002B4E] border-r border-white/5"></div>
                    {/* Col 3 (42%) */}
                    <div className="w-[42%] bg-[#001D36]"></div>
                </div>

                {/* Content Layer - Centered Grid */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full h-full flex items-start">
                    
                    {/* Column 1: Programme Type (30%) */}
                    <div className="w-[30%] h-full border-r border-white/5 pr-8 py-12 flex flex-col justify-start">
                        <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 transition-opacity duration-700 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            Programme Type
                        </p>
                        
                        <div className="space-y-4">
                            {PROGRAMME_TYPES.map((type, index) => (
                                <div 
                                    key={type.value} 
                                    onMouseEnter={() => {
                                        setActiveTypeObj(type);
                                        setActiveSubFilter(null);
                                    }}
                                >
                                    <MenuLink 
                                        text={type.label}
                                        isActive={activeTypeObj.value === type.value}
                                        onClick={() => setActiveTypeObj(type)}
                                        delayIndex={index}
                                        isOpen={isOpen}
                                        baseDelay={200} // Start after container opens
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Focus Areas & Level (28%) */}
                    <div className="w-[28%] h-full px-8 py-12 flex flex-col justify-start overflow-y-auto custom-scrollbar">
                        
                        {/* Key forces re-render for animation on type change */}
                        <div key={activeTypeObj.value} className="w-full">
                            
                            {/* Focus Areas Group */}
                            {availableFocusAreas.length > 0 && (
                                <div className="mb-6">
                                    <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}>
                                        Focus Areas
                                    </p>
                                    <div className="space-y-3">
                                        {availableFocusAreas.map((area, index) => (
                                            <FilterLink
                                                key={area.value}
                                                label={area.label}
                                                isActive={activeSubFilter === area.value}
                                                onClick={() => setActiveSubFilter(activeSubFilter === area.value ? null : area.value)}
                                                isOpen={isOpen}
                                                baseDelay={450} // Staggered start for Col 2 items
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Divider if both exist */}
                            {availableFocusAreas.length > 0 && availableLevels.length > 0 && (
                                <div 
                                    className={`w-full h-px bg-white/5 my-6 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
                                ></div>
                            )}

                            {/* Level of Study Group */}
                            {availableLevels.length > 0 && (
                                <div className="mb-8">
                                    <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}>
                                        Level of Study
                                    </p>
                                    <div className="space-y-3">
                                        {availableLevels.map((level, index) => (
                                            <FilterLink
                                                key={level}
                                                label={level}
                                                isActive={activeSubFilter === level}
                                                onClick={() => setActiveSubFilter(activeSubFilter === level ? null : level)}
                                                isOpen={isOpen}
                                                baseDelay={550} // Staggered after Focus Areas
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                             {availableFocusAreas.length === 0 && availableLevels.length === 0 && (
                                <div className="text-gray-500 italic text-sm mb-8 animate-fadeIn">
                                    No filters available for this programme type.
                                </div>
                            )}

                            {/* View All Link */}
                            <div 
                                className={`mt-4 pt-6 transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: isOpen ? '650ms' : '0ms' }}
                            >
                                <Link 
                                    to={`/programmes/${activeTypeObj.slug}`} 
                                    className="flex items-center gap-2 text-[#C2B067] text-xs font-bold uppercase group tracking-[1px] hover:text-white transition-colors"
                                >
                                    View All Programmes
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Results (42%) - Updated Layout */}
                    <div className="w-[42%] h-full pl-12 py-12 relative overflow-y-auto custom-scrollbar flex flex-col justify-start">
                        <div className="relative z-10 h-full flex flex-col">
                            <div className={`mb-8 flex items-center justify-between transition-opacity duration-700 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    Available Programmes
                                </p>
                                {activeSubFilter && (
                                    <span className="text-brand-gold text-xs font-bold uppercase tracking-widest border border-brand-gold/30 px-2 py-1 rounded-sm animate-fadeIn">
                                        Filtering by: {activeSubFilter}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-6">
                                {/* Key on wrapper to force re-render when type changes */}
                                <div key={activeTypeObj.value} className="contents">
                                {displayedOfferings.length > 0 ? (
                                    displayedOfferings.map((offering, index) => {
                                        const isEcommerce = checkIsEcommerce(offering);
                                        return (
                                        <div 
                                            key={offering.id} 
                                            className={`group bg-white/5 rounded-sm p-5 border border-white/5 hover:border-brand-gold/50 transition-all duration-500 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                            style={{ transitionDelay: `${isOpen ? 600 + (index * 60) : 0}ms` }} 
                                        >
                                            
                                            {/* Row 2: Title */}
                                            <Link 
                                                to={`/course/${offering.id}`}
                                                className="block mb-4"
                                            >
                                                <h4 className="text-lg font-serif font-bold text-white leading-tight group-hover:text-brand-gold transition-colors">
                                                    {offering.title}
                                                </h4>
                                            </Link>

                                            {/* Row 3: Tuition & Intake */}
                                            <div className="flex justify-between items-end mb-5 border-t border-white/10 pt-4">
                                                <div>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Tuition</p>
                                                    <p className="text-base font-bold text-white">R {offering.price?.toLocaleString() || 'TBA'}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Next Intake</p>
                                                    <p className="text-xs font-bold text-brand-gold">{offering.startDate}</p>
                                                </div>
                                            </div>

                                            {/* Row 4: Actions */}
                                            <div className="flex gap-3">
                                                <Link 
                                                    to={`/course/${offering.id}`}
                                                    className="flex-1 py-2.5 border border-white/20 text-white rounded-sm text-[10px] font-bold uppercase hover:bg-white hover:text-[#002B4E] transition-colors tracking-[1px] text-center"
                                                >
                                                    Learn More
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => handleApplyClick(offering)}
                                                    className="flex-1 py-2.5 bg-brand-gold text-[#002B4E] text-[10px] font-bold uppercase rounded-sm hover:bg-white hover:text-[#002B4E] transition-colors shadow-none tracking-[1px] text-center flex items-center justify-center gap-2"
                                                >
                                                    {isEcommerce ? 'Buy Now' : 'Apply Now'}
                                                    {isEcommerce ? <ShoppingBag size={12} /> : <FileText size={12} />}
                                                </button>
                                            </div>
                                        </div>
                                    )})
                                ) : (
                                    <div className={`text-white/40 italic transition-opacity duration-500 mt-8 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                        No programmes found matching these criteria.
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Gold Accent Bar (Animated) */}
                <div 
                    className="absolute bottom-0 left-0 h-1.5 bg-[#C2B067] transition-all duration-1000 ease-out"
                    style={{ 
                        width: isOpen ? '100%' : '0%',
                        transitionDelay: isOpen ? '300ms' : '0ms'
                    }}
                ></div>
                
                {/* Internal Styles for Animations */}
                <style>{`
                    .animate-fadeIn {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    );
};
