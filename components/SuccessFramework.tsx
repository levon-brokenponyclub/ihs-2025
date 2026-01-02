
import React from 'react';
import { SUCCESS_STEPS } from '../constants';

export const SuccessFramework: React.FC = () => {
    return (
        <section className="py-24 bg-brand-surface border-b border-brand-border/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl text-brand-primary">
                        Our Plan for Your <span className="text-brand-accent italic">Success</span>
                    </h2>
                    <div className="w-24 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SUCCESS_STEPS.map((step, idx) => (
                        <div key={idx} className="bg-white border border-brand-border p-10 rounded-sm hover:shadow-lg hover:border-brand-accent transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-sm bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-brand-primary transition-colors duration-300">
                                <step.icon size={28} />
                            </div>
                            <h3 className="text-xl font-semibold text-brand-primary mb-4 font-serif">{step.title}</h3>
                            <p className="text-brand-textSecondary text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
