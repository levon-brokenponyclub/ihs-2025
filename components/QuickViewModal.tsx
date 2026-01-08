
import React, { useEffect, useState } from 'react';
import { X, Clock, GraduationCap, ArrowRight, ShoppingBag, Calendar } from 'lucide-react';
import { Offering } from '../types';
import { ACCREDITATION_LOGOS } from '../constants';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';

interface QuickViewModalProps {
  offering: Offering;
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}

// Consolidated Ecommerce Check
const checkIsEcommerce = (course: Offering) => {
    // Only "Purchasing for Food Service Operations" (ID 19) and "Puff Pastry" are Buy Now
    return ['19', 'puff-pastry'].includes(course.id);
};

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ offering, isOpen, onClose, origin }) => {
  const { addToCart } = useCart();
  const [showApplication, setShowApplication] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => requestAnimationFrame(() => setIsActive(true)));
    } else {
      setIsActive(false);
      document.body.style.overflow = 'unset';
      timeoutId = setTimeout(() => setIsRendered(false), 500); // match CSS transition
    }

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isRendered && !isOpen) return null;

  const isEcommerce = checkIsEcommerce(offering);

  const handleAction = () => {
    if (isEcommerce) {
      addToCart(offering);
      setShowCheckout(true);
    } else {
      setShowApplication(true);
    }
  };

  const transformOriginStyle = origin
    ? { transformOrigin: `${origin.x}px ${origin.y}px` }
    : { transformOrigin: 'center center' };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />

        {/* Modal Container */}
        <div
          className={`relative bg-white w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden border border-brand-primary/10 flex flex-col max-h-[95vh] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}`}
          style={transformOriginStyle}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 bg-brand-primary text-white shrink-0 z-20">
            <h2 className="font-serif font-bold text-xl truncate pr-4">Programme Details</h2>
            <button
              onClick={onClose}
              className="text-white h-[40px] w-[40px] flex items-center justify-center hover:opacity-70 transition-opacity bg-white/10 p-2 rounded-full"
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                  <path
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                      style={{
                          fill: 'none',
                          stroke: 'white',
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
                          stroke: 'white',
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
                          stroke: 'white',
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

          {/* Header Media */}
          <div className="relative h-48 shrink-0 bg-gray-100">
            {offering.video ? (
              <video
                src={offering.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={offering.image}
                alt={offering.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="bg-brand-gold text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide shadow-lg">
                {offering.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-full">
              {/* Main Info */}
              <div className="lg:col-span-2 flex flex-col h-full">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-primary font-bold mb-4 leading-tight">
                  {offering.title}
                </h2>

                {offering.shortDescription && (
                  <p className="text-gray-500 text-sm mb-4">{offering.shortDescription}</p>
                )}

                <div className="flex flex-wrap gap-3 mb-6">
                  {offering.accreditations.map((acc, idx) => (
                    <div key={idx} className="bg-surface-main backdrop-blur-sm rounded-sm p-2 flex items-center justify-center h-10 px-3 border border-brand-primary/5">
                      {ACCREDITATION_LOGOS[acc] ? (
                        <img src={ACCREDITATION_LOGOS[acc]} alt={acc} className="max-h-full w-auto grayscale opacity-80" />
                      ) : (
                        <span className="text-[10px] text-center font-bold text-brand-primary uppercase tracking-wider">{acc}</span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  {offering.description}
                </p>

                {offering.highlights && (
                  <div className="mb-8">
                    <h3 className="font-serif text-xl text-brand-primary font-bold mb-4">Programme Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {offering.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0"></div>
                          <span className="text-gray-500 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6">
                  <Link to={`/course/${offering.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full justify-center !text-sm !py-3 !px-4 border-gray-300 hover:bg-gray-50">
                      View More
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    className="flex-1 justify-center !text-sm !py-3 !px-4"
                    onClick={handleAction}
                  >
                    {isEcommerce ? 'Buy Now' : 'Apply Now'} {isEcommerce ? <ShoppingBag size={16} className="ml-2" /> : <ArrowRight size={16} className="ml-2" />}
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-surface-main p-6 rounded-lg border border-brand-primary/5 flex flex-col h-full">
                <div className="mb-6 pb-6 border-b border-brand-primary/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Tuition Fees Per Year</p>
                  <p className="text-3xl font-serif text-brand-gold font-bold">R {offering.price?.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">(Excludes study pack)</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Duration</p>
                    <p className="text-brand-primary font-bold">{offering.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Qualification</p>
                    <p className="text-brand-primary font-bold">{offering.qualification}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Type of Study</p>
                    <p className="text-brand-primary font-bold">Full Time</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Start Date</p>
                    <div className="flex items-start gap-2 text-brand-primary">
                      <Calendar size={16} className="text-brand-gold mt-1" />
                      <div className="flex flex-col">
                        <span className="font-bold">{(offering.startDate || offering.intake)?.split(',')[0]}</span>
                        {(offering.startDate || offering.intake)?.includes(',') && (
                          <span className="text-xs text-gray-400 italic mt-0.5 font-medium">
                            Upcoming: {(offering.startDate || offering.intake)?.split(',').slice(1).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
