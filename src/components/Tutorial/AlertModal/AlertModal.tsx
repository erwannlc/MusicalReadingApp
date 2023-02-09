import { FC } from "react";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode
  classN: string
  cancelConfirm: () => void
  isAlertOpen: boolean
};

const AlertModal:FC<Props> = ({children, classN, cancelConfirm, isAlertOpen}) => { 
  return (
    <Modal 
    children={children}
    classN={classN}
    isOpen={isAlertOpen}
    onRequestClose={cancelConfirm}
    closeOnOutsideClick/>
  )
};
export default AlertModal;