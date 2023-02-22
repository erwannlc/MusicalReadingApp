import { type FC } from "react";

interface Props {
  handleClose: () => void
};

const ErrorModalContent: FC<Props> = ({ handleClose }) => (
    <div id="confirm-content">
      <p>qdsdsdqsdsdsdd</p>
      <div className="btn-wrapper">
        <button className="cancel" onClick={handleClose}>Retourner au tutoriel</button>
      </div>
    </div>
);

export default ErrorModalContent;
