
import React, { useState, useRef } from 'react';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { QuickViewModal } from './QuickViewModal';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import { Clock, GraduationCap, Eye, BarChart2, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from './ui/Button';

interface CourseCardProps {
    offering: Offering;
    onExpand: (o: Offering, img: DOMRect, txt: DOMRect, cat: DOMRect) => void;
}

// Helper for Ecommerce Check (Consolidated logic)
const checkIsEcommerce = (course: Offering) => {
    // Only "Purchasing for Food Service Operations" (ID 19) and "Puff Pastry" are Buy Now
    return ['19', 'puff-pastry'].includes(course.id);
};

export const CourseCard: React.FC<CourseCardProps> = ({ offering, onExpand }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const categoryRef = useRef<HTMLSpanElement>(null);

    const { addToCart } = useCart();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();

    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOrigin, setModalOrigin] = useState<{ x: number; y: number } | null>(null);
    const [showApplication, setShowApplication] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const isEcommerce = checkIsEcommerce(offering);
    const inCompare = isInCompare(offering.id);

    const handleMouseEnter = () => {
        if (videoRef.current && offering.video) videoRef.current.play().catch(() => { });
    };

    const handleMouseLeave = () => {
        if (videoRef.current && offering.video) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLElement).closest('.group')?.getBoundingClientRect();
        if (rect) setModalOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setSelectedOffering(offering);
        setIsModalOpen(true);
    };

    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEcommerce) {
            addToCart(offering);
            // Intentionally not showing checkout modal immediately based on feedback
            // Sidebar cart will open automatically via context
        } else {
            setShowApplication(true);
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (mediaRef.current && titleRef.current && categoryRef.current) {
            const imgRect = mediaRef.current.getBoundingClientRect();
            const txtRect = titleRef.current.getBoundingClientRect();
            const catRect = categoryRef.current.getBoundingClientRect();
            onExpand(offering, imgRect, txtRect, catRect);
        }
    };

    return (
        <>
            <div className="flex flex-col h-full course-card cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCardClick}>
                <div className="bg-white w-full group rounded-[1px] overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
                    <div ref={mediaRef} className="relative h-60 overflow-hidden shrink-0 bg-gray-100">
                        <video ref={videoRef} src={offering.video} loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        {(!offering.video || offering.video === 'undefined') && (
                            <img src={offering.image || 'https://placehold.co/600x400/002B4E/white?text=Course'} alt={offering.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                        <div className="absolute top-4 left-4 z-10">
                            <span ref={categoryRef} className="items-center gap-1.5 px-3.5 py-1.5 bg-brand-gold border uppercase border-brand-gold rounded-full text-white text-xs font-bold font-sans tracking-[1px]">
                                {offering.category}
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-[#002B4E]/95 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
                            <button onClick={handleQuickView} className="flex-1 bg-white text-[#002B4E] hover:bg-[#C2B067] hover:text-white text-[10px] font-bold uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 border border-transparent transition-colors tracking-[1px]">
                                <Eye size={14} /> Quick View
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); inCompare ? removeFromCompare(offering.id) : addToCompare(offering); }}
                                className={`flex-1 text-[10px] font-bold uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all tracking-[1px] ${inCompare
                                    ? 'bg-[#C2B067] text-white border-transparent hover:bg-[#B09F58]'
                                    : 'bg-transparent border border-white/30 hover:bg-white/10 text-white'
                                    }`}
                            >
                                {inCompare ? <X size={16} className="text-white" /> : <BarChart2 size={16} />} {inCompare ? 'REMOVE' : 'COMPARE'}
                            </button>
                        </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col relative z-10 bg-white">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium mb-4">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-[#002B4E]" />
                                <span>{offering.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <GraduationCap size={16} className="text-[#002B4E]" />
                                <span>{offering.qualification}</span>
                            </div>
                        </div>
                        <h3 ref={titleRef} className="text-lg lg:text-xl font-serif font-bold text-[#002B4E] mb-4 leading-tight group-hover:text-[#1289fe] transition-colors origin-top-left">
                            {offering.title}
                        </h3>
                        <div className="mt-auto"></div>
                        <div className="mb-4 flex justify-between items-end border-t border-gray-100 pt-3">
                            <div>
                                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-[1px]">Tuition</p>
                                <p className="text-lg font-bold text-[#002B4E]">R {offering.price?.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-[1px]">Start Date</p>
                                <div className="flex flex-col items-end">
                                    <p className="text-xs font-bold text-[#002B4E]">
                                        {offering.startDate?.split(',')[0]}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 relative z-20 bg-white">
                            <Button
                                variant="primary"
                                className="flex-1 !px-2 !py-3 !text-[10px] md:!text-xs"
                            >
                                Learn More
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleAction}
                                className="flex-1 !px-2 !py-3 !text-[10px] md:!text-xs"
                                icon={isEcommerce ? <ShoppingBag size={14} /> : <ArrowRight size={14} />}
                            >
                                {isEcommerce ? 'Buy Now' : 'Apply Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedOffering && <QuickViewModal offering={selectedOffering} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} origin={modalOrigin} />}
            <ApplicationModal isOpen={showApplication} onClose={() => setShowApplication(false)} courseTitle={offering.title} />
            <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
        </>
    );
};

