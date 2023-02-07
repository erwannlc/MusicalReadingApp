
import type { MessageObj } from "../types/MessageObj";
import { defaultMessage } from "../data/data";
import { hideNotes } from "./handleGame";

const restoreDefault = ( 
  handleMessage: (message: MessageObj) => void,
  clefSelected: string,
  outputNode: HTMLElement | null,
  gameLength: number,
  resetStavesData: () => void,
  displayScoreCircle: (scoreNumber: number) => void,
  isMobile: boolean
  ) => {
    console.log("restoringDefault");
    const staveType = clefSelected === "bothClefs" ? "both" : "simple";
    hideNotes(staveType, outputNode, gameLength, isMobile);
    resetStavesData();
    displayScoreCircle(-1);
    handleMessage(defaultMessage);
};

export default restoreDefault;