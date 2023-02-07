import { randomizeInteger } from "./randomizeInteger";
import type { StaveClef, BothClefs } from "../types/Clefs";
import renderVFScore from "./renderVFScore";
import { modifyNodes, createBothMobileData } from "./handleGameData";
import { tutoData } from "../data/data";

const generateRandomNote = (i: number, level: string, staveClef: StaveClef) => {
  const levelScale = staveClef.levels[level];
  const noteName: string = levelScale[randomizeInteger(0, levelScale.length-1)];
  const noteGenerated: string = noteName + `/q[id="${staveClef.clef}-n${i}"]`;
  if (i > 1 && noteName === staveClef.notesArray[i - 2].slice(0, 2)) {   // prevents repeated notes 
    const newScale = levelScale.filter(item => item !== noteName);
    let newNoteName = newScale[randomizeInteger(0, newScale.length-1)];
    const newNote = newNoteName + `/q[id="${staveClef.clef}-n${i}"]`;
    staveClef.notesArray.push(newNote);
    const note: string = newNoteName.charAt(0);
    staveClef.solution.push(note);
  } else { 
    staveClef.notesArray.push(noteGenerated);
    const note: string = noteName.charAt(0);
    staveClef.solution.push(note);
  };
};

const generateNotes = async (level: string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, gameLength: number) => {
  Treble.notesArray = [];
  Bass.notesArray = [];
  Treble.solution = [];
  Bass.solution = [];
  both.solution = [];
  both.notesIndex = [];
  for (let i=1; i<(gameLength + 1); i++) {
    generateRandomNote(i, level, Treble);
    generateRandomNote(i, level, Bass);
    Treble.notes = Treble.notesArray.toString();
    Bass.notes = Bass.notesArray.toString();
  };
};

export const createNotes = async (level: string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, gameLength: number) =>  {
  try {
    await generateNotes(level, Treble, Bass, both, gameLength);
  }
  catch (error) {
    console.error(`A problem occurs: ${error}`);
  };
};

const removeNodes = async (outputNode: HTMLElement | null) => {
  if (outputNode) outputNode.innerHTML = "";
};

export const createStaves = async (level: string, levelNum: number, clefSelected:string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  createNotes(level, Treble, Bass, both, gameLength)
  .then (() => renderVFScore(clefSelected, Treble, Bass, levelNum, gameLength))
  .then (() => modifyNodes(clefSelected, Treble, Bass, both, gameLength, outputNode))
};

export const createMobileStaves = async (level: string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, gameLength: number, outputMobileNode: HTMLElement | null) => {
  removeNodes(outputMobileNode)
  .then(() => createNotes(level, Treble, Bass, both, gameLength))
  .then(() => createBothMobileData(both, Treble, Bass, gameLength))
};

export const createNewStaves = async(level: string, levelNum: number, clefSelected:string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createStaves(level, levelNum, clefSelected, Treble, Bass, both, gameLength, outputNode))
};

// Create Tutorial's staves :
const createTutoNotes = async (Treble: StaveClef, Bass:StaveClef, both:BothClefs) => {
  Treble.notesArray = tutoData.trebleNotesArray;
  Bass.notesArray = tutoData.bassNotesArray;
  Treble.solution = tutoData.solution;
  Bass.solution = tutoData.solution;
  both.solution = [];
  Treble.notes = Treble.notesArray.toString();
  Bass.notes = Bass.notesArray.toString();
};

export const createTutoStave = async(clefSelected:string, Treble: StaveClef, Bass:StaveClef, both:BothClefs, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createTutoNotes(Treble, Bass, both))
  .then (() => renderVFScore(clefSelected, Treble, Bass, 1, 5))
  .then (() => modifyNodes(clefSelected, Treble, Bass, both, 5, outputNode))
};
export const createTutoMobileStave = async(Treble: StaveClef, Bass:StaveClef, both:BothClefs, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createTutoNotes(Treble, Bass, both))
  .then(() => createBothMobileData(both, Treble, Bass, 5))
};