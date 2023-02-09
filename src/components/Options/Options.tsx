import { FunctionComponent} from "react";
import Tempo from "./tempo";
import Levels from "./levels";
import Clef from "./clef";
import SwitchPiano from "./switchPiano";
import type { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import type { Options } from "../../types/Options";
import type { ClefSelected } from "../../types/Clefs";
import type { TutoData } from "../../types/TutoTypes";
import "./options.scss";

type Props = {
  changeTimer: (interval: number, tempoNum: number) => void
  changeLevel: (level: string, levelNum: number) => void
  changeClef: (clef: ClefSelected) => void
  switchPiano: () => void
  isMobile: boolean
  displayPiano: boolean
  displayOptions: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  options: Options
  tutoData: TutoData
};

const OptionsPanel: FunctionComponent <Props>= (props) => {
  const { changeTimer, changeLevel, changeClef, switchPiano, displayPiano, displayOptions, updateNodes, options, tutoData} = props
  let className = displayOptions ? "options panel animate fade" : "options panel";
  return (
    <div className={className}>
      <Tempo changeTimer={changeTimer} tempoNum={options.tempoNum}/>
      <Levels changeLevel={changeLevel}/>
      <Clef changeClef={changeClef} updateNodes={updateNodes} clefSelected={options.clefSelected} highlight={tutoData.clefs.isTuto}/>
      <SwitchPiano switchPiano={switchPiano} isPiano={displayPiano}  updateNodes={updateNodes} tutoData={tutoData.switchPiano}/>
    </div>
  )
};

export default OptionsPanel;