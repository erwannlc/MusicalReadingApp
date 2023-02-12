import { useRef, useEffect, FC, MouseEvent, TouchEvent } from "react";
import "./confirm-modal.scss"

// thx to https://souporserious.com/build-a-dialog-component-in-react/
interface Props {
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
  classN: string
  closeOnOutsideClick: boolean
};

const Dialog: FC<Props> = ({
  children,
  isOpen,
  onRequestClose,
  classN,
  closeOnOutsideClick,
}) => {
  const confirmModalRef = useRef<HTMLDialogElement>(null);

  //returning focus to the element that opened the Dialog, suggested from WAI-ARIA
  // const lastActiveElement = useRef(null);
  // lastActiveElement.current = document.activeElement;

  useEffect(() => {
    const dialogNode = confirmModalRef.current;
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
    const dialogNode = confirmModalRef.current;
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
    const dialogNode = confirmModalRef.current;
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog ref={confirmModalRef} className={classN} onClick={handleOutsideClick}>
      {children}
    </dialog>
  );
};

export default Dialog;


/*
//*****************  WHITHOUT optionnal handleOutsideClick :

// const Dialog = ({ children, open, onRequestClose, id }) => {
//   const confirmModalRef = useRef(null);

//   //returning focus to the element that opened the Dialog, suggested from WAI-ARIA
//   const lastActiveElement = useRef(null);

//   useEffect(() => {
//     const dialogNode = confirmModalRef.current;
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
//     const dialogNode = confirmModalRef.current;
//     const handleCancel = (event) => {
//       event.preventDefault();
//       onRequestClose();
//     };
//     dialogNode.addEventListener("cancel", handleCancel);
//     return () => {
//       dialogNode.removeEventListener("cancel", handleCancel);
//     };
//   }, [onRequestClose]);

//   return <dialog ref={confirmModalRef} id={id}>{children}</dialog>;
// };
*/