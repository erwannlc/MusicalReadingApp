import type { StaveClef, BothClefs } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import renderVFScoreMobile from "./renderVFScoreMobile";
// import Loader from "../components/PlayGame/Loader";

let timer: NodeJS.Timeout;
let timerOut: NodeJS.Timeout;
let countdownTimer: NodeJS.Timeout;

let isOnPlay: boolean;

let countDownTime = 3;

export const stopPlaying = (
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  handleMessage: (message: MessageObj) => void,
  quitGame: () => void,
  changeProgressBar: (id: string | null) => void
) => {
  isOnPlay = false;
  setIsPlaying(false);
  clearTimeout(countdownTimer);
  clearTimeout(timerOut);
  clearTimeout(timer);
  changeProgressBar(null);
  const stopMsg = {
    className: "stop_message",
    content: <h5>Partie stoppée</h5>
  };
  countDownTime = 3;
  handleMessage(stopMsg);
  setTimeout(() => {
    quitGame();
  }, 1000);
};

export const playMobile = (
  current: number,
  clef: string,
  trebleData: StaveClef,
  bassData: StaveClef,
  bothClefsData: BothClefs,
  levelNum: number,
  gameLength: number,
  outputNode: HTMLElement | undefined) => {
  if (current > gameLength) return;
  if (outputNode) outputNode.innerHTML = "";
  if (clef === "bothClefs") {
    const staveClef = (bothClefsData.mobileNotesArray[current - 1][0]);
    const note = (bothClefsData.mobileNotesArray[current - 1][1]);
    renderVFScoreMobile(note, staveClef, levelNum, true);
  } else {
    const notesArray =
      clef === "treble" ? trebleData.notesArray : bassData.notesArray;
    const note = notesArray[current - 1];
    renderVFScoreMobile(note, clef, levelNum, true);
  };
};

export async function displayNote (current: number, clef: string) {
  function displayTrebleNote () {
    document.getElementById(
      `vf-treble-n${current}`
    )?.classList.add("visible");
  };
  function displayBassNote () {
    document.getElementById(
      `vf-bass-n${current}`
    )?.classList.add("visible");
  };
  switch (clef) {
    case "treble":
      displayTrebleNote();
      break;
    case "bass":
      displayBassNote();
      break;
    case "bothClefs":
      displayTrebleNote();
      displayBassNote();
      break;
  };
};

let current: number = 1;

const end = (
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  timerOut = setTimeout(() => {
    setIsPlaying(false);
    countDownTime = 3;
  }, (500));
};

export const manualEnd = (
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  activateCorrection: () => void
) => {
  console.log("end of game !");
  activateCorrection();
  end(setIsPlaying);
  timerOut = setTimeout(() => {
    setIsPlaying(false);
    countDownTime = 3;
  }, (500));
};

export const play = (
  gameLength: number,
  intervalTime: number,
  clefSelected: string,
  trebleData: StaveClef,
  bassData: StaveClef,
  bothClefsData: BothClefs,
  isMobile: boolean,
  changeProgressBarID: (id: string | null) => void,
  enablePiano: () => void,
  activateCorrection: () => void,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  levelNum: number,
  outputNode: HTMLElement | undefined,
  isPlayAuto: boolean
) => {
  const autoPlay = () => {
    if (current > gameLength || !isOnPlay) {
      console.log("end of game !");
      changeProgressBarID(null);
      clearInterval(timer);
      isOnPlay = false;
      activateCorrection();
      end(setIsPlaying);
    };
    enablePiano();
    const callFunc = async () => {
      isMobile
        ? playMobile(
          current,
          clefSelected,
          trebleData,
          bassData,
          bothClefsData,
          levelNum,
          gameLength,
          outputNode)
        : displayNote(current, clefSelected);
      changeProgressBarID(current.toString());
    };
    if (isOnPlay) {
      callFunc()
        .then(() => current++)
        .then(() => {
          timer =
        current > gameLength
          ? setTimeout(autoPlay, intervalTime * 2)
          : setTimeout(autoPlay, intervalTime);
        });
    };
  };
  const manualPlay = () => {
    isMobile
      ? playMobile(
        current,
        clefSelected,
        trebleData,
        bassData,
        bothClefsData,
        levelNum,
        gameLength,
        outputNode)
      : displayNote(current, clefSelected);
  };
  if (isPlayAuto) {
    autoPlay();
  } else {
    manualPlay();
  }
};

export const countdownCall = (
  intervalTime: number,
  handleMessage: (message: MessageObj) => void,
  disablePiano: () => void
) => {
  const countdown = () => {
    if (countDownTime < 1) {
      clearTimeout(countdownTimer);
      handleMessage(
        { content: <h4>Let&apos;s go !</h4>, className: "countdown" }
      );
      // play();
      return;
    }
    disablePiano();
    handleMessage(
      { content: <h3>{countDownTime.toString()}</h3>, className: "countdown" }
    );
    countDownTime--;
    const interval = intervalTime > 1500 ? 1500 : intervalTime;
    countdownTimer = setTimeout(countdown, interval);
  };
  countdown();
};
