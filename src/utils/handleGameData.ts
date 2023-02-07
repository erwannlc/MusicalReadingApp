import { randomizeInteger } from "./randomizeInteger";
import { StaveClef, BothClefs } from "../types/Clefs";


const createStaveNodeData = async (i: number, type: StaveClef, outputNode: HTMLElement | null) => {
  const noteNode = outputNode?.firstElementChild?.children[i] as HTMLElement;
  noteNode?.classList.add("hidden");
};

const createBothStavesData = async (i: number, both: BothClefs, Treble: StaveClef, Bass: StaveClef) => {
  const bothStavesData  = randomizeInteger(1, 2) === 1 ? {solution: Treble.solution, n: (i + 1)} : {solution: Bass.solution, n: (i + 13)};
  const note = bothStavesData.solution[i-1];
  const noteIndex = bothStavesData.n;
  both.solution.push(note);
  both.notesIndex.push(noteIndex);
};

const modifyNode = async (clef: StaveClef, gameLength: number, outputNode: HTMLElement | null) => {
  for (let i=1; i<(gameLength + 1); i++) {
    await createStaveNodeData(i, clef, outputNode);
  };
};

const modifyBothNode = (both: BothClefs, Treble: StaveClef, Bass: StaveClef, gameLength: number, outputNode: HTMLElement | null) => {
  for (let i=1; i<(gameLength + 1); i++) {
    const trebleIndex = i + 1;
    const bassIndex = i + (gameLength + 1);
      createStaveNodeData(trebleIndex, Treble, outputNode)
      .then (() => createStaveNodeData(bassIndex, Bass, outputNode))
      .then (() => createBothStavesData(i, both, Treble, Bass))
    };
};

export const modifyNodes = (clefSelected: string, Treble: StaveClef, Bass: StaveClef, both: BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  return clefSelected === "treble" ? modifyNode(Treble, gameLength, outputNode) 
   : clefSelected === "bass" ? modifyNode(Bass, gameLength, outputNode)
   : clefSelected === "bothClefs" ? (modifyBothNode(both, Treble, Bass, gameLength, outputNode))
   : null;   
};


export const createBothMobileData = (both: BothClefs, Treble: StaveClef, Bass: StaveClef, gameLength: number) => {
  for (let i=1; i<(gameLength + 1); i++) {
    const staveClef = randomizeInteger(1, 2) === 1 ? Treble : Bass;
    const noteGenerated: [string, string] = [staveClef.clef, staveClef.notesArray[i-1]];
    i === 1 ? both.mobileNotesArray=[noteGenerated] : both.mobileNotesArray && both.mobileNotesArray.push(noteGenerated);
    const note = staveClef.solution[i-1];
    both.solution.push(note);
  };
};