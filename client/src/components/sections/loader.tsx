// components/Loader.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './loader.css'; // custom CSS for triangle shape

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });

    shapesRef.current.forEach((shape, i) => {
      tl.fromTo(
        shape,
        { y: 100, opacity: 0, rotate: -20 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.8, delay: i * 0.1 },
        '-=0.5'
      );
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.4'
    );

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.8,
      pointerEvents: 'none',
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black text-blue-400"
    >
      <div className="flex gap-6 mb-8">
        <div ref={(el) => el && (shapesRef.current[0] = el)} className="w-10 h-10 rounded-full bg-blue-500"></div>
        <div ref={(el) => el && (shapesRef.current[1] = el)} className="w-10 h-10 rounded-md bg-blue-500"></div>
        <div ref={(el) => el && (shapesRef.current[2] = el)} className="triangle-shape"></div>
      </div>

      <div
        ref={textRef}
        className="text-2xl font-mono tracking-wide animate-pulse"
      >
        Loading Portfolio...
      </div>
    </div>
  );
};

export default Loader;
