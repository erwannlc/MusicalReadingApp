export interface ChangeButton {
  isNextDisabled: boolean
  nextButton: boolean
  prevButton: boolean
  quitButton: boolean
  changeNextToQuit: boolean
};

export type TutoPlayStep = "step1"|"step2" |"step3";

export interface NodesBehavior {
  playBtn: {
    disable: boolean,
    highlight: boolean
  },
  stopBtn:  { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
    disable: boolean,
    highlight: boolean 
  }, 
  messageDiv: {
    highlight: boolean
  },
  optionsIndicator: {
    disable: boolean,
    highlight: boolean
  },
  switchOptions: {
    disable: boolean,
    highlight: boolean
  },
  switchPiano: {
    disable: boolean,
    highlight: boolean
  },
  clefs: {
    highlight: boolean
  },
  vexScore: {
    highlight: boolean
  },
  padsDiv: {
    highlight: boolean
  },
  padGNote: {
    highlight: boolean
  },
  bothOctavesNote: {
    highlight: boolean
  }
};

export type NodesBehaviorKeys = keyof NodesBehavior;

interface ChangeNodesBehaviorObj {
  highlight?: boolean, 
  disable?: boolean
} 

export type ChangeNodeBehavior = (component: NodesBehaviorKeys, value: ChangeNodesBehaviorObj) => void

