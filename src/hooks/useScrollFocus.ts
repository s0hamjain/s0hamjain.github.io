import { useEffect, useRef } from 'react';

/**
 * Fades/scales an element based on how close it is to the viewport center,
 * so tall full-screen panels read as "one at a time" while scrolling.
 * Only active on large screens without reduced motion.
 */
export function useScrollFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!mq.matches) {
        el.style.opacity = '';
        el.style.transform = '';
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 … 1: how far the element's center is from the viewport center.
      const d = (rect.top + rect.height / 2 - vh / 2) / vh;
      const dist = Math.abs(d);
      const opacity = Math.min(1, Math.max(0.06, 1 - (dist - 0.12) * 2.4));
      const scale = 1 - Math.min(dist, 0.6) * 0.08;
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate3d(0, ${(d * 48).toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mq.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mq.removeEventListener('change', schedule);
    };
  }, []);

  return ref;
}
