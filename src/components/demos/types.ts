import type { ComponentType } from 'react';

export type ShowcaseFrame = { hold: number };
export type ShowcaseStep<F extends ShowcaseFrame = ShowcaseFrame> = { title: string; body: string; frames: F[] };

/** A step-by-step animated walkthrough of a project: scripted frames plus a stage that draws one. */
export type Showcase = {
  steps: ShowcaseStep[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each stage knows its own frame shape
  Stage: ComponentType<{ frame: any }>;
};
