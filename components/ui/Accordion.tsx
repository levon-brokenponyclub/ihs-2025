import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onToggle }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      // Small timeout to ensure the DOM has updated and animation started
      setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', 
          inline: 'nearest'
        });
      }, 300); // Slight delay to match animation timing
    }
  }, [isOpen]);

  return (
    <div 
      ref={itemRef}
      className={`border rounded-sm mb-4 overflow-hidden transition-all duration-300 scroll-mt-48 ${
        isOpen 
          ? 'bg-brand-card border-brand-gold shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
          : 'bg-brand-card/30 border-white/10'
      }`}
    >
      <button 
        className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${
          isOpen ? 'bg-brand-gold/10' : 'bg-white/5 hover:bg-white/10'
        }`}
        onClick={onToggle}
      >
        <span className={`font-serif font-bold text-lg transition-colors ${
          isOpen ? 'text-brand-gold' : 'text-white'
        }`}>
          {title}
        </span>
        {isOpen ? <ChevronUp className="text-brand-gold" /> : <ChevronDown className="text-brand-muted" />}
      </button>
      <div 
        className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 border-t border-white/5 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};