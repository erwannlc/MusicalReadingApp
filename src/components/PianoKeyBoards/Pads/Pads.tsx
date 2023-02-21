import { FC, MouseEvent, TouchEvent, useEffect, useRef } from "react";
import type { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import type { NodesBehavior } from "../../../types/TutoTypes";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import "./pads.scss";

interface Props {
  onPlay: (keyValue: string) => void
  isTutoOn: boolean
  isTutoPlay: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  nodesBehavior: NodesBehavior
  isPianoActive: boolean
};

const Pads: FC<Props> = ({onPlay, isTutoOn, isTutoPlay, updateNodes, nodesBehavior, isPianoActive}) => {

  const [nodeObj, padsRef] = useClientRect();
  useEffect(() => {
    updateNodes("padsDiv", nodeObj);
  }, [nodeObj, updateNodes]);
  const [padGNote, padGRef] = useClientRect(); // nodes for Tutorial
  useEffect(() => {
    updateNodes("padGNote", padGNote);
  }, [padGNote, updateNodes]);
  

  let clickedKey:HTMLButtonElement;
  const prevent = useRef(false); // prevent onmousedown to trigger after touchstart
  
  const handlePress = () => {
    clickedKey.classList.add("pressed");
    const keyValue = clickedKey.dataset.note as string; 
    if (!(isTutoOn && !isTutoPlay)) {
      onPlay(keyValue);
    };
  };

  const pressNote = (e: MouseEvent) => {
    if (prevent.current) {
      return prevent.current = false;
    } else {
      clickedKey = e.currentTarget as HTMLButtonElement;
      handlePress();
    }
  };
  const touchNote = (e: TouchEvent) => {
    prevent.current = true;
    clickedKey = e.currentTarget as HTMLButtonElement;
    handlePress();
  };
  const stopKey = (pad: HTMLButtonElement | null ) => {
    if (pad) pad.classList.remove("pressed");
    document.removeEventListener("mouseup", () => {
      stopKey(clickedKey);
    });
    document.removeEventListener("touchend", () => {
      stopKey(clickedKey);
    });
  };
  document.addEventListener("mouseup", () => {
    stopKey(clickedKey);
  });
  document.addEventListener("touchend", () => {
    stopKey(clickedKey);
  });
  const classN = `note-buttons ${nodesBehavior.padsDiv.highlight ? "tuto" : ""} ${isPianoActive ? "" : "disable"}`;
  let padGClassN = nodesBehavior.padGNote.highlight ? "tuto" : "";
  return (
    // <div id="pianoKeyboard">
      <div ref={padsRef} className={classN}>
        <button data-note="C" onMouseDown={pressNote} onTouchStart={touchNote}>Do</button>
        <button data-note="D" onMouseDown={pressNote} onTouchStart={touchNote}>Ré</button>
        <button data-note="E" onMouseDown={pressNote} onTouchStart={touchNote}>Mi</button>
        <button data-note="F" onMouseDown={pressNote} onTouchStart={touchNote}>Fa</button>
        <button ref={padGRef} className={padGClassN} data-note="G" onMouseDown={pressNote} onTouchStart={touchNote}>Sol</button>
        <button data-note="A" onMouseDown={pressNote} onTouchStart={touchNote}>La</button>
        <button data-note="B" onMouseDown={pressNote} onTouchStart={touchNote}>Si</button>
      </div>
    // </div>
  )
};

export default Pads;