import { randomizeInteger } from "./randomizeInteger";
import type { ReadOnlyStaveClef } from "../types/Clefs";
import { tutoPlayData } from "../data/data";

export interface NewStavesData {
  treble: NewClef,
  bass: NewClef,
  both: NewBothData
};
interface NewClef {
  notesArray: string[], solution: string[], notes: string
};
interface NewBothData {
  solution: string[]
  solutionClefs: ("treble" | "bass")[]
  trebleNotesArr: string[] 
  bassNotesArr: string[]
  trebleNotes: string 
  bassNotes: string
  mobileNotesArray: [string, string][]
};

const createRandomBothStavesData = async (i: number, trebleData: NewClef, bassData: NewClef, newBothData: NewBothData) => {
  const trebleRest: string = `G4/q/r[id="treble-n${i}"]`;
  const bassRest: string = `F3/q/r[id="bass-n${i}"]`;
  const singleNoteData: {
    solution: string,
    solutionClef: "treble" | "bass",
    trebleNote: string, 
    bassNote: string, 
    mobileNote: [string, string]
  }  = randomizeInteger(1, 2) === 1 ? {
    solution: trebleData.solution[i-1],
    solutionClef: "treble",
    trebleNote: trebleData.notesArray[i-1], 
    bassNote: bassRest, 
    mobileNote: ["treble", trebleData.notesArray[i -1]]
  } : {
    solution: bassData.solution[i-1], 
    solutionClef: "bass",
    trebleNote: trebleRest, 
    bassNote: bassData.notesArray[i-1],
    mobileNote: ["bass", bassData.notesArray[i -1]]
  };
  newBothData.solution.push(singleNoteData.solution);
  newBothData.solutionClefs.push(singleNoteData.solutionClef);
  newBothData.trebleNotesArr.push(singleNoteData.trebleNote);
  newBothData.bassNotesArr.push(singleNoteData.bassNote);
  newBothData.mobileNotesArray.push(singleNoteData.mobileNote);
};

const generateRandomNote = (i: number, level: string, staveClef: ReadOnlyStaveClef, newClef: {notesArray: string[], solution: string[], notes: string}) => {
  const levelScale = staveClef.levels[level];
  const noteName: string = levelScale[randomizeInteger(0, levelScale.length-1)];
  const noteGenerated: string = noteName + `/q[id="${staveClef.clef}-n${i}"]`;
  if (i > 1 && noteName === newClef.notesArray[i - 2].slice(0, 2)) {   // prevents repeated notes 
    const newScale = levelScale.filter(item => item !== noteName);
    let newNoteName = newScale[randomizeInteger(0, newScale.length-1)];
    const newNote = newNoteName + `/q[id="${staveClef.clef}-n${i}"]`;
    newClef.notesArray.push(newNote);
    const note: string = newNoteName.charAt(0);
    newClef.solution.push(note);
  } else { 
    // console.log(newClef.notesArray);
    newClef.notesArray.push(noteGenerated);
    const note: string = noteName.charAt(0);
    newClef.solution.push(note);
  };
};

const generateNotes = async (
  level: string, 
  trebleData: ReadOnlyStaveClef, 
  bassData:ReadOnlyStaveClef, 
  gameLength: number, 
  newTreble: NewClef, 
  newBass: NewClef, 
  newBothData: NewBothData) => {

  for (let i=1; i<(gameLength + 1); i++) {
    generateRandomNote(i, level, trebleData, newTreble);
    generateRandomNote(i, level, bassData, newBass);
    newTreble.notes = newTreble.notesArray.toString();
    newBass.notes = newBass.notesArray.toString();
    createRandomBothStavesData(i, newTreble, newBass, newBothData);
    newBothData.trebleNotes = newBothData.trebleNotesArr.toString();
    newBothData.bassNotes = newBothData.bassNotesArr.toString();
  };
};

export const createNotes = async (level: string, trebleData: ReadOnlyStaveClef, bassData:ReadOnlyStaveClef, gameLength: number): Promise<NewStavesData> =>  {
  let newTreble: NewClef = {
    notesArray: [],
    solution: [],
    notes: ""
  };
  let newBass: NewClef = {
    notesArray: [],
    solution: [],
    notes : ""
  };
  let newBothData: NewBothData = {
    solution: [], 
    solutionClefs: [],
    trebleNotesArr: [], 
    bassNotesArr: [], 
    trebleNotes: "", 
    bassNotes: "", 
    mobileNotesArray: []
  };  
  let newData: NewStavesData  = {
    treble: newTreble,
    bass: newBass,
    both: newBothData,
  };
  return await generateNotes(level, trebleData, bassData, gameLength, newTreble, newBass, newBothData)
    .then(() => newData);
};

// Create Tutorial's staves :
export const createTutoNotes = async (): Promise<NewStavesData> => {
  let newTreble: NewClef = {
    notesArray: tutoPlayData.trebleNotesArray,
    solution: tutoPlayData.solution,
    notes: tutoPlayData.trebleNotesArray.toString()
  };
  let newBass: NewClef = {
    notesArray: tutoPlayData.bassNotesArray,
    solution: tutoPlayData.solution,
    notes : tutoPlayData.bassNotesArray.toString()
  };
  let newBothData: NewBothData = {
    solution: tutoPlayData.solution, 
    solutionClefs: [],
    trebleNotesArr: tutoPlayData.bothTrebleArray, 
    bassNotesArr: tutoPlayData.bothBassArray, 
    trebleNotes: tutoPlayData.bothTrebleArray.toString(), 
    bassNotes: tutoPlayData.bothBassArray.toString(), 
    mobileNotesArray: tutoPlayData.mobileNotesArray
  };
  let newData: NewStavesData  = {
    treble: newTreble,
    bass: newBass,
    both: newBothData,
  };
  return newData;
};

// const removeNodes = async (outputNode: HTMLElement | null) => {
//    if (outputNode) outputNode.innerHTML = "";
// };

// export const createTutoStave = async (outputNode: HTMLElement | null) => {
//   removeNodes(outputNode)
//   .then(() => createTutoNotes())
//   // .then (() => renderVFScore(clefSelected, trebleData, bassData, 1, 5, bothClefsData))
//   // .then (() => modifyNodes(clefSelected, trebleData, bassData, bothClefsData, 5, outputNode))
// };