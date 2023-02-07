import { FunctionComponent, useEffect } from "react";
import type { BothClefs, StaveClef } from "../../types/Clefs";
import { createStaves } from "../../utils/createStaves";
import useClientRect, { NodeObj } from "../../utils/Hooks/useClientRect";
import { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";

type Props = {
 level: string
 levelNum: number
 clefSelected: string
 Treble: StaveClef
 Bass: StaveClef
 both: BothClefs
 gameLength: number
 updateNodes: (key: NodesKeys, obj: NodeObj) => void
};

const VFBox: FunctionComponent<Props> = ({level, levelNum, clefSelected, Treble, Bass, both, gameLength, updateNodes}) => {
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
      createStaves(level, levelNum, clefSelected, Treble, Bass, both, gameLength, outputNode.node);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputNode.node])

  return (
    <div ref={ref} id="vexbox">
      <div ref={outputRef} id="output"></div>
    </div>
  )
};


export default VFBox;