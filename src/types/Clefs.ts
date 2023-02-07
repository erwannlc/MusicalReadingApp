export interface StaveClef {
  clef: string
  levels: ClefLevels
  notesArray: string[]
  notes: string
  solution: string[]
};

export interface BothClefs {
  solution: string[]
  notesIndex: number[]
  mobileNotesArray?: [[string, string]]
};

export interface ClefLevels {
  [index: string]: string[]
};

export type ClefSelected = "treble" | "bass" | "bothClefs";

export type ClefsClassName = {
  [key in ClefSelected]: string
};