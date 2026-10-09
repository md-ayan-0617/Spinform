import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll() {
  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Reveal headers and sections on scroll
      const reveals = document.querySelectorAll('.corner-tick');
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.85, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 2. Parallax watermark typography
      const watermarks = document.querySelectorAll('.impact-word');
      watermarks.forEach((wm) => {
        gsap.to(wm, {
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: wm,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
