import { type FC, useEffect } from "react";
import "./play-stop--btn.scss";
import PlayIcon from "./icons/play-icon";
import StopIcon from "./icons/stop-icon";
import type { NodesKeys } from "../../../types/Nodes";
import useClientRect from "../../../utils/Hooks/useClientRect";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesBehavior } from "../../../types/NodesBehavior";
// Thx to HeadOnKeyboard https://codepen.io/headonkeyboard/pen/VwYdjRd

interface Props {
  handlePlay: () => void
  isPlaying: boolean
  stopGame: () => void
  cancelStop: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodesBehavior: NodesBehavior
  isCorrection: boolean
};

const PlayStopBtn: FC<Props> = ({
  handlePlay,
  isPlaying,
  stopGame,
  cancelStop,
  updateNodes,
  nodesBehavior,
  isCorrection
}) => {
  const [playNodeObj, playRef] = useClientRect();
  useEffect(() => {
    playNodeObj && updateNodes("playBtn", playNodeObj);
  }, [playNodeObj, updateNodes]);
  const [stopNodeObj, stopRef] = useClientRect();
  useEffect(() => {
    stopNodeObj && updateNodes("stopBtn", stopNodeObj);
  }, [stopNodeObj, updateNodes]);

  let isPlay = isPlaying; // className handling

  const playClassN = `play${isPlay
    ? " is-play"
    : ""}`;
  const stopClassN = "stop";

  const handleClick = (type: string) => {
    if (type === "play" && !isPlaying) {
      cancelStop();
      isPlay = true;
      handlePlay();
    } else if (type === "stop" && isPlaying) {
      isPlay = false;
      stopGame();
      handlePlay();
    }
  };

  const { playBtn, stopBtn } = nodesBehavior;
  const isDisable = playBtn.disable || isCorrection;
  const playTooltip = isDisable
    ? "Quitter la partie ou le tutoriel" +
    " pour pouvoir relancer une nouvelle partie"
    : "Lancer une nouvelle partie";
  const stopTooltip = "Stopper la partie en cours";

  return (
    <div className="btn-group">
      <button
      ref={playRef}
      onClick={() => { handleClick("play"); }}
      className={playClassN}
      title={playTooltip}
      disabled={isDisable}>
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
