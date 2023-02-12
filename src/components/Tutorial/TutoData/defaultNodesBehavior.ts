
import { NodesBehavior } from "../../../types/TutoTypes";

const defaultNodesBehavior: NodesBehavior = {
  playBtn: {
    disable: false,
    highlight: false
  },
  stopBtn:  { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
    disable: false,
    highlight: false 
  }, 
  messageDiv: {
    highlight: false
  },
  optionsIndicator: {
    disable: false,
    highlight: false
  },
  switchOptions: {
    disable: false,
    highlight: false
  },
  switchPiano: {
    disable: false,
    highlight: false
  },
  clefs: {
    highlight: false
  },
  vexScore: {
    highlight: false
  },
  padsDiv: {
    highlight: false
  },
  padGNote: {
    highlight: false
  },
  bothOctavesNote: {
    highlight: false
  }
};

export default defaultNodesBehavior;