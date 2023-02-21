import { FunctionComponent, useEffect } from "react";
import type { BothClefs, StaveClef } from "../../types/Clefs";
import useClientRect, { NodeObj } from "../../utils/Hooks/useClientRect";
import { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import renderVFScore from "../../utils/renderVFScore";

interface Props {
 levelNum: number
 clefSelected: string
 trebleData: StaveClef
 bassData: StaveClef
 bothClefsData: BothClefs
 gameLength: number
 updateNodes: (key: NodesKeys, obj: NodeObj) => void
 highlight: boolean
 isStaveDataCreated: boolean
 isTutoOn: boolean
 isTutoPlay: boolean
 isTutoStaveDataCreated: boolean
};

const VFBox: FunctionComponent<Props> = ({
  levelNum, 
  clefSelected, 
  trebleData, 
  bassData, 
  bothClefsData, 
  gameLength, 
  updateNodes, 
  highlight, 
  isStaveDataCreated, 
  isTutoOn,
  // isTutoPlay,
  isTutoStaveDataCreated
}) => {

  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("vexScore", nodeObj);
  }, [nodeObj, updateNodes]);
  const [outputNode, outputRef] = useClientRect();
  useEffect(() => {
    updateNodes("vexScoreOutput", outputNode);
  }, [outputNode, updateNodes]);

  useEffect(() => {
    
    // console.log("isStaveDataCreated", isStaveDataCreated);
    // console.log("isTutoOn", isTutoOn);

    if (outputNode.node && isStaveDataCreated && !isTutoOn) {
      outputNode.node.innerHTML = "";
      renderVFScore(clefSelected, trebleData, bassData, levelNum, gameLength, bothClefsData);
    };
    if (isTutoStaveDataCreated) {
      outputNode.node.innerHTML = "";
      renderVFScore(clefSelected, trebleData, bassData, levelNum, 5, bothClefsData);
    };
  }, [bassData, bothClefsData, clefSelected, gameLength, isStaveDataCreated, isTutoOn, isTutoStaveDataCreated, levelNum, outputNode.node, trebleData]);

  const classN = highlight ? "tuto" : "";

  return (
    <div ref={ref} id="vexbox" className={classN}>
      <div ref={outputRef} id="output"></div>
    </div>
  );
};


export default VFBox;