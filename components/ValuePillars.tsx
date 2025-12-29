import React from 'react';
import { Globe, Award, TrendingUp } from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: "Gain Crucial Work Experience",
    text: "Hands-on training at leading hospitality establishments worldwide."
  },
  {
    icon: Award,
    title: "Receive a World-class Qualification",
    text: "Internationally recognised certifications from top institutions."
  },
  {
    icon: TrendingUp,
    title: "Become Employed",
    text: "Join our 30,000+ successfully employed graduates network."
  }
];

export const ValuePillars: React.FC = () => {
  return (
    <div className="bg-brand-dark py-24 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-brand-card p-8 rounded-sm border border-white/5 shadow-lg group hover:bg-brand-card/80 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 font-serif">{pillar.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};