import { randomizeInteger } from "./randomizeInteger";
import { StaveClef, BothClefs } from "../types/Clefs";


const createStaveNodeData = async (i: number, type: StaveClef, outputNode: HTMLElement | null) => {
  const noteNode = outputNode?.firstElementChild?.children[i] as HTMLElement;
  noteNode?.classList.add("hidden");
};

const createBothStavesData = async (i: number, bothClefsData: BothClefs, trebleData: StaveClef, bassData: StaveClef) => {
  const bothStavesData  = randomizeInteger(1, 2) === 1 ? {solution: trebleData.solution, n: (i + 1)} : {solution: bassData.solution, n: (i + 13)};
  const note = bothStavesData.solution[i-1];
  const noteIndex = bothStavesData.n;
  bothClefsData.solution.push(note);
  bothClefsData.notesIndex.push(noteIndex);
};

const modifyNode = async (clef: StaveClef, gameLength: number, outputNode: HTMLElement | null) => {
  for (let i=1; i<(gameLength + 1); i++) {
    await createStaveNodeData(i, clef, outputNode);
  };
};

const modifyBothNode = (bothClefsData: BothClefs, trebleData: StaveClef, bassData: StaveClef, gameLength: number, outputNode: HTMLElement | null) => {
  for (let i=1; i<(gameLength + 1); i++) {
    const trebleIndex = i + 1;
    const bassIndex = i + (gameLength + 1);
      createStaveNodeData(trebleIndex, trebleData, outputNode)
      .then (() => createStaveNodeData(bassIndex, bassData, outputNode))
      .then (() => createBothStavesData(i, bothClefsData, trebleData, bassData))
    };
};

export const modifyNodes = (clefSelected: string, trebleData: StaveClef, bassData: StaveClef, bothClefsData: BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  return clefSelected === "treble" ? modifyNode(trebleData, gameLength, outputNode) 
   : clefSelected === "bass" ? modifyNode(bassData, gameLength, outputNode)
   : clefSelected === "bothClefs" ? (modifyBothNode(bothClefsData, trebleData, bassData, gameLength, outputNode))
   : null;   
};


export const createBothMobileData = (bothClefsData: BothClefs, trebleData: StaveClef, bassData: StaveClef, gameLength: number) => {
  for (let i=1; i<(gameLength + 1); i++) {
    const staveClef = randomizeInteger(1, 2) === 1 ? trebleData : bassData;
    const noteGenerated: [string, string] = [staveClef.clef, staveClef.notesArray[i-1]];
    i === 1 ? bothClefsData.mobileNotesArray=[noteGenerated] : bothClefsData.mobileNotesArray && bothClefsData.mobileNotesArray.push(noteGenerated);
    const note = staveClef.solution[i-1];
    bothClefsData.solution.push(note);
  };
};