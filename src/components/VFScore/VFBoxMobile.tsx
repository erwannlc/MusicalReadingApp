import { type FunctionComponent, useEffect, useRef } from "react";
import { type ClefSelected, type StaveClef } from "../../types/Clefs";
import useClientRect, { type NodeObj } from "../../utils/Hooks/useClientRect";
import { renderVFEmptyStave } from "../../utils/renderVFScoreMobile";
import { type NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";

interface Props {
  clefSelected: ClefSelected
  trebleData: StaveClef
  bassData: StaveClef
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  isCorrection: boolean
  isStaveDataCreated: boolean
};

const VFBoxMobile: FunctionComponent<Props> = ({
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

  useEffect(() => {
    if (isCorrection) {
      document.documentElement.style.setProperty(
        "--notes-visibility", `hidden`
      );
    }
  }, [isCorrection]);

  useEffect(() => {
    if (firstRender.current && isStaveDataCreated && outputMobileNode) {
      renderVFEmptyStave(clefSelected, trebleData, bassData);
      firstRender.current = false;
    } else if (isStaveDataCreated && outputMobileNode) {
      outputMobileNode.node.innerHTML = "";
      renderVFEmptyStave(clefSelected === "bothClefs"
        ? "treble"
        : clefSelected, trebleData, bassData);
    };
  }, [
    bassData,
    clefSelected,
    isStaveDataCreated,
    outputMobileNode,
    trebleData]);

  const classN = isCorrection ? "while-correction" : "";

  return (
    <div ref={ref} id="vexboxMobile" className={classN}>
      <div ref={outputMobileRef} id="outputMobile"></div>
    </div>
  );
};

export default VFBoxMobile;
