
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GreetingLoaderProps {
  onComplete: () => void;
}

const greetings = [
  "Hello",
  "Bonjour",
  "Sawubona", // Zulu
  "Molo",     // Xhosa
  "Dumela",   // Tswana
  "Avuxeni",  // Tsonga
  "Welcome"
];

const GreetingLoader: React.FC<GreetingLoaderProps> = ({ onComplete }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // Cycle through greetings
    greetings.forEach((greeting, index) => {
      // Faster duration for middle items, slightly longer for first and last
      const displayDuration = index === greetings.length - 1 ? 0.8 : 0.15;
      
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.15,
        onStart: () => {
          if (textRef.current) textRef.current.innerText = greeting;
        },
        ease: "power2.out"
      })
      .to(textRef.current, {
        opacity: 0,
        duration: 0.15,
        delay: displayDuration, 
        ease: "power2.in"
      });
    });

    // Slide up curtain animation
    tl.to(sectionRef.current, {
      height: 0,
      duration: 0.8,
      ease: "power4.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={sectionRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark overflow-hidden"
    >
      <p 
        ref={textRef} 
        className="font-serif text-4xl md:text-6xl text-white font-normal tracking-wider opacity-0"
      >
        Hello
      </p>
    </div>
  );
};

export default GreetingLoader;
