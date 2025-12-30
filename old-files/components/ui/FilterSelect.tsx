import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, ChevronRight, Circle } from 'lucide-react';

export interface FilterOption {
    label: string;
    value: string;
    subOptions?: FilterOption[];
}

interface FilterSelectProps {
    label: string;
    options: FilterOption[];
    value: string | string[];
    onChange: (value: any) => void;
    multiple?: boolean;
    className?: string;
    dark?: boolean; 
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ 
    label, 
    options, 
    value, 
    onChange, 
    multiple = false,
    className = "",
    dark = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['Full Time Learning']); 
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        if (multiple) {
            const currentVals = Array.isArray(value) ? [...value] : [];
            if (val === '') {
                onChange([]);
            } else {
                if (currentVals.includes(val)) {
                    onChange(currentVals.filter(v => v !== val));
                } else {
                    onChange([...currentVals, val]);
                }
            }
        } else {
            onChange(val);
            setIsOpen(false);
        }
    };

    const toggleGroup = (e: React.MouseEvent, groupValue: string) => {
        e.stopPropagation();
        setExpandedGroups(prev => 
            prev.includes(groupValue) 
                ? prev.filter(v => v !== groupValue) 
                : [...prev, groupValue]
        );
    };

    const getSelectedLabel = () => {
        if (multiple) {
            const currentVals = Array.isArray(value) ? value : [];
            if (currentVals.length === 0) return label;
            return `${label} (${currentVals.length})`;
        }

        if (!value) return label;
        
        const findLabel = (opts: FilterOption[]): string | undefined => {
            for (const opt of opts) {
                if (opt.value === value) return opt.label;
                if (opt.subOptions) {
                    const found = findLabel(opt.subOptions);
                    if (found) return found;
                }
            }
        };
        return findLabel(options) || value;
    };

    const isAllSelected = multiple ? (Array.isArray(value) && value.length === 0) : !value;

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-sm font-bold text-sm tracking-wide border-2 transition-colors uppercase ${
                    dark 
                    ? 'bg-transparent border-brand-gold text-white hover:bg-brand-gold/10' 
                    : 'bg-white text-brand-dark border-transparent focus:border-brand-gold'
                }`}
            >
                <span className="truncate">{getSelectedLabel()}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#162036] border border-white/10 rounded-sm shadow-2xl max-h-80 overflow-y-auto backdrop-blur-md custom-scrollbar">
                    <div className="p-2 space-y-1">
                        <button
                            onClick={() => handleSelect('')}
                            className={`w-full text-left px-3 py-2 text-sm uppercase font-bold hover:bg-white/5 rounded-sm transition-colors flex items-center justify-between ${isAllSelected ? 'text-brand-gold' : 'text-gray-400'}`}
                        >
                            <span>All</span>
                            {isAllSelected && <Check size={14} />}
                        </button>

                        <div className="h-px bg-white/10 my-1 mx-2"></div>

                        {options.map((option) => {
                            const isSelected = multiple 
                                ? (Array.isArray(value) && value.includes(option.value))
                                : value === option.value;
                            
                            const hasSub = option.subOptions && option.subOptions.length > 0;
                            const isExpanded = expandedGroups.includes(option.value);

                            return (
                                <div key={option.value}>
                                    <div className={`flex items-center justify-between rounded-sm hover:bg-white/5 transition-colors group ${isSelected ? 'bg-white/5' : ''}`}>
                                        <button
                                            onClick={() => handleSelect(option.value)}
                                            className={`flex-1 text-left px-3 py-2 text-sm font-medium uppercase truncate ${isSelected ? 'text-brand-gold' : 'text-gray-300 group-hover:text-white'}`}
                                        >
                                            {option.label}
                                        </button>
                                        
                                        {hasSub ? (
                                            <button 
                                                onClick={(e) => toggleGroup(e, option.value)}
                                                className="p-2 text-gray-500 hover:text-white transition-colors"
                                            >
                                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                            </button>
                                        ) : (
                                            isSelected && <div className="pr-3 text-brand-gold"><Check size={14} /></div>
                                        )}
                                    </div>

                                    {hasSub && isExpanded && (
                                        <div className="ml-3 pl-3 border-l border-white/10 mt-1 space-y-1 mb-1">
                                            {option.subOptions!.map((sub) => {
                                                const isSubSelected = multiple 
                                                    ? (Array.isArray(value) && value.includes(sub.value))
                                                    : value === sub.value;

                                                return (
                                                    <button
                                                        key={sub.value}
                                                        onClick={() => handleSelect(sub.value)}
                                                        className={`w-full text-left px-3 py-2 text-xs uppercase font-medium rounded-sm transition-colors flex items-center justify-between hover:bg-white/5 ${isSubSelected ? 'text-brand-gold' : 'text-gray-400 hover:text-white'}`}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {isSubSelected && <Circle size={6} fill="currentColor" />}
                                                            {sub.label}
                                                        </span>
                                                        {multiple && isSubSelected && <Check size={12} />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};