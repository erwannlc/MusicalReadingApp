import { useRef, useEffect, FC } from "react";
// import type { StylingObj } from "../../../types/TutoStylingByStep";
import type { CSSPropertiesWithVars } from "../../../../types/CSSPropertiesWithVars";
import "../tuto-dialog.scss";


// thx to https://codesandbox.io/u/souporserious
type Props = {
  children: React.ReactNode
  isOpen: boolean
  id: string
  modalClassName: string
  styling: CSSPropertiesWithVars
};

const Dialog: FC<Props> = ({ children, isOpen, id, modalClassName, styling}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
 
  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      if (isOpen) {
        dialogNode.show();
      } else {
        dialogNode.close();
      };
    };
  }, [isOpen]);

  return <dialog ref={dialogRef} id={id} className={modalClassName} style={styling}>{children}</dialog>;
};

export default Dialog;

