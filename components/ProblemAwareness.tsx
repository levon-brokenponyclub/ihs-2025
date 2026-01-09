import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export const ProblemAwareness: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                Avoid the Stress of Making the <span className="text-brand-gold italic">Incorrect Choice</span>
            </h2>
            <p className="text-brand-muted mb-16">
                Incorrect choices leave you with:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pain Point 1 */}
                <div className="bg-[#120f0f] border border-brand-red/20 p-10 rounded-sm hover:border-brand-red/40 transition-colors">
                    <div className="w-14 h-14 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                        <AlertTriangle size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">An Unrecognised Qualification</h3>
                    <p className="text-brand-muted text-sm">
                        Receive poor quality education which cannot be used locally or internationally.
                    </p>
                </div>

                {/* Pain Point 2 */}
                <div className="bg-[#120f0f] border border-brand-red/20 p-10 rounded-sm hover:border-brand-red/40 transition-colors">
                    <div className="w-14 h-14 mx-auto rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
                        <TrendingDown size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Career Prospects</h3>
                    <p className="text-brand-muted text-sm">
                        No post-graduation employment support or industry recognition.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};