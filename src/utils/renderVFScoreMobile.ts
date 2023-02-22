import { Vex } from "vexflow";
import { type ClefSelected, type StaveClef } from "../types/Clefs";

export const renderVFEmptyStave = async (
  clef: ClefSelected,
  trebleData: StaveClef,
  bassData: StaveClef) => {
  const containerWidth = 140;
  const containerHeight = 180;
  const staveWidth = 90;
  const staveX = 25;
  const staveY = 30;
  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`);
  const VF = Vex.Flow;
  const vf = new VF.Factory({
    renderer: {
      elementId: "outputMobile",
      width: containerWidth,
      height: containerHeight
    }
  });
  const system = vf.System({ width: staveWidth, x: staveX, y: staveY });
  const score = vf.EasyScore();

  system.addStave({
    voices: [
      score.voice(score.notes(
        clef === "treble"
          ? trebleData.notesArray[0]
          : bassData.notesArray[0], { clef }),
      { time: "1/4" })
    ]
  }).addClef(clef);
  vf.draw();
};

const renderVFScoreMobile = (note: string, clef: string, level: number) => {
  const containerWidth = 140;
  const containerHeight = 180;
  const staveWidth = 90;
  const staveX = 25;
  const staveY = clef === "bass"
    ? 20
    : (level > 5 ? 60 : level > 4 ? 50 : level > 3 ? 40 : 30);

  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`);
  document.documentElement.style.setProperty(
    "--notes-visibility", `visible`);

  const VF = Vex.Flow;
  const vf = new VF.Factory({
    renderer: {
      elementId: "outputMobile",
      width: containerWidth,
      height: containerHeight
    }
  });
  const system = vf.System({ width: staveWidth, x: staveX, y: staveY });
  const score = vf.EasyScore();

  system.addStave({
    voices: [
      score.voice(score.notes(note, { clef }),
        { time: "1/4" })
    ]
  }).addClef(clef);

  vf.draw();
};

export default renderVFScoreMobile;
