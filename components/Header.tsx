
import React, { useState, useRef, useEffect } from 'react';
import { NAV_LINKS, MORE_MENU_LINKS } from '../constants';
import { Button } from './ui/Button';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MiniCart } from './MiniCart';
import { ProgrammeFinder } from './ProgrammeFinder';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const location = useLocation();
  const { toggleCart, items } = useCart();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    if(href.startsWith('#')) {
       const el = document.getElementById(href.substring(1));
       if(el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
      if (menuTimeoutRef.current) {
          clearTimeout(menuTimeoutRef.current);
      }
      setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
      menuTimeoutRef.current = setTimeout(() => {
          setIsMegaMenuOpen(false);
      }, 100);
  };

  return (
    <>
    {/* Main Header */}
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 h-[80px]">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 lg:px-8 relative">
            
            {/* Left: Logo */}
            <div className="flex items-center h-full">
            <Link to="/" className="flex items-center group">
                <img
                src="components/assets/img/ihs-logo.png"
                alt="IHS Logo"
                className="h-10 lg:h-16 object-contain mb-1 group-hover:opacity-80 transition-opacity duration-200 w-full"
                />
            </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="absolute left-1/2 top-0 transform -translate-x-1/2 flex items-center h-full gap-8 lg:flex hidden">
            {NAV_LINKS.map((link) => {
                const isMegaTrigger = link.label === 'Our Programmes';
                const isActive = isMegaTrigger && isMegaMenuOpen;

                return (
                    <a
                        key={link.label}
                        href={link.href}
                        onMouseEnter={isMegaTrigger ? handleMouseEnter : undefined}
                        onMouseLeave={isMegaTrigger ? handleMouseLeave : undefined}
                        onClick={(e) => {
                            if (link.href.startsWith('#')) {
                                e.preventDefault();
                                handleLinkClick(link.href);
                            }
                        }}
                        className="group relative h-full flex items-center px-2 cursor-pointer"
                    >
                        <span className={`relative z-10 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-[#C2B067]' : 'text-[#002B4E] group-hover:text-[#C2B067]'}`}>
                            {link.label}
                        </span>
                        
                        {/* Animated Underline */}
                        <span className={`absolute bottom-6 left-0 w-full h-[2px] bg-[#C2B067] transform transition-transform duration-300 ease-out origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                    </a>
                );
            })}
            </nav>

            {/* Right: Icons + More Button */}
            <div className="flex items-center h-full gap-2">
            <button
                onClick={() => setIsFinderOpen(true)}
                className="text-[#002B4E] hover:text-[#2a68d8] transition-colors duration-200 p-4 relative group"
                aria-label="Search"
            >
                <Search size={24} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
            </button>

            <button
                onClick={toggleCart}
                className="relative text-[#002B4E] hover:text-[#2a68d8] transition-colors duration-200 p-4 group"
                aria-label="Cart"
            >
                <ShoppingBag size={24} strokeWidth={2} className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
                {items.length > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-[#da291c] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-20">
                    {items.length}
                </span>
                )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="h-[80px] w-[80px] lg:w-[100px] bg-[#002B4E] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#001ebd] transition-colors duration-200 cursor-pointer lg:hidden"
            >
                <div className="space-y-1.5 mb-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
            </button>

             {/* Desktop 'More' Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="hidden lg:flex h-[80px] w-[100px] bg-[#002B4E] text-white flex-col items-center justify-center gap-1 hover:bg-[#001ebd] transition-colors duration-200 cursor-pointer"
            >
                <div className="space-y-1.5 mb-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">More</span>
            </button>
            </div>
        </div>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:block">
            <MegaMenu 
                isOpen={isMegaMenuOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    </header>

    {/* Mobile Menu Component (Handles its own overlays and stacking) */}
    <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

    <MiniCart />
    <ProgrammeFinder isOpen={isFinderOpen} onClose={() => setIsFinderOpen(false)} />
    
    {/* Spacer to push content down below fixed header */}
    <div className="h-[80px]"></div>
    </>
  );
};
