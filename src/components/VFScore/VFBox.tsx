import { FunctionComponent, useEffect } from "react";
import type { BothClefs, StaveClef } from "../../types/Clefs";
import { createStaves } from "../../utils/createStaves";
import useClientRect, { NodeObj } from "../../utils/Hooks/useClientRect";
import { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";

type Props = {
 level: string
 levelNum: number
 clefSelected: string
 trebleData: StaveClef
 bassData: StaveClef
 bothClefsData: BothClefs
 gameLength: number
 updateNodes: (key: NodesKeys, obj: NodeObj) => void
 highlight: boolean
};

const VFBox: FunctionComponent<Props> = ({level, levelNum, clefSelected, trebleData, bassData, bothClefsData, gameLength, updateNodes, highlight}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("vexScore", nodeObj);
  }, [nodeObj, updateNodes]);
  const [outputNode, outputRef] = useClientRect();
  useEffect(() => {
    updateNodes("vexScoreOutput", outputNode);
  }, [outputNode, updateNodes]);

  useEffect(() => {
    if (outputNode.node) {
      createStaves(level, levelNum, clefSelected, trebleData, bassData, bothClefsData, gameLength, outputNode.node);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputNode.node]);

  const classN = highlight ? "tuto" : "";

  return (
    <div ref={ref} id="vexbox" className={classN}>
      <div ref={outputRef} id="output"></div>
    </div>
  )
};


export default VFBox;