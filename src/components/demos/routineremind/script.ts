/**
 * RoutineRemind's flow (see the RoutineRemind README): a parent builds a visual routine in the
 * Angular portal → the Spring Boot API on Cloud Run verifies and stores it in Firestore →
 * FCM pushes reminders to the child's Android app → the child taps Done → the two-layer chatbot
 * answers structural questions with rules and everything else with Vertex AI Gemini, grounded in
 * the routine → voice questions go through the C++ audio module and Speech-to-Text → parents
 * review the chat history.
 */

export type Scene = 'build' | 'remind' | 'complete' | 'ask' | 'voice';

export const TASKS: { time: string; title: string; hint: string; icon: 'sun' | 'drop' | 'food' | 'shoe' | 'lunch' }[] = [
  { time: '7:30', title: 'Wake up', hint: 'Then brush your teeth', icon: 'sun' },
  { time: '7:45', title: 'Brush teeth', hint: 'Then eat breakfast', icon: 'drop' },
  { time: '8:00', title: 'Eat breakfast', hint: 'Then put on your shoes', icon: 'food' },
  { time: '8:30', title: 'Put on shoes', hint: 'Then go to the bus', icon: 'shoe' },
  { time: '12:00', title: 'Eat lunch', hint: 'Then quiet time', icon: 'lunch' },
];

export type Frame = {
  scene: Scene;
  sub: number;
  /** Tasks marked done. */
  done: number;
  hold: number;
};

export type Step = { title: string; body: string; frames: Frame[] };

const f = (scene: Scene, sub: number, done: number, hold: number): Frame => ({ scene, sub, done, hold });

export const STEPS: Step[] = [
  {
    title: 'Build a routine',
    body: 'A parent builds the day in the web portal: a time, icon and transition hint for each task. The Spring Boot API verifies the request and saves it to Firestore.',
    frames: [f('build', 0, 0, 1100), f('build', 1, 0, 1100), f('build', 2, 0, 1300), f('build', 3, 0, 1400)],
  },
  {
    title: 'Remind',
    body: 'Cloud Scheduler triggers a Firebase Cloud Messaging push, and the child’s phone shows what is happening now as one large, calm card.',
    frames: [f('remind', 0, 0, 1000), f('remind', 1, 0, 1500), f('remind', 2, 0, 1300)],
  },
  {
    title: 'Complete tasks',
    body: 'The child taps Done. The schedule updates in real time for the parent, and the next card shows its transition hint.',
    frames: [f('complete', 0, 0, 900), f('complete', 1, 1, 1500), f('complete', 2, 2, 1500)],
  },
  {
    title: 'Ask the chatbot',
    body: '“What next?” is answered instantly by rules that read the schedule. Other questions go to Vertex AI Gemini, grounded only in today’s routine and the parent’s notes.',
    frames: [
      f('ask', 0, 2, 900),
      f('ask', 1, 2, 1400),
      f('ask', 2, 2, 1300),
      f('ask', 3, 2, 1700),
    ],
  },
  {
    title: 'Voice & review',
    body: 'Spoken questions are cleaned up by a C++ audio module and transcribed with Speech-to-Text. Every answer is saved so parents can review the chat.',
    frames: [
      f('voice', 0, 2, 1100),
      f('voice', 1, 2, 1300),
      f('voice', 2, 2, 1400),
      f('voice', 3, 2, 2200),
    ],
  },
];
