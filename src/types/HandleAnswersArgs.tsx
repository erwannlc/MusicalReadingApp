import type { MessageObj } from "./MessageObj";
import { ClefSelected } from "./Clefs";

export type Args = [
  answers: string[], 
  scaleA: {[key: string]: string}, 
  resetAnswer: () => void,
  handleMessage: (message: MessageObj) => void,
  isMobile: boolean,
  gameLength: number,
  displayScoreCircle: (score: number) => void,
  vexScoreNode: HTMLElement,
  appNode: HTMLElement | null,
  outputNode: HTMLElement,
  clefSelected: ClefSelected,
  activateCorrection: () => void
];