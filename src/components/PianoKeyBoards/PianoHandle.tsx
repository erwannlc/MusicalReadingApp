import { type FC, useCallback, useEffect, useState, useRef } from "react";
import Pads from "./Pads";
import Piano from "./Piano";
import AnswersMsg from "../GameMessages/AnswersMsg";
import type { StaveClef, BothClefs, ClefSelected } from "../../types/Clefs";
import type { MessageObj } from "../../types/MessageObj";
import type { Args } from "../../types/HandleAnswersArgs";
import type { NodesKeys } from "../../types/Nodes";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import { handleAnswers, handleError } from "../../utils/handleAnswers";
import "./piano-handle.scss";

interface Props {
  isPlaying: boolean
  scaleA: Record<string, string>
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
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
  quitGame: () => void
  isPianoActive: boolean
  isCorrection: boolean
};

// state machine
const ENTERING = 1;
const QUITGAME = 2;
const NOGAME = 3;

const PianoHandle: FC<Props> = (props) => {
  const {
    isPlaying,
    scaleA,
    clefSelected,
    trebleData,
    bassData,
    bothClefsData,
    handleMessage,
    displayPiano,
    isGameStopped,
    isMobile,
    gameLength,
    displayScoreCircle,
    updateNodes,
    quitGame,
    isPianoActive,
    isCorrection
  } = props;

  const actualGameLength = gameLength;

  const [status, setStatus] = useState(isPlaying ? ENTERING : NOGAME);

  const [answers, setAnswers] = useState([] as string[]);

  const isErrorAnswer = useRef(false);

  const pushAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
  };
  const resetAnswer = useCallback(
    () => {
      setAnswers([]);
    }, []);

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
    const actualAnswers = answers;
    const prevAnswers = actualAnswers.map(answer => scaleA[answer]);
    const msg = {
      content: <AnswersMsg
        answers={prevAnswers}
        lastValue={scaleA[keyValue]}></AnswersMsg>,
      className: "answers"
    };
    if (isPlaying && (actualAnswers.length < actualGameLength)) {
      pushAnswer(keyValue);
      handleMessage(msg);
    };
  };

  const handleAnswersByClef = (args: Args, clefSelected: ClefSelected) => {
    switch (clefSelected) {
      case "treble" :
        handleAnswers(trebleData.solution, ...args);
        break;
      case "bass" :
        handleAnswers(bassData.solution, ...args);
        break;
      case "bothClefs" :
        handleAnswers(
          bothClefsData.solution,
          ...args,
          bothClefsData.solutionClefs
        );
        break;
    };
  };

  if (status === QUITGAME) {
    const userAnswers = answers;
    const args = [
      userAnswers,
      scaleA,
      resetAnswer,
      handleMessage,
      isMobile,
      actualGameLength,
      displayScoreCircle,
      clefSelected
    ] as Args;
    if (userAnswers.length === actualGameLength) {
      isErrorAnswer.current = false;
      handleAnswersByClef(args, clefSelected);
    };

    if (userAnswers.length > 0 && (userAnswers.length < actualGameLength)) {
      isErrorAnswer.current = true;
      handleError(
        resetAnswer,
        handleMessage,
        "incompleteAnswer"
      );
    };

    if (userAnswers.length === 0) {
      isErrorAnswer.current = true;
      handleError(
        resetAnswer,
        handleMessage,
        "noAnswer"
      );
    };

    setStatus(NOGAME);
  };

  const quitBtnClassN = !isErrorAnswer.current && isCorrection && isMobile
    ? "quit-correction hidden"
    : "quit-correction";

  return (
    <div id="pianoKeyboard">
      {isCorrection && status === NOGAME
        ? <button className={quitBtnClassN} onClick={quitGame}>
          Quitter la partie
          </button>
        : displayPiano
          ? <Piano
          onPlay={onPlay}
          isMobile={isMobile}
          scaleA={scaleA}
          updateNodes={updateNodes}
          isPianoActive={isPianoActive}/>
          : <Pads
           onPlay={onPlay}
          updateNodes={updateNodes}
          isPianoActive={isPianoActive}/> }
    </div>
  );
};

export default PianoHandle;
