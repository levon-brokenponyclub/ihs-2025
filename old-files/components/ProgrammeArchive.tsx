
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OFFERINGS } from '../constants';
import { Button } from './ui/Button';
import { FilterSelect, FilterOption } from './ui/FilterSelect';
import { Clock, GraduationCap, ArrowRight, Eye, Calendar, Tag, ChevronDown, BarChart2, ShoppingBag, MapPin, X } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';

// --- Constants for Archive Pages ---

interface ArchiveConfig {
    title: string;
    subtitle?: string;
    description: string;
    hasFilters: boolean;
    allowedFilters?: string[];
    heroImage: string;
    baseFilter: string;
}

const ARCHIVE_CONFIGS: Record<string, ArchiveConfig> = {
    'full-time': {
        title: "Full Time Learning",
        description: "Employment focused education which ensures that 93% of our students are employed upon graduation.",
        hasFilters: true,
        allowedFilters: ['Hospitality', 'Culinary'],
        heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940',
        baseFilter: 'Full Time Learning'
    },
    'blended': {
        title: "Blended Learning",
        description: "We’re here to guide you to career success no matter what. These flexible programmes are designed for those who cannot reach in-person facilities every day, moving between studying remotely and attending more focused contact classes.",
        hasFilters: false,
        heroImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2874',
        baseFilter: 'Blended Learning'
    },
    'in-service': {
        title: "In-Service Traineeship",
        description: "Earn while you learn programme. Students are placed at leading hospitality establishments where they are employed full time, gaining practical skills while completing their studies via online.",
        hasFilters: true,
        allowedFilters: ['Hospitality', 'Culinary'],
        heroImage: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2940',
        baseFilter: 'In-Service Traineeship'
    },
    'part-time': {
        title: "Part Time Learning",
        description: "Our programmes will teach you practical skills in world-class facilities; while being guided by industry professionals to take your hobby or career to the next level.",
        hasFilters: false,
        heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2940',
        baseFilter: 'Part Time Learning'
    },
    'online': {
        title: "ONLINE COURSES YOU NEED TO SUCCEED IN THE HOSPITALITY INDUSTRY",
        subtitle: "Online courses you need to succeed",
        description: "We understand that your work and life commitments make it difficult to study. Our Online courses provide you the flexibility and convenience you need to ensure your future career success.",
        hasFilters: true,
        heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940',
        baseFilter: 'Online Learning'
    }
};

const FOCUS_AREA_OPTIONS: FilterOption[] = [
    { label: 'Hospitality', value: 'Hospitality' },
    { label: 'Culinary', value: 'Culinary' }
];

const ACCREDITATION_OPTIONS: FilterOption[] = [
    { label: 'AHLEI', value: 'AHLEI' },
    { label: 'CATHSSETA', value: 'CATHSSETA' },
    { label: 'City & Guilds', value: 'City & Guilds' },
    { label: 'QCTO', value: 'QCTO' },
    { label: 'École Ducasse', value: 'École Ducasse' }
];

export const ProgrammeArchive: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const config = type ? ARCHIVE_CONFIGS[type] : null;
    
    // States
    const [selectedCategory, setSelectedCategory] = useState<string>(''); 
    const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>([]);
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Offering | null>(null);
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();

    // Initial Data Load & Filter
    useEffect(() => {
        if (config) {
            const baseItems = OFFERINGS.filter(o => o.programmeTypes.includes(config.baseFilter));
            setDisplayedOfferings(baseItems);
            setSelectedCategory('');
            setSelectedAccreditations([]);
        }
    }, [type, config]);

    const handleSearch = React.useCallback(() => {
        if (!config) return;

        const filtered = OFFERINGS.filter(o => {
            const matchesBase = o.programmeTypes.includes(config.baseFilter);
            if (!matchesBase) return false;

            let matchesCategory = true;
            if (selectedCategory) {
                matchesCategory = o.category.toLowerCase() === selectedCategory.toLowerCase();
            }

            let matchesAccreditation = true;
            if (selectedAccreditations.length > 0) {
                matchesAccreditation = selectedAccreditations.every(acc => o.accreditations.includes(acc));
            }

            return matchesCategory && matchesAccreditation;
        });

        setDisplayedOfferings(filtered);
    }, [config, selectedCategory, selectedAccreditations]);

    useEffect(() => {
        if (type !== 'online') {
            handleSearch();
        }
    }, [handleSearch, type]);

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

    if (!config) return <div className="min-h-screen pt-32 text-center text-white">Programme type not found.</div>;

    const isOnlinePage = type === 'online';

    return (
        <div className="min-h-screen bg-brand-dark">
            {/* --- Hero Section --- */}
            <div className={`relative ${isOnlinePage ? 'py-32 md:py-40' : 'h-[50vh] min-h-[400px]'} flex flex-col justify-center`}>
                <div className="absolute inset-0 z-0">
                    <img src={config.heroImage} alt={config.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${isOnlinePage ? 'bg-gradient-to-r from-[#0B1221]/90 to-[#0B1221]/80' : 'bg-brand-dark/70'}`}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                    {isOnlinePage ? (
                        <div className="max-w-4xl mx-auto">
                            <h1 className="font-sans font-bold text-3xl md:text-5xl text-white mb-6 uppercase leading-tight tracking-tight">
                                {config.title}
                            </h1>
                            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
                                {config.description}
                            </p>
                            <p className="text-brand-gold font-bold text-lg mb-12">
                                Various Finance Options or Interest Free Payment Plans Available.
                            </p>

                            <div className="bg-[#10192c]/90 border border-brand-gold/30 p-4 md:p-6 rounded-sm shadow-2xl backdrop-blur-sm">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-3">
                                        <div className="w-full bg-white text-brand-dark px-4 py-3 rounded-sm font-bold text-sm tracking-wide border-2 border-transparent uppercase flex justify-between items-center opacity-75 cursor-not-allowed">
                                            <span>Online Learning</span>
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                    <div className="md:col-span-3">
                                        <FilterSelect 
                                            label="Any Focus Area" 
                                            options={FOCUS_AREA_OPTIONS} 
                                            value={selectedCategory} 
                                            onChange={setSelectedCategory}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <FilterSelect 
                                            label="Any Accreditation" 
                                            options={ACCREDITATION_OPTIONS} 
                                            value={selectedAccreditations} 
                                            onChange={setSelectedAccreditations} 
                                            multiple={true}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <button 
                                            onClick={handleSearch}
                                            className="w-full h-full bg-brand-gold text-brand-dark font-bold py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm"
                                        >
                                            Search Products...
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
                                {config.title}
                            </h1>
                            <p className="text-lg text-gray-200 leading-relaxed mb-8">
                                {config.description}
                            </p>
                            
                            {config.hasFilters && config.allowedFilters && (
                                <div className="flex flex-wrap justify-center gap-4 mt-8">
                                    <button 
                                        onClick={() => setSelectedCategory('')}
                                        className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-colors ${selectedCategory === '' ? 'bg-brand-gold border-brand-gold text-brand-dark font-bold' : 'border-white/30 text-white hover:bg-white/10'}`}
                                    >
                                        All
                                    </button>
                                    {config.allowedFilters.map(filter => (
                                        <button 
                                            key={filter}
                                            onClick={() => { 
                                                const newVal = selectedCategory === filter ? '' : filter;
                                                setSelectedCategory(newVal);
                                            }}
                                            className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-colors ${selectedCategory === filter ? 'bg-brand-gold border-brand-gold text-brand-dark font-bold' : 'border-white/30 text-white hover:bg-white/10'}`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- Results Grid --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedOfferings.map((offering) => {
                        const isEcommerce = offering.programmeTypes.some((type: string) => 
                            ['Online Learning', 'Part Time Learning'].includes(type)
                        );
                        const typeOfStudy = offering.programmeTypes.some(t => t.includes('Online')) ? 'Online' : 'Full-Time';
                        const inCompare = isInCompare(offering.id);

                        return (
                        <div key={offering.id} className="bg-brand-card group rounded-lg overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative">
                            {/* Image Area */}
                            <div className="relative h-60 overflow-hidden">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-brand-gold text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                                        {offering.category}
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
                            <div className="p-6 flex-1 flex flex-col bg-brand-card relative z-10">
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

                                {/* Default Footer - Always Visible */}
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
                        <div className="col-span-full text-center py-12 bg-white/5 rounded-sm border border-white/5">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-xl text-white font-serif mb-2">No Programmes Found</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-6">
                                We couldn't find any courses matching your specific filters for {config.title}.
                            </p>
                            <button 
                                onClick={() => {
                                    setSelectedCategory('');
                                    setSelectedAccreditations([]);
                                    handleSearch();
                                }}
                                className="text-brand-gold hover:underline mt-2 text-sm font-bold uppercase tracking-wide"
                            >
                                Clear All Filters
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
        </div>
    );
};
