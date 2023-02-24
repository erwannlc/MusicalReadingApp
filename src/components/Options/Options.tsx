import { type FunctionComponent } from "react";
import Tempo from "./tempo";
import Levels from "./levels";
import Clef from "./clef";
import SwitchPiano from "./switchPiano";
import type { NodesKeys } from "../../types/Nodes";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import type { NodesBehavior } from "../../types/NodesBehavior";
import type { Options } from "../../types/Options";
import type { ClefSelected } from "../../types/Clefs";
import "./options.scss";

interface Props {
  changeTimer: (interval: number, tempoNum: number) => void
  changeLevel: (level: string, levelNum: number) => void
  changeClef: (clef: ClefSelected) => void
  switchPiano: () => void
  isMobile: boolean
  displayPiano: boolean
  displayOptions: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  options: Options
  nodesBehavior: NodesBehavior
};

const OptionsPanel: FunctionComponent <Props> = (props) => {
  const {
    changeTimer,
    changeLevel,
    changeClef,
    switchPiano,
    displayPiano,
    displayOptions,
    updateNodes,
    options,
    nodesBehavior
  } = props;
  const className = displayOptions
    ? "options panel animate fade"
    : "options panel";
  return (
    <div className={className}>
      <Tempo changeTimer={changeTimer} tempoNum={options.tempoNum}/>
      <Levels changeLevel={changeLevel}/>
      <Clef
       changeClef={changeClef}
       updateNodes={updateNodes}
      clefSelected={options.clefSelected}
       highlight={nodesBehavior.clefs.highlight}/>
      <SwitchPiano
      switchPiano={switchPiano}
      isPiano={displayPiano}
      updateNodes={updateNodes}
       nodesBehavior={nodesBehavior.switchPiano}/>
    </div>
  );
};

export default OptionsPanel;
