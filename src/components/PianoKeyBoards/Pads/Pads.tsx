import { useEffect, useRef } from "react";
import type { FC, MouseEvent, TouchEvent } from "react";
import type { NodesKeys } from "../../../types/Nodes";
import type { NodeObj } from "../../../utils/Hooks/useClientRect";
import useClientRect from "../../../utils/Hooks/useClientRect";
import "./pads.scss";

interface Props {
  onPlay: (keyValue: string) => void
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
  isPianoActive: boolean
};

const Pads: FC<Props> = (
  {
    onPlay,
    updateNodes,
    isPianoActive
  }) => {
  const [nodeObj, padsRef] = useClientRect();
  useEffect(() => {
    updateNodes("padsDiv", nodeObj);
  }, [nodeObj, updateNodes]);
  const [padGNote, padGRef] = useClientRect(); // nodes for Tutorial
  useEffect(() => {
    updateNodes("padGNote", padGNote);
  }, [padGNote, updateNodes]);

  let clickedKey: HTMLButtonElement;
  // prevent onmousedown to trigger after touchstart
  const prevent = useRef(false);

  const handlePress = () => {
    clickedKey.classList.add("pressed");
    const keyValue = clickedKey.dataset.note as string;
    onPlay(keyValue);
  };

  const pressNote = (e: MouseEvent) => {
    if (prevent.current) {
      prevent.current = false;
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
  const stopKey = (pad: HTMLButtonElement | null) => {
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
  const classN = `note-buttons ${isPianoActive ? "" : "disable"}`;
  const padGClassN = "";
  return (
    <div ref={padsRef} className={classN}>
      <button data-note="C" onMouseDown={pressNote} onTouchStart={touchNote}>
        Do</button>
      <button data-note="D" onMouseDown={pressNote} onTouchStart={touchNote}>
        Ré</button>
      <button data-note="E" onMouseDown={pressNote} onTouchStart={touchNote}>
        Mi</button>
      <button data-note="F" onMouseDown={pressNote} onTouchStart={touchNote}>
        Fa</button>
      <button
        ref={padGRef}
        className={padGClassN}
        data-note="G"
        onMouseDown={pressNote}
        onTouchStart={touchNote}>
        Sol</button>
      <button data-note="A" onMouseDown={pressNote} onTouchStart={touchNote}>
        La</button>
      <button data-note="B" onMouseDown={pressNote} onTouchStart={touchNote}>
        Si</button>
    </div>
  );
};

export default Pads;
