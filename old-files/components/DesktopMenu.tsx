import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, X } from 'lucide-react';
import { NAV_LINKS, MORE_MENU_LINKS } from '../constants';

interface DesktopMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleLinkClick = (href: string) => {
        onClose();
        if (href.startsWith('#')) {
             const el = document.getElementById(href.substring(1));
             if(el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
             navigate(href);
        }
    };

    return (
        <div 
            className={`fixed inset-0 z-[35] bg-[#002B4E] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hidden lg:block ${
                isOpen ? 'opacity-100 visible' : 'opacity-0 invisible delay-200'
            }`}
            style={{ top: '80px' }} // Position below the fixed header
        >
            <div className="max-w-7xl mx-auto px-8 h-full flex">
                {/* Left Column: Primary Navigation */}
                <div className="w-1/2 h-full border-r border-white/10 flex flex-col justify-center py-12">
                     <nav className="flex flex-col space-y-8 pl-12">
                        {NAV_LINKS.map((link, idx) => (
                            <button
                                key={link.label} 
                                onClick={() => handleLinkClick(link.href)}
                                className={`text-6xl font-serif font-bold text-white hover:text-[#C2B067] text-left transition-all duration-500 transform origin-left ${
                                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                                }`}
                                style={{ transitionDelay: `${150 + idx * 50}ms` }}
                            >
                                {link.label}
                            </button>
                        ))}
                     </nav>
                </div>

                {/* Right Column: Secondary Links & Info */}
                <div className="w-1/2 h-full flex flex-col justify-center py-12 pl-24">
                     <div className={`space-y-8 transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        
                        <div className="grid grid-cols-2 gap-x-12 gap-y-5 mb-12">
                             {MORE_MENU_LINKS.map(link => (
                                 <button 
                                    key={link.label}
                                    onClick={() => handleLinkClick(link.href)}
                                    className="text-lg text-gray-300 hover:text-white text-left font-medium transition-colors"
                                >
                                    {link.label}
                                 </button>
                             ))}
                        </div>

                        <div className="space-y-5 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-4 text-white group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C2B067] group-hover:bg-[#C2B067] group-hover:text-[#002B4E] transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span className="text-xl font-medium">+27 86 144 3300</span>
                            </div>
                            <div className="flex items-center gap-4 text-white group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C2B067] group-hover:bg-[#C2B067] group-hover:text-[#002B4E] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span className="text-xl font-medium">info@hotelschool.co.za</span>
                            </div>
                            <div className="flex items-center gap-4 text-white group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C2B067] group-hover:bg-[#C2B067] group-hover:text-[#002B4E] transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-xl font-medium">Cape Town, South Africa</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                             {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#C2B067] hover:text-[#002B4E] transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
            
            {/* Close Button specific for Desktop Menu if user wants it explicitly, 
                though header 'More' usually toggles it. 
                We'll add a subtle one inside or rely on Header toggle. 
                Header "More" button toggles isMenuOpen state. 
            */}
        </div>
    );
};