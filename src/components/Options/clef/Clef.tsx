import { type FunctionComponent } from "react";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesKeys } from "../../../types/Nodes";
import type { ClefSelected } from "../../../types/Clefs";
import ClefsButtons from "./ClefButtons";

interface Props {
  changeClef: (clef: ClefSelected) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  clefSelected: string
  highlight: boolean
};

const Clef: FunctionComponent<Props> = ({
  changeClef,
  updateNodes,
  clefSelected,
  highlight
}) => (
    <div className="clef-option">
      <p className="clef-option-title">Clef</p>
      <ClefsButtons
        chooseClef={changeClef}
        updateNodes={updateNodes}
        clefSelected={clefSelected}
        highlight={highlight}/>
    </div>
);

export default Clef;
