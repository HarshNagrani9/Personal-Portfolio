import { motion } from "framer-motion";
import { useEffect, Suspense } from "react";
import { useGSAPFrom } from "@/hooks/use-gsap";
import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  const socialLinks = [
    { href: "https://github.com/HarshNagrani9", icon: "fab fa-github", label: "GitHub" },
    { href: "https://www.linkedin.com/in/harsh-nagrani-1ab98623a/", icon: "fab fa-linkedin", label: "LinkedIn" },
    { href: "https://leetcode.com/u/harshnagrani009/", icon: "fas fa-code", label: "LeetCode" },
    { href: "mailto:harshnagrani0910@gmail.com", icon: "fas fa-envelope", label: "Email" },
  ];

  // GSAP animations
  useGSAPFrom(".hero-title", { 
    y: 50, 
    opacity: 0, 
    duration: 1, 
    ease: "power3.out", 
    delay: 0.2 
  });

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h2 
                className="text-xl md:text-2xl font-medium text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hello, I'm
              </motion.h2>
              
              <h1 className="hero-title text-4xl md:text-6xl font-bold font-poppins leading-tight">
                Harsh <span className="text-primary">Nagrani</span>
              </h1>
              
              <motion.h3 
                className="text-xl md:text-2xl font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Software Developer
              </motion.h3>
              
              <motion.p 
                className="max-w-md text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Building interactive web experiences with modern technologies and a passion for clean code.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a 
                  href="#projects" 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full transition-all flex items-center"
                >
                  View Projects <i className="fas fa-arrow-right ml-2"></i>
                </a>
                <a 
                  href="#contact" 
                  className="border-2 border-primary/50 hover:border-primary text-primary font-medium px-6 py-3 rounded-full transition-all flex items-center"
                >
                  Contact Me <i className="fas fa-envelope ml-2"></i>
                </a>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon text-foreground hover:text-primary text-xl" 
                    aria-label={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
           <div className="relative w-full max-w-[360px] md:max-w-[480px] lg:max-w-[600px] xl:max-w-[700px] aspect-square">
  <div className="w-full h-full">
    <Suspense fallback={<SplineLoadingFallback />}>
      <Spline 
        //scene="https://prod.spline.design/FD8OYszwtIHy-yIj/scene.splinecode"
        scene="https://prod.spline.design/PAx14ihBw7DhrPUI/scene.splinecode"
        className="w-full h-full scale-110 md:scale-125"
      />
    </Suspense>
  </div>
</div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-5 md:bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-muted-foreground text-sm mb-3">Scroll Down</span>
          <motion.i 
            className="fas fa-chevron-down text-primary mt-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          ></motion.i>
        </motion.div>
      </div>
    </section>
  );
}

// Loading fallback component to display while Spline is loading
function SplineLoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-card">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="text-primary text-lg"
      >
        <div className="relative w-24 h-24">
          <div className="absolute w-full h-full bg-primary/30 transform rotate-45 rounded-lg"></div>
          <div className="absolute w-full h-full bg-primary/50 transform rotate-12 rounded-lg"></div>
          <div className="absolute w-full h-full bg-primary/70 transform -rotate-12 rounded-lg"></div>
        </div>
      </motion.div>
    </div>
  );
}


//"https://prod.spline.design/jHQRgr2yJo9z85uv/scene.splinecode"