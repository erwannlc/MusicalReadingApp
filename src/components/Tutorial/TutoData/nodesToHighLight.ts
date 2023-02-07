import { NodeObj } from "../../../utils/Hooks/useClientRect";

export type HighLights = "playBtn" | "stopBtn" | "switchOptions" | "messageDiv" | 
"optionsIndicator" | "switchPiano" | "vexScore" | "vexScoreMobile" | "vexScoreOutput" | "vexScoreMobileOutput" | "padsDiv" | "clefs" | "piano" | "note1" | "note2" | "padGNote";

export type Nodes = {
  [key in NodesKeys]: NodeObj;
};;

export type NodesType = {
  playBtn: HTMLElement,
  stopBtn: HTMLElement,
  switchOptions: HTMLElement,
  messageDiv: HTMLElement,
  optionsIndicator: HTMLElement,
  switchPiano: HTMLElement,
  vexScore: HTMLElement,
  vexScoreMobile: HTMLElement,
  vexScoreOutput: HTMLElement,
  vexScoreMobileOutput: HTMLElement,
  padsDiv: HTMLElement,
  clefs: HTMLElement,
  piano: HTMLUListElement,
  note1: HTMLLIElement,
  note2: HTMLLIElement,
  padGNote: HTMLElement
}; 
export type NodesKeys = keyof NodesType;


