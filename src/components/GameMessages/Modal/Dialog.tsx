import { useRef, useEffect, FC, MouseEvent, TouchEvent } from "react";
import CloseBtn from "./btn_close";
import "./close-button.scss";
import "./modal.scss";

// thx to https://codesandbox.io/u/souporserious
type Props = {
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
  closeOnOutsideClick,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  //returning focus to the element that opened the Dialog, suggested from WAI-ARIA
  // const lastActiveElement = useRef(null);
  // lastActiveElement.current = document.activeElement;

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        dialogNode.showModal();
      } else {
        // lastActiveElement.current.focus();
        dialogNode.close();
      };
    };
  }, [isOpen]);

  //*****************  WHITH optionnal handleOutsideClick : (only if showModal() is called)
  // handleCancel listen to other ways of closing a dialog (like pressing escape)
  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      const handleCancel = (event: Event) => {
        event.preventDefault();
        onRequestClose();
      };
      dialogNode.addEventListener("cancel", handleCancel);
      return () => {
        dialogNode.removeEventListener("cancel", handleCancel);
      };
    };
  }, [onRequestClose]);

  function handleOutsideClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog ref={dialogRef} id={id} className="modal" onClick={handleOutsideClick}>
      {children}
      <CloseBtn handleClose={onRequestClose} closeBtnClassName="close--correction" />
    </dialog>
  );
};

//*****************  WHITHOUT optionnal handleOutsideClick :

// const Dialog = ({ children, open, onRequestClose, id }) => {
//   const dialogRef = useRef(null);

//   //returning focus to the element that opened the Dialog, suggested from WAI-ARIA
//   const lastActiveElement = useRef(null);

//   useEffect(() => {
//     const dialogNode = dialogRef.current;
//     if (open) {
//       lastActiveElement.current = document.activeElement;
//       dialogNode.showModal();
//     } else {
//       dialogNode.close();
//       lastActiveElement.current.focus();
//     }
//   }, [open]);

//   // handleCancel listen to other ways of closing a dialog (like pressing escape)
//   useEffect(() => {
//     const dialogNode = dialogRef.current;
//     const handleCancel = (event) => {
//       event.preventDefault();
//       onRequestClose();
//     };
//     dialogNode.addEventListener("cancel", handleCancel);
//     return () => {
//       dialogNode.removeEventListener("cancel", handleCancel);
//     };
//   }, [onRequestClose]);

//   return <dialog ref={dialogRef} id={id}>{children}</dialog>;
// };

export default Modal;