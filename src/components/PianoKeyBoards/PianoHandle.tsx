import { FC, useCallback, useEffect, useState } from "react";
import Pads from "./Pads";
import Piano from "./Piano";
import AnswersMsg from "../GameMessages/AnswersMsg";
import { defaultMessage } from "../../data/data";
import type { StaveClef, BothClefs, ClefSelected } from "../../types/Clefs";
import type { MessageObj } from "../../types/MessageObj";
import type { Args } from "../../types/HandleAnswersArgs";
import type { NodesKeys, Nodes } from "../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import type { NodesBehavior } from "../../types/TutoTypes";
import { handleAnswers, handleError } from "../../utils/handleAnswers";
import "./piano-handle.scss";


interface Props {
  isPlaying: boolean
  scaleA: {[key: string]: string}
  clefSelected: ClefSelected
  trebleData: StaveClef 
  bassData: StaveClef 
  bothClefsData: BothClefs
  handleMessage: (message: MessageObj) => void
  displayPiano: boolean
  isGameStopped: boolean
  isMobile: boolean
  gameLength: number
  displayScoreCircle: (score: number) => void
  isTutoOn: boolean
  tutoPlay: {isActive: boolean, answer: string}
  stopTutoPlay: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodes: Nodes
  nodesBehavior: NodesBehavior
  activateCorrection: () => void
  deactivateCorrection: () => void
  isPianoActive: boolean
  isCorrection: boolean
};

//state machine
const ENTERING = 1;
const QUITGAME = 2;
const NOGAME = 3;

const PianoHandle: FC<Props> = (props) => {
  const {isPlaying, scaleA, clefSelected, trebleData, bassData, bothClefsData, 
    handleMessage, displayPiano, isGameStopped, isMobile, 
    gameLength, displayScoreCircle, isTutoOn, tutoPlay, stopTutoPlay, updateNodes, nodesBehavior, activateCorrection, deactivateCorrection, isPianoActive, isCorrection} = props;

  const isTutoActive = tutoPlay.isActive;
  const actualGameLength = isTutoActive ? 5 : gameLength;

  const [status, setStatus] = useState(isPlaying ? ENTERING : NOGAME);

  const [answers, setAnswers] = useState([] as string[]);
  const [tutoAnswers, setTutoAnswers] = useState(["G"] as string[]);
  if (tutoAnswers.length === 1  && tutoPlay.answer) setTutoAnswers([...tutoAnswers, tutoPlay.answer]);
  const pushAnswer = (answer: string) => {
    isTutoActive ? setTutoAnswers([...tutoAnswers, answer]) : setAnswers([...answers, answer]);
  };
  const resetAnswer = useCallback(() => isTutoActive ? setTutoAnswers(["G"]) : setAnswers([]), [isTutoActive]);

  useEffect(() => { // display the 2 previous answers when tuto Play really begins
    if (isTutoActive && tutoAnswers.length === 2)   {
      const prevAnswers = tutoAnswers.map(answer => scaleA[answer]);
      handleMessage({content: <AnswersMsg answers={prevAnswers} lastValue={scaleA[tutoPlay.answer]}></AnswersMsg>, className: "answers"} );
      setTimeout(() => 
      handleMessage({content: <AnswersMsg answers={prevAnswers} lastValue={"?"}></AnswersMsg>, className: "answers"} ), 
      1000);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTutoActive, tutoAnswers]);

  useEffect(() => { // state machine
    if (!isPlaying) {
      if (isGameStopped) {
        resetAnswer();
        setStatus(NOGAME);
      } else setStatus((status) => status === ENTERING ? QUITGAME : NOGAME);
    };
    if (isPlaying) {
      setStatus(ENTERING);
    }
  }, [isPlaying, isGameStopped, resetAnswer]);

  const onPlay = (keyValue: string) => {
    const actualAnswers = isTutoActive ? tutoAnswers : answers;
    const prevAnswers = actualAnswers.map(answer => scaleA[answer]);
    const msg = {content: <AnswersMsg answers={prevAnswers} lastValue={scaleA[keyValue]}></AnswersMsg>, className: "answers"};
    if (isPlaying && (actualAnswers.length < actualGameLength)) {
      pushAnswer(keyValue);
      handleMessage(msg);
    };
  };

  const  completeTutoAnswers = async (userAnswers: string[]) => {
    const diff = actualGameLength - userAnswers.length + 1;
    let arr = isTutoActive ? tutoAnswers : answers
      for (let i=1; i < diff; i++) {
        arr.push("?");
    };
  };

  const handleAnswersByClef = (args : Args, clefSelected: ClefSelected) => {
    switch(clefSelected) {
      case "treble" : 
        handleAnswers(trebleData.solution, ...args);
        break; 
      case "bass" :
        handleAnswers(bassData.solution, ...args);
        break;
      case "bothClefs" :
        handleAnswers(bothClefsData.solution, ...args, bothClefsData.solutionClefs);
        break;
    };
  };

  if (status === QUITGAME) {
    const userAnswers = tutoPlay.isActive ? tutoAnswers : answers;
    const args = [userAnswers, scaleA, resetAnswer, handleMessage, isMobile, actualGameLength, displayScoreCircle, clefSelected, activateCorrection] as Args;
    if (userAnswers.length === actualGameLength) {
      if(isTutoActive) setTimeout(() => stopTutoPlay());
      handleAnswersByClef(args, clefSelected);
    };
  
    if (userAnswers.length > 0 && (userAnswers.length < actualGameLength) ) {
      if (isTutoActive) {
        completeTutoAnswers(userAnswers)
          .then(() => handleAnswers(trebleData.solution, ...args))
          .then(() => setTimeout(() => stopTutoPlay(), 0));
      } else {
        handleError(resetAnswer, handleMessage, activateCorrection, "incompleteAnswer");
      };
    };

    if (userAnswers.length === 0) {
      handleError(resetAnswer, handleMessage, activateCorrection, "noAnswer");
    };
      
    setStatus(NOGAME);
  };
  const quitCorrection = () => {
    deactivateCorrection();
    displayScoreCircle(-1);
    handleMessage(defaultMessage);
  };
 return (
    <div id="pianoKeyboard">
      {isCorrection && status === NOGAME ?  <button className="quit-correction" onClick={quitCorrection}>Quitter la partie</button>
      : displayPiano ? <Piano onPlay={onPlay} isMobile={isMobile} scaleA={scaleA} isTutoOn={isTutoOn} isTutoPlay={isTutoActive} updateNodes={updateNodes}  isTutoNotes={nodesBehavior.bothOctavesNote.highlight} isPianoActive={isPianoActive}/> 
      : <Pads onPlay={onPlay} isTutoOn={isTutoOn} isTutoPlay={isTutoActive} updateNodes={updateNodes} nodesBehavior={nodesBehavior} isPianoActive={isPianoActive}/> }
    </div>
  );
};

export default PianoHandle;