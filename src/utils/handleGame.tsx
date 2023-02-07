import type { StaveClef, BothClefs } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import { defaultMessage } from "../data/data";
import { createNewStaves, createMobileStaves, createTutoStave, createTutoMobileStave } from "./createStaves";
import renderVFScoreMobile from "./renderVFScoreMobile";
// import Loader from "../components/PlayGame/Loader";

let timer: NodeJS.Timer;
let timerOut: NodeJS.Timeout;
let countdownTimer: NodeJS.Timer;

let isOnPlay: boolean;

let time = 3;

export const hideNotes = (staveType: string, outputNode: HTMLElement | null, gameLength: number, isMobile: boolean) => {
  const children =  outputNode && outputNode.firstElementChild?.children;
  if (isMobile) {
    children && children[1].classList.add("hidden");
  } else {
    if (staveType === "simple") { 
      for (let i=1; i < (gameLength + 1); i++) {        
        children && children[i].classList.add("hidden");
      };
    } else {
      for (let i=2; i < ((gameLength * 2)  + 2); i++) {
        children && children[i].classList.add("hidden");
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
    time = 3;
    handleMessage(stopMsg);
    const staveType = clefSelected === "bothClefs" ? "both" : "simple";
    hideNotes(staveType, outputNode, gameLength, isMobile);
    resetStavesData();
    setTimeout(() => {
      handleMessage(defaultMessage)
    }, 1000);
};

const playMobile = (current: number, clef: string, Treble: StaveClef, Bass: StaveClef, both: BothClefs, levelNum: number, gameLength: number, outputNode: HTMLElement | null) => {
  if (current > gameLength) return;
  if (outputNode) outputNode.innerHTML = "";
  if (clef ==="bothClefs") {
    const staveClef = (both.mobileNotesArray && both.mobileNotesArray[current - 1][0]) as string;
    const note = (both.mobileNotesArray && both.mobileNotesArray[current - 1][1]) as string;
    renderVFScoreMobile(note, staveClef, levelNum);
  } else {
    const notesArray = clef === "treble" ? Treble.notesArray : Bass.notesArray;
    const note = notesArray[current - 1];  
    renderVFScoreMobile(note, clef, levelNum);
  };
};

async function displayNote (current: number, clef: string, outputNode: HTMLElement | null, both: BothClefs ) {
  switch (clef) {
    case "treble": 
    case "bass": outputNode?.firstElementChild?.children[current].classList.remove("hidden");
      break;
    case "bothClefs":
      const noteIndex = both.notesIndex[current - 1]
      outputNode?.firstElementChild?.children[noteIndex].classList.remove("hidden");
     break;
  };
};

export const playGame = (
  gameLength: number,
  intervalTime: number, 
  level: string, 
  levelNum: number,
  clefSelected: string, 
  Treble: StaveClef, 
  Bass: StaveClef, 
  both: BothClefs,
  isMobile: boolean,
  handleMessage: (message: MessageObj) => void,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  changeProgressBarID: (id: string | null) => void,
  padsDiv: HTMLElement,
  vexbox: HTMLElement,
  appNode: HTMLElement | null,
  displayScoreCircle: (score: number) => void,
  outputNode: HTMLElement | null,
  ): void => {
    displayScoreCircle(-1);
    
    let current: number = 1;

    const end = () => timerOut = setTimeout(() => {
      setIsPlaying(false); 
      time = 3;
    }, (500));

    const play = () => {
      if (current > gameLength || isOnPlay === false) { 
        console.log("end of game !");
        changeProgressBarID(null);
        clearInterval(timer);
        isOnPlay = false;
        end();
      };
      padsDiv.classList.remove("disable");
      const callFunc = async () => {
        isMobile ? playMobile(current, clefSelected, Treble, Bass, both, levelNum, gameLength, outputNode) 
        : displayNote(current, clefSelected, outputNode, both);
        changeProgressBarID(current.toString());
      };  
      if (isOnPlay) {
        if (current === gameLength) {
          callFunc()
          .then(() => current ++)
          .then(() => timer = setTimeout(play, intervalTime * 2))  
        }
        callFunc()
        .then(() => current ++)
        .then(() => timer = setTimeout(play, intervalTime))
        // .then(() => timer = setTimeout(play, current === gameLength + 1 ? intervalTime * 2 : intervalTime))
      } else return ;
    };
    
    const countdown = () => {
      if (time < 1) {
        clearTimeout(countdownTimer);
        handleMessage({content: <h4>Let's go !</h4>, className:"countdown"});
        play();
        return;
      }
      padsDiv.classList.add("disable");
      handleMessage({content: <h3>{time.toString()}</h3>, className:"countdown"});
      time--;
      const interval = intervalTime > 1500 ? 1500 : intervalTime;
      countdownTimer = setTimeout(countdown, interval);
    };    

    isOnPlay = true;
    setIsPlaying(true);

    if (isMobile) {
      appNode?.classList.remove("while-correction");
      vexbox.classList.remove("while-correction");
      createMobileStaves(level, Treble, Bass, both, gameLength, outputNode)
      .then(() => setTimeout(countdown));  
    } else {
      createNewStaves(level, levelNum, clefSelected, Treble, Bass, both, gameLength, outputNode)
      .then(() => setTimeout(countdown));  
    };
};

//
/////// Tutorial handle game ---------------------------------------------------------------->

export const playTuto = (
  Treble: StaveClef, 
  isMobile: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  changeProgressBarID: (id: string | null) => void,
  outputNode: HTMLElement | null
) => {
  const gameLength = 5;
  let current = 3;

  const endTutoGame = () => timerOut = setTimeout(() => {
    setIsPlaying(false);
  }, (0));

  const playTutoMobile = (current: number, Treble: StaveClef) => {
    if (current > gameLength) return;
    if (outputNode) outputNode.innerHTML = "";
    const notesArray = Treble.notesArray;
    const note = notesArray[current - 1];  
    renderVFScoreMobile(note, "treble", 1);
  };
  const play = () => {
    if (current > gameLength || isOnPlay === false) { 
      console.log("end of game !");
      clearInterval(timer);
      isOnPlay = false;
      changeProgressBarID(null);
      endTutoGame();
    };
    const callFunc = async () => {
      isMobile ? playTutoMobile(current, Treble) 
      : outputNode?.firstElementChild?.children[current].classList.remove("hidden"); 
        changeProgressBarID(current.toString());
    };
    if (isOnPlay) {
      if (current === 3) {
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
  play();
};

export const createTutoGame = (
  clefSelected: string, 
  Treble: StaveClef, 
  Bass: StaveClef, 
  both: BothClefs,
  isMobile: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  handleMessage: (message: MessageObj) => void,
  vexbox: HTMLElement,
  appNode: HTMLElement | null,
  displayScoreCircle: (score: number) => void,
  outputNode: HTMLElement | null
) => {
  displayScoreCircle(-1);
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

  if (isMobile) {
    vexbox.classList.remove("while-correction");
    appNode?.classList.remove("while-correction");
    createTutoMobileStave(Treble, Bass, both, outputNode);
  } else {
    createTutoStave(clefSelected, Treble, Bass, both, outputNode);
  };
};