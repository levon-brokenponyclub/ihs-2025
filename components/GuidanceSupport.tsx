import React from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
    "Graduate job ready. All our programmes contain unrivalled practical work experience.",
    "Established for over 30 years, providing you with the best reputational head start.",
    "Only Hospitality & Culinary school in Africa ranked in the top 50 Hospitality Universities in the world.",
    "Only tertiary institution offering programmes recognised by the American Hotel and Lodging Educational Institute.",
    "Proudly part of Sommet Education, World's Leader in Hospitality Management Education."
];

export const GuidanceSupport: React.FC = () => {
  return (
    <section className="py-24 bg-brand-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Image */}
                <div className="relative">
                    <div className="absolute top-4 left-4 w-full h-full border border-brand-gold/20 rounded-sm translate-x-4 translate-y-4"></div>
                    <video
                        src="https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm"
                        className="relative rounded-sm shadow-2xl w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>

                {/* Right: Content */}
                <div>
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight">
                        We're Here To Help You <br/>
                        <span className="text-brand-gold italic">Make The Best Choice</span>
                    </h2>
                    
                    <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-4 items-start group">
                                <div className="mt-1 flex-shrink-0 text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                                    <CheckCircle size={20} />
                                </div>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};