import React from "react";

type Testimonial = {
  name: string;
  focus: string;
  review: string;
  avatar?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anele M.",
    focus: "Hospitality Management",
    review:
      "The programme gave me the confidence and practical skills to thrive in a 5-star environment.",
  },
  {
    name: "Lara S.",
    focus: "Culinary Arts",
    review:
      "World-class training with mentorship that challenged me to grow every week.",
  },
  {
    name: "Thabo K.",
    focus: "Online Learning",
    review:
      "Flexible, engaging and industry-relevant. I could study while working full-time.",
  },
  {
    name: "Nadia P.",
    focus: "Short Courses",
    review:
      "Short, sharp and impactful. Loved the hands-on approach and expert lecturers.",
  },
  {
    name: "Bryan T.",
    focus: "Hospitality Management",
    review:
      "The internship network opened doors for me across leading hotels in SA.",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white/95 backdrop-blur p-6 md:p-8 rounded shadow min-w-[320px] md:min-w-[360px] max-w-[400px] mx-4">
      <div className="flex items-center gap-4 mb-4">
        {t.avatar && (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover border border-brand-surface"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
        <div>
          <h4 className="font-serif font-bold text-brand-primary text-base md:text-lg leading-tight">
            {t.name}
          </h4>
          <p className="text-[10px] md:text-xs text-brand-textSecondary uppercase tracking-wider">
            {t.focus}
          </p>
        </div>
      </div>
      <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed italic">
        "{t.review}"
      </p>
    </div>
  );
}

export default function TestimonialsList() {
  // Duplicate arrays to create seamless marquee loops
  const ROW_1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const ROW_2 = [
    ...TESTIMONIALS.slice().reverse(),
    ...TESTIMONIALS.slice().reverse(),
  ];

  return (
    <section className="relative py-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-brand-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-brand-dark to-transparent" />

      {/* Row 1 */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee-left">
          {ROW_1.map((t, i) => (
            <TestimonialCard key={`r1-${i}-${t.name}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden mt-6">
        <div className="flex animate-marquee-right">
          {ROW_2.map((t, i) => (
            <TestimonialCard key={`r2-${i}-${t.name}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
