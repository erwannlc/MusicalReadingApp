import { FC } from "react";
import AlertModal from "./AlertModal";
import ConfirmQuit from "./Contents/ConfirmQuit";

export type AlertContentType = "confirmQuitPlay" | "confirmSimpleQuit" | "";

type Props = {
  cancelConfirm: () => void,
  confirmQuitPlay: () => void
  quitTuto: () => void
  contentType: AlertContentType
};

const AlertMsgModal: FC<Props> = ({cancelConfirm, confirmQuitPlay, quitTuto, contentType}) => {
      return (
        <AlertModal id="confirm-modal">
          {contentType === "confirmSimpleQuit" ? <ConfirmQuit handleClose={cancelConfirm} closeTuto={quitTuto} />
          : contentType === "confirmQuitPlay" ? <ConfirmQuit handleClose={cancelConfirm} closeTuto={confirmQuitPlay}/>
          : null }
        </AlertModal>
      )
};

export default AlertMsgModal;

