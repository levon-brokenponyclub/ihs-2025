import React, { useEffect, useRef } from 'react';
import { Filter, X, Search } from 'lucide-react';
import gsap from 'gsap';
import { Button } from './ui/Button';
import { CheckboxGroup } from './ui/CheckboxGroup';

export interface FilterSlidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    // Search
    searchQuery: string;
    onSearchChange: (value: string) => void;
    // Data
    studyLevels: string[]; // options
    selectedStudyLevels: string[];
    onStudyLevelsChange: (val: string[]) => void;
    
    focusAreas: string[]; // options
    selectedFocusAreas: string[];
    onFocusAreasChange: (val: string[]) => void;
    
    accreditations?: { label: string; value: string }[]; // options (optional as not all pages have them)
    selectedAccreditations?: string[];
    onAccreditationsChange?: (val: string[]) => void; // Optional if not used

    programmeTypes?: string[]; // New for ProgrammeMultiGroup
    selectedProgrammeTypes?: string[];
    onProgrammeTypesChange?: (val: string[]) => void;

    startDates?: string[]; // New for ProgrammeMultiGroup
    selectedStartDates?: string[];
    onStartDatesChange?: (val: string[]) => void;

    // Meta
    totalResults: number;
    activeFilterCount: number;
    onResetFilters: () => void;
}

// Helpers
const toOptions = (items: string[]) => items.map(item => ({ label: item, value: item }));
const toAccreditationOptions = (items: { label: string; value: string }[]) => items.map(item => ({ label: item.label, value: item.value }));

export const FilterSlidePanel: React.FC<FilterSlidePanelProps> = ({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    studyLevels,
    selectedStudyLevels,
    onStudyLevelsChange,
    focusAreas,
    selectedFocusAreas,
    onFocusAreasChange,
    accreditations,
    selectedAccreditations,
    onAccreditationsChange,
    programmeTypes,
    selectedProgrammeTypes,
    onProgrammeTypesChange,
    startDates,
    selectedStartDates,
    onStartDatesChange,
    totalResults,
    activeFilterCount,
    onResetFilters
}) => {
    
    const drawerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // --- GSAP Drawer Animation ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                // Open sequence
                gsap.to(backdropRef.current, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.fromTo(drawerRef.current,
                    { x: '-100%' },
                    { x: '0%', duration: 0.5, ease: "expo.out", delay: 0.1 }
                );
                document.body.style.overflow = 'hidden';
            } else {
                // Close sequence
                gsap.to(drawerRef.current, {
                    x: '-100%',
                    duration: 0.4,
                    ease: "power2.in"
                });
                gsap.to(backdropRef.current, {
                    autoAlpha: 0,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power2.in"
                });
                document.body.style.overflow = '';
            }
        });
        return () => {
            ctx.revert();
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleFilter = (setter: (val: string[]) => void, current: string[], value: string) => {
        setter(current.includes(value) ? current.filter(v => v !== value) : [...current, value]);
    };

    return (
        <>
            {/* GSAP Animated Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm opacity-0 invisible"
                onClick={onClose}
            />

            {/* GSAP Animated Light Theme Drawer (Left Side) */}
            <div
                ref={drawerRef}
                className="fixed top-0 left-0 bottom-0 w-[380px] z-[60] bg-white shadow-2xl transform -translate-x-full will-change-transform flex flex-col border-r border-gray-200"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-primary text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-white">
                            <Filter size={18} />
                        </div>
                        <h3 className="text-white font-serif font-bold text-xl">Filters</h3>
                    </div>
                    {/* Close Button with animation */}
                    <button
                        onClick={onClose}
                        className="group flex flex-col items-center justify-center gap-1 transition-colors duration-200 cursor-pointer relative z-[60] text-white hover:text-brand-gold"
                    >
                         <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white">
                    {/* Search Input */}
                    <div className="p-6 border-b border-gray-100">
                        <label className="text-xs uppercase font-bold text-gray-400 mb-2 block tracking-wider">Search</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-accent transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Keywords..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray text-xs font-semibold py-3 pl-12 pr-4 rounded outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer font-sans uppercase tracking-[1px] transition-all placeholder:text-gray"
                            />
                            {searchQuery && (
                                <button onClick={() => onSearchChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Accordions */}
                    <div className="mt-0">

                        {/* 1. Focus Areas (Common) */}
                        <CheckboxGroup
                            title="Focus Areas"
                            options={toOptions(focusAreas)}
                            selectedValues={selectedFocusAreas}
                            onChange={(val) => toggleFilter(onFocusAreasChange, selectedFocusAreas, val)}
                            variant="accordion"
                            theme="light"
                            defaultOpen={false}
                        />

                        {/* 2. Study Level (Common) */}
                        <CheckboxGroup
                            title="Study Level"
                            options={toOptions(studyLevels)}
                            selectedValues={selectedStudyLevels}
                            onChange={(val) => toggleFilter(onStudyLevelsChange, selectedStudyLevels, val)}
                            variant="accordion"
                            theme="light"
                            defaultOpen={true}
                        />

                        {/* 3. Programme Types (Optional) */}
                        {programmeTypes && selectedProgrammeTypes && onProgrammeTypesChange && (
                             <CheckboxGroup
                                title="Programme Type"
                                options={toOptions(programmeTypes)}
                                selectedValues={selectedProgrammeTypes}
                                onChange={(val) => toggleFilter(onProgrammeTypesChange, selectedProgrammeTypes, val)}
                                variant="accordion"
                                theme="light"
                                defaultOpen={false}
                            />
                        )}

                        {/* 4. Start Dates (Optional) */}
                         {startDates && selectedStartDates && onStartDatesChange && (
                             <CheckboxGroup
                                title="Start Date"
                                options={toOptions(startDates)}
                                selectedValues={selectedStartDates}
                                onChange={(val) => toggleFilter(onStartDatesChange, selectedStartDates, val)}
                                variant="accordion"
                                theme="light"
                                defaultOpen={false}
                            />
                        )}

                        {/* 5. Accreditation (Optional) */}
                        {accreditations && selectedAccreditations && onAccreditationsChange && (
                            <CheckboxGroup
                                title="Accreditation"
                                options={toAccreditationOptions(accreditations)}
                                selectedValues={selectedAccreditations}
                                onChange={(val) => toggleFilter(onAccreditationsChange, selectedAccreditations, val)}
                                variant="accordion"
                                theme="light"
                                defaultOpen={false}
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-xs text-gray-500 font-medium uppercase tracking-wide">
                        <span>{totalResults} Programmes Found</span>
                        {activeFilterCount > 0 && (
                            <button onClick={onResetFilters} className="text-red-500 hover:text-red-700 underline decoration-red-200 hover:decoration-red-700 underline-offset-2 tracking-[1px]">
                                Reset Filters
                            </button>
                        )}
                    </div>
                    <Button variant="primary" className="w-full justify-center py-4 tracking-[1px]" onClick={onClose}>
                        View Results
                    </Button>
                </div>
            </div>
        </>
    );
};