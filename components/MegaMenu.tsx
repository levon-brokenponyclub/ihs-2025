
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OFFERINGS, FOCUS_AREAS, ADMISSIONS_LINKS, EXPERIENCES_LINKS } from '../constants';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Offering } from '../types';

const PROGRAMME_TYPES = [
    { label: 'Full Time Learning', value: 'Full Time Learning', slug: 'full-time' },
    { label: 'Blended Learning', value: 'Blended Learning', slug: 'blended' },
    { label: 'In-Service Traineeship', value: 'In-Service Traineeship', slug: 'in-service' },
    { label: 'Part Time Learning', value: 'Part Time Learning', slug: 'part-time' },
    { label: 'Online Learning', value: 'Online Learning', slug: 'online' },
];

const STUDY_LEVELS = ['Degrees', 'Higher Certificates', 'Diplomas', 'Occupational Certificates', 'Certificates', 'Short Courses'];

interface MegaMenuProps {
    isOpen: boolean;
    activeMenu: string | null;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

// Consolidated Ecommerce Check
const checkIsEcommerce = (course: Offering) => {
    // Only "Purchasing for Food Service Operations" (ID 19) and "Puff Pastry" are Buy Now
    return ['19', 'puff-pastry'].includes(course.id);
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
    baseDelay = 0,
    onNavigate
}: {
    text: string;
    isActive?: boolean;
    onClick?: () => void;
    to?: string;
    delayIndex: number;
    isOpen: boolean;
    baseDelay?: number;
    onNavigate?: (path: string) => void;
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
                onClick={(e) => {
                    if (onNavigate) {
                        e.preventDefault();
                        onNavigate(to);
                    }
                    if (onClick) onClick();
                }}
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
    onClick?: () => void;
    isOpen: boolean;
    baseDelay: number;
    index: number;
    to?: string;
}

const FilterLink: React.FC<FilterLinkProps> = ({
    label,
    isActive,
    onClick,
    isOpen,
    baseDelay,
    index,
    to
}) => {
    const delay = isOpen ? baseDelay + (index * 40) : 0;
    const className = `block text-left text-base transition-all duration-500 ease-out transform ${isActive ? 'text-brand-gold translate-x-2 font-bold' : 'text-gray-300 font-medium hover:text-brand-gold'
        } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

    if (to) {
        return (
            <Link
                to={to}
                className={className}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {label}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={className}
            style={{
                transitionDelay: `${delay}ms`
            }}
        >
            {label}
        </button>
    );
};

// =======================
// OUR PROGRAMMES MEGA MENU
// =======================

export const MegaMenu: React.FC<MegaMenuProps> = ({
    isOpen,
    activeMenu,
    onMouseEnter,
    onMouseLeave
}) => {
    const [activeTypeObj, setActiveTypeObj] = useState(PROGRAMME_TYPES[0]);
    const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const hasInteracted = Boolean(activeSubFilter);

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

    // Base offerings
    const baseOfferings = useMemo(() => {
        return OFFERINGS.filter(o =>
            o.programmeTypes.includes(activeTypeObj.value)
        );
    }, [activeTypeObj]);

    const availableFocusAreas = useMemo(() => {
        const categories = new Set(baseOfferings.map(o => o.category));
        return FOCUS_AREAS.filter(area => categories.has(area.value));
    }, [baseOfferings]);

    const availableLevels = useMemo(() => {
        const quals = new Set(baseOfferings.map(o => o.qualification));
        const mappings: Record<string, string[]> = {
            Degrees: ['Degree'],
            'Higher Certificates': ['Higher Certificate'],
            Diplomas: ['Diploma'],
            'Occupational Certificates': ['Occupational Certificate'],
            Certificates: ['Certificate'],
            'Short Courses': ['Short Course']
        };

        return STUDY_LEVELS.filter(level =>
            quals.has(level) ||
            mappings[level]?.some(m => quals.has(m))
        );
    }, [baseOfferings]);

    const displayedOfferings = useMemo(() => {
        if (!activeSubFilter) return baseOfferings;

        const mappings: Record<string, string[]> = {
            Degrees: ['Degree'],
            'Higher Certificates': ['Higher Certificate'],
            Diplomas: ['Diploma'],
            'Occupational Certificates': ['Occupational Certificate'],
            Certificates: ['Certificate'],
            'Short Courses': ['Short Course']
        };

        if (mappings[activeSubFilter]) {
            return baseOfferings.filter(o =>
                mappings[activeSubFilter].includes(o.qualification)
            );
        }

        return baseOfferings.filter(
            o => o.category === activeSubFilter
        );
    }, [baseOfferings, activeSubFilter]);

    const handleApplyClick = (e: React.MouseEvent, course: Offering) => {
        e.preventDefault();
        e.stopPropagation();

        const isEcommerce = checkIsEcommerce(course);
        if (isEcommerce) {
            addToCart(course);
            if (onMouseLeave) onMouseLeave();
        } else {
            if (onMouseLeave) onMouseLeave();
            setTimeout(() => {
                navigate(`/course/${course.id}`);
            }, 800);
        }
    };

    const handleDelayedLinkClick = (path: string) => {
        if (onMouseLeave) onMouseLeave();
        setTimeout(() => {
            navigate(path);
        }, 800);
    };

    const containerClasses = isOpen
        ? 'opacity-100 translate-y-0 h-[600px] ease-[cubic-bezier(0.25,1,0.5,1)]'
        : 'opacity-0 -translate-y-6 h-0 ease-[cubic-bezier(0.5,0,0.75,0)]';

    // EXPERIENCES MENU
    if (activeMenu === 'Experiences') {
        return (
            <div
                className="fixed top-[80px] left-0 right-0 z-50 overflow-hidden pointer-events-none"
            >
                <div
                    className={`w-full shadow-2xl flex relative transition-all duration-300 overflow-hidden pointer-events-auto ${containerClasses}`}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {/* Background */}
                    <div className="absolute inset-0 flex z-0">
                        <div className="w-[40%] bg-[#002B4E]"></div>
                        <div className="w-[60%] bg-[#001D36]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full h-full flex items-start">
                        {/* Experiences Links */}
                        <div className="w-[40%] h-full pr-8 py-12 flex flex-col justify-start">
                            <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 transition-opacity duration-700 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                Experiences
                            </p>
                            <div className="space-y-4">
                                {EXPERIENCES_LINKS.map((link, index) => (
                                    <MenuLink
                                        key={link.label}
                                        text={link.label}
                                        to={link.href}
                                        delayIndex={index}
                                        isOpen={isOpen}
                                        baseDelay={200}
                                        onNavigate={handleDelayedLinkClick}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side Content */}
                        <div className="w-[60%] h-full pl-12 py-12 flex flex-col justify-center items-center text-center">
                             <div className={`transition-all duration-700 delay-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h3 className="font-serif text-3xl text-white mb-4">Experience Excellence</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    Join us on campus to see our world-class facilities and meet our expert lecturers.
                                </p>
                                <button className="bg-[#C2B067] text-[#002B4E] font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-colors">
                                    Book a Visit
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // ADMISSIONS MENU
    if (activeMenu === 'Admissions') {
        return (
            <div
                className="fixed top-[80px] left-0 right-0 z-50 overflow-hidden pointer-events-none"
            >
                <div
                    className={`w-full shadow-2xl flex relative transition-all duration-300 overflow-hidden pointer-events-auto ${containerClasses}`}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {/* Background */}
                    <div className="absolute inset-0 flex z-0">
                        <div className="w-[40%] bg-[#002B4E]"></div>
                        <div className="w-[60%] bg-[#001D36]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full h-full flex items-start">
                        {/* Admissions Links */}
                        <div className="w-[40%] h-full pr-8 py-12 flex flex-col justify-start">
                            <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 transition-opacity duration-700 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                Admissions
                            </p>
                            <div className="space-y-4">
                                {ADMISSIONS_LINKS.map((link, index) => (
                                    <MenuLink
                                        key={link.label}
                                        text={link.label}
                                        to={link.href}
                                        delayIndex={index}
                                        isOpen={isOpen}
                                        baseDelay={200}
                                        onNavigate={handleDelayedLinkClick}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side Content */}
                        <div className="w-[60%] h-full pl-12 py-12 flex flex-col justify-center items-center text-center">
                             <div className={`transition-all duration-700 delay-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h3 className="font-serif text-3xl text-white mb-4">Start Your Journey</h3>
                                <p className="text-gray-400 max-w-md mx-auto mb-8">
                                    We are here to help you every step of the way. From payment plans to registration, get all the info you need.
                                </p>
                                <button className="bg-[#C2B067] text-[#002B4E] font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-colors">
                                    Apply Now
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // OUR PROGRAMMES MENU
    return (
        <div
            className="fixed top-[80px] left-0 right-0 z-50 overflow-hidden pointer-events-none"
        >
            {/* Curtain Container */}
            <div
                className={`w-full shadow-2xl flex relative transition-all duration-300 overflow-hidden pointer-events-auto ${containerClasses}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {/* Background */}
                <div className="absolute inset-0 flex z-0">
                    <div className="w-[30%] bg-[#002B4E]" />
                    <div className="w-[28%] bg-[#002B4E] border-r border-white/5" />
                    <div className="w-[42%] bg-[#001D36]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full h-full flex items-start">

                    {/* COLUMN 1 – PROGRAMME TYPE */}
                    <div className="w-[30%] h-full border-r border-white/5 pr-8 py-12 flex flex-col">
                        <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-8">
                            Programme Type
                        </p>

                        <div className="space-y-4 flex-1">
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
                                        delayIndex={index}
                                        isOpen={isOpen}
                                        baseDelay={200}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* View All Link */}
                        <Link
                            to={`/programmes/${activeTypeObj.slug}`}
                            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C2B067] hover:text-white transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelayedLinkClick(`/programmes/${activeTypeObj.slug}`);
                            }}
                        >
                            View all {activeTypeObj.label}
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* COLUMN 2 – FILTERS */}
                    <div className="w-[28%] h-full px-8 py-12 overflow-y-auto custom-scrollbar">
                        <div key={activeTypeObj.value}>

                            {availableFocusAreas.length > 0 && (
                                <div className="mb-8">
                                    <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                                        Focus Areas
                                    </p>
                                    <p className="text-xs text-gray-400 mb-4">
                                        Choose what you want to specialise in
                                    </p>

                                    <div className="space-y-3">
                                        {availableFocusAreas.map((area, index) => (
                                            <FilterLink
                                                key={area.value}
                                                label={area.label}
                                                isActive={activeSubFilter === area.value}
                                                onClick={() =>
                                                    setActiveSubFilter(
                                                        activeSubFilter === area.value ? null : area.value
                                                    )
                                                }
                                                isOpen={isOpen}
                                                baseDelay={450}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {availableLevels.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                                        Study Level
                                    </p>
                                    <p className="text-xs text-gray-400 mb-4">
                                        Filter by outcome or recognition
                                    </p>

                                    <div className="space-y-3">
                                        {availableLevels.map((level, index) => (
                                            <FilterLink
                                                key={level}
                                                label={level}
                                                isActive={activeSubFilter === level}
                                                onClick={() =>
                                                    setActiveSubFilter(
                                                        activeSubFilter === level ? null : level
                                                    )
                                                }
                                                isOpen={isOpen}
                                                baseDelay={600}
                                                index={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* COLUMN 3 – RESULTS */}
                    <div
                        className={`w-[42%] h-full pl-12 py-12 flex flex-col transition-opacity duration-500 ${
                            hasInteracted ? 'opacity-100' : 'opacity-60'
                        }`}
                    >
                        {!hasInteracted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center px-8">
                                <p className="text-[#C2B067] uppercase tracking-widest text-xs font-bold mb-4">
                                    Refine your selection
                                </p>
                                <p className="text-gray-400 max-w-sm">
                                    Choose a focus area or Study Level to view matching programmes.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-xs font-bold text-[#C2B067] uppercase tracking-widest">
                                        {displayedOfferings.length} Programmes Found
                                    </p>

                                    {activeSubFilter && (
                                        <button
                                            onClick={() => setActiveSubFilter(null)}
                                            className="text-xs text-gray-400 hover:text-white"
                                        >
                                            Clear filter ✕
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 -mr-4">
                                    <div className="space-y-4 pb-16">
                                        {displayedOfferings.map((course, index) => {
                                            const isEcommerce = checkIsEcommerce(course);
                                            const delay = 300 + index * 50;

                                            return (
                                                <div
                                                    key={course.id}
                                                    className="bg-[#0a233f] border border-white/5 hover:border-[#C2B067]/30 p-5 rounded-sm transition-all duration-500"
                                                    style={{ transitionDelay: `${delay}ms` }}
                                                >
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelayedLinkClick(`/course/${course.id}`);
                                                        }}
                                                    >
                                                        {/* <div className="flex justify-between mb-2">
                                                            <span className="text-[10px] font-bold text-[#C2B067] uppercase">
                                                                {course.category}
                                                            </span>
                                                            <span className="text-[10px] font-bold text-gray-500 uppercase">
                                                                {course.qualification}
                                                            </span>
                                                        </div> */}

                                                        <h4 className="text-white font-serif font-bold text-base mb-4 mr-0 leading-relaxed hover:text-[#C2B067] transition-colors">
                                                            {course.title}
                                                        </h4>

                                                        <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                                            <span className="text-sm font-bold text-white">
                                                                R {course.price?.toLocaleString() || 'TBA'}
                                                            </span>

                                                            <button
                                                                onClick={(e) => handleApplyClick(e, course)}
                                                                className="text-[10px] font-bold uppercase tracking-wider text-brand-gold hover:text-[#C2B067] flex items-center gap-2"
                                                            >
                                                                {isEcommerce ? 'Buy Now' : 'Apply Now'}
                                                                <ArrowRight size={12} />
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};
