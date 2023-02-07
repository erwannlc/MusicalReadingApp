import { FunctionComponent, useCallback, useEffect, useState } from "react";
import KnobButton from "./levelsKnob";

type Props = {
  changeLevel: (level: string, levelNum: number) => void
};

const Levels: FunctionComponent <Props>= ({changeLevel}) => {
  const [value, setValue] = useState(2); // also set in Knob
  let notZeroValue = value === 0 ? 1 : value;
  const level: string = `level${notZeroValue}`;

  useEffect(() => {
    changeLevel(level, value);
  }, [changeLevel, level, value])

  const props = {
    handleFunc: useCallback((newValue: number) => setValue(newValue), []),
    numTicks: 5,
    max: 6,
    degrees: 120,
    hslBaseColor : 37
  };

  const levelTooltip = "Augmenter la difficulté en tournant le bouton vers la droite.\n Quand la difficulté augmente, les notes peuvent se trouver dans un intervalle d'octaves plus grand.";

  return (
      <div className="levels" title={levelTooltip}> 
        <p>Niveau</p>
        <KnobButton {...props}/>
      </div>
  )
};

export default Levels;