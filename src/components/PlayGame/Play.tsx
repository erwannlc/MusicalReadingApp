import { FunctionComponent } from "react";
import type { MessageObj } from "../../types/MessageObj";
import type { StaveClef, BothClefs } from "../../types/Clefs";
import type { Options } from "../../types/Options";
import type { Nodes, NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import { playGame, stopPlaying, createTutoGame } from "../../utils/handleGame";
import PlayStopBtn from "./PlayStopBtn";

type Props = {
  options: Options
  Treble: StaveClef 
  Bass: StaveClef 
  both: BothClefs
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
};

const PlayBtn: FunctionComponent<Props> = (props) => {
  const {
    options,
    Treble, 
    Bass, 
    both, 
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
    appNode
  } = props;

  const handlePlay = () => {
    const padsNode = nodes.padsDiv.node;
    const vexbox = isMobile ? nodes.vexScoreMobile?.node : nodes.vexScore?.node; // isMobile ==> différencier nodes de VFMObile et de VFNormal
    const outputNode = isMobile ? nodes.vexScoreMobileOutput?.node : nodes.vexScoreOutput?.node;
    
    if (isPlaying) {
      stopPlaying(setIsPlaying, handleMessage, resetStavesData, changeProgressBarID, options.clefSelected, outputNode, isTutoOn ? 5 : gameLength, isMobile);
    } else {
      isTutoOn ? createTutoGame(
        options.clefSelected, 
        Treble, Bass, both, 
        isMobile, 
        setIsPlaying, 
        handleMessage, 
        vexbox, 
        appNode, 
        displayScoreCircle,
        nodes.vexScoreOutput.node
        )
      : playGame(
        gameLength, 
        options.intervalTime, 
        options.level, 
        options.levelNum, 
        options.clefSelected, 
        Treble, Bass, both, 
        isMobile, 
        handleMessage, 
        setIsPlaying, 
        changeProgressBarID, 
        padsNode, vexbox, appNode, 
        displayScoreCircle,
        outputNode
        );
    }
  }

  return (
    <div className="playDiv"> 
      <PlayStopBtn handlePlay={handlePlay} isPlaying={isPlaying} stopGame={stopGame} cancelStop={cancelStop} updateNodes={updateNodes}/>
    </div>
  )
};

export default PlayBtn;