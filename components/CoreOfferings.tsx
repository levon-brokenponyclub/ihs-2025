
import React, { useState, useEffect } from 'react';
import { OFFERINGS, STUDY_LEVELS, FOCUS_AREAS, ACCREDITATIONS } from '../constants';
import { Button } from './ui/Button';
import { CheckboxGroup } from './ui/CheckboxGroup';
import { Clock, GraduationCap, ArrowRight, Eye, Calendar, Tag, BarChart2, ShoppingBag, MapPin, X, SlidersHorizontal, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickViewModal } from './QuickViewModal';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';

const TABS = [
    { id: 'All', label: 'All Programmes' },
    { id: 'Full Time Learning', label: 'Full Time Learning' },
    { id: 'Blended Learning', label: 'Blended Learning' },
    { id: 'In-Service Traineeship', label: 'In-Service Traineeship' },
    { id: 'Part Time Learning', label: 'Part Time Learning' },
    { id: 'Online Learning', label: 'Online Learning' }
];

export const CoreOfferings: React.FC = () => {
    // --- State ---
    const [activeTab, setActiveTab] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>([]);
    const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
    const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);

    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>([]);
    
    // UI States
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Offering | null>(null);
    
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();

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
                     // Mapping logic for demo data
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


    // --- Handlers ---
    const handleQuickView = (offering: Offering, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedOffering(offering);
        setIsModalOpen(true);
    };

    const handleAction = (offering: Offering, e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentCourse(offering);
        const isEcommerce = offering.programmeTypes.some((type: string) => 
            ['Online Learning', 'Part Time Learning'].includes(type)
        );

        if (isEcommerce) {
            addToCart(offering);
            setShowCheckout(true);
        } else {
            setShowApplication(true);
        }
    };

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

    const activeFilterCount = selectedStudyLevels.length + selectedFocusAreas.length + selectedAccreditations.length;

    return (
        <section className="py-24 bg-brand-dark relative min-h-screen" id="offerings">
            
            {/* Left Filter Drawer */}
            <div className={`fixed top-0 left-0 bottom-0 w-[320px] z-[60] bg-[#0d1424] border-r border-brand-gold/30 shadow-[10px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

                        {/* Filter Groups - Accordion Style */}
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

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Heading Area */}
                <div className="mb-12 text-center">
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                        Our <span className="text-brand-gold">Programmes</span>
                    </h2>
                    
                    <p className="text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
                        World-class hospitality and culinary programmes designed to launch your career. All programmes include practical work experience and employment support.
                    </p>
                </div>

                {/* Controls Container */}
                <div className="mb-12">
                    
                    {/* Programme Type Tabs & Filter Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="overflow-x-auto no-scrollbar">
                            <div className="bg-[#131B2C] border border-white/10 rounded-lg p-1.5 flex gap-1 md:gap-2 items-center min-w-max shadow-lg">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 md:px-6 py-2.5 rounded-md text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                                            activeTab === tab.id 
                                            ? 'bg-brand-gold text-brand-dark shadow-md' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Toggle Button - Icon Only */}
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center justify-center bg-[#131B2C] border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-dark rounded-full h-[50px] w-[50px] transition-all duration-300 shadow-lg ${isFilterOpen ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'text-brand-gold'}`}
                            aria-label="Toggle Filters"
                        >
                            {isFilterOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
                        </button>
                    </div>

                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
                    {displayedOfferings.map((offering) => {
                        const isEcommerce = offering.programmeTypes.some((type: string) => 
                            ['Online Learning', 'Part Time Learning'].includes(type)
                        );
                        const typeOfStudy = offering.programmeTypes.some(t => t.includes('Online')) ? 'Online' : 'Full-Time';
                        const inCompare = isInCompare(offering.id);
                        // Display the first programme type or the active one
                        const displayLabel = offering.programmeTypes[0];

                        return (
                        <div key={offering.id} className="bg-brand-card group rounded-lg overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative">
                            {/* Image Area */}
                            <div className="relative h-60 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-brand-gold text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full tracking-wide shadow-md">
                                        {displayLabel}
                                    </span>
                                </div>
                                <img 
                                    src={offering.image} 
                                    alt={offering.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-60"></div>
                                
                                {/* Hover Actions Panel - Slides up from bottom of image */}
                                <div className="absolute bottom-0 left-0 right-0 bg-[#131B2C]/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                                    <button 
                                        onClick={(e) => handleAction(offering, e)}
                                        className="flex-[2] bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-dark text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-2"
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
                                        className={`flex-1 bg-transparent border border-white/20 hover:bg-white/5 text-white text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 ${inCompare ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' : ''}`}
                                    >
                                        {inCompare ? <X size={16} /> : <BarChart2 size={16} />}
                                        {inCompare ? 'Remove' : 'Compare'}
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-1 flex flex-col relative z-10 bg-brand-card">
                                <Link to={`/course/${offering.id}`} className="block">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-3 leading-tight group-hover:text-brand-gold transition-colors">{offering.title}</h3>
                                </Link>
                                
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-brand-gold" />
                                        <span>{offering.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap size={16} className="text-brand-gold" />
                                        <span>{offering.qualification}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-brand-gold" />
                                        <span>{typeOfStudy}</span>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                                    {offering.description}
                                </p>
                                
                                <div className="mb-6 pt-4 border-t border-white/5">
                                    <p className="text-3xl font-serif text-brand-gold font-bold">
                                        R {offering.price?.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Starting: {offering.startDate}</p>
                                </div>

                                <div className="mt-auto flex gap-3">
                                    <Link 
                                        to={`/course/${offering.id}`}
                                        className="flex-1 bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-dark font-bold transition-all duration-300 text-xs uppercase tracking-wider px-4 py-3 rounded-sm flex items-center justify-center gap-2"
                                    >
                                        View More
                                    </Link>
                                    <button 
                                        onClick={(e) => handleQuickView(offering, e)}
                                        className="h-full aspect-square flex items-center justify-center bg-transparent border border-white/20 hover:border-brand-gold hover:text-brand-gold text-white rounded-sm transition-all" 
                                        aria-label="Quick View"
                                    >
                                        <Eye size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )})}
                    
                    {displayedOfferings.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-[#131B2C] rounded-sm border border-white/5">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                                <Eye size={40} />
                            </div>
                            <h3 className="text-2xl text-white font-serif mb-3">No Programmes Found</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                                We couldn't find any courses matching your current selection. Try switching categories or adjusting filters.
                            </p>
                            <button 
                                onClick={() => {
                                    setActiveTab('All');
                                    resetFilters();
                                }}
                                className="text-brand-gold hover:text-white transition-colors border-b border-brand-gold pb-1 font-bold uppercase tracking-widest text-sm"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {selectedOffering && (
                <QuickViewModal 
                    offering={selectedOffering} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}

            <ApplicationModal 
                isOpen={showApplication} 
                onClose={() => setShowApplication(false)} 
                courseTitle={currentCourse?.title}
            />
            
            <CheckoutModal 
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
            />
        </section>
    );
};
