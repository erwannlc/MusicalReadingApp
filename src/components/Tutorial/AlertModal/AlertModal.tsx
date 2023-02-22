import { type FC } from "react";
import Modal from "./Modal";

interface Props {
  children: React.ReactNode
  classN: string
  cancelConfirm: () => void
  isAlertOpen: boolean
};

const AlertModal: FC<Props> = (
  { children, classN, cancelConfirm, isAlertOpen }) => (
    <Modal
      classN={classN}
      isOpen={isAlertOpen}
      onRequestClose={cancelConfirm}
      closeOnOutsideClick>
      {children}
    </Modal>
);
export default AlertModal;
