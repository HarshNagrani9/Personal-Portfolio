import { ChevronDown, Download, ArrowRight, Github, Linkedin, Mail, Code } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroSection = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Profile image float animation
    gsap.to(profileRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="custom-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-4">
              <span className="text-primary">Harsh</span> <span className="text-accent">Nagrani</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6 opacity-80">Frontend React Developer & Computer Engineering Student</h2>
            <p className="text-lg mb-8 max-w-lg opacity-80">
              Building beautiful and interactive web experiences with React, Three.js, and GSAP
            </p>
            
            <div className="flex space-x-6 mb-8">
              <a href="https://github.com/harshnagrani0910" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl transition-all duration-300">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/harsh-nagrani" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl transition-all duration-300">
                <Linkedin size={24} />
              </a>
              <a href="https://leetcode.com/harshnagrani" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl transition-all duration-300">
                <Code size={24} />
              </a>
              <a href="mailto:harshnagrani0910@gmail.com" className="social-icon text-2xl transition-all duration-300">
                <Mail size={24} />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Contact Me <ArrowRight className="ml-2" size={18} />
              </a>
              <a 
                href="/Harsh_Nagrani_Resume.pdf" 
                className="border border-gray-400 dark:border-gray-600 hover:border-primary dark:hover:border-primary px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center"
                download
              >
                Resume <Download className="ml-2" size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div 
              ref={profileRef}
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary to-accent p-1"
            >
              <div className="absolute inset-1 rounded-full overflow-hidden bg-light dark:bg-dark flex items-center justify-center">
                <img 
                  src="https://avatars.githubusercontent.com/u/64567697?v=4" 
                  alt="Harsh Nagrani" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToNext}
            className="flex flex-col items-center"
            aria-label="Scroll down"
          >
            <span className="mb-2 text-sm opacity-70">Scroll Down</span>
            <ChevronDown className="text-primary" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
