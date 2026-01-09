
import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import { COURSE_DETAILS, OFFERINGS } from "../constants";
import { Button } from "./ui/Button";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import {
  CheckCircle,
  Download,
  Award,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  Zap,
  Target,
  GraduationCap,
  ClipboardCheck,
  ShoppingBag,
  List,
  BarChart2,
  X,
  DollarSign,
  CreditCard,
  FileText,
  Share2,
  BookOpen,
  BookmarkPlus,
  MessageCircle,
} from "lucide-react";
import { Offering, CourseDetail as CourseDetailType } from "../types";
import { ApplicationModal } from "./ApplicationModal";
import { CheckoutModal } from "./CheckoutModal";
import { useTransition } from "../context/TransitionContext";
import { useLayout } from "../context/LayoutContext";
import { CourseCardSlider } from "./CourseCardSlider";
import { Testimonial } from "./Testimonial";
import { FinalCTA } from "./FinalCTA";

// --- Light Theme Accordion for Mobile Course Detail ---
interface LightAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  id?: string;
}

const LightAccordionItem: React.FC<LightAccordionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
  id,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    // Only scroll on mobile
    if (
      isOpen &&
      !wasOpen.current &&
      itemRef.current &&
      window.innerWidth < 1024
    ) {
      setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      id={id}
      className={`border-b border-gray-200 bg-white lg:border-none lg:bg-transparent ${
        isOpen ? "scroll-mt-[180px]" : ""
      }`}
    >
      <button
        className="w-full flex justify-between items-center py-5 px-4 text-left focus:outline-none lg:hidden"
        onClick={onToggle}
      >
        <span
          className={`font-serif font-bold text-lg ${
            isOpen ? "text-brand-primary" : "text-gray-700"
          }`}
        >
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="text-brand-accent" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-none lg:opacity-100 lg:overflow-visible ${
          isOpen
            ? "max-h-[2000px] opacity-100 mb-6 lg:mb-0"
            : "max-h-0 opacity-0 lg:mb-0"
        }`}
      >
        <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

// Helper for Ecommerce Check
const checkIsEcommerce = (course: Offering) => {
  // Only "Purchasing for Food Service Operations" (ID 19) and "Puff Pastry" are Buy Now
  return ['19', 'puff-pastry'].includes(course.id);
};

// --- 1. Sticky Mini-CTA (Desktop Only) ---
const StickyMiniCTA = ({
  course,
  visible,
  onApply,
}: {
  course: CourseDetailType;
  visible: boolean;
  onApply: () => void;
}) => {
  const isEcommerce = checkIsEcommerce(course);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] hidden lg:flex items-center gap-4 bg-white/90 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-full shadow-2xl transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col pr-6 border-r border-gray-100">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 leading-none mb-1">
          Studying
        </span>
        <span className="text-sm font-bold text-[#002B4E] truncate max-w-[200px] leading-none">
          {course.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="gold"
          size="sm"
          onClick={onApply}
          className="text-[10px] tracking-[1px] font-bold px-6"
          icon={
            isEcommerce ? <ShoppingBag size={14} /> : <ArrowRight size={14} />
          }
        >
          {isEcommerce ? "BUY NOW" : "APPLY NOW"}
        </Button>
        <Button
          variant="outline-gold"
          size="sm"
          className="text-[10px] tracking-[1px] font-bold px-6"
          icon={<Download size={14} />}
        >
          DOWNLOAD BROCHURE
        </Button>
      </div>
    </div>
  );
};

// --- 2. Social Proof Block ---
const SocialProofBlock = () => (
  <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
    <div className="flex -space-x-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
        >
          <img
            src={`https://i.pravatar.cc/100?img=${i + 10}`}
            alt="Student"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      ))}
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Award key={s} size={12} className="text-brand-gold fill-current" />
        ))}
      </div>
      <p className="text-xs text-gray-500 italic">
        "The practical industry exposure changed my career path entirely." —{" "}
        <span className="font-bold text-gray-700 not-italic">
          Sarah M., Class of 2024
        </span>
      </p>
    </div>
  </div>
);

// --- 4. WIL Info Box ---
const WILInfoBox = ({ duration }: { duration?: string }) => (
  <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-sm p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
    <div className="flex flex-col gap-2">
      <Clock size={16} className="text-brand-gold" />
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Duration
        </p>
        <p className="text-sm font-bold text-brand-primary">
          {duration || "12–20 Weeks"}
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <MapPin size={16} className="text-brand-gold" />
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Placement
        </p>
        <p className="text-sm font-bold text-brand-primary">Industry Nodes</p>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <Award size={16} className="text-brand-gold" />
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          RPL
        </p>
        <p className="text-sm font-bold text-brand-primary">Up to 50%</p>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <CheckCircle size={16} className="text-brand-gold" />
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Required
        </p>
        <p className="text-sm font-bold text-brand-primary">Portfolio</p>
      </div>
    </div>
  </div>
);

// --- Accreditation Row Component ---
const AccreditationRow = ({ accreditations }: { accreditations: string[] }) => {
  if (!accreditations || accreditations.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 items-center">
      {accreditations.map((acc, idx) => {
        let src = "";
        if (acc === "IHS" || acc === "International Hotel School") {
          // Using matching paths as previously defined in the file
          src = "components/assets/logos/ihs-logo-dark.png";
        } else if (acc === "AHLEI") {
          src =
            "components/assets/logos/american-hotel-lodging-educational-institute-r6djf1a4jfs1u9sokoij74ckub80bbe63d3o4wvozc.png";
        }

        if (
          !src &&
          (/^https?:\/\//.test(acc) || /\.(svg|png|jpe?g|webp)$/i.test(acc))
        ) {
          src = acc;
        }

        if (src) {
          return (
            <img
              key={idx}
              src={src}
              alt={acc}
              className="max-h-10 w-auto object-contain opacity-90 transition-opacity"
            />
          );
        }
        return null;
      })}
    </div>
  );
};

// --- Bottom Drawer Component (Mobile Conversion) ---
const MobileFeesDrawer = ({
  course,
  isOpen,
  onToggle,
  onApply,
  showTitle,
}: {
  course: CourseDetailType;
  isOpen: boolean;
  onToggle: () => void;
  onApply: () => void;
  showTitle: boolean;
}) => {
  const isEcommerce = checkIsEcommerce(course);
  const ctaLabel = isEcommerce ? "Buy Now" : "Apply Now";

  // Logic: Show Title in header if scrolled past hero (showTitle=true) OR if drawer is open
  const displayTitleInHeader = showTitle || isOpen;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onToggle();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onToggle]);

  return (
    <div
      className="group fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white rounded-t-3xl flex flex-col items-center mx-auto max-w-4xl border-t border-x border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      data-state={isOpen ? "open" : "closed"}
      role="region"
      aria-label="Course Fees Details"
    >
      <button
        onClick={onToggle}
        className="w-full h-8 flex items-center justify-center cursor-pointer hover:bg-slate-50 rounded-t-3xl transition-colors focus:outline-none"
        aria-label={isOpen ? "Collapse details" : "Expand details"}
        aria-expanded={isOpen}
      >
        <span className="w-12 h-1.5 bg-slate-300 rounded-full"></span>
      </button>

      <div
        className="w-full px-6 md:px-10 pb-4 cursor-pointer flex flex-col"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center w-full gap-4 h-12 overflow-hidden relative">
          <div className="flex-1 relative h-full">
            <div
              className={`absolute inset-0 flex items-center justify-between transition-all duration-500 ease-in-out ${
                displayTitleInHeader
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div className="flex flex-col">
                <p className="text-gray-500 text-[10px] uppercase tracking-[1px] font-bold">
                  2026 FEES
                </p>
                <p className="text-gray-400 text-[9px] uppercase tracking-[1px] font-bold -mt-1">
                  Per Year
                </p>
              </div>
              <p className="text-2xl font-serif text-[#002B4E] font-bold leading-none">
                {course.fees.tuition}
              </p>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                displayTitleInHeader
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <h3 className="font-serif text-lg font-bold text-[#002B4E] truncate leading-normal px-4 text-center">
                {course.title}
              </h3>
            </div>
          </div>

          <div
            className={`text-[#C2B067] transition-transform duration-500 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronUp size={24} />
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 overflow-hidden transition-[max-height,opacity,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-0 opacity-0 pb-0 group-data-[state=open]:max-h-[85vh] group-data-[state=open]:opacity-100 group-data-[state=open]:pb-10">
        <div className="pt-2 border-t border-slate-100 mt-2">
          <div className="mb-4 mt-2">
            {displayTitleInHeader && (
              <div className="mb-4 flex justify-between items-center border-b border-gray-100 pb-4">
                <p className="text-gray-500 text-[10px] uppercase tracking-[1px] font-bold">
                  Tuition
                </p>
                <p className="text-3xl font-serif text-[#002B4E] font-bold">
                  {course.fees.tuition}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between text-sm border-b border-gray-100 pb-3">
                <span className="text-gray-600">Registration Fee</span>
                <span className="text-[#002B4E] font-bold">
                  {course.fees.registration}
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-100 pb-3">
                <span className="text-gray-600">Payment Terms</span>
                <span className="text-[#002B4E] font-bold">
                  Monthly / Annually
                </span>
              </div>
              {course.effort && (
                <div className="flex justify-between text-sm border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Effort</span>
                  <span className="text-[#002B4E] font-bold">
                    {course.effort}
                  </span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-4 italic leading-relaxed text-center">
              *{course.fees.note}
            </p>
          </div>

          <div className="mb-6">
            <AccreditationRow accreditations={course.accreditations} />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="gold"
              onClick={(e) => {
                e.stopPropagation();
                onApply();
              }}
              className="w-full"
              icon={isEcommerce ? <ShoppingBag size={16} /> : undefined}
            >
              {ctaLabel}
            </Button>

            <Button
              variant="outline-gold"
              className="w-full bg-white/0"
              icon={<Download size={16} />}
            >
              Download Prospectus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Programme Overview Card ---
const ProgrammeOverviewCard = ({
  course,
  variant = "default",
  externalOpen,
  onToggleExternal,
}: {
  course: CourseDetailType;
  variant?: "default" | "light";
  externalOpen?: boolean;
  onToggleExternal?: (val: boolean) => void;
}) => {
  const isLight = variant === "light";
  const [internalOpen, setInternalOpen] = useState(false);

  // Controlled or Uncontrolled toggle logic
  const showProgrammeDetails = externalOpen !== undefined ? externalOpen : internalOpen;
  const toggle = (val: boolean) => {
    if (onToggleExternal) {
      onToggleExternal(val);
    } else {
      setInternalOpen(val);
    }
  };

  return (
    <>
      {/* Side Slide-Out Panel */}
      {createPortal(
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
            showProgrammeDetails
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
              showProgrammeDetails ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => toggle(false)}
          />

          {/* Slide Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
              showProgrammeDetails ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="text-brand-primary font-serif font-bold text-xl">
                Programme Details
              </h2>
              <button
                onClick={() => toggle(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Qualification */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                    Qualification
                  </h3>
                  <p className="text-sm font-bold text-brand-primary leading-relaxed whitespace-pre-line">
                    {course.certification || course.qualification}
                  </p>
                </div>
              </div>

              {/* Effort */}
              {course.effort && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                      Effort
                    </h3>
                    <p className="text-sm font-bold text-brand-primary leading-relaxed">
                      {course.effort}
                    </p>
                  </div>
                </div>
              )}

              {/* Entry Requirements */}
              {course.requirements && course.requirements.length > 0 && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                    <ClipboardCheck size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-2">
                      Entry Requirements
                    </h3>
                    <ul className="space-y-3">
                      {course.requirements.map((req, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Finance Details Section */}
              <div className="pt-8 border-t border-gray-100">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                    <DollarSign size={20} className="text-brand-gold" />
                  </div>
                  <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mt-3">
                    Finance Details
                  </h3>
                </div>

                <div className="space-y-4 pl-14">
                  <div className="flex justify-between text-sm border-b border-gray-50 pb-3">
                    <span className="text-gray-600">Registration Fee</span>
                    <span className="text-[#002B4E] font-bold">
                      {course.fees.registration}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm border-b border-gray-50 pb-3">
                    <span className="text-gray-600">Payment Terms</span>
                    <span className="text-[#002B4E] font-bold">
                      Monthly / Annually
                    </span>
                  </div>

                  {course.fees.note && (
                    <p className="text-[10px] text-gray-500 italic leading-relaxed pt-2">
                      *{course.fees.note}
                    </p>
                  )}
                  
                  {/* Accreditations in Panel */}
                  <div className="pt-6">
                     <AccreditationRow accreditations={course.accreditations} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    <div
      className={`${
        isLight
          ? "bg-white border border-gray-200 shadow-sm"
          : "bg-[#002B4E] border border-white/10 shadow-xl"
      } rounded-sm overflow-hidden transition-all duration-500 relative flex flex-col mb-6`}
    >
      <div className="p-6">
        <div className="relative z-10">
          <div
            onClick={() => toggle(true)}
            className={`flex items-center justify-between mb-5 border-b pb-3  cursor-pointer group ${
              isLight ? "border-gray-100" : "border-white/10"
            }`}
          >
            <h3
              className={`text-sm font-bold uppercase tracking-[1px] ${
                isLight ? "text-brand-primary" : "text-white"
              }`}
            >
              Programme Overview
            </h3>
            <span
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition ${
                isLight
                  ? "text-brand-primary group-hover:text-brand-gold"
                  : "text-white group-hover:text-brand-gold"
              }`}
            >
              View More
              <span aria-hidden>→</span>
            </span>
          </div>
          

          <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
            {/* DURATION */}
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                Duration
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isLight ? "bg-brand-primary/5" : "bg-white/10"
                  }`}
                >
                  <Clock size={14} className="text-brand-gold" />
                </div>
                <p
                  className={`text-xs font-bold ${
                    isLight ? "text-brand-primary" : "text-white"
                  }`}
                >
                  {course.duration}
                </p>
              </div>
            </div>

            {/* FOCUS AREA */}
            <div className="flex flex-col gap-1 md:border-l md:pl-4">
              <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                Focus Area
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isLight ? "bg-brand-primary/5" : "bg-white/10"
                  }`}
                >
                  <Target size={14} className="text-brand-gold" />
                </div>
                <p
                  className={`text-xs font-bold line-clamp-2 ${
                    isLight ? "text-brand-primary" : "text-white"
                  }`}
                >
                  {course.category}
                </p>
              </div>
            </div>

            {/* START DATE */}
            <div className="flex flex-col gap-1 md:border-l md:pl-6">
              <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                Start Date
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isLight ? "bg-brand-primary/5" : "bg-white/10"
                  }`}
                >
                  <Calendar size={14} className="text-brand-gold" />
                </div>
                <div className="leading-tight">
                  <p
                    className={`text-xs font-bold ${
                      isLight ? "text-brand-primary" : "text-white"
                    }`}
                  >
                    {(course.startDate || course.intake)?.split(",")[0]}
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};
const FeesCard = ({
  course,
  onApply,
}: {
  course: CourseDetailType;
  onApply: () => void;
}) => {
  const { addToCart } = useCart();
  const [showMore, setShowMore] = useState(false);

  const isEcommerce = checkIsEcommerce(course);

  return (
    <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-xl transition-all duration-500">
      {/* Header */}
      <div className="p-4 text-center bg-[#002B4E]">
        <span className="font-bold uppercase tracking-[1px] text-sm text-white">
          2026 Fees
        </span>
      </div>

      <div className="p-8">
        {/* 1. Price */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-[1px] mb-2">
            Per Year
          </p>
          <p className="text-4xl font-serif text-[#002B4E] font-bold">
            {course.fees.tuition}
          </p>
        </div>

        {/* 2. Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Button
            variant="gold"
            className="w-full tracking-[1px] text-[10px] uppercase font-bold py-3"
            onClick={onApply}
            icon={
              isEcommerce ? <ShoppingBag size={16} /> : <ArrowRight size={16} />
            }
          >
            {isEcommerce ? "Buy Now" : "Apply Now"}
          </Button>

          <Button
            variant="outline-gold"
            className="w-full tracking-[1px] text-[10px] uppercase font-bold py-3"
            icon={<Download size={14} />}
          >
            Download Brochure
          </Button>
        </div>

        {/* 3. Show More (toggle + hidden content) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showMore ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Registration Fee</span>
              <span className="text-[#002B4E] font-bold">
                {course.fees.registration}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Terms</span>
              <span className="text-[#002B4E] font-bold">
                Monthly / Annually
              </span>
            </div>

            <p className="text-[10px] text-gray-500 italic leading-relaxed text-center pt-2">
              *{course.fees.note}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 mb-6 text-[10px] font-bold uppercase tracking-[1px] text-brand-gold hover:text-brand-primary transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          {showMore ? "Show Less" : "Show More Details"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              showMore ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* 4. Logo Images (Accreditations) */}
        <div className="border-t border-gray-100 pt-6">
          <AccreditationRow accreditations={course.accreditations} />
        </div>
      </div>
    </div>
  );
};

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState("overview");
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const { layout: selectedLayout } = useLayout();
  // Header Visibility State sync (mirrored logic from Header.tsx)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    "overview"
  );
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMore, setShowMore] = useState(false); // Added for layout2 show more functionality
  // Side Panel External Control for Layout 2
  const [showSidePanel, setShowSidePanel] = useState(false);

  const [contentReady, setContentReady] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerMeasureRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  // Safeguard transition state access to prevent undefined error
  const transitionData = useTransition();
  // Fallback if transitionData itself is undefined (though context provider should prevent this)
  const transitionState = transitionData?.transitionState || {
    phase: "idle",
    isTransitioning: false,
  };
  const { startTransition } = transitionData || { startTransition: () => {} };

  // Removed unused variable `contentReady`

  const course = useMemo(() => {
    if (!id) return COURSE_DETAILS["1"];
    if (COURSE_DETAILS[id]) return COURSE_DETAILS[id];

    // Fallback: Try to find in OFFERINGS
    const offering = OFFERINGS.find((o) => o.id === id);
    if (offering) {
      // Create a minimal CourseDetail object from the Offering
      return {
        ...offering,
        fullDescription: offering.description, // Fallback
        level: offering.qualification,
        deliveryMode: offering.programmeTypes.join(", "),
        accreditations: offering.accreditations,
        curriculum: [], // Empty default
        requirements: [],
        careerOutcomes: [],
        fees: { tuition: "View Fees", registration: "", note: "" },
      } as CourseDetailType;
    }

    return COURSE_DETAILS["1"];
  }, [id]);

  const isEcommerce = checkIsEcommerce(course);
  const inCompare = isInCompare(course.id || "");

  // --- Related Programmes Logic ---
  const relatedOfferings = useMemo(() => {
    return OFFERINGS.filter(
      (o) =>
        o.id !== course.id &&
        (o.category === course.category ||
          o.programmeTypes.some((t) => course.programmeTypes.includes(t)))
    ).slice(0, 6); // Up to 6 for the slider
  }, [course]);

  const SECTIONS = useMemo(() => {
    const sections = [
      { id: "overview", label: "Overview" },
      { id: "content", label: "Programme Curriculum" },
    ];

    if (course.successfulGraduates) {
      sections.push({ id: "graduates", label: "Successful Graduates" });
    }

    if (course.workIntegratedLearning) {
      sections.push({ id: "wil", label: "Work Integrated Learning" });
    }

    sections.push({ id: "faq", label: "FAQs" });

    return sections;
  }, [course]);

  // Helpers for Breadcrumbs
  const primaryType = course.programmeTypes[0] || "Programme";
  const getArchiveLink = (type: string) => {
    if (type.includes("Full Time")) return "/programmes/full-time";
    if (type.includes("Blended")) return "/programmes/blended";
    if (type.includes("In-Service")) return "/programmes/in-service";
    if (type.includes("Part Time")) return "/programmes/part-time";
    if (type.includes("Online")) return "/programmes/online";
    return "/";
  };
  const archiveLink = getArchiveLink(primaryType);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset content ready state when navigating to new course
    setContentReady(false);
    setVideoLoaded(false);
  }, [id]);

  // Manage content visibility during page transition
  useEffect(() => {
    // Keep content hidden while transitioning overlays are active
    if (
      transitionState.phase === "complete" ||
      transitionState.phase === "idle"
    ) {
      // Small delay to ensure overlays have faded out
      const timer = setTimeout(() => setContentReady(true), 500);
      return () => clearTimeout(timer);
    } else {
      setContentReady(false);
    }
  }, [transitionState.phase]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight =
        heroRef.current?.offsetHeight || (selectedLayout === "layout1" ? 400 : 0);

      // Header Visibility Logic (Matches Header.tsx)
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Sticky Logic - Adjusted for breadcrumb bar (approx 56px)
      const isSticky = window.scrollY >= heroHeight + 56 - 80;
      setIsTabsSticky(isSticky);
      setScrolledPastHero(window.scrollY > heroHeight - 150);

      // Near Footer Detection for Sticky CTA
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const nearBottom = scrollHeight - (currentScrollY + clientHeight) < 600;
      setIsNearFooter(nearBottom);

      // Spy Scroll Logic
      if (window.innerWidth >= 1024) {
        const offset = 200;
        const scrollPosition = window.scrollY + offset;

        for (const section of SECTIONS) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            if (
              scrollPosition >= absoluteTop &&
              rect.height + absoluteTop > scrollPosition
            ) {
              setActiveSection(section.id);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [SECTIONS, selectedLayout]);

  const handleTabClick = (sectionId: string) => {
    setActiveSection(sectionId);

    if (window.innerWidth < 1024) {
      setOpenMobileSection(sectionId);
      setIsPaymentDrawerOpen(false);
      setTimeout(() => {
        const el = document.getElementById(`mobile-${sectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = isHeaderVisible ? 160 : 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const handleApply = () => {
    setIsPaymentDrawerOpen(false);
    if (isEcommerce) {
      addToCart(course);
      setShowCheckout(true);
    } else {
      setShowApplication(true);
    }
  };

  // Payment Drawer handlers
  const openPaymentDrawer = () => setIsPaymentDrawerOpen(true);
  const closePaymentDrawer = () => setIsPaymentDrawerOpen(false);

  const handleRelatedExpand = (
    offering: Offering,
    imgRect: DOMRect,
    txtRect: DOMRect,
    catRect: DOMRect
  ) => {
    startTransition(offering, imgRect, txtRect, catRect);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-0 pb-20 lg:pb-0">
      {/* Hero Section */}
      {selectedLayout === "layout1" && (
        <section
          ref={heroRef}
          className="relative bg-brand-primary h-[450px] lg:h-[calc(100vh-80px)] flex flex-col"
        >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 bg-brand-primary overflow-hidden">
          {course.video ? (
            <>
              {/* Fallback Image while Video Loads */}
              <img
                src={course.image}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  videoLoaded ? "opacity-0" : "opacity-70"
                }`}
                alt=""
              />
              <video
                key={course.video} // Force remount if video source changes
                src={course.video}
                loop
                playsInline
                autoPlay
                muted
                onLoadedData={() => setVideoLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  videoLoaded ? "opacity-70" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <img
              src={course.image}
              className="w-full h-full object-cover opacity-70"
              alt=""
            />
          )}
          <div className="absolute inset-0 z-10 bg-brand-primary/30" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-primary via-brand-primary/50 to-transparent" />
        </div>

        {/* Content Layer */}
        <div
          className={`relative z-20 flex-grow flex items-center transition-opacity duration-700 delay-150 ease-out ${
            contentReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="lg:w-2/3 w-full pb-5 lg:pb-0 relative">
              {/* Back Navigation */}
              <div className="overflow-hidden mb-6">
                <Link
                  to={archiveLink}
                  className={`inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest ${
                    contentReady
                      ? "hero-enter animation-delay-100"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Programmes
                </Link>
              </div>

              {/* Mobile Meta - MOVED ABOVE TITLE */}
              <div className="lg:hidden overflow-hidden mb-[2rem]">
                <div
                  className={`flex items-center gap-4 text-white/80 text-xs font-bold uppercase tracking-widest md:gap-8 ${
                    contentReady
                      ? "hero-enter animation-delay-200"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-brand-gold" />{" "}
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-white">
                    <Target className="w-4 h-4 text-brand-gold" />{" "}
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 text-white">
                    <GraduationCap className="w-4 h-4 text-brand-gold" />{" "}
                    {course.qualification}
                  </span>
                </div>
              </div>

              {/* Title - Line Height 1.25 */}
              <div className="overflow-hidden mb-[3rem] pb-4">
                <h1
                  className={`font-serif text-3xl md:text-3xl lg:text-6xl text-white font-semibold leading-[1.35] drop-shadow-lg ${
                    contentReady
                      ? "hero-enter animation-delay-300"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  {course.title}
                </h1>
              </div>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex gap-4 mt-8 overflow-hidden pb-4">
                <div className={`flex gap-4`}>
                  <div
                    className={`${
                      contentReady
                        ? "hero-enter animation-delay-500"
                        : "translate-y-[110%] opacity-0"
                    }`}
                  >
                    <Button
                      variant="gold"
                      className="px-10 py-4 text-sm"
                      icon={
                        isEcommerce ? (
                          <ShoppingBag size={18} />
                        ) : (
                          <ArrowRight size={18} />
                        )
                      }
                      onClick={handleApply}
                    >
                      {isEcommerce ? "Buy Now" : "Apply Now"}
                    </Button>
                  </div>
                  <div
                    className={`${
                      contentReady
                        ? "hero-enter animation-delay-500"
                        : "translate-y-[110%] opacity-0"
                    }`}
                  >
                    <Button
                      variant="outline-gold"
                      className="px-10 py-4 text-sm bg-transparent"
                      icon={<Download size={18} />}
                    >
                      Download Brochure
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Buttons */}
              <div className="lg:hidden flex flex-col gap-3">
                <div
                  className={`${
                    contentReady
                      ? "hero-enter animation-delay-500"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <Button
                    variant="gold"
                    className="w-full"
                    onClick={handleApply}
                    icon={isEcommerce ? <ShoppingBag size={16} /> : undefined}
                  >
                    {isEcommerce ? "Buy Now" : "Apply Now"}
                  </Button>
                </div>
                <div
                  className={`${
                    contentReady
                      ? "hero-enter animation-delay-500"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <Button
                    variant="outline-gold"
                    className="w-full bg-transparent"
                    icon={<Download size={16} />}
                  >
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Meta Section - Desktop Only */}
        <div className="hidden lg:flex relative z-30 mt-auto h-[115px] border-t border-white/10 items-center w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Full width grid for 4 items */}
            <div className="w-full grid grid-cols-4 gap-8">
              <div className="overflow-hidden pb-1">
                <div
                  className={`flex items-center gap-4 ${
                    contentReady
                      ? "hero-enter animation-delay-400"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">
                      Duration
                    </p>
                    <p className="text-white font-semibold">
                      {course.duration}
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  className={`flex items-center gap-4 ${
                    contentReady
                      ? "hero-enter animation-delay-550"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">
                      Focus Area
                    </p>
                    <p className="text-white font-semibold">
                      {course.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  className={`flex items-center gap-4 ${
                    contentReady
                      ? "hero-enter animation-delay-700"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">
                      Level of Study
                    </p>
                    <p className="text-white font-semibold">
                      {course.qualification}
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div
                  className={`flex items-center gap-4 ${
                    contentReady
                      ? "hero-enter animation-delay-850"
                      : "translate-y-[110%] opacity-0"
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-brand-gold text-xs uppercase font-bold mb-1 tracking-[1px]">
                      Start Date
                    </p>
                    <div className="flex flex-col">
                      <p className="text-white font-semibold">
                        {" "}
                        {(course.startDate || course.intake)?.split(",")[0]}
                      </p>
                      {/* {(course.startDate || course.intake)?.includes(',') && (
                                                <p className="text-white/50 text-[10px] italic leading-tight mt-0.5">
                                                    Upcoming: {(course.startDate || course.intake)?.split(',').slice(1).join(', ')}
                                                </p>
                                            )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <div
        className={`transition-all duration-1000 delay-150 ease-out ${
          contentReady
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12"
        }`}
      >
        {/* Sticky Full-Width Tabs - Below Header, Spans 100% Width */}
        <div
          className={`sticky z-30 bg-white border-b border-gray-200 w-full transition-all duration-300 ease-in-out ${
            isTabsSticky ? "shadow-md" : ""
          }`}
          style={{ top: isHeaderVisible ? "80px" : "0px" }}
        >
          {/* Full-width container, content centered with max-w-7xl */}
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleTabClick(sec.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[1px] whitespace-nowrap transition-colors ${
                        activeSection === sec.id
                          ? "bg-brand-primary text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: 55% Content / 45% Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className={
              selectedLayout === "layout1"
                ? "grid grid-cols-1 lg:grid-cols-3 gap-12"
                : "flex flex-col lg:flex-row gap-8"
            }
          >
            {/* Left Column (55%): Scrollable Content */}
            <div
              className={
                selectedLayout === "layout1"
                  ? "lg:col-span-2 space-y-4 lg:space-y-16"
                  : "w-full lg:w-[55%] lg:shrink-0"
              }
            >
              {/* Course Image/Video - Only for Layout 2 (No Hero) */}
              {selectedLayout === "layout2" && (
                <div className="lg:mt-0">
                  {course.video ? (
                    <div className="mb-8">
                      <video
                        src={course.video}
                        autoPlay
                        loop
                        muted
                        className="w-full rounded-lg lg:shadow-sm overflow-hidden"
                      />
                    </div>
                  ) : course.image ? (
                    <div className="mb-8">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full rounded-sm lg:shadow-sm"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {/* 1. Overview */}
              <div className={selectedLayout === "layout1" ? "" : "lg:mt-12"}>
                <LightAccordionItem
                  id="mobile-overview"
                  title="Overview"
                  isOpen={
                    window.innerWidth < 1024
                      ? openMobileSection === "overview"
                      : true
                  }
                  onToggle={() =>
                    setOpenMobileSection(
                      openMobileSection === "overview" ? null : "overview"
                    )
                  }
                >
                  <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                    <div
                      id="overview"
                      className="bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100"
                    >
                      <h2 className="hidden lg:block text-2xl font-serif text-brand-primary mb-6 font-bold">
                        Overview
                      </h2>
                      <div className="text-base leading-relaxed text-gray-600 whitespace-pre-line space-y-6">
                        <p>{course.fullDescription}</p>
                      </div>

                      {/* Extended Focus Areas */}
                      {course.extendedFocusAreas && (
                        <div className="mt-8 space-y-6">
                            <h3 className="text-xl font-serif font-bold text-brand-primary">Choose your degree focus area:</h3>
                            <p className="text-sm text-gray-600 italic">All the below focus areas include masterclass specialisation sessions, assignments and Work Integrated Learning projects.</p>
                            <div className="grid grid-cols-1 gap-6">
                                {course.extendedFocusAreas.map((area, idx) => (
                                    <div key={idx} className="bg-white border border-gray-200 p-6 rounded-sm hover:border-brand-gold/50 transition-colors">
                                        <h4 className="font-bold text-brand-primary mb-2">{area.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{area.description}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 italic mt-4">In the case of insufficient interest in one of the Focus Areas, or other unforeseen circumstances, IHS reserves the right to omit that Focus Area for the year in question.</p>
                        </div>
                      )}

                      {/* Social Proof Injection */}
                      <SocialProofBlock />
                    </div>
                  </div>
                </LightAccordionItem>
              </div>

              {/* 2. Programme Curriculum */}
              <div className="lg:mt-12">
                <LightAccordionItem
                  id="mobile-content"
                  title="Programme Curriculum"
                  isOpen={
                    window.innerWidth < 1024
                      ? openMobileSection === "content"
                      : true
                  }
                  onToggle={() =>
                    setOpenMobileSection(
                      openMobileSection === "content" ? null : "content"
                    )
                  }
                >
                  <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                    <div
                      id="content"
                      className="bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100"
                    >
                      <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Programme Curriculum
                      </h3>

                      <div className="mb-8">
                        <h4 className="font-bold text-gray-800 mb-6 text-sm uppercase tracking-[1px]">
                          WHAT YOU WILL LEARN
                        </h4>
                        <ul className="flex flex-col gap-4">
                          {course.programContentIncludes?.map((item, index) => (
                            <li key={index} className="flex items-center gap-4 p-5 rounded-sm bg-gray-50/50 border border-gray-100 transition-colors hover:bg-white hover:border-brand-gold/30">
                              <div className="shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100 shadow-sm">
                                <CheckCircle size={14} className="text-brand-gold" />
                              </div>
                              <span className="text-sm text-gray-600 leading-relaxed font-medium">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </LightAccordionItem>
              </div>

              {/* 3. Successful Graduates */}
              {course.successfulGraduates && (
                <div className="lg:mt-12">
                  <LightAccordionItem
                    id="mobile-graduates"
                    title="Successful Graduates"
                    isOpen={
                      window.innerWidth < 1024
                        ? openMobileSection === "graduates"
                        : true
                    }
                    onToggle={() =>
                      setOpenMobileSection(
                        openMobileSection === "graduates" ? null : "graduates"
                      )
                    }
                  >
                    <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                      <div
                        id="graduates"
                        className="lg:bg-white lg:p-8 lg:shadow-none lg:border lg:border-gray-100"
                      >
                        <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                          <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                          Successful Graduates
                        </h3>
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-[1px]">
                            What will I receive?
                          </h4>
                          <p className="text-sm leading-relaxed text-gray-600">
                            {course.successfulGraduates}
                          </p>
                        </div>
                      </div>
                    </div>
                  </LightAccordionItem>
                </div>
              )}

              {/* 4. Work Integrated Learning */}
              {course.workIntegratedLearning && (
                <div className="lg:mt-12">
                  <LightAccordionItem
                    id="mobile-wil"
                    title="Work Integrated Learning"
                    isOpen={
                      window.innerWidth < 1024
                        ? openMobileSection === "wil"
                        : true
                    }
                    onToggle={() =>
                      setOpenMobileSection(
                        openMobileSection === "wil" ? null : "wil"
                      )
                    }
                  >
                    <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                      <div
                        id="wil"
                        className="bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100"
                      >
                        <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                          <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                          Work Integrated Learning
                        </h3>

                        <WILInfoBox duration={course.wilDuration} />

                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                          <p>{course.workIntegratedLearning}</p>
                        </div>
                      </div>
                    </div>
                  </LightAccordionItem>
                </div>
              )}

              {/* 5. FAQs */}
              <div className="lg:mt-12">
                <LightAccordionItem
                  id="mobile-faq"
                  title="FAQs"
                  isOpen={
                    window.innerWidth < 1024 ? openMobileSection === "faq" : true
                  }
                  onToggle={() =>
                    setOpenMobileSection(
                      openMobileSection === "faq" ? null : "faq"
                    )
                  }
                >
                  <div className="px-4 text-gray-600 text-sm leading-relaxed lg:px-0">
                    <div
                      id="faq"
                      className="bg-white lg:p-8 lg:rounded-sm lg:shadow-sm lg:border lg:border-gray-100"
                    >
                      <h3 className="hidden lg:flex text-brand-primary font-serif text-2xl mb-6 items-center gap-3 font-bold">
                        <span className="w-8 h-1 bg-brand-gold rounded-full"></span>
                        Frequently Asked Questions
                      </h3>
                      <div className="space-y-4">
                        <details className="group">
                          <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none">
                            <span>Difference between Diploma and Degree?</span>
                            <span className="transition group-open:rotate-180">
                              <ChevronDown size={16} />
                            </span>
                          </summary>
                          <div className="text-gray-600 text-sm mt-3 leading-relaxed group-open:animate-fadeIn">
                            Degrees focus on strategic management (NQF 7), while
                            Diplomas focus on operational management (NQF 6).
                          </div>
                        </details>
                        <hr className="border-gray-100" />
                        <details className="group">
                          <summary className="flex justify-between items-center font-bold text-gray-800 cursor-pointer list-none">
                            <span>Are payment plans available?</span>
                            <span className="transition group-open:rotate-180">
                              <ChevronDown size={16} />
                            </span>
                          </summary>
                          <div className="text-gray-600 text-sm mt-3 leading-relaxed group-open:animate-fadeIn">
                            Yes, we offer flexible monthly payment terms for all our
                            programmes.
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </LightAccordionItem>
              </div>
            </div>

            {/* Right Column (44%): Sticky Sidebar (No Scroll) */}
            <div
              className={
                selectedLayout === "layout1"
                  ? "hidden lg:block lg:col-span-1"
                  : "hidden lg:block w-[44%] lg:shrink-0"
              }
            >
              <div
                className={
                  selectedLayout === "layout1"
                    ? "sticky space-y-8"
                    : "lg:sticky lg:top-24 space-y-8"
                }
                style={
                  selectedLayout === "layout1"
                    ? { top: isHeaderVisible ? "160px" : "80px" }
                    : undefined
                }
              >
                {selectedLayout === "layout1" ? (
                  <>
                    <FeesCard course={course} onApply={handleApply} />
                    <ProgrammeOverviewCard course={course} />
                  </>
                ) : (
                  <>
                    {/* Category Badge + Title */}
                    <div className="space-y-4">
                      
                      <h1 className="text-4xl sm:text-4xl font-serif font-semibold text-[#002B4E] balance leading-relaxed">
                        {course.title}
                      </h1>
                    </div>

                    <ProgrammeOverviewCard
                      course={course}
                      variant="light"
                      externalOpen={showSidePanel}
                      onToggleExternal={setShowSidePanel}
                    />

                    {/* Info Card */}
                    <div className="bg-white rounded-sm border p-0 border-gray-200 overflow-hidden mt-6">
                      {/* Tuition Fee */}
                      <div className="p-6 pb-0 mb-6">
                        <div
                          className="flex items-center justify-between cursor-pointer group mb-6"
                          onClick={() => setShowSidePanel(true)}
                        >
                          <div>
                            <p className="text-gray-500 text-[10px] uppercase tracking-[1px] mb-0 font-bold">
                              Per Year
                            </p>
                            <p className="text-4xl font-bold font-serif text-[#002B4E]">
                              {course.fees.tuition}
                            </p>
                            
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="hidden sm:inline-flex gap-1 items-center px-3.5 py-1.5 bg-brand-primary/5 border uppercase border-brand-primary/10 rounded-full text-brand-primary text-[10px] font-bold font-sans tracking-wider whitespace-nowrap hover:bg-brand-gold/20 hover:border-brand-gold transition-colors hover:text-brand-gold transition-colors">
                              Finance Details
                              <ChevronRight
                                size={16}
                                className="text-brand-primary group-hover:text-brand-gold transition-colors"
                              />
                            </span>
                          </div>
                        </div>

                        <Button 
                          variant="gold"
                          className="w-full tracking-[1px] text-[10px] uppercase font-bold py-3 mb-0 mt-2"
                          onClick={handleApply}
                          icon={
                            isEcommerce ? <ShoppingBag size={16} /> : undefined
                          }
                        >
                          {isEcommerce ? "Buy Now" : "Apply Now"}
                        </Button>

                        {}
                      </div>

                      {/* Compare & Action Buttons */}
                      <div className="p-5 space-y-3 p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => {
                              const cid = course.id || "";
                              if (inCompare) {
                                removeFromCompare(cid);
                              } else {
                                addToCompare(course as unknown as Offering);
                              }
                            }}
                            className={`flex-1 tracking-[1px] text-[10px] uppercase font-bold !py-3 ${
                              inCompare
                                ? "bg-brand-primary text-white border-brand-primary"
                                : "bg-white border-gray-300"
                            }`}
                            icon={<BarChart2 size={14} />}
                          >
                            {inCompare ? "Remove" : "Compare"}
                          </Button>
                          <Button
                            className="flex-1 tracking-[1px] text-[10px] uppercase font-bold !py-3 bg-brand-primary border-brand-primary text-white hover:bg-brand-primary/90"
                            icon={<Download size={14} />}
                          >
                            Brochure
                          </Button>
                        </div>
                      </div>

                      {/* Accreditations */}
                      {/* <div className="p-4">
                        <div className="flex items-center gap-4 flex-wrap text-center justify-center">
                          <AccreditationRow accreditations={course.accreditations} />
                        </div>
                      </div> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Programmes Section */}
        {relatedOfferings.length > 0 && (
          <section className="bg-brand-primary py-24 border-t border-white/5">
            <CourseCardSlider
              title={
                <div className="mb-4">
                  <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                    Related{" "}
                    <span className="text-brand-gold italic">Programmes</span>
                  </h2>
                </div>
              }
              offerings={relatedOfferings}
              onExpand={handleRelatedExpand}
              dark={true}
            />
          </section>
        )}

        {/* Testimonials Section */}
        <Testimonial />

        {/* Final CTA Before Footer */}
        <FinalCTA />
      </div>

      {/* Mobile Bottom Drawer */}
      <MobileFeesDrawer
        course={course}
        isOpen={isPaymentDrawerOpen}
        onToggle={() => setIsPaymentDrawerOpen(!isPaymentDrawerOpen)}
        onApply={handleApply}
        showTitle={scrolledPastHero}
      />

      {/* Modals */}
      <ApplicationModal
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
        courseTitle={course.title}
      />

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />

      {/* Settings Logic removed from here - now global in App.tsx via LayoutSettings */}
    </div>
  );
};
