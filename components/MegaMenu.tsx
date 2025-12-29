
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, GraduationCap, ChevronRight, Award, Calendar, Tag, ShoppingBag } from 'lucide-react';
import { OFFERINGS } from '../constants';
import { useCart } from '../context/CartContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import { Offering } from '../types';

const PROGRAMME_TYPES = [
    { label: 'Full Time Learning', value: 'Full Time Learning', desc: 'Immersive campus experience' },
    { label: 'Blended Learning', value: 'Blended Learning', desc: 'Flexible remote & contact study' },
    { label: 'In-Service Traineeship', value: 'In-Service Traineeship', desc: 'Earn while you learn' },
    { label: 'Part Time Learning', value: 'Part Time Learning', desc: 'Study while working' },
    { label: 'Online Learning', value: 'Online Learning', desc: '100% Online flexibility' },
];

const FOCUS_AREAS = [
    { label: 'Hospitality Management', value: 'Hospitality' },
    { label: 'Culinary Arts', value: 'Culinary' }
];

interface MegaMenuProps {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onMouseEnter, onMouseLeave }) => {
    const [activeType, setActiveType] = useState(PROGRAMME_TYPES[0].value);
    const [activeFocus, setActiveFocus] = useState<string>('Hospitality');
    const { addToCart } = useCart();
    
    // States for modals
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Offering | null>(null);

    const handleAction = (e: React.MouseEvent, offering: Offering) => {
        e.preventDefault();
        e.stopPropagation();
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

    // Calculate available focus areas for the selected type
    const availableFocusAreas = FOCUS_AREAS.filter(area => 
        OFFERINGS.some(o => 
            o.programmeTypes.includes(activeType) && 
            o.category === area.value
        )
    );

    // Auto-select first valid focus area when type changes
    useEffect(() => {
        const isCurrentFocusValid = availableFocusAreas.some(a => a.value === activeFocus);
        if (!isCurrentFocusValid && availableFocusAreas.length > 0) {
            setActiveFocus(availableFocusAreas[0].value);
        } else if (availableFocusAreas.length === 0) {
            // If no focus areas (e.g. specialized type), maybe show all or handle gracefully
        }
    }, [activeType, availableFocusAreas, activeFocus]);

    const displayedOfferings = OFFERINGS.filter(o => 
        o.programmeTypes.includes(activeType) && 
        o.category === activeFocus
    );

    const getLinkSlug = (type: string) => {
        if (type === 'Full Time Learning') return 'full-time';
        if (type === 'Blended Learning') return 'blended';
        if (type === 'In-Service Traineeship') return 'in-service';
        if (type === 'Part Time Learning') return 'part-time';
        if (type === 'Online Learning') return 'online';
        return 'full-time';
    };

    return (
        <>
        <div 
            className="absolute top-full left-0 w-full bg-[#0B1221] border-t border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-200 cursor-default"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ height: 'calc(100vh - 80px)', maxHeight: '600px' }}
        >
            <div className="max-w-7xl mx-auto flex h-full">
                
                {/* Column 1: Programme Types (30%) */}
                <div className="w-[30%] border-r border-white/5 p-8 flex flex-col h-full bg-[#0B1221]">
                    <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                        Programme Type
                    </h3>
                    <div className="space-y-1 flex-1">
                        {PROGRAMME_TYPES.map((type) => (
                            <div 
                                key={type.value}
                                onMouseEnter={() => setActiveType(type.value)}
                                className={`group flex items-center justify-between p-4 rounded-sm cursor-pointer transition-all duration-300 ${
                                    activeType === type.value 
                                        ? 'bg-brand-gold text-brand-dark shadow-[0_0_20px_rgba(197,160,89,0.15)] translate-x-1' 
                                        : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                }`}
                            >
                                <div>
                                    <div className={`font-serif text-lg font-bold leading-tight ${activeType === type.value ? 'text-brand-dark' : 'text-white'}`}>
                                        {type.label}
                                    </div>
                                    <div className={`text-[11px] mt-1 font-medium uppercase tracking-wider ${activeType === type.value ? 'text-brand-dark/70' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                        {type.desc}
                                    </div>
                                </div>
                                <ChevronRight size={16} className={`transition-all duration-300 ${
                                    activeType === type.value ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50'
                                }`} />
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <Link 
                            to={`/programmes/${getLinkSlug(activeType)}`}
                            className="flex items-center justify-between text-brand-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group p-2"
                        >
                            <span>View All {activeType}</span>
                            <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all">
                                <ArrowRight size={14} />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Column 2: Focus Areas (25%) */}
                <div className="w-[25%] border-r border-white/5 p-8 bg-white/[0.02] flex flex-col h-full">
                    <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                        Focus Area
                    </h3>
                    <div className="space-y-3">
                        {availableFocusAreas.length > 0 ? (
                            availableFocusAreas.map((area) => (
                                <div 
                                    key={area.value}
                                    onMouseEnter={() => setActiveFocus(area.value)}
                                    className={`p-6 rounded-sm cursor-pointer transition-all duration-300 border relative overflow-hidden group ${
                                        activeFocus === area.value 
                                            ? 'bg-gradient-to-r from-white/10 to-transparent border-brand-gold/50 text-white' 
                                            : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {activeFocus === area.value && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold"></div>
                                    )}
                                    <span className="font-serif text-xl font-bold relative z-10">
                                        {area.label}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 italic p-4 text-sm border border-white/5 rounded-sm bg-white/5">
                                Select a programme type to see focus areas.
                            </div>
                        )}
                    </div>
                </div>

                {/* Column 3: Programmes (45%) */}
                <div className="w-[45%] p-8 bg-black/30 flex flex-col h-full">
                    <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-6 flex items-center gap-2">
                         <div className="w-1 h-1 bg-brand-gold rounded-full"></div>
                        Programmes
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                        {displayedOfferings.length > 0 ? (
                            displayedOfferings.map((offering) => {
                                const isEcommerce = offering.programmeTypes.some((type: string) => 
                                    ['Online Learning', 'Part Time Learning'].includes(type)
                                );

                                return (
                                <Link 
                                    key={offering.id} 
                                    to={`/course/${offering.id}`}
                                    className="group flex bg-brand-card border border-white/5 rounded-sm overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    {/* Card Image */}
                                    <div className="w-28 shrink-0 overflow-hidden relative">
                                        <img src={offering.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    
                                    {/* Card Content */}
                                    <div className="p-4 flex-1 flex flex-col justify-center">
                                        <h4 className="text-white font-serif font-bold text-base mb-2 group-hover:text-brand-gold transition-colors line-clamp-1">
                                            {offering.title}
                                        </h4>
                                        
                                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-gray-400 uppercase tracking-wider mb-2">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-brand-gold" /> {offering.duration}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <GraduationCap size={12} className="text-brand-gold" /> {offering.qualification}
                                            </div>
                                        </div>

                                        <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-brand-gold font-bold text-lg font-serif">R {offering.price?.toLocaleString()}</span>
                                                <span className="text-[10px] text-gray-500">{offering.startDate}</span>
                                            </div>
                                            
                                            <button 
                                                onClick={(e) => handleAction(e, offering)}
                                                className="w-full bg-white/5 hover:bg-brand-gold hover:text-brand-dark text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-sm transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                {isEcommerce ? (
                                                    <><ShoppingBag size={12} /> Buy Now</>
                                                ) : (
                                                    <>Apply Now <ArrowRight size={12} /></>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )})
                        ) : (
                             <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 border border-white/5 border-dashed rounded-sm">
                                <Award size={32} className="mb-3 opacity-20" />
                                <p className="text-sm italic">Select a focus area to view available programmes.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Bottom CTA */}
                     <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            Viewing <span className="text-white font-bold">{displayedOfferings.length}</span> programmes
                        </span>
                        <Link to="/programmes/full-time" className="text-xs text-brand-gold hover:text-white font-bold uppercase tracking-wide transition-colors flex items-center gap-2 group">
                            Full Programme Catalogue
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
            
             {/* Footer Bar */}
             <div className="bg-brand-gold h-1.5 w-full"></div>
        </div>
        
        <ApplicationModal 
            isOpen={showApplication} 
            onClose={() => setShowApplication(false)} 
            courseTitle={currentCourse?.title}
        />
        
        <CheckoutModal 
            isOpen={showCheckout}
            onClose={() => setShowCheckout(false)}
        />
        </>
    );
};
