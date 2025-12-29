
import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Option {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    title: string;
    options: Option[];
    selectedValues: string[];
    onChange: (value: string) => void;
    variant?: 'card' | 'accordion';
    defaultOpen?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
    title, 
    options, 
    selectedValues, 
    onChange,
    variant = 'card',
    defaultOpen = true
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    if (variant === 'accordion') {
        return (
            <div className="flex flex-col bg-[#0d1424]">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                    <h4 className="text-white font-serif font-bold flex items-center gap-2">
                        {title}
                        {selectedValues.length > 0 && (
                            <span className="bg-brand-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-full font-sans font-bold">
                                {selectedValues.length}
                            </span>
                        )}
                    </h4>
                    {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                </button>
                
                {isOpen && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <label key={option.value} className="flex items-start gap-3 cursor-pointer group select-none">
                                        <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${
                                            isSelected 
                                            ? 'bg-brand-gold border-brand-gold' 
                                            : 'bg-black/20 border-white/20 group-hover:border-brand-gold'
                                        }`}>
                                            {isSelected && <Check size={10} className="text-brand-dark" strokeWidth={4} />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden" 
                                            checked={isSelected}
                                            onChange={() => onChange(option.value)}
                                        />
                                        <span className={`text-sm leading-tight transition-colors ${
                                            isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}>
                                            {option.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Default Card Variant
    return (
        <div className="flex flex-col h-full bg-[#162036] p-6 rounded-sm border border-white/5">
            <h4 className="text-white font-serif font-bold mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                {title}
                {selectedValues.length > 0 && (
                    <span className="bg-brand-gold text-brand-dark text-[10px] px-1.5 py-0.5 rounded-full font-sans">
                        {selectedValues.length}
                    </span>
                )}
            </h4>
            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 max-h-[240px]">
                {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                        <label key={option.value} className="flex items-start gap-3 cursor-pointer group select-none">
                            <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${
                                isSelected 
                                ? 'bg-brand-gold border-brand-gold' 
                                : 'bg-black/20 border-white/20 group-hover:border-brand-gold'
                            }`}>
                                {isSelected && <Check size={10} className="text-brand-dark" strokeWidth={4} />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isSelected}
                                onChange={() => onChange(option.value)}
                            />
                            <span className={`text-sm leading-tight transition-colors ${
                                isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'
                            }`}>
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};
