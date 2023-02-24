export interface NodesBehavior {
  playBtn: {
    disable: boolean
    highlight: boolean
  }
  stopBtn: { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
    disable: boolean
    highlight: boolean
  }
  messageDiv: {
    highlight: boolean
  }
  optionsIndicator: {
    disable: boolean
    highlight: boolean
  }
  switchOptions: {
    disable: boolean
    highlight: boolean
  }
  switchPiano: {
    disable: boolean
    highlight: boolean
  }
  clefs: {
    highlight: boolean
  }
  vexScore: {
    highlight: boolean
  }
  padsDiv: {
    highlight: boolean
  }
  padGNote: {
    highlight: boolean
  }
  bothOctavesNote: {
    highlight: boolean
  }
};

export const defaultNodesBehavior: NodesBehavior = {
  playBtn: {
    disable: false,
    highlight: false
  },
  stopBtn: { // ("tuto" only)  stopBtn: (remove "tuto-play" & "tuto"),
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

export type NodesBehaviorKeys = keyof NodesBehavior;

interface ChangeNodesBehaviorObj {
  highlight?: boolean
  disable?: boolean
}

export type ChangeNodeBehavior = (
  component: NodesBehaviorKeys,
  value: ChangeNodesBehaviorObj
) => void;
