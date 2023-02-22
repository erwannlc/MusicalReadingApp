import type { PianoKeys, NotesClassN } from "../types/PianoKeys";

export const azertyKeys: PianoKeys = {
  Q: { id: "C", note: "C", octaveOffset: 0, classN: "white" },
  Z: { id: "C#", note: "C#", octaveOffset: 0, classN: "black" },
  S: { id: "D", note: "D", octaveOffset: 0, classN: "white offset" },
  E: { id: "D#", note: "D#", octaveOffset: 0, classN: "black" },
  D: { id: "E", note: "E", octaveOffset: 0, classN: "white offset" },
  F: { id: "F", note: "F", octaveOffset: 0, classN: "white" },
  T: { id: "F#", note: "F#", octaveOffset: 0, classN: "black" },
  G: { id: "G", note: "G", octaveOffset: 0, classN: "white offset" },
  Y: { id: "G#", note: "G#", octaveOffset: 0, classN: "black" },
  H: { id: "A", note: "A", octaveOffset: 1, classN: "white offset" },
  U: { id: "A#", note: "A#", octaveOffset: 1, classN: "black" },
  J: { id: "B", note: "B", octaveOffset: 1, classN: "white offset" },
  K: { id: "C2", note: "C", octaveOffset: 1, classN: "white" },
  O: { id: "C#2", note: "C#", octaveOffset: 1, classN: "black" },
  L: { id: "D2", note: "D", octaveOffset: 1, classN: "white offset" },
  P: { id: "D#2", note: "D#", octaveOffset: 1, classN: "black" },
  M: { id: "E2", note: "E", octaveOffset: 1, classN: "white offset" }
};
export const mobileKeys: PianoKeys = {
  C: { note: "C", octaveOffset: 0, classN: "white" },
  "C#": { note: "C#", octaveOffset: 0, classN: "black" },
  D: { note: "D", octaveOffset: 0, classN: "white offset" },
  "D#": { note: "D#", octaveOffset: 0, classN: "black" },
  E: { note: "E", octaveOffset: 0, classN: "white offset" },
  F: { note: "F", octaveOffset: 0, classN: "white" },
  "F#": { note: "F#", octaveOffset: 0, classN: "black" },
  G: { note: "G", octaveOffset: 0, classN: "white offset" },
  "G#": { note: "G#", octaveOffset: 0, classN: "black" },
  A: { note: "A", octaveOffset: 1, classN: "white offset" },
  "A#": { note: "A#", octaveOffset: 1, classN: "black" },
  B: { note: "B", octaveOffset: 1, classN: "white offset" },
  C2: { note: "C", octaveOffset: 1, classN: "white" },
  "C#2": { note: "C#", octaveOffset: 1, classN: "black" },
  D2: { note: "D", octaveOffset: 1, classN: "white offset" },
  "D#2": { note: "D#", octaveOffset: 1, classN: "black" },
  E2: { note: "E", octaveOffset: 1, classN: "white offset" }
};

export const defaultMobileClassN: NotesClassN = {
  C: "white",
  "C#": "black",
  D: "white offset",
  "D#": "black",
  E: "white offset",
  F: "white",
  "F#": "black",
  G: "white offset",
  "G#": "black",
  A: "white offset",
  "A#": "black",
  B: "white offset",
  C2: "white",
  "C#2": "black",
  D2: "white offset",
  "D#2": "black",
  E2: "white offset"
};
export const defaultClassN: NotesClassN = {
  Q: "white",
  Z: "black",
  S: "white offset",
  E: "black",
  D: "white offset",
  F: "white",
  T: "black",
  G: "white offset",
  Y: "black",
  H: "white offset",
  U: "black",
  J: "white offset",
  K: "white",
  O: "black",
  L: "white offset",
  P: "black",
  M: "white offset"
};
