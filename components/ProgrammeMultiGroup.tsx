import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OFFERINGS } from '../constants';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    X,
    Eye,
    LayoutGrid,
    StretchHorizontal,
    SlidersHorizontal,
    ArrowUpDown
} from 'lucide-react';
import { Offering } from '../types';
import { useTransition } from '../context/TransitionContext';
import gsap from 'gsap';
import { CourseCard } from './CourseCard';
import { FilterSlidePanel } from './FilterSlidePanel';

// --- Filter Options (Static) ---
const STUDY_LEVELS = [
    'Degrees',
    'Higher Certificates',
    'Diplomas',
    'Occupational Certificates',
    'Specialisations',
    'Certificates',
    'Short Courses'
];

const PROGRAMME_TYPES = [
    'Full Time Learning',
    'Blended Learning',
    'In-Service Traineeship',
    'Part Time Learning',
    'Online Learning'
];

// --- Autocomplete Component ---
const AutocompleteInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
    suggestions: { programmes: string[], careers: string[], areas: string[] };
    placeholder: string;
    onSuggestionSelect: (suggestion: string) => void;
    onViewAll?: (query: string) => void;
    variant?: 'default' | 'minimal';
}> = ({ value, onChange, suggestions, placeholder, onSuggestionSelect, onViewAll, variant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState<{ programmes: string[], careers: string[], areas: string[] }>({
        programmes: [],
        careers: [],
        areas: []
    });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value.length > 0) {
            const q = value.toLowerCase();
            setFiltered({
                programmes: suggestions.programmes.filter(s => s.toLowerCase().includes(q)),
                careers: suggestions.careers.filter(s => s.toLowerCase().includes(q)),
                areas: suggestions.areas.filter(s => s.toLowerCase().includes(q))
            });
            setIsOpen(true);
        } else {
            setFiltered({ programmes: [], careers: [], areas: [] });
            setIsOpen(false);
        }
    }, [value, suggestions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasResults = filtered.programmes.length > 0 || filtered.careers.length > 0 || filtered.areas.length > 0;

    return (
        <div ref={containerRef} className={`w-full z-10 ${variant === 'minimal' ? 'static' : 'relative'}`}>
            <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${variant === 'minimal' ? 'text-brand-primary' : 'text-gray-400'}`} size={20} />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => value.length > 0 && setIsOpen(true)}
                    className={`w-full text-xs font-bold py-4 pl-12 pr-4 outline-none transition-colors appearance-none cursor-pointer font-sans transition-all placeholder:uppercase placeholder:tracking-wider ${
                        variant === 'default'
                            ? 'bg-white shadow-sm border border-gray-400 focus:ring-brand-gold rounded-full text-gray placeholder:text-gray'
                            : 'bg-transparent border-none text-brand-primary placeholder:text-brand-primary/40' // Minimal style
                    }`}
                />
                {value && (
                    <button
                        onClick={() => {
                            onChange('');
                            setIsOpen(false);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {isOpen && value.length > 0 && (
                <div 
                    className={`absolute top-full bg-white border border-gray-200 shadow-1xl z-50 max-h-96 overflow-y-auto mt-0 
                    ${variant === 'minimal' 
                        ? 'left-9 right-9 rounded-b-2xl border-brand-gold/10' 
                        : 'left-0 right-0 rounded'
                    }`}
                >
                    {hasResults ? (
                        <>
                            {filtered.programmes.length > 0 && (
                                <div className="p-0">
                                    <div className="px-4 py-4 text-xs font-bold text-brand-primary uppercase tracking-[1px] bg-[#F5F5F5] font-sans">Programmes</div>
                                    {filtered.programmes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                onSuggestionSelect(s);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-brand-primary font-medium transition-colors rounded text-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {filtered.careers.length > 0 && (
                                <div className="p-0 border-t border-gray-200">
                                    <div className="px-4 py-4 text-xs font-bold text-brand-primary uppercase tracking-[1px] bg-[#F5F5F5] font-sans">Careers</div>
                                    {filtered.careers.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                onSuggestionSelect(s);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-brand-primary font-medium transition-colors rounded text-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {filtered.areas.length > 0 && (
                                <div className="p-0 border-t border-gray-200">
                                    <div className="px-4 py-4 text-xs font-bold text-brand-primary uppercase tracking-[1px] bg-[#F5F5F5] font-sans">Areas</div>
                                    {filtered.areas.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => {
                                                onSuggestionSelect(s);
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-brand-primary font-medium transition-colors rounded text-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {onViewAll && (
                                <button
                                    onClick={() => {
                                        onViewAll(value);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-5 py-4 hover:bg-brand-primary text-white font-bold transition-colors border-t border-slate-100 sticky bottom-0 bg-brand-gold text-xs uppercase tracking-wider font-sans"
                                >
                                    View all programmes matching "{value}" →
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No results found for "{value}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Refined Multi-Select Component (Brand-Aligned) ---
const MultiSelect: React.FC<{
    options: Array<{ label: string; value: string }>;
    selected: string[];
    onChange: (selected: string[]) => void;
    label: string;
    placeholder?: string;
    header?: string;
    variant?: 'default' | 'minimal';
}> = ({ options, selected, onChange, label, placeholder = `Select ${label.toLowerCase()}`, header, variant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
        onChange(
            selected.includes(value)
                ? selected.filter(v => v !== value)
                : [...selected, value]
        );
    };

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Label - Hide for minimal variant */}
            {variant !== 'minimal' && (
                <div
                    className={`absolute left-0 transition-all duration-300 ease-in-out ${
                        isOpen || selected.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } -top-5`}
                >
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/50 font-sans">
                        {label}
                    </label>
                </div>
            )}

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex w-full items-center justify-between text-left transition focus:outline-none rounded ${
                    variant === 'default'
                        ? 'bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand-gold px-4 py-3'
                        : 'bg-transparent border-none py-4 px-3 focus:ring-0 hover:bg-slate-50' // Minimal
                }`}
            >
                <span className={`font-bold transition-opacity ${
                    variant === 'minimal' 
                        ? 'text-xs uppercase tracking-wider text-brand-primary/60' 
                        : 'text-sm text-brand-primary'
                } ${selected.length > 0 && variant === 'minimal' ? '!text-brand-primary opacity-100' : ''}`}>
                    {selected.length > 0 ? `${selected.length} selected` : placeholder}
                </span>
                <ChevronRight
                    size={14}
                    className={`transition-transform text-brand-primary ${isOpen ? 'rotate-90' : ''}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className={`absolute z-40 w-full rounded border border-slate-200 bg-white shadow-2xl overflow-hidden mt-1 ${variant === 'minimal' ? 'left-3' : 'left-0'}`}>
                    {header && (
                        <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/40 bg-slate-50 font-sans">
                            {header}
                        </div>
                    )}

                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                        {options.map(option => {
                            const isSelected = selected.includes(option.value);
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => toggleOption(option.value)}
                                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                                        isSelected ? 'bg-brand-gold/10' : 'hover:bg-slate-50'
                                    }`}
                                >
                                    <span className="text-sm font-medium text-brand-primary">
                                        {option.label}
                                    </span>
                                    <span
                                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                                            isSelected
                                                ? 'border-brand-gold bg-brand-gold text-white'
                                                : 'border-slate-300'
                                        }`}
                                    >
                                        {isSelected && (
                                            <svg width="10" height="8" viewBox="0 0 12 10">
                                                <path
                                                    d="M1 5L4.5 8.5L11 1.5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="none"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 p-4 border-t border-slate-200 bg-slate-50">
                        <button
                            type="button"
                            onClick={() => onChange([])}
                            className="flex-1 rounded border border-slate-300 px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-brand-primary hover:bg-white transition font-sans"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded bg-brand-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition font-sans"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Helper Components ---
const FilterChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-gold border border-brand-gold rounded-xl text-white text-xs font-semibold font-sans">
        <span>{label}</span>
        <button onClick={onRemove} className="hover:text-red-500 transition-colors">
            <X size={14} />
        </button>
    </div>
);

const FilterOption: React.FC<{ label: string; selected: boolean; onToggle: () => void; onFocus?: () => void; onBlur?: () => void }> = ({ label, selected, onToggle, onFocus, onBlur }) => (
    <button
        onClick={onToggle}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex items-center justify-between w-full px-4 py-3.5 rounded border-2 transition-all font-sans ${
            selected 
                ? 'border-brand-gold bg-brand-gold/5 text-brand-primary' 
                : 'border-slate-100 bg-white text-brand-primary/60 hover:border-slate-200'
        }`}
    >
        <span className="font-bold">{label}</span>
        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            selected ? 'border-brand-gold bg-brand-gold text-white' : 'border-slate-300'
        }`}>
            {selected && <div className="w-2.5 h-2.5 bg-white rounded shadow-sm" />}
        </div>
    </button>
);

// --- Main ProgrammeMultiGroup Component ---
export const ProgrammeMultiGroup: React.FC = () => {
    // Animation Refs
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    // Use Global Transition
    const { startTransition } = useTransition();

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
    const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>([]);
    const [selectedProgrammeTypes, setSelectedProgrammeTypes] = useState<string[]>([]);
    const [selectedStartDates, setSelectedStartDates] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<'slider' | 'grid'>(() => {
        return (localStorage.getItem('programmeViewMode') as 'slider' | 'grid') || 'slider';
    });
    const [sortBy, setSortBy] = useState('relevance');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isAdvancedFiltersExpanded, setIsAdvancedFiltersExpanded] = useState(false);
    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>(OFFERINGS);

    useEffect(() => {
        localStorage.setItem('programmeViewMode', viewMode);
    }, [viewMode]);

    // New state to track focus within the focus-area control group
    const [isFocusAreaFocused, setIsFocusAreaFocused] = useState(false);

    // Handlers passed to each FilterOption to update focus state
    const handleFocusAreaFocus = () => setIsFocusAreaFocused(true);
    const handleFocusAreaBlur = () => {
        // small delay to allow focus to transfer between buttons without hiding label
        setTimeout(() => setIsFocusAreaFocused(false), 100);
    };

    // Dynamically extract focus areas from offerings
    const uniqueFocusAreas = useMemo(() => {
        const areas = new Set<string>();
        OFFERINGS.forEach(offering => {
            if (offering.category) {
                areas.add(offering.category);
            }
        });
        return Array.from(areas).sort();
    }, []);

    // Dynamically extract unique start dates from offerings
    const uniqueStartDates = useMemo(() => {
        const dates = new Set<string>();
        OFFERINGS.forEach(offering => {
            if (offering.startDate) {
                // Split by comma or ampersand
                const parts = offering.startDate.split(/[,&]/);
                parts.forEach(d => {
                    const trimmed = d.trim();
                    if (trimmed) {
                        // Consolidate into single month format
                        // We check if it's a month or "Monthly"
                        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                        const lowerTrimmed = trimmed.toLowerCase();
                        if (months.includes(lowerTrimmed) || lowerTrimmed === 'monthly') {
                            // Capitalize first letter
                            const capitalized = lowerTrimmed.charAt(0).toUpperCase() + lowerTrimmed.slice(1);
                            dates.add(capitalized);
                        }
                    }
                });
            }
        });

        // Ensure "Monthly" is capitalized correctly if present
        const result = Array.from(dates).map(d => d.toLowerCase() === 'monthly' ? 'Monthly' : d);

        // Remove duplicates again just in case (e.g., "monthly" and "Monthly")
        const uniqueResult = Array.from(new Set(result));

        return uniqueResult.sort((a, b) => {
            if (a === 'Monthly') return -1; // Put Monthly at the top or bottom? Usually top or after months. Let's put it at the bottom.
            if (b === 'Monthly') return 1;

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const indexA = months.indexOf(a);
            const indexB = months.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            return a.localeCompare(b);
        });
    }, []);

    // Career suggestions grouped
    const CAREER_SUGGESTIONS = useMemo(() => {
        const staticCareers = [
            'General Manager', 'Hotel Manager', 'Operations Manager', 'Department Head',
            'Front Office Supervisor', 'Housekeeping Supervisor', 'Guest Relations Officer',
            'Executive Management', 'Strategic Operations', 'Consultancy', 'Hospitality Management',
            'Operational Leadership', 'Entrepreneur',
            'F&B Manager', 'Restaurant Manager', 'Bar Manager', 'Commis Chef', 'Line Cook',
            'Demi Chef', 'F&B Administrator', 'Purchasing Assistant', 'Stock Controller',
            'Home Baker', 'Pastry Enthusiast',
            'Marketing Manager', 'Event Coordinator', 'Conference Planner', 'Events Manager',
            'HR Manager', 'Training Manager', 'Department Supervisor'
        ];

        return {
            programmes: OFFERINGS.map(o => o.title),
            careers: staticCareers.sort(),
            areas: uniqueFocusAreas
        };
    }, [uniqueFocusAreas]);

    // --- Filtering & Sorting Logic ---
    useEffect(() => {
        let filtered = [...OFFERINGS];

        // Filter by focus area (multi-select)
        if (selectedFocusAreas.length > 0) {
            filtered = filtered.filter((o: Offering) =>
                selectedFocusAreas.some(area => o.category === area)
            );
        }

        // Filter by search query (career/title/description)
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter((o: Offering) =>
                o.category.toLowerCase().includes(q) ||
                o.title.toLowerCase().includes(q) ||
                o.description.toLowerCase().includes(q)
            );
        }

        // Filter by study level (multi-select)
        if (selectedStudyLevels.length > 0) {
            filtered = filtered.filter((o: Offering) =>
                selectedStudyLevels.some(level => {
                    if (o.qualification === level) return true;
                    const mappings: Record<string, string[]> = {
                        'Degrees': ['Degree'],
                        'Higher Certificates': ['Higher Certificate'],
                        'Diplomas': ['Diploma'],
                        'Occupational Certificates': ['Occupational Certificate'],
                        'Specialisations': ['Specialisation'],
                        'Certificates': ['Certificate'],
                        'Short Courses': ['Short Course']
                    };
                    return mappings[level]?.some(m => o.qualification === m) || false;
                })
            );
        }

        // Filter by programme type (multi-select)
        if (selectedProgrammeTypes.length > 0) {
            filtered = filtered.filter((o: Offering) =>
                selectedProgrammeTypes.some(type => o.programmeTypes.includes(type))
            );
        }

        // Filter by start date (multi-select)
        if (selectedStartDates.length > 0) {
            filtered = filtered.filter((o: Offering) =>
                selectedStartDates.some(date => o.startDate?.includes(date))
            );
        }

        // Sorting
        if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'tuition-low') {
            filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === 'duration') {
            filtered.sort((a, b) => a.duration.localeCompare(b.duration));
        } else if (sortBy === 'start-date') {
            filtered.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        }

        setDisplayedOfferings(filtered);
    }, [searchQuery, selectedFocusAreas, selectedStudyLevels, selectedProgrammeTypes, selectedStartDates, sortBy]);

    useEffect(() => {
        if (isMobileFiltersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileFiltersOpen]);

    useEffect(() => {
        const ctx = gsap.context((self) => {
            const cards = self.selector!('.course-card');
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
                );
            }
        }, cardsContainerRef);

        return () => ctx.revert();
    }, [displayedOfferings]);

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedFocusAreas([]);
        setSelectedStudyLevels([]);
        setSelectedProgrammeTypes([]);
        setSelectedStartDates([]);
    };

    const scrollSlider = (dir: 'left' | 'right') => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    };

    const handleCardExpand = (offering: Offering, imgRect: DOMRect, txtRect: DOMRect, catRect: DOMRect) => {
        startTransition(offering, imgRect, txtRect, catRect);
    };

    const activeFilterCount = selectedFocusAreas.length + selectedStudyLevels.length + selectedProgrammeTypes.length + selectedStartDates.length;

    return (
        <section className="bg-gray-50 relative min-h-screen" id="programme-multi-group">
            <FilterSlidePanel 
                isOpen={isMobileFiltersOpen}
                onClose={() => setIsMobileFiltersOpen(false)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                
                studyLevels={STUDY_LEVELS}
                selectedStudyLevels={selectedStudyLevels}
                onStudyLevelsChange={setSelectedStudyLevels}
                
                focusAreas={uniqueFocusAreas}
                selectedFocusAreas={selectedFocusAreas}
                onFocusAreasChange={setSelectedFocusAreas}
                
                programmeTypes={PROGRAMME_TYPES}
                selectedProgrammeTypes={selectedProgrammeTypes}
                onProgrammeTypesChange={setSelectedProgrammeTypes}

                startDates={uniqueStartDates}
                selectedStartDates={selectedStartDates}
                onStartDatesChange={setSelectedStartDates}

                totalResults={displayedOfferings.length}
                activeFilterCount={activeFilterCount}
                onResetFilters={resetFilters}
            />

            {/* --- TOP SECTION --- */}
            <div className="relative bg-[#f8fafc] pt-28 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="mb-12 text-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-brand-primary mb-6">
                            Explore <span className="text-brand-gold">Our Programmes</span>
                        </h2>
                        <p className="text-brand-textSecondary max-w-3xl mx-auto mb-8 leading-relaxed text-lg">
                            World-class hospitality and culinary programmes designed to launch your career. All programmes include practical work experience and employment support.
                        </p>
                    </div>
                </div>

                {/* --- FILTER SECTION (Horizontal Layout) --- */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
                        
                        {/* Wrapper for positioning stack */}
                        <div className="relative">

                            {/* MAIN SEARCH BAR (Floating on top) */}
                            <div className="relative z-30 bg-transparent rounded-xl">
                                
                                {/* Unified Search & Filter Bar */}
                                <div className="p-0">
                                    <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 gap-2 md:gap-4 relative z-30">
                                        
                                        {/* Focus Area Select (Minimal within bar, hidden on mobile) */}
                                        <div className="hidden md:block w-[280px] border-r border-slate-200 pr-2 pl-2 relative">
                                            <MultiSelect
                                                options={uniqueFocusAreas.map(area => ({ label: area, value: area }))}
                                                selected={selectedFocusAreas}
                                                onChange={setSelectedFocusAreas}
                                                label="Focus Area"
                                                placeholder="Focus Area"
                                                variant="minimal"
                                            />
                                        </div>

                                        {/* Search Bar (Minimal within bar) */}
                                        <div className="flex-1">
                                            <AutocompleteInput
                                                value={searchQuery}
                                                onChange={setSearchQuery}
                                                suggestions={CAREER_SUGGESTIONS}
                                                placeholder="Search by career, programme, or interest"
                                                onSuggestionSelect={(suggestion) => setSearchQuery(suggestion)}
                                                onViewAll={(q) => setSearchQuery(q)}
                                                variant="minimal"
                                            />
                                        </div>

                                        {/* Filter Toggle Button */}
                                        <button
                                            onClick={() => {
                                                if (window.innerWidth < 768) {
                                                    setIsMobileFiltersOpen(true);
                                                } else {
                                                    setIsAdvancedFiltersExpanded(!isAdvancedFiltersExpanded);
                                                }
                                            }}
                                            className={`flex-shrink-0 flex items-center justify-center rounded-full h-[50px] w-[50px] transition-all duration-300 mr-2 group ${
                                                isAdvancedFiltersExpanded 
                                                    ? 'bg-brand-primary text-white rotate-180' 
                                                    : 'bg-brand-gold text-white hover:bg-brand-primary'
                                            }`}
                                        >
                                            <SlidersHorizontal className="transition-transform" size={20} />
                                        </button>
                                    </div>

                                    {/* Active Filters Summary (Desktop) - Moved to Results Section */}
                                </div>
                            </div>

                            {/* ADVANCED FILTERS PANEL (Sliding from behind) */}
                            <div className="hidden md:block absolute left-10 right-10 top-full z-10 w-full md:w-auto">
                                <div
                                    className={`
                                        transition-all duration-500 origin-top
                                        bg-[#f8fafc] rounded-b-2xl shadow-xl border-x border-b border-brand-gold/10 -mt-[10px] pt-[10px]
                                        ${isAdvancedFiltersExpanded || activeFilterCount > 0 || searchQuery
                                            ? 'max-h-[800px] opacity-100 translate-y-0 ease-[cubic-bezier(0.25,1,0.5,1)]' 
                                            : 'max-h-0 opacity-0 -translate-y-12 ease-[cubic-bezier(0.5,0,0.75,0)]'
                                        }
                                        ${isAdvancedFiltersExpanded ? 'overflow-visible' : 'overflow-hidden'}
                                    `}
                                >
                                    
                                    {/* Active Filters Row */}
                                    {(activeFilterCount > 0 || searchQuery) && (
                                        <div className="px-8 py-6 border-b border-gray-200/60 bg-gray-50/50 flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-bold text-gray mr-2 uppercase tracking-[0.1em] font-sans">Active:</span>
                                            {searchQuery && (
                                                <FilterChip label={`Search: ${searchQuery}`} onRemove={() => setSearchQuery('')} />
                                            )}
                                            {selectedFocusAreas.map(area => (
                                                <FilterChip key={area} label={area} onRemove={() => setSelectedFocusAreas(selectedFocusAreas.filter(a => a !== area))} />
                                            ))}
                                            {selectedStudyLevels.map(level => (
                                                <FilterChip key={level} label={level} onRemove={() => setSelectedStudyLevels(selectedStudyLevels.filter(l => l !== level))} />
                                            ))}
                                            {selectedProgrammeTypes.map(type => (
                                                <FilterChip key={type} label={type} onRemove={() => setSelectedProgrammeTypes(selectedProgrammeTypes.filter(t => t !== type))} />
                                            ))}
                                            {selectedStartDates.map(date => (
                                                <FilterChip key={date} label={date} onRemove={() => setSelectedStartDates(selectedStartDates.filter(d => d !== date))} />
                                            ))}
                                            <button
                                                onClick={resetFilters}
                                                className="text-[10px] font-bold text-red-500 hover:text-red-600 ml-4 flex items-center gap-1 uppercase tracking-[0.1em] transition-colors font-sans"
                                            >
                                                <X size={12} />
                                                Clear all
                                            </button>
                                        </div>
                                    )}

                                    {/* Advanced Selects Grid */}
                                    <div className={`transition-all duration-100 ease-in-out ${isAdvancedFiltersExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-8 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Added pt-10 to give extra space from the "tucked under" visual */}
                                            <MultiSelect
                                                options={STUDY_LEVELS.map(level => ({ label: level, value: level }))}
                                                selected={selectedStudyLevels}
                                                onChange={setSelectedStudyLevels}
                                                label="Study Level"
                                                placeholder="Study Level"
                                            />
                                            <MultiSelect
                                                options={PROGRAMME_TYPES.map(type => ({ label: type, value: type }))}
                                                selected={selectedProgrammeTypes}
                                                onChange={setSelectedProgrammeTypes}
                                                label="Programme Type"
                                                placeholder="Programme Type"
                                            />
                                            <MultiSelect
                                                options={uniqueStartDates.map(date => ({ label: date, value: date }))}
                                                selected={selectedStartDates}
                                                onChange={setSelectedStartDates}
                                                label="Start Date"
                                                placeholder="Start Date"
                                                header="2026"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            {/* --- RESULTS SECTION (Dark) --- */}
            <div 
                ref={cardsContainerRef} 
                className={`bg-[#072136] transition-[padding] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pb-20 ${
                    isAdvancedFiltersExpanded && (activeFilterCount > 0 || searchQuery)
                        ? 'pt-[270px]' 
                        : isAdvancedFiltersExpanded 
                            ? 'pt-[200px]'
                            : (activeFilterCount > 0 || searchQuery)
                                ? 'pt-[160px]'
                                : 'pt-24'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Results + Sort Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <p className="text-base font-semibold text-white gap-2 flex">
                                <span className="text-brand-gold font-bold">{displayedOfferings.length}</span> Programmes Found
                            </p>
                            <div className="h-4 w-px bg-white/20 hidden md:block" />
                            {/* Layout Toggle */}
                            <div className="flex bg-white/10 p-1 rounded">
                                <button
                                    onClick={() => setViewMode('slider')}
                                    className={`p-1.5 rounded transition-all ${viewMode === 'slider' ? 'bg-brand-gold text-brand-primary shadow-lg' : 'text-white/60 hover:text-white'}`}
                                    title="Slider View"
                                >
                                    <StretchHorizontal size={18} />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-brand-gold text-brand-primary shadow-lg' : 'text-white/60 hover:text-white'}`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-white/60 text-xs font-bold uppercase tracking-[1px] font-sans">Sort by</span>
                            <div className="relative">
                              <div className="flex items-center rounded border border-white/10 bg-white/5 px-3 shadow-sm">
                                <ArrowUpDown
                                  className="mr-2 text-brand-gold pointer-events-none"
                                  size={14}
                                />
                                <select
                                  value={sortBy}
                                  onChange={(e) => setSortBy(e.target.value)}
                                  className="bg-transparent text-white text-xs font-semibold py-2.5 pr-6 outline-none appearance-none cursor-pointer font-sans uppercase tracking-wider"
                                >
                                  <option value="tuition-low" className="bg-[#072136]">Price (Low → High)</option>
                                  <option value="duration" className="bg-[#072136]">Duration</option>
                                  <option value="relevance" className="bg-[#072136]">Relevance</option>
                                  {/* <option value="start-date" className="bg-[#072136]">Start Date</option> */}
                                </select>
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {displayedOfferings.length > 0 ? (
                            <>
                                {viewMode === 'slider' ? (
                                    <>
                                        

                                        {/* Programmes Slider */}
                                        <div ref={sliderRef} className="overflow-x-auto programmes-slider snap-x snap-mandatory no-scrollbar">
                                            <div className="flex gap-6 pb-4" style={{ width: `calc(${displayedOfferings.length} * (340px + 1.5rem))` }}>
                                                {displayedOfferings.map((offering) => (
                                                    <div key={offering.id} className="flex-shrink-0 snap-center" style={{ width: '340px' }}>
                                                        <CourseCard offering={offering} onExpand={handleCardExpand} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* Grid View */
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                                        {displayedOfferings.map((offering) => (
                                            <div key={offering.id} className="w-full">
                                                <CourseCard offering={offering} onExpand={handleCardExpand} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-32 bg-white/5 rounded border border-white/20">
                                <div className="w-20 h-20 bg-white/10 rounded flex items-center justify-center mx-auto mb-6 text-white/40">
                                    <Eye size={40} />
                                </div>
                                <h3 className="text-3xl text-white font-serif mb-4">No Programmes Found</h3>
                                <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed text-base">
                                    We couldn't find any courses matching your current filters. Try adjusting your selections or reset to view all programmes.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="inline-block text-white font-bold uppercase tracking-[0.2em] border-b-2 border-brand-gold pb-2 hover:text-brand-gold transition-colors font-sans text-xs"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

