import React, { useState, useEffect, useRef } from 'react';
import { OFFERINGS } from '../constants.tsx';
import { Button } from './ui/Button';
import { CheckboxGroup } from './ui/CheckboxGroup';
import {
    Clock,
    GraduationCap,
    ArrowRight,
    Eye,
    BarChart2,
    ShoppingBag,
    X,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { useTransition } from '../context/TransitionContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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

// --- Sub-component for individual course cards ---
const CourseCardItem: React.FC<{ offering: Offering; onExpand: (o: Offering, img: DOMRect, txt: DOMRect, cat: DOMRect) => void }> = ({ offering, onExpand }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const categoryRef = useRef<HTMLSpanElement>(null);
    
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();

    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOrigin, setModalOrigin] = useState<{ x: number; y: number } | null>(null);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const isEcommerce = offering.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const inCompare = isInCompare(offering.id);

    const handleMouseEnter = () => {
        if (videoRef.current) videoRef.current.play().catch(() => {});
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).closest('.group')?.getBoundingClientRect();
        if (rect) setModalOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setSelectedOffering(offering);
        setIsModalOpen(true);
    };

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEcommerce) {
            addToCart(offering);
            setShowCheckout(true);
        } else {
            setShowApplication(true);
        }
    };

    // Refactored to allow "Course Details" button to trigger transition via bubbling
    const handleCardClick = (e: React.MouseEvent) => {
        // We do NOT check for closest('button') here anymore.
        // The other buttons (QuickView, Action, Compare) all have e.stopPropagation(),
        // so they will never trigger this handler.
        // This allows the "Course Details" button to bubble up and trigger this handler naturally.
        
        e.preventDefault();
        if (mediaRef.current && titleRef.current && categoryRef.current) {
            const imgRect = mediaRef.current.getBoundingClientRect();
            const txtRect = titleRef.current.getBoundingClientRect();
            const catRect = categoryRef.current.getBoundingClientRect();
            onExpand(offering, imgRect, txtRect, catRect);
        }
    };

    return (
        <>
            <div className="flex flex-col h-full course-card cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCardClick}>
                <div className="bg-white w-full group rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
                    <div ref={mediaRef} className="relative h-60 overflow-hidden shrink-0 bg-gray-100">
                        <video ref={videoRef} src={offering.video} muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 z-10">
                            <span ref={categoryRef} className="bg-[#f8fafc] border border-[#eff4f7] text-[#002a4e] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md hover:bg-[#c2b068] hover:border-[#d4c999] hover:text-[#fff] transition-colors inline-block">
                                {offering.category}
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#002B4E]/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
                            <button onClick={handleAction} className="flex-[2] bg-white text-[#002B4E] hover:bg-[#C2B067] hover:text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm flex items-center justify-center gap-2 border border-transparent">
                                {isEcommerce ? (<><ShoppingBag size={14} /> Buy Now</>) : (<>Apply Now <ArrowRight size={14} /></>)}
                            </button>
                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); inCompare ? removeFromCompare(offering.id) : addToCompare(offering); }} className={`flex-1 bg-transparent border border-white/30 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm flex items-center justify-center gap-2 ${inCompare ? 'bg-white text-[#002B4E]' : ''}`}>
                                {inCompare ? <X size={16} /> : <BarChart2 size={16} />} {inCompare ? 'Remove' : 'Compare'}
                            </button>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium mb-4">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-[#002B4E]" />
                                <span>{offering.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <GraduationCap size={16} className="text-[#002B4E]" />
                                <span>{offering.qualification}</span>
                            </div>
                        </div>
                        <h3 ref={titleRef} className="text-lg lg:text-xl font-serif font-bold text-[#002B4E] mb-4 leading-tight group-hover:text-[#1289fe] transition-colors origin-top-left">
                            {offering.title}
                        </h3>
                        <div className="mt-auto"></div>
                        <div className="mb-4 flex justify-between items-end border-t border-gray-100 pt-3">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Tuition</p>
                                <p className="text-lg font-bold text-[#002B4E]">R {offering.price?.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Next Intake</p>
                                <p className="text-xs font-bold text-[#002B4E]">{offering.startDate}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 relative z-20 bg-white">
                            {/* Removed onClick here to let it bubble to the container handler, preventing double-fire */}
                            <button className="flex-1 bg-[#002845] border border-[#002845] text-white hover:bg-[#002845]/90 font-bold transition-all duration-300 text-xs uppercase tracking-widest px-4 py-3 rounded-md flex items-center justify-center">
                                Course Details
                            </button>
                            <button onClick={handleQuickView} className="w-12 flex items-center justify-center bg-[#c2b068] border border-[#c2b068] text-white hover:bg-[#d4c999] rounded-none transition-all duration-300" aria-label="Quick View">
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedOffering && <QuickViewModal offering={selectedOffering} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} origin={modalOrigin} />}
            <ApplicationModal isOpen={showApplication} onClose={() => setShowApplication(false)} courseTitle={offering.title} />
            <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
        </>
    );
};

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
        // We use gsap.context scoped to cardsContainerRef to prevent memory leaks and "selector not found" errors
        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll('.course-card');
            
            // Only animate if cards actually exist in DOM
            if (cards.length > 0) {
                gsap.fromTo(cards, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
                );
            }
        }, cardsContainerRef); // Scope

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
        <section className="bg-white relative min-h-screen" id="offerings">

            {/* Filter Pills */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2">
                {[...selectedStudyLevels, ...selectedFocusAreas, ...selectedAccreditations].map(filter => (
                    <span 
                        key={filter} 
                        className="inline-flex items-center gap-1 bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-brand-primary hover:text-white transition-colors" 
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
                            <button onClick={resetFilters} className="text-red-500 hover:text-red-700 underline decoration-red-200 hover:decoration-red-700 underline-offset-2">
                                Reset Filters
                            </button>
                        )}
                    </div>
                    <Button variant="primary" className="w-full justify-center py-4" onClick={() => setIsFilterOpen(false)}>
                        View Results
                    </Button>
                </div>
            </div>

            {/* --- TOP SECTION --- */}
            <div className="relative bg-white pt-20 pb-20">
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

                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-6">
                            {/* Filter Toggle Button */}
                            <button 
                                onClick={() => setIsFilterOpen(true)} 
                                className="flex items-center justify-center bg-white hover:bg-gray-50 text-brand-primary hover:text-brand-accent rounded-full h-[50px] w-[50px] shadow-lg transition-all duration-300 relative z-10 group" 
                                aria-label="Toggle Filters"
                            >
                                <SlidersHorizontal size={20} className="group-hover:scale-110 transition-transform" />
                                {activeFilterCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            <div className="flex-1 flex justify-center">
                                <div ref={tabsRef} className="bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-1.5 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar">
                                    {TABS.map(tab => (
                                        <button key={tab.id} data-tab={tab.id} onClick={() => { setActiveTab(tab.id); setTimeout(() => { const btn = tabsRef.current?.querySelector(`[data-tab="${tab.id}"]`); if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }, 0); }} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1289fe] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-[#1289fe]'}`}>
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

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

            {/* --- RESULTS SLIDER --- */}
            <div ref={cardsContainerRef} className="bg-[#072136] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex md:hidden justify-between items-center mb-6">
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-white/10 text-white rounded-full p-3">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>

                    <div className="relative">
                        {displayedOfferings.length > 0 && (
                            <div ref={sliderRef} className="overflow-x-auto programmes-slider snap-x snap-mandatory">
                                <div className="flex gap-6 pb-4" style={{ width: `calc(${displayedOfferings.length} * (340px + 1.5rem))` }}>
                                    {displayedOfferings.map((offering) => (
                                        <div key={offering.id} className="flex-shrink-0 snap-center" style={{ width: '340px' }}>
                                            <CourseCardItem offering={offering} onExpand={handleCardExpand} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {displayedOfferings.length === 0 && (
                            <div className="text-center py-20 bg-white/10 rounded-sm border border-white/20">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 shadow-sm">
                                    <Eye size={40} />
                                </div>
                                <h3 className="text-2xl text-white font-serif mb-3">No Programmes Found</h3>
                                <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
                                    We couldn't find any courses matching your current selection. Try switching categories or adjusting filters.
                                </p>
                                <button onClick={() => { setActiveTab('All'); resetFilters(); }} className="text-white hover:text-brand-accent transition-colors border-b border-white pb-1 font-bold uppercase tracking-widest text-sm">
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
