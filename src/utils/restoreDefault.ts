import type { MessageObj } from "../types/MessageObj";
import { defaultMessage } from "../data/data";
import { hideNotes } from "./handleGame";

const restoreDefault = (
  handleMessage: (message: MessageObj) => void,
  clefSelected: string,
  outputNode: HTMLElement | undefined,
  gameLength: number,
  resetStavesData: () => void,
  displayScoreCircle: (scoreNumber: number) => void,
  isMobile: boolean,
  deactivateCorrection: () => void
) => {
  console.log("restoringDefault");
  const staveType = clefSelected === "bothClefs" ? "bothClefsData" : "simple";
  deactivateCorrection();
  hideNotes(staveType, outputNode, gameLength, isMobile);
  resetStavesData();
  displayScoreCircle(-1);
  handleMessage(defaultMessage);
};

export default restoreDefault;
