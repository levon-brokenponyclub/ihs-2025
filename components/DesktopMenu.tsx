
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Facebook, Instagram, Twitter, Linkedin, Youtube,
  Phone, Mail, MapPin, Calendar, ArrowRight, Download,
  GraduationCap, Users, Newspaper, Briefcase, ExternalLink
} from 'lucide-react';

import {
  overlayTray,
  columnEntrance,
  staggerItem,
  featuredCard,
} from '../utils/overlayAnimations.ts';

import { useAnimation } from '../utils/useAnimation.ts';

interface DesktopMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = (href: string) => {
    onClose();
    if (href.startsWith('#')) {
         const el = document.getElementById(href.substring(1));
         if(el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
         navigate(href);
    }
  };

  const handleOpenDayClick = () => {
    onClose();
    window.dispatchEvent(new CustomEvent('toggle-open-day'));
  };

  return (
    <div
      {...useAnimation(overlayTray, isOpen)}
      className={`fixed inset-0 z-[35] hidden lg:block ${useAnimation(overlayTray, isOpen).className}`}
      style={{
        top: '80px',
        height: 'calc(100vh - 80px)',
        ...overlayTray.style,
      }}
    >
      {/* Background Layer - Split to match columns */}
      <div className="absolute inset-0 flex z-0 pointer-events-none">
          {/* Col 1 & 2 Area (66.66%) - Brand Navy */}
          <div className="w-2/3 bg-[#002B4E] border-r border-white/5"></div>
          {/* Col 3 Area (33.33%) - Darker Navy */}
          <div className="w-1/3 bg-[#001D36]"></div>
      </div>

      {/* Depth overlay */}
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 z-0 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 w-full h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-stretch">

          {/* COLUMN 1 */}
          <div {...useAnimation(columnEntrance.left(), isOpen)} className={`w-1/3 border-r border-white/5 py-16 pr-12 flex flex-col`}>
            <h3 className="text-xs font-bold text-[#C2B067] uppercase tracking-widest mb-10">
              Student & Academic
            </h3>

            <div className="space-y-6 mb-auto">
              <MenuTextLink label="Student Portal" icon={<ExternalLink size={18} />} delay={100} isOpen={isOpen} onClick={() => handleLinkClick('/student-portal')} />
              <MenuTextLink label="Beyond Grad" icon={<GraduationCap size={18} />} delay={150} isOpen={isOpen} onClick={() => handleLinkClick('/beyond-grad')} />
              <MenuTextLink label="Downloads" icon={<Download size={18} />} delay={200} isOpen={isOpen} onClick={() => handleLinkClick('/downloads')} />
              <MenuTextLink label="Open Days" icon={<Calendar size={18} />} delay={250} isOpen={isOpen} onClick={handleOpenDayClick} />
            </div>

             {/* Socials at bottom of Col 1 */}
             <div className={`mt-12 transition-all duration-500 delay-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-4">Connect With Us</p>
                <div className="flex gap-3">
                    {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#C2B067] hover:text-[#002B4E] transition-all border border-white/5 hover:border-[#C2B067]">
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div {...useAnimation(columnEntrance.center(), isOpen)} className={`w-1/3 border-r border-white/5 py-16 px-12 flex flex-col`}>
            <h3 className="text-xs font-bold text-[#C2B067] uppercase tracking-widest mb-10">
              Institutional
            </h3>

            <div className="space-y-6 mb-auto">
              <MenuTextLink label="Latest News" icon={<Newspaper size={18} />} delay={200} isOpen={isOpen} onClick={() => handleLinkClick('/news')} />
              <MenuTextLink label="Careers at IHS" icon={<Briefcase size={18} />} delay={250} isOpen={isOpen} onClick={() => handleLinkClick('/careers')} />
              <MenuTextLink label="Alumni Network" icon={<Users size={18} />} delay={300} isOpen={isOpen} onClick={() => handleLinkClick('/alumni')} />
              <MenuTextLink label="Contact Us" icon={<Mail size={18} />} delay={350} isOpen={isOpen} onClick={() => handleLinkClick('/contact')} />
            </div>

            {/* Contact Details at bottom of Col 2 */}
            <div className={`mt-12 space-y-4 transition-all duration-500 delay-400 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-4">Get in Touch</p>
                
                <div className="flex items-center gap-3 text-white/80 group cursor-pointer hover:text-white transition-colors">
                    <Phone size={16} className="text-[#C2B067]" />
                    <span className="text-sm font-medium tracking-wide">+27 86 144 3300</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 group cursor-pointer hover:text-white transition-colors">
                    <Mail size={16} className="text-[#C2B067]" />
                    <span className="text-sm font-medium tracking-wide">info@hotelschool.co.za</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 group cursor-pointer hover:text-white transition-colors">
                    <MapPin size={16} className="text-[#C2B067]" />
                    <span className="text-sm font-medium tracking-wide">Cape Town, South Africa</span>
                </div>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div {...useAnimation(columnEntrance.right(), isOpen)} className="w-1/3 py-16 pl-12 flex flex-col relative">
            <div className="absolute inset-0 bg-[#05192e]/30 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-10">
                Don't Miss Out
              </h3>

              {/* Open Day Card */}
              <div
                {...useAnimation(featuredCard, isOpen)}
                style={{ transitionDelay: '550ms' }}
                onClick={handleOpenDayClick}
                className={`group relative bg-[#0a233f] border border-[#C2B067]/30 hover:border-[#C2B067] p-8 rounded-sm cursor-pointer hover:shadow-[0_0_30px_rgba(194,176,103,0.12)] mb-8 overflow-hidden ${useAnimation(featuredCard, isOpen).className}`}
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#C2B067]/10 rounded-full blur-xl group-hover:bg-[#C2B067]/20 transition-all" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className="bg-[#C2B067] text-[#002B4E] text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                            Upcoming
                        </div>
                        <ArrowRight className="text-[#C2B067] transform group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                    <h4 className="font-serif text-2xl text-white font-bold mb-2">Open Day</h4>
                    <p className="text-white/60 text-sm mb-6">Experience our campuses firsthand.</p>

                    <div className="flex items-center gap-3 text-white/90 text-sm border-t border-white/10 pt-4">
                    <Calendar size={16} className="text-[#C2B067]" />
                    <span>3 December 2025</span>
                    </div>
                     <div className="flex items-center gap-3 text-white/90 text-sm font-medium mt-2">
                        <MapPin size={16} className="text-[#C2B067]" />
                        <span>All IHS Campuses</span>
                    </div>
                    <div className="mt-6">
                        <span className="inline-block text-[#C2B067] text-xs font-bold uppercase tracking-[2px] border-b border-[#C2B067] pb-1 group-hover:text-white group-hover:border-white transition-colors">
                            Book Your Spot
                        </span>
                    </div>
                </div>
              </div>

              <div className="text-center">
                <button
                    onClick={() => handleLinkClick('/admissions')}
                    className="w-full py-5 bg-white text-[#002B4E] hover:bg-[#C2B067] hover:text-white font-bold uppercase tracking-[2px] text-sm transition-all duration-300 shadow-lg"
                >
                    Apply Now
                </button>
                <p className="text-white/40 text-[10px] mt-4">
                    Taking applications for 2025/2026 intake
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const MenuTextLink = ({
  label,
  icon,
  onClick,
  delay,
  isOpen,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay: number;
  isOpen: boolean;
}) => {
  const anim = staggerItem(delay);

  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-4 text-2xl font-serif font-bold text-white hover:text-[#C2B067] text-left ${anim.base} ${isOpen ? anim.open : anim.closed}`}
      style={anim.style}
    >
      <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#C2B067] opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-300">
        {icon}
      </span>
      <span className="-ml-8 group-hover:ml-0 transition-all duration-300">
        {label}
      </span>
    </button>
  );
};
