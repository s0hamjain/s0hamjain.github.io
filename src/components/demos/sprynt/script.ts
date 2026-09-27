/**
 * Sprynt's product flow (see the Sprynt README): the bot sits in the call and streams the transcript over WebSocket → action items are extracted,
 * stabilized and synced to Jira → a deep dive ranks suspect files in the GitHub repo →
 * fixes are reviewed as side-by-side diffs.
 */

export type Scene = 'join' | 'extract' | 'deepdive' | 'fix';

/** What's said on the call, in order. */
export const TRANSCRIPT: [speaker: string, text: string][] = [
  ['Maya', 'checkout p99 jumped to 8s after the 2:10 deploy'],
  ['Leo', 'errors are all coming from payments-api'],
  ['Maya', 'Leo, can you roll back payments-api?'],
  ['Priya', "I'll check the DB connection pool"],
  ['Leo', 'rollback is going out now'],
  ['Maya', 'did the retry logic change in that deploy?'],
  ['Priya', 'pool looks healthy again'],
];

export type Frame = {
  scene: Scene;
  sub: number;
  /** Transcript lines heard so far. */
  lines: number;
  hold: number;
};

export type Step = { title: string; body: string; frames: Frame[] };

const f = (scene: Scene, sub: number, lines: number, hold: number): Frame => ({ scene, sub, lines, hold });

export const STEPS: Step[] = [
  {
    title: 'Listen in',
    body: 'Sprynt sits in the outage call as an AI participant and streams the live transcript into the incident room over WebSocket.',
    frames: [f('join', 1, 1, 1400), f('join', 2, 2, 1400)],
  },
  {
    title: 'Extract actions',
    body: 'Action items are pulled from the conversation, stabilized before they are promoted, then synced to Jira with owners.',
    frames: [
      f('extract', 0, 3, 1200),
      f('extract', 1, 4, 1200),
      f('extract', 2, 5, 1200),
      f('extract', 3, 5, 1400),
    ],
  },
  {
    title: 'Deep dive',
    body: 'Recent commits in the connected GitHub repo and what is said on the call rank the suspect files, down to the likely lines.',
    frames: [
      f('deepdive', 0, 6, 1100),
      f('deepdive', 1, 6, 1100),
      f('deepdive', 2, 6, 1300),
      f('deepdive', 3, 6, 1600),
    ],
  },
  {
    title: 'Review the fix',
    body: 'A proposed fix opens as a side-by-side diff for the team to review, ready to become a pull request.',
    frames: [f('fix', 0, 6, 1100), f('fix', 1, 7, 1700), f('fix', 2, 7, 1600)],
  },
];
