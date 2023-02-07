import { FC } from "react";
import type { MessageObj } from "../../../types/MessageObj";

const DefaultMsgContent: FC<{switchOptionsNode: HTMLElement, playBtnNode: HTMLElement}> = ({switchOptionsNode, playBtnNode}) => {
  const handleHover = (node: string) => {
    node === "switch" ? switchOptionsNode.classList.add("tuto")
    : playBtnNode.classList.add("tuto")
  };
  const handleLeave = (node: string) => {
    node === "switch" ? switchOptionsNode.classList.remove("tuto")
    : playBtnNode.classList.remove("tuto")
  };
  return (
    <>
    <p onMouseEnter={() => handleHover("switch")} onMouseLeave={() => handleLeave("switch")}>Appuyez sur&nbsp; <span style={{fontSize:"140%", verticalAlign: "middle"}}>&#x2699;&#xfe0e;</span> &nbsp;pour afficher les options</p>
    <p onMouseEnter={() => handleHover("play")} onMouseLeave={() => handleLeave("play")}>Appuyez sur&nbsp; <span style={{fontSize:"110%", verticalAlign: "middle"}}>&#x25B6;&#xfe0e;</span> &nbsp;pour lancer une partie !</p>
  </>
  )
};

const getDefaultMessage = (switchOptionsNode: HTMLElement, playBtnNode: HTMLElement) => {
  const defaultMessage: MessageObj = {
    className: "default",
    content: 
      <DefaultMsgContent switchOptionsNode={switchOptionsNode} playBtnNode={playBtnNode}/>
  };
  return defaultMessage
};

export default getDefaultMessage;