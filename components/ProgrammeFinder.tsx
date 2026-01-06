
import React, { useState, useMemo, useEffect } from 'react';
import {
    X, ChevronRight, ArrowLeft, Check, RefreshCw, BookOpen,
    GraduationCap, Laptop, Hotel, Briefcase, Calendar,
    Utensils, Users, Award, Star, Clock
} from 'lucide-react';
import { OFFERINGS } from '../constants.tsx';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

interface FinderProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEPS = [
    {
        id: 'interest',
        question: "What area are you passionate about?",
        options: [
            { id: 'Hospitality Management', label: 'Hospitality Management', icon: Hotel, description: 'Hotel operations & leadership.' },
            { id: 'Food & Beverage', label: 'Food & Beverage', icon: Utensils, description: 'Culinary & restaurant ops.' },
            { id: 'Business', label: 'Business', icon: Briefcase, description: 'Strategic management.' },
            { id: 'Conference & Events', label: 'Conference & Events', icon: Calendar, description: 'Event planning & logistics.' },
            { id: 'Human Resources', label: 'Human Resources', icon: Users, description: 'People management.' }
        ]
    },
    {
        id: 'mode',
        question: "How do you prefer to study?",
        options: [
            { id: 'Online Learning', label: 'Online Learning', icon: Laptop, description: 'Flexible, self-paced study.' },
            { id: 'Full Time Learning', label: 'Full Time', icon: GraduationCap, description: 'On-campus immersive learning.' }
        ]
    },
    {
        id: 'level',
        question: "What qualification level?",
        options: [
            { id: 'Degree', label: 'Degree', icon: GraduationCap, description: 'NQF Level 7' },
            { id: 'Diploma', label: 'Diploma', icon: BookOpen, description: 'NQF Level 6' },
            { id: 'Certificate', label: 'Certificate', icon: Award, description: 'Higher & National Certificates' },
            { id: 'Specialisation', label: 'Specialisation', icon: Star, description: 'Industry-specific expertise' },
            { id: 'Short Course', label: 'Short Course', icon: Clock, description: 'Rapid skills acquisition' }
        ]
    }
];

export const ProgrammeFinder: React.FC<FinderProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleOptionSelect = (value: string) => {
        setIsAnimating(true);
        setSelections(prev => ({ ...prev, [STEPS[currentStep].id]: value }));

        setTimeout(() => {
            setIsAnimating(false);
            setCurrentStep(prev => prev + 1);
        }, 400);
    };

    const handleSkip = () => {
        setIsAnimating(true);
        setSelections(prev => ({ ...prev, [STEPS[currentStep].id]: 'Any' }));

        setTimeout(() => {
            setIsAnimating(false);
            setCurrentStep(prev => prev + 1);
        }, 400);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setSelections({});
        setCurrentStep(0);
    };

    const filteredOfferings = useMemo(() => {
        if (currentStep < STEPS.length) return [];

        return OFFERINGS.filter(course => {
            // 1. Filter by Interest (Category)
            if (selections['interest'] && selections['interest'] !== 'Any' && course.category !== selections['interest']) return false;

            // 2. Filter by Mode
            // Check if programmeTypes includes the selected mode ID (e.g. 'Online Learning')
            if (selections['mode'] && selections['mode'] !== 'Any' && !course.programmeTypes.includes(selections['mode'])) return false;

            // 3. Filter by Level (Qualification)
            if (selections['level'] && selections['level'] !== 'Any' && course.qualification !== selections['level']) return false;

            return true;
        });
    }, [currentStep, selections]);

    if (!isOpen) return null;

    const progress = ((currentStep) / STEPS.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" onClick={onClose} />

            <div className="relative bg-brand-card w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden border border-white/10 flex flex-col min-h-[550px] animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#162036]">
                    <div className="flex items-center gap-3">
                        {currentStep > 0 && currentStep < STEPS.length && (
                            <button onClick={handleBack} className="text-gray-400 hover:text-white transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <h2 className="text-white font-serif font-bold text-lg">
                            {currentStep < STEPS.length ? 'Find Your Programme' : 'Your Matches'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center bg-white/5 text-gray-400 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Progress Bar */}
                {currentStep < STEPS.length && (
                    <div className="h-1 bg-white/5 w-full">
                        <div
                            className="h-full bg-brand-gold transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 p-8 md:p-12 overflow-y-auto relative bg-[#0B1221]">

                    {currentStep < STEPS.length ? (
                        <div className={`space-y-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="text-center">
                                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-3 block">
                                    Step {currentStep + 1} of {STEPS.length}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                    {STEPS[currentStep].question}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {STEPS[currentStep].options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(option.id)}
                                        className="group relative p-6 bg-[#162036] border border-white/10 rounded-sm hover:border-brand-gold transition-all duration-300 text-left hover:bg-white/5"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                                            <option.icon size={24} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{option.label}</h4>
                                        <p className="text-gray-400 text-xs">{option.description}</p>
                                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                            <ChevronRight className="text-brand-gold" />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Skip Option for Steps 1 & 2 (indices 0 & 1) */}
                            {currentStep < 2 && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleSkip}
                                        className="text-gray-500 hover:text-brand-gold text-sm font-medium transition-colors border-b border-transparent hover:border-brand-gold pb-0.5 tracking-wide"
                                    >
                                        I'm not sure
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4 border border-green-500/20">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-2">
                                    We Found {filteredOfferings.length} Match{filteredOfferings.length !== 1 ? 'es' : ''}
                                </h3>
                                <div className="text-gray-400 text-sm flex flex-wrap justify-center gap-2">
                                    <span>Based on:</span>
                                    <span className="text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">{selections.interest}</span>
                                    <span>•</span>
                                    <span className="text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">{selections.mode}</span>
                                    <span>•</span>
                                    <span className="text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">{selections.level}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-8">
                                {filteredOfferings.map(course => (
                                    <Link
                                        key={course.id}
                                        to={`/course/${course.id}`}
                                        className="flex flex-col md:flex-row bg-[#162036] border border-white/10 rounded-sm overflow-hidden hover:border-brand-gold/50 transition-colors group"
                                        onClick={onClose}
                                    >
                                        <div className="md:w-32 h-32 md:h-auto relative shrink-0">
                                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">{course.title}</h4>
                                                <ChevronRight className="text-gray-500 group-hover:text-brand-gold shrink-0" size={16} />
                                            </div>
                                            <p className="text-[10px] text-brand-gold uppercase tracking-wider mb-2 font-bold">{course.qualification} • {course.duration}</p>
                                            <p className="text-gray-400 text-xs line-clamp-2">{course.description}</p>
                                        </div>
                                    </Link>
                                ))}

                                {filteredOfferings.length === 0 && (
                                    <div className="text-center py-12 bg-white/5 rounded-sm border border-white/5 border-dashed">
                                        <p className="text-gray-300 mb-4 font-serif text-lg">No exact matches found.</p>
                                        <p className="text-gray-500 text-sm mb-6">Try adjusting your filters to find more programmes.</p>
                                        <Button variant="secondary" onClick={handleReset} icon={<RefreshCw size={16} />}>
                                            Start Over
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {filteredOfferings.length > 0 && (
                                <div className="flex justify-center">
                                    <Button variant="ghost" onClick={handleReset} icon={<RefreshCw size={16} />}>
                                        Search Again
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
