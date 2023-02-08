import { FC, useEffect } from "react";
import "./switch-piano.scss";
import PianoIcon from "./PianoIcon";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";

type Props = {
  switchPiano: () => void
  isPiano: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  tutoData: {isTuto: boolean, disabled: boolean}
};

const SwitchPianoBtn:FC<Props> = ({switchPiano, isPiano, updateNodes, tutoData}) => {

  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("switchPiano", nodeObj);
  }, [nodeObj, updateNodes]);

  let classN= isPiano ? "depth is-active" : "depth";
  classN += tutoData.disabled ? " disable" : "";
  classN += tutoData.isTuto ? " tuto" : "";

  const handleClick = () => {
    switchPiano();
  };

  const switchPianoTooltip = isPiano ? "Quitter le mode Piano" : "Mode Piano"

  return (
    <div className="round-switch" >
      <button ref={ref} className={classN} type="button" onClick={handleClick} title={switchPianoTooltip}>
        <PianoIcon />
      </button>
    </div>
  )
};

export default SwitchPianoBtn;
