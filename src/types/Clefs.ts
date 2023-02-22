export interface StaveClef {
  notesArray: string[]
  notes: string
  solution: string[]
};

export interface BothClefs {
  solution: string[]
  solutionClefs: Array<"treble" | "bass">
  trebleNotes: string // à transmettre à RenderVFScore et displayNotes (afficher les deux en même temps)
  bassNotes: string
  mobileNotesArray: Array<[string, string]>
};

export interface ReadOnlyStaveClef {
  readonly clef: string
  readonly levels: ClefLevels
}

export type ClefLevels = Record<string, string[]>; ;

export type ClefSelected = "treble" | "bass" | "bothClefs";

export type ClefsClassName = {
  [key in ClefSelected]: string
};
