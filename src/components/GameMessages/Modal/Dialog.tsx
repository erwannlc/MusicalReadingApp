import { useRef, useEffect } from "react";
import type { FC, MouseEvent, TouchEvent } from "react";
import CloseBtn from "./btn_close";
import "./close-button.scss";
import "./modal.scss";

// thx to https://codesandbox.io/u/souporserious
// https://souporserious.com/build-a-dialog-component-in-react/
interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  id: string
  closeOnOutsideClick: boolean
};

const Modal: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  id,
  closeOnOutsideClick
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogNode = dialogRef.current;

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        dialogNode.showModal();
      } else {
        dialogNode.close();
      };
    };
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onRequestClose();
  };

  function handleOutsideClick (event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    };
  }

  return (
    <dialog
     ref={dialogRef}
     id={id}
     className="modal"
     onClick={handleOutsideClick}
     onCancel={(e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
       handleCancel(e);
     }}>
        {children}
      <CloseBtn
       handleClose={onRequestClose}
       closeBtnClassName="close--correction" />
    </dialog>
  );
};

export default Modal;
