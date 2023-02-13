import type { CSSPropertiesWithVars } from "../../../types/CSSPropertiesWithVars";
import type { Disabling, Nodes } from "./nodesToHighLight";
import type { ChangeButton, ChangeNodeBehavior, NodesBehavior } from "../../../types/TutoTypes";

export const resetClass = (resetNodesBehavior: () => void, changeButton: ChangeButton) => {
  resetNodesBehavior();
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
  changeNodeBehavior: ChangeNodeBehavior,
  nodes: Nodes,
  highlights: keyof NodesBehavior | undefined,
  nodesToDisable: Disabling | undefined,
  above: boolean | undefined,
  ): CSSPropertiesWithVars => {

  if (!highlights && nodesToDisable) {
    for (let node of nodesToDisable) {
      const value = {highlight: false, disable: true};
        changeNodeBehavior(node, value);
    };
  };
  
  if (highlights) { // highlights and/or disable node
    if (nodesToDisable) {
      for (let node of nodesToDisable) {
        const newBehavior = {highlight: node === highlights ? true : false, disable: true};
        changeNodeBehavior(node, newBehavior);
      };
      if (nodesToDisable.indexOf(highlights) < 0) changeNodeBehavior(highlights, {highlight: true, disable: false});
    } else changeNodeBehavior(highlights, {highlight: true, disable: false});
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