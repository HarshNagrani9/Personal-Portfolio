import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type GSAPTarget = string | Element | Element[] | NodeList;

interface UseGSAPOptions {
  animation?: gsap.TweenVars;
  trigger?: GSAPTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  pin?: boolean;
  anticipatePin?: boolean;
  once?: boolean;
}

export function useGSAP(
  target: GSAPTarget,
  options: UseGSAPOptions = {},
) {
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // Create a new timeline
    timeline.current = gsap.timeline({
      scrollTrigger: options.trigger ? {
        trigger: options.trigger,
        start: options.start || 'top 80%',
        end: options.end,
        scrub: options.scrub || false,
        markers: options.markers || false,
        toggleActions: options.toggleActions || 'play none none none',
        pin: options.pin || false,
        anticipatePin: options.anticipatePin || false,
        once: options.once || false,
      } : undefined,
    });

    // Add the animation to the timeline
    if (target && options.animation) {
      timeline.current.to(target, options.animation);
    }

    // Clean up the animation when the component unmounts
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      
      // Explicitly kill any associated ScrollTriggers
      if (options.trigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === options.trigger) {
            trigger.kill();
          }
        });
      }
    };
  }, [target, options]);

  return timeline;
}

export function useGSAPFrom(
  target: GSAPTarget,
  fromVars: gsap.TweenVars,
  options: UseGSAPOptions = {},
) {
  const timeline = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // Create a new timeline
    timeline.current = gsap.timeline({
      scrollTrigger: options.trigger ? {
        trigger: options.trigger,
        start: options.start || 'top 80%',
        end: options.end,
        scrub: options.scrub || false,
        markers: options.markers || false,
        toggleActions: options.toggleActions || 'play none none none',
        pin: options.pin || false,
        anticipatePin: options.anticipatePin || false,
        once: options.once || false,
      } : undefined,
    });

    // Add the animation to the timeline
    if (target) {
      timeline.current.from(target, fromVars);
    }

    // Clean up the animation when the component unmounts
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      
      // Explicitly kill any associated ScrollTriggers
      if (options.trigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === options.trigger) {
            trigger.kill();
          }
        });
      }
    };
  }, [target, fromVars, options]);

  return timeline;
}
