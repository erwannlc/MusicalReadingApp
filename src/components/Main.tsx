import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Options from "./Options/Options";
import PlayBtn from "./PlayGame/Play";
import ShowOptions from "./OptionsSwitch/ShowOptions";
import VFBox from "./VFScore/VFBox";
import VFBoxMobile from "./VFScore/VFBoxMobile";
import PianoKeyBoards from "./PianoKeyBoards";
import GameMessages from "./GameMessages/GameMessages";
import GameScore from "./GameMessages/GameScore";
import Tutorial from "./Tutorial";
import defaultNodesBehavior from "./Tutorial/TutoData/defaultNodesBehavior";
import useMediaQuery from "../utils/Hooks/useMediaQuery/useMediaQuery";
import restoreDefault from "../utils/restoreDefault";
import type { StaveClef, BothClefs, ClefSelected } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import type { NodesBehavior, NodesBehaviorKeys } from "../types/TutoTypes";
import type { Nodes, NodesKeys } from "./Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../utils/Hooks/useClientRect";
import { treble, bass, bothClefs, defaultMessage, defaultOptions, scaleA } from "../data/data";
import { useClientNode } from "../utils/Hooks/useClientNode";

const Main: FunctionComponent = () => {

  const [appNode, ref] = useClientNode();

  // Media queries
  const [isMobile] = useMediaQuery("screen and (max-width: 850px), screen and (max-height: 420px) and (orientation: landscape)");

  // Options
  const [options, setOptions] = useState(defaultOptions);
  const changeOption = (option: string, value: string | number) => {
    setOptions(options => ({...options, [option]: value}));
  }; 
  const [displayPiano, setDisplayPiano] = useState(false); 
  const switchPiano = () => {
    setDisplayPiano(bool => !bool);
    setDisplayOptions(false);
  };
  const [displayOptions, setDisplayOptions] = useState(false);
  const showOptions = () => setDisplayOptions(bool => !bool);
  
  // Message
  const [message, setMessage] = useState(defaultMessage as MessageObj);
  const handleMessage = (message: MessageObj) => setMessage({...message});

  // Musical data
  const [trebleData, setTreble] = useState(treble as StaveClef);
  const [bassData, setBass] = useState(bass as StaveClef);
  const [bothClefsData, setBoth] = useState(bothClefs as BothClefs);
  const resetStavesData = () => {
    setTreble(trebleData => ({...trebleData, notesArray: [], notes: "", solution: []}));
    setBass(bassData => ({...bassData, notesArray: [], notes: "", solution: []}));
    setBoth(bothClefs);
  };
  
  // Game handling
  const gameLength = 12;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameStopped, setIsGameStopped] = useState(false);
  const stopGame = () => setIsGameStopped(true);
  const cancelStop = () => setIsGameStopped(false);
  const [scoreNumber, setScoreNumber] = useState(-1);
  const displayScoreCircle = async (scoreNumber: number) => setScoreNumber(scoreNumber);
  const [progressBarId, setProgressBarID] = useState(null as string | null);
  const changeProgressBarID = (id: string | null) => setProgressBarID(id);
  const [isCorrection, setIsCorrection] = useState(false);
  const activateCorrection = () => setIsCorrection(true);
  const deactivateCorrection = () => setIsCorrection(false);
  useEffect(() => {
    if (isPlaying === true && isCorrection === true) setIsCorrection(false);
  }, [isCorrection, isPlaying]);
  const mainClassN = isCorrection ? "while-correction" : "";
  const [isPianoActive, setIsPianoActive] = useState(true);
const enablePiano = () => setIsPianoActive(true);
const disablePiano = () => setIsPianoActive(false);


  // Tutorial data
  const [nodes, setNodes] = useState({} as Nodes);
  const updateNodes = useCallback((key: NodesKeys, obj: NodeObj) => {
    setNodes(nodes => ({...nodes, [key]: obj}));
  }, []);
  const [nodesBehavior, setNodesBehavior] = useState(defaultNodesBehavior as NodesBehavior);
  const changeNodeBehavior = (component: NodesBehaviorKeys, value: {highlight?: boolean, disable?: boolean}) => {
    setNodesBehavior(nodesBehavior => ({...nodesBehavior, [component]: value}));
  };
  const resetNodesBehavior = () => setNodesBehavior(defaultNodesBehavior);
  const [isTutoOn, setIsTutoOn] = useState(false);
  const activeTuto = (bool: boolean) => setIsTutoOn(bool);
  const [tutoPlay, setTutoPlay] = useState({
    isActive: false,
    answer: ""
  });
  const stopTutoPlay = () => setTutoPlay({isActive: false, answer: ""});
  const activeTutoPlay = (option: string, value: string | boolean) => {
    setTutoPlay(tutoPlay => ({...tutoPlay, [option]: value}));
  };

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, -10); // displays entire screen 
      document.body.classList.add("avoid-scroll--on-touch");
    } else document.body.classList.remove("avoid-scroll--on-touch");
  }, [isMobile]);

  // Props
  const playGameProps = {
    options,
    trebleData, 
    bassData, 
    bothClefsData, 
    handleMessage,
    isPlaying,
    setIsPlaying,
    resetStavesData,
    stopGame,
    cancelStop,
    isMobile,
    gameLength,
    isTutoOn,
    displayScoreCircle,
    updateNodes,
    changeProgressBarID,
    nodes,
    appNode,
    nodesBehavior,
    isCorrection,
    disablePiano,
    enablePiano
  };
  const pianoKeyboardProps = {
    isPlaying,
    scaleA,
    clefSelected: options.clefSelected, 
    trebleData, 
    bassData, 
    bothClefsData, 
    handleMessage: (message: MessageObj) => handleMessage(message),
    displayPiano,
    isGameStopped,
    isMobile,
    gameLength,
    displayScoreCircle,
    isTutoOn,
    tutoPlay,
    stopTutoPlay,
    updateNodes,
    nodes,
    nodesBehavior,
    activateCorrection,
    isPianoActive
  };
  const VFScoreProps = {
    level: options.level,
    levelNum: options.levelNum,
    clefSelected: options.clefSelected,
    trebleData,
    bassData,
    bothClefsData,
    gameLength,
    updateNodes,
    outputNode: nodes.vexScoreOutput?.node,
    highlight: nodesBehavior.vexScore.highlight,
    isCorrection
  };
  const optionsProps = {
    changeTimer: useCallback((interval: number, tempoNum: number) => {
      changeOption("intervalTime", interval);
      changeOption("tempoNum", tempoNum);
    }, []),
    changeLevel: useCallback((level: string, levelNum: number) => {
      changeOption("level", level);
      changeOption("levelNum", levelNum);
    }, []),
    changeClef: useCallback((clef: ClefSelected) => changeOption("clefSelected", clef), []),
    switchPiano: switchPiano,
    isMobile,
    displayPiano,
    displayOptions,
    updateNodes,
    options,
    nodesBehavior
  };
  const messageProps = {
    message,
    isPlaying,
    options,
    handleMessage,
    scoreNumber,
    gameLength: isTutoOn ? 5 : gameLength,
    showOptions,
    updateNodes,
    tempoTime: options.intervalTime,
    progressBarId,
    isTutoOn,
    nodesBehavior
  };
  const tutoProps = {
    options,
    activeTuto,
    activeTutoPlay,
    isTutoOn,
    tutoPlay,
    restoreDefault: () => restoreDefault(handleMessage, options.clefSelected, nodes.vexScoreOutput.node, 5, resetStavesData, displayScoreCircle, isMobile, deactivateCorrection),
    trebleData,
    bassData,
    isMobile,
    isPlaying,
    setIsPlaying,
    handleMessage: (message: MessageObj) => handleMessage(message),
    changeClef: useCallback((clef: ClefSelected) => changeOption("clefSelected", clef), []),
    changeTempo: useCallback((time: number) => changeOption("tempoNum", time), []),
    resetStavesData,
    stopGame,
    displayPiano,
    closePiano: () => setDisplayPiano(false),
    nodes,
    changeProgressBarID,
    resetNodesBehavior,
    changeNodeBehavior: useCallback((component: NodesBehaviorKeys, value: {highlight?: boolean, disable?: boolean}) => {
      if (value) changeNodeBehavior(component, value);
    }, []),
    isCorrection
  };

  return (
    <main id="App" ref={ref} className={mainClassN}>
      <Options {...optionsProps}/>
      {!displayOptions && <GameMessages {...messageProps} />}
      {!displayOptions && <GameScore isModal={message.isModal ? true : false} scoreNumber={scoreNumber} gameLength={isTutoOn ? 5 : gameLength} isMobile={isMobile} />}
      {!displayOptions && <PlayBtn {...playGameProps}/>}
      {!isPlaying && <ShowOptions showOptions={showOptions} displayOptions={displayOptions} updateNodes={updateNodes} nodesBehavior={nodesBehavior.switchOptions}/>}    
      {isMobile ? <VFBoxMobile {...VFScoreProps}/>
      : <VFBox {...VFScoreProps}/>}
      <PianoKeyBoards {...pianoKeyboardProps} />
      {!isMobile && <Tutorial {...tutoProps}/>}
    </main>
  )
};

export default Main;