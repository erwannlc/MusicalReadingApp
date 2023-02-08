
import { TutoData } from "../../../types/TutoTypes";

const defaultTutoData: TutoData = {
  playBtn: {
    disabled: false,
    isTuto: false
  },
  stopBtn:  { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
    disabled: false,
    isTuto: false 
  }, 
  messageDiv: {
    isTuto: false
  },
  optionsIndicator: {
    disabled: false,
    isTuto: false
  },
  switchOptions: {
    disabled: false,
    isTuto: false
  },
  switchPiano: {
    disabled: false,
    isTuto: false
  },
  clefs: {
    isTuto: false
  },
  vexScore: {
    isTuto: false
  },
  padsDiv: {
    isTuto: false
  },
  padGNote: {
    isTuto: false
  },
  bothOctavesNote: {
    isTuto: false
  }
};

export default defaultTutoData;