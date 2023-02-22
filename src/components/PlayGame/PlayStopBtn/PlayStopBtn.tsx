import { type FC, useEffect, useState } from "react";
import "./play-stop--btn.scss";
import PlayIcon from "./icons/play-icon";
import StopIcon from "./icons/stop-icon";
import { type NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import useClientRect from "../../../utils/Hooks/useClientRect";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
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

const PlayStopBtn: FC<Props> = ({
  handlePlay,
  isPlaying,
  stopGame,
  cancelStop,
  updateNodes,
  nodesBehavior
}) => {
  const [isPlay, setIsPlay] = useState(false); // className handling
  const [playClassN, setPlayClassN] = useState("play");
  const [stopClassN, setStopClassN] = useState("stop");
  const { playBtn, stopBtn } = nodesBehavior;

  const [playNodeObj, playRef] = useClientRect();
  useEffect(() => {
    playNodeObj && updateNodes("playBtn", playNodeObj);
  }, [playNodeObj, updateNodes]);

  const [stopNodeObj, stopRef] = useClientRect();
  useEffect(() => {
    stopNodeObj && updateNodes("stopBtn", stopNodeObj);
  }, [stopNodeObj, updateNodes]);

  useEffect(() => {
    setIsPlay(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const className = `play${isPlay
      ? " is-play"
      : ""}${playBtn.highlight
        ? " tuto"
        : ""}`;
    setPlayClassN(className);
  }, [isPlay, playBtn.disable, playBtn.highlight]);
  useEffect(() => {
    const className = `stop${stopBtn.highlight
    ? " tuto"
    : ""}${playBtn.highlight
      ? " tuto-play"
      : ""}`;
    setStopClassN(className);
  }, [isPlay, playBtn.highlight, stopBtn.disable, stopBtn.highlight]);

  const handleClick = (type: string) => {
    if (type === "play" && !isPlaying) {
      cancelStop();
      setIsPlay(true);
      handlePlay();
    } else if (type === "stop" && isPlaying) {
      setIsPlay(false);
      stopGame();
      handlePlay();
    }
  };

  const playTooltip = playBtn.disable
    ? `Quitter la partie ou le tutoriel 
    pour pouvoir relancer une nouvelle partie`
    : "Lancer une nouvelle partie";
  const stopTooltip = "Stopper la partie en cours";

  return (
    <div className="btn-group">
      <button
      ref={playRef}
       onClick={() => { handleClick("play"); }}
      className={playClassN}
      title={playTooltip}
      disabled={playBtn.disable}>
        <PlayIcon />
      </button>
      <button
      ref={stopRef}
      onClick={() => { handleClick("stop"); }}
      className={stopClassN}
      title={stopTooltip}
      disabled={stopBtn.disable}>
        <StopIcon />
      </button>
    </div>
  );
};

export default PlayStopBtn;
