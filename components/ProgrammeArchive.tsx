
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { OFFERINGS, FOCUS_AREAS } from '../constants';
import { FilterSelect, FilterOption } from './ui/FilterSelect';
import { ChevronDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Offering } from '../types';
import { CourseCard } from './CourseCard';
import { useTransition } from '../context/TransitionContext';
import gsap from 'gsap';
import { Testimonial } from './Testimonial';

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
        allowedFilters: ['Hospitality Management', 'Culinary'],
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
        allowedFilters: ['Hospitality Management', 'Culinary'],
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

const FOCUS_AREA_OPTIONS = FOCUS_AREAS;

const ACCREDITATION_OPTIONS: FilterOption[] = [
    { label: 'AHLEI', value: 'AHLEI' },
    { label: 'CATHSSETA', value: 'CATHSSETA' },
    { label: 'City & Guilds', value: 'City & Guilds' },
    { label: 'QCTO', value: 'QCTO' },
    { label: 'École Ducasse', value: 'École Ducasse' }
];

const ITEMS_PER_PAGE = 9;

export const ProgrammeArchive: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const config = type ? ARCHIVE_CONFIGS[type] : null;

    // States
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
    const [displayedOfferings, setDisplayedOfferings] = useState<Offering[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startTransition } = useTransition();

    // Initial Data Load & Filter
    useEffect(() => {
        if (config) {
            const baseItems = OFFERINGS.filter(o => o.programmeTypes.includes(config.baseFilter));
            setDisplayedOfferings(baseItems);
            setSelectedCategory('');
            setSelectedAccreditations([]);
            setCurrentPage(1);
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
        setCurrentPage(1); // Reset page on filter
    }, [config, selectedCategory, selectedAccreditations]);

    useEffect(() => {
        if (type !== 'online') {
            handleSearch();
        }
    }, [handleSearch, type]);

    // GSAP Animation for Cards when page or data changes
    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll('.course-card');
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [displayedOfferings, currentPage]);

    const handleCardExpand = (offering: Offering, imgRect: DOMRect, txtRect: DOMRect, catRect: DOMRect) => {
        startTransition(offering, imgRect, txtRect, catRect);
    };

    if (!config) return <div className="min-h-screen pt-32 text-center text-white">Programme type not found.</div>;

    const isOnlinePage = type === 'online';

    // Pagination Logic
    const totalPages = Math.ceil(displayedOfferings.length / ITEMS_PER_PAGE);
    const paginatedOfferings = displayedOfferings.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const scrollToTop = () => {
        const element = document.getElementById('archive-grid');
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#001D36]">
            {/* --- Hero Section --- */}
            <div className={`relative ${isOnlinePage ? 'py-32 md:py-40' : 'h-[50vh] min-h-[400px]'} flex flex-col justify-center`}>
                <div className="absolute inset-0 z-0">
                    <img src={config.heroImage} alt={config.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${isOnlinePage ? 'bg-gradient-to-r from-[#0B1221]/90 to-[#0B1221]/80' : 'bg-[#001D36]/80'}`}></div>
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
                                            className="w-full h-full bg-brand-gold text-brand-dark font-bold py-3 rounded-sm hover:bg-white transition-colors uppercase tracking-widest text-sm tracking-[1px]"
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
                                        className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-colors tracking-[1px] ${selectedCategory === '' ? 'bg-brand-gold border-brand-gold text-brand-dark font-bold' : 'border-white/30 text-white hover:bg-white/10'}`}
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
                                            className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-colors tracking-[1px] ${selectedCategory === filter ? 'bg-brand-gold border-brand-gold text-brand-dark font-bold' : 'border-white/30 text-white hover:bg-white/10'}`}
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
            <div id="archive-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={containerRef}>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedOfferings.map((offering) => (
                        <div key={offering.id} className="h-full">
                            <CourseCard offering={offering} onExpand={handleCardExpand} />
                        </div>
                    ))}

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
                                className="text-brand-gold hover:underline mt-2 text-sm font-bold uppercase tracking-wide tracking-[1px]"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.max(1, p - 1));
                                scrollToTop();
                            }}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-white text-[#002B4E] hover:bg-brand-gold'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                    scrollToTop();
                                }}
                                className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${currentPage === page
                                    ? 'bg-brand-gold text-[#002B4E] scale-110'
                                    : 'bg-white text-[#002B4E] hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.min(totalPages, p + 1));
                                scrollToTop();
                            }}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'bg-white text-[#002B4E] hover:bg-brand-gold'}`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Testimonials Section */}
            <Testimonial />

        </div>
    );
};
