/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export interface NotesClassN {
  [index: string]: string
}
export interface PianoKeys {
  [index: string]: {
    id?: string
    note: string
    octaveOffset: number
    classN: string
  }
}
