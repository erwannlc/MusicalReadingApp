import { type FunctionComponent } from "react";
import type { MessageObj } from "../../types/MessageObj";
import type { StaveClef, BothClefs } from "../../types/Clefs";
import type { Options } from "../../types/Options";
import type { Nodes, NodesKeys } from "../../types/Nodes";
import type { NodesBehavior } from "../../types/NodesBehavior";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import { stopPlaying, playGame } from "../../utils/handleGame";
import PlayStopBtn from "./PlayStopBtn";

interface Props {
  options: Options
  trebleData: StaveClef
  bassData: StaveClef
  bothClefsData: BothClefs
  handleMessage: (message: MessageObj) => void
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  quitGame: () => void
  stopGame: () => void
  cancelStop: () => void
  isMobile: boolean
  gameLength: number
  displayScoreCircle: (score: number) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  changeProgressBarID: (id: string | null) => void
  nodes: Nodes
  nodesBehavior: NodesBehavior
  isCorrection: boolean
  enablePiano: () => void
  disablePiano: () => void
  activateCorrection: () => void
};

const PlayBtn: FunctionComponent<Props> = (props) => {
  const {
    options,
    trebleData,
    bassData,
    bothClefsData,
    handleMessage,
    isPlaying,
    setIsPlaying,
    quitGame,
    stopGame,
    cancelStop,
    isMobile,
    gameLength,
    displayScoreCircle,
    updateNodes,
    changeProgressBarID,
    nodes,
    nodesBehavior,
    isCorrection,
    enablePiano,
    disablePiano,
    activateCorrection
  } = props;

  const handlePlay = () => {
    const outputNode = isMobile
      ? nodes.vexScoreMobileOutput?.node
      : nodes.vexScoreOutput?.node;
    if (isPlaying) {
      stopPlaying(
        setIsPlaying,
        handleMessage,
        quitGame,
        changeProgressBarID);
    } else {
      playGame(
        gameLength,
        options.intervalTime,
        options.levelNum,
        options.clefSelected,
        trebleData, bassData, bothClefsData,
        isMobile,
        handleMessage,
        setIsPlaying,
        changeProgressBarID,
        displayScoreCircle,
        outputNode,
        enablePiano,
        disablePiano,
        activateCorrection
      );
    };
  };

  return (
    <div className="playDiv">
      <PlayStopBtn
        handlePlay={handlePlay}
        isPlaying={isPlaying}
        stopGame={stopGame}
        cancelStop={cancelStop}
        updateNodes={updateNodes}
        nodesBehavior={nodesBehavior}
        isCorrection={isCorrection}/>
    </div>
  );
};

export default PlayBtn;
