import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [dots, setDots] = useState('');

  const fullText = "LOADING PORTFOLIO";

  useEffect(() => {
    // Typing effect
    let textIndex = 0;
    const typeText = () => {
      if (textIndex < fullText.length) {
        setDisplayText(fullText.slice(0, textIndex + 1));
        textIndex++;
        setTimeout(typeText, 80);
      }
    };
    
    typeText();

    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Fade in
    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Circle animation
    if (circleRef.current) {
      tl.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.2'
      );
    }

    // Text animation
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
    }

    // Exit animation
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 1,
      pointerEvents: 'none',
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[#020410] text-slate-300"
    >
      {/* Simple animated circle */}
      <div className="relative mb-8">
        <div
          ref={circleRef}
          className="w-16 h-16 border-2 border-indigo-500/30 rounded-full"
        >
          <div className="absolute inset-0 border-2 border-transparent border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="text-xl md:text-2xl font-mono tracking-wider flex items-center"
      >
        <span className="text-slate-400">{displayText}</span>
        <span className="text-indigo-400 w-4 inline-block">{dots}</span>
      </div>

      {/* Subtle progress indicator */}
      <div className="mt-6 w-32 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-1/3 rounded-full animate-shimmer" />
      </div>
    </div>
  );
};

export default Loader;
