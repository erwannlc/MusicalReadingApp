import { type FunctionComponent, useCallback, useEffect, useState } from "react";
import KnobButton from "./tempoKnob";

interface Props {
  changeTimer: (interval: number, tempoNum: number) => void
  tempoNum: number
};

const Tempo: FunctionComponent <Props> = ({ changeTimer, tempoNum }) => {
  const [value, setValue] = useState(tempoNum);

  useEffect(() => {
    setValue(tempoNum);
  }, [tempoNum]);

  const interval: number =
  value > 0 && value < 5
    ? 500 * (5 - value) + 2500
    : value > 5
      ? 300 * (10 - value) + 1000
      : value === 5
        ? 2500
        : 5000;

  useEffect(() => {
    changeTimer(interval, value);
  }, [changeTimer, interval, value]);

  const props = {
    handleFunc: useCallback((newValue: number) => { setValue(newValue); }, []),
    tempoNum,
    numTicks: 10,
    max: 11,
    degrees: 180,
    hslBaseColor: 210
  };
  const tempoTooltip = "Augmenter le tempo en tournant le bouton vers la droite.\n Plus le tempo est élevé, moins il y a de temps entre l'affichage de deux notes.";

  return (
      <div className="tempo" title={tempoTooltip}>
        <p>Tempo</p>
        <KnobButton {...props} />
      </div>
  );
};

export default Tempo;
