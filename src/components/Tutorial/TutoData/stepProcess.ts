import type { CSSPropertiesWithVars } from "../../../types/CSSPropertiesWithVars";
import type { Disabling, Nodes } from "./nodesToHighLight";
import type { ChangeButton, ChangeTutoData, TutoData } from "../../../types/TutoTypes";

export const resetClass = (resetTutoData: () => void, changeButton: ChangeButton) => {
  resetTutoData();
  changeButton = {
    isNextDisabled: false,
    nextButton: true,
    prevButton: true,
    quitButton: false,
    changeNextToQuit: false
  };
};

export  const stepStyling = (
  styling: CSSPropertiesWithVars, 
  changeTutoData: ChangeTutoData,
  nodes: Nodes,
  highlights: keyof TutoData | undefined,
  nodesToDisable: Disabling | undefined,
  above: boolean | undefined,
  ): CSSPropertiesWithVars => {

  if (!highlights && nodesToDisable) {
    for (let node of nodesToDisable) {
      const value = {isTuto: false, disabled: true};
        changeTutoData(node, value);
    };
  };
  
  if (highlights) { // highlights and/or disable node
    if (nodesToDisable) {
      for (let node of nodesToDisable) {
        const value = {isTuto: node === highlights ? true : false, disabled: true};
        changeTutoData(node, value);
      };
      if (nodesToDisable.indexOf(highlights) < 0) changeTutoData(highlights, {isTuto: true, disabled: false});
    } else changeTutoData(highlights, {isTuto: true, disabled: false});
    let styleAdded = {};
    if (highlights !== "bothOctavesNote") {    // place tuto Modal close to Node
      const offset = nodes[highlights].rect;
      if (window.scrollY > 0) window.scrollY = 0;
      if (above) { 
        styleAdded = {
          right: offset.left,
          top: (offset.top < 0 ? 140 : offset.top) - 240
        };
      } else {
        styleAdded = {
          right: offset.left,
          top: (offset.bottom < 0 ? 200 : offset.bottom) + 15  
        };
      };
    };
    return { ...styling, ...styleAdded}; // styling = Object.assign({}, stylingData, styleAdded);
  } else return styling;
};