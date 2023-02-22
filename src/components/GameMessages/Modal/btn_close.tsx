import { type FC } from "react";
import "./close-button.scss";

interface Props {
  handleClose: () => void
  closeBtnClassName: string
};

const CloseBtn: FC<Props> = ({ handleClose, closeBtnClassName }) => (
    <button className={closeBtnClassName} onClick={handleClose} title="Quitter le tutoriel">
      <span className={`${closeBtnClassName}_line`}></span>
    </button>
);
export default CloseBtn;
