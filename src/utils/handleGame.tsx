import type { StaveClef, BothClefs } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import { defaultMessage } from "../data/data";
import renderVFScoreMobile from "./renderVFScoreMobile";
// import Loader from "../components/PlayGame/Loader";

let timer: NodeJS.Timer;
let timerOut: NodeJS.Timeout;
let countdownTimer: NodeJS.Timer;

let isOnPlay: boolean;

let countDownTime = 3;

export const hideNotes = (staveType: string, outputNode: HTMLElement | null, gameLength: number, isMobile: boolean) => {
  // console.log("hidingNotes (w/ hideNotes in handleGame)")
  const children =  outputNode && outputNode.firstElementChild?.children;
  if (isMobile) {
    // children && children[4].classList.add("hidden");
    children && children[4].classList.remove("visible");
  } else {
    if (staveType === "simple") { 
      for (let i=4; i < (gameLength + 1); i++) {        
        // children && children[i].classList.add("hidden");
        children && children[i].classList.remove("visible");
      };
    } else {
      for (let i=6; i < ((gameLength * 2) + 2); i++) {
        // children && children[i].classList.add("hidden");
        children && children[i].classList.remove("visible");
      };
    };
  };
};

export const stopPlaying = (
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  handleMessage: (message: MessageObj) => void,
  resetStavesData: () => void,
  changeProgressBar: (id: string | null) => void,
  clefSelected: string,
  outputNode: HTMLElement | null,
  gameLength: number,
  isMobile: boolean
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
    // console.log("stopPlaying")
    countDownTime = 3;
    handleMessage(stopMsg);
    const staveType = clefSelected === "bothClefs" ? "both" : "simple";
    hideNotes(staveType, outputNode, gameLength, isMobile);
    resetStavesData();
    setTimeout(() => {
      handleMessage(defaultMessage)
    }, 1000);
};

const playMobile = (current: number, clef: string, trebleData: StaveClef, bassData: StaveClef, bothClefsData: BothClefs, levelNum: number, gameLength: number, outputNode: HTMLElement | null) => {
  if (current > gameLength) return;
  if (outputNode) outputNode.innerHTML = "";
  if (clef ==="bothClefs") {
    const staveClef = (bothClefsData.mobileNotesArray[current - 1][0]) as string;
    const note = (bothClefsData.mobileNotesArray[current - 1][1]) as string;
    renderVFScoreMobile(note, staveClef, levelNum);
  } else {
    const notesArray = clef === "treble" ? trebleData.notesArray : bassData.notesArray;
    const note = notesArray[current - 1];  
    renderVFScoreMobile(note, clef, levelNum);
  };
};

async function displayNote (current: number, clef: string) {
  switch (clef) {
    case "treble": 
      document.getElementById(`vf-treble-n${current}`)?.classList.add("visible");
      break;
    case "bass": 
      document.getElementById(`vf-bass-n${current}`)?.classList.add("visible");
      break;
    case "bothClefs":
      document.getElementById(`vf-treble-n${current}`)?.classList.add("visible");
      document.getElementById(`vf-bass-n${current}`)?.classList.add("visible");
     break;
  };
};

export const playGame = (
  gameLength: number,
  intervalTime: number, 
  level: string, 
  levelNum: number,
  clefSelected: string, 
  trebleData: StaveClef, 
  bassData: StaveClef, 
  bothClefsData: BothClefs,
  isMobile: boolean,
  handleMessage: (message: MessageObj) => void,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  changeProgressBarID: (id: string | null) => void,
  displayScoreCircle: (score: number) => void,
  outputNode: HTMLElement | null,
  enablePiano: () => void,
  disablePiano: () => void,
  activateCorrection: () => void
  ): void => {
    displayScoreCircle(-1);
    
    let current: number = 1;

    const end = () => timerOut = setTimeout(() => {
      setIsPlaying(false); 
      countDownTime = 3;
    }, (500));

    const play = () => {
      if (current > gameLength || isOnPlay === false) { 
        console.log("end of game !");
        changeProgressBarID(null);
        clearInterval(timer);
        isOnPlay = false;
        activateCorrection();
        if (isMobile && outputNode) outputNode.innerHTML = "";
        end();
      };
      enablePiano();
      const callFunc = async () => {
        isMobile ? playMobile(current, clefSelected, trebleData, bassData, bothClefsData, levelNum, gameLength, outputNode) 
        : displayNote(current, clefSelected);
        changeProgressBarID(current.toString());
      };  
      if (isOnPlay) {
        callFunc()
        .then(() => current ++)
        .then(() => timer = current === gameLength ? setTimeout(play, intervalTime * 2) : setTimeout(play, intervalTime));
      } else return ;
    };
    
    const countdown = () => {
      if (countDownTime < 1) {
        clearTimeout(countdownTimer);
        handleMessage({content: <h4>Let's go !</h4>, className:"countdown"});
        play();
        return;
      }
      disablePiano();
      handleMessage({content: <h3>{countDownTime.toString()}</h3>, className:"countdown"});
      countDownTime--;
      const interval = intervalTime > 1500 ? 1500 : intervalTime;
      countdownTimer = setTimeout(countdown, interval);
    };

    isOnPlay = true;
    setIsPlaying(true);
    countdown();  
};

//
/////// Tutorial handle game ---------------------------------------------------------------->

export const playTutoGame = (
  handleMessage: (message: MessageObj) => void,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  changeProgressBarID: (id: string | null) => void,
  activateCorrection: () => void
  // displayScoreCircle: (score: number) => void,
) => {
  // displayScoreCircle(-1);
  const gameLength = 5;
  let current = 3;

  const endTutoGame = () => timerOut = setTimeout(() => {
    setIsPlaying(false);
  }, (0));

  const play = () => {
    if (current > gameLength || isOnPlay === false) { 
      console.log("end of game !");
      clearInterval(timer);
      isOnPlay = false;
      changeProgressBarID(null);
      endTutoGame();
      activateCorrection();
    };
    const callFunc = async () => {
      // : outputNode?.firstElementChild?.children[current].classList.remove("hidden"); 
      document.getElementById(`vf-treble-n${current}`)?.classList.add("visible");
      changeProgressBarID(current.toString());
    };
    if (isOnPlay) {
      if (current === 3) { // begins
        new Promise(resolve => setTimeout(resolve, 800))
          .then(() => callFunc())
          .then(() => current ++)
          .then(() => timer = setTimeout(() => play(), 4500))
      } else 
        callFunc()
          .then(() => current ++)
          .then(() => timer = setTimeout(() => play(), 4500))
      } else return;
  };

  isOnPlay = true;
  setIsPlaying(true);
  const msg = { 
    className: "default",
    content: 
    <>
      <h5>La partie Tutoriel est lancée !</h5>
    </>
  };
  handleMessage(msg);
  play();
};

// export const createTutoGame = (
//   setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
//   handleMessage: (message: MessageObj) => void,
//   displayScoreCircle: (score: number) => void,
//   outputNode: HTMLElement | null
// ) => {
//   displayScoreCircle(-1);
//   isOnPlay = true;
//   setIsPlaying(true);
//   const msg = { 
//     className: "default",
//     content: 
//     <>
//       <h5>La partie Tutoriel est lancée !</h5>
//     </>
//   };
//   handleMessage(msg);
//   // createTutoStave(outputNode);
// };