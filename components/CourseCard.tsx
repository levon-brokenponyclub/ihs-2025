import React, { useState, useRef } from 'react';
import { Offering } from '../types';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { QuickViewModal } from './QuickViewModal';
import { ApplicationModal } from './ApplicationModal';
import { CheckoutModal } from './CheckoutModal';
import { Clock, GraduationCap, Eye, BarChart2, X, ShoppingBag, FileText } from 'lucide-react';

interface CourseCardProps {
    offering: Offering;
    onExpand: (o: Offering, img: DOMRect, txt: DOMRect, cat: DOMRect) => void;
}

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

    const isEcommerce = offering.programmeTypes.some((type: string) =>
        ['Online Learning', 'Part Time Learning'].includes(type)
    );
    const inCompare = isInCompare(offering.id);

    const handleMouseEnter = () => {
        if (videoRef.current) videoRef.current.play().catch(() => {});
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
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
            setShowCheckout(true);
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
                        <video ref={videoRef} src={offering.video} muted loop playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 z-10">
                            <span ref={categoryRef} className="bg-[#f8fafc] border border-[#eff4f7] text-[#002a4e] text-[10px] font-bold px-3 py-1.5 uppercase rounded-sm shadow-md hover:bg-[#c2b068] hover:border-[#d4c999] hover:text-[#fff] transition-colors inline-block tracking-[1px]">
                                {offering.category}
                            </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-[#002B4E]/95 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 z-20">
                            <button onClick={handleQuickView} className="flex-1 bg-white text-[#002B4E] hover:bg-[#C2B067] hover:text-white text-[10px] font-bold uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 border border-transparent transition-colors tracking-[1px]">
                                <Eye size={14} /> Quick View
                            </button>
                            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); inCompare ? removeFromCompare(offering.id) : addToCompare(offering); }} className={`flex-1 bg-transparent border border-white/30 hover:bg-white/10 text-white text-[10px] font-bold uppercase py-2.5 rounded-sm flex items-center justify-center gap-2 transition-colors tracking-[1px] ${inCompare ? 'bg-white text-[#002B4E]' : ''}`}>
                                {inCompare ? <X size={16} /> : <BarChart2 size={16} />} {inCompare ? 'Remove' : 'Compare'}
                            </button>
                        </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col relative z-10 bg-white">
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
                                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-[1px]">Next Intake</p>
                                <p className="text-xs font-bold text-[#002B4E]">{offering.startDate}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 relative z-20 bg-white">
                            <button className="flex-1 bg-[#002845] border border-[#002845] text-white hover:bg-[#002845]/90 font-bold transition-all duration-300 text-[10px] md:text-xs uppercase px-2 py-3 rounded-sm flex items-center justify-center shadow-none tracking-[1px]">
                                Learn More
                            </button>

                            <button
                                onClick={handleAction}
                                className="flex-1 bg-white border border-[#002B4E] text-[#002B4E] hover:bg-[#002B4E] hover:text-white font-bold transition-all duration-300 text-[10px] md:text-xs uppercase px-2 py-3 rounded-sm flex items-center justify-center gap-2 shadow-none tracking-[1px]"
                            >
                                {isEcommerce ? 'Buy Now' : 'Apply Now'}
                                {isEcommerce ? <ShoppingBag size={14} /> : <FileText size={14} />}
                            </button>
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