import { type FC, useEffect } from "react";
import OptionsIndicator from "./OptionsIndicator";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import type { MessageObj } from "../../types/MessageObj";
import type { Options } from "../../types/Options";
import type { NodesKeys } from "../../types/Nodes";
import type { NodesBehavior } from "../../types/NodesBehavior";
import useClientRect, { type NodeObj } from "../../utils/Hooks/useClientRect";
import "./game-messages.scss";

interface Props {
  message: MessageObj
  isPlaying: boolean
  options: Options
  handleMessage: (message: MessageObj) => void
  scoreNumber: number
  gameLength: number
  showOptions: () => void
  updateNodes: (key: NodesKeys, obj: NodeObj | undefined) => void
  tempoTime: number
  progressBarId: string | null
  nodesBehavior: NodesBehavior
  quitGame: () => void
};

interface MessageDivProps {
  message: MessageObj
  updateNodes: (key: NodesKeys, obj: NodeObj) => void
  highlight: boolean
}

const MessageDiv: FC<MessageDivProps> = (
  { message, updateNodes, highlight }
) => {
  const [nodeObj, ref] = useClientRect();
  useEffect(() => {
    nodeObj && updateNodes("messageDiv", nodeObj);
  }, [nodeObj, updateNodes]);

  const className =
    `${"shadow-node"} 
    ${message.className ? message.className : ""}`;
  return (
    <div ref={ref} id="message" className={className}>
      <>
        {message.content}
      </>
    </div>
  );
};

const GameMessages: FC<Props> = ({
  message,
  isPlaying,
  options,
  handleMessage,
  scoreNumber,
  gameLength,
  showOptions,
  updateNodes,
  tempoTime,
  progressBarId,
  nodesBehavior,
  quitGame
}) => {
  const isModal = message.isModal ? message.isModal : false;

  if (isModal) {
    return (
      <>
        <Modal
         handleMessage={handleMessage}
        message={message}
        score={scoreNumber}
        gameLength={gameLength}
        quitGame={quitGame}>
          <MessageDiv
          message={message}
          updateNodes={updateNodes}
          highlight={nodesBehavior.messageDiv.highlight}/>
        </Modal>
        <div className="messages">
        </div>
      </>
    );
  } else {
    return (
      <div className="messages">
        <MessageDiv
         message={message}
        updateNodes={updateNodes}
        highlight={nodesBehavior.messageDiv.highlight}/>
        {!isPlaying && <OptionsIndicator
          options={options}
          showOptions={showOptions}
          updateNodes={updateNodes}
          nodesBehavior={nodesBehavior.optionsIndicator}/>
        }
        {progressBarId && isPlaying && <ProgressBar
          tempoTime={tempoTime}
          id={progressBarId}
          gameLength={gameLength}/>
        }
      </div>
    );
  }
};

export default GameMessages;
