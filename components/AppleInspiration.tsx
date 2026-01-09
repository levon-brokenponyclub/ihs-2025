import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { useLayout } from '../context/LayoutContext';

// --- Types & Interfaces ---

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TabData {
  id: string;
  label: string;
  headline: string;
  video: string; // URL to video
  poster: string; // URL to static image
  features: Feature[];
}

// --- Icons (Inline SVGs) ---

const IconPerformance = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" />
    <path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
  </svg>
);

const IconBattery = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" />
  </svg>
);

const IconSpeed = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const IconCamera = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconDisplay = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// --- Data Configuration (Videos replaced with functional placeholders) ---

const STORY_DATA: TabData[] = [
  {
    id: 'chip',
    label: 'M3 Pro Chip',
    headline: 'Power that defies physics.',
    // Tech/Chipset abstract video
    video: 'https://player.vimeo.com/external/538560061.sd.mp4?s=c957358d726b27670732df30b42f2770c3963426&profile_id=164&oauth2_token_id=57447761',
    poster: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000',
    features: [
      { icon: <IconPerformance />, title: 'Next-Gen Architecture', description: 'Experience speed that handles complex workflows effortlessly with our 3nm process technology.' },
      { icon: <IconSpeed />, title: '12-Core CPU', description: 'Multitasking has never been smoother. Render 4K video while compiling code without a stutter.' },
      { icon: <IconBattery />, title: 'All-Day Battery', description: 'Up to 22 hours of video playback. Work unplugged from morning until night.' },
    ]
  },
  {
    id: 'display',
    label: 'Liquid Retina',
    headline: 'A display that demands attention.',
    // Fluid colors/Display abstract video
    video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38af1e1e36319badc&profile_id=164&oauth2_token_id=57447761',
    poster: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000',
    features: [
      { icon: <IconDisplay />, title: 'XDR Dynamic Range', description: 'Extreme brightness and contrast ratio of 1,000,000:1 for true-to-life visuals.' },
      { icon: <IconCamera />, title: 'ProMotion 120Hz', description: 'Adaptive refresh rates for ultra-smooth scrolling and responsive gaming.' },
      { icon: <IconShield />, title: 'Nano-Texture Glass', description: 'Optional matte finish to dramatically reduce glare in bright workspaces.' },
    ]
  },
  {
    id: 'connect',
    label: 'Connectivity',
    headline: 'Connect to everything.',
    // Network/Data abstract video
    video: 'https://player.vimeo.com/external/371839833.sd.mp4?s=6b39922252277d3434d32a4bf77274092497a7e9&profile_id=164&oauth2_token_id=57447761',
    poster: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000',
    features: [
      { icon: <IconSpeed />, title: 'Wi-Fi 6E', description: 'Connect to the fastest wireless networks available with twice the throughput.' },
      { icon: <IconPerformance />, title: 'Thunderbolt 4', description: 'Three ports support high-speed data transfer and up to two 6K displays.' },
      { icon: <IconShield />, title: 'Advanced Security', description: 'Touch ID and Secure Enclave keep your data protected at the hardware level.' },
    ]
  }
];

// --- Animation Constants ---

const EASE_APPLE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1]; 
const EASE_TAB: [number, number, number, number] = [0.4, 0, 0.2, 1];

// --- Components ---

/**
 * StickyStoryBar
 * Pins to bottom of viewport when parent section enters view.
 */
const StickyStoryBar = ({
  isVisible,
  onOpen
}: {
  isVisible: boolean;
  onOpen: () => void;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduceMotion ? 0 : 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_APPLE_DRAWER }}
          className="fixed bottom-8 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-full px-6 py-4 flex items-center gap-8 pointer-events-auto max-w-xl w-full justify-between transform transition-transform hover:scale-[1.02]">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Interactive Tour</span>
              <span className="text-base font-bold text-gray-900">Experience M3 Architecture</span>
            </div>
            <button
              onClick={onOpen}
              className="bg-gray-900 hover:bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Tour
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * TabNav
 * Updated to match CoreOfferings pill style
 */
const TabNav = ({
  activeTab,
  onTabChange
}: {
  activeTab: number;
  onTabChange: (index: number) => void;
}) => {
  return (
    <div className="mt-auto pt-6 flex justify-center w-full">
      <div className="bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-1.5 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar border border-gray-100">
        {STORY_DATA.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(index)}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all duration-300 whitespace-nowrap tracking-[1px] ${
              activeTab === index
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * FeatureRow
 */
const FeatureRow = ({
  feature,
  index
}: {
  feature: Feature;
  index: number;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div variants={variants} className="flex gap-4 items-start py-3 border-b border-gray-50 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mt-0.5 text-gray-700">
        {feature.icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

/**
 * TabPanel
 * Updated layout to fit the new bottom-tabs structure.
 */
const TabPanel = ({
  data,
  isActive,
  layout
}: {
  data: TabData;
  isActive: boolean;
  layout: 'single' | 'two-column';
}) => {
  return (
    <div
      role="tabpanel"
      id={`panel-${data.id}`}
      aria-hidden={!isActive}
      className={`absolute inset-0 transition-none ${isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'}`}
    >
      <motion.div
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.1
            }
          }
        }}
        className="h-full flex flex-col"
      >
        {layout === 'single' && (
           <motion.div
             variants={{ 
               hidden: { opacity: 0, scale: 0.95 },
               visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
             }}
             className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-black shadow-lg shrink-0"
           >
             <video
                className="absolute inset-0 w-full h-full object-cover"
                poster={data.poster}
                src={data.video}
                autoPlay={isActive}
                muted
                loop
                playsInline
             />
             <div className="absolute inset-0 bg-black/10" />
           </motion.div>
        )}

        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
          }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight"
        >
          {data.headline}
        </motion.h3>

        <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {data.features.map((feature, idx) => (
            <FeatureRow key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * StoryModal
 * Redesigned for Split View with Video
 */
const StoryModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const { storyLayout } = useLayout();
  
  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const activeData = STORY_DATA[activeTab];
  const isSplit = storyLayout === 'two-column';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} // Standard Apple ease
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center items-end pointer-events-none h-[90vh] md:h-[85vh]"
          >
            <div 
              className={`
                bg-white w-full h-full rounded-t-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col
                ${isSplit ? 'max-w-5xl md:flex-row' : 'max-w-2xl'}
              `}
            >
              
              {/* Close Button (Absolute) */}
              <button
                onClick={onClose}
                className={`
                  absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-full transition-colors
                  ${isSplit ? 'bg-black/10 hover:bg-black/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}
                `}
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1l12 12M1 13L13 1" />
                </svg>
              </button>

              {/* LEFT/TOP: Video Stage (Only for Split View) */}
              {isSplit && (
                <div className="w-full md:w-[60%] h-[40vh] md:h-full bg-black relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab} // Key forces re-render triggers exit/enter
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <video
                        className="w-full h-full object-cover opacity-90"
                        poster={activeData.poster}
                        src={activeData.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Mobile Title Overlay */}
                  <div className="absolute bottom-6 left-6 md:hidden">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Now Viewing</p>
                    <p className="text-white font-bold text-xl">{activeData.label}</p>
                  </div>
                </div>
              )}

              {/* RIGHT/BOTTOM: Content & Tabs */}
              <div 
                className={`
                  w-full h-full bg-white flex flex-col p-8 md:p-10 relative
                  ${isSplit ? 'md:w-[40%]' : 'w-full'}
                `}
              >
                {!isSplit && (
                   <div className="mb-2 text-center md:text-left">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">In-Depth Look</span>
                   </div>
                )}
                
                {/* Content Area */}
                <div className="flex-1 relative min-h-[250px]">
                  {STORY_DATA.map((tab, idx) => (
                    <TabPanel
                      key={tab.id}
                      data={tab}
                      isActive={activeTab === idx}
                      layout={storyLayout}
                    />
                  ))}
                </div>

                {/* Bottom Navigation */}
                <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Export ---

export default function AppleInspiration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBarVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gray-50 min-h-[150vh]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4 block">Innovation</span>
        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
          The technology behind<br />the magic.
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          Discover how our new architecture redefines performance, efficiency, and capability in a form factor you can take anywhere.
        </p>
        
        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 opacity-20 pointer-events-none select-none">
          {[1, 2, 3].map(i => (
             <div key={i} className="aspect-[4/3] bg-gray-300 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>

      <StickyStoryBar
        isVisible={isBarVisible && !isModalOpen}
        onOpen={() => setIsModalOpen(true)}
      />

      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
