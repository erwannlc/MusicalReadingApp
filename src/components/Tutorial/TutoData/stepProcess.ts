import type { Steps } from "./steps";
import type { CSSPropertiesWithVars } from "../../../types/CSSPropertiesWithVars";
import type { Nodes } from "./nodesToHighLight";
import type { ChangeButton } from "../../../types/TutoTypes";

export const resetClass = (nodes: Nodes, changeButton: ChangeButton) => {
  const { playBtn, stopBtn, switchOptions, messageDiv, optionsIndicator, switchPiano, vexScore, padsDiv, clefs, note1, note2, padGNote} = nodes;
  playBtn.node.classList.remove("tuto");
  stopBtn.node.classList.remove("tuto-play");
  stopBtn.node.classList.remove("tuto");
  switchOptions.node.classList.remove("tuto");
  optionsIndicator.node.classList.remove("tuto");
  vexScore.node.classList.remove("tuto");
  padsDiv.node.classList.remove("tuto");
  messageDiv.node.classList.remove("tuto");
  switchPiano.node.classList.remove("tuto");
  switchOptions.node.classList.remove("disable");
  playBtn.node.classList.remove("disable");
  stopBtn.node.classList.remove("disable");
  optionsIndicator.node.classList.remove("disable");
  switchPiano.node.classList.remove("disable");
  clefs.node.classList.remove("tuto");
  note1?.node.classList.remove("tuto");
  note2?.node.classList.remove("tuto");
  padGNote.node.classList.remove("tuto"); 

  changeButton = {
    isNextDisabled: false,
    nextButton: true,
    prevButton: true,
    quitButton: false,
    changeNextToQuit: false
  };
};

export  const stepStyling = (
  steps: Steps, msgIndex: number, styling: CSSPropertiesWithVars, changeButton: ChangeButton, nodes: Nodes
  ): CSSPropertiesWithVars => {
  resetClass(nodes, changeButton);
  const step = steps[msgIndex];
  const nodeName = step.highlights;
  window.scrollTo(0, 0); // cancels previous unexpected scroll

  if (nodeName) {
    const node = nodes[nodeName].node;
      node.classList.add("tuto");
      const offset = nodes[nodeName].rect;
      let x: number | string = "";
      let y: number | string = "";
      let styleAdded = {};
      if (window.scrollY > 0) window.scrollY = 0;
      if (step.above) {
        x = offset.left;
        y = (offset.top < 0 ? 140 : offset.top) - 240;  
        styleAdded = {
          right: x,
          top: y
        };
      } else {
        x = offset.left; 
        y = (offset.bottom < 0 ? 200 : offset.bottom) + 15;  
        styleAdded = {
          right: x,
          top: y
        };
      };
      return { ...styling, ...styleAdded}; // styling = Object.assign({}, stylingData, styleAdded);s
  } else return styling;
};