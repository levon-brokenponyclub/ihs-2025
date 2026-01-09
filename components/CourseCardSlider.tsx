import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Offering } from '../types';
import { CourseCard } from './CourseCard';

interface CourseCardSliderProps {
    title?: React.ReactNode;
    offerings: Offering[];
    onExpand: (o: Offering, img: DOMRect, txt: DOMRect, cat: DOMRect) => void;
    className?: string;
    dark?: boolean;
}

export const CourseCardSlider: React.FC<CourseCardSliderProps> = ({ 
    title, 
    offerings, 
    onExpand, 
    className = "",
    dark = false
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollSlider = (dir: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 360; // Card width + gap
            sliderRef.current.scrollBy({ 
                left: dir === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };

    if (offerings.length === 0) return null;

    return (
        <div className={`relative ${className}`}>
            {/* Header: Title Left, Arrows Right */}
            {(title || offerings.length > 0) && (
                <div className="flex items-end justify-between mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        {title}
                    </div>
                    
                    {/* Navigation Arrows */}
                    <div className="hidden md:flex gap-2 shrink-0">
                        <button 
                            onClick={() => scrollSlider('left')} 
                            className={`w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${dark ? 'bg-white/10 text-white hover:bg-white hover:text-brand-primary' : 'bg-white text-brand-primary hover:bg-brand-primary hover:text-white border border-gray-100'}`}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={() => scrollSlider('right')} 
                            className={`w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${dark ? 'bg-white/10 text-white hover:bg-white hover:text-brand-primary' : 'bg-white text-brand-primary hover:bg-brand-primary hover:text-white border border-gray-100'}`}
                            aria-label="Next"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Slider Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    ref={sliderRef} 
                    className="overflow-x-auto programmes-slider snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0"
                >
                    <div className="flex gap-6 w-max">
                        {offerings.map((offering) => (
                            <div key={offering.id} className="flex-shrink-0 snap-center w-[300px] md:w-[340px]">
                                <CourseCard offering={offering} onExpand={onExpand} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};