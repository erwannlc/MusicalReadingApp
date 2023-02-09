import { FC } from "react";
import AlertModal from "./AlertModal";
import ConfirmQuit from "./Contents/ConfirmQuit";

export type AlertContentType = "confirmQuitPlay" | "confirmSimpleQuit" | "";

type Props = {
  cancelConfirm: () => void
  confirmQuitPlay: () => void
  quitTuto: () => void
  contentType: AlertContentType
  isAlertOpen: boolean
};

const AlertMsgModal: FC<Props> = ({cancelConfirm, confirmQuitPlay, quitTuto, contentType, isAlertOpen}) => {
      return (
        <AlertModal classN="confirm-modal" cancelConfirm={cancelConfirm} isAlertOpen={isAlertOpen}>
          {contentType === "confirmSimpleQuit" ? <ConfirmQuit handleClose={cancelConfirm} closeTuto={quitTuto} />
          : contentType === "confirmQuitPlay" ? <ConfirmQuit handleClose={cancelConfirm} closeTuto={confirmQuitPlay}/>
          : null }
        </AlertModal>
      )
};

export default AlertMsgModal;

