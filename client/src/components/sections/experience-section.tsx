import React, { useRef, useState } from 'react';

import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate, 
  useVelocity,
  AnimatePresence
} from 'framer-motion';

import { Briefcase, GraduationCap, ChevronDown, Sparkles, Zap } from 'lucide-react';

// --- Data ---
const experiences = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "ConnectWise",
    date: "Jun 2025 - Aug 2025",
    description: "Designed a data pipeline from Snowflake for large-scale data ingestion and transformation, fueling a recommendation system efficiently recommending 81% users. Developed and optimized clustering algorithms, identifying 20-90 optimal groups (validated by Silhouette Score) to derive actionable insights from complex operational data. Established seamless data persistence to PostgreSQL for weekly/monthly synchronization, enabling GoLang backend microservices to deliver real-time, data-driven recommendations to React frontends.",
    tags: ["Snowflake", "PostgreSQL", "GoLang", "React"],
    type: "experience"
  },
  {
    id: 2,
    role: "Frontend React Developer",
    company: "PressX India",
    date: "Mar - Apr 2024",
    description: "Programmed seamless user profiles utilizing React JS, resulting in enhanced access to order history; streamlined the onboarding process resulted in collecting over 500 new users within one month. Engineered an interactive platform with custom profiles that streamlined access to order history and personal information; resulted in 150+ new daily active users within the first month of launch. Established custom user profiles for seamless access to order and personal information, resulting in a 170% increase in user participation.",
    tags: ["React", "JavaScript"],
    type: "experience"
  },
  {
    id: 3,
    role: "Council Head",
    company: "DataZen",
    date: "Jul 2024 - Jul 2025",
    description: "Lead a team of 25+ members to promote data science, AI, and ML among students. Foster collaboration and knowledge sharing within the council and across disciplines. Organize workshops, events, and online meets to engage the community.",
    tags: ["Leadership", "Data Science", "AI/ML"],
    type: "experience"
  }
];

const education = [
  {
    id: 4,
    degree: "Bachelors in Computer Engineering",
    school: "KJ Somaiya College of Engineering, Mumbai",
    date: "2022 - 2026",
    description: "Pursuing a comprehensive education in computer engineering, focusing on software development, data structures, and algorithms.",
    type: "education"
  },
  {
    id: 5,
    degree: "High Secondary Education",
    school: "St Xavier's High School, Adipur, Gujarat",
    date: "2020 - 2022",
    description: "Completed high secondary education with a focus on science and mathematics.",
    type: "education"
  },
  {
    id: 6,
    degree: "Data Structures & Algorithms",
    school: "CodeHelp",
    date: "Certificate Course",
    description: "Successfully completed a comprehensive 5-month online course on data structures and algorithms, gaining valuable expertise in this fundamental aspect of computer science. LeetCode: 1540 (Top 34%) | CodeChef: 3★ | Codeforces: 1525 (Specialist)",
    type: "education"
  }
];

// --- Components ---

// 1. 3D Tilt & Spotlight Card
const InteractiveCard = ({ item, scrollVelocity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  
  // Motion Values for Mouse Interaction
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0); // For spotlight gradient
  const mouseY = useMotionValue(0); // For spotlight gradient

  // Smooth out the rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 20 });

  // Velocity Skew (Reactive to Scroll)
  const skew = useTransform(scrollVelocity, [-5, 5], [2, -2]); 
  const skewSpring = useSpring(skew, { stiffness: 400, damping: 30 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Set values for Tilt
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    
    // Set values for Spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    mouseX.set(0); 
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200, 
        skewY: skewSpring, // Apply physics skew
      }}
      initial={{ opacity: 0, rotateX: -30, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
      className="relative w-full mb-12 max-w-3xl mx-auto"
    >
      {/* Connector Dot */}
      <div className={`absolute top-8 -left-[45px] md:-left-[69px] w-6 h-6 rounded-full border-4 border-background z-20 
        ${item.type === 'experience' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]' : 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]'}
      `} />
      
      {/* Connector Line (Horizontal) */}
      <div className={`absolute top-[43px] -left-[45px] md:-left-[65px] w-12 h-[2px] z-0
         ${item.type === 'experience' ? 'bg-gradient-to-r from-blue-500 to-transparent' : 'bg-gradient-to-r from-emerald-500 to-transparent'}
      `} />
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className={`
          group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300
          ${isOpen 
            ? 'bg-zinc-900/90 border-zinc-600 ring-1 ring-white/10' 
            : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50'
          }
        `}
      >
        {/* Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.08),
                transparent 40%
              )
            `,
          }}
        />

        {/* Content Container */}
        <div className="relative p-6 md:p-8 transform-style-3d">
          
          {/* Header Row */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold tracking-[0.2em] uppercase py-1 px-2 rounded bg-white/5 
                  ${item.type === 'experience' ? 'text-blue-400' : 'text-emerald-400'}`}>
                  {item.date}
                </span>
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-zinc-500 flex items-center gap-1"
                    >
                      <Sparkles size={10} /> Expand
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-zinc-100 leading-tight group-hover:text-white transition-colors">
                {item.role || item.degree}
              </h3>
              <p className="text-zinc-400 font-medium text-sm md:text-base mt-1">
                {item.company || item.school}
              </p>
            </div>
            {/* Icon Box */}
            <div className={`
              flex-shrink-0 p-3 rounded-xl border border-white/5 shadow-lg backdrop-blur-sm
              ${item.type === 'experience' 
                ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' 
                : 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20'}
              transition-colors duration-300
            `}>
              {item.type === 'experience' ? <Briefcase size={22} /> : <GraduationCap size={22} />}
            </div>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-white/10">
                  <p className="text-zinc-300 leading-relaxed text-sm md:text-base mb-6">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags && item.tags.map((tag, i) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:border-zinc-500 hover:text-white transition-colors"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                    {item.grade && (
                      <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-900/30 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
                        <Zap size={10} /> GPA: {item.grade}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Chevron Indicator */}
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="absolute bottom-6 right-6 text-zinc-600 group-hover:text-zinc-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 2. Parallax Background
const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Floating Blobs */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[100px]" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[100px]" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

// 3. Creative "Cyber-Comet" Progress Beam
const ProgressBeam = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothHeight = useSpring(height, { stiffness: 100, damping: 30 });
  return (
    <div className="absolute left-[20px] md:left-[36px] top-0 bottom-12 w-[2px] z-0">
      
      {/* Track: A dotted/dashed mechanical path */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_4px,transparent_4px)] bg-[size:100%_12px]" />
      </div>
      {/* Fill: Glowing liquid light */}
      <motion.div 
        style={{ height: smoothHeight }}
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
      >
         {/* Head: The "Energy Core" / Comet */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white z-10 shadow-[0_0_20px_2px_rgba(255,255,255,0.8)]">
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full bg-blue-400 blur-sm" />
         </div>
      </motion.div>
    </div>
  );
};

// 4. Main Application
export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const introOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section id="experience" className="min-h-screen bg-background text-zinc-200 font-sans selection:bg-white/20 relative">
      <ParallaxBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-24">
        
        {/* Intro */}
        <div className="mb-32 text-center relative">
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600 mb-6">
              THE PATH
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Tracing the milestones of my academic foundations and professional evolution.
            </p>
        </motion.div>

          <motion.div 
            style={{ opacity: introOpacity }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Begin Journey</span>
            <ChevronDown className="animate-bounce" />
          </motion.div>
        </div>

        <div ref={containerRef} className="relative pl-12 md:pl-24 border-l border-zinc-800/0">
          {/* The Creative Glowing Line */}
          <ProgressBeam containerRef={containerRef} />

          {/* Education Section */}
          <section className="mb-32 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-16 relative"
            >
              <div className="absolute -left-[45px] md:-left-[69px] w-6 h-6 rounded-full bg-background border-4 border-emerald-500/30 z-20" />
              
              <div className="p-3 bg-card border border-emerald-500/30 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <GraduationCap className="text-emerald-400" size={28} />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Education</h2>
                <p className="text-emerald-500/60 font-mono text-sm uppercase tracking-wider">Foundation & Theory</p>
              </div>
            </motion.div>
            <div className="flex flex-col gap-2">
              {education.map(item => (
                <InteractiveCard key={item.id} item={item} scrollVelocity={smoothVelocity} />
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-6 mb-16 relative"
            >
              <div className="absolute -left-[45px] md:-left-[69px] w-6 h-6 rounded-full bg-background border-4 border-blue-500/30 z-20" />
              <div className="p-3 bg-card border border-blue-500/30 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Briefcase className="text-blue-400" size={28} />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Experience</h2>
                <p className="text-blue-500/60 font-mono text-sm uppercase tracking-wider">Professional Career</p>
              </div>
            </motion.div>
            <div className="flex flex-col gap-2">
              {experiences.map(item => (
                <InteractiveCard key={item.id} item={item} scrollVelocity={smoothVelocity} />
              ))}
            </div>
          </section>
          </div>

        {/* Footer Message */}
        <div className="mt-32 text-center">
            <p className="text-zinc-700 font-mono text-xs">
              END OF LOGS // MORE TO COME
            </p>
        </div>
      </div>
    </section>
  );
}
