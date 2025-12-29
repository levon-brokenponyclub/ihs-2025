import React from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonial: React.FC = () => {
    return (
        <section className="py-24 bg-[#0d1424] border-t border-white/5">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
                        You Deserve A Career <span className="text-brand-gold italic">Doing What You Love</span>
                    </h2>
                    <p className="text-brand-muted text-sm uppercase tracking-widest">Join Our 30,000 Successfully Employed Graduates</p>
                    <div className="w-16 h-1 bg-brand-gold mx-auto mt-8 rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-brand-card/50 border border-white/5 p-8 md:p-12 rounded-sm relative">
                        <div className="absolute -top-6 left-12 w-12 h-12 bg-brand-gold flex items-center justify-center rounded-sm text-brand-dark shadow-lg">
                            <Quote size={24} fill="currentColor" />
                        </div>

                        <blockquote className="mt-4 mb-8">
                            <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed font-serif">
                                "International Hotel School lecturers are very caring and want everyone to do well, they will equip you with everything you need to pass very well - all you have to do is show up prepared in class and for exams. Show up and do well for yourself because it will definitely pay off at the end. Be an achiever."
                            </p>
                        </blockquote>

                        <div className="flex justify-between items-end border-t border-white/5 pt-6">
                            <div>
                                <h4 className="text-white font-bold text-lg font-serif">Fezile Khumalo</h4>
                                <p className="text-brand-gold text-sm mb-1">Banqueting & Conferencing Coordinator</p>
                                <p className="text-brand-muted text-xs">Crowne Plaza</p>
                            </div>

                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all">
                                    <ChevronLeft size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        <div className="w-8 h-1 bg-brand-gold rounded-full"></div>
                        <div className="w-2 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-2 h-1 bg-white/20 rounded-full"></div>
                        <div className="w-2 h-1 bg-white/20 rounded-full"></div>
                    </div>
                </div>

             </div>
        </section>
    );
};