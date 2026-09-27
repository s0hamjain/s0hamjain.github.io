import HeapStage from './HeapStage';
import { STEPS } from './script';
import type { Showcase } from '../types';

export const allocatorShowcase: Showcase = { steps: STEPS, Stage: HeapStage };
