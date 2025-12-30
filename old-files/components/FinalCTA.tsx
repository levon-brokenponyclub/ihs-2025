
import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/id/342/1920/1080" alt="Kitchen Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-brand-dark/80"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 font-semibold">
                    Ready to Start Your <span className="text-brand-gold italic">Success Story?</span>
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto font-light">
                    Join Africa's leading hospitality and culinary school. Take the first step towards your dream career today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" className="w-full sm:w-auto px-10 py-4 text-xs" icon={<ArrowRight size={16} />}>
                        Apply Now
                    </Button>
                    <Button variant="secondary" className="w-full sm:w-auto px-10 py-4 text-xs">
                        Request Information
                    </Button>
                </div>
                
                <div className="mt-12 flex justify-center gap-8 text-brand-goldMuted text-xs uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
                        Call Me Back
                    </div>
                    <div>
                        info@hotelschool.co.za
                    </div>
                </div>
            </div>
        </section>
    );
};
