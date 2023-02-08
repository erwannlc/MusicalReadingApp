export interface ChangeButton {
  isNextDisabled: boolean
  nextButton: boolean
  prevButton: boolean
  quitButton: boolean
  changeNextToQuit: boolean
};

export type TutoPlayStep = "step1"|"step2" |"step3";

export interface TutoData {
  playBtn: {
    disabled: boolean,
    isTuto: boolean
  },
  stopBtn:  { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
    disabled: boolean,
    isTuto: boolean 
  }, 
  messageDiv: {
    isTuto: boolean
  },
  optionsIndicator: {
    disabled: boolean,
    isTuto: boolean
  },
  switchOptions: {
    disabled: boolean,
    isTuto: boolean
  },
  switchPiano: {
    disabled: boolean,
    isTuto: boolean
  },
  clefs: {
    isTuto: boolean
  },
  vexScore: {
    isTuto: boolean
  },
  padsDiv: {
    isTuto: boolean
  },
  padGNote: {
    isTuto: boolean
  },
  bothOctavesNote: {
    isTuto: boolean
  }
};

export type TutoDataKeys = keyof TutoData;

interface ChangeTutoDataObj {
  isTuto?: boolean, 
  disabled?: boolean
} 

export type ChangeTutoData = (component: TutoDataKeys, value: ChangeTutoDataObj) => void

