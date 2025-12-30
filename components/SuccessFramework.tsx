import React from 'react';
import { SUCCESS_STEPS } from '../constants';

export const SuccessFramework: React.FC = () => {
    return (
        <section className="py-24 bg-[#062135]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl text-white">
                        Our Plan for Your <span className="text-brand-gold italic">Success</span>
                    </h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUCCESS_STEPS.map((step, idx) => (
                        <div key={idx} className="bg-brand-card border border-white/5 p-8 rounded-sm hover:border-brand-gold/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors">
                                <step.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3 font-serif">{step.title}</h3>
                            <p className="text-brand-muted text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};