
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSE_DETAILS, OFFERINGS, ACCREDITATION_LOGOS } from '../constants';
import { Button } from './ui/Button';
import { AccordionItem } from './ui/Accordion';
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
  Briefcase,
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
  Target,
  Circle,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Offering } from '../types';
import { QuickViewModal } from './QuickViewModal';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';

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
                <span className="text-brand-dark font-bold uppercase tracking-widest text-sm">2025 Fees</span>
            </div>
            <div className="p-6 md:p-8 text-center">
                <p className="text-brand-muted text-sm mb-2">Per Year</p>
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
                 <div className="p-4 flex items-center justify-between bg-[#162036] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
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
        {/* Adjusted min-width to ensure the "cut-off" look for 4th card in a col-span-3 area */}
        <div className="bg-brand-card group rounded-lg overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 relative min-w-[280px] md:min-w-[300px] lg:min-w-[320px] snap-center">
            {/* Image Area */}
            <div className="relative h-60 overflow-hidden shrink-0">
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
                
                {/* Hover Actions Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#131B2C]/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <button 
                        onClick={handleAction}
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

            {/* Content Area - Flex 1 ensures it fills available space, flex-col organizes inner content */}
            <div className="p-6 flex-1 flex flex-col relative z-10 bg-brand-card">
                <Link to={`/course/${offering.id}`} className="block">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 leading-tight group-hover:text-brand-gold transition-colors">{offering.title}</h3>
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
  
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fallback to the first course if ID not found for demo purposes
  const course = id && COURSE_DETAILS[id] ? COURSE_DETAILS[id] : COURSE_DETAILS['1'];
  
  // Define Sections dynamically based on course
  const SECTIONS = useMemo(() => [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Programme Content' },
    { id: 'focus', label: course.qualification === 'Degree' ? 'Degree Focus Area' : 'Focus Areas' },
    { id: 'requirements', label: 'Entry Requirements' },
    { id: 'certification', label: 'Certification' },
    { id: 'faq', label: 'FAQs' },
  ], [course.qualification]);

  // Extract proper "Type of Study" based on Delivery Mode or Programme Type logic for display
  const typeOfStudy = course.programmeTypes.some(t => t.includes('Full Time')) ? 'Full Time' : 
                      course.programmeTypes.some(t => t.includes('Part Time')) ? 'Part Time' : 'Online';

  // Prepare Related Courses for Testing (Force at least 5)
  // Get courses in same category, exclude current
  let relatedCourses = OFFERINGS.filter(o => o.category === course.category && o.id !== course.id);
  
  // TESTING ONLY: Pad with other courses to reach minimum of 5 for slider demo
  if (relatedCourses.length < 5) {
      const padding = OFFERINGS.filter(o => o.id !== course.id && !relatedCourses.find(r => r.id === o.id));
      relatedCourses = [...relatedCourses, ...padding].slice(0, 5);
      
      // If still < 5 (small dataset), duplicate existing
      while (relatedCourses.length < 5 && relatedCourses.length > 0) {
          relatedCourses = [...relatedCourses, relatedCourses[0]];
      }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Enhanced Scroll Spy Logic & Sticky Header
  useEffect(() => {
    const handleScroll = () => {
        // Sticky Header logic
        const stickyThreshold = window.innerHeight - 60; 
        setShowStickyHeader(window.scrollY > stickyThreshold);

        // Scroll Spy
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
        // Sticky Header (60px) + Tab Nav (58px) + Buffer
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
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .scrollbar-thin::-webkit-scrollbar {
            height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #C5A059;
        }
      `}</style>
      
      {/* Sticky Top Bar - Replaces Main Header on Scroll */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#0B1221] border-b border-white/10 h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-transform duration-300 shadow-xl ${showStickyHeader ? 'translate-y-0' : '-translate-y-full'}`}
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

      {/* Hero Section - Full Height */}
      <section className="relative h-screen flex flex-col justify-end bg-brand-card border-b border-white/5 pb-0">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-brand-dark/80 z-10"></div>
            <img src={course.image} alt={course.title} className="w-full h-full object-cover blur-sm" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="lg:w-2/3 pr-0 lg:pr-12 pb-6 md:pb-8"> {/* Reduced padding bottom to refine gap */}
                
                {/* Updated Header Layout: Category below Back Link */}
                <div className="flex flex-col items-start gap-4 mb-6">
                    <Link to="/" className="inline-flex items-center text-brand-muted hover:text-white text-sm transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Programmes
                    </Link>
                    <div className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 uppercase rounded-sm tracking-wider">
                        {course.category}
                    </div>
                </div>
                
                {/* Increased mb-10 to mb-14 for larger gap */}
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-14 leading-tight">
                    {course.title}
                </h1>
                
                {/* Increased pt-6 to pt-10 for larger gap */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10"> 
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase">Duration</p>
                            <p className="text-white font-medium">{course.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <GraduationCap size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase">Qualification</p>
                            <p className="text-white font-medium">{course.qualification}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase">Type of Study</p>
                            <p className="text-white font-medium">{typeOfStudy}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold shrink-0">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted uppercase">Next Intake</p>
                            <p className="text-white font-medium">{course.intake || course.startDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 pb-12">
                
                {/* Sticky Tabbed Navigation - Positioned immediately after hero */}
                <div 
                    className={`sticky z-50 bg-brand-dark/95 backdrop-blur border-b border-white/10 mb-8 -mx-4 px-4 md:mx-0 md:px-0 transition-[top] duration-300 ${showStickyHeader ? 'top-[60px]' : 'top-0'}`}
                >
                     <div className="flex overflow-x-auto scrollbar-hide gap-8">
                         {SECTIONS.map(sec => (
                             <button 
                                key={sec.id}
                                onClick={() => scrollToSection(sec.id)}
                                className={`whitespace-nowrap py-4 relative text-sm font-bold uppercase tracking-wide transition-colors ${activeSection === sec.id ? 'text-brand-gold' : 'text-gray-500 hover:text-white'}`}
                             >
                                {sec.label}
                                {activeSection === sec.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold rounded-full"></div>
                                )}
                             </button>
                         ))}
                     </div>
                </div>

                {/* Overview Section */}
                <div id="overview" className="scroll-mt-48 mb-16">
                    <h2 className="text-2xl font-serif text-white mb-6">Overview</h2>
                    
                    {/* Just Description in Overview now, as Certification/Requirements have moved */}
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        {course.fullDescription}
                    </p>
                </div>
                
                {/* ... rest of content ... */}

                {/* Programme Content (Curriculum/Focus Areas) Section */}
                <div id="content" className="scroll-mt-48 mb-16">
                    
                    {/* Programme Content Highlights Grid (if available) - Always show if present */}
                    {course.programContentIncludes && (
                        <div className="mb-12">
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Programme Content Includes:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.programContentIncludes.map((item, idx) => (
                                    <div key={idx} className="bg-[#131B2C] border border-white/5 p-4 rounded-sm flex items-center gap-3 hover:border-brand-gold/30 transition-colors">
                                        <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                                            <Circle size={10} fill="currentColor" />
                                        </div>
                                        <span className="text-white font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Standard Curriculum Accordion if NOT specific BBA with hidden curriculum */}
                    {!course.extendedFocusAreas && (
                        <>
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
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

                {/* Degree Focus Area / Focus Areas */}
                <div id="focus" className="scroll-mt-48 mb-16">
                    {course.extendedFocusAreas ? (
                        /* Special Layout for BBA Focus Areas */
                        <div>
                             <h3 className="text-white font-serif text-2xl mb-2 flex items-center gap-3">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Choose Your Degree Focus Area:
                            </h3>
                            <p className="text-brand-gold mb-8 text-sm italic font-medium">
                                All the below focus areas include masterclass specialisation sessions and Work Integrated Learning projects.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {course.extendedFocusAreas.map((area, idx) => (
                                    <div key={idx} className="bg-[#131B2C] p-6 rounded-sm border-l-4 border-brand-gold/50 hover:border-brand-gold transition-colors flex flex-col h-full">
                                        <h4 className="text-brand-gold font-serif font-bold text-xl mb-3">{area.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                                            {area.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <p className="mt-8 text-xs text-gray-500 italic">
                                *In the case of insufficient interest in one of the Focus Areas, or other unforeseen circumstances, IHS reserves the right to omit that Focus Area for the year in question.
                            </p>
                        </div>
                    ) : course.focusAreas ? (
                        /* Standard Focus Areas */
                        <div>
                            <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                                Focus Areas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.focusAreas.map((area, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 bg-[#131B2C] p-6 rounded-sm border border-brand-gold/20 hover:border-brand-gold transition-colors">
                                        <h4 className="text-brand-gold font-bold text-lg">{area}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Entry Requirements Section - Standalone */}
                <div id="requirements" className="scroll-mt-48 mb-16">
                    <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Entry Requirements
                    </h3>
                    <div className="bg-brand-card p-8 rounded-sm border-l-4 border-brand-gold">
                        <ul className="space-y-4">
                            {course.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Certification Section - Standalone */}
                {course.certification && (
                    <div id="certification" className="scroll-mt-48 mb-16">
                        <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                            Certification
                        </h3>
                        <div className="bg-[#131B2C] border border-white/5 p-8 rounded-sm">
                             <div className="flex items-start gap-4 mb-6">
                                 <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold shrink-0">
                                     <Award size={24} />
                                 </div>
                                 <div>
                                     <h4 className="text-white font-bold text-lg mb-2">Qualification Awarded</h4>
                                     <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                                        {course.certification}
                                     </p>
                                 </div>
                             </div>
                             
                             {/* Accreditation Logos */}
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
                
                {/* FAQ Section */}
                <div id="faq" className="scroll-mt-48 mb-16">
                     <h3 className="text-white font-serif text-2xl mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        {/* Question 1 */}
                        <AccordionItem 
                            title="What is the difference between the Diploma and Degree?" 
                            isOpen={activeFaq === 0} 
                            onToggle={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                        >
                            <div className="space-y-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-base">IHS Diploma Programmes (NQF Level 6, 3 years)</h4>
                                    <p className="mb-3">Focuses primarily on the service delivery & operations management of the different departments of a hospitality establishment, namely:</p>
                                    <ul className="grid grid-cols-2 gap-2 list-disc list-inside text-gray-400 mb-3 bg-white/5 p-4 rounded-sm">
                                        <li>Front Office</li>
                                        <li>Food & Beverage</li>
                                        <li>Kitchens</li>
                                        <li>Housekeeping</li>
                                    </ul>
                                    <p>This is a balanced theory & practical based programme with 50% of the academic year spent in the classroom and 50% working in industry. As a result, the student receives an extensive working understanding of the operations management of a hospitality establishment.</p>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="font-bold text-white mb-2 text-base">IHS Bachelor of Business Administration in Hospitality Operations Management (NQF Level 7, 3 years)</h4>
                                    <p className="mb-3">Focuses primarily on the strategic management of a hospitality establishment and its operations. Strong leadership capabilities, the ability to apply strategic thinking and strong numerical application is learnt. The core subjects are Hospitality Management and Hospitality Operations.</p>
                                    <p className="mb-2 text-brand-gold text-xs uppercase tracking-wider font-bold">Curriculum Fields Covered:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-gray-400 mb-3 bg-white/5 p-4 rounded-sm">
                                        <li>Financial Management</li>
                                        <li>Accounting Principles</li>
                                        <li>Statistics for Business</li>
                                        <li>Marketing</li>
                                        <li>Human Resources</li>
                                        <li>Management Information Systems</li>
                                        <li>Project Management</li>
                                        <li>Corporate Governance</li>
                                    </ul>
                                    <p>This is a theory-based programme and as a result the student achieves an extensive understanding of the business operation of a hospitality establishment.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        {/* Question 2 */}
                        <AccordionItem 
                            title="What is the difference between completing a BBA, BCom or BA Degree?" 
                            isOpen={activeFaq === 1} 
                            onToggle={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                        >
                             <div className="space-y-6 text-sm">
                                <div>
                                    <h4 className="font-bold text-white mb-2 text-base">Bachelor of Business Administration (BBA)</h4>
                                    <p>A BBA Degree covers the fundamentals of business management and prepares a student for a career in leadership or management in a selected industry. This degree covers subjects such as Strategy, Human Resources, Marketing, Project Management and Financial Management (accounting, financial principals & statistics).</p>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="font-bold text-white mb-2 text-base">Bachelor of Commerce (BCom)</h4>
                                    <p>A BCom Degree is commerce based with a financial focus covering subjects such as Accounting I, 2 & 3, Economics, Commercial Law, Taxation and Auditing.</p>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="font-bold text-white mb-2 text-base">Bachelor of Arts (BA)</h4>
                                    <p>A BA Degree is a broad qualification within the humanities, such as Psychology, Political Science, Drama and journalism.</p>
                                </div>
                             </div>
                        </AccordionItem>
                        
                        {/* Question 3 */}
                        <AccordionItem 
                            title="Do the Degree students complete Work Integrated Learning (WIL)?" 
                            isOpen={activeFaq === 2} 
                            onToggle={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                        >
                             <div className="space-y-4 text-sm">
                                <p>Yes, students will complete 1 month (4 Weeks) of practical work experience in leading hospitality establishments. This will be completed at the end of the theory year, during the 3 months break over December - February each year.</p>
                                <p className="font-bold text-white">Each student will be placed in industry to experience the following areas:</p>
                                <ul className="grid grid-cols-2 gap-2 list-disc list-inside text-gray-400 bg-white/5 p-4 rounded-sm">
                                    <li>Sales & Marketing/Events and Banqueting</li>
                                    <li>Front Office</li>
                                    <li>Human Resources</li>
                                    <li>Housekeeping</li>
                                    <li>Procurement</li>
                                    <li>Finance</li>
                                </ul>
                             </div>
                        </AccordionItem>

                        {/* Question 4 */}
                        <AccordionItem 
                            title="Can current Diploma students articulate into the Degree?" 
                            isOpen={activeFaq === 3} 
                            onToggle={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                        >
                             <div className="space-y-4 text-sm">
                                <p>Yes, Diploma students can. They would qualify for credits for End User Computing and Business Communication in the first year of their BBA Degree.</p>
                                <p>They could also apply for Recognition of Prior Learning (RPL) pertaining to their Work Integrated Learning (WIL) that has been completed in their Diploma qualification.</p>
                                <div className="bg-brand-gold/10 p-4 border-l-2 border-brand-gold">
                                    <p className="text-gray-300 italic">It is important to note that the Degree and Diploma programme content differs extensively. Please refer to Question 1 for the focus areas per programme.</p>
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
                                <h3 className="text-2xl font-serif text-white mb-2">Apply for this Programme</h3>
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
                    
                    {/* Finance & Payment Options Block */}
                    <div className="bg-brand-dark border border-white/5 p-6 rounded-sm space-y-6 hidden">
                        {/* Payment Options */}
                        <div>
                            <h4 className="text-white font-bold text-sm mb-2 border-b border-white/5 pb-2">Payment Options</h4>
                            <p className="text-xs text-gray-400 mb-3">The following payment options are available:</p>
                            <div className="bg-white p-2 rounded-sm">
                                <img src="https://www.hotelschool.co.za/wp-content/uploads/2020/08/payment-logos.png" alt="Payment Options" className="w-full h-auto" />
                            </div>
                        </div>

                        {/* Interest Free Plans */}
                        <div>
                             <h4 className="text-white font-bold text-sm mb-2 border-b border-white/5 pb-2">Interest Free Payment Plans</h4>
                             <p className="text-xs text-brand-gold italic">Speak to our consultants about available Payment Plans</p>
                        </div>

                        {/* Student Hero Finance */}
                        <div>
                             <h4 className="text-white font-bold text-sm mb-2 border-b border-white/5 pb-2">Finance facilitated by:</h4>
                             <div className="bg-white p-3 rounded-sm mb-4">
                                <img src="https://www.hotelschool.co.za/wp-content/uploads/2021/06/Student-Hero_logo-2x1-1.png" alt="Student Hero" className="w-full h-auto" />
                             </div>
                             <a href="https://www.studenthero.co.za" target="_blank" rel="noopener noreferrer" className="block text-center bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider py-3 rounded-sm hover:bg-white transition-colors">
                                Apply For Finance
                             </a>
                        </div>
                    </div>

                    <div className="bg-brand-dark border border-white/5 p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-gold">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Need Guidance?</h4>
                                <p className="text-xs text-gray-400">Our admissions team is here to help.</p>
                            </div>
                        </div>
                        <a href="tel:+123456789" className="text-brand-gold text-sm font-bold hover:underline flex items-center justify-center gap-2 w-full border border-brand-gold/20 py-3 rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-all">
                            Call +27 12 345 6789
                        </a>
                    </div>
                </div>
            </div>

        </div>

        {/* Related Programmes Section - Redesigned */}
        {relatedCourses.length > 0 && (
             <div className="border-t border-white/5 pt-16 pb-24 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    
                    {/* Left Block: Title & Navigation */}
                    <div className="lg:col-span-1 lg:sticky lg:top-[150px]">
                        <h3 className="text-white font-serif text-3xl leading-tight mb-6">
                            Courses related to <br/>
                            <span className="text-brand-gold italic">{course.title}</span>
                        </h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Explore other programmes in {course.category} that might interest you.
                        </p>
                        <div className="flex gap-2">
                            <button 
                                onClick={slideLeft}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={slideRight}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Block: Slider */}
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
      
      {/* Mobile Sticky Fees Drawer */}
      <MobileFeesDrawer course={course} />
      
      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden"></div>

    </div>
  );
};
