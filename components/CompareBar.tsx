
import React from 'react';
import { useCompare } from '../context/CompareContext';
import { Button } from './ui/Button';
import { X, BarChart2 } from 'lucide-react';

export const CompareBar: React.FC = () => {
    const { compareItems, removeFromCompare, clearCompare, setIsCompareOpen } = useCompare();

    if (compareItems.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[#002B4E] font-serif font-bold">
                        <span className="bg-[#002B4E] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">{compareItems.length}</span>
                        <span className="hidden sm:inline">Programmes Selected</span>
                    </div>

                    <div className="hidden md:flex gap-4">
                        {compareItems.map(item => (
                            <div key={item.id} className="relative group bg-gray-50 rounded-sm p-1 pr-8 border border-gray-200 flex items-center gap-3 w-48 transition-all hover:border-brand-gold/30">
                                <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-sm shadow-sm" />
                                <span className="text-[10px] leading-tight text-brand-primary truncate font-bold uppercase tracking-wider">{item.title}</span>
                                <button
                                    onClick={() => removeFromCompare(item.id)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-brand-gold transition-colors"
                                    title="Remove from comparison"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={clearCompare} className="text-gray-400 text-[10px] hover:text-brand-primary uppercase font-bold tracking-[2px] mb-0.5">
                        Clear All
                    </button>
                    <Button
                        variant="gold"
                        onClick={() => setIsCompareOpen(true)}
                        icon={<BarChart2 size={16} />}
                        className="py-2.5 px-6"
                        disabled={compareItems.length < 2}
                    >
                        Compare Now
                    </Button>
                </div>
            </div>
        </div>
    );
};
