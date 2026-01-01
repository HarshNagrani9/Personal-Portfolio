import React, { useState, useEffect } from 'react';

// --- Styles for Animations ---
const AnimationStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Grotesk:wght@300;400;500&display=swap');

    /* Basic Animations */
    @keyframes expandWidth {
      from { width: 0; opacity: 0; }
      to { width: 100%; opacity: 1; }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* The Curtain Exit */
    @keyframes slideUp {
      0% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }

    /* --- THE GLITCH EFFECT (Triggered briefly after name completes) --- */
    @keyframes glitch-skew {
      0% { transform: skew(0deg); }
      20% { transform: skew(-2deg); }
      40% { transform: skew(2deg); }
      60% { transform: skew(-1deg); }
      80% { transform: skew(1deg); }
      100% { transform: skew(0deg); }
    }

    @keyframes glitch-anim-1 {
      0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
      20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
      40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
      60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
      80% { clip-path: inset(10% 0 60% 0); transform: translate(-1px, 1px); }
      100% { clip-path: inset(50% 0 30% 0); transform: translate(1px, -1px); }
    }

    @keyframes glitch-anim-2 {
      0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
      20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 1px); }
      40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
      60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
      80% { clip-path: inset(60% 0 30% 0); transform: translate(1px, -1px); }
      100% { clip-path: inset(40% 0 80% 0); transform: translate(-1px, 1px); }
    }

    /* Only trigger glitch when class is added */
    .glitch-active {
      animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }

    .glitch-active::before,
    .glitch-active::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }

    .glitch-active::before {
      color: #0ea5e9; /* Cyan */
      animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
      left: 2px;
      z-index: -1;
    }

    .glitch-active::after {
      color: #ef4444; /* Red */
      animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
      left: -2px;
      z-index: -2;
    }

    .font-display { font-family: 'Syncopate', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
    
    .curtain-exit {
      animation: slideUp 1.1s cubic-bezier(0.87, 0, 0.13, 1) forwards;
    }
  `}</style>
);

// --- Random Reveal Component ---
// Reveals characters of the text one by one in a random order
const RandomRevealText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    // 1. Create list of all indices [0, 1, 2, ... length-1]
    const indices = Array.from({ length: text.length }, (_, i) => i);
    
    // 2. Shuffle the indices to randomize reveal order
    const shuffled = indices.sort(() => Math.random() - 0.5);
    
    let currentIndex = 0;
    
    // 3. Reveal one index at a time
    const interval = setInterval(() => {
      if (currentIndex >= shuffled.length) {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 200); // Small pause before notifying completion
        return;
      }

      const indexToReveal = shuffled[currentIndex];
      setRevealedIndices(prev => {
        const next = new Set(prev);
        next.add(indexToReveal);
        return next;
      });
      
      currentIndex++;
    }, 120); // Adjust speed (ms) per letter here

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="inline-block transition-all duration-500 ease-out"
          style={{ 
            opacity: revealedIndices.has(i) ? 1 : 0,
            transform: revealedIndices.has(i) ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.8)',
            filter: revealedIndices.has(i) ? 'blur(0)' : 'blur(8px)',
            color: revealedIndices.has(i) ? 'white' : 'transparent'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// --- Loader Component ---
const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const [stage, setStage] = useState(0); 
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    // Stage 1: Line expands
    const timer1 = setTimeout(() => setStage(1), 500);
    
    // Stage 2: Box opens (Text will start revealing automatically when mounted)
    const timer2 = setTimeout(() => setStage(2), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleTextComplete = () => {
    // Text has finished forming "HARSH NAGRANI"
    
    // Trigger a brief glitch effect
    setTriggerGlitch(true);
    setTimeout(() => setTriggerGlitch(false), 400);

    // Wait a moment then start exit sequence
    setTimeout(() => {
      setExitAnimation(true);
      // Finally notify parent to remove loader
      setTimeout(() => onComplete?.(), 1000);
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden ${exitAnimation ? 'curtain-exit' : ''}`}>
      <AnimationStyles />

      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center justify-center">
        
        {/* Main Content Container */}
        <div 
          className="relative flex items-center justify-center border-t border-b border-slate-700/50 bg-[#020617]/50 backdrop-blur-sm transition-all duration-1000 ease-out"
          style={{ 
            width: stage >= 1 ? '100%' : '0%', 
            height: stage >= 2 ? '150px' : '1px',
            opacity: stage >= 1 ? 1 : 0
          }}
        >
          {/* Tech Decor Corners */}
          <div className={`absolute top-0 left-0 w-2 h-2 border-l border-t border-sky-500 transition-opacity ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b border-sky-500 transition-opacity ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="relative text-center">
             {stage >= 2 && (
               <div className="flex flex-col items-center gap-4">
                 {/* Name with Glitch Wrapper */}
                 <div className="relative">
                   <h1 
                    data-text="HARSH NAGRANI"
                    className={`font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest text-white ${triggerGlitch ? 'glitch-active' : ''}`}
                   >
                     <RandomRevealText 
                       text="HARSH NAGRANI" 
                       onComplete={handleTextComplete} 
                     />
                   </h1>
                 </div>
                 
               </div>
             )}
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-48 h-[1px] bg-slate-800 overflow-hidden transition-opacity duration-500 ${exitAnimation ? 'opacity-0' : 'opacity-100'}`}>
          <div className="h-full bg-sky-500 animate-[expandWidth_2s_ease-out_forwards] shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
        </div>

      </div>
    </div>
  );
};

export default Loader;
