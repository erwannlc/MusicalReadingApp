import type { FunctionComponent } from "react";
import LevelKnob from "./levelsKnob";

interface Props {
  changeLevel: (level: string, levelNum: number) => void
};

const Levels: FunctionComponent <Props> = (props) => {
  const levelTooltip =
    "Augmenter la difficulté en tournant le bouton vers la droite." +
    "Quand la difficulté augmente," +
    "les notes peuvent se trouver dans un intervalle d'octaves plus grand.";

  return (
    <div className="levels" title={levelTooltip}>
      <p>Niveau</p>
      <LevelKnob {...props}/>
    </div>
  );
};

export default Levels;
