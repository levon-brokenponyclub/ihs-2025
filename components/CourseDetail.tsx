import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSE_DETAILS, OFFERINGS } from '../constants';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
/// <reference types="styled-components" />
// Explicitly specify the path to the type declarations
import 'styled-components';
// @ts-ignore
import {
    CheckCircle,
    Download,
    Award,
    ChevronUp,
    ChevronDown,
    ShoppingBag,
    ArrowRight,
    ArrowLeft,
    Circle,
    MessageSquare,
    Clock,
    MapPin
} from 'lucide-react';
import { Offering, CourseDetail as CourseDetailType } from '../types';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import { useTransition } from '../context/TransitionContext';
import { CourseCardSlider } from './CourseCardSlider';
import { Testimonial } from './Testimonial';


// --- Light Theme Accordion for Mobile Course Detail ---
interface LightAccordionProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    id?: string;
}

const LightAccordionItem: React.FC<LightAccordionProps> = ({ title, children, isOpen, onToggle, id }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const wasOpen = useRef(isOpen);

    useEffect(() => {
        // Only scroll on mobile
        if (isOpen && !wasOpen.current && itemRef.current && window.innerWidth < 1024) {
            setTimeout(() => {
                itemRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
        wasOpen.current = isOpen;
    }, [isOpen]);

    return (
        <div ref={itemRef} id={id} className={`border-b border-gray-200 bg-white lg:border-none lg:bg-transparent ${isOpen ? 'scroll-mt-[180px]' : ''}`}>
            <button
                className="w-full flex justify-between items-center py-5 px-4 text-left focus:outline-none lg:hidden"
                onClick={onToggle}
            >
                <span className={`font-serif font-bold text-lg ${isOpen ? 'text-brand-primary' : 'text-gray-700'}`}>
                    {title}
                </span>
                {isOpen ? <ChevronUp className="text-brand-accent" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-none lg:opacity-100 lg:overflow-visible ${isOpen ? 'max-h-[2000px] opacity-100 mb-6 lg:mb-0' : 'max-h-0 opacity-0 lg:mb-0'}`}
            >
                <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Reusable Accreditation Row ---
const AccreditationRow = ({ accreditations }: { accreditations: string[] }) => {
    if (!accreditations || accreditations.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-4 items-center pt-6 border-t border-gray-100 mt-6">
            {accreditations.map((acc, idx) => {
                let src = '';
                // Check for specific overrides requested
                if (acc === 'IHS' || acc === 'International Hotel School') {
                    src = 'components/assets/logos/ihs-logo-dark.png';
                } else if (acc === 'AHLEI') {
                    src = 'components/assets/logos/american-hotel-lodging-educational-institute-r6djf1a4jfs1u9sokoij74ckub80bbe63d3o4wvozc.png';
                }

                // Fallback to URL check if not matched above
                if (!src && (/^https?:\/\//.test(acc) || /\.(svg|png|jpe?g|webp)$/i.test(acc))) {
                    src = acc;
                }

                if (src) {
                    return (
                        <img key={idx} src={src} alt={acc} className="h-[3.5rem] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

// --- Bottom Drawer Component (Mobile Conversion) ---
const MobileFeesDrawer = ({
                              course,
                              isOpen,
                              onToggle,
                              onApply,
                              showTitle
                          }: {
    course: CourseDetailType,
    isOpen: boolean,
    onToggle: () => void,
    onApply: () => void,
    showTitle: boolean
}) => {
    const isEcommerce = course.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const ctaLabel = isEcommerce ? 'Buy Now' : 'Apply Now';

    // Logic: Show Title in header if scrolled past hero (showTitle=true) OR if drawer is open
    const displayTitleInHeader = showTitle || isOpen;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onToggle();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onToggle]);

    return (
        <div
            className="group fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white rounded-t-3xl flex flex-col items-center mx-auto max-w-4xl border-t border-x border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            data-state={isOpen ? 'open' : 'closed'}
            role="region"
            aria-label="Course Fees Details"
        >
            <button
                onClick={onToggle}
                className="w-full h-8 flex items-center justify-center cursor-pointer hover:bg-slate-50 rounded-t-3xl transition-colors focus:outline-none"
                aria-label={isOpen ? "Collapse details" : "Expand details"}
                aria-expanded={isOpen}
            >
                <span className="w-12 h-1.5 bg-slate-300 rounded-full"></span>
            </button>

            <div
                className="w-full px-6 md:px-10 pb-4 cursor-pointer flex flex-col"
                onClick={onToggle}
            >
                <div className="flex justify-between items-center w-full gap-4 h-12 overflow-hidden relative">
                    <div className="flex-1 relative h-full">
                        <div
                            className={`absolute inset-0 flex items-center justify-between transition-all duration-500 ease-in-out ${displayTitleInHeader ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
                        >
                            <p className="text-gray-500 text-[10px] uppercase tracking-[1px] font-bold">Per Year</p>
                            <p className="text-2xl font-serif text-[#002B4E] font-bold leading-none">{course.fees.tuition}</p>
                        </div>

                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${displayTitleInHeader ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                        >
                            <h3 className="font-serif text-lg font-bold text-[#002B4E] truncate leading-normal px-4 text-center">
                                {course.title}
                            </h3>
                        </div>
                    </div>

                    <div className={`text-[#C2B067] transition-transform duration-500 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronUp size={24} />
                    </div>
                </div>
            </div>

            <div className="w-full px-6 md:px-10 overflow-hidden transition-[max-height,opacity,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-0 opacity-0 pb-0 group-data-[state=open]:max-h-[85vh] group-data-[state=open]:opacity-100 group-data-[state=open]:pb-10">
                <div className="pt-2 border-t border-slate-100 mt-2">
                    <div className="mb-4 mt-2">
                        {displayTitleInHeader && (
                            <div className="mb-4 flex justify-between items-center border-b border-gray-100 pb-4">
                                <p className="text-gray-500 text-[10px] uppercase tracking-[1px] font-bold">Tuition</p>
                                <p className="text-3xl font-serif text-[#002B4E] font-bold">{course.fees.tuition}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm border-b border-gray-100 pb-3">
                                <span className="text-gray-600">Registration Fee</span>
                                <span className="text-[#002B4E] font-bold">{course.fees.registration}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-gray-100 pb-3">
                                <span className="text-gray-600">Payment Terms</span>
                                <span className="text-[#002B4E] font-bold">Monthly / Annually</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 italic leading-relaxed text-center">
                            *{course.fees.note}
                        </p>
                    </div>

                    <div className="mb-6">
                        <AccreditationRow accreditations={course.accreditations} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onApply();
                            }}
                            className="inline-flex items-center justify-center font-bold uppercase transition-all duration-300 text-xs px-6 py-4 rounded-sm bg-[#C2B067] text-white hover:bg-[#B8A558] border border-[#C2B067] w-full tracking-[1px]"
                        >
                            {ctaLabel}
                        </button>

                        <button className="w-full border border-[#C2B067] text-[#C2B067] bg-white/0 hover:bg-slate-50 font-bold uppercase text-xs py-4 rounded-sm transition-colors flex items-center justify-center gap-2 tracking-[1px]">
                            Download Prospectus
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Need Guidance Card ---
const NeedGuidanceCard = () => {
    return (
        <div className="bg-[#002B4E] rounded-sm p-8 relative overflow-hidden shadow-xl border border-white/10">
            <div className="absolute -right-6 -top-6 text-white/5 transform rotate-12">
                <MessageSquare size={140} fill="currentColor" />
            </div>

            <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Need Guidance?</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-8">
                    Speak to our admissions team to find the perfect fit for your career goals.
                </p>

                <button className="flex items-center gap-3 text-brand-gold font-bold text-xs uppercase hover:text-white transition-colors group tracking-[1px]">
                    Start Live Chat
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

// --- Desktop Fees Card ---
const FeesCard = ({ course }: { course: CourseDetailType }) => {
    const { addToCart } = useCart();
    const isEcommerce = course.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );

    const handleAction = () => {
        if (isEcommerce) {
            addToCart(course);
        } else {
            document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-xl">
            <div className="bg-[#002B4E] p-4 text-center">
                <span className="text-white font-bold uppercase tracking-[1px] text-sm">2026 Fees</span>
            </div>
            <div className="p-8 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-[1px] mb-2">Per Year</p>
                <p className="text-4xl font-serif text-[#002B4E] font-bold mb-6">{course.fees.tuition}</p>

                <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Registration Fee</span>
                        <span className="text-[#002B4E] font-bold">{course.fees.registration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payment Terms</span>
                        <span className="text-[#002B4E] font-bold">Monthly / Annually</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-8 italic">
                    *{course.fees.note}
                </p>

                <div className="space-y-3">
                    <Button
                        variant="primary"
                        className="w-full tracking-[1px]"
                        onClick={handleAction}
                        icon={isEcommerce ? <ShoppingBag size={16} /> : undefined}
                    >
                        {isEcommerce ? 'Buy Now' : 'Apply Now'}
                    </Button>
                    <Button variant="outline" className="w-full tracking-[1px]" icon={<Download size={16} />}>
                        Download Prospectus
                    </Button>
                </div>

                <AccreditationRow accreditations={course.accreditations} />
            </div>
        </div>
    );
};

// Ensure setContentReady is defined
const setContentReady = (state: boolean) => {
    console.log(`Content ready state: ${state}`);
};

export const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeSection, setActiveSection] = useState('overview');
    const [isTabsSticky, setIsTabsSticky] = useState(false);

    // Header Visibility State sync (mirrored logic from Header.tsx)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);

    const [openMobileSection, setOpenMobileSection] = useState<string | null>('overview');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [scrolledPastHero, setScrolledPastHero] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    // Safeguard transition state access to prevent undefined error
    const transitionData = useTransition();
    // Fallback if transitionData itself is undefined (though context provider should prevent this)
    const transitionState = transitionData?.transitionState || { phase: 'idle', isTransitioning: false };
    const { startTransition } = transitionData || { startTransition: () => {} };

    // Removed unused variable `contentReady`

    const course = id && COURSE_DETAILS[id] ? COURSE_DETAILS[id] : COURSE_DETAILS['1'];

    // --- Related Programmes Logic ---
    const relatedOfferings = useMemo(() => {
        return OFFERINGS.filter(o =>
            o.id !== course.id &&
            (o.category === course.category || o.programmeTypes.some(t => course.programmeTypes.includes(t)))
        ).slice(0, 6); // Up to 6 for the slider
    }, [course]);

    const SECTIONS = useMemo(() => {
        const sections = [
            { id: 'overview', label: 'Overview' },
            { id: 'content', label: 'Programme Curriculum' },
            { id: 'focus', label: course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas' },
            { id: 'requirements', label: 'Entry Requirements' },
            { id: 'certification', label: 'Certification' },
            { id: 'faq', label: 'FAQs' },
            { id: 'fees', label: 'Fees' },
        ];

        if (course.workIntegratedLearning) {
            // Insert WIL after content
            sections.splice(2, 0, { id: 'wil', label: 'Work Integrated Learning' });
        }

        return sections;
    }, [course]);

    const isEcommerce = course.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );

    // Helpers for Breadcrumbs
    const primaryType = course.programmeTypes[0] || 'Programme';
    const getArchiveLink = (type: string) => {
        if(type.includes('Full Time')) return '/programmes/full-time';
        if(type.includes('Blended')) return '/programmes/blended';
        if(type.includes('In-Service')) return '/programmes/in-service';
        if(type.includes('Part Time')) return '/programmes/part-time';
        if(type.includes('Online')) return '/programmes/online';
        return '/';
    };
    const archiveLink = getArchiveLink(primaryType);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Reset content ready state when navigating to new course
        setContentReady(false);
    }, [id]);

    // Manage content visibility during page transition
    useEffect(() => {
        // Keep content hidden while transitioning overlays are active
        if (transitionState.phase === 'complete' || transitionState.phase === 'idle') {
            // Small delay to ensure overlays have faded out
            const timer = setTimeout(() => setContentReady(true), 50);
            return () => clearTimeout(timer);
        } else {
            setContentReady(false);
        }
    }, [transitionState.phase]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = heroRef.current?.offsetHeight || 400;

            // Header Visibility Logic (Matches Header.tsx)
            if (currentScrollY < 10) {
                setIsHeaderVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            lastScrollY.current = currentScrollY;

            // Sticky Logic - Adjusted for breadcrumb bar (approx 56px)
            const isSticky = window.scrollY >= (heroHeight + 56 - 80);
            setIsTabsSticky(isSticky);
            setScrolledPastHero(window.scrollY > (heroHeight - 150));

            // Spy Scroll Logic
            if (window.innerWidth >= 1024) {
                const offset = 200;
                const scrollPosition = window.scrollY + offset;

                for (const section of SECTIONS) {
                    const element = document.getElementById(section.id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        const absoluteTop = rect.top + window.scrollY;
                        if (scrollPosition >= absoluteTop && (rect.height + absoluteTop) > scrollPosition) {
                            setActiveSection(section.id);
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [SECTIONS]);

    const handleTabClick = (sectionId: string) => {
        setActiveSection(sectionId);

        if (sectionId === 'fees') {
            if (window.innerWidth < 1024) {
                setIsDrawerOpen(true);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        if (window.innerWidth < 1024) {
            setOpenMobileSection(sectionId);
            setIsDrawerOpen(false);
            setTimeout(() => {
                const el = document.getElementById(`mobile-${sectionId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            const el = document.getElementById(sectionId);
            if (el) {
                const headerOffset = isHeaderVisible ? 160 : 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    const handleApply = () => {
        setIsDrawerOpen(false);
        if (isEcommerce) {
            addToCart(course);
            setShowCheckout(true);
        } else {
            setShowApplication(true);
        }
    };

    const handleRelatedExpand = (offering: Offering, imgRect: DOMRect, txtRect: DOMRect, catRect: DOMRect) => {
        startTransition(offering, imgRect, txtRect, catRect);
    };

    if (!course) return <div>Loading...</div>;

    const typeOfStudy = course.programmeTypes.some(t => t.includes('Full Time')) ? 'Full Time' :
        course.programmeTypes.some(t => t.includes('Part Time')) ? 'Part Time' : 'Online';

    return (
        <div className="min-h-screen bg-gray-50 pt-0 pb-20 lg:pb-0">

            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-brand-primary h-[450px] lg:h-[90vh] flex flex-col">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 bg-brand-primary overflow-hidden">
                    {course.video && (
                        <video
                            src={course.video}
                            loop
                            playsInline
                            autoPlay
                            muted
                            className="w-full h-full object-cover opacity-70"
                        />
                    )}
                    <div className="absolute inset-0 z-10 bg-brand-primary/30" />
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-transparent" />
                </div>

                {/* Content Layer */}
                <div className="relative z-20 flex-grow flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="lg:w-2/3 w-full pb-5 lg:pb-0 relative">
                            {/* Back Navigation */}
                            <Link
                                to={archiveLink}
                                className="inline-flex items-center gap-2 text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Programmes
                            </Link>

                            {/* Mobile Meta - MOVED ABOVE TITLE */}
                            <div className="lg:hidden flex items-center gap-4 text-white/80 text-xs mb-[2rem] font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-brand-gold" /> {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-brand-gold" /> {typeOfStudy}
                                </span>
                            </div>

                            {/* Title - Line Height 1.25 */}
                            <h1 className="font-serif text-3xl md:text-3xl lg:text-6xl text-white font-semibold leading-[1.35] mb-[3rem] drop-shadow-lg text-wrap: balance">
                                {course.title}
                            </h1>

                            {/* Mobile Buttons */}
                            <div className="lg:hidden flex flex-col gap-3">
                                <button className="inline-flex items-center justify-center font-bold uppercase transition-all duration-300 text-xs px-6 py-4 rounded-sm bg-[#C2B067] text-white hover:bg-[#B8A558] border border-[#C2B067] w-full tracking-[1px]">
                                    Apply Now
                                </button>
                                <button className="w-full border border-[#C2B067] text-[#C2B067] bg-white hover:bg-slate-50 font-bold uppercase text-xs py-4 rounded-sm transition-colors flex items-center justify-center gap-2 tracking-[1px]">
                                    Download Prospectus
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" x2="12" y1="15" y2="3"></line>
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Course Meta Section - Desktop Only */}
                <div className="hidden lg:flex relative z-30 mt-auto h-[115px] bg-white/0 border-t border-white/10 items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        {/* Constrained to 66.6% (2/3) to match content */}
                        <div className="lg:w-2/3 grid grid-cols-4 gap-8">
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">Duration</p>
                                <p className="text-white font-semibold">{course.duration}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">Study Mode</p>
                                <p className="text-white font-semibold">{typeOfStudy}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">Next Intake</p>
                                <p className="text-white font-semibold">{course.intake || course.startDate}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">Level</p>
                                <p className="text-white font-semibold">{course.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Bar - Positioned Below Hero, Above Tabs */}
            <div className="bg-[#002B4E] border-b border-white/10 py-4 relative z-20 hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-[1px] text-white flex-wrap">
                        <Link to="/" className="text-brand-gold hover:text-white transition-colors">Home</Link>
                        <span className="text-white/40">/</span>
                        <Link to={archiveLink} className="text-brand-gold hover:text-white transition-colors">{primaryType}</Link>
                        <span className="text-white/40">/</span>
                        <span className="text-white line-clamp-1">{course.title}</span>
                    </nav>
                </div>
            </div>

            {/* Sticky Header Tabs - Dynamically positioned based on header visibility */}
            <div
                className={`sticky z-30 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${
                    isTabsSticky ? 'shadow-md' : ''
                }`}
                style={{
                    top: isHeaderVisible ? '80px' : '0px'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                        {SECTIONS.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => handleTabClick(sec.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-colors tracking-[1px] ${
                                    activeSection === sec.id
                                        ? 'bg-brand-primary text-white'
                                        : 'text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                {sec.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-4 lg:space-y-16">

                        {/* 1. Overview */}
                        <div className="lg:block">
                            <LightAccordionItem
                                id="mobile-overview"
                                title="Overview"
                                isOpen={window.innerWidth < 1024 ? openMobileSection === 'overview' : true}
                                onToggle={() => setOpenMobileSection(openMobileSection === 'overview' ? null : 'overview')}
                            >
                                <div id="overview" className="bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                    <h2 className="hidden lg:block text-2xl font-serif text-brand-primary mb-6 font-bold">Overview</h2>
                                    <p className="text-base leading-relaxed text-gray-600 whitespace-pre-line">
                                        {course.fullDescription}
                                    </p>
                                </div>
                            </LightAccordionItem>
                        </div>

                        {/* 2. Programme Curriculum (Formerly Programme Content) */}
                        <LightAccordionItem
                            id="mobile-content"
                            title="Programme Curriculum"
                            isOpen={window.innerWidth < 1024 ? openMobileSection === 'content' : true}
                            onToggle={() => setOpenMobileSection(openMobileSection === 'content' ? null : 'content')}
                        >
                            <div id="content" className="lg:bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Programme Curriculum
                                </h3>

                                {course.programContentIncludes && (
                                    <div className="mb-8">
                                        <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-[1px]">WHAT YOU WILL LEARN</h4>
                                        <ul className="flex flex-col gap-3">
                                            {course.programContentIncludes.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 border border-gray-100 p-4 rounded-sm w-full">
                                                    <Circle size={8} className="text-brand-gold shrink-0" fill="currentColor" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {course.curriculum && course.curriculum.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-[1px] mt-8">Module Breakdown</h4>
                                        {course.curriculum.map((year, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded-sm">
                                                <div className="bg-gray-50 px-4 py-3 font-bold text-brand-primary border-b border-gray-200">
                                                    {year.year}
                                                </div>
                                                <div className="p-4 grid grid-cols-1 gap-4">
                                                    {year.modules.map((mod, mIdx) => (
                                                        <div key={mIdx}>
                                                            <span className="font-bold text-gray-700 text-sm block mb-1">{mod.title}</span>
                                                            <p className="text-xs text-gray-500">{mod.topics.join(', ')}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </LightAccordionItem>

                        {/* 2.5 Work Integrated Learning (New Section) */}
                        {course.workIntegratedLearning && (
                            <LightAccordionItem
                                id="mobile-wil"
                                title="Work Integrated Learning"
                                isOpen={window.innerWidth < 1024 ? openMobileSection === 'wil' : true}
                                onToggle={() => setOpenMobileSection(openMobileSection === 'wil' ? null : 'wil')}
                            >
                                <div id="wil" className="lg:bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                    <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                        Work Integrated Learning
                                    </h3>
                                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                        {course.workIntegratedLearning}
                                    </div>
                                </div>
                            </LightAccordionItem>
                        )}

                        {/* 3. Focus Areas */}
                        <LightAccordionItem
                            id="mobile-focus"
                            title={course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas'}
                            isOpen={window.innerWidth < 1024 ? openMobileSection === 'focus' : true}
                            onToggle={() => setOpenMobileSection(openMobileSection === 'focus' ? null : 'focus')}
                        >
                            <div id="focus" className="lg:bg-white lg:p-8 lg:shadow-none lg:border lg:border-gray-100">
                                <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Focus Areas
                                </h3>

                                {course.extendedFocusAreas ? (
                                    <div className="space-y-4">
                                        {course.extendedFocusAreas.map((area, idx) => (
                                            <div key={idx} className="bg-gray-50 p-5 rounded-sm border border-gray-200">
                                                <h4 className="text-brand-primary font-bold mb-2">{area.title}</h4>
                                                <p className="text-sm text-gray-600">{area.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : course.focusAreas ? (
                                    <div className="flex flex-wrap gap-2">
                                        {course.focusAreas.map((area, idx) => (
                                            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-sm text-sm font-medium border border-gray-200">
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No specific focus areas for this course.</p>
                                )}
                            </div>
                        </LightAccordionItem>

                        {/* 4. Requirements */}
                        <LightAccordionItem
                            id="mobile-requirements"
                            title="Entry Requirements"
                            isOpen={window.innerWidth < 1024 ? openMobileSection === 'requirements' : true}
                            onToggle={() => setOpenMobileSection(openMobileSection === 'requirements' ? null : 'requirements')}
                        >
                            <div id="requirements" className="lg:bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Entry Requirements
                                </h3>
                                <ul className="space-y-3">
                                    {course.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle size={18} className="text-brand-gold shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </LightAccordionItem>

                        {/* 5. Certification */}
                        {course.certification && (
                            <LightAccordionItem
                                id="mobile-certification"
                                title="Certification"
                                isOpen={window.innerWidth < 1024 ? openMobileSection === 'certification' : true}
                                onToggle={() => setOpenMobileSection(openMobileSection === 'certification' ? null : 'certification')}
                            >
                                <div id="certification" className="lg:bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                    <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                        Certification
                                    </h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary shrink-0">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">Qualification Awarded</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-6">{course.certification}</p>
                                        </div>
                                    </div>
                                </div>
                            </LightAccordionItem>
                        )}

                        {/* 6. FAQs */}
                        <LightAccordionItem
                            id="mobile-faq"
                            title="FAQs"
                            isOpen={window.innerWidth < 1024 ? openMobileSection === 'faq' : true}
                            onToggle={() => setOpenMobileSection(openMobileSection === 'faq' ? null : 'faq')}
                        >
                            <div id="faq" className="lg:bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100">
                                <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                                    <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-4">
                                    <details className="group">
                                        <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none">
                                            <span>What is the difference between Diploma and Degree?</span>
                                            <span className="transition group-open:rotate-180"><ChevronDown size={16} /></span>
                                        </summary>
                                        <div className="text-gray-600 text-sm mt-3 leading-relaxed group-open:animate-fadeIn">
                                            Degrees focus on strategic management (NQF 7), while Diplomas focus on operational management (NQF 6).
                                        </div>
                                    </details>
                                    <hr className="border-gray-100" />
                                    <details className="group">
                                        <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none">
                                            <span>Are payment plans available?</span>
                                            <span className="transition group-open:rotate-180"><ChevronDown size={16} /></span>
                                        </summary>
                                        <div className="text-gray-600 text-sm mt-3 leading-relaxed group-open:animate-fadeIn">
                                            Yes, we offer flexible monthly payment terms for all our programmes.
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </LightAccordionItem>

                    </div>

                    {/* Right Column: Sidebar (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-1">
                        {/*
                            Sidebar Sticky Logic:
                            - `top-[160px]` when header is visible (80px header + 80px tabs).
                            - `top-[80px]` when header is hidden (0px header + 80px tabs).
                        */}
                        <div
                            className="sticky space-y-6 transition-all duration-300 ease-in-out"
                            style={{
                                top: isHeaderVisible ? '160px' : '80px'
                            }}
                        >
                            <FeesCard course={course} />

                            <NeedGuidanceCard />
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Programmes Section */}
            {relatedOfferings.length > 0 && (
                <section className="bg-brand-primary py-24 border-t border-white/5">
                    <CourseCardSlider
                        title={
                            <div className="mb-4">
                                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                                    Related <span className="text-brand-gold italic">Programmes</span>
                                </h2>
                            </div>
                        }
                        offerings={relatedOfferings}
                        onExpand={handleRelatedExpand}
                        dark={true}
                    />
                </section>
            )}
            
            {/* Testimonials Section */}
            <Testimonial />

            {/* Mobile Bottom Drawer */}
            <MobileFeesDrawer
                course={course}
                isOpen={isDrawerOpen}
                onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                onApply={handleApply}
                showTitle={scrolledPastHero}
            />

            {/* Modals */}
            <ApplicationModal
                isOpen={showApplication}
                onClose={() => setShowApplication(false)}
                courseTitle={course.title}
            />

            <CheckoutModal
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
            />

        </div>
    );
};