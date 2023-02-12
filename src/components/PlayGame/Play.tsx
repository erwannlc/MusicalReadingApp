import { FunctionComponent } from "react";
import type { MessageObj } from "../../types/MessageObj";
import type { StaveClef, BothClefs } from "../../types/Clefs";
import type { Options } from "../../types/Options";
import type { Nodes, NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import type { TutoData } from "../../types/TutoTypes";
import { playGame, stopPlaying, createTutoGame } from "../../utils/handleGame";
import PlayStopBtn from "./PlayStopBtn";

type Props = {
  options: Options
  trebleData: StaveClef 
  bassData: StaveClef 
  bothClefsData: BothClefs
  handleMessage: (message: MessageObj) => void
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  resetStavesData: () => void
  stopGame: () => void
  cancelStop: () => void
  isMobile: boolean
  gameLength: number
  isTutoOn: boolean
  displayScoreCircle: (score: number) => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  changeProgressBarID: (id: string | null) => void
  nodes: Nodes
  appNode: HTMLElement | null
  tutoData: TutoData
  enablePiano: () => void
  disablePiano: () => void
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
    resetStavesData,
    stopGame, 
    cancelStop,
    isMobile,
    gameLength,
    isTutoOn,
    displayScoreCircle,
    updateNodes,
    changeProgressBarID,
    nodes,
    tutoData,
    enablePiano,
    disablePiano

  } = props;

  const handlePlay = () => {
    const outputNode = isMobile ? nodes.vexScoreMobileOutput?.node : nodes.vexScoreOutput?.node;
    
    if (isPlaying) {
      stopPlaying(setIsPlaying, handleMessage, resetStavesData, changeProgressBarID, options.clefSelected, outputNode, isTutoOn ? 5 : gameLength, isMobile);
    } else {
      isTutoOn ? createTutoGame(
        options.clefSelected, 
        trebleData, bassData, bothClefsData, 
        isMobile, 
        setIsPlaying, 
        handleMessage,
        displayScoreCircle,
        nodes.vexScoreOutput.node
        )
      : playGame(
        gameLength, 
        options.intervalTime, 
        options.level, 
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
        disablePiano
        );
    }
  }

  return (
    <div className="playDiv"> 
      <PlayStopBtn handlePlay={handlePlay} isPlaying={isPlaying} stopGame={stopGame} cancelStop={cancelStop} updateNodes={updateNodes} tutoData={tutoData}/>
    </div>
  )
};

export default PlayBtn;