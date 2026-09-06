import { useEffect, useRef, useCallback } from 'react';
import type { RefObject, MouseEvent as ReactMouseEvent } from 'react';

/**
 * Cursor spotlight — attaches a radial glow that follows the mouse
 * within a container element.
 */
export function useCursorSpotlight(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spot = document.createElement('div');
    spot.className =
      'pointer-events-none absolute z-0 h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-300';
    spot.style.top = '0';
    spot.style.left = '0';
    spot.style.background =
      'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)';
    spot.setAttribute('aria-hidden', 'true');
    container.style.position = 'relative';
    container.appendChild(spot);

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - 250;
      const y = e.clientY - rect.top - 250;
      spot.style.transform = `translate(${x}px, ${y}px)`;
      spot.style.opacity = '1';
    };

    const onLeave = () => {
      spot.style.opacity = '0';
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      spot.remove();
    };
  }, [containerRef]);
}

/**
 * Card tilt — returns onMouseMove / onMouseLeave handlers that apply
 * a subtle 3D perspective tilt to a card element.
 */
export function useCardTilt(maxDeg = 4) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const el = ref.current ?? (e.currentTarget as HTMLElement);
      ref.current = el;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = '';
    }
  }, []);

  return { onMouseMove, onMouseLeave };
}

/**
 * Card border glow — an emerald glow follows the cursor along the
 * card border. Attach the returned handlers to any card element.
 * The card needs `position: relative` and `overflow: hidden`.
 */
export function useCardBorderGlow() {
  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--glow-x', `${x}px`);
    el.style.setProperty('--glow-y', `${y}px`);
    el.style.setProperty('--glow-opacity', '1');
  }, []);

  const onMouseLeave = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--glow-opacity', '0');
  }, []);

  return { onMouseMove, onMouseLeave };
}
