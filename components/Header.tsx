
import React, { useState, useEffect, useRef } from 'react';
import { NAV_LINKS, SECONDARY_LINKS } from '../constants';
import { Button } from './ui/Button';
import { Menu, X, ShoppingBag, Search, ChevronRight, Phone, Mail, ChevronDown, MapPin, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MiniCart } from './MiniCart';
import { ProgrammeFinder } from './ProgrammeFinder';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerStack, setDrawerStack] = useState<string[]>(['root']); // Navigation stack
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  
  // Mega Menu State & Refs
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const { toggleCart, items } = useCart();

  // Track content for deeper levels to ensure they render before sliding in
  const [activeLevel2, setActiveLevel2] = useState<string | null>(null);
  const [activeLevel3, setActiveLevel3] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset drawer stack when menu closes
  useEffect(() => {
      if (!mobileMenuOpen) {
          setTimeout(() => {
              setDrawerStack(['root']);
              setActiveLevel2(null);
              setActiveLevel3(null);
          }, 300);
      }
  }, [mobileMenuOpen]);

  const pushStack = (id: string) => {
      if (drawerStack.length === 1) setActiveLevel2(id);
      if (drawerStack.length === 2) setActiveLevel3(id);
      setDrawerStack(prev => [...prev, id]);
  };

  const popStack = () => {
      setDrawerStack(prev => prev.slice(0, -1));
  };

  // Mega Menu Handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }
    setActiveMegaMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(false);
    }, 150); // Small delay to allow mouse transition
  };

  // --- Drawer Content Renderers ---

  const RootPanel = () => (
      <div className="min-w-full w-full h-full overflow-y-auto p-6 bg-[#0d1424]">
           {/* Primary Links */}
           <nav className="space-y-1 mb-8">
               {NAV_LINKS.map((link) => (
                   <div key={link.label}>
                       {link.label === 'Our Programmes' ? (
                           <button 
                             onClick={() => pushStack('programmes')}
                             className="flex items-center justify-between w-full p-3 text-white hover:bg-white/5 rounded-sm group transition-colors text-left"
                           >
                               <span className="font-medium text-lg">{link.label}</span>
                               <ChevronRight size={16} className="text-gray-600 group-hover:text-brand-gold" />
                           </button>
                       ) : (
                           <a 
                             href={link.href}
                             onClick={(e) => {
                                 if(link.href.startsWith('#')) {
                                    e.preventDefault();
                                    const el = document.getElementById(link.href.substring(1));
                                    if(el) el.scrollIntoView({ behavior: 'smooth' });
                                 }
                                 setMobileMenuOpen(false);
                             }}
                             className="flex items-center justify-between w-full p-3 text-white hover:bg-white/5 rounded-sm group transition-colors"
                           >
                               <span className="font-medium text-lg">{link.label}</span>
                               <ChevronRight size={16} className="text-gray-600 group-hover:text-brand-gold" />
                           </a>
                       )}
                   </div>
               ))}
           </nav>

           <div className="h-px bg-white/10 mb-8"></div>

           {/* Secondary Links */}
           <nav className="space-y-1">
               {SECONDARY_LINKS.map((link) => (
                   <a 
                     key={link.label}
                     href={link.href}
                     className="block p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm text-sm uppercase tracking-wide transition-colors"
                   >
                       {link.label}
                   </a>
               ))}
           </nav>
           
           <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
               <a href="tel:+123456789" className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors">
                   <Phone size={18} />
                   <span>+27 12 345 6789</span>
               </a>
               <Button variant="primary" className="w-full" onClick={() => { setIsFinderOpen(true); setMobileMenuOpen(false); }}>
                  Apply Now
               </Button>
           </div>
       </div>
  );

  const Level2Panel = () => (
      <div className="min-w-full w-full h-full overflow-y-auto p-6 bg-[#0d1424]">
           <button onClick={popStack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 uppercase text-xs font-bold tracking-widest">
               <ArrowLeft size={14} /> Back to Menu
           </button>

           <h3 className="text-brand-gold font-serif text-2xl mb-6">Our Programmes</h3>

           <nav className="space-y-1">
               {['Full Time Learning', 'Blended Learning', 'In-Service Traineeship', 'Part Time Learning', 'Online Learning'].map((prog) => (
                   <button 
                     key={prog}
                     onClick={() => {
                         if (prog === 'Full Time Learning') {
                             pushStack('full-time');
                         } else {
                             const slug = prog.toLowerCase().replace(/ /g, '-');
                             window.location.hash = `/programmes/${slug}`; 
                             setMobileMenuOpen(false);
                         }
                     }}
                     className="flex items-center justify-between w-full p-3 text-white hover:bg-white/5 rounded-sm group transition-colors text-left"
                   >
                       <span className="font-medium text-lg">{prog}</span>
                       <ChevronRight size={16} className="text-gray-600 group-hover:text-brand-gold" />
                   </button>
               ))}
           </nav>
      </div>
  );

  const Level3Panel = () => (
      <div className="min-w-full w-full h-full overflow-y-auto p-6 bg-[#0d1424]">
           <button onClick={popStack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 uppercase text-xs font-bold tracking-widest">
               <ArrowLeft size={14} /> Back to Programmes
           </button>

           <div className="mb-8">
                <h3 className="text-white font-serif text-3xl mb-2">FULL TIME LEARNING</h3>
                <Link 
                    to="/programmes/full-time" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-brand-gold hover:text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                >
                    Explore Full Time Learning <ChevronRight size={14} />
                </Link>
           </div>
           
           <div className="h-px bg-white/10 mb-8"></div>

           <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Explore Courses</h4>

           <div className="space-y-6">
               <div>
                   <h5 className="text-white font-serif font-bold text-lg mb-2">Hospitality Management</h5>
                   <Link to="/programmes/full-time" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-brand-gold text-sm flex items-center gap-2">
                       View Courses <ChevronRight size={14} />
                   </Link>
               </div>
               <div>
                   <h5 className="text-white font-serif font-bold text-lg mb-2">Culinary Arts</h5>
                   <Link to="/programmes/full-time" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-brand-gold text-sm flex items-center gap-2">
                       View Courses <ChevronRight size={14} />
                   </Link>
               </div>
           </div>
      </div>
  );

  return (
    <>
    {/* Top Bar - Desktop Only */}
    <div className="hidden lg:block bg-[#050911] border-b border-white/5 py-2 text-xs text-gray-400 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Student Portal</a>
                <a href="#" className="hover:text-white transition-colors">Alumni</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>
            <div className="flex gap-6">
                 <a href="tel:+27123456789" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                    <Phone size={12} />
                    <span>+27 12 345 6789</span>
                 </a>
                 <a href="mailto:info@hotelschool.co.za" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                    <Mail size={12} />
                    <span>info@hotelschool.co.za</span>
                 </a>
            </div>
        </div>
    </div>

    <header 
      className={`fixed top-0 lg:top-[33px] left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#0B1221]/95 backdrop-blur-md shadow-xl py-2 top-0 lg:!top-0' : 'bg-[#0B1221] py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-serif font-bold text-xl group-hover:scale-110 transition-transform">
                  I
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-white text-lg leading-none tracking-wide font-bold">International</span>
                  <span className="text-brand-muted text-[10px] uppercase tracking-widest group-hover:text-brand-gold transition-colors">Hotel School</span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 ml-8">
                {NAV_LINKS.map((link) => (
                    <div 
                        key={link.label}
                        className="relative group h-16 flex items-center"
                        onMouseEnter={() => link.label === 'Our Programmes' && handleMouseEnter()}
                        onMouseLeave={() => link.label === 'Our Programmes' && handleMouseLeave()}
                    >
                        <a 
                            href={link.href}
                            className="text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wide transition-colors py-2 flex items-center gap-1"
                        >
                            {link.label}
                            {link.label === 'Our Programmes' && <ChevronDown size={14} />}
                        </a>
                        
                        {/* Active Indicator */}
                        <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left`}></div>
                    </div>
                ))}
            </nav>
          </div>

          {/* Right: Search, Cart & Apply */}
          <div className="flex items-center gap-2 sm:gap-6">
             {/* Mobile Hamburger (Visible only on mobile/tablet) */}
            <button 
                className="lg:hidden text-white hover:text-brand-gold transition-colors p-1 mr-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Menu"
            >
                <Menu size={28} strokeWidth={1.5} />
            </button>

            <button 
                onClick={() => setIsFinderOpen(true)}
                className="text-white hover:text-brand-gold transition-colors p-2"
                aria-label="Search Programmes"
            >
                <Search size={24} strokeWidth={1.5} />
            </button>

            <button 
                onClick={toggleCart} 
                className="relative text-white hover:text-brand-gold transition-colors p-2"
                aria-label="Cart"
            >
                <ShoppingBag size={24} strokeWidth={1.5} />
                {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </button>

            <div className="hidden sm:block">
               <Button 
                  variant="primary" 
                  className="!py-2.5 !px-6 text-sm uppercase font-bold"
                  onClick={() => setIsFinderOpen(true)} // Or link to Apply page
                >
                  Apply Now
                </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mega Menu Injection - Direct child of Header */}
      {activeMegaMenu && (
          <MegaMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      )}
    </header>

    {/* Mobile/Drawer Menu Overlay */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-[100] flex lg:hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Drawer Container */}
        <div className="relative w-[300px] max-w-[85vw] bg-[#0d1424] h-full shadow-2xl flex flex-col border-r border-white/10 animate-in slide-in-from-left duration-300 overflow-hidden">
           
           {/* Drawer Header - Always Fixed */}
           <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#162036] shrink-0 z-10 relative">
               <span className="text-brand-gold font-serif font-bold text-xl">Menu</span>
               <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                 <X size={24} />
               </button>
           </div>

           {/* Sliding Content Container */}
           <div className="flex-1 relative overflow-hidden bg-[#0d1424]">
                <div 
                    className="absolute inset-0 flex transition-transform duration-300 ease-in-out h-full"
                    style={{ transform: `translateX(-${(drawerStack.length - 1) * 100}%)` }}
                >
                    <RootPanel />
                    <Level2Panel />
                    <Level3Panel />
                </div>
           </div>

        </div>
      </div>
    )}

    <MiniCart />
    <ProgrammeFinder isOpen={isFinderOpen} onClose={() => setIsFinderOpen(false)} />
    </>
  );
};
