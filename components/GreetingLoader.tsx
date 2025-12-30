import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GreetingLoaderProps {
  onComplete: () => void;
}

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Guten Tag",
  "Ciao",
  "Sawubona", // Zulu
  "Molo",     // Xhosa
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
    greetings.forEach((greeting) => {
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
        delay: 0.1,
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <p 
        ref={textRef} 
        className="text-4xl md:text-6xl font-light tracking-wider opacity-0"
      >
        Hello
      </p>
    </div>
  );
};

export default GreetingLoader;