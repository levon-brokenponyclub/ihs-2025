
import React, { useEffect } from 'react';
import { X, ArrowRight, Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NAV_LINKS, MORE_MENU_LINKS } from '../constants';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleLinkClick = (to: string) => {
        onClose();
        if (to.startsWith('#')) {
             const el = document.getElementById(to.substring(1));
             if(el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
             navigate(to);
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-[100] transition-visibility duration-500 ${isOpen ? 'visible' : 'invisible delay-500'}`}
        >
            {/* Main Menu Overlay */}
            <div 
                className={`absolute inset-0 bg-[#002B4E] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 lg:px-12 h-[80px] border-b border-white/10 shrink-0">
                     <Link to="/" onClick={onClose} className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#002B4E] font-serif font-bold text-xl">I</div>
                         <div className="flex flex-col">
                             <span className="text-white font-serif font-bold text-sm leading-none">International</span>
                             <span className="text-[#C2B067] text-[10px] uppercase tracking-widest">Hotel School</span>
                         </div>
                     </Link>

                     <button 
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                     >
                         <X size={24} />
                     </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 h-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
                            
                            {/* Left Column: Primary Nav */}
                            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                                {NAV_LINKS.map((link, idx) => (
                                    <div 
                                        key={link.label}
                                        className={`transition-all duration-700 ease-out transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                        style={{ transitionDelay: `${100 + idx * 50}ms` }}
                                    >
                                        <Link 
                                            to={link.href}
                                            onClick={() => handleLinkClick(link.href)}
                                            className="group inline-flex items-center gap-4 text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white hover:text-[#C2B067] transition-colors"
                                        >
                                            {link.label}
                                            <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C2B067]" size={32} />
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column: Secondary Links & Info */}
                            <div className="lg:border-l lg:border-white/10 lg:pl-16 flex flex-col justify-center">
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                    <div className="space-y-4">
                                        <h4 className="text-[#C2B067] text-xs font-bold uppercase tracking-widest mb-4">Explore</h4>
                                        {MORE_MENU_LINKS.slice(0, 3).map((link, idx) => (
                                            <Link 
                                                key={link.label}
                                                to={link.href}
                                                onClick={() => handleLinkClick(link.href)}
                                                className="block text-gray-300 hover:text-white text-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[#C2B067] text-xs font-bold uppercase tracking-widest mb-4">Resources</h4>
                                        {MORE_MENU_LINKS.slice(3).map((link, idx) => (
                                            <Link 
                                                key={link.label}
                                                to={link.href}
                                                onClick={() => handleLinkClick(link.href)}
                                                className="block text-gray-300 hover:text-white text-lg transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Phone size={18} className="text-[#C2B067]" />
                                        <span className="text-sm">+27 12 345 6789</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Mail size={18} className="text-[#C2B067]" />
                                        <span className="text-sm">info@hotelschool.co.za</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <MapPin size={18} className="text-[#C2B067]" />
                                        <span className="text-sm">Campuses Nationwide</span>
                                    </div>

                                    <div className="flex gap-4 pt-6 mt-6 border-t border-white/10">
                                        {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#C2B067] hover:text-[#002B4E] transition-all duration-300">
                                                <Icon size={16} />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
