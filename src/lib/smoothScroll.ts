import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Start Lenis smooth scrolling (skipped for reduced-motion users). Returns a cleanup fn. */
export const startSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  let frame = requestAnimationFrame(function raf(time) {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
};

export const smoothScrollTo = (target: HTMLElement | number) => {
  if (lenis) {
    // Resolve elements against the real scroll position; Lenis's internal one can lag behind
    // scrolls it didn't drive (keyboard, scrollbar drag, programmatic jumps).
    const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
    lenis.scrollTo(top, { duration: 1.2 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target });
  } else {
    target.scrollIntoView();
  }
};
