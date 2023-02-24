import type { FunctionComponent } from "react";
import TempoKnob from "./tempoKnob";

interface Props {
  changeTimer: (interval: number, tempoNum: number) => void
  tempoNum: number
};

const Tempo: FunctionComponent <Props> = (props) => {
  const tempoTooltip =
    "Augmenter le tempo en tournant le bouton vers la droite." +
    "\n Plus le tempo est élevé, moins il y a de temps" +
    "entre l'affichage de deux notes.";

  return (
    <div className="tempo" title={tempoTooltip}>
      <p>Tempo</p>
      <TempoKnob {...props} />
    </div>
  );
};

export default Tempo;
