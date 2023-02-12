import { FC, useState } from "react";
import AlertModal from "./AlertModal";
import ErrorModalContent from "./Contents/ErrorModalContent";

export type AlertContentType = "answersIncomplete" | "";

interface Props {
  contentType: AlertContentType
  cancelConfirm: () => void
  isAlertOpen: boolean
};

const AlertErrorModal: FC<Props> = ({contentType, cancelConfirm, isAlertOpen}) => {

  const [open, setOpen] = useState(true);

      return (
       open ?  <AlertModal classN="error-modal" cancelConfirm={cancelConfirm} isAlertOpen={isAlertOpen}>
          {contentType === "answersIncomplete" ? <ErrorModalContent handleClose={() => setOpen(false)} />
          : null }
        </AlertModal>
        : null
      )
};

export default AlertErrorModal;

