import { FC, useState, useEffect } from "react";
import TutoButton from "./SwitchTutoBtn";
import TutoContent from "./TutoDialog/TutoContent";
import TutoDialog from "./TutoDialog";
import AlertModal from "./AlertModal";
import { steps } from "./TutoData/steps";
import { scaleA } from "../../data/data";
import type { CSSPropertiesWithVars } from "../../types/CSSPropertiesWithVars";
import type { Nodes } from "./TutoData/nodesToHighLight";
import type { Options } from "../../types/Options";
import type { ChangeButton } from "../../types/TutoTypes";
import type { StaveClef, ClefSelected } from "../../types/Clefs";
import type { MessageObj } from "../../types/MessageObj";
import type { AlertContentType } from "./AlertModal/AlertMsgModal";
import { stepStyling, resetClass } from "./TutoData/stepProcess";
import { playTuto, stopPlaying } from "../../utils/handleGame";
import "./TutoDialog/tuto-dialog.scss";
import "./tuto-anims.scss";

type Props = {
  options: Options
  activeTuto: (bool: boolean) => void
  isTutoOn: boolean
  activeTutoPlay: (option: string, value: string | boolean) => void
  tutoPlay: {isActive: boolean, answer: string}
  restoreDefault: () => void
  Treble: StaveClef
  isMobile: boolean
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  handleMessage: (message: MessageObj) => void
  changeClef: (clef: ClefSelected) => void
  changeTempo: (time: number) => void
  resetStavesData: () => void
  stopGame: () => void
  displayPiano: boolean
  closePiano: () => void
  nodes: Nodes
  changeProgressBarID: (id: string | null) => void
};

//state machine
const ENTERING = 1;
const LAUNCHGAME = 2;
const QUITGAME = 3;
const NOTUTO = 5;

const defaultStep = 0; // test in dev

const Tutorial: FC<Props> =  (props) => {

  const {options, activeTuto, isTutoOn, activeTutoPlay, tutoPlay, restoreDefault, Treble, isMobile, isPlaying, setIsPlaying, handleMessage, changeClef, changeTempo, resetStavesData, stopGame, displayPiano, closePiano, nodes, changeProgressBarID} = props;

  const { playBtn, stopBtn, switchOptions, messageDiv, optionsIndicator, switchPiano, padsDiv, note1, note2 } = nodes;

  const [status, setStatus] = useState(isTutoOn ? ENTERING : NOTUTO);
 
  const [isDialog, setisModal] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [alertType, setAlertType] = useState("" as AlertContentType);

  const [stepIndex, setStepIndex] = useState(defaultStep);
  const max = steps.length - 1;
  const goNext = async () => setStepIndex(i => i < max ? i + 1: max);
  const goPrev = async () => setStepIndex(i => i > 0 ? i - 1 : 0);
  const goToStep = (newStep: number) => setStepIndex(newStep);

  const step = steps[stepIndex];
  const pointerClassName: string = step.pointer || "toUp";
  let modalClassName = `${pointerClassName}`;
  let styling: CSSPropertiesWithVars =  step.styling || {};
  const isCorrectionActive: boolean = messageDiv?.node.firstElementChild?.classList.contains("correction") as boolean;

  const startTuto = () => {
    setisModal(true);
    if (!isTutoOn) activeTuto(true);
    isCorrectionActive && restoreDefault();
  };

  // const sendBackToStep = () => {
  //   if (stepIndex === max) setStepIndex(defaultStep);
  //   if (stepIndex === 3) setStepIndex(2);
  //   if (stepIndex === 4 || stepIndex === 5) setStepIndex(3);
  //   if (stepIndex === 18 || stepIndex === 19) setStepIndex(17);
  //   if (stepIndex === 25) setStepIndex(24);
  //   if (stepIndex === 6 && (options.levelNum > 1 || options.tempoNum > 1)) setStepIndex(3);
  //   if (stepIndex >= 7 && stepIndex < 16) { // Play TutoGame steps
  //     (options.levelNum !== 1 || options.tempoNum !== 1) ? setStepIndex(3) : setStepIndex(7);      
  //   };
  // };   

  const alertQuitPlay = () => {
    setAlertType("confirmQuitPlay");
    setIsConfirmOpen(true);
  };
  const alertSimpleQuit = () => {
    setAlertType("confirmSimpleQuit");
    setIsConfirmOpen(true);
  };
  const closeTuto = async (pause?: boolean) => {
    if (isCorrectionActive) restoreDefault();
    resetClass(nodes, changeButton);
    if (!pause) {
      if (options.clefSelected !== "treble") changeClef("treble");
      if (isConfirmOpen) setIsConfirmOpen(false);
      activeTuto(false);
      setStepIndex(defaultStep);
    };
    setisModal(false);
  };
  const confirmQuitPlay = () => {
    stopGame();
    stopPlaying(setIsPlaying, handleMessage, resetStavesData, changeProgressBarID, options.clefSelected, nodes.vexScoreOutput.node, 5, isMobile);
    closeTuto(false);
  };
  const quitTuto = () => {
    closeTuto(false);
    setStepIndex(0);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    setAlertType("");
  };

  let changeButton: ChangeButton = {
    isNextDisabled: false,
    nextButton: true,
    prevButton: true,
    quitButton: false,
    changeNextToQuit: false
  };

  useEffect(() => { // listeners
    let funcName = "";
    const goToNextStep = () => {
      closeTuto(true);
      goNext();
      return setTimeout(() => {
        startTuto();
      }, 400);
    };
    const handleOutsideClick: EventListener = (e: Event) => {
      const targetNode = e.target as HTMLElement;
      handleStepListener(targetNode);
    };
    const handleStepListener = (targetNode: HTMLElement) => {
      switch(funcName) {
        case "toggleOptions" :
          if (targetNode === nodes.switchOptions.node) {
            goToNextStep();
          };
          break;
        case "play" :
          if (targetNode === playBtn.node || targetNode.parentElement === playBtn.node || targetNode.parentElement?.parentElement === playBtn.node) {
              goToNextStep();
          };
          break;
        case "padNote" :
          if (targetNode === nodes.padGNote.node) {
            handleMessage({content: "sol", className:"note-played center"});
            goToNextStep(); 
          };
          break;
        case "pads" :
          for (let child of padsDiv.node.children) {
            if (targetNode === child) {
              const keyValue = targetNode.dataset.note as string;
              handleMessage({content: scaleA[keyValue], className:"note-played center"});
              activeTutoPlay("isActive", true);
              activeTutoPlay("answer", keyValue);
              goToNextStep();
            }
          }
         break;
        case "optionsIndicator" :
          if (targetNode === optionsIndicator.node || targetNode.parentElement === optionsIndicator.node || targetNode === switchOptions.node) {
              goToNextStep();
          };
          break;
        case "switchPiano" :
          if (targetNode === switchPiano.node || targetNode.parentElement === switchPiano.node || targetNode.parentElement?.parentElement === switchPiano.node) {
            goToNextStep();
          };
          break;
        case "notesOnPiano" :
          if (targetNode === note1.node || targetNode === note2.node) {
            handleMessage({content: "do", className:"note-played center"});
            goToNextStep();
          };
          break;
        case "stop" :
          if (targetNode === stopBtn.node || targetNode.parentElement === stopBtn.node || targetNode.parentElement?.parentElement === stopBtn.node) {
            goToNextStep();
          };
          break;
        };
    };

    if (!isDialog) return () => window.removeEventListener("click", handleOutsideClick);
    const activeListener = () => {
      window.addEventListener("click", handleOutsideClick);
    };
    if (step.listener && isDialog) {
      funcName = step.listener;
      setTimeout(() => activeListener(), 0);
    };
    return () => {
      // isListener.current = false;
     return window.removeEventListener("click", handleOutsideClick);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepIndex, isDialog]);

  useEffect(() => { // stateMachine
    if (isTutoOn) {
      if (tutoPlay.isActive) setStatus(LAUNCHGAME);
      if (status === LAUNCHGAME) {
        if (!tutoPlay.isActive && stepIndex !== (max - 3)) {
          console.log("tutoPlay.isNotActive anymore !")
          setStatus(QUITGAME);
          goNext();
          setTimeout(() => {
            startTuto();
          }, 400);
        };
      };
      if (status === QUITGAME) {
        if (!isTutoOn) setStatus(NOTUTO);
      };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTutoOn, tutoPlay.isActive]);

  useEffect(() => { // prevent unwilling behavior if user had selected unexpected options
    if (isDialog) {
      if (step.beginPlayStep || step.beginAdvancedOptions) {
        if (options.clefSelected !== "treble") changeClef("treble");
        if (step.beginPlayStep && options.tempoNum > 1) changeTempo(1); // to keep lower tempo if tuto chapter 1 was skipped
        if (displayPiano) closePiano(); // close Piano if it was open
      };
    };
  }, [isDialog, step, options.clefSelected, changeClef, options.tempoNum, changeTempo, displayPiano, closePiano]);

  useEffect(() => { // delete correction when expected
    if (isTutoOn && (stepIndex === 0 || step.beginAdvancedOptions) && isCorrectionActive) restoreDefault();
  }, [isCorrectionActive, isTutoOn, restoreDefault, step.beginAdvancedOptions, stepIndex]);


  if (isDialog) {

    styling = stepStyling(steps, stepIndex, styling, changeButton, nodes); 
    if (step.func) step.func(changeButton, nodes, options);

    if (step.startTutoAutoPlay) { // play Tuto Game
      const outputNode = isMobile ? nodes.vexScoreMobileOutput.node : nodes.vexScoreOutput.node
      closeTuto(true)
      .then(() => nodes.stopBtn.node.classList.add("disable"))
      .then(() => playTuto(Treble, isMobile, setIsPlaying, changeProgressBarID, outputNode));
    };

    const handleClose = () => 
      ((stepIndex > 7 && stepIndex < 16) || (stepIndex > 21 && stepIndex < 23)) ? alertQuitPlay() : alertSimpleQuit();
      
    const contentProps = {
      handleClose: () => handleClose(),
      directQuit: () => quitTuto(),
      steps: steps,
      goNext: goNext,
      goPrev: goPrev,
      goToStep: goToStep,
      stepIndex: stepIndex,
      changeButton: changeButton,
      isTableContents: step.isTableContents ? true: false,
      backToZero: step.backToZero ? true : false
    }; 

    return (
      <TutoDialog id="tuto--dialog" modalClassName={modalClassName} isOpen={isDialog} styling={styling}>
        <TutoContent {...contentProps} />
        {isConfirmOpen ? <AlertModal confirmQuitPlay={confirmQuitPlay} cancelConfirm={closeConfirmModal} quitTuto={quitTuto} contentType={alertType}/> : null}
      </TutoDialog>
      
    );
  } else return ( 
    <div className="tuto-btn-wrapper">
      <TutoButton startTuto={startTuto} isPlaying={isPlaying}/>
    </div>
  );
};

export default Tutorial;
