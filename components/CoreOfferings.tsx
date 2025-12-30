
import React, { useState, useEffect, useRef } from 'react';
import { OFFERINGS, STUDY_LEVELS, FOCUS_AREAS, ACCREDITATIONS } from '../constants';
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
    Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QuickViewModal } from './QuickViewModal';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';

const TABS = [
    { id: 'All', label: 'All Programmes' },
    { id: 'Full Time Learning', label: 'Full Time' },
    { id: 'Blended Learning', label: 'Blended' },
    { id: 'In-Service Traineeship', label: 'Traineeship' },
    { id: 'Part Time Learning', label: 'Part Time' },
    { id: 'Online Learning', label: 'Online' }
];

// --- Sub-Component for Individual Course Card to handle Video Refs ---
const CourseCardItem: React.FC<{ 
    offering: Offering; 
    onExpand: (offering: Offering, rect: DOMRect) => void; 
}> = ({ offering, onExpand }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    
    // Local state for modals specific to this card's actions
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOrigin, setModalOrigin] = useState<{x: number, y: number} | null>(null);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const isEcommerce = offering.programmeTypes.some((type: string) => 
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const inCompare = isInCompare(offering.id);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset video
        }
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).closest('.group')?.getBoundingClientRect();
        if (rect) {
            setModalOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }
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

    const handleCardClick = (e: React.MouseEvent) => {
        // If clicking buttons, don't expand
        if ((e.target as HTMLElement).closest('button')) return;
        
        e.preventDefault();
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            onExpand(offering, rect);
        }
    };

    return (
        <>
            <div 
                className="flex flex-col h-full cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                ref={cardRef}
            >
                <div className="bg-white w-full group rounded-sm overflow-hidden border border-transparent hover:border-white/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 relative">
                    {/* Media Area (Video/Image) */}
                    <div className="relative h-60 overflow-hidden shrink-0 bg-gray-100">
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md">
                                {offering.category}
                            </span>
                        </div>
                        
                        {/* Video Element (Plays on Hover) */}
                        <video
                            ref={videoRef}
                            src={offering.video}
                            poster={offering.image}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Hover Actions Panel */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#002B4E]/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
                            <button 
                                onClick={handleAction}
                                className="flex-[2] bg-white text-[#002B4E] hover:bg-[#C2B067] hover:text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 border border-transparent"
                            >
                                {isEcommerce ? (
                                    <><ShoppingBag size={14} /> Buy Now</>
                                ) : (
                                    <>Apply Now <ArrowRight size={14} /></>
                                )}
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (inCompare) removeFromCompare(offering.id);
                                    else addToCompare(offering);
                                }}
                                className={`flex-1 bg-transparent border border-white/30 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 ${inCompare ? 'bg-white text-[#002B4E]' : ''}`}
                            >
                                {inCompare ? <X size={16} /> : <BarChart2 size={16} />}
                                {inCompare ? 'Remove' : 'Compare'}
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
                        <div className="block">
                            <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#002B4E] mb-4 leading-tight group-hover:text-[#1289fe] transition-colors">
                                {offering.title}
                            </h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium mb-6">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-[#002B4E]" />
                                <span>{offering.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <GraduationCap size={16} className="text-[#002B4E]" />
                                <span>{offering.qualification}</span>
                            </div>
                        </div>

                        {/* Excerpt with Hover Reveal */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                            <div className="overflow-hidden">
                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {offering.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Spacer to push content to bottom */}
                        <div className="mt-auto"></div>

                        {/* Price Block: Collapsed above details, expands on hover */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out mb-0 group-hover:mb-4">
                            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Tuition</p>
                                        <p className="text-lg font-bold text-[#002B4E]">
                                            R {offering.price?.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Next Intake</p>
                                        <p className="text-xs font-bold text-[#002B4E]">{offering.startDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 relative z-20 bg-white">
                            <button 
                                className="flex-1 bg-white border border-[#002B4E] text-[#002B4E] hover:bg-[#002B4E] hover:text-white font-bold transition-all duration-300 text-xs uppercase tracking-widest px-4 py-3 rounded-sm flex items-center justify-center gap-2"
                            >
                                Details
                            </button>
                            <button 
                                onClick={handleQuickView}
                                className="w-12 flex items-center justify-center bg-[#002B4E] border border-[#002B4E] text-white hover:bg-[#002B4E]/90 hover:border-[#002B4E]/90 rounded-sm transition-all duration-300"
                                aria-label="Quick View"
                            >
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedOffering && (
                <QuickViewModal 
                    offering={selectedOffering} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    origin={modalOrigin}
                />
            )}

            <ApplicationModal 
                isOpen={showApplication} 
                onClose={() => setShowApplication(false)} 
                courseTitle={offering.title}
            />
            
            <CheckoutModal 
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
            />
        </>
    );
};

export const CoreOfferings: React.FC = () => {
    // --- State ---
    const [activeTab, setActiveTab] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const tabsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    
    // --- Transition States ---
    const [expandingOffering, setExpandingOffering] = useState<Offering | null>(null);
    const [expansionStyle, setExpansionStyle] = useState<React.CSSProperties | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>([]);
    const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
    const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);

    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>([]);

    // --- Filtering Logic ---
    useEffect(() => {
        let filtered = OFFERINGS;

        // 1. Tab Filter
        if (activeTab !== 'All') {
             filtered = filtered.filter(o => o.programmeTypes.includes(activeTab));
        }

        // 2. Search Query
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(o => 
                o.title.toLowerCase().includes(lowerQuery) || 
                o.description.toLowerCase().includes(lowerQuery)
            );
        }

        // 3. Study Level
        if (selectedStudyLevels.length > 0) {
            filtered = filtered.filter(o => 
                selectedStudyLevels.some(level => 
                    o.programmeTypes.includes(level) || o.qualification === level
                )
            );
        }

        // 4. Focus Area (AND Logic)
        if (selectedFocusAreas.length > 0) {
            filtered = filtered.filter(o => {
                 return selectedFocusAreas.every(area => {
                     if (area === 'Hospitality') return o.category === 'Hospitality';
                     if (area === 'Culinary') return o.category === 'Culinary';
                     if (area === 'Food & Beverage') return o.title.includes('Food') || o.title.includes('Beverage');
                     if (area === 'Business') return o.title.includes('Business') || o.programmeTypes.includes('Degrees');
                     if (area === 'Human Resources') return o.description.includes('Human Resources');
                     if (area === 'Conference & Events') return o.description.includes('Events');
                     return false; 
                 });
            });
        }

        // 5. Accreditation (AND Logic)
        if (selectedAccreditations.length > 0) {
            filtered = filtered.filter(o => 
                selectedAccreditations.every(acc => o.accreditations.includes(acc))
            );
        }

        setDisplayedOfferings(filtered);

    }, [activeTab, searchQuery, selectedStudyLevels, selectedFocusAreas, selectedAccreditations]);


    const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => 
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStudyLevels([]);
        setSelectedFocusAreas([]);
        setSelectedAccreditations([]);
    };

    const scrollTabs = (direction: 'left' | 'right') => {
        if (tabsRef.current) {
            const scrollAmount = 200;
            tabsRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    // --- Transition Handler ---
    const handleCardExpand = (offering: Offering, rect: DOMRect) => {
        // 1. Set initial state (match card position)
        setExpandingOffering(offering);
        setExpansionStyle({
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            zIndex: 9999, // High z-index to overlay everything including header
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth ease-out
            borderRadius: '2px', // Match card border radius initially
        });
        setIsTransitioning(true);

        // 2. Trigger expansion (match hero position)
        // Using double requestAnimationFrame to ensure browser paints initial state first
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setExpansionStyle({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9999,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '0px',
                });
            });
        });

        // 3. Navigate after animation completes
        setTimeout(() => {
            navigate(`/course/${offering.id}`, { state: { fromTransition: true } });
        }, 800); // Wait for transition to finish
    };

    const activeFilterCount = selectedStudyLevels.length + selectedFocusAreas.length + selectedAccreditations.length;

    return (
        <section className="bg-white relative min-h-screen" id="offerings">
            
            {/* --- EXPANSION OVERLAY --- */}
            {isTransitioning && expandingOffering && expansionStyle && (
                <div 
                    style={expansionStyle}
                    className="overflow-hidden bg-brand-dark shadow-2xl"
                >
                    <div className="relative w-full h-full">
                         {/* Fade in blue overlay to match Detail Page Hero style */}
                         <div className="absolute inset-0 bg-[#0a3355]/80 z-10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"></div>
                         <video
                            src={expandingOffering.video}
                            poster={expandingOffering.image}
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Filter Drawer Overlay */}
            <div 
                className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsFilterOpen(false)}
            />

            {/* Left Filter Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-[320px] z-[60] bg-[#0d1424] border-r border-brand-gold/30 shadow-[10px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex flex-col h-full">
                     {/* Header */}
                     <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#162036] shrink-0">
                        <div className="flex items-center gap-3">
                            <SlidersHorizontal className="text-brand-gold" size={20} />
                            <h3 className="text-white font-serif font-bold text-lg">Filters</h3>
                        </div>
                        <button onClick={() => setIsFilterOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors">
                            <X size={18} />
                        </button>
                     </div>

                     {/* Content */}
                     <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                        {/* Search Bar */}
                        <div className="p-6 pb-2">
                            <label className="text-xs uppercase font-bold text-gray-500 mb-2 block">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Keywords..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Groups */}
                        <div className="divide-y divide-white/10 mt-4">
                            <CheckboxGroup 
                                title="Study Level" 
                                options={STUDY_LEVELS} 
                                selectedValues={selectedStudyLevels} 
                                onChange={(val) => toggleFilter(setSelectedStudyLevels, val)}
                                variant="accordion"
                                defaultOpen={true}
                            />
                            <CheckboxGroup 
                                title="Focus Areas" 
                                options={FOCUS_AREAS} 
                                selectedValues={selectedFocusAreas} 
                                onChange={(val) => toggleFilter(setSelectedFocusAreas, val)}
                                variant="accordion"
                                defaultOpen={false}
                            />
                            <CheckboxGroup 
                                title="Accreditation" 
                                options={ACCREDITATIONS} 
                                selectedValues={selectedAccreditations} 
                                onChange={(val) => toggleFilter(setSelectedAccreditations, val)} 
                                variant="accordion"
                                defaultOpen={false}
                            />
                        </div>
                     </div>
                     
                     {/* Footer */}
                     <div className="p-4 bg-[#162036] border-t border-white/10 shrink-0 flex flex-col gap-3">
                         <div className="flex justify-between items-center text-xs text-gray-400">
                             <span>{displayedOfferings.length} Results</span>
                             {activeFilterCount > 0 && (
                                 <button onClick={resetFilters} className="text-brand-gold hover:text-white underline">
                                     Reset All
                                 </button>
                             )}
                         </div>
                         <Button variant="primary" className="w-full justify-center" onClick={() => setIsFilterOpen(false)}>
                             View Results
                         </Button>
                     </div>
                 </div>
            </div>

            {/* --- TOP WHITE SECTION --- */}
            <div className="relative bg-white pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Heading Area */}
                    <div className="mb-10 text-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-brand-primary mb-6">
                            Our <span className="text-brand-accent">Programmes</span>
                        </h2>
                        
                        <p className="text-brand-textSecondary max-w-3xl mx-auto mb-8 leading-relaxed">
                            World-class hospitality and culinary programmes designed to launch your career. All programmes include practical work experience and employment support.
                        </p>
                    </div>
                </div>

                {/* Floating Tabs & Controls - Positioned to overlap the boundary */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            
                            {/* Filter Toggle (Left) - Relative position in flex container */}
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="hidden md:flex items-center justify-center bg-white hover:bg-gray-50 text-gray-500 hover:text-[#1289fe] rounded-full h-[50px] w-[50px] shadow-lg transition-all duration-300 relative z-10"
                                aria-label="Toggle Filters"
                            >
                                <SlidersHorizontal size={20} />
                            </button>

                            {/* Centered Floating Pill Navigation */}
                            <div 
                                ref={tabsRef}
                                className="bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-1.5 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar mx-auto"
                            >
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                                            activeTab === tab.id 
                                            ? 'bg-[#1289fe] text-white shadow-md' 
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-[#1289fe]'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Navigation Arrows (Right) */}
                            <div className="hidden md:flex gap-2">
                                <button 
                                    onClick={() => scrollTabs('left')}
                                    className="w-[50px] h-[50px] bg-white rounded-full text-[#002B4E] flex items-center justify-center shadow-lg hover:bg-[#1289fe] hover:text-white transition-all duration-300"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={() => scrollTabs('right')}
                                    className="w-[50px] h-[50px] bg-white rounded-full text-[#002B4E] flex items-center justify-center shadow-lg hover:bg-[#1289fe] hover:text-white transition-all duration-300"
                                    aria-label="Next"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM BLUE GRID SECTION --- */}
            <div className="bg-[#072136] pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Mobile Controls (Visible only on small screens) */}
                    <div className="flex md:hidden justify-between items-center mb-6">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="bg-white/10 text-white rounded-full p-3"
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>

                    {/* Results Grid (Replaces Slider) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedOfferings.map((offering) => (
                            <CourseCardItem 
                                key={offering.id} 
                                offering={offering} 
                                onExpand={handleCardExpand}
                            />
                        ))}
                        
                        {displayedOfferings.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white/10 rounded-sm border border-white/20">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 shadow-sm">
                                    <Eye size={40} />
                                </div>
                                <h3 className="text-2xl text-white font-serif mb-3">No Programmes Found</h3>
                                <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
                                    We couldn't find any courses matching your current selection. Try switching categories or adjusting filters.
                                </p>
                                <button 
                                    onClick={() => {
                                        setActiveTab('All');
                                        resetFilters();
                                    }}
                                    className="text-white hover:text-brand-accent transition-colors border-b border-white pb-1 font-bold uppercase tracking-widest text-sm"
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
