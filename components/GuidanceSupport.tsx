import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
    "Graduate job ready. All our programmes contain unrivalled practical work experience.",
    "Established for over 30 years, providing you with the best reputational head start.",
    "Only Hospitality & Culinary school in Africa ranked in the top 50 Hospitality Universities in the world.",
    "Only tertiary institution offering programmes recognised by the American Hotel and Lodging Educational Institute.",
    "Proudly part of Sommet Education, World's Leader in Hospitality Management Education."
];

export const GuidanceSupport: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const START_TIME = 0;
    const END_TIME = 15;

    const handleTimeUpdate = (video: HTMLVideoElement) => {
      if (video.currentTime >= END_TIME) {
        video.currentTime = START_TIME;
      }
    };

    const handleSeeked = (video: HTMLVideoElement) => {
      if (video.currentTime < START_TIME) {
        video.currentTime = START_TIME;
      }
    };

    const videos = [video1Ref.current, video2Ref.current, video3Ref.current];

    videos.forEach((video) => {
      if (video) {
        video.addEventListener('timeupdate', () => handleTimeUpdate(video));
        video.addEventListener('seeked', () => handleSeeked(video));
      }
    });

    return () => {
      videos.forEach((video) => {
        if (video) {
          video.removeEventListener('timeupdate', () => handleTimeUpdate(video));
          video.removeEventListener('seeked', () => handleSeeked(video));
        }
      });
    };
  }, []);

  return (
    <section className="py-24 bg-brand-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Image */}
                <div className="relative h-[300px] lg:h-[540px] w-full perspective-[1400px] overflow-hidden rounded-[20px]">
                    {/* Video layers */}
                    <video
                        ref={video1Ref}
                        className="absolute top-[40%] left-[50%] w-[150%] h-[150%] object-cover rounded-[20px] opacity-25 blur-[1px] brightness-105"
                        style={{ transform: 'translate(-50%, -50%) scale(1.25)' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/assets/videos/masking-video.mp4" type="video/mp4" />
                    </video>
                    <video
                        ref={video2Ref}
                        className="absolute top-[40%] left-[50%] w-[150%] h-[150%] object-cover rounded-[20px] blur-[0.5px] brightness-100"
                        style={{ transform: 'translate(-50%, -50%) scale(1.1)' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/assets/videos/masking-video.mp4" type="video/mp4" />
                    </video>
                    <video
                        ref={video3Ref}
                        className="absolute top-[40%] left-[50%] w-[150%] h-[150%] object-cover rounded-[20px] blur-[1px] brightness-90"
                        style={{ transform: 'translate(-50%, -50%) scale(1.1' }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/assets/videos/masking-video.mp4" type="video/mp4" />
                    </video>
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
