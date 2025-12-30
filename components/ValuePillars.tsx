
import React, { useEffect, useRef, useState } from 'react';
import { Globe, Award, TrendingUp } from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: "Global Experience",
    text: "Hands-on training at leading hospitality establishments worldwide."
  },
  {
    icon: Award,
    title: "World-class Qualification",
    text: "Internationally recognised certifications from top institutions."
  },
  {
    icon: TrendingUp,
    title: "Graduate Employed",
    text: "Join our 30,000+ successfully employed graduates network."
  }
];

export const ValuePillars: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-brand-surface py-24 border-b border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
                key={idx} 
                className={`bg-white p-10 rounded-sm border border-brand-border shadow-sm group hover:shadow-xl hover:-translate-y-2 transition-all duration-700 ease-out transform
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                `}
                style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                <pillar.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-brand-primary mb-4 font-serif">{pillar.title}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed opacity-90">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
