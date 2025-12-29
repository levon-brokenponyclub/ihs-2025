import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const steps = [
    {
        num: "01",
        title: "Apply Now",
        desc: "Click here to begin your application process today.",
        image: "https://picsum.photos/id/180/600/400"
    },
    {
        num: "02",
        title: "Finalise Enrolment",
        desc: "Provide you with Financial Guidance and learn about our Money Back Guarantee!",
        image: "https://picsum.photos/id/60/600/400"
    },
    {
        num: "03",
        title: "Graduate Successfully",
        desc: "Free entrance into IHS Beyond Grad Employment Support Programme.",
        image: "https://picsum.photos/id/1/600/400"
    }
];

export const GettingStarted: React.FC = () => {
    return (
        <section className="py-24 bg-brand-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        Ready To Start Your Successful Hospitality <br/>
                        <span className="text-brand-gold italic">Management Or Culinary Career?</span>
                    </h2>
                    <p className="text-brand-muted mt-4">Enrolling at Africa's Leading Hospitality Management & Culinary School couldn't be easier:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Card Image Background with Overlay */}
                            <div className="relative h-80 rounded-sm overflow-hidden mb-6 border border-white/10">
                                <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/30 transition-colors"></div>
                                
                                <div className="absolute top-4 left-6 text-6xl font-serif font-bold text-white/10 group-hover:text-brand-gold/80 transition-colors">
                                    {step.num}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 font-serif group-hover:text-brand-gold transition-colors">{step.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">{step.desc}</p>
                            
                            {idx === 0 && (
                                <Button variant="primary" className="!text-xs !px-4 !py-2" icon={<ArrowRight size={14} />}>
                                    Start Application
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};