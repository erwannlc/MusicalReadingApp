import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import Options from "./Options/Options";
import PlayBtn from "./PlayGame/Play";
import ShowOptions from "./OptionsSwitch/ShowOptions";
import VFBox from "./VFScore/VFBox";
import VFBoxMobile from "./VFScore/VFBoxMobile";
import PianoKeyBoards from "./PianoKeyBoards";
import GameMessages from "./GameMessages/GameMessages";
import GameScore from "./GameMessages/GameScore";
import Tutorial from "./Tutorial"; // tutoCode
import defaultNodesBehavior from "./Tutorial/TutoData/defaultNodesBehavior"; // tutoCode
import { createNotes, createTutoNotes } from "../utils/createStavesData"; // partial tutoCode
import type { NodesBehavior, NodesBehaviorKeys } from "../types/TutoTypes"; // tutoCode
import type { Nodes, NodesKeys } from "./Tutorial/TutoData/nodesToHighLight"; // tutoCode Nodes
import type { StaveClef, BothClefs, ClefSelected } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import type { NodeObj } from "../utils/Hooks/useClientRect";
import useMediaQuery from "../utils/Hooks/useMediaQuery/useMediaQuery";
import { useClientNode } from "../utils/Hooks/useClientNode";
import restoreDefault from "../utils/restoreDefault";
import { emptyStave, trebleReadOnly, bassReadOnly, bothClefs, defaultMessage, defaultOptions, scaleA } from "../data/data";

const Main: FunctionComponent = () => {

  const [appNode, ref] = useClientNode();
  const firstMainRender = useRef(true);

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
  
  const mainClassN = isCorrection ? "while-correction" : "";
  const [isPianoActive, setIsPianoActive] = useState(true);
const enablePiano = () => setIsPianoActive(true);
const disablePiano = () => setIsPianoActive(false);

  // Musical data
  const [trebleData, setTreble] = useState(emptyStave as StaveClef);
  const [bassData, setBass] = useState(emptyStave as StaveClef);
  const [bothClefsData, setBoth] = useState(bothClefs as BothClefs);
  const [isStaveDataCreated, setIsDataCreated] = useState(false);
  const [isTutoStaveDataCreated, setIsTutoDataCreated] = useState(false);
  const resetStavesData = async () => {
    // console.log("resetingStavesData...")
    setTreble(emptyStave);
    setBass(emptyStave);
    setBoth(bothClefs);
    setIsDataCreated(false);
    setIsTutoDataCreated(false)
  };

  // Nodes Behaviors
  const [nodes, setNodes] = useState({} as Nodes);
  const updateNodes = useCallback((key: NodesKeys, obj: NodeObj) => {
    setNodes(nodes => ({...nodes, [key]: obj}));
  }, []);
  const [nodesBehavior, setNodesBehavior] = useState(defaultNodesBehavior as NodesBehavior);
  const changeNodeBehavior = (component: NodesBehaviorKeys, value: {highlight?: boolean, disable?: boolean}) => {
    setNodesBehavior(nodesBehavior => ({...nodesBehavior, [component]: value}));
  };
  const resetNodesBehavior = () => setNodesBehavior(defaultNodesBehavior);

  // Tutorial data
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

  // console.log("Main isCorrection : ", isCorrection)
  ////////////////////////////// useEffect /////////////////////////////////////// 

  useEffect(() => {
    if (firstMainRender.current) {
      console.log("First Main render");
      createNotes(options.level, trebleReadOnly, bassReadOnly, gameLength)
      .then(newData => {
        setTreble(newData.treble);
        setBass(newData.bass);
        setBoth(newData.both);          
      });
      setIsDataCreated(true);
      firstMainRender.current = false;
    }; 
    if (!isPlaying && !isCorrection) {
      if (isTutoOn) { // tutoCode
        resetStavesData().then(() => {
          createTutoNotes()
          .then(newData => {
            setTreble(newData.treble);
            setBass(newData.bass);
            setBoth(newData.both);          
          })
          .then(() => setIsTutoDataCreated(true));        
      });
      } else if (!isTutoOn) {
        resetStavesData().then(() => {
            createNotes(options.level, trebleReadOnly, bassReadOnly, gameLength)
            .then(newData => {
              setTreble(newData.treble);
              setBass(newData.bass);
              setBoth(newData.both);          
            })
            .then(() => setIsDataCreated(true));        
        });
      };
    };
  }, [options.level, isPlaying, isCorrection, isTutoOn]);
  
  useEffect(() => {
    if (isCorrection) {
      changeNodeBehavior("playBtn", {disable: true})
    };
    if (!isCorrection) {
      changeNodeBehavior("playBtn", {disable: false})
    };
  }, [isCorrection])


  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, -10); // to make sure the screen is at the very top before preventing scrolling
      document.body.classList.add("avoid-scroll--on-touch");
    } else document.body.classList.remove("avoid-scroll--on-touch");
  }, [isMobile]);

  //////////////////////////////////////////////////////////////////////////////  


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
    isTutoOn, // tutoCode
    displayScoreCircle,
    updateNodes,
    changeProgressBarID,
    nodes,
    appNode,
    nodesBehavior,
    isCorrection,
    disablePiano,
    enablePiano,
    activateCorrection
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
    isTutoOn, // tutoCode
    tutoPlay, // tutoCode
    stopTutoPlay, // tutoCode
    updateNodes,
    nodes,
    nodesBehavior,
    activateCorrection,
    deactivateCorrection,
    isPianoActive,
    isCorrection
  };
  const VFScoreProps = {
    levelNum: options.levelNum,
    clefSelected: options.clefSelected,
    trebleData,
    bassData,
    bothClefsData,
    gameLength,
    updateNodes,
    outputNode: nodes.vexScoreOutput?.node,
    highlight: nodesBehavior.vexScore.highlight,
    isCorrection,
    isStaveDataCreated,
    isTutoOn, // tutoCode
    isTutoPlay: tutoPlay.isActive, // tutoCode
    isTutoStaveDataCreated // tutoCode
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
    nodesBehavior,
    restoreDefault: () => restoreDefault(handleMessage, options.clefSelected, isMobile ? nodes.vexScoreMobileOutput.node : nodes.vexScoreOutput.node, 5, resetStavesData, displayScoreCircle, isMobile, deactivateCorrection),
  };
  const gameScoreProps = {
    isModal: message.isModal ? true : false,
    scoreNumber,
    gameLength: isTutoOn ? 5 : gameLength,
    isMobile
  };
  const shwoOptionsProps = {
    showOptions,
    displayOptions,
    updateNodes,
    nodesBehavior: nodesBehavior.switchOptions
  }

  const tutoProps = {
    options,
    activeTuto, 
    activeTutoPlay,
    isTutoOn,
    tutoPlay,
    restoreDefault: () => restoreDefault(handleMessage, options.clefSelected, nodes.vexScoreOutput.node, 5, resetStavesData, displayScoreCircle, isMobile, deactivateCorrection),
    // trebleData,
    // bassData,
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
    isCorrection,
    activateCorrection
  };


  return (
    <main id="App" ref={ref} className={mainClassN}>
      <Options {...optionsProps}/>
      {!displayOptions && <GameMessages {...messageProps} />}
      {!displayOptions && <GameScore {...gameScoreProps}/>} 
      {!displayOptions && <PlayBtn {...playGameProps}/>}
      {!isPlaying && <ShowOptions {...shwoOptionsProps}/>}    
      {isMobile ? <VFBoxMobile {...VFScoreProps}/>
      : <VFBox {...VFScoreProps}/>}
      <PianoKeyBoards {...pianoKeyboardProps} />
      {!isMobile && <Tutorial {...tutoProps}/>}
    </main>
  )
};

export default Main;