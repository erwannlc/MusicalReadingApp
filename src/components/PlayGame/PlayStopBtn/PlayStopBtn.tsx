import { FC, useEffect, useState } from "react";
import "./play-stop--btn.scss";
import PlayIcon from "./icons/play-icon";
import StopIcon from "./icons/stop-icon";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
// Thx to HeadOnKeyboard https://codepen.io/headonkeyboard/pen/VwYdjRd

type Props = {
  handlePlay: () => void
  isPlaying: boolean
  stopGame: () => void
  cancelStop: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
};

const PlayStopBtn:FC<Props> = ({handlePlay, isPlaying, stopGame, cancelStop, updateNodes}) => {
  
  const [isPlay, setIsPlay] = useState(false);
  const [classN, setClassN] = useState("play");

  const [playNodeObj, playRef] = useClientRect();
  useEffect(() => {
    updateNodes("playBtn", playNodeObj);
  }, [playNodeObj, updateNodes]);

  const [stopNodeObj, stopRef] = useClientRect();
  useEffect(() => {
    updateNodes("stopBtn", stopNodeObj);
  }, [stopNodeObj, updateNodes]);

  useEffect(() => {
    setIsPlay(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    let className = isPlay ? `play is-play` : "play";
    setClassN(className);
  }, [isPlay]);

  const handleClick = (type: string) => {
    if (type === "play" && !isPlaying) {
      cancelStop();
      setIsPlay(true);
      handlePlay();
    } else if (type === "stop" && isPlaying) {
      stopGame();
      setIsPlay(false);
      handlePlay();
    }
  };

  const playTooltip = "Lancer une nouvelle partie"
  const stopTooltip = "Stopper la partie en cours"

  return (
    <div className="btn-group">
      <button ref={playRef} onClick={() => handleClick("play")} className={classN} title={playTooltip}>
        <PlayIcon />
      </button>
      <button ref={stopRef} onClick={() => handleClick("stop")} className={"stop"} title={stopTooltip}>
        <StopIcon />
      </button>
    </div>
  )
};

export default PlayStopBtn;
