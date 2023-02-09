import { randomizeInteger } from "./randomizeInteger";
import type { StaveClef, BothClefs } from "../types/Clefs";
import renderVFScore from "./renderVFScore";
import { modifyNodes, createBothMobileData } from "./handleGameData";
import { tutoPlayData } from "../data/data";

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

const generateNotes = async (level: string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, gameLength: number) => {
  trebleData.notesArray = [];
  bassData.notesArray = [];
  trebleData.solution = [];
  bassData.solution = [];
  bothClefsData.solution = [];
  bothClefsData.notesIndex = [];
  for (let i=1; i<(gameLength + 1); i++) {
    generateRandomNote(i, level, trebleData);
    generateRandomNote(i, level, bassData);
    trebleData.notes = trebleData.notesArray.toString();
    bassData.notes = bassData.notesArray.toString();
  };
};

export const createNotes = async (level: string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, gameLength: number) =>  {
  try {
    await generateNotes(level, trebleData, bassData, bothClefsData, gameLength);
  }
  catch (error) {
    console.error(`A problem occurs: ${error}`);
  };
};

const removeNodes = async (outputNode: HTMLElement | null) => {
  if (outputNode) outputNode.innerHTML = "";
};

export const createStaves = async (level: string, levelNum: number, clefSelected:string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  createNotes(level, trebleData, bassData, bothClefsData, gameLength)
  .then (() => renderVFScore(clefSelected, trebleData, bassData, levelNum, gameLength))
  .then (() => modifyNodes(clefSelected, trebleData, bassData, bothClefsData, gameLength, outputNode))
};

export const createMobileStaves = async (level: string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, gameLength: number, outputMobileNode: HTMLElement | null) => {
  removeNodes(outputMobileNode)
  .then(() => createNotes(level, trebleData, bassData, bothClefsData, gameLength))
  .then(() => createBothMobileData(bothClefsData, trebleData, bassData, gameLength))
};

export const createNewStaves = async(level: string, levelNum: number, clefSelected:string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, gameLength: number, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createStaves(level, levelNum, clefSelected, trebleData, bassData, bothClefsData, gameLength, outputNode))
};

// Create Tutorial's staves :
const createTutoNotes = async (trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs) => {
  trebleData.notesArray = tutoPlayData.trebleNotesArray;
  bassData.notesArray = tutoPlayData.bassNotesArray;
  trebleData.solution = tutoPlayData.solution;
  bassData.solution = tutoPlayData.solution;
  bothClefsData.solution = [];
  trebleData.notes = trebleData.notesArray.toString();
  bassData.notes = bassData.notesArray.toString();
};

export const createTutoStave = async(clefSelected:string, trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createTutoNotes(trebleData, bassData, bothClefsData))
  .then (() => renderVFScore(clefSelected, trebleData, bassData, 1, 5))
  .then (() => modifyNodes(clefSelected, trebleData, bassData, bothClefsData, 5, outputNode))
};
export const createTutoMobileStave = async(trebleData: StaveClef, bassData:StaveClef, bothClefsData:BothClefs, outputNode: HTMLElement | null) => {
  removeNodes(outputNode)
  .then(() => createTutoNotes(trebleData, bassData, bothClefsData))
  .then(() => createBothMobileData(bothClefsData, trebleData, bassData, 5))
};