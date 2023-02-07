import { FC, useState } from "react";
import Modal from "./Modal";

type Props = {
  children: React.ReactNode
  id: string
};

const AlertModal:FC<Props> = ({children, id}) => {
  const [alertModalOpen, setAlertModalOpen] = useState(true);

  const closeAlertModal = () => setAlertModalOpen(false);
 
  return (
    <Modal 
    children={children}
    id={id}
    isOpen={alertModalOpen}
    onRequestClose={closeAlertModal}
    closeOnOutsideClick/>
  )
};
export default AlertModal;