import React, { type FC, useState } from "react";
import Dialog from "./Dialog";
import type { MessageObj } from "../../../types/MessageObj";
import "./modal.scss";

interface Props {
  children: React.ReactNode
  handleMessage: (message: MessageObj) => void
  message: MessageObj
  score: number
  gameLength: number
  quitGame: () => void
};

const Modal: FC<Props> = ({
  children,
  handleMessage,
  message,
  score,
  gameLength,
  quitGame
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  const openModal = () => {
    setModalOpen((bool) => !bool);
    handleMessage({ ...message, isModal: true });
  };

  const SavedScore: FC = () => {
    const scorePercent: number = Math.round(score * 100 / gameLength);
    return (
      <>
        {scorePercent > 80
          ? <>
            <p className="end-of-game center">
              Vous avez {scorePercent}&nbsp;% de bonnes réponses. Bravo&nbsp;!
              </p>
            <p className="end-of-game">
              Continuez à progresser en augmentant la difficulté
              (accélérez le tempo ou passer au niveau suivant
              dans les options &nbsp;
                <span
                  style={{ fontSize: "140%", verticalAlign: "middle" }}>
                    &#x2699;&#xfe0e;
                </span> ).
              </p>
          </>
          : <>
            <p className="end-of-game center">
              Vous avez {scorePercent}&nbsp;% de bonnes réponses.</p>
            <p className="end-of-game">
              Essayez d&apos;atteindre un score d&apos;au moins 80&nbsp;% !
               Réduisez le tempo ou le niveau si besoin.</p>
          </>
        }
        <button onClick={openModal} className="open-modal">
          Cliquez ici pour afficher la correction.
        </button>
        <button onClick={quitGame} className="back-to-default">
          Quiiter la partie
        </button>
      </>
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    handleMessage(
      {
        ...message,
        content: <SavedScore />,
        className: "answers",
        isModal: false
      });
  };

  return (
    <Dialog
      id="message--dialog"
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeOnOutsideClick
    >
      {children}
    </Dialog>
  );
};

export default Modal;
