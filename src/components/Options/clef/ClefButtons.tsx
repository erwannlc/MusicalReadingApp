import { type FC, type MouseEvent, useEffect, useState } from "react";
import useClientRect from "../../../utils/Hooks/useClientRect";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesKeys } from "../../../types/Nodes";
import type { ClefSelected, ClefsClassName } from "../../../types/Clefs";
import "./clefButtons.scss";

interface Props {
  chooseClef: (clef: ClefSelected) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  clefSelected: string
  highlight: boolean
};

const SimpleMetalButton: FC<Props> = ({
  chooseClef,
  updateNodes,
  clefSelected,
  highlight
}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    nodeObj && updateNodes("clefs", nodeObj);
  }, [nodeObj, updateNodes]);

  const [clef, setClef] = useState(clefSelected);

  const classN: ClefsClassName = {
    treble: clef === "treble" ? "clef-indicator is-active" : "clef-indicator",
    bass: clef === "bass" ? "clef-indicator is-active" : "clef-indicator",
    bothClefs: clef === "bothClefs"
      ? "clef-indicator is-active"
      : "clef-indicator"
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    const clefSelected = target.dataset.clef as string;
    setClef(clefSelected);
    chooseClef(clefSelected as ClefSelected);
  };

  const clefsTooltips = {
    treble: "Clef de sol",
    bass: "Clef de fa",
    bothClefsData: "Clef de sol & clef de fa"
  };

  const clefsClass = highlight ? "clefs-buttons tuto" : "clefs-buttons";

  return (
    <div ref={ref} className={clefsClass}>
      <div className={classN.treble}>𝄞</div>
      <div className={classN.bass}>𝄢</div>
      <div className={classN.bothClefs}>𝄞 𝄢</div>
      <button
        className="metal-button"
        data-clef="treble"
        onClick={handleClick}
        title={clefsTooltips.treble}>
      </button>
      <button
        className="metal-button"
        data-clef="bass"
        onClick={handleClick}
        title={clefsTooltips.bass}>
      </button>
      <button
        className="metal-button"
        data-clef="bothClefs"
        onClick={handleClick}
        title={clefsTooltips.bothClefsData}>
      </button>

    </div>
  );
};

export default SimpleMetalButton;
