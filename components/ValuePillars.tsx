
import React from 'react';
import { Globe, Award, TrendingUp, Users, Star, ArrowRight, AlertTriangle, TrendingDown } from 'lucide-react';

const PILLARS = [
    {
        id: 1,
        title: "Global Recognition",
        description: "The only Hospitality & Culinary school in Africa ranked in the top 50 Hospitality Universities in the world. Your qualification travels with you.",
        icon: Globe
    },
    {
        id: 2,
        title: "93% Employability",
        description: "Our graduates are highly sought after. We provide dedicated career support, CV workshops, and placement assistance to ensure you start strong.",
        icon: TrendingUp
    },
    {
        id: 3,
        title: "International Accreditation",
        description: "Proudly part of Sommet Education, the world leader in hospitality management education. Dual accreditation opportunities available.",
        icon: Award
    },
    {
        id: 4,
        title: "Practical Excellence",
        description: "Hands-on training in real-world environments. We believe in learning by doing, with 50% of coursework focused on practical experience.",
        icon: Star
    },
    {
        id: 5,
        title: "Alumni Network",
        description: "Join 35,000+ successful graduates working in 5-star establishments, cruise liners, and luxury resorts across the globe.",
        icon: Users
    }
];

const PROBLEMS = [
    {
        id: 'p1',
        title: "An Unrecognised Qualification",
        description: "Receive poor quality education which cannot be used locally or internationally.",
        icon: AlertTriangle
    },
    {
        id: 'p2',
        title: "No Career Prospects",
        description: "No post-graduation employment support or industry recognition.",
        icon: TrendingDown
    }
];

export const ValuePillars: React.FC = () => {
    return (
        <section className="bg-[#f8fafc] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Intro */}
                <div className="mb-16 max-w-3xl">
                    <h2 className="font-serif text-4xl md:text-5xl text-[#0f0f0f] leading-tight mb-6">
                        Why Choose <br/>
                        <span className="font-semibold text-brand-primary">International Hotel School?</span>
                    </h2>
                    <p className="text-[#666666] text-lg leading-relaxed">
                        We design educational experiences that make a difference. Discover what sets us apart in the global industry.
                    </p>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    
                    {/* Value Cards */}
                    {PILLARS.map((pillar, index) => (
                        <div 
                            key={pillar.id}
                            className="w-[300px] md:w-[380px] shrink-0 bg-white p-8 border border-[#E5E5E5] hover:border-brand-gold/50 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-[420px] snap-center rounded-sm"
                        >
                            <div>
                                <div className="w-14 h-14 bg-[#F5F5F5] rounded-full flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-brand-gold transition-colors duration-300">
                                    <pillar.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-serif text-[#0f0f0f] mb-4 leading-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-[#666666] text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-6 mt-6">
                                <span className="text-brand-gold font-serif font-bold text-xl">0{index + 1}</span>
                                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-primary group-hover:text-brand-primary transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Problem Cards Divider */}
                    <div className="w-px bg-gray-200 shrink-0 mx-4"></div>

                    {/* Problem Cards */}
                    {PROBLEMS.map((problem) => (
                        <div 
                            key={problem.id}
                            className="w-[300px] md:w-[380px] shrink-0 bg-[#041424] border border-brand-goldMuted/20 p-8 rounded-sm hover:border-brand-gold transition-colors duration-300 h-[420px] snap-center flex flex-col justify-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6">
                                <problem.icon size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
