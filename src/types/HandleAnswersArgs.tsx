import type { MessageObj } from "./MessageObj";
import { type ClefSelected } from "./Clefs";

export type Args = [
  answers: string[],
  scaleA: Record<string, string>,
  handleMessage: (message: MessageObj) => void,
  isMobile: boolean,
  gameLength: number,
  displayScoreCircle: (score: number) => void,
  clefSelected: ClefSelected
];
