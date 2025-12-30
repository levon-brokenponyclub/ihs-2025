
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSE_DETAILS } from '../constants.tsx';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { MultiStepForm } from './ui/MultiStepForm';
import {
    Clock,
    GraduationCap,
    MapPin,
    Calendar,
    CheckCircle,
    Download,
    ArrowLeft,
    Award,
    Check,
    ChevronUp,
    ChevronDown,
    ShoppingBag,
    HelpCircle,
    ArrowUpCircle,
    ChevronLeft,
    ChevronRight,
    Eye,
    BarChart2,
    X,
    ArrowRight,
    BookOpen,
    Circle,
    FileText,
    MessageSquare
} from 'lucide-react';
import { Offering, CourseDetail as CourseDetailType } from '../types';
import { QuickViewModal } from './QuickViewModal';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import gsap from 'gsap';

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
        // Only scroll if we are transitioning from CLOSED to OPEN
        // This prevents auto-scrolling on initial render when defaultOpen is true
        if (isOpen && !wasOpen.current && itemRef.current) {
            setTimeout(() => {
                itemRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
        // Update ref for next render
        wasOpen.current = isOpen;
    }, [isOpen]);

    return (
        <div ref={itemRef} id={id} className={`border-b border-gray-200 bg-white ${isOpen ? 'scroll-mt-[180px]' : ''}`}>
            <button
                className="w-full flex justify-between items-center py-5 px-4 text-left focus:outline-none"
                onClick={onToggle}
            >
                <span className={`font-serif font-bold text-lg ${isOpen ? 'text-brand-primary' : 'text-gray-700'}`}>
                    {title}
                </span>
                {isOpen ? <ChevronUp className="text-brand-accent" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 text-gray-600 text-sm leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Bottom Drawer Component (Mobile Conversion) ---
const MobileFeesDrawer = ({ 
    course, 
    isOpen, 
    onToggle, 
    onApply 
}: { 
    course: CourseDetailType, 
    isOpen: boolean, 
    onToggle: () => void, 
    onApply: () => void 
}) => {
    // 1. Determine CTA Label / Type
    const isEcommerce = course.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const ctaLabel = isEcommerce ? 'Buy Now' : 'Apply Now';

    // 2. Accessibility: Handle Escape Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onToggle();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onToggle]);

    return (
        <div 
            className="group fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white shadow-[0_-5px_40px_rgba(0,0,0,0.15)] rounded-t-3xl flex flex-col items-center mx-auto max-w-4xl border-t border-x border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            data-state={isOpen ? 'open' : 'closed'}
            role="region"
            aria-label="Course Fees Details"
        >
            {/* Handle / Drag Area */}
            <button
                onClick={onToggle}
                className="w-full h-8 flex items-center justify-center cursor-pointer hover:bg-slate-50 rounded-t-3xl transition-colors focus:outline-none"
                aria-label={isOpen ? "Collapse details" : "Expand details"}
                aria-expanded={isOpen}
            >
                <span className="w-12 h-1.5 bg-slate-300 rounded-full"></span>
            </button>

            {/* Header Interactive Area */}
            <div 
                className="w-full px-6 md:px-10 pb-2 cursor-pointer flex flex-col"
                onClick={onToggle}
            >
                {/* Row 1: Title & Chevron (Always Visible) */}
                <div className="flex justify-between items-center w-full gap-4 h-12">
                    <h3 
                        className="font-serif text-lg font-bold text-[#002B4E] truncate"
                        title={course.title}
                    >
                        {course.title}
                    </h3>
                    {/* Chevron - Rotates 180deg when open */}
                    <div className="text-[#C2B067] transition-transform duration-500 group-data-[state=open]:rotate-180 shrink-0">
                         <ChevronUp size={24} />
                    </div>
                </div>

                {/* Row 2: Price & Label - "Roll Fade" Reveal on Hover/Open */}
                <div className="
                    flex flex-col items-center justify-center text-center gap-1
                    overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    max-h-0 opacity-0 -translate-y-4
                    group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0
                    group-data-[state=open]:max-h-24 group-data-[state=open]:opacity-100 group-data-[state=open]:translate-y-0
                    pb-2
                ">
                    <p className="text-gray-500 text-[10px] uppercase tracking-wider">Per Year</p>
                    <p className="text-3xl font-serif text-[#002B4E] font-bold">{course.fees.tuition}</p>
                </div>
            </div>

            {/* Expanded Content */}
            <div className="w-full px-6 md:px-10 overflow-hidden transition-[max-height,opacity,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-0 opacity-0 pb-0 group-data-[state=open]:max-h-[85vh] group-data-[state=open]:opacity-100 group-data-[state=open]:pb-10">
                <div className="pt-2 border-t border-slate-100 mt-2">
                    
                    {/* Fees Breakdown - Styled to match Sidebar Fees Card */}
                    <div className="mb-8 mt-2">
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
                         <p className="text-[10px] text-slate-400 mt-4 italic leading-relaxed">
                            *{course.fees.note}
                        </p>
                    </div>

                    {/* Stacked Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onApply();
                            }}
                            className="inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 text-xs px-6 py-4 rounded-sm bg-[#C2B067] text-[#002B4E] hover:bg-white hover:text-[#002B4E] border border-transparent hover:border-[#C2B067] w-full shadow-md"
                        >
                            {ctaLabel}
                        </button>
                        
                        <button className="w-full border border-[#002B4E] text-[#002B4E] bg-white hover:bg-slate-50 font-bold uppercase tracking-widest text-xs py-4 rounded-sm transition-colors flex items-center justify-center gap-2">
                            Download Prospectus <Download size={14} />
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
            {/* Background Icon */}
            <div className="absolute -right-6 -top-6 text-white/5 transform rotate-12">
                <MessageSquare size={140} fill="currentColor" />
            </div>
            
            <div className="relative z-10">
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Need Guidance?</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-8">
                    Speak to our admissions team to find the perfect fit for your career goals.
                </p>
                
                <button className="flex items-center gap-3 text-brand-gold font-bold text-xs uppercase tracking-widest hover:text-white transition-colors group">
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
                <span className="text-white font-bold uppercase tracking-widest text-sm">2025 Fees</span>
            </div>
            <div className="p-8 text-center">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Per Year</p>
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
                        className="w-full"
                        onClick={handleAction}
                        icon={isEcommerce ? <ShoppingBag size={16} /> : undefined}
                    >
                        {isEcommerce ? 'Buy Now' : 'Apply Now'}
                    </Button>
                    <Button variant="outline" className="w-full" icon={<Download size={16} />}>
                        Download Prospectus
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeSection, setActiveSection] = useState('overview');
    const [isTabsSticky, setIsTabsSticky] = useState(false);
    
    // Mobile Accordion State (Overview open by default)
    const [openMobileSection, setOpenMobileSection] = useState<string | null>('overview');
    
    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Modals
    const [formSuccess, setFormSuccess] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    // Refs
    const heroRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();
    
    // Data
    const course = id && COURSE_DETAILS[id] ? COURSE_DETAILS[id] : COURSE_DETAILS['1'];
    
    // Sections configuration
    const SECTIONS = useMemo(() => [
        { id: 'overview', label: 'Overview' },
        { id: 'content', label: 'Programme Content' },
        { id: 'focus', label: course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas' },
        { id: 'requirements', label: 'Entry Requirements' },
        { id: 'certification', label: 'Certification' },
        { id: 'faq', label: 'FAQs' },
        { id: 'fees', label: 'Fees' }, // Fees added for tab navigation
    ], [course.qualification]);

    const isEcommerce = course.programmeTypes.some((type: string) => 
        ['Online Learning', 'Part Time Learning'].includes(type)
    );

    useEffect(() => {
        // Ensure page starts at top
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = heroRef.current?.offsetHeight || 400;
            // Sticky logic triggers when we scroll PAST the hero
            setIsTabsSticky(window.scrollY >= (heroHeight - 80));

            // Update active section based on scroll position (Desktop mainly)
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
                // Desktop: Fees are sticky, maybe scroll to top of content
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        if (window.innerWidth < 1024) {
            // Mobile: Expand the accordion
            setOpenMobileSection(sectionId);
            setIsDrawerOpen(false); // Close drawer if navigating elsewhere
            
            // Scroll to element
            setTimeout(() => {
                const el = document.getElementById(`mobile-${sectionId}`);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Desktop Scroll
            const el = document.getElementById(sectionId);
            if (el) {
                const headerOffset = 160;
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

    if (!course) return <div>Loading...</div>;

    const typeOfStudy = course.programmeTypes.some(t => t.includes('Full Time')) ? 'Full Time' :
        course.programmeTypes.some(t => t.includes('Part Time')) ? 'Part Time' : 'Online';

    return (
        <div className="min-h-screen bg-gray-50 pt-0 pb-20 lg:pb-0">
            
            {/* Hero Section - First element for smooth transition */}
            <section ref={heroRef} className="relative bg-brand-primary h-[50vh] lg:h-[80vh] flex items-end pb-8 lg:pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/60 to-transparent"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="lg:w-2/3">
                        <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 text-xs font-bold uppercase tracking-widest">
                            <ArrowLeft size={14} className="mr-2" /> Back to Programmes
                        </Link>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-brand-gold text-brand-primary text-[10px] font-bold px-2 py-1 uppercase rounded-sm">
                                {course.category}
                            </span>
                            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-sm">
                                {course.qualification}
                            </span>
                        </div>

                        <h1 className="font-serif text-3xl lg:text-6xl text-white font-bold leading-tight mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                            {course.title}
                        </h1>

                        {/* Mobile: Simple CTA, Desktop: Hidden (Sidebar handles it) */}
                        <div className="lg:hidden flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-white/80 text-xs mb-2">
                                <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {typeOfStudy}</span>
                            </div>
                            <Button variant="primary" onClick={handleApply} className="w-full justify-center">
                                {isEcommerce ? 'Buy Now' : 'Apply Now'}
                            </Button>
                            <Button variant="secondary" className="w-full justify-center text-xs py-3">
                                Download Prospectus
                            </Button>
                        </div>

                        {/* Desktop Meta Grid */}
                        <div className="hidden lg:grid grid-cols-4 gap-8 border-t border-white/20 pt-8">
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1">Duration</p>
                                <p className="text-white font-semibold">{course.duration}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1">Study Mode</p>
                                <p className="text-white font-semibold">{typeOfStudy}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1">Next Intake</p>
                                <p className="text-white font-semibold">{course.intake || course.startDate}</p>
                            </div>
                            <div>
                                <p className="text-brand-gold text-xs uppercase font-bold mb-1">Level</p>
                                <p className="text-white font-semibold">{course.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Header Tabs - Now Below Hero */}
            <div className={`sticky top-[80px] bg-white border-b border-gray-200 z-40 transition-shadow ${isTabsSticky ? 'shadow-md' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                        {SECTIONS.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => handleTabClick(sec.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
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
                                    <p className="text-base leading-relaxed text-gray-600">
                                        {course.fullDescription}
                                    </p>
                                </div>
                            </LightAccordionItem>
                        </div>

                        {/* 2. Content / Curriculum */}
                        <LightAccordionItem 
                            id="mobile-content"
                            title="Programme Content" 
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
                                        <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">What you will learn</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {course.programContentIncludes.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-sm">
                                                    <Circle size={8} className="text-brand-gold shrink-0" fill="currentColor" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="space-y-4">
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
                            </div>
                        </LightAccordionItem>

                        {/* 3. Focus Areas */}
                        <LightAccordionItem 
                            id="mobile-focus"
                            title={course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas'}
                            isOpen={window.innerWidth < 1024 ? openMobileSection === 'focus' : true} 
                            onToggle={() => setOpenMobileSection(openMobileSection === 'focus' ? null : 'focus')}
                        >
                            <div id="focus" className="lg:bg-white lg:p-0 lg:shadow-none lg:border-0">
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
                                            
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Accredited By</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {course.accreditations.map((acc, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-sm border border-gray-200">
                                                            {acc}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
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
                        <div className="sticky top-[160px] space-y-6">
                            <FeesCard course={course} />
                            <NeedGuidanceCard />
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Bottom Drawer */}
            <MobileFeesDrawer 
                course={course} 
                isOpen={isDrawerOpen} 
                onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
                onApply={handleApply}
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
