import { type FC, useCallback, useEffect, useState, useRef } from "react";
import Pads from "./Pads";
import Piano from "./Piano";
import AnswersMsg from "../GameMessages/AnswersMsg";
import type { StaveClef, BothClefs, ClefSelected } from "../../types/Clefs";
import type { MessageObj } from "../../types/MessageObj";
import type { Args } from "../../types/HandleAnswersArgs";
import type { NodesKeys } from "../../types/Nodes";
import type { NodeObj } from "../../utils/Hooks/useClientRect";
import { handleAnswers } from "../../utils/handleAnswers";
import { scaleA } from "../../data/data";
import "./piano-handle.scss";
import { wait } from "../../utils/helpers";
import { displayNote, playMobile, manualEnd } from "../../utils/handleGame";

interface Props {
  isPlaying: boolean
  clefSelected: ClefSelected
  levelNum: number
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
  enablePiano: () => void
  disablePiano: () => void
  changeProgressBarID: (id: string | null) => void
  outputNode: HTMLElement
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  activateCorrection: () => void
};

// state machine
const ENTERING = 1;
const QUITGAME = 2;
const NOGAME = 3;

const emptyAnswers = ["", "", "", "", "", "", "", "", "", "", "", ""];

const PianoHandle: FC<Props> = (props) => {
  const {
    isPlaying,
    clefSelected,
    levelNum,
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
    isCorrection,
    outputNode,
    setIsPlaying,
    activateCorrection
  } = props;
  const isAutoPlay = false;
  const actualGameLength = gameLength;

  const [status, setStatus] = useState(isPlaying ? ENTERING : NOGAME);

  const isErrorAnswer = useRef(false);
  const roundRef = useRef(0);
  const noteRef = useRef("?");
  let isPianoEnabled = isPianoActive;

  const [answers, setAnswers] = useState<string[]>(emptyAnswers);
  const recordAnswer = (note: string, round: number) => {
    const newAnswers = answers.map((a, i) => i === round - 1 ? note : a);
    setAnswers(newAnswers);
    return newAnswers;
  };

  const resetAnswer = useCallback(
    () => {
      setAnswers(emptyAnswers);
    }, []);

  const displayAnswers = (answers: string[], lastValue: string) => {
    const displayAnswers = answers.map(a =>
      a === "?" ? "?" : scaleA[a]
    );
    const msg = {
      content: <AnswersMsg
        answers={displayAnswers}
        lastValue={lastValue}/>,
      className: "answers"
    };
    handleMessage(msg);
  };

  useEffect(() => { // state machine
    if (!isPlaying) {
      if (isGameStopped) {
        resetAnswer();
        roundRef.current = 0;
        setStatus(NOGAME);
      } else setStatus((status) => status === ENTERING ? QUITGAME : NOGAME);
    };
    if (isPlaying) {
      setStatus(ENTERING);
      console.log("ready to play");
    }
  }, [isPlaying, isGameStopped, resetAnswer]);

  if (isPlaying) {
    if (roundRef.current === 0 && isPianoEnabled) {
      isPianoEnabled = false;
    } else if (roundRef.current > 0 && !isPianoEnabled) {
      isPianoEnabled = true;
    };
  };

  const displayCurrentNote = () => {
    isMobile
      ? playMobile(
        roundRef.current,
        clefSelected,
        trebleData,
        bassData,
        bothClefsData,
        levelNum,
        gameLength,
        outputNode
      )
      : displayNote(roundRef.current, clefSelected);
  };

  const onNextRound = () => {
    console.log("next round");
    (async () => {
      const newAnswers = recordAnswer(noteRef.current, roundRef.current);
      if (roundRef.current === gameLength) {
        manualEnd(setIsPlaying, activateCorrection);
        roundRef.current = 0;
        return;
      };
      roundRef.current = roundRef.current + 1;
      wait(500);
      displayCurrentNote();
      displayAnswers(newAnswers, "?");
      noteRef.current = "?";
    })();
  };

  const onPlay = (keyValue: string) => {
    if (isPlaying) {
      displayAnswers(answers, scaleA[keyValue]);
      noteRef.current = keyValue;
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
      handleMessage,
      isMobile,
      actualGameLength,
      displayScoreCircle,
      clefSelected
    ] as Args;
    if (userAnswers.length === actualGameLength) {
      isErrorAnswer.current = false;
      handleAnswersByClef(args, clefSelected);
      resetAnswer();
    };
    setStatus(NOGAME);
  };

  const quitBtnClassN = !isErrorAnswer.current && isCorrection && isMobile
    ? "quit-correction hidden"
    : "quit-correction";

  const nextRoundBtnTxt = roundRef.current === gameLength
    ? "Valider et finir la partie"
    : roundRef.current === 0
      ? "Afficher la première note"
      : "Valider et passer à la note suivante";

  return (
    <div id="pianoKeyboard">
      {isPlaying && !isAutoPlay &&
        <button
        className="next-round"
        onClick={onNextRound}>
          {nextRoundBtnTxt}
        </button>
      }
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
          isPianoActive={isPianoEnabled}/>
          : <Pads
           onPlay={onPlay}
          updateNodes={updateNodes}
          isPianoActive={isPianoEnabled}/>
      }
    </div>
  );
};

export default PianoHandle;
