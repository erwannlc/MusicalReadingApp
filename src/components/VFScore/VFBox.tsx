import { type FunctionComponent, useEffect } from "react";
import type { BothClefs, StaveClef } from "../../types/Clefs";
import type { NodesKeys } from "../../types/Nodes";
import useClientRect, { type NodeObj } from "../../utils/Hooks/useClientRect";
import renderVFScore from "../../utils/renderVFScore";

interface Props {
  levelNum: number
  clefSelected: string
  trebleData: StaveClef
  bassData: StaveClef
  bothClefsData: BothClefs
  gameLength: number
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
};

const VFBox: FunctionComponent<Props> = ({
  levelNum,
  clefSelected,
  trebleData,
  bassData,
  bothClefsData,
  gameLength,
  updateNodes
}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    nodeObj && updateNodes("vexScore", nodeObj);
  }, [nodeObj, updateNodes]);
  const [outputNode, outputRef] = useClientRect();
  useEffect(() => {
    outputNode && updateNodes("vexScoreOutput", outputNode);
  }, [outputNode, updateNodes]);

  useEffect(() => {
    if (outputNode?.node && trebleData.notesArray.length === gameLength) {
      outputNode.node.innerHTML = "";
      renderVFScore(
        clefSelected,
        trebleData,
        bassData,
        levelNum,
        gameLength,
        bothClefsData
      );
    };
  }, [
    bassData,
    bothClefsData,
    clefSelected,
    gameLength,
    levelNum,
    outputNode?.node,
    trebleData
  ]);

  const classN = "";

  return (
    <div ref={ref} id="vexbox" className={classN}>
      <div ref={outputRef} id="output"></div>
    </div>
  );
};

export default VFBox;
