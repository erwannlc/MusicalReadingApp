import { FC, useEffect } from "react";
import OptionsIndicator from "./OptionsIndicator";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import type { MessageObj } from "../../types/MessageObj";
import type { Options } from "../../types/Options";
import type { NodesKeys } from "../Tutorial/TutoData/nodesToHighLight";
import type { TutoData } from "../../types/TutoTypes";
import useClientRect, { NodeObj } from "../../utils/Hooks/useClientRect";
import "./game-messages.scss";

interface Props {
 message: MessageObj
 isPlaying: boolean
 options: Options
 handleMessage: (message: MessageObj) => void
 scoreNumber: number
 gameLength: number
 showOptions: () => void
 updateNodes: (key: NodesKeys, obj: NodeObj) => void
 tempoTime: number
 progressBarId: string | null
 isTutoOn: boolean
 tutoData: TutoData
};

interface MessageDivProps {
  message: MessageObj
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  highlight: boolean
}

const MessageDiv: FC<MessageDivProps> = ({message, updateNodes, highlight}) => { 
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    updateNodes("messageDiv", nodeObj);
  }, [nodeObj, updateNodes]);
    
  let className = `${"shadow-node"} ${message.className ? message.className : ""} ${highlight ? " tuto" : ""}`;
  return (
    <div ref={ref} id="message" className={className}>
      <>
      {message.content}
      </>
    </div>
  )
};

const GameMessages: FC<Props> = ({message, isPlaying, options, handleMessage, scoreNumber, gameLength, showOptions, updateNodes, tempoTime, progressBarId, isTutoOn, tutoData}) => {
  const isModal = message.isModal ? message.isModal : false;
  
  if (isModal) {
    return ( 
      <>
        <Modal handleMessage={handleMessage} message={message} score={scoreNumber} gameLength={gameLength}>
          <MessageDiv message={message} updateNodes={updateNodes} highlight={tutoData.messageDiv.isTuto}/>
        </Modal>
        <div className="messages">
        </div>
      </>
    )
  } else 
  return (
    <div className="messages">
      <MessageDiv message={message} updateNodes={updateNodes} highlight={tutoData.messageDiv.isTuto}/>
      {!isPlaying && <OptionsIndicator options={options} showOptions={showOptions} updateNodes={updateNodes} tutoData={tutoData.optionsIndicator}/>}
      {progressBarId && isPlaying && <ProgressBar tempoTime={tempoTime} id={progressBarId} gameLength={gameLength} isTutoOn={isTutoOn}/> }
    </div>
  )
};

export default GameMessages;