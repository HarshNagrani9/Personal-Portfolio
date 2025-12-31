import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ArrowRight, X, ChevronDown, ChevronUp, Hash, Lock } from 'lucide-react';

/* -------------------------------------------------------------------------------------------------
 * PROJECTS DATA
 * -----------------------------------------------------------------------------------------------*/
const allProjects = [
        {
            id: 1,
            title: "MediVault",
            category: "Blockchain + AI",
    description: "Full-stack healthcare management platform with blockchain-based file access control.",
    longDescription: [
                "Built a secure healthcare platform with role-based access using Next.js, TypeScript, and Firebase.",
                "Implemented blockchain-backed consent control using Ethereum smart contracts with immutable on-chain file hashes.",
                "Applied end-to-end encryption system using AES-256-GCM for application-layer encryption of sensitive health records.",
                "Enforced client-side encryption before IPFS upload, secure key management, and encrypted metadata storage in Firestore.",
                "Architected Python FastAPI for vector search, PDF parsing, and REST integrations.",
                "Integrated RAG (Retrieval-Augmented Generation) system with FAISS vector search and GenAI for intelligent medical record retrieval."
            ],
            tech: ["Next.js 14", "Solidity", "FastAPI", "Google Gemini", "FAISS", "IPFS"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/LY-Project",
    live: "https://drive.google.com/file/d/1ZbuSqx1R1kmCBXEVOeHAo4sB2raFj24z/view?usp=sharing",
    color: "from-emerald-500 to-green-600",
        },
        {
            id: 2,
            title: "Clarity",
            category: "Productivity System",
            description: "All-in-one PWA unifying habit tracking, goal setting, and task management into a single timeline.",
            longDescription: [
                "Built a progressive web application (PWA) that combines habit tracking, goal management, and daily task management into a unified interface.",
                "Implemented advanced date logic with timezone-aware recurring habits for accurate scheduling.",
                "Integrated Web Push notifications and real-time streak tracking for user engagement.",
                "Developed custom Service Workers for offline functionality and seamless user experience.",
                "Designed mobile-first interface providing native-like experience on iOS and Android.",
                "Added dual-theme support with system sync and instant theme switching.",
                "Implemented gamification through instant feedback using canvas-confetti for micro-interactions."
            ],
            tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Firebase", "PWA"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/Clarity",
            live: "https://clarityr.vercel.app",
            color: "from-indigo-500 to-violet-600",
        },
        {
            id: 3,
            title: "TruEstate",
            category: "Sales Management",
            description: "Full-stack retail sales management system with advanced search, filtering, sorting, and pagination.",
            longDescription: [
                "Built a comprehensive retail sales management application with React 19 and Express.js, connected to PostgreSQL via Neon.",
                "Implemented case-insensitive search with 300ms debouncing across customer names and phone numbers using PostgreSQL ILIKE operator.",
                "Developed multi-select filters for regions, categories, and payment methods using PostgreSQL ANY() operator for efficient array matching.",
                "Created range filters for age and date ranges using comparison operators for flexible querying.",
                "Implemented server-side pagination with smart page truncation showing 5 pages around current page.",
                "Optimized all database queries for performance with state preservation across filter, search, and sort operations."
            ],
            tech: ["React 19", "Express.js", "PostgreSQL", "Tailwind CSS"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/TruEstate",
            live: "https://truestate-frontend-five.vercel.app",
            color: "from-teal-500 to-emerald-600",
        },
        {
            id: 4,
            title: "Horizon Dashboard",
            category: "Fintech",
    description: "Banking dashboard integrating Plaid API with 67% performance increase.",
    longDescription: [
                "Built a banking dashboard integrating Plaid API for secure financial data access.",
                "Achieved 67% increase in speed compared to other sample banking solutions through optimization.",
                "Implemented real-time transaction tracking with live updates.",
                "Developed secure financial data management with proper authentication and authorization."
            ],
            tech: ["React", "Node.js", "Firebase", "Plaid"],
            year: "2023",
            github: "https://github.com/HarshNagrani9/Devopia",
    live: "https://www.youtube.com/watch?v=ATHQPB16e_4",
    color: "from-yellow-500 to-orange-600",
        },
        {
            id: 5,
            title: "ChatSync",
            category: "Real-time App",
    description: "Real-time chat application with secure authentication and user profiles.",
    longDescription: [
                "Built a real-time chat application with robust user profiles and secure authentication using JWT tokens.",
                "Implemented WebSocket connections for instant messaging and real-time updates.",
                "Developed online status tracking to show user availability.",
                "Created group chat capabilities with multiple participants."
            ],
            tech: ["React", "Node.js", "MongoDB", "WebSockets"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/MERN-ChatSync",
    live: "https://github.com/HarshNagrani9/MERN-ChatSync",
    color: "from-blue-500 to-indigo-600",
        },
        {
            id: 6,
            title: "Apple UI Clone",
            category: "UI/UX",
    description: "Stunning Apple UI clone with 3D model interactions and smooth animations.",
    longDescription: [
                "Created a stunning Apple UI clone with pixel-perfect design replication.",
                "Implemented 3D model interactions using Three.js for immersive product showcases.",
                "Developed smooth animations and fluid transitions using GSAP.",
                "Built interactive product displays with responsive design principles."
            ],
            tech: ["React", "Three.js", "GSAP"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/apple",
    live: "https://apple-eta-liart.vercel.app/",
    color: "from-purple-500 to-pink-600",
        },
        {
            id: 7,
            title: "Movie Recommendation System",
            category: "Machine Learning",
    description: "Content-based filtering system for movie recommendations using ML techniques.",
    longDescription: [
                "Built a web-based content-based filtering system for movie recommendations.",
                "Implemented ML algorithms to recommend movies based on genre similarity.",
                "Developed intelligent recommendation algorithms using scikit-learn.",
                "Created user preference learning system to improve recommendations over time."
            ],
            tech: ["Python", "Flask", "scikit-learn", "Pandas"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/Movie-Recomendation-System",
    live: "https://github.com/HarshNagrani9/Movie-Recomendation-System",
    color: "from-cyan-500 to-blue-700",
        },
        {
            id: 8,
            title: "DSA Tracker",
            category: "Developer Tool",
            description: "Comprehensive dashboard for tracking DSA progress with analytics, streaks, and contest monitoring.",
            longDescription: [
                "Built a comprehensive dashboard to help developers track their Data Structures and Algorithms (DSA) progress.",
                "Implemented analytics dashboard with interactive charts breaking down progress by difficulty, platform, and topic.",
                "Developed daily streak monitor to track activity and help build coding habits.",
                "Created automatic contest tracking system with history of attempted contests.",
                "Built detailed searchable question bank for easy review of solved problems.",
                "Designed mobile-first interface ensuring progress is accessible anywhere.",
                "Integrated Google's Genkit and Gemini 2.0 Flash, setting the foundation for future AI-powered insights."
            ],
            tech: ["Next.js 15", "TypeScript", "Firebase", "Tailwind CSS", "Genkit"],
            year: "2024",
            github: "https://github.com/HarshNagrani9/dsa-tracker",
            live: "https://dsa-tracker-delta.vercel.app/",
            color: "from-rose-500 to-pink-600",
        },
];

/* -------------------------------------------------------------------------------------------------
 * UTILS & HOOKS
 * -----------------------------------------------------------------------------------------------*/

/**
 * useScrambleHover
 * Manages the transition between Encrypted and Decrypted text based on hover state.
 */
const useScrambleHover = (targetText: string) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  // Initialize with a fully scrambled string
  const [displayText, setDisplayText] = useState(() => 
    targetText.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  const [isHovered, setIsHovered] = useState(false);
  const revealIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const current = revealIndexRef.current;
      let next = current;

      // Determine direction based on hover
      if (isHovered) {
        if (current < targetText.length) next++;
      } else {
        if (current > 0) next--;
      }

      // If state didn't change and we are at boundaries, stop updating to freeze the state
      if (next === current) {
         if (intervalRef.current) clearInterval(intervalRef.current);
         return;
      }

      revealIndexRef.current = next;

      // Build the string: 
      // 0 to next = Clear Text
      // next to end = Random Chars
      const clearPart = targetText.slice(0, next);
      const scrambledPart = targetText
        .slice(next)
        .split('')
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');

      setDisplayText(clearPart + scrambledPart);
    }, 30); // Speed of the effect (lower is faster)

        return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, targetText]);

  return { displayText, isHovered, setIsHovered };
};

/* -------------------------------------------------------------------------------------------------
 * COMPONENTS
 * -----------------------------------------------------------------------------------------------*/

/**
 * CipherRow
 * The "Coming Soon" row that decrypts on hover.
 */
const CipherRow = () => {
    const text = "TOP SECRET // INCOMING";
    const { displayText, setIsHovered } = useScrambleHover(text);

    return (
        <div 
          className="group relative border-b border-blue-900/20 py-8 px-6 md:px-12 lg:px-20 bg-blue-900/5 hover:bg-blue-900/10 select-none overflow-hidden cursor-help transition-colors duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
             {/* Background Scanline Animation */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

             <div className="relative z-10 flex flex-col md:flex-row items-baseline md:items-center gap-6 md:gap-8">
                 {/* Icon */}
                 <div className="hidden md:flex items-center justify-center w-8 text-blue-500/50">
                     <Lock size={16} className="group-hover:text-blue-400 group-hover:animate-pulse transition-colors" />
                                </div>

                 {/* Glitching Text */}
                 <h3 className="text-2xl md:text-3xl font-bold tracking-tight font-mono text-blue-400/60 group-hover:text-blue-300 transition-colors">
                     {displayText}
                 </h3>

                 {/* Status Badge */}
                 <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-mono text-blue-300 uppercase tracking-widest">Development</span>
                 </div>
             </div>
        </div>
    );
};

const ProjectModal = ({ project, onClose }: { project: typeof allProjects[0] | null; onClose: () => void }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
    }, []);

  const handleClose = () => {
    setActive(false);
    setTimeout(onClose, 400);
  };

  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${active ? 'bg-slate-950/90 backdrop-blur-md' : 'bg-transparent pointer-events-none'}`}>
      <div className="absolute inset-0" onClick={handleClose} />
      
      <div className={`
        relative w-full max-w-4xl h-[85vh] bg-[#020410] border border-blue-500/20 overflow-hidden flex flex-col shadow-2xl rounded-sm
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
      `}>
        {/* Modal Header */}
        <div className={`h-40 md:h-64 bg-gradient-to-r ${project.color} relative overflow-hidden flex items-end p-8`}>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
           <button onClick={handleClose} className="absolute top-6 right-6 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-black transition-all">
             <X size={20} />
           </button>
           <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter relative z-10">{project.title}</h2>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
           <div className="flex flex-col md:flex-row gap-8 justify-between border-b border-blue-900/30 pb-8">
              <div className="space-y-2">
                 <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest">Description</h3>
                 {Array.isArray(project.longDescription) ? (
                   <ul className="text-slate-300 max-w-xl leading-relaxed space-y-2 list-none">
                     {project.longDescription.map((point, index) => (
                       <li key={index} className="flex items-start gap-3">
                         <span className="text-blue-400 mt-1.5 flex-shrink-0">•</span>
                         <span>{point}</span>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <p className="text-slate-300 max-w-xl leading-relaxed">{project.longDescription}</p>
                 )}
              </div>
              <div className="space-y-2 min-w-[200px]">
                 <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest">Stack</h3>
                 <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-blue-900/20 border border-blue-500/20 text-xs text-blue-200 font-mono">{t}</span>
                    ))}
                 </div>
              </div>
                                </div>

                                <div className="flex gap-4">
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-blue-200 transition-colors uppercase tracking-wider text-sm">
                <ExternalLink size={16} /> Live Demo
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors uppercase tracking-wider text-sm">
                <Github size={16} /> Code
              </a>
           </div>
        </div>
      </div>
                                </div>
  );
};

const ProjectRow = ({ 
  project, 
  index, 
  onHover, 
  onClick, 
  isHovered 
}: { 
  project: typeof allProjects[0]; 
  index: number; 
  onHover: (project: typeof allProjects[0]) => void; 
  onClick: (project: typeof allProjects[0]) => void; 
  isHovered: boolean;
}) => {
  return (
    <div 
      className="group relative border-b border-blue-900/20 last:border-0"
      onMouseEnter={() => onHover(project)}
      onClick={() => onClick(project)}
    >
      <div className={`
        relative z-10 flex flex-col md:flex-row items-baseline md:items-center py-8 px-6 md:px-12 lg:px-20 cursor-pointer transition-all duration-500 ease-out
        ${isHovered 
            ? 'bg-gradient-to-r from-blue-900/20 via-blue-900/5 to-transparent border-l-4 border-l-blue-400 pl-9 md:pl-16' 
            : 'border-l-4 border-l-transparent hover:bg-white/[0.02]'}
      `}>
        
        {/* Index Number */}
        <span className={`
          font-mono text-sm mr-8 transition-colors duration-300 hidden md:block
          ${isHovered ? 'text-blue-400 font-bold' : 'text-slate-600'}
        `}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <h3 className={`
          text-3xl md:text-5xl font-bold tracking-tighter transition-all duration-300
          ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 translate-x-2' : 'text-slate-400 group-hover:text-slate-200'}
        `}>
          {project.title}
        </h3>

        {/* Category (Desktop Center) */}
        <span className={`
            hidden md:block ml-auto mr-12 text-xs font-mono uppercase tracking-widest transition-colors duration-300
            ${isHovered ? 'text-blue-400' : 'text-slate-600'}
        `}>
          {project.category}
        </span>

        {/* Arrow Icon */}
        <ArrowRight 
          className={`
            hidden md:block transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100 translate-x-0 text-blue-400' : 'opacity-0 -translate-x-4'}
          `} 
        />
        
        {/* Mobile Subtitle */}
        <div className="md:hidden mt-2 text-sm text-slate-500 font-mono">
           {project.category}
                                    </div>
                                </div>
                            </div>
  );
};

const ProjectsSection = () => {
  const INITIAL_COUNT = 6;
  const [hoveredProject, setHoveredProject] = useState(allProjects[0]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);
  
  // Logic to determine if expanded
  const isExpanded = visibleCount > INITIAL_COUNT;

  const toggleArchive = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount(allProjects.length);
    }
  };

  return (
    <div id="projects" className="min-h-screen bg-[#020410] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      <div className="flex flex-col min-h-screen">
        
        {/* Header */}
        <div className="w-full flex flex-col px-6 md:px-12 lg:px-20 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12 relative z-10">
          <div className="mb-12 md:mb-16 relative">
             {/* Decorative dash */}
             <div className="absolute -left-20 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden xl:block" />

             <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                    <Hash size={16} className="text-blue-400" />
                </div>
                <span className="text-blue-400/80 font-mono text-xs uppercase tracking-[0.3em] font-semibold">Project Index</span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 via-blue-500/10 to-transparent ml-4"></div>
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 md:mb-10 tracking-tighter leading-[0.9]">
               <span className="block">Selected</span>
               <span className="block mt-2 md:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 relative inline-block">
                 Works.
                 <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-cyan-500/50 blur-sm"></span>
               </span>
             </h1>
             
             <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
               <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed font-light border-l-4 border-blue-500/30 pl-6 md:pl-8 py-2">
                 An archive of digital experiments, products, and engineering challenges crafted with precision.
               </p>
               <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 font-mono">
                 <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                   {allProjects.length} Projects
                 </span>
                 <span className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full">
                   {new Date().getFullYear()}
                 </span>
                                </div>
                            </div>
                        </div>
                    </div>

          {/* List - Full Width */}
          <div className="w-full flex-1 space-y-1">
            {allProjects.slice(0, visibleCount).map((project, index) => (
              <ProjectRow 
                key={project.id}
                index={index}
                project={project}
                isHovered={hoveredProject?.id === project.id}
                onHover={setHoveredProject}
                onClick={setSelectedProject}
              />
            ))}
            
            {/* THE NEW "COMING SOON" ROW (CIPHER ROW) - Always visible */}
            <CipherRow />
          </div>

          {/* Toggle Button Area */}
          <div className="w-full px-6 md:px-12 lg:px-20 mt-12 flex justify-center">
              <button 
                onClick={toggleArchive}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#020410] overflow-hidden rounded-full transition-all duration-300"
              >
                {/* Button Glow Border */}
                <div className="absolute inset-0 rounded-full border border-blue-500/30 group-hover:border-blue-400/60 transition-colors" />
                
                {/* Button Inner Glow */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-blue-500 blur-md transition-opacity" />

                <span className="relative z-10 font-mono text-sm text-blue-400 uppercase tracking-widest group-hover:text-blue-300 transition-colors">
                  {isExpanded ? "Collapse Archive" : "Expand Archive"}
                </span>
                
                {isExpanded ? (
                   <ChevronUp size={16} className="relative z-10 text-blue-400 group-hover:-translate-y-1 transition-transform" />
                ) : (
                   <ChevronDown size={16} className="relative z-10 text-blue-400 group-hover:translate-y-1 transition-transform" />
                )}
              </button>
            </div>

          {/* Mobile Only Hint */}
          <div className="w-full px-6 md:px-12 lg:px-20 lg:hidden mt-8 text-center text-xs text-slate-600 font-mono">
             Tap project for details
          </div>

      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Subtle Background Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[50]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

        </div>
    );
};

export default ProjectsSection;