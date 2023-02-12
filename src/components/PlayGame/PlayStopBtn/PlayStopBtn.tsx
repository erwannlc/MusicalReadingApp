import { FC, useEffect, useState } from "react";
import "./play-stop--btn.scss";
import PlayIcon from "./icons/play-icon";
import StopIcon from "./icons/stop-icon";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesBehavior } from "../../../types/TutoTypes";
// Thx to HeadOnKeyboard https://codepen.io/headonkeyboard/pen/VwYdjRd

interface Props {
  handlePlay: () => void
  isPlaying: boolean
  stopGame: () => void
  cancelStop: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodesBehavior: NodesBehavior
};

const PlayStopBtn:FC<Props> = ({handlePlay, isPlaying, stopGame, cancelStop, updateNodes, nodesBehavior}) => {
  
  const [isPlay, setIsPlay] = useState(false); // className handling
  const [playClassN, setPlayClassN] = useState("play");
  const [stopClassN, setStopClassN] = useState("stop");
  const { playBtn, stopBtn } = nodesBehavior;

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
    const className = `play${isPlay ?" is-play":""}${playBtn.disable ? " disable" : ""}${playBtn.highlight ? " tuto" :""}`;
    setPlayClassN(className);
  }, [isPlay, playBtn.disable, playBtn.highlight]);
  useEffect(() => {
    const className = `stop${stopBtn.disable ? " disable" : ""}${stopBtn.highlight ? " tuto" :""}${playBtn.highlight ? " tuto-play" : ""}`;
    setStopClassN(className);
  }, [isPlay, playBtn.highlight, stopBtn.disable, stopBtn.highlight]);

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

  const playTooltip = "Lancer une nouvelle partie";
  const stopTooltip = "Stopper la partie en cours";

  return (
    <div className="btn-group">
      <button ref={playRef} onClick={() => handleClick("play")} className={playClassN} title={playTooltip}>
        <PlayIcon />
      </button>
      <button ref={stopRef} onClick={() => handleClick("stop")} className={stopClassN} title={stopTooltip}>
        <StopIcon />
      </button>
    </div>
  )
};

export default PlayStopBtn;

