
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
    theme?: 'dark' | 'light';
    defaultOpen?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ 
    title, 
    options, 
    selectedValues, 
    onChange,
    variant = 'card',
    theme = 'dark',
    defaultOpen = true
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const isLight = theme === 'light';

    // Styles based on theme
    const containerBg = isLight ? 'bg-white' : 'bg-[#0d1424]';
    const headerHover = isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5';
    const titleColor = isLight ? 'text-brand-primary' : 'text-white';
    const textColor = isLight ? 'text-brand-primary' : 'text-gray-400';
    const textHover = isLight ? 'group-hover:text-brand-primary' : 'group-hover:text-gray-300';
    const checkboxBase = isLight ? 'bg-gray-100 border-gray-300 group-hover:border-brand-accent' : 'bg-black/20 border-white/20 group-hover:border-brand-gold';
    const checkboxSelected = 'bg-brand-accent border-brand-accent';
    const checkIconColor = 'text-brand-primary';

    if (variant === 'accordion') {
        return (
            <div className={`flex flex-col ${containerBg} border-b ${isLight ? 'border-gray-100' : 'border-gray-100'}`}>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors ${headerHover}`}
                >
                    <h4 className={`${titleColor} text-lg font-serif font-bold flex items-center gap-2`}>
                        {title}
                        {selectedValues.length > 0 && (
                            <span className="bg-brand-accent text-white text-center text-xs leading-xl p-1 w-6 h-6 rounded-full font-sans font-bold">
                                {selectedValues.length}
                            </span>
                        )}
                    </h4>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                {isOpen && (
                    <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-200">
                        <div className="space-y-0 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                return (
                                    <label key={option.value} className="flex items-start gap-3 cursor-pointer group select-none py-3">
                                        <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${
                                            isSelected 
                                            ? checkboxSelected 
                                            : checkboxBase
                                        }`}>
                                            {isSelected && <Check size={10} className={checkIconColor} strokeWidth={4} />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden" 
                                            checked={isSelected}
                                            onChange={() => onChange(option.value)}
                                        />
                                        <span className={`block text-base font-medium text-gray-600 hover:text-[#C2B067] transition-colors ${
                                            isSelected ? (isLight ? 'text-brand-primary font-bold' : 'text-white font-medium') : `${textColor} ${textHover}`
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

    // Default Card Variant (Preserved mainly for dark contexts, but updated variables)
    return (
        <div className="flex flex-col h-full bg-[#162036] p-6 rounded-sm border border-white/5">
            <h4 className="text-white font-serif font-bold mb-4 border-white/10 pb-2 flex items-center gap-2">
                {title}
                {selectedValues.length > 0 && (
                    <span className="bg-brand-accent text-brand-primary text-[10px] px-1.5 py-0.5 rounded-full font-sans">
                        {selectedValues.length}
                    </span>
                )}
            </h4>
            <div className="space-y-0 overflow-y-auto custom-scrollbar pr-2 max-h-[240px]">
                {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                        <label key={option.value} className="flex items-start gap-3 cursor-pointer group select-none">
                            <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-all duration-200 shrink-0 ${
                                isSelected 
                                ? 'bg-brand-accent border-brand-accent' 
                                : 'bg-black/20 border-white/20 group-hover:border-brand-accent'
                            }`}>
                                {isSelected && <Check size={10} className="text-brand-primary" strokeWidth={4} />}
                            </div>
                            <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={isSelected}
                                onChange={() => onChange(option.value)}
                            />
                            <span className={`text-sm leading-tight transition-colors uppercase font-semibold tracking-[0.5px] ${
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
