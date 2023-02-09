import { FC, MouseEvent, useEffect, useState } from "react";

import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import type { ClefSelected, ClefsClassName } from "../../../types/Clefs";
import "./clefButtons.scss";

type Props = {
  chooseClef:(clef: ClefSelected) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  clefSelected: string
  highlight: boolean
};

const SimpleMetalButton:FC<Props> = ({chooseClef, updateNodes, clefSelected, highlight}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("clefs", nodeObj);
  }, [nodeObj, updateNodes]);

  useEffect(() => { // change clef via props external clefSelected
    setClef(clefSelected);
  }, [clefSelected]);

  const [clef, setClef] = useState(clefSelected);
  useEffect(() => {
    chooseClef(clef as ClefSelected);
  }, [chooseClef, clef]);
  
  let classN: ClefsClassName = {
    treble: clef === "treble" ? "clef-indicator is-active" : "clef-indicator",
    bass: clef === "bass" ? "clef-indicator is-active" : "clef-indicator",
    bothClefs: clef === "bothClefs" ? "clef-indicator is-active" : "clef-indicator",
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    const clefSelected = target.dataset.clef as string;
    setClef(clefSelected);
  };

  const clefsTooltips = {
    treble: "Clef de sol",
    bass: "Clef de fa",
    bothClefsData: "Clef de sol & clef de fa"
  }; 

  let clefsClass = highlight ? "clefs-buttons tuto" : "clefs-buttons";

  return ( 
    <div ref={ref} className={clefsClass}>
      <div className={classN.treble}>𝄞</div>
      <div className={classN.bass}>𝄢</div>
      <div className={classN.bothClefs}>𝄞 𝄢</div>
      <button className="metal-button" data-clef="treble" onClick={handleClick} title={clefsTooltips.treble}></button>
      <button className="metal-button" data-clef="bass" onClick={handleClick} title={clefsTooltips.bass}></button>
      <button className="metal-button" data-clef="bothClefs" onClick={handleClick} title={clefsTooltips.bothClefsData}></button>
    
    </div>
  )
};

export default SimpleMetalButton;
