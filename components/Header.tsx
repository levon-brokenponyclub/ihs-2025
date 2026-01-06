
import React, { useState, useRef, useEffect } from 'react';
import { NAV_LINKS, MORE_MENU_LINKS } from '../constants.tsx';
import { Button } from './ui/Button';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MiniCart } from './MiniCart';
import { ProgrammeFinder } from './ProgrammeFinder';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFinderOpen, setIsFinderOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    // Header Scroll State
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();
    const { toggleCart, items } = useCart();

    // Scroll Handler for Hide/Show
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header at top of page or when scrolling up
            // We don't check isMenuOpen here to avoid stale closure issues. 
            // We handle the override in the render logic.
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsVisible(false); // Scrolling down & past header
            } else {
                setIsVisible(true); // Scrolling up
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        if (href.startsWith('#')) {
            const el = document.getElementById(href.substring(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMouseEnter = () => {
        // Prevent mega menu from opening if the full screen menu is active
        if (isMenuOpen) return;
        if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setIsMegaMenuOpen(false);
        }, 100);
    };

    const toggleMenu = () => {
        if (!isMenuOpen) {
            // Closing MegaMenu if we are opening the full menu
            setIsMegaMenuOpen(false);
        }
        setIsMenuOpen(!isMenuOpen);
    };

    // Force header visible if menu is open, otherwise use scroll state
    const headerVisible = isMenuOpen || isVisible;

    return (
        <>
            {/* Main Header with Transition */}
            <header
                className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 h-[80px] transition-transform duration-300 ease-in-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 lg:px-8 relative">

                    {/* Left: Logo */}
                    <div className="flex items-center h-full">
                        <Link to="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
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
                                    <span className={`relative z-10 text-sm font-bold uppercase transition-colors duration-300 tracking-[1px] ${isActive ? 'text-[#C2B067]' : 'text-[#002B4E] group-hover:text-[#C2B067]'}`}>
                                        {link.label}
                                    </span>

                                    {/* Animated Underline */}
                                    <span className={`absolute bottom-0 left-0 w-full h-[5px] bg-[#002B4E] transform transition-transform duration-300 ease-out origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
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
                            onClick={toggleMenu}
                            className="h-[80px] w-[60px] flex items-center justify-center cursor-pointer lg:hidden relative z-50 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg width="40" height="40" viewBox="0 0 100 100" className="overflow-visible">
                                <path
                                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                    style={{
                                        fill: 'none',
                                        stroke: '#002B4E',
                                        strokeWidth: 5,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isMenuOpen ? '90 207' : '60 207',
                                        strokeDashoffset: isMenuOpen ? -134 : 0
                                    }}
                                />
                                <path
                                    d="M 20,50 H 80"
                                    style={{
                                        fill: 'none',
                                        stroke: '#002B4E',
                                        strokeWidth: 5,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isMenuOpen ? '1 60' : '60 60',
                                        strokeDashoffset: isMenuOpen ? -30 : 0
                                    }}
                                />
                                <path
                                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                    style={{
                                        fill: 'none',
                                        stroke: '#002B4E',
                                        strokeWidth: 5,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isMenuOpen ? '90 207' : '60 207',
                                        strokeDashoffset: isMenuOpen ? -134 : 0
                                    }}
                                />
                            </svg>
                        </button>

                        {/* Desktop 'More' Button */}
                        <button
                            onClick={toggleMenu}
                            className="hidden lg:flex h-[80px] w-[100px] bg-[#002B4E] text-white flex-col items-center justify-center gap-1 hover:bg-[#C2B067] transition-colors duration-200 cursor-pointer relative z-[60] group"
                        >
                            <div className="w-8 h-8 relative flex items-center justify-center">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                                    <path
                                        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                        style={{
                                            fill: 'none',
                                            stroke: 'white',
                                            strokeWidth: 8,
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                            strokeDasharray: isMenuOpen ? '90 207' : '60 207',
                                            strokeDashoffset: isMenuOpen ? -134 : 0
                                        }}
                                    />
                                    <path
                                        d="M 20,50 H 80"
                                        style={{
                                            fill: 'none',
                                            stroke: 'white',
                                            strokeWidth: 8,
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                            strokeDasharray: isMenuOpen ? '1 60' : '60 60',
                                            strokeDashoffset: isMenuOpen ? -30 : 0
                                        }}
                                    />
                                    <path
                                        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                        style={{
                                            fill: 'none',
                                            stroke: 'white',
                                            strokeWidth: 8,
                                            strokeLinecap: 'round',
                                            transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                            strokeDasharray: isMenuOpen ? '90 207' : '60 207',
                                            strokeDashoffset: isMenuOpen ? -134 : 0
                                        }}
                                    />
                                </svg>
                            </div>

                            <div className="relative h-[14px] w-full overflow-hidden">
                                <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[1px] transition-all duration-300 ease-in-out ${isMenuOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                    More
                                </span>
                                <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[1px] transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                    Close
                                </span>
                            </div>
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

            {/* Mobile Menu Component */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Desktop Full Screen Menu */}
            <DesktopMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <MiniCart />
            <ProgrammeFinder isOpen={isFinderOpen} onClose={() => setIsFinderOpen(false)} />

            {/* Spacer to push content down below fixed header */}
            <div className="h-[80px]"></div>
        </>
    );
};
