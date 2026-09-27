import { useEffect } from 'react';
import { smoothScrollTo } from '@/lib/smoothScroll';

/**
 * After a snap, the wheel is locked only briefly, until the gesture (including trackpad
 * inertia) goes quiet, so one swipe can't skip a project but the next swipe responds at once.
 */
const SNAP_S = 1.2;
const LOCK_MS = 250;
const QUIET_MS = 90;
const MAX_LOCK_MS = 700;
const KEYS_DOWN = ['ArrowDown', 'PageDown', ' '];
const KEYS_UP = ['ArrowUp', 'PageUp'];

/**
 * One wheel gesture (or arrow/page key) moves exactly one stop: the top of the page,
 * then each `[data-snap]` panel centered on screen (the first one with its section heading in view). Past the last panel the page
 * scrolls normally. Desktop only; touch and reduced motion keep native scrolling.
 */
export function useProjectSnap() {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let lockedUntil = 0;
    let lockStart = 0;
    /** Where the current snap is headed, and when it lands. */
    let target = 0;
    let landsAt = 0;

    const stops = () => {
      const vh = window.innerHeight;
      const panels = [...document.querySelectorAll<HTMLElement>('[data-snap]')].map((el, i) => {
        const r = el.getBoundingClientRect();
        const centered = r.top + window.scrollY + r.height / 2 - vh / 2;
        // Keep the section heading in view above the first panel.
        const heading = i === 0 ? el.parentElement?.querySelector('h2') : null;
        const headingTop = heading ? heading.getBoundingClientRect().top + window.scrollY - 40 : Infinity;
        return Math.round(Math.min(centered, headingTop));
      });
      return [0, ...panels];
    };

    /** Returns true if the gesture was turned into a snap. */
    const snap = (dir: 1 | -1) => {
      // Mid-animation, step from where we're headed rather than where we happen to be.
      const y = performance.now() < landsAt ? target : window.scrollY;
      const list = stops();
      const last = list[list.length - 1];
      const vh = window.innerHeight;
      let next: number | undefined;
      if (dir > 0) {
        if (y >= last - 2) return false; // past the projects: scroll normally
        next = list.find((s) => s > y + 2);
      } else {
        if (y > last + vh * 1.5) return false; // well below the projects: scroll normally
        next = [...list].reverse().find((s) => s < y - 2);
      }
      if (next === undefined) return false;
      lockStart = performance.now();
      lockedUntil = lockStart + LOCK_MS;
      target = next;
      landsAt = lockStart + SNAP_S * 1000;
      smoothScrollTo(next, SNAP_S);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!mq.matches || e.ctrlKey) return;
      const now = performance.now();
      if (now < lockedUntil) {
        // Still the same gesture: keep the lock until it has gone quiet.
        lockedUntil = Math.min(Math.max(lockedUntil, now + QUIET_MS), lockStart + MAX_LOCK_MS);
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;
      if (snap(e.deltaY > 0 ? 1 : -1)) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (!mq.matches || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const dir =
        KEYS_DOWN.includes(e.key) && !e.shiftKey
          ? 1
          : KEYS_UP.includes(e.key) || (e.key === ' ' && e.shiftKey)
            ? -1
            : 0;
      if (!dir) return;
      if (performance.now() < lockedUntil || snap(dir)) e.preventDefault();
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
