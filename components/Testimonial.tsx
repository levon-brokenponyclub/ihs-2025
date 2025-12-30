
import React from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Hospitality Management",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    quote: "IHS transformed the way I understand luxury service. The courses are comprehensive, and the flexibility allowed me to balance my studies with my internship."
  },
  {
    id: 2,
    name: "Michael Ngubane",
    role: "Culinary Arts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    quote: "The practical training in the kitchen is unmatched. Learning directly from industry chefs gave me the confidence to start my own catering business."
  },
  {
    id: 3,
    name: "Jessica Lee",
    role: "Hotel Operations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    quote: "Securing a placement at a 5-star hotel was my dream, and the Career Centre made it happen. The networking opportunities are incredible."
  },
  {
    id: 4,
    name: "David Silva",
    role: "Business Administration",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    quote: "I moved from a junior role to management within a year of graduating. The BBA programme gave me the strategic mindset I needed."
  },
  {
    id: 5,
    name: "Emily Chen",
    role: "Patisserie",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    quote: "The attention to detail in the Patisserie course is world-class. I learned techniques here that I use every single day in my bakery."
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    quote: "The blend of theory and practical work is perfect. I felt completely prepared for the real world pressure of high-end restaurant service."
  }
];

// Duplicate for infinite effect
const ROW_1 = [...TESTIMONIALS, ...TESTIMONIALS];
const ROW_2 = [...TESTIMONIALS.reverse(), ...TESTIMONIALS];

const TestimonialCard = ({ data }: { data: typeof TESTIMONIALS[0] }) => (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-brand-border min-w-[350px] max-w-[350px] md:min-w-[400px] md:max-w-[400px] hover:shadow-lg transition-shadow duration-300 mx-4 flex flex-col justify-between h-full">
        <div>
            <div className="flex items-center gap-4 mb-6">
                <img 
                    src={data.image} 
                    alt={data.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-surface"
                />
                <div>
                    <h4 className="font-serif font-bold text-brand-primary text-lg leading-tight">{data.name}</h4>
                    <p className="text-xs text-brand-textSecondary uppercase tracking-wider">{data.role}</p>
                </div>
            </div>
            <p className="text-brand-textSecondary text-base leading-relaxed italic">
                "{data.quote}"
            </p>
        </div>
    </div>
);

export const Testimonial: React.FC = () => {
    return (
        <section className="py-24 bg-brand-surface overflow-hidden relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-brand-primary font-semibold mb-6">
                    What our students <span className="text-brand-accent italic">say.</span>
                </h2>
                <p className="text-brand-textSecondary max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    At International Hotel School, our courses are meticulously curated and delivered by a network of highly skilled trainers who are experts in their respective fields.
                </p>
             </div>

             {/* Row 1: Right to Left */}
             <div className="flex mb-8 overflow-hidden group">
                 <div className="flex animate-marquee-left hover-pause">
                     {ROW_1.map((item, idx) => (
                         <TestimonialCard key={`r1-${idx}`} data={item} />
                     ))}
                 </div>
             </div>

             {/* Row 2: Left to Right */}
             <div className="flex overflow-hidden group">
                 <div className="flex animate-marquee-right hover-pause">
                     {ROW_2.map((item, idx) => (
                         <TestimonialCard key={`r2-${idx}`} data={item} />
                     ))}
                 </div>
             </div>
             
             {/* Fade Edges */}
             <div className="absolute top-0 left-0 h-full w-20 md:w-32 bg-gradient-to-r from-brand-surface to-transparent z-10 pointer-events-none"></div>
             <div className="absolute top-0 right-0 h-full w-20 md:w-32 bg-gradient-to-l from-brand-surface to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};
