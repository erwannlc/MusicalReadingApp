import { FC } from "react";

type Props = {
  handleClose: () => void
}; 

const ErrorModalContent: FC<Props> = ({handleClose}) => {

  return (
    <div id="confirm-content">
      <p>qdsdsdqsdsdsdd</p>
      <div className="btn-wrapper">
        <button className="cancel" onClick={handleClose}>Retourner au tutoriel</button>
      </div>
    </div>
  );
};

export default ErrorModalContent;