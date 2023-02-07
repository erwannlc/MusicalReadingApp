import React, { FC, useState } from "react";
import Dialog from "./Dialog";
import type { MessageObj } from "../../../types/MessageObj";
import "./modal.scss"

type Props = {
  children: React.ReactNode
  handleMessage: (message: MessageObj) => void
  message: MessageObj
  score: number
  gameLength: number
};

const Modal: FC<Props> = ({
  children,
  handleMessage,
  message,
  score,
  gameLength
}) => {

  const [modalOpen, setModalOpen] = useState(true);
  const openModal = () => {   
    setModalOpen((bool) => !bool);
    handleMessage({...message, isModal: true});
  };

  const SavedScore: FC = () => {
    const scorePercent: number = Math.round(score * 100 / gameLength);
    return (
      <>
        {scorePercent > 80 ? 
          <>
            <p className="end-of-game center">Vous avez {scorePercent}&nbsp;% de bonnes réponses. Bravo&nbsp;! </p>
            <p className="end-of-game">Continuez à progresser en augmentant la difficulté (accélérez le tempo ou passer au niveau suivant dans les options &nbsp;<span style={{fontSize:"140%", verticalAlign: "middle"}}>&#x2699;&#xfe0e;</span> ).</p> 
          </>
        : <>
            <p className="end-of-game center">Vous avez {scorePercent}&nbsp;% de bonnes réponses.</p>
            <p className="end-of-game">Essayez d'atteindre un score d'au moins 80&nbsp;% ! Réduisez le tempo ou le niveau si besoin.</p>
          </>
        }        
        <button onClick={openModal} className="open-modal">
          Cliquez ici pour afficher la correction.
        </button>
      </>
    )
  };

  const closeModal = () => {
    setModalOpen(false);
    handleMessage({...message, content: <SavedScore />, className: "answers", isModal: false});
  };

  return (
    <Dialog 
      children={children}
      id="message--dialog"
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeOnOutsideClick
    />
  )
};

export default Modal;
