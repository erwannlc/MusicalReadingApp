export interface StaveClef {
  notesArray: string[]
  notes: string
  solution: string[]
};

export interface BothClefs {
  solution: string[]
  solutionClefs: ("treble" | "bass")[]
  trebleNotes: string // à transmettre à RenderVFScore et displayNotes (afficher les deux en même temps)
  bassNotes: string
  mobileNotesArray: [string, string][]
};

export interface ReadOnlyStaveClef {
  readonly clef: string
  readonly levels: ClefLevels
}

export interface ClefLevels {
  [index: string]: string[]
};

export type ClefSelected = "treble" | "bass" | "bothClefs";

export type ClefsClassName = {
  [key in ClefSelected]: string
};