import type { StaveClef, BothClefs, ClefSelected } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";

export const scaleA: {[key: string]: string} = {"A": "la", "B": "si", "C": "do", "D": "ré", "E": "mi", "F": "fa", "G": "sol"};
export const scaleC: [string, string][] = [["C", "do"], ["D", "ré"], ["E", "mi"], ["F", "fa"], ["G", "sol"], ["A", "la"], ["B", "si"]];


export const defaultOptions = { // defaultOptions are actually set by Options > Tempo, Levels etc.
  intervalTime: 2200, //time in ms between notes appearance
  tempoNum: 5,
  level: "level2",
  levelNum: 2,
  clefSelected: "treble" as ClefSelected
};

export const defaultMessage: MessageObj = {
  className: "default",
  content: 
  <>
    <p>Appuyez sur&nbsp; <span style={{fontSize:"140%", verticalAlign: "middle"}}>&#x2699;&#xfe0e;</span> &nbsp;pour afficher les options</p>
    <p>Appuyez sur&nbsp; <span style={{fontSize:"110%", verticalAlign: "middle"}}>&#x25B6;&#xfe0e;</span> &nbsp;pour lancer une partie !</p>
  </>
};

export const treble: StaveClef = {
  clef: "treble",
  levels: { 
    level1: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"], 
    // level1: ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"], 
    level2: ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5"], 
    level3: ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6"], 
    level4: ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7"], 
    level5: ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7", "D7", "E7", "F7", "G7"], 
    level6: ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6", "B6", "C7", "D7", "E7", "F7", "G7", "A7", "B7", "C8"], 
  }, 
  notesArray: [],
  notes: "",
  solution: []
};

export const bass: StaveClef = {
  clef: "bass",
  levels: {
    level1: ["F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3"], 
    level2: ["D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3"], 
    level3: ["B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"], 
    level4: ["G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4"], 
    level5: ["C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4"], 
    level6: ["A0", "B0", "C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4"], 
  },  
  notesArray: [],
  notes: "",
  solution: []
};

export const bothClefs: BothClefs = { solution: [], notesIndex: []};

export const tutoData = {
  trebleNotesArray: ["G4/q[id=\"treble-n1\"]", "C4/q[id=\"treble-n2\"]", "D4/q[id=\"treble-n3\"]", "A4/q[id=\"treble-n4\"]", "C5/q[id=\"treble-n5\"]"],
  bassNotesArray: ["G2/q[id=\"bass-n1\"]", "C3/q[id=\"bass-n2\"]", "D3/q[id=\"bass-n3\"]", "A2/q[id=\"bass-n4\"]", "C3/q[id=\"bass-n5\"]"],
  solution: ["G", "C", "D", "A", "C"],  
};