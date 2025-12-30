
import React, { useState, useMemo, useEffect } from 'react';
import { X, ChevronRight, ArrowLeft, Check, RefreshCw, BookOpen, GraduationCap, Laptop, ChefHat, Hotel } from 'lucide-react';
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
            { id: 'Hospitality', label: 'Hospitality Management', icon: Hotel, description: 'Hotel operations, management, and services.' },
            { id: 'Culinary', label: 'Culinary Arts', icon: ChefHat, description: 'Cooking, patisserie, and kitchen management.' }
        ]
    },
    {
        id: 'mode',
        question: "How do you prefer to study?",
        options: [
            { id: 'Full Time', label: 'Full Time (On Campus)', icon: GraduationCap, description: 'Immersive campus experience with practicals.' },
            { id: 'Flexible', label: 'Flexible / Online', icon: Laptop, description: 'Study at your own pace or while working.' }
        ]
    },
    {
        id: 'level',
        question: "What qualification are you looking for?",
        options: [
            { id: 'Diploma', label: 'Diploma', icon: BookOpen, description: 'Comprehensive 2-3 year qualification.' },
            { id: 'Certificate', label: 'Certificate', icon: Check, description: 'Shorter, skills-focused qualification.' }
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
          // Filter by Interest (Category)
          if (course.category !== selections['interest']) return false;

          // Filter by Mode
          const isFullTime = course.programmeTypes.includes('Full Time Learning');
          if (selections['mode'] === 'Full Time' && !isFullTime) return false;
          if (selections['mode'] === 'Flexible' && isFullTime && course.programmeTypes.length === 1) return false; // Only Full Time

          // Filter by Level (Qualification)
          if (course.qualification !== selections['level']) return false;

          return true;
      });
  }, [currentStep, selections]);

  if (!isOpen) return null;

  const progress = ((currentStep) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-brand-card w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden border border-white/10 flex flex-col min-h-[500px] animate-in fade-in zoom-in duration-300">
        
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
            <div className="h-1 bg-white/5 w-full rounded-full">
                <div 
                    className="h-full bg-brand-gold transition-all duration-500 ease-out rounded-full" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        )}

        {/* Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto relative">
            
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
                                className="group relative p-6 bg-brand-dark border border-white/10 rounded-sm hover:border-brand-gold transition-all duration-300 text-left hover:bg-white/5"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                                    <option.icon size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{option.label}</h4>
                                <p className="text-gray-400 text-sm">{option.description}</p>
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                    <ChevronRight className="text-brand-gold" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
                            <Check size={32} />
                        </div>
                        <h3 className="text-3xl font-serif text-white mb-2">
                            We Found {filteredOfferings.length} Match{filteredOfferings.length !== 1 ? 'es' : ''}
                        </h3>
                        <p className="text-gray-400">
                            Based on your preferences: <span className="text-brand-gold">{selections.interest}</span> • <span className="text-brand-gold">{selections.mode}</span> • <span className="text-brand-gold">{selections.level}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {filteredOfferings.map(course => (
                            <Link 
                                key={course.id}
                                to={`/course/${course.id}`}
                                className="flex flex-col md:flex-row bg-brand-dark border border-white/10 rounded-sm overflow-hidden hover:border-brand-gold/50 transition-colors group"
                            >
                                <div className="md:w-32 h-32 md:h-auto relative shrink-0">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-lg font-bold text-white group-hover:text-brand-gold transition-colors">{course.title}</h4>
                                        <ChevronRight className="text-gray-500 group-hover:text-brand-gold shrink-0" size={20} />
                                    </div>
                                    <p className="text-xs text-brand-gold uppercase tracking-wider mb-2">{course.qualification} • {course.duration}</p>
                                    <p className="text-gray-400 text-sm line-clamp-2">{course.description}</p>
                                </div>
                            </Link>
                        ))}
                        
                        {filteredOfferings.length === 0 && (
                            <div className="text-center py-8 bg-white/5 rounded-sm border border-white/5">
                                <p className="text-gray-300 mb-4">No exact matches found for these criteria.</p>
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
