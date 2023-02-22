import { useCallback, useMemo, useEffect, useRef, useState } from "react";
import type { FC, MouseEvent, TouchEvent } from "react";
import type { PianoKeys } from "../../../types/PianoKeys";
import type { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import useClientRect from "../../../utils/Hooks/useClientRect";
import { scaleA } from "../../../data/data";
import {
  azertyKeys,
  mobileKeys,
  defaultMobileClassN,
  defaultClassN
} from "../../../data/pianoData";
import "./piano.scss";

interface Props {
  onPlay: (keyValue: string) => void
  isMobile: boolean
  scaleA: Record<string, string>
  isTutoOn: boolean
  isTutoPlay: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
  isTutoNotes: boolean
  isPianoActive: boolean
};

const Piano: FC<Props> = (
  {
    onPlay,
    isMobile,
    isTutoOn,
    isTutoPlay,
    updateNodes,
    isTutoNotes,
    isPianoActive
  }) => {
  // Thx to Bret Cameron :
  // https://css-tricks.com/how-to-code-a-playable-synth-keyboard/
  // https://codepen.io/BretCameron/pen/MWmyWeo

  const [pianoNodeObj, pianoRef] = useClientRect(); // nodes for Tutorial
  useEffect(() => {
    updateNodes("piano", pianoNodeObj);
  }, [pianoNodeObj, updateNodes]);
  const [note1NodeObj, note1Ref] = useClientRect();
  useEffect(() => {
    updateNodes("note1", note1NodeObj);
  }, [note1NodeObj, updateNodes]);
  const [note2NodeObj, note2Ref] = useClientRect();
  useEffect(() => {
    updateNodes("note2", note2NodeObj);
  }, [note2NodeObj, updateNodes]);

  const keys = isMobile ? mobileKeys : azertyKeys;
  const defaultClassesName = isMobile ? defaultMobileClassN : defaultClassN;

  const [classN, setClassN] = useState(defaultClassesName);

  const keysRef = useRef(keys);
  keysRef.current = keys;
  const changeClassN = useCallback((isPressed: boolean, key: string) => {
    const newClass = isPressed
      ? `${keys[key].classN} pressed`
      : keys[key].classN;
    setClassN(classN => ({ ...classN, [key]: newClass }));
  }, [keys]);

  let clickedKey: string = "";

  const audioContext = useMemo(() => new (window.AudioContext)(), []);

  const getHz = (note = "A", octave = 4) => {
    const A4 = 440;
    let N = 0;
    switch (note) {
      case "A":
        N = 0;
        break;
      case "A#":
      case "Bb":
        N = 1;
        break;
      case "B":
        N = 2;
        break;
      case "C":
        N = 3;
        break;
      case "C#":
      case "Db":
        N = 4;
        break;
      case "D":
        N = 5;
        break;
      case "D#":
      case "Eb":
        N = 6;
        break;
      case "E":
        N = 7;
        break;
      case "F":
        N = 8;
        break;
      case "F#":
      case "Gb":
        N = 9;
        break;
      case "G":
        N = 10;
        break;
      case "G#":
      case "Ab":
        N = 11;
        break;
    }
    N += 12 * (octave - 4);
    return A4 * Math.pow(2, N / 12);
  };

  const pressedNotes = useMemo(() => new Map(), []);

  const playKey = useCallback((key: string, keys: PianoKeys) => {
    if (!keys[key]) return;
    const osc = audioContext.createOscillator();
    const noteGainNode = audioContext.createGain();
    noteGainNode.connect(audioContext.destination);

    const zeroGain = 0.00001;
    const maxGain = 0.5;
    const sustainedGain = 0.001;

    noteGainNode.gain.value = zeroGain;

    const setAttack = () =>
      noteGainNode.gain.exponentialRampToValueAtTime(
        maxGain,
        audioContext.currentTime + 0.01
      );
    const setDecay = () =>
      noteGainNode.gain.exponentialRampToValueAtTime(
        sustainedGain,
        audioContext.currentTime + 1
      );
    const setRelease = () =>
      noteGainNode.gain.exponentialRampToValueAtTime(
        zeroGain,
        audioContext.currentTime + 2
      );

    setAttack();
    setDecay();
    setRelease();

    osc.connect(noteGainNode);
    osc.type = "triangle";

    const freq = getHz(keys[key].note, (keys[key].octaveOffset || 0) + 3);

    if (Number.isFinite(freq)) {
      osc.frequency.value = freq;
    };

    pressedNotes.set(key, osc);
    pressedNotes.get(key).start();
    changeClassN(true, key);

    const scale = Object.keys(scaleA);
    // prevent error while play with sharp or flat
    // (while playdata is only considering natural notes);
    const keyValue = !scale.includes(keys[key].note) ? "?" : keys[key].note;
    if (!(isTutoOn && !isTutoPlay)) {
      onPlay(keyValue);
    };
  }, [audioContext, changeClassN, isTutoOn, isTutoPlay, onPlay, pressedNotes]);

  const stopKey = useCallback((key: string, keys: PianoKeys) => {
    if (!keys[key]) {
      return;
    };
    changeClassN(false, key);

    const osc = pressedNotes.get(key);
    if (osc) {
      setTimeout(() => {
        osc.stop();
      }, 2000);
      pressedNotes.delete(key);
    };
    document.removeEventListener("mouseup", () => {
      stopKey(clickedKey, keysRef.current);
    });
    document.removeEventListener("touchend", () => {
      stopKey(clickedKey, keysRef.current);
    });
  }, [changeClassN, clickedKey, pressedNotes]);

  // prevent onMouseDown to trigger after touchstart
  const prevent = useRef(false);

  const pressKey = (e: MouseEvent) => {
    if (prevent.current) {
      prevent.current = false;
    } else {
      const nodeKey = e.currentTarget as HTMLLIElement;
      const keyTxt = nodeKey.textContent as string;
      const key: string = keyTxt === ";" ? "M" : keyTxt;
      clickedKey = key;
      playKey(clickedKey, keysRef.current);
    }
  };
  const touchKey = (e: TouchEvent) => {
    prevent.current = true;
    const nodeKey = e.currentTarget as HTMLLIElement;
    const key = nodeKey.textContent as string;
    clickedKey = key;
    playKey(clickedKey, keysRef.current);
  };
  document.addEventListener("mouseup", () => {
    stopKey(clickedKey, keysRef.current);
  });
  document.addEventListener("touchend", () => {
    stopKey(clickedKey, keysRef.current);
  });

  useEffect(() => { // handle piano played on keyboard
    if (!isMobile) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const eventKey: string = e.key.toUpperCase();
        const key: string = eventKey;
        // const key: string = eventKey === ";"
        // ? "semicolon"
        // : eventKey; // for qwerty keyboards
        if (!key || pressedNotes.get(key)) return;
        playKey(key, keysRef.current);
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        const eventKey = e.key.toUpperCase();
        const key: string = eventKey;
        // const key: string = eventKey === ";"
        // ? "semicolon"
        // : eventKey; // for qwerty keyboards
        if (!key) return;
        stopKey(key, keysRef.current);
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => { // remove Eventlistener when component is unmount
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [isMobile, playKey, pressedNotes, stopKey]);

  // highligts bothClefsData C touches for tutorial
  classN.Q += `${isTutoNotes ? " tuto" : ""}`;
  classN.K += `${isTutoNotes ? " tuto" : ""}`;

  return (
  // <div id="pianoKeyboard">
    <ul ref={pianoRef} id="keyboard" className={isPianoActive ? "" : "disable"}>
      {isMobile
        ? <>
          <li
            data-note="C"
            ref={note1Ref}
            className={classN.C}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>C</li>
          <li
            data-note="C#"
            className={classN[`C#`]}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              C#</li>
          <li
            data-note="D"
            className={classN.D}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              D</li>
          <li
            data-note="D#"
            className={classN[`D#`]}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              D#</li>
          <li
            data-note="E"
            className={classN.E}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              E</li>
          <li
            data-note="F"
            className={classN.F}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              F</li>
          <li
            data-note="F#"
            className={classN[`F#`]}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              F#</li>
          <li
            data-note="G"
            className={classN.G}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              G</li>
          <li
            data-note="G#"
            className={classN[`G#`]}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              G#</li>
          <li
            data-note="A"
            className={classN.A}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              A</li>
          <li
            data-note="A#"
            className={classN[`A#`]}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              A#</li>
          <li
            data-note="B"
            className={classN.B}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              B</li>
        </>
        : <>
          <li
            data-note="C"
            ref={note1Ref}
            className={classN.Q}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              Q</li>
          <li
            data-note="C#"
            className={classN.Z}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              Z</li>
          <li
            data-note="D"
            className={classN.S}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              S</li>
          <li
            data-note="D#"
            className={classN.E}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              E</li>
          <li
            data-note="E"
            className={classN.D}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              D</li>
          <li
            data-note="F"
            className={classN.F}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              F</li>
          <li
            data-note="F#"
            className={classN.T}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              T</li>
          <li
            data-note="G"
            className={classN.G}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              G</li>
          <li
            data-note="G#"
            className={classN.Y}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              Y</li>
          <li
            data-note="A"
            className={classN.H}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              H</li>
          <li
            data-note="A#"
            className={classN.U}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              U</li>
          <li
            data-note="B"
            className={classN.J}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              J</li>
          <li
            data-note="C2"
            ref={note2Ref}
            className={classN.K}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              K</li>
          <li
            data-note="C#2"
            className={classN.O}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              O</li>
          <li
            data-note="D2"
            className={classN.L}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              L</li>
          <li
            data-note="D#2"
            className={classN.P}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              P</li>
          <li
            data-note="E2"
            className={classN.M}
            onMouseDown={pressKey}
            onTouchStart={touchKey}>
              M</li>
        </>
      }
    </ul>
  // </div>
  );
};

export default Piano;
