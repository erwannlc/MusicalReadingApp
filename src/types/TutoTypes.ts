export interface ChangeButton {
  isNextDisabled: boolean
  nextButton: boolean
  prevButton: boolean
  quitButton: boolean
  changeNextToQuit: boolean
};

export type TutoPlayStep = "step1"|"step2" |"step3";