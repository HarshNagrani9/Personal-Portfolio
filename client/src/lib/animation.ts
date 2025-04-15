import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animate counter function
export const animateCounter = (
  element: HTMLElement, 
  target: number, 
  duration: number = 2, 
  delay: number = 0
) => {
  let start = 0;
  const increment = target / (duration * 60);
  
  const updateCounter = () => {
    start += increment;
    element.textContent = `${Math.floor(start)}+`;
    
    if (start < target) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `${target}+`;
    }
  };
  
  setTimeout(() => {
    updateCounter();
  }, delay * 1000);
};

// Animate elements on scroll
export const animateOnScroll = (
  selector: string, 
  animation: gsap.TweenVars = { y: 30, opacity: 0 }, 
  options: { start?: string; markers?: boolean; stagger?: number } = {}
) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      animation,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: options.stagger || 0.2,
        scrollTrigger: {
          trigger: element,
          start: options.start || "top 80%",
          markers: options.markers || false
        }
      }
    );
  });
};

// Animate skill bars
export const animateSkillBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach((bar) => {
    const width = bar.getAttribute('data-width');
    
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
      }
    });
  });
};

// Initialize all animations
export const initAnimations = () => {
  // Initialize ScrollTrigger
  ScrollTrigger.matchMedia({
    // Desktop animations
    "(min-width: 768px)": function() {
      // Add your desktop specific animations here
    },
    
    // Mobile animations - might be simplified versions
    "(max-width: 767px)": function() {
      // Add your mobile specific animations here
    },
    
    // All devices
    "all": function() {
      // Section animations
      animateOnScroll('.section', { opacity: 0, y: 50 });
      
      // Skill bars
      animateSkillBars();
    }
  });
};
