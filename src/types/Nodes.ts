import type { NodeObj } from "../utils/Hooks/useClientRect";
import type { NodesBehaviorKeys } from "./NodesBehavior";

export type HighLights = NodesBehaviorKeys;
export type Disabling = NodesBehaviorKeys[];

export type Nodes = {
  [key in NodesKeys]?: NodeObj;
};

export interface NodesType {
  playBtn: HTMLElement
  stopBtn: HTMLElement
  switchOptions: HTMLElement
  messageDiv: HTMLElement
  optionsIndicator: HTMLElement
  switchPiano: HTMLElement
  vexScore: HTMLElement
  vexScoreMobile: HTMLElement
  vexScoreOutput: HTMLElement
  vexScoreMobileOutput: HTMLElement
  padsDiv: HTMLElement
  clefs: HTMLElement
  piano: HTMLUListElement
  note1: HTMLLIElement
  note2: HTMLLIElement
  padGNote: HTMLElement
}
export type NodesKeys = keyof NodesType;
