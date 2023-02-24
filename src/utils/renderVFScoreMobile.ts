import { Vex } from "vexflow";

const renderVFScoreMobile = (
  note: string,
  clef: string,
  level: number,
  isPlayOn: boolean
) => {
  const containerWidth = 140;
  const containerHeight = 180;
  const staveWidth = 90;
  const staveX = 25;
  const staveY = clef === "bass"
    ? 20
    : (level > 5 ? 60 : level > 4 ? 50 : level > 3 ? 40 : 30);

  document.documentElement.style.setProperty(
    "--vexflow_height", `${containerHeight}px`
  );
  document.documentElement.style.setProperty(
    "--notes-visibility", `${isPlayOn ? "visible" : "hidden"}`
  );

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
