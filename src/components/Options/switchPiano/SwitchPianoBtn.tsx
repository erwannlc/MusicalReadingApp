import { type FC, useEffect } from "react";
import "./switch-piano.scss";
import PianoIcon from "./PianoIcon";
import type { NodesKeys } from "../../../types/Nodes";
import useClientRect from "../../../utils/Hooks/useClientRect";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";

interface Props {
  switchPiano: () => void
  isPiano: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodesBehavior: { highlight: boolean, disable: boolean }
};

const SwitchPianoBtn: FC<Props> = ({
  switchPiano,
  isPiano,
  updateNodes,
  nodesBehavior
}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    nodeObj && updateNodes("switchPiano", nodeObj);
  }, [nodeObj, updateNodes]);

  let classN = isPiano ? "depth is-active" : "depth";
  classN += nodesBehavior.disable ? " disable" : "";
  classN += nodesBehavior.highlight ? " tuto" : "";

  const handleClick = () => {
    switchPiano();
  };

  const switchPianoTooltip = isPiano ? "Quitter le mode Piano" : "Mode Piano";

  return (
    <div className="round-switch" >
      <button
      ref={ref}
      className={classN}
      type="button"
       onClick={handleClick}
      title={switchPianoTooltip}>
        <PianoIcon />
      </button>
    </div>
  );
};

export default SwitchPianoBtn;
