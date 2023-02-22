import type { MessageObj } from "./MessageObj";
import { type ClefSelected } from "./Clefs";

export type Args = [
  answers: string[],
  scaleA: Record<string, string>,
  resetAnswer: () => void,
  handleMessage: (message: MessageObj) => void,
  isMobile: boolean,
  gameLength: number,
  displayScoreCircle: (score: number) => void,
  clefSelected: ClefSelected,
  activateCorrection: () => void
];
