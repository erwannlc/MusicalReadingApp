import { FC } from "react";
import { NodeObj } from "../../utils/Hooks/useClientRect";
import { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import SwitchBtn from "./SwitchBtn";

interface Props {
  showOptions: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  displayOptions: boolean
  nodesBehavior: {highlight: boolean, disable: boolean}
}
const ShowOptions: FC<Props> = (props) => 
    <SwitchBtn {...props}/>

export default ShowOptions;