
import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export const ProblemAwareness: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-soft/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 font-semibold">
                Avoid the Stress of Making the <span className="text-brand-gold italic">Incorrect Choice</span>
            </h2>
            <p className="text-white/80 mb-16 text-lg font-light">
                Incorrect choices leave you with:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pain Point 1 */}
                <div className="bg-[#041424] border border-brand-goldMuted/20 p-10 rounded-sm hover:border-brand-gold transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">An Unrecognised Qualification</h3>
                    <p className="text-brand-border text-sm leading-relaxed opacity-80">
                        Receive poor quality education which cannot be used locally or internationally.
                    </p>
                </div>

                {/* Pain Point 2 */}
                <div className="bg-[#041424] border border-brand-goldMuted/20 p-10 rounded-sm hover:border-brand-gold transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                        <TrendingDown size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">No Career Prospects</h3>
                    <p className="text-brand-border text-sm leading-relaxed opacity-80">
                        No post-graduation employment support or industry recognition.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};
