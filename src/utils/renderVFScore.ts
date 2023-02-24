import { Vex } from "vexflow";

import { type BothClefs, type StaveClef } from "../types/Clefs";

const renderVFScore = async (
  clefSelected: string,
  trebleData: StaveClef,
  bassData: StaveClef,
  level: number,
  gameLength: number,
  bothData: BothClefs
) => {
  const containerWidth = 575;
  const containerHeight = clefSelected === "bothClefs"
    ? (level > 3 ? level > 4 ? level > 5 ? 380 : 350 : 320 : 300)
    : 250;
  const staveWidth = 500;
  const staveX = 30;
  const staveY = clefSelected === "bass"
    ? 30
    : (level > 5 ? 75 : level > 4 ? 60 : level > 3 ? 40 : 30);

  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`);

  const VF = Vex.Flow;

  const vf = new VF.Factory({
    renderer: {
      elementId: "output",
      width: containerWidth,
      height: containerHeight
    }
  });

  const system = vf.System({ width: staveWidth, x: staveX, y: staveY });

  switch (clefSelected) {
    case ("treble") : {
      const scoreG = vf.EasyScore();
      system.addStave({
        voices: [
          scoreG.voice(scoreG.notes(trebleData.notes),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("treble");
      break;
    }
    case ("bass") : {
      const scoreF = vf.EasyScore();
      system.addStave({
        voices: [
          scoreF.voice(scoreF.notes(bassData.notes, { clef: "bass" }),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("bass");
      break;
    }
    case ("bothClefs") : {
      const scoreBoth = vf.EasyScore();
      system.addStave({
        voices: [
          scoreBoth.voice(scoreBoth.notes(bothData.trebleNotes || ""),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("treble");
      system.addStave({
        voices: [
          scoreBoth.voice(
            scoreBoth.notes(bothData?.bassNotes || "", { clef: "bass" }),
            { time: `${gameLength.toString()}/4` })
        ]
      }).addClef("bass");
      system.addConnector();
      break;
    }
  };
  vf.draw();
};

export default renderVFScore;
