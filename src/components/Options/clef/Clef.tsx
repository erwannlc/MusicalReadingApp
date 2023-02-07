import { FunctionComponent, useCallback } from "react";
import ClefsButtons from "./ClefButtons";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import type { ClefSelected } from "../../../types/Clefs";

type Props = {
  changeClef: (clef: ClefSelected) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  clefSelected: string
};

const Clef: FunctionComponent<Props> = ({changeClef, updateNodes, clefSelected}) => {

  const chooseClef = useCallback((clef: ClefSelected) => {
    changeClef(clef)
  }, [changeClef]);

  return (
    <div className="clef-option">
      <p className="clef-option-title">Clef</p>
      <ClefsButtons chooseClef={chooseClef} updateNodes={updateNodes} clefSelected={clefSelected}/>
    </div>
  )
};

export default Clef;