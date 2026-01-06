import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OFFERINGS, FOCUS_AREAS } from '../constants';
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

const STUDY_LEVELS = ['Degrees', 'Diplomas', 'Certificates', 'Short Courses'];

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

// Consolidated Ecommerce Check
const checkIsEcommerce = (course: Offering) => {
    // Only "Purchasing for Food Service Operations" (ID 19) is Buy Now
    return course.id === '19';
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
            className={`block text-left text-base transition-all duration-500 ease-out transform ${isActive ? 'text-brand-gold translate-x-2 font-bold' : 'text-gray-300 font-medium hover:text-brand-gold'
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
            const singular = level.slice(0, -1); // e.g. "Degrees" -> "Degree"
            // Special handling for 'Short Courses' -> 'Short Course'
            const check = level === 'Short Courses' ? 'Short Course' : singular;
            return quals.has(check);
        });
    }, [baseOfferings]);

    // 3. Final Displayed Offerings (Base + SubFilter)
    const displayedOfferings = useMemo(() => {
        if (!activeSubFilter) return baseOfferings;

        let cleanFilter = activeSubFilter;
        // Mapping plurals to singulars for comparison
        if (activeSubFilter === 'Degrees') cleanFilter = 'Degree';
        else if (activeSubFilter === 'Diplomas') cleanFilter = 'Diploma';
        else if (activeSubFilter === 'Certificates') cleanFilter = 'Certificate';
        else if (activeSubFilter === 'Short Courses') cleanFilter = 'Short Course';

        return baseOfferings.filter(o => o.category === cleanFilter || o.qualification === cleanFilter);
    }, [baseOfferings, activeSubFilter]);

    const handleApplyClick = (e: React.MouseEvent, course: Offering) => {
        e.stopPropagation();
        e.preventDefault();
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
                {/* Background Layer - 3 Part Split */}
                <div className="absolute inset-0 flex z-0">
                    <div className="w-[30%] bg-[#002B4E] border-r border-white/5"></div>
                    <div className="w-[28%] bg-[#002B4E] border-r border-white/5"></div>
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
                                        baseDelay={200}
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
                                                baseDelay={450}
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

                            {/* Study Levels Group */}
                            {availableLevels.length > 0 && (
                                <div>
                                    <p className={`text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: isOpen ? '550ms' : '0ms' }}>
                                        Qualification Level
                                    </p>
                                    <div className="space-y-3">
                                        {availableLevels.map((level, index) => (
                                            <FilterLink
                                                key={level}
                                                label={level}
                                                isActive={activeSubFilter === level}
                                                onClick={() => setActiveSubFilter(activeSubFilter === level ? null : level)}
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

                    {/* Column 3: Course List (42%) */}
                    <div className="w-[42%] h-full pl-8 py-12 flex flex-col justify-start bg-[#001D36] relative overflow-hidden">
                        <p className={`text-xs font-bold text-[#C2B067] uppercase tracking-widest mb-8 transition-opacity duration-700 delay-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            {displayedOfferings.length} {displayedOfferings.length === 1 ? 'Programme' : 'Programmes'} Found
                        </p>

                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 -mr-4">
                            <div className="space-y-4 pb-20">
                                {displayedOfferings.map((course, index) => {
                                    const isEcommerce = checkIsEcommerce(course);
                                    // Stagger entrance of courses
                                    const delay = isOpen ? 400 + (index * 50) : 0;

                                    return (
                                        <div
                                            key={course.id}
                                            className={`group relative bg-[#0a233f] border border-white/5 hover:border-[#C2B067]/30 p-5 rounded-sm transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                            style={{ transitionDelay: `${delay}ms` }}
                                        >
                                            <Link to={`/course/${course.id}`} className="block">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-bold text-[#C2B067] uppercase tracking-wider">{course.category}</span>
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase">{course.qualification}</span>
                                                </div>
                                                <h4 className="text-white font-serif font-bold text-lg mb-2 group-hover:text-[#C2B067] transition-colors leading-tight">
                                                    {course.title}
                                                </h4>
                                                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                                                    <span className="text-sm font-bold text-white">R {course.price?.toLocaleString() || 'TBA'}</span>

                                                    <button
                                                        onClick={(e) => handleApplyClick(e, course)}
                                                        className="text-[10px] font-bold uppercase tracking-[1px] text-white hover:text-[#C2B067] flex items-center gap-2 transition-colors"
                                                    >
                                                        {isEcommerce ? 'Buy Now' : 'Apply Now'} <ArrowRight size={12} />
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}

                                {displayedOfferings.length === 0 && (
                                    <div className="text-gray-400 italic text-sm">
                                        Select a filter to view programmes.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};