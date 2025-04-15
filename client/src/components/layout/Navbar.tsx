import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style on scroll
      setIsScrolled(window.scrollY > 10);
      
      // Highlight active section
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      closeMobileMenu();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="custom-container flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-2xl font-bold font-poppins text-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          HN.
        </a>
        
        <div className="hidden md:flex space-x-8">
          {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              className={`nav-link hover:text-primary transition-colors ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 py-4 px-4 absolute w-full top-full left-0 shadow-lg`}>
        <div className="flex flex-col space-y-4">
          {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              className={`nav-link hover:text-primary transition-colors ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
