import React, { useState, useEffect, useRef } from 'react';
import { OFFERINGS } from '../constants';
import { Button } from './ui/Button';
import { CheckboxGroup } from './ui/CheckboxGroup';
import {
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    X,
    Eye
} from 'lucide-react';
import { Offering } from '../types';
import { useTransition } from '../context/TransitionContext';
import gsap from 'gsap';
import { CourseCard } from './CourseCard';

// --- Tabs / Filter Options ---
const TABS = [
    { id: 'All', label: 'All Programmes' },
    { id: 'Full Time Learning', label: 'Full Time' },
    { id: 'Blended Learning', label: 'Blended' },
    { id: 'In-Service Traineeship', label: 'Traineeship' },
    { id: 'Part Time Learning', label: 'Part Time' },
    { id: 'Online Learning', label: 'Online' }
];

const STUDY_LEVELS = [
    'AHLEI Professional Certification',
    'Credit Bearing Short Courses',
    'Degrees',
    'Diplomas',
    'Higher Certificates',
    'Specialisations',
    'Non-credit Bearing Short Courses'
];

const FOCUS_AREAS = [
    'Business',
    'Conference & Events',
    'Food & Beverage',
    'Hospitality Management',
    'Human Resources',
    'Culinary'
];

const ACCREDITATIONS = [
    'AHLEI',
    'CATHSSETA',
    'City & Guilds',
    'QCTO',
    'École Ducasse',
    'CHE',
    'International Hotel School'
];

// Helper to convert strings to options for CheckboxGroup
const toOptions = (items: string[]) => items.map(item => ({ label: item, value: item }));

// --- Main CoreOfferings Component ---
export const CoreOfferings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Animation Refs
    const drawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    // Use Global Transition
    const { startTransition } = useTransition();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>([]);
    const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
    const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>([]);

    // --- GSAP Drawer Animation ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isFilterOpen) {
                // Open sequence
                gsap.to(backdropRef.current, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.fromTo(drawerRef.current,
                    { x: '-100%' },
                    { x: '0%', duration: 0.5, ease: "expo.out", delay: 0.1 }
                );
            } else {
                // Close sequence
                gsap.to(drawerRef.current, {
                    x: '-100%',
                    duration: 0.4,
                    ease: "power2.in"
                });
                gsap.to(backdropRef.current, {
                    autoAlpha: 0,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power2.in"
                });
            }
        });
        return () => ctx.revert();
    }, [isFilterOpen]);

    // --- Filtering Logic (Data only) ---
    useEffect(() => {
        let filtered = OFFERINGS;

        if (activeTab !== 'All') filtered = filtered.filter((o: Offering) => o.programmeTypes.includes(activeTab));
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter((o: Offering) => o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));
        }
        if (selectedStudyLevels.length) {
            filtered = filtered.filter((o: Offering) => selectedStudyLevels.some(level => o.programmeTypes.includes(level) || o.qualification === level));
        }
        if (selectedFocusAreas.length) {
            filtered = filtered.filter((o: Offering) => selectedFocusAreas.every(area => {
                if (area === 'Hospitality') return o.category === 'Hospitality';
                if (area === 'Culinary') return o.category === 'Culinary';
                if (area === 'Food & Beverage') return o.title.includes('Food') || o.title.includes('Beverage');
                if (area === 'Business') return o.title.includes('Business') || o.programmeTypes.includes('Degrees');
                if (area === 'Human Resources') return o.description.includes('Human Resources');
                if (area === 'Conference & Events') return o.description.includes('Events');
                return false;
            }));
        }
        if (selectedAccreditations.length) {
            filtered = filtered.filter((o: Offering) => selectedAccreditations.every(acc => o.accreditations?.includes(acc)));
        }

        setDisplayedOfferings(filtered);
    }, [activeTab, searchQuery, selectedStudyLevels, selectedFocusAreas, selectedAccreditations]);

    // --- Animation Logic (Runs when displayedOfferings updates) ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll('.course-card');
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
                );
            }
        }, cardsContainerRef);

        return () => ctx.revert();
    }, [displayedOfferings]);

    const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStudyLevels([]);
        setSelectedFocusAreas([]);
        setSelectedAccreditations([]);
    };

    const scrollSlider = (dir: 'left' | 'right') => {
        if (sliderRef.current) sliderRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    };

    const handleCardExpand = (offering: Offering, imgRect: DOMRect, txtRect: DOMRect, catRect: DOMRect) => {
        // Trigger Global Shared Element Transition with specific refs
        startTransition(offering, imgRect, txtRect, catRect);
    };

    const activeFilterCount = selectedStudyLevels.length + selectedFocusAreas.length + selectedAccreditations.length;

    return (
        <section className="bg-gray-50 relative min-h-screen" id="offerings">

            {/* Filter Pills Display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2">
                {[...selectedStudyLevels, ...selectedFocusAreas, ...selectedAccreditations].map(filter => (
                    <span
                        key={filter}
                        className="inline-flex items-center gap-1 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase cursor-pointer hover:bg-brand-primary hover:text-white transition-colors tracking-[1px]"
                        onClick={() => {
                            toggleFilter(selectedStudyLevels.includes(filter) ? setSelectedStudyLevels : selectedFocusAreas.includes(filter) ? setSelectedFocusAreas : setSelectedAccreditations, filter);
                        }}
                    >
                        {filter} <X size={10} strokeWidth={3} />
                    </span>
                ))}
            </div>

            {/* GSAP Animated Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm opacity-0 invisible"
                onClick={() => setIsFilterOpen(false)}
            />

            {/* GSAP Animated Light Theme Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 bottom-0 w-[340px] z-[60] bg-white shadow-2xl transform -translate-x-full will-change-transform flex flex-col border-r border-gray-200"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-primary">
                            <Filter size={18} />
                        </div>
                        <h3 className="text-brand-primary font-serif font-bold text-xl">Filters</h3>
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
                    {/* Search Input */}
                    <div className="p-6 pb-2">
                        <label className="text-xs uppercase font-bold text-gray-400 mb-2 block tracking-wider">Search</label>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-sm py-3 pl-10 pr-4 text-sm text-brand-primary focus:border-brand-accent focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="divide-y divide-gray-50 mt-4">
                        <CheckboxGroup
                            title="Study Level"
                            options={toOptions(STUDY_LEVELS)}
                            selectedValues={selectedStudyLevels}
                            onChange={(val) => toggleFilter(setSelectedStudyLevels, val)}
                            variant="accordion"
                            theme="light"
                            defaultOpen={true}
                        />
                        <CheckboxGroup
                            title="Focus Areas"
                            options={toOptions(FOCUS_AREAS)}
                            selectedValues={selectedFocusAreas}
                            onChange={(val) => toggleFilter(setSelectedFocusAreas, val)}
                            variant="accordion"
                            theme="light"
                            defaultOpen={false}
                        />
                        <CheckboxGroup
                            title="Accreditation"
                            options={toOptions(ACCREDITATIONS)}
                            selectedValues={selectedAccreditations}
                            onChange={(val) => toggleFilter(setSelectedAccreditations, val)}
                            variant="accordion"
                            theme="light"
                            defaultOpen={false}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium uppercase tracking-wide">
                        <span>{displayedOfferings.length} Programmes Found</span>
                        {activeFilterCount > 0 && (
                            <button onClick={resetFilters} className="text-red-500 hover:text-red-700 underline decoration-red-200 hover:decoration-red-700 underline-offset-2 tracking-[1px]">
                                Reset Filters
                            </button>
                        )}
                    </div>
                    <Button variant="primary" className="w-full justify-center py-4 tracking-[1px]" onClick={() => setIsFilterOpen(false)}>
                        View Results
                    </Button>
                </div>
            </div>

            {/* --- TOP SECTION (Static White) --- */}
            <div className="relative bg-gray-50 pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-brand-primary mb-6">
                            Our <span className="text-brand-accent">Programmes</span>
                        </h2>
                        <p className="text-brand-textSecondary max-w-3xl mx-auto mb-8 leading-relaxed">
                            World-class hospitality and culinary programmes designed to launch your career. All programmes include practical work experience and employment support.
                        </p>
                    </div>
                </div>

                {/* --- FLOATING FILTER & TABS BAR --- */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 md:gap-6">
                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex-shrink-0 flex items-center justify-center bg-white hover:bg-gray-50 text-brand-primary hover:text-brand-accent rounded-full h-[50px] w-[50px] shadow-lg transition-all duration-300 relative z-10 group"
                                aria-label="Toggle Filters"
                            >
                                <SlidersHorizontal size={20} className="group-hover:scale-110 transition-transform" />
                                {activeFilterCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            {/* Tabs Container (Scrollable) */}
                            <div className="flex-1 flex justify-center min-w-0">
                                <div ref={tabsRef} className="bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-1.5 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar mask-gradient-right">
                                    {TABS.map(tab => (
                                        <button key={tab.id} data-tab={tab.id} onClick={() => { setActiveTab(tab.id); setTimeout(() => { const btn = tabsRef.current?.querySelector(`[data-tab="${tab.id}"]`); if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 0); }} className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all duration-300 whitespace-nowrap tracking-[1px] ${activeTab === tab.id ? 'bg-[#1289fe] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-[#1289fe]'}`}>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Nav Arrows (Restored to Floating Bar) */}
                            <div className="hidden md:flex gap-2">
                                <button onClick={() => scrollSlider('left')} className="w-[50px] h-[50px] bg-white rounded-full text-[#002B4E] flex items-center justify-center shadow-lg hover:bg-[#1289fe] hover:text-white transition-all duration-300" aria-label="Previous programmes">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={() => scrollSlider('right')} className="w-[50px] h-[50px] bg-white rounded-full text-[#002B4E] flex items-center justify-center shadow-lg hover:bg-[#1289fe] hover:text-white transition-all duration-300" aria-label="Next programmes">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RESULTS SLIDER (Dark) --- */}
            <div ref={cardsContainerRef} className="bg-[#072136] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    

                    <div className="relative">
                        {displayedOfferings.length > 0 ? (
                            <div ref={sliderRef} className="overflow-x-auto programmes-slider snap-x snap-mandatory no-scrollbar">
                                <div className="flex gap-6 pb-4" style={{ width: `calc(${displayedOfferings.length} * (340px + 1.5rem))` }}>
                                    {displayedOfferings.map((offering) => (
                                        <div key={offering.id} className="flex-shrink-0 snap-center" style={{ width: '340px' }}>
                                            <CourseCard offering={offering} onExpand={handleCardExpand} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/10 rounded-sm border border-white/20">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 shadow-sm">
                                    <Eye size={40} />
                                </div>
                                <h3 className="text-2xl text-white font-serif mb-3">No Programmes Found</h3>
                                <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
                                    We couldn't find any courses matching your current selection. Try switching categories or adjusting filters.
                                </p>
                                <button onClick={() => { setActiveTab('All'); resetFilters(); }} className="text-white hover:text-brand-accent transition-colors border-b border-white pb-1 font-bold uppercase text-sm tracking-[1px]">
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