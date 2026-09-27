import { useEffect } from 'react';
import { smoothScrollTo } from '@/lib/smoothScroll';

/** Scroll time between projects, and for the quick hop between the last project and the next section. */
const SNAP_S = 1.2;
const EXIT_S = 0.6;
/** Input is always held until the scroll has visually landed (the easing covers ~all the distance by 70%). */
const LAND_FRACTION = 0.7;
const MIN_LOCK_MS = 700;
/** A pause this long between wheel events means the previous gesture (and its inertia) is over. */
const QUIET_MS = 90;
/** Scrolling the other way is a new gesture; it takes over after this long. */
const REVERSE_MS = 250;
const KEYS_DOWN = ['ArrowDown', 'PageDown', ' '];
const KEYS_UP = ['ArrowUp', 'PageUp'];

/**
 * One wheel gesture (or arrow/page key) moves exactly one stop: the top of the page, each
 * `[data-snap]` panel centered on screen, then the top of the `[data-snap-end]` section.
 * Past that the page scrolls normally. Desktop only; touch and reduced motion keep native scrolling.
 */
export function useProjectSnap() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let lockedUntil = 0;
    let lockStart = 0;
    let lockDir: 1 | -1 = 1;
    /** True from a snap until the gesture that caused it (including trackpad inertia) is over. */
    let holding = false;
    let lastAbs = 0;
    let lastT = 0;

    const top = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

    const stops = () => {
      const vh = window.innerHeight;
      const panels = [...document.querySelectorAll<HTMLElement>('[data-snap]')].map((el) =>
        Math.round(top(el) + el.getBoundingClientRect().height / 2 - vh / 2),
      );
      const end = document.querySelector('[data-snap-end]');
      return { list: [0, ...panels, ...(end ? [Math.round(top(end))] : [])], hasEnd: !!end };
    };

    /** Returns true if the gesture was turned into a snap. */
    const snap = (dir: 1 | -1) => {
      const y = window.scrollY;
      const { list, hasEnd } = stops();
      const last = list[list.length - 1];
      const vh = window.innerHeight;
      let next: number | undefined;
      if (dir > 0) {
        if (y >= last - 2) return false; // past the last stop: scroll normally
        next = list.find((s) => s > y + 2);
      } else {
        if (y > last + vh * 0.5) return false; // well into the next section: scroll normally
        next = [...list].reverse().find((s) => s < y - 2);
      }
      if (next === undefined) return false;
      // The hop between the last project and the section after it is quick.
      const crossesEnd = hasEnd && (next === last || (dir < 0 && y >= last - 2));
      const duration = crossesEnd ? EXIT_S : SNAP_S;
      lockStart = performance.now();
      lockedUntil = lockStart + Math.max(duration * 1000 * LAND_FRACTION, MIN_LOCK_MS);
      lockDir = dir;
      holding = true;
      smoothScrollTo(next, duration);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!mq.matches || e.ctrlKey) return;
      const now = performance.now();
      const abs = Math.abs(e.deltaY);
      const dir = e.deltaY > 0 ? 1 : -1;
      const gap = now - lastT;
      // Inertia only ever decays; a jump in speed means the fingers pushed again.
      const pushed = abs > lastAbs * 1.2 + 3;
      lastAbs = abs;
      lastT = now;

      if (holding) {
        const landed = now >= lockedUntil;
        const reversed = dir !== lockDir && now - lockStart > REVERSE_MS;
        if (gap > QUIET_MS || reversed || (landed && pushed)) holding = false;
        else {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
      }

      if (abs < 4) return;
      if (snap(dir)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!mq.matches || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const dir =
        KEYS_DOWN.includes(e.key) && !e.shiftKey ? 1 : KEYS_UP.includes(e.key) || (e.key === ' ' && e.shiftKey) ? -1 : 0;
      if (!dir) return;
      if (performance.now() < lockedUntil || snap(dir)) e.preventDefault();
      holding = false;
    };

    // Capture on window runs before Lenis's own wheel listener, so a snap can swallow the event.
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('keydown', onKey);
    };
  }, []);
}
