import { FC, MouseEvent, TouchEvent, useEffect, useRef } from "react";
import useClientRect, { NodeObj } from "../../../utils/Hooks/useClientRect";
import { NodesKeys } from "../../Tutorial/TutoData/nodesToHighLight";
import "./pads.scss";

type Props = {
  onPlay: (keyValue: string) => void
  isTuto: boolean
  isTutoPlay: boolean
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
};

const Pads: FC<Props> = ({onPlay, isTuto, isTutoPlay, updateNodes}) => {

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
    if (!(isTuto && !isTutoPlay)) {
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

  return (
    <div id="pianoKeyboard">
      <div ref={padsRef} className="note-buttons">
      <button id="C-btn" data-note="C" onMouseDown={pressNote} onTouchStart={touchNote}>Do</button>
        <button id="D-btn" data-note="D" onMouseDown={pressNote} onTouchStart={touchNote}>Ré</button>
        <button id="E-btn" data-note="E" onMouseDown={pressNote} onTouchStart={touchNote}>Mi</button>
        <button id="F-btn" data-note="F" onMouseDown={pressNote} onTouchStart={touchNote}>Fa</button>
        <button ref={padGRef} id="G-btn" data-note="G" onMouseDown={pressNote} onTouchStart={touchNote}>Sol</button>
        <button id="A-btn" data-note="A" onMouseDown={pressNote} onTouchStart={touchNote}>La</button>
        <button id="B-btn" data-note="B" onMouseDown={pressNote} onTouchStart={touchNote}>Si</button>
      </div>
    </div>
  )
};

export default Pads;