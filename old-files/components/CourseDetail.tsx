
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { COURSE_DETAILS, OFFERINGS, ACCREDITATION_LOGOS } from '../constants';
import { Button } from './ui/Button';
import { AccordionItem } from './ui/Accordion';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { MultiStepForm } from './ui/MultiStepForm';
import { 
  Clock, 
  GraduationCap, 
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
  MapPin
} from 'lucide-react';
import { Offering } from '../types';
import { QuickViewModal } from './QuickViewModal';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import gsap from 'gsap';

const FeesCard = ({ course, className }: { course: any, className?: string }) => {
    const { addToCart } = useCart();
    
    // Check if this course is eligible for direct eCommerce purchase
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
        <div className={`bg-brand-card border border-white/10 rounded-sm overflow-hidden shadow-2xl ${className}`}>
            <div className="bg-brand-gold p-4 text-center">
                <span className="text-white font-bold uppercase tracking-widest text-sm">2025 Fees</span>
            </div>
            <div className="p-6 md:p-8 text-center">
                <p className="text-brand-muted text-xs uppercase tracking-wider mb-2">Per Year</p>
                <p className="text-4xl font-serif text-white font-bold mb-6">{course.fees.tuition}</p>
                
                <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Registration Fee</span>
                        <span className="text-white font-bold">{course.fees.registration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Payment Terms</span>
                        <span className="text-white font-bold">Monthly / Annually</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-400 mb-8 italic">
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

const MobileFeesDrawer = ({ course }: { course: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { addToCart } = useCart();

    const isEcommerce = course.programmeTypes.some((type: string) => 
        ['Online Learning', 'Part Time Learning'].includes(type)
    );

    const handleAction = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isEcommerce) {
            addToCart(course);
            setIsOpen(false);
        } else {
            document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            <div className="bg-brand-card border-t border-brand-gold shadow-[0_-10px_40px_rgba(0,0,0,0.5)] relative z-10 max-h-[80vh] overflow-y-auto">
                 {/* Header Bar */}
                 <div className="p-4 flex items-center justify-between bg-brand-card cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                      <div className="flex flex-col">
                          <span className="text-xs text-brand-muted uppercase tracking-wider mb-0.5">Annual Tuition</span>
                          <span className="text-white font-serif font-bold text-xl">{course.fees.tuition}</span>
                      </div>
                      <div className="flex items-center gap-3">
                          <Button 
                            variant="primary" 
                            className="!py-2 !px-4 !text-xs uppercase font-bold"
                            onClick={handleAction}
                            icon={isEcommerce ? <ShoppingBag size={14} /> : undefined}
                          >
                            {isEcommerce ? 'Buy Now' : 'Apply Now'}
                          </Button>
                          <button className="text-brand-gold p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                              {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                          </button>
                      </div>
                 </div>

                 {/* Expanded Content */}
                 {isOpen && (
                     <div className="p-6 border-t border-white/10 space-y-6 bg-brand-dark animate-in slide-in-from-bottom-5">
                         <div className="space-y-4">
                             <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                 <span className="text-gray-400">Registration Fee</span>
                                 <span className="text-white font-bold">{course.fees.registration}</span>
                             </div>
                             <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                                 <span className="text-gray-400">Payment Terms</span>
                                 <span className="text-white font-bold">Monthly / Annually</span>
                             </div>
                             <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                                 <p className="text-xs text-gray-400 italic leading-relaxed">
                                     *{course.fees.note}
                                 </p>
                             </div>
                         </div>
                         <Button variant="outline" className="w-full" icon={<Download size={16} />}>
                             Download Prospectus
                         </Button>
                     </div>
                 )}
            </div>
        </div>
    );
};

// --- Helper Components for Related Programmes ---
const CourseCard: React.FC<{ offering: Offering }> = ({ offering }) => {
    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const isEcommerce = offering.programmeTypes.some((type: string) => 
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const typeOfStudy = offering.programmeTypes.some(t => t.includes('Online')) ? 'Online' : 'Full-Time';
    const inCompare = isInCompare(offering.id);

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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

    return (
        <>
        <div className="bg-brand-card group rounded-sm overflow-hidden border border-white/10 hover:border-brand-gold/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 relative min-w-[280px] md:min-w-[300px] lg:min-w-[320px] snap-center">
            {/* Image Area */}
            <div className="relative h-64 overflow-hidden shrink-0">
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm shadow-md">
                        {offering.category}
                    </span>
                </div>
                <img 
                    src={offering.image} 
                    alt={offering.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80"></div>
                
                {/* Hover Actions Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#004b78]/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <button 
                        onClick={handleAction}
                        className="flex-[2] bg-brand-gold text-white hover:bg-brand-goldHover text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-sm transition-all flex items-center justify-center gap-2"
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
                        className={`flex-1 bg-transparent border border-white/20 hover:bg-white/5 text-white/70 text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 ${inCompare ? 'bg-white/10 border-brand-gold text-brand-gold' : ''}`}
                    >
                        {inCompare ? <X size={16} /> : <BarChart2 size={16} />}
                        {inCompare ? 'Remove' : 'Compare'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col relative z-10 bg-brand-card">
                <Link to={`/course/${offering.id}`} className="block">
                    <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3 leading-tight group-hover:text-brand-gold transition-colors">{offering.title}</h3>
                </Link>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-muted uppercase tracking-wider mb-4">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-brand-gold/80" />
                        <span>{offering.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-brand-gold/80" />
                        <span>{offering.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-brand-gold/80" />
                        <span>{typeOfStudy}</span>
                    </div>
                </div>

                <p className="text-brand-muted text-sm mb-4 flex-1 line-clamp-3 leading-relaxed font-light">
                    {offering.description}
                </p>
                
                <div className="mb-6 pt-4 border-t border-white/10">
                    <p className="text-3xl font-serif text-brand-gold font-bold">
                        R {offering.price?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Starting: {offering.startDate}</p>
                </div>

                <div className="mt-auto flex gap-3">
                    <Link 
                        to={`/course/${offering.id}`}
                        className="flex-1 bg-transparent border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold font-bold transition-all duration-300 text-[11px] uppercase tracking-widest px-4 py-3 rounded-sm flex items-center justify-center gap-2"
                    >
                        View More
                    </Link>
                    <button 
                        onClick={handleQuickView}
                        className="h-full aspect-square flex items-center justify-center bg-transparent border border-white/20 hover:border-brand-gold hover:text-brand-gold text-white rounded-sm transition-all" 
                        aria-label="Quick View"
                    >
                        <Eye size={20} />
                    </button>
                </div>
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
            courseTitle={offering.title}
        />
        
        <CheckoutModal 
            isOpen={showCheckout}
            onClose={() => setShowCheckout(false)}
        />
        </>
    );
};


export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeYear, setActiveYear] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  
  // Logic to handle entrance animation
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fallback to the first course if ID not found for demo purposes
  const course = id && COURSE_DETAILS[id] ? COURSE_DETAILS[id] : COURSE_DETAILS['1'];
  
  const SECTIONS = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Programme Content' },
    { id: 'focus', label: course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas' },
    { id: 'requirements', label: 'Entry Requirements' },
    { id: 'certification', label: 'Certification' },
    { id: 'faq', label: 'FAQs' },
  ], [course.qualification]);

  const typeOfStudy = course.programmeTypes.some(t => t.includes('Full Time')) ? 'Full Time' : 
                      course.programmeTypes.some(t => t.includes('Part Time')) ? 'Part Time' : 'Online';

  let relatedCourses = OFFERINGS.filter(o => o.category === course.category && o.id !== course.id);
  
  if (relatedCourses.length < 5) {
      const padding = OFFERINGS.filter(o => o.id !== course.id && !relatedCourses.find(r => r.id === o.id));
      relatedCourses = [...relatedCourses, ...padding].slice(0, 5);
      while (relatedCourses.length < 5 && relatedCourses.length > 0) {
          relatedCourses = [...relatedCourses, relatedCourses[0]];
      }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Entrance Animation Effect using GSAP
  useEffect(() => {
      // Check if we came from a shared-element transition
      const isFromTransition = location.state?.fromTransition;
      
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (isFromTransition) {
          // If transition occurred, the hero image is already "there" visually via the clone.
          // We wait slightly (simulating the handoff), then animate content UP.
          // We set initial state to hidden/offset
          if (heroContentRef.current) gsap.set(heroContentRef.current, { y: 30, opacity: 0 });
          if (contentRef.current) gsap.set(contentRef.current, { y: 50, opacity: 0 });

          // Delay slightly to allow the previous page's clone to finish lock-in
          const startDelay = 0.05; 

          tl.to(heroContentRef.current, { y: 0, opacity: 1, duration: 0.8 }, startDelay)
            .to(contentRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");

      } else {
          // Standard Load (Fade in hero image too if desired, but sticking to content fade for consistency)
          // For standard load, we might want to animate the image/video container too if we wanted, 
          // but here we focus on content entrance.
          if (heroContentRef.current) gsap.set(heroContentRef.current, { y: 30, opacity: 0 });
          if (contentRef.current) gsap.set(contentRef.current, { y: 50, opacity: 0 });
          
          tl.to(heroContentRef.current, { y: 0, opacity: 1, duration: 0.8 })
            .to(contentRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
      }

      return () => { tl.kill(); };
  }, [location.state, id]); // Re-run if ID changes

  useEffect(() => {
    const handleScroll = () => {
        const stickyThreshold = window.innerHeight - 60; 
        setShowStickyHeader(window.scrollY > stickyThreshold);

        const offset = 180;
        const scrollPosition = window.scrollY + offset;
        
        let current = SECTIONS[0].id;
        for (const section of SECTIONS) {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                const absoluteTop = rect.top + window.scrollY;
                if (scrollPosition >= absoluteTop) {
                    current = section.id;
                }
            }
        }
        setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [SECTIONS]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        const headerOffset = 130; 
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const slideLeft = () => {
      if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
      }
  };

  const slideRight = () => {
      if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
      }
  };

  if (!course) return <div className="text-white text-center pt-32">Course not found</div>;

  return (
    <div className="min-h-screen bg-brand-dark pt-0">
      
      {/* Sticky Top Bar - Fixed Header (z-60) is above Hero (z-40) */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] bg-brand-dark border-b border-white/10 h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-transform duration-300 shadow-xl ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
         <div className="flex items-center gap-4 h-full">
            <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors h-full">
                <ChevronLeft size={18} /> Back
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <h3 className="text-white font-serif font-bold text-lg truncate max-w-md">{course.title}</h3>
         </div>
         <button 
            onClick={handleScrollTop} 
            className="text-gray-400 hover:text-brand-gold transition-colors p-2"
            title="Scroll to Top"
         >
            <ArrowUpCircle size={28} strokeWidth={1.5} />
         </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end bg-brand-card border-b border-white/5 pb-0 overflow-hidden">
        {/* Z-Index 1: Background Media */}
        <div className="absolute inset-0 overflow-hidden z-[1]">
            <div className="absolute inset-0 bg-[#0a3355]/80 z-10"></div>
            {course.video ? (
                <video
                    src={course.video}
                    // Removed legacy poster to prevent mismatch
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            ) : (
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            )}
        </div>

        {/* Z-Index 20: Content Overlay */}
        <div 
            ref={heroContentRef}
            className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full opacity-0 translate-y-8"
        >
            <div className="lg:w-2/3 pr-0 lg:pr-12 pb-6 md:pb-8"> 
                
                <div className="flex flex-col items-start gap-4 mb-6">
                    <Link to="/" className="inline-flex items-center text-brand-muted hover:text-white text-sm transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Programmes
                    </Link>
                    <div className="bg-brand-gold text-white text-[10px] font-bold px-3 py-1 uppercase rounded-sm tracking-widest">
                        {course.category}
                    </div>
                </div>
                
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-14 leading-tight font-semibold">
                    {course.title}
                </h1>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10"> 
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase tracking-wider">Duration</p>
                            <p className="text-white font-medium">{course.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase tracking-wider">Qualification</p>
                            <p className="text-white font-medium">{course.qualification}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase tracking-wider">Type of Study</p>
                            <p className="text-white font-medium">{typeOfStudy}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase tracking-wider">Next Intake</p>
                            <p className="text-white font-medium">{course.intake || course.startDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 opacity-0 translate-y-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 pb-12">
                
                {/* Sticky Tabbed Navigation */}
                <div 
                    className={`sticky z-50 bg-brand-dark/95 backdrop-blur border-b border-white/10 mb-8 -mx-4 px-4 md:mx-0 md:px-0 transition-[top] duration-300 ${showStickyHeader ? 'top-[60px]' : 'top-0'}`}
                >
                     <div className="flex overflow-x-auto scrollbar-hide gap-8">
                         {SECTIONS.map(sec => (
                             <button 
                                key={sec.id}
                                onClick={() => scrollToSection(sec.id)}
                                className={`whitespace-nowrap py-4 relative text-[11px] md:text-xs font-bold uppercase tracking-widest transition-colors ${activeSection === sec.id ? 'text-brand-gold' : 'text-gray-500 hover:text-white'}`}
                             >
                                {sec.label}
                                {activeSection === sec.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold rounded-full"></div>
                                )}
                             </button>
                         ))}
                     </div>
                </div>

                {/* Overview */}
                <div id="overview" className="scroll-mt-48 mb-16">
                    <h2 className="text-2xl font-serif text-white mb-6 font-semibold">Overview</h2>
                    <p className="text-lg text-brand-muted leading-relaxed mb-8 font-light">
                        {course.fullDescription}
                    </p>
                </div>
                
                {/* Content */}
                <div id="content" className="scroll-mt-48 mb-16">
                    {course.programContentIncludes && (
                        <div className="mb-12">
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Programme Content Includes:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.programContentIncludes.map((item, idx) => (
                                    <div key={idx} className="bg-brand-card border border-white/5 p-4 rounded-sm flex items-center gap-3 hover:border-brand-gold/30 transition-colors">
                                        <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                                            <Circle size={10} fill="currentColor" />
                                        </div>
                                        <span className="text-white font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!course.extendedFocusAreas && (
                        <>
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Programme Curriculum
                            </h3>

                            <div className="space-y-4">
                                {course.curriculum.map((year, idx) => (
                                    <AccordionItem 
                                        key={idx} 
                                        title={year.year} 
                                        isOpen={activeYear === idx}
                                        onToggle={() => setActiveYear(activeYear === idx ? null : idx)}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {year.modules.map((mod, mIdx) => (
                                                <div key={mIdx} className="bg-brand-dark p-4 rounded-sm border border-white/5">
                                                    <h5 className="text-brand-gold font-bold mb-2">{mod.title}</h5>
                                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                                        {mod.topics.map((t, tIdx) => (
                                                            <li key={tIdx}>{t}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Focus Areas */}
                <div id="focus" className="scroll-mt-48 mb-16">
                    {course.extendedFocusAreas ? (
                        <div>
                             <h3 className="text-white font-serif text-2xl mb-2 flex items-center gap-3 font-semibold">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Choose Your Degree Focus Area:
                            </h3>
                            <p className="text-brand-gold mb-8 text-sm italic font-medium">
                                All the below focus areas include masterclass specialisation sessions and Work Integrated Learning projects.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {course.extendedFocusAreas.map((area, idx) => (
                                    <div key={idx} className="bg-brand-card p-6 rounded-sm border-l-4 border-brand-gold/50 hover:border-brand-gold transition-colors flex flex-col h-full">
                                        <h4 className="text-brand-gold font-serif font-bold text-xl mb-3">{area.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                                            {area.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : course.focusAreas ? (
                        <div>
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Focus Areas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.focusAreas.map((area, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 bg-brand-card p-6 rounded-sm border border-brand-gold/20 hover:border-brand-gold transition-colors">
                                        <h4 className="text-brand-gold font-bold text-lg">{area}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Requirements */}
                <div id="requirements" className="scroll-mt-48 mb-16">
                    <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Entry Requirements
                    </h3>
                    <div className="bg-brand-card p-8 rounded-sm border-l-4 border-brand-gold">
                        <ul className="space-y-4">
                            {course.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} />
                                    <span className="text-brand-muted">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Certification */}
                {course.certification && (
                    <div id="certification" className="scroll-mt-48 mb-16">
                        <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                            <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                            Certification
                        </h3>
                        <div className="bg-brand-card border border-white/5 p-8 rounded-sm">
                             <div className="flex items-start gap-4 mb-6">
                                 <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                                     <Award size={24} />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold text-lg mb-2">Qualification Awarded</h4>
                                     <p className="text-brand-muted text-base leading-relaxed whitespace-pre-line">
                                        {course.certification}
                                     </p>
                                 </div>
                             </div>
                             
                             <div className="border-t border-white/5 pt-6">
                                <h5 className="text-xs text-brand-muted uppercase tracking-widest font-bold mb-4">Accredited By:</h5>
                                <div className="flex flex-wrap gap-4">
                                    {course.accreditations.map((acc, idx) => (
                                        <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-sm p-3 flex items-center justify-center h-14 px-4 hover:bg-white/15 transition-colors">
                                            {ACCREDITATION_LOGOS[acc] ? (
                                                <img src={ACCREDITATION_LOGOS[acc]} alt={acc} className="max-h-full w-auto brightness-0 invert opacity-90" />
                                            ) : (
                                                <span className="text-xs text-center font-bold text-white uppercase tracking-wider">{acc}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>
                )}
                
                {/* FAQs */}
                <div id="faq" className="scroll-mt-48 mb-16">
                     <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3 font-semibold">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        <AccordionItem 
                            title="What is the difference between the Diploma and Degree?" 
                            isOpen={activeFaq === 0} 
                            onToggle={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                        >
                            <div className="space-y-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-base">IHS Diploma Programmes (NQF Level 6, 3 years)</h4>
                                    <p className="mb-3 text-brand-muted">Focuses primarily on the service delivery & operations management of the different departments of a hospitality establishment, namely:</p>
                                    <ul className="grid grid-cols-2 gap-2 list-disc list-inside text-gray-400 mb-3 bg-white/5 p-4 rounded-sm">
                                        <li>Front Office</li>
                                        <li>Food & Beverage</li>
                                        <li>Kitchens</li>
                                        <li>Housekeeping</li>
                                    </ul>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="font-bold text-white mb-2 text-base">IHS Bachelor of Business Administration (NQF Level 7, 3 years)</h4>
                                    <p className="mb-3 text-brand-muted">Focuses primarily on the strategic management of a hospitality establishment and its operations.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem 
                            title="What is the difference between completing a BBA, BCom or BA Degree?" 
                            isOpen={activeFaq === 1} 
                            onToggle={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                        >
                             <div className="space-y-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-base">Bachelor of Business Administration (BBA)</h4>
                                    <p className="text-brand-muted">A BBA Degree covers the fundamentals of business management and prepares a student for a career in leadership.</p>
                                </div>
                             </div>
                        </AccordionItem>
                    </div>
                </div>

                {/* Application Form */}
                <div id="apply-form" className="bg-brand-card border border-white/10 rounded-sm p-8 scroll-mt-32">
                    {formSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4">Application Received</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Thank you for your interest. Our admissions team will review your application and contact you within 24-48 hours.
                            </p>
                            <Button variant="outline" onClick={() => setFormSuccess(false)}>
                                Submit Another Application
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-serif text-white mb-2 font-semibold">Apply for this Programme</h3>
                                <p className="text-brand-muted text-sm">Start your journey today. Fill in your details below.</p>
                            </div>

                            <MultiStepForm onComplete={() => setFormSuccess(true)} />
                        </>
                    )}
                </div>

            </div>

            {/* Sticky Sidebar (Fees) */}
            <div className="lg:col-span-1 hidden lg:block relative">
                <div className="sticky top-[130px] space-y-6 lg:-mt-72 transition-[top] duration-300">
                    <FeesCard course={course} className="shadow-2xl shadow-black/50" />
                    
                    <div className="bg-brand-card border border-white/5 p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Need Guidance?</h4>
                                <p className="text-xs text-gray-400">Our admissions team is here to help.</p>
                            </div>
                        </div>
                        <a href="tel:+123456789" className="text-brand-gold text-sm font-bold hover:underline flex items-center justify-center gap-2 w-full border border-brand-gold/20 py-3 rounded-sm hover:bg-brand-gold hover:text-white transition-all">
                            Call +27 12 345 6789
                        </a>
                    </div>
                </div>
            </div>

        </div>

        {/* Related Programmes Section */}
        {relatedCourses.length > 0 && (
             <div className="border-t border-white/5 pt-16 pb-24 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    <div className="lg:col-span-1 lg:sticky lg:top-[150px]">
                        <h3 className="text-white font-serif text-3xl leading-tight mb-6 font-semibold">
                            Courses related to <br/>
                            <span className="text-brand-gold italic">{course.title}</span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Explore other programmes in {course.category} that might interest you.
                        </p>
                        <div className="flex gap-2">
                            <button 
                                onClick={slideLeft}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-white transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={slideRight}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-white transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-3 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <div 
                            ref={sliderRef}
                            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-thin scroll-smooth items-stretch"
                        >
                            {relatedCourses.map(related => (
                                <CourseCard key={related.id} offering={related} />
                            ))}
                        </div>
                    </div>
                </div>
             </div>
        )}

      </div>
      
      <MobileFeesDrawer course={course} />
      <div className="h-20 lg:hidden"></div>

    </div>
  );
};