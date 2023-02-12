import { FC, useEffect, useState } from "react";
import  { GearIcon  as Icon }  from "./ui/settings-icon";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import "./switchOptions.scss";

interface Props {
  showOptions: () => void;
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  displayOptions: boolean
  nodesBehavior: {highlight: boolean, disable: boolean}
};

const SwitchBtn:FC<Props> = ({showOptions, displayOptions, updateNodes, nodesBehavior}) => {

  const [classN, setClassN] = useState("depth");

  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("switchOptions", nodeObj);
  }, [nodeObj, updateNodes]);

  useEffect(() => {
    let className = displayOptions ? "depth is-active" : "depth";
    className += nodesBehavior.disable ? " disable" : "";
    className += nodesBehavior.highlight ? " tuto" : "";
    setClassN(className);
  }, [displayOptions, nodesBehavior.disable, nodesBehavior.highlight]);


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
