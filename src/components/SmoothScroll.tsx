import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect the OS "Reduce motion" accessibility setting by skipping the
    // Lenis instance (and its animated easing) entirely — but the anchor
    // click handler below still has to run either way. Every nav link
    // (and section deep-link) always preventDefault()s expecting *someone*
    // to perform the scroll; without Lenis running, an instant native jump
    // takes over instead of just leaving the click dead.
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis: Lenis | null = null;
    let rafId: number | undefined;

    if (!reducedMotion) {
      lenis = new Lenis({
        lerp: 0.08, // lower = more gradual / more butter-smooth
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.8,
      });

      // Drive Lenis on every animation frame.
      const tick = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    // Handle section-anchor clicks (e.g. "#about") — animated via Lenis when
    // available, otherwise an instant jump (still respects reduced motion).
    // Skip wouter hash-routes (e.g. "#/blog") — those contain a "/" after "#".
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        "a[href^='#']"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.includes('/')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.6 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'auto' });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      lenis?.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
