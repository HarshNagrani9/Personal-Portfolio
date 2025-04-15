import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create GSAP cursor animation
    const onMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Handle hoverable elements
    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    // Hide cursor when leaving window
    const handleWindowLeave = () => setIsVisible(false);
    const handleWindowEnter = () => setIsVisible(true);

    // Add event listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", handleWindowLeave);
    window.addEventListener("mouseenter", handleWindowEnter);

    // Add hover effect for interactive elements
    const hoverableElements = document.querySelectorAll('a, button, .project-card');
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Check if we're on mobile
    const checkIsMobile = () => {
      if (window.innerWidth <= 768) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", handleWindowLeave);
      window.removeEventListener("mouseenter", handleWindowEnter);
      window.removeEventListener("resize", checkIsMobile);
      
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    gsap.to(".cursor", {
      x: cursorPosition.x,
      y: cursorPosition.y,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(".cursor-dot", {
      x: cursorPosition.x,
      y: cursorPosition.y,
      duration: 0.1,
      ease: "power2.out"
    });
  }, [cursorPosition]);

  if (!isVisible) return null;

  return (
    <>
      <div className={`cursor fixed left-0 top-0 w-8 h-8 rounded-full bg-primary/30 mix-blend-difference pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isExpanded ? 'w-12 h-12 rounded-full bg-accent/30' : ''}`} />
      <div className="cursor-dot fixed left-0 top-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

export default Cursor;
