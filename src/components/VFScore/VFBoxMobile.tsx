import { type FunctionComponent, useEffect, useRef } from "react";
import type { ClefSelected, StaveClef } from "../../types/Clefs";
import type { NodesKeys } from "../../types/Nodes";
import useClientRect, { type NodeObj } from "../../utils/Hooks/useClientRect";
import renderVFScoreMobile from "../../utils/renderVFScoreMobile";

interface Props {
  levelNum: number
  clefSelected: ClefSelected
  trebleData: StaveClef
  bassData: StaveClef
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  isCorrection: boolean
  isStaveDataCreated: boolean
};

const VFBoxMobile: FunctionComponent<Props> = ({
  levelNum,
  clefSelected,
  trebleData,
  bassData,
  updateNodes,
  isCorrection,
  isStaveDataCreated
}) => {
  const firstRender = useRef(true);

  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    nodeObj && updateNodes("vexScoreMobile", nodeObj);
  }, [nodeObj, updateNodes]);
  const [outputMobileNode, outputMobileRef] = useClientRect();
  useEffect(() => {
    outputMobileNode && updateNodes("vexScoreMobileOutput", outputMobileNode);
  }, [outputMobileNode, updateNodes]);

  const note = clefSelected === "treble"
    ? trebleData.notesArray[0]
    : bassData.notesArray[0];

  useEffect(() => {
    if (isStaveDataCreated && outputMobileNode) {
      const clef = clefSelected === "bothClefs" ? "bass" : clefSelected;
      if (firstRender.current) {
        renderVFScoreMobile(note, clef, levelNum, false);
        firstRender.current = false;
      } else {
        outputMobileNode.node.innerHTML = "";
        renderVFScoreMobile(note, clef, levelNum, false);
      };
    };
  }, [
    clefSelected,
    isStaveDataCreated,
    levelNum,
    note,
    outputMobileNode
  ]);

  const classN = isCorrection ? "while-correction" : "";
  if (isCorrection) {
    return null;
  } else {
    return (
    <div ref={ref} id="vexboxMobile" className={classN}>
      <div ref={outputMobileRef} id="outputMobile"></div>
    </div>
    );
  };
};

export default VFBoxMobile;
