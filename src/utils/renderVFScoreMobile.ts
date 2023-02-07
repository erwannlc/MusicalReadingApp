import { Vex } from "vexflow";

export const renderVFEmptyStave = async (clef: string) => {
  const containerWidth = 140;
  const containerHeight = 180;
  document.documentElement.style.setProperty("--vexflow_height", `${containerHeight}px`);
    const VF = Vex.Flow;
    const vf = new VF.Factory({
      renderer: {elementId: "outputMobile", width: containerWidth, height: containerHeight}
    });
    vf.draw();
};

const renderVFSCoreMobile = (note: string, clef: string, level: number) => {
  const containerWidth = 140;
  const containerHeight = 180;
  const staveWidth = 90;
  const stave_x = 25;
  const stave_y = clef === "bass" ? 20 :
  (level > 5 ? 60 : level > 4 ? 50 : level > 3 ? 40 : 30);

  document.documentElement.style.setProperty("--vexflow_height", `${containerHeight}px`);

    const VF = Vex.Flow;
    const vf = new VF.Factory({
      renderer: {elementId: "outputMobile", width: containerWidth, height: containerHeight}
    });
    const system = vf.System({width: staveWidth, x: stave_x, y: stave_y} );
    const score = vf.EasyScore();

    system.addStave({
      voices: [
        score.voice(score.notes(note, {clef: clef}),
        {time: "1/4"}),
      ]
    }).addClef(clef);

    vf.draw();
};

export default renderVFSCoreMobile;