import { useCallback, useEffect, useRef, useState } from 'react';

type Timed = { hold: number };
type Stepped<F extends Timed> = { frames: F[] };

/**
 * Plays a list of steps, each a list of timed frames, on a loop.
 * Playback only runs while the returned ref is on screen, and never
 * auto-advances under prefers-reduced-motion (each step shows its final frame).
 */
export function useStepPlayer<F extends Timed, S extends Stepped<F>>(steps: S[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  /** Bumped on every (re)start of a step so progress bars restart their animation. */
  const [run, setRun] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const playing = inView && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (frame + 1 < steps[step].frames.length) {
        setFrame(frame + 1);
      } else {
        setStep((step + 1) % steps.length);
        setFrame(0);
        setRun((r) => r + 1);
      }
    }, steps[step].frames[frame].hold);
    return () => window.clearTimeout(timer);
  }, [playing, step, frame, steps]);

  const goTo = useCallback(
    (i: number) => {
      setStep(i);
      setFrame(reduced ? steps[i].frames.length - 1 : 0);
      setRun((r) => r + 1);
    },
    [reduced, steps],
  );

  const replay = useCallback(() => {
    setPaused(false);
    goTo(0);
  }, [goTo]);

  const current = steps[step];
  const shownFrame = reduced ? current.frames.length - 1 : frame;

  return {
    ref,
    step,
    frame: current.frames[shownFrame],
    /** Total time the current step takes, in ms. */
    stepDuration: current.frames.reduce((sum, f) => sum + f.hold, 0),
    playing,
    paused,
    reduced,
    run,
    goTo,
    replay,
    togglePause: () => setPaused((p) => !p),
  };
}
