
import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NAV_LINKS, MORE_MENU_LINKS, OFFERINGS } from '../constants';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';

const PROGRAMME_TYPES = [
    { label: 'Full Time Learning', value: 'Full Time Learning' },
    { label: 'Blended Learning', value: 'Blended Learning' },
    { label: 'In-Service Traineeship', value: 'In-Service Traineeship' },
    { label: 'Part Time Learning', value: 'Part Time Learning' },
    { label: 'Online Learning', value: 'Online Learning' },
];

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Panel {
    id: string;
    title: string;
    data?: any;
    previousTitle?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [panels, setPanels] = useState<Panel[]>([{ id: 'main', title: 'Main Menu' }]);

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setPanels([{ id: 'main', title: 'Main Menu' }]);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const pushPanel = (panel: Panel) => {
        setPanels(prev => [...prev, panel]);
    };

    const popPanel = () => {
        setPanels(prev => prev.slice(0, -1));
    };

    const handleLinkClick = (to: string) => {
        onClose();
        if (to.startsWith('#')) {
             const el = document.getElementById(to.substring(1));
             if(el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
             navigate(to);
        }
    };

    // Helper to determine if a course is e-commerce (Buy Now) vs Application (Apply Now)
    const checkIsEcommerce = (course: Offering) => {
        // Academic qualifications are always Apply Now, even if Online
        if (['Degree', 'Diploma', 'Certificate', 'Higher Certificate'].includes(course.qualification)) {
            return false;
        }
        // Specialisations and Short Courses are Buy Now
        if (['Specialisation', 'Short Course'].includes(course.qualification)) {
            return true;
        }
        // Fallback for other types
        return false;
    };

    const handleApplyClick = (course: Offering) => {
        onClose();
        const isEcommerce = checkIsEcommerce(course);

        if (isEcommerce) {
            addToCart(course);
        } else {
            navigate(`/course/${course.id}`);
        }
    };

    // --- Panel Renderers ---

    const renderMainPanel = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto py-2">
                 <div className="px-0">
                     <div className="space-y-0 divide-y divide-gray-100">
                        {NAV_LINKS.map(link => (
                            link.label === 'Our Programmes' ? (
                                <button
                                    key={link.label}
                                    onClick={() => pushPanel({ id: 'programmes', title: 'Our Programmes', previousTitle: 'Main Menu' })}
                                    className="w-full flex items-center justify-between text-lg font-bold text-[#002B4E] py-5 px-6 hover:bg-gray-50 transition-colors"
                                >
                                    {link.label}
                                    <ChevronRight size={20} className="text-brand-accent" />
                                </button>
                            ) : (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => handleLinkClick(link.href)}
                                    className="block text-lg font-bold text-[#002B4E] py-5 px-6 hover:bg-gray-50 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                     </div>
                 </div>

                 <div className="px-6 mt-8">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">More</p>
                     <div className="space-y-4">
                        {MORE_MENU_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => handleLinkClick(link.href)}
                                className="block text-base font-medium text-gray-600 hover:text-[#C2B067] transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                     </div>
                 </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                    <button className="py-3 px-4 border border-[#002B4E] text-[#002B4E] text-xs font-bold uppercase rounded-sm text-center tracking-[1px]">
                        Login
                    </button>
                    <button className="py-3 px-4 bg-[#002B4E] text-white text-xs font-bold uppercase rounded-sm text-center tracking-[1px]">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );

    const renderProgrammesPanel = () => (
        <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-y-auto pb-12">
                
                {/* Only Programme Types */}
                <div className="mb-2">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Programme Type</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {PROGRAMME_TYPES.map(type => (
                            <button
                                key={type.value}
                                onClick={() => pushPanel({ id: 'type', title: type.label, previousTitle: 'Programmes', data: type.value })}
                                className="w-full flex items-center justify-between text-base font-bold text-[#002B4E] py-4 px-6 hover:bg-gray-50 transition-colors"
                            >
                                {type.label}
                                <ChevronRight size={18} className="text-gray-300" />
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );

    const renderTypePanel = (type: string) => {
        // Filter Offerings for this type
        const courses = OFFERINGS.filter(o => o.programmeTypes.includes(type));
        
        // Extract available filters for this type
        const uniqueFocusAreas = Array.from(new Set(courses.map(o => o.category))).sort();
        const uniqueLevels = Array.from(new Set(courses.map(o => o.qualification))).sort();

        return (
            <div className="flex flex-col h-full bg-white">
                <div className="p-6 bg-brand-surface border-b border-gray-100">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        Explore our {type} offerings.
                    </p>
                    <button
                         onClick={() => pushPanel({ 
                            id: 'course_list', 
                            title: `All ${type}`, 
                            previousTitle: type, 
                            data: courses 
                        })}
                        className="inline-flex items-center text-xs font-bold text-[#C2B067] uppercase hover:underline tracking-[1px]"
                    >
                        View All {type.replace(' Learning', '').replace('Traineeship', 'Traineeships')} <ArrowRight size={14} className="ml-2" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pb-12">
                     {/* Focus Areas */}
                     <div className="mb-2">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focus Areas</p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {uniqueFocusAreas.map(area => (
                                <button
                                    key={area}
                                    onClick={() => {
                                        const filtered = courses.filter(c => c.category === area);
                                        pushPanel({ 
                                            id: 'course_list', 
                                            title: area, 
                                            previousTitle: type,
                                            data: filtered 
                                        });
                                    }}
                                    className="w-full flex items-center justify-between text-base font-bold text-[#002B4E] py-4 px-6 hover:bg-gray-50 transition-colors"
                                >
                                    {area}
                                    <ChevronRight size={18} className="text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Level of Study */}
                    <div>
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 border-t border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Level of Study</p>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {uniqueLevels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        const filtered = courses.filter(c => c.qualification === level);
                                        pushPanel({ 
                                            id: 'course_list', 
                                            title: level, 
                                            previousTitle: type,
                                            data: filtered 
                                        });
                                    }}
                                    className="w-full flex items-center justify-between text-base font-bold text-[#002B4E] py-4 px-6 hover:bg-gray-50 transition-colors"
                                >
                                    {level}
                                    <ChevronRight size={18} className="text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCourseListPanel = (courses: Offering[]) => {
        return (
            <div className="flex flex-col h-full bg-white">
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{courses.length} Programmes Found</p>
                    <div className="space-y-0">
                        {courses.length > 0 ? courses.map((course, index) => {
                            const isEcommerce = checkIsEcommerce(course);
                            const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]';
                            
                            return (
                            <div
                                key={course.id}
                                className={`py-6 px-4 ${bgClass} border-b border-gray-100 last:border-0`}
                            >
                                {/* Row 1: Meta (Duration, Qualification, Category) */}
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider mb-3">
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <Clock size={12} />
                                        <span>{course.duration}</span>
                                    </div>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">{course.qualification}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-brand-accent">{course.category}</span>
                                </div>

                                {/* Row 2: Title */}
                                <Link 
                                    to={`/course/${course.id}`}
                                    onClick={() => handleLinkClick(`/course/${course.id}`)}
                                    className="block mb-6"
                                >
                                    <h4 className="text-lg font-serif font-bold text-[#002B4E] leading-tight hover:text-brand-accent transition-colors">
                                        {course.title}
                                    </h4>
                                </Link>

                                {/* Row 3: Tuition & Intake */}
                                <div className="flex justify-between items-end mb-6 border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Tuition</p>
                                        <p className="text-base font-bold text-[#002B4E]">R {course.price?.toLocaleString() || 'TBA'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Next Intake</p>
                                        <p className="text-xs font-bold text-[#002B4E]">{course.startDate}</p>
                                    </div>
                                </div>

                                {/* Row 4: Actions */}
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleLinkClick(`/course/${course.id}`)}
                                        className="flex-1 py-3 border border-[#002B4E] text-[#002B4E] rounded-sm text-[10px] font-bold uppercase hover:bg-[#002B4E] hover:text-white transition-colors tracking-[1px] text-center"
                                    >
                                        Learn More
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleApplyClick(course)}
                                        className="flex-1 py-3 bg-[#002B4E] text-white text-[10px] font-bold uppercase rounded-sm hover:bg-[#C2B067] hover:text-[#002B4E] transition-colors shadow-none tracking-[1px] text-center flex items-center justify-center gap-2"
                                    >
                                        {isEcommerce ? 'Buy Now' : 'Apply Now'}
                                    </button>
                                </div>
                            </div>
                        )}) : (
                            <div className="text-center py-8 text-gray-400 italic">
                                No courses found for this selection.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const getPanelContent = (panel: Panel) => {
        switch(panel.id) {
            case 'main': return renderMainPanel();
            case 'programmes': return renderProgrammesPanel();
            case 'type': return renderTypePanel(panel.data);
            case 'course_list': return renderCourseListPanel(panel.data);
            default: return null;
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-[150] lg:hidden transition-visibility duration-500 ${isOpen ? 'visible' : 'invisible delay-500'}`}
        >
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Main Menu Container (Left Aligned) */}
            <div 
                className={`absolute top-0 left-0 h-full w-full max-w-[85%] sm:max-w-md bg-[#002B4E] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Panel Stack */}
                <div className="relative w-full h-full overflow-hidden bg-white">
                    {panels.map((panel, index) => {
                        const isMain = panel.id === 'main';
                        // All panel headers now use Brand Blue as requested
                        const headerBg = 'bg-[#002B4E]';
                        const headerText = 'text-white';
                        const closeBtn = 'text-white';
                        
                        return (
                            <div
                                key={`${panel.id}-${index}`}
                                className={`absolute inset-0 bg-white flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[-10px_0_30px_rgba(0,0,0,0.1)]`}
                                style={{ 
                                    zIndex: 10 + index,
                                    transform: 'translateX(0%)',
                                    animation: index > 0 ? 'slideInRight 0.4s cubic-bezier(0.32,0.72,0,1) forwards' : 'none'
                                }}
                            >
                                {/* Header (Unique per panel or Shared logic) */}
                                <div className="shrink-0 relative z-10">
                                    {/* Top Bar: Brand/Title + Close */}
                                    <div className={`h-[70px] ${headerBg} flex items-center justify-between px-6 transition-colors duration-300`}>
                                        <h2 className={`${headerText} font-serif font-bold text-xl tracking-wide truncate pr-4`}>
                                            {isMain ? 'International Hotel School' : panel.title}
                                        </h2>
                                        {/* Animated Close Icon matching Header */}
                                        <button 
                                            onClick={onClose}
                                            className={`${closeBtn} h-[40px] w-[40px] flex items-center justify-center hover:opacity-70 transition-opacity`}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 100 100" className="overflow-visible">
                                                <path
                                                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: 'currentColor',
                                                        strokeWidth: 8,
                                                        strokeLinecap: 'round',
                                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                                        strokeDasharray: isOpen ? '90 207' : '60 207',
                                                        strokeDashoffset: isOpen ? -134 : 0
                                                    }}
                                                />
                                                <path
                                                    d="M 20,50 H 80"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: 'currentColor',
                                                        strokeWidth: 8,
                                                        strokeLinecap: 'round',
                                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                                        strokeDasharray: isOpen ? '1 60' : '60 60',
                                                        strokeDashoffset: isOpen ? -30 : 0
                                                    }}
                                                />
                                                <path
                                                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: 'currentColor',
                                                        strokeWidth: 8,
                                                        strokeLinecap: 'round',
                                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                                        strokeDasharray: isOpen ? '90 207' : '60 207',
                                                        strokeDashoffset: isOpen ? -134 : 0
                                                    }}
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Back Strip (Only for sub-panels) */}
                                    {!isMain && (
                                        <button
                                            onClick={popPanel}
                                            className="w-full flex items-center gap-2 px-6 py-3 bg-[#e5e5e5] text-[#002B4E] hover:bg-[#d4d4d4] transition-colors border-b border-gray-200"
                                        >
                                            <ArrowLeft size={16} strokeWidth={2.5} />
                                            <span className="text-xs font-bold uppercase tracking-widest">
                                                Back to {panel.previousTitle}
                                            </span>
                                        </button>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 relative overflow-hidden bg-white">
                                    {getPanelContent(panel)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0%); }
                }
            `}</style>
        </div>
    );
};
