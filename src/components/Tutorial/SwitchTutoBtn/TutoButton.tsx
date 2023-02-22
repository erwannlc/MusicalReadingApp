import { type FC } from "react";
import "./tuto-button.scss";

interface Props {
  startTuto: () => void
  isPlaying: boolean
};

const TutoButton: FC<Props> = ({ startTuto, isPlaying }) => {
  const className = isPlaying ? "tuto-button disable" : "tuto-button";
  const tutoBtnTooltip = "Lancer le sommaire du tutoriel";
  return (
    <button className={className} onClick={startTuto} title={tutoBtnTooltip}>
      Tutoriel
    </button>
  );
};

export default TutoButton;
