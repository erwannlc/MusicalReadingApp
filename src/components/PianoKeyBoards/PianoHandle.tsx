import { FC, useCallback, useEffect, useState } from "react";
import Pads from "./Pads";
import Piano from "./Piano";
import AnswersMsg from "../GameMessages/AnswersMsg";
import type { StaveClef, BothClefs, ClefSelected } from "../../types/Clefs";
import type { MessageObj } from "../../types/MessageObj";
import type { Args } from "../../types/HandleAnswersArgs";
import type { NodesKeys, Nodes } from "../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import type { TutoData } from "../../types/TutoTypes";
import { handleAnswers, handleError } from "../../utils/handleAnswers";


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
  isTuto: boolean
  tutoPlay: {isActive: boolean, answer: string}
  stopTutoPlay: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodes: Nodes
  appNode: HTMLElement | null
  tutoData: TutoData
  activateCorrection: () => void,
};

//state machine
const ENTERING = 1;
const QUITGAME = 2;
const NOGAME = 3;

const PianoHandle: FC<Props> = (props) => {
  const {isPlaying, scaleA, clefSelected, trebleData, bassData, bothClefsData, 
    handleMessage, displayPiano, isGameStopped, isMobile, 
    gameLength, displayScoreCircle, isTuto, tutoPlay, stopTutoPlay, updateNodes, nodes, appNode, tutoData, activateCorrection} = props;

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
  }, [isTutoActive, tutoAnswers])

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
        handleAnswers(bothClefsData.solution, ...args, bothClefsData.notesIndex);
        break;
    };
  };

  if (status === QUITGAME) {
    const userAnswers = tutoPlay.isActive ? tutoAnswers : answers;
    const vexScore = isMobile ? nodes.vexScoreMobile.node : nodes.vexScore.node;
    const outputNode = isMobile ? nodes.vexScoreMobileOutput.node : nodes.vexScoreOutput.node;
    const args = [userAnswers, scaleA, resetAnswer, handleMessage, isMobile, actualGameLength, displayScoreCircle, vexScore, appNode, outputNode, clefSelected, activateCorrection] as Args;
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
        handleError(resetAnswer, handleMessage, "incompleteAnswer");
      };
    };

    if (userAnswers.length === 0) {
      handleError(resetAnswer, handleMessage, "noAnswer");
    };
      
    setStatus(NOGAME);
  };
  return (
    <>
      {displayPiano ? <Piano onPlay={onPlay} isMobile={isMobile} scaleA={scaleA} isTuto={isTuto} isTutoPlay={isTutoActive} updateNodes={updateNodes}  isTutoNotes={tutoData.bothOctavesNote.isTuto}/> 
      : <Pads onPlay={onPlay} isTuto={isTuto} isTutoPlay={isTutoActive} updateNodes={updateNodes} tutoData={tutoData}/> }
    </>
  );
};

export default PianoHandle;