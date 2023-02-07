import { FC } from "react";
import "./close-button.scss";


type Props = {
  handleClose: () => void
  closeBtnClassName: string
};

const CloseBtn: FC<Props> = ({ handleClose, closeBtnClassName }) => {
  return (
    <button className={closeBtnClassName} onClick={handleClose} title="Quitter le tutoriel">
      <span className={`${closeBtnClassName}_line`}></span>
    </button>
  );
};
export default CloseBtn;