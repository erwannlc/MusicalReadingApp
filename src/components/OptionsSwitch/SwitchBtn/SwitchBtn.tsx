import { FC, useEffect, useState } from "react";
import  { GearIcon  as Icon }  from "./ui/settings-icon";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import "./switchOptions.scss";

type Props = {
  showOptions: () => void;
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  displayOptions: boolean
};

const SwitchBtn:FC<Props> = ({showOptions, displayOptions, updateNodes}) => {

  // const [isOptionsShown, setIsOptionsShown] = useState(false);
  const [classN, setClassN] = useState("depth");

  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("switchOptions", nodeObj);
  }, [nodeObj, updateNodes]);

  
  useEffect(() => {
    const className = displayOptions ? "depth is-active" : "depth";
    setClassN(className)
  }, [displayOptions])


  const handleClick = () => {
    showOptions();
  };

  const switchOptiontooltip = displayOptions ? "Fermer le panneau des options" : "Ouvrir le panneau des options"

  return (
    <div  className="options-switch">
      <button ref={ref} className={classN} type="button" onClick={handleClick} title={switchOptiontooltip}><Icon /></button>
    </div>
  )
};

export default SwitchBtn;
