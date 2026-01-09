import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Apply Now",
    desc: "Click here to begin your application process today.",
    video: "https://www.shutterstock.com/shutterstock/videos/1087550930/preview/stock-footage-chef-teaching-how-to-cook-cutting-vegetables-indoors-in-commercial-kitchen.webm"
  },
  {
    num: "02",
    title: "Finalise Enrolment",
    desc: "Provide you with Financial Guidance and learn about our Money Back Guarantee!",
    video: "https://www.shutterstock.com/shutterstock/videos/3541615587/preview/stock-footage-hotel-employees-and-guest-at-reception-for-check-in-hospitality-and-accommodation-with-tourism.webm"
  },
  {
    num: "03",
    title: "Graduate Successfully",
    desc: "Free entrance into IHS Beyond Grad Employment Support Programme.",
    video: "https://media.istockphoto.com/id/472897860/video/culinary-school-intructor-teaching-students-in-commercial-kitchen.mp4?s=mp4-640x640-is&k=20&c=hsucGTdCRxP4qSN4fHeX9YW7_qNeeNno0dfHRiaB5_k="
  }
];

export const GettingStarted: React.FC = () => {

  return (
    <section className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Ready To Start Your Successful Hospitality <br/>
            <span className="text-brand-gold italic">Management Or Culinary Career?</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Enrolling at Africa's Leading Hospitality Management & Culinary School couldn't be easier:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const videoRef = useRef<HTMLVideoElement>(null);

            const handleMouseEnter = () => {
              if (videoRef.current) videoRef.current.play().catch(() => {});
            };

            const handleMouseLeave = () => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            };

            return (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-sm border border-white/10 h-80"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Video Background */}
                <video
                  ref={videoRef}
                  src={step.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors"></div>

                {/* Number */}
                <div className="absolute top-4 left-4 text-6xl font-serif text-brand-gold/60 group-hover:text-brand-gold/80 transition-colors select-none pointer-events-none">
                  {step.num}
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white font-serif transition-all duration-500 group-hover:-translate-y-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 text-sm mt-2 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-40">
                    {step.desc}
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};