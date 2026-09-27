/**
 * Clarity's real flow (see the Clarity README): hotkey capture → the Explainer writes the
 * explanation (it arrives first) → the Manim Generator retrieves examples, writes one continuous script,
 * renders it in a Docker sandbox and repairs failures → the video uploads and plays.
 */

export type Scene = 'capture' | 'ask' | 'explain' | 'generate' | 'watch';

/** Job statuses the desktop app polls for, in order. */
export const STATUSES = ['queued', 'transcribing', 'explaining', 'generating', 'rendering', 'uploading', 'done'] as const;

export type Frame = {
  scene: Scene;
  /** Sub-beat within the scene. */
  sub: number;
  /** Index into STATUSES, or -1 before the job exists. */
  status: number;
  hold: number;
};

export type Step = { title: string; body: string; frames: Frame[] };

const f = (scene: Scene, sub: number, status: number, hold: number): Frame => ({ scene, sub, status, hold });

export const STEPS: Step[] = [
  {
    title: 'Capture',
    body: '⌘⇧E dims the screen. Drag a box around the problem in any app, type what you want explained, and press Enter.',
    frames: [
      f('capture', 0, -1, 900),
      f('capture', 1, -1, 1300),
      f('capture', 2, -1, 900),
      f('ask', 0, -1, 2700),
      f('ask', 1, 0, 700),
    ],
  },
  {
    title: 'Explain',
    body: 'The Explainer agent drafts and critiques a step-by-step explanation. It lands in seconds, long before the video.',
    frames: [f('explain', 0, 2, 700), f('explain', 1, 2, 2600), f('explain', 2, 2, 1300)],
  },
  {
    title: 'Generate',
    body: 'Claude writes the Manim script from Gemini’s read of your problem plus Manim docs retrieved by vector search in MongoDB Atlas. A Docker sandbox renders it and repairs failures.',
    frames: [
      f('generate', 0, 3, 1500),
      f('generate', 1, 3, 2000),
      f('generate', 2, 3, 2400),
      f('generate', 3, 4, 1700),
      f('generate', 4, 5, 1600),
    ],
  },
  {
    title: 'Watch',
    body: 'The finished video plays in the same window, animating your exact problem. Identical problems never render twice.',
    frames: [
      f('watch', 0, 6, 1100),
      f('watch', 1, 6, 1200),
      f('watch', 2, 6, 1200),
      f('watch', 3, 6, 1200),
      f('watch', 4, 6, 2400),
    ],
  },
];
