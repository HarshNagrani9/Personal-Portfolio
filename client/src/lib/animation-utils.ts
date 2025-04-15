import { gsap } from 'gsap';

// Function to animate progress bars
export const animateProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (width) {
      gsap.to(bar, {
        width: `${width}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 80%',
          once: true
        }
      });
    }
  });
};

// Staggered animation for multiple elements
export const staggerElements = (
  elements: string,
  staggerTime: number = 0.1,
  fromVars: gsap.TweenVars = { y: 20, opacity: 0 },
  toVars: gsap.TweenVars = { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
) => {
  const items = document.querySelectorAll(elements);
  gsap.from(items, {
    ...fromVars,
    stagger: staggerTime,
    ...toVars,
  });
};

// Section title animation
export const animateSectionTitle = (sectionSelector: string) => {
  gsap.from(`${sectionSelector} .section-title, ${sectionSelector} .section-divider`, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionSelector,
      start: 'top 80%',
      once: true
    }
  });
};

// Text split and animate
export const splitTextAnimate = (selector: string, staggerTime: number = 0.05) => {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const text = element.textContent || '';
  element.textContent = '';
  
  const spans = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
    return span;
  });
  
  gsap.to(spans, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: staggerTime,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 90%',
      once: true
    }
  });
};

// Timeline animation
export const animateTimeline = (containerSelector: string) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const dots = container.querySelectorAll('.timeline-dot');
  const items = container.querySelectorAll('.timeline-item > div');
  
  gsap.from(dots, {
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true
    }
  });
  
  gsap.from(items, {
    x: -50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true
    }
  });
};
