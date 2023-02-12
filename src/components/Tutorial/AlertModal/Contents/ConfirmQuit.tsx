import { FC } from "react";

interface Props {
  handleClose: () => void,
  closeTuto: () => void
};

const ConfirmQuitPlay: FC<Props> = ({handleClose, closeTuto}) => {
  const confirmQuit = () => closeTuto();
  const cancelConfirm = () => handleClose();
  return (
    <div id="confirm-content">
      <p>Ëtes-vous sûr.e de vouloir quitter le Tutoriel en cours ?</p>
      <div className="btn-wrapper">
        <button className="confirm" onClick={confirmQuit}>Oui, je veux quitter</button>
        <button className="cancel" onClick={cancelConfirm}>Retourner au tutoriel</button>
      </div>
    </div>
  );
};

export default ConfirmQuitPlay;