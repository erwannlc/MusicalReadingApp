import { useCallback, useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import Options from "./Options/Options";
import PlayBtn from "./PlayGame/Play";
import ShowOptions from "./OptionsSwitch/ShowOptions";
import VFBox from "./VFScore/VFBox";
import VFBoxMobile from "./VFScore/VFBoxMobile";
import PianoKeyBoards from "./PianoKeyBoards";
import GameMessages from "./GameMessages/GameMessages";
import GameScore from "./GameMessages/GameScore";
import { createNotes } from "../utils/createStavesData";
import { defaultNodesBehavior }
  from "../types/NodesBehavior"; // tutoCode Nodes
import type { Nodes, NodesKeys }
  from "../types/Nodes"; // tutoCode Nodes
import type { ClefSelected } from "../types/Clefs";
import type { MessageObj } from "../types/MessageObj";
import type { NodeObj } from "../utils/Hooks/useClientRect";
import useMediaQuery from "../utils/Hooks/useMediaQuery/useMediaQuery";
import {
  emptyStave,
  trebleReadOnly,
  bassReadOnly,
  bothClefs,
  defaultMessage,
  defaultOptions,
  scaleA
} from "../data/data";

let firstMainRender = true;

const Main: FunctionComponent = () => {
  const [isMobile] = useMediaQuery(
    `screen and (max-width: 850px), 
    screen and (max-height: 420px) and (orientation: landscape)`
  );

  // Options
  const [options, setOptions] = useState(defaultOptions);
  const changeOption = (option: string, value: string | number) => {
    setOptions(options => ({ ...options, [option]: value }));
  };
  const [displayPiano, setDisplayPiano] = useState(false);
  const switchPiano = () => {
    setDisplayPiano(bool => !bool);
    setDisplayOptions(false);
  };
  const [displayOptions, setDisplayOptions] = useState(false);
  const showOptions = () => { setDisplayOptions(bool => !bool); };

  // Message
  const [message, setMessage] = useState(defaultMessage);
  const handleMessage = (
    message: MessageObj
  ) => { setMessage({ ...message }); };

  // Game handling
  const gameLength = 12;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameStopped, setIsGameStopped] = useState(false);
  const stopGame = () => { setIsGameStopped(true); };
  const cancelStop = () => { setIsGameStopped(false); };
  const [scoreNumber, setScoreNumber] = useState(-1);
  const displayScoreCircle = async (
    scoreNumber: number
  ) => {
    setScoreNumber(scoreNumber);
  };
  const [progressBarId, setProgressBarID] = useState(null as string | null);
  const changeProgressBarID = (id: string | null) => { setProgressBarID(id); };
  const [isCorrection, setIsCorrection] = useState(false);
  const activateCorrection = () => { setIsCorrection(true); };
  const mainClassN = isCorrection ? "while-correction" : "";
  const [isPianoActive, setIsPianoActive] = useState(true);
  const enablePiano = () => { setIsPianoActive(true); };
  const disablePiano = () => { setIsPianoActive(false); };
  const quitGame = () => {
    createNotes(options.level, trebleReadOnly, bassReadOnly, gameLength)
      .then(newData => {
        setTreble(newData.treble);
        setBass(newData.bass);
        setBoth(newData.both);
      });
    if (isCorrection) setIsCorrection(false);
    displayScoreCircle(-1);
    handleMessage(defaultMessage);
  };

  // Musical data
  const [trebleData, setTreble] = useState(emptyStave);
  const [bassData, setBass] = useState(emptyStave);
  const [bothClefsData, setBoth] = useState(bothClefs);

  // Nodes Behaviors
  const [nodes, setNodes] = useState<Nodes>({});
  const updateNodes = useCallback(
    (
      key: NodesKeys,
      obj: NodeObj | undefined
    ) => {
      setNodes(nodes => ({ ...nodes, [key]: obj }));
    }, []);
  // const [nodesBehavior, setNodesBehavior] = useState(defaultNodesBehavior);
  const nodesBehavior = defaultNodesBehavior;

  // console.log("Main isCorrection : ", isCorrection)

  if (firstMainRender) {
    console.log("First Main render");
    createNotes(options.level, trebleReadOnly, bassReadOnly, gameLength)
      .then(newData => {
        setTreble(newData.treble);
        setBass(newData.bass);
        setBoth(newData.both);
      });
    firstMainRender = false;
  };
  // console.warn("Main rendering : TrebleData = ", trebleData);

  // to make sure the screen is at the very top before preventing scrolling
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, -10);
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
    quitGame,
    stopGame,
    cancelStop,
    isMobile,
    gameLength,
    displayScoreCircle,
    updateNodes,
    changeProgressBarID,
    nodes,
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
    handleMessage: (message: MessageObj) => { handleMessage(message); },
    displayPiano,
    isGameStopped,
    isMobile,
    gameLength,
    displayScoreCircle,
    updateNodes,
    nodes,
    nodesBehavior,
    quitGame,
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
    isStaveDataCreated: trebleData.notesArray.length === gameLength
  };
  const optionsProps = {
    changeTimer: (interval: number, tempoNum: number) => {
      changeOption("intervalTime", interval);
      changeOption("tempoNum", tempoNum);
    },
    changeLevel: (level: string, levelNum: number) => {
      changeOption("level", level);
      changeOption("levelNum", levelNum);
      createNotes(level, trebleReadOnly, bassReadOnly, gameLength)
        .then(newData => {
          setTreble(newData.treble);
          setBass(newData.bass);
          setBoth(newData.both);
        });
    },
    changeClef: (clef: ClefSelected) => { changeOption("clefSelected", clef); },
    switchPiano,
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
    gameLength,
    showOptions,
    updateNodes,
    tempoTime: options.intervalTime,
    progressBarId,
    nodesBehavior,
    quitGame
  };
  const gameScoreProps = {
    isModal: !!message.isModal,
    scoreNumber,
    gameLength,
    isMobile
  };
  const shwoOptionsProps = {
    showOptions,
    displayOptions,
    updateNodes,
    nodesBehavior: nodesBehavior.switchOptions
  };

  return (
    <main id="App" className={mainClassN}>
      <Options {...optionsProps}/>
      {!displayOptions && <GameMessages {...messageProps} />}
      {!displayOptions && <GameScore {...gameScoreProps}/>}
      {!displayOptions && <PlayBtn {...playGameProps}/>}
      {!isPlaying && <ShowOptions {...shwoOptionsProps}/>}
      {isMobile
        ? <VFBoxMobile {...VFScoreProps}/>
        : <VFBox {...VFScoreProps}/>}
      <PianoKeyBoards {...pianoKeyboardProps} />
    </main>
  );
};

export default Main;
