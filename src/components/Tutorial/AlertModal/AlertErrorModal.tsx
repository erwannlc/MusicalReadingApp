import { FC, useState } from "react";
import AlertModal from "./AlertModal";
import ErrorModalContent from "./Contents/ErrorModalContent";

export type AlertContentType = "answersIncomplete" | "";

type Props = {
  contentType: AlertContentType
};

const AlertErrorModal: FC<Props> = ({contentType}) => {

  const [open, setOpen] = useState(true);

      return (
       open ?  <AlertModal id="error-modal">
          {contentType === "answersIncomplete" ? <ErrorModalContent handleClose={() => setOpen(false)} />
          : null }
        </AlertModal>
        : null
      )
};

export default AlertErrorModal;

