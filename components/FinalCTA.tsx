import React, { useState } from 'react';
import { Button } from './ui/Button';
import { ArrowRight, MessageSquare, Mail } from 'lucide-react';
import { CallMeBackModal } from './CallMeBackModal';

export const FinalCTA: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/id/342/1920/1080" alt="Kitchen Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark/80"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                    Ready to Start Your <span className="text-brand-gold italic">Success Story?</span>
                </h2>
                <p className="text-white text-lg mb-10 max-w-2xl mx-auto">
                    Join Africa's leading hospitality and culinary school. Take the first step towards your dream career today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="gold" className="w-full sm:w-auto px-10 py-4 text-base" icon={<ArrowRight size={18} />}>
                        Apply Now
                    </Button>
                    <Button variant="outline-gold" className="w-full sm:w-auto px-10 py-4 text-base bg-white/5">
                        Request Information
                    </Button>
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-white/80">
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 hover:border-brand-gold/30 hover:text-white transition-all duration-300"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare size={18} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#162036] rounded-full animate-pulse"></span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs uppercase tracking-widest font-bold text-brand-gold/80 group-hover:text-brand-gold">Online Now</p>
                            <p className="text-sm font-medium">Call Me Back</p>
                        </div>
                    </div>

                    <a href="mailto:info@hotelschool.co.za" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400">
                            <Mail size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Email Us</p>
                            <p className="text-sm font-medium">info@hotelschool.co.za</p>
                        </div>
                    </a>
                </div>
            </div>

            <CallMeBackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};