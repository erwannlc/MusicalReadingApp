import { type FC, useEffect } from "react";
import type { Options } from "../../../types/Options";
import useClientRect from "../../../utils/Hooks/useClientRect";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import type { NodesKeys } from "../../../types/Nodes";

interface Props {
  options: Options
  showOptions: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
  nodesBehavior: { highlight: boolean, disable: boolean }
};

const OptionsIndicator: FC<Props> = ({
  options,
  showOptions,
  updateNodes,
  nodesBehavior
}) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("optionsIndicator", nodeObj);
  }, [nodeObj, updateNodes]);

  const language = "fr";

  const indicators = {
    fr: {
      tempo: `Tempo : ${options.tempoNum.toString()} / 11 (${
        options.intervalTime >= 4000
          ? "très lent"
          : options.intervalTime >= 3000
            ? "lent"
            : options.intervalTime > 1600
              ? "modéré"
              : options.intervalTime > 1000
                ? "rapide"
                : "très rapide"
      })`,
      level: `Difficulté : ${options.levelNum.toString()} / 6`,
      levelTxt: `${
        options.levelNum === 6
          ? "5 octaves"
          : options.levelNum === 5
            ? "4 octaves"
            : options.levelNum === 4
              ? "3 octaves et demi"
              : `${options.levelNum} octaves`
      }`,
      clef: `Clef : ${options.clefSelected === "treble"
      ? "𝄞"
      : options.clefSelected === "bass"
      ? "𝄢"
      : "𝄞 et 𝄢"}`,
      clefName: `${options.clefSelected === "treble"
      ? "sol"
      : options.clefSelected === "bass"
      ? "fa"
      : "sol et clé de fa"}`
    },
    en: {
      tempo: `Tempo: ${options.intervalTime / 1000}" (${
        options.intervalTime > 3500
          ? "very slow"
          : options.intervalTime > 2200
            ? "slow"
            : options.intervalTime > 1600
              ? "moderate"
              : options.intervalTime > 1000
                ? "fast"
                : "very Fast"})`,
      level: `Difficulty: ${options.levelNum.toString()} / 6`,
      clef: `Clef: ${options.clefSelected === "treble"
      ? "𝄞"
      : options.clefSelected === "bass"
      ? "𝄢"
      : "𝄞 and 𝄢"}`
    }
  };
  const { tempo, level, clef } = language === "fr"
    ? indicators.fr
    : indicators.en;

  const optionsTooltip = {
    global: "Ouvrir le panneau Options",
    tempo: `${options.intervalTime / 1000} secondes entre chaque note`,
    clef: `Clef de ${indicators.fr.clefName}`,
    level: `Niveau de difficulté :
     ${options.levelNum} sur 6 (${indicators.fr.levelTxt})`
  };

  const isIndicatorTooLarge: boolean = (
    (options.clefSelected === "bothClefs") && (options.intervalTime < 1001));
  let className = isIndicatorTooLarge
    ? "options-indicator largest"
    : "options-indicator";
  className += nodesBehavior.highlight ? " tuto" : "";
  className += nodesBehavior.disable ? " disable" : "";

  return (
    <div
     ref={ref}
     className={className}
     onClick={showOptions}
     title={optionsTooltip.global}>
      <span title={optionsTooltip.tempo}>{tempo}</span>
      <span title={optionsTooltip.level}>{level}</span>
      <span title={optionsTooltip.clef}>{clef}</span>
    </div>
  );
};

export default OptionsIndicator;
