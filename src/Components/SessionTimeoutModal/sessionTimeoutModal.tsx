import Icon from "Components/Icons";
import React from "react";
import styles from "./sessionTimeoutModal.module.scss";
interface IProps {
  second: any;
  closeModal: any;
  logoutUser: any;
}
const SessionTimeoutModal: React.FunctionComponent<IProps> = ({
  second,
  closeModal,
  logoutUser,
}: IProps) => {
  return (
    <div className={styles.timeoutModal}>
      <h1 className={styles.timeoutModal_title}>Are you still here ?</h1>
      <div className={styles.timeoutModal_icon}>
        <Icon name="timeoutClock" />
      </div>
      <p className={styles.timeoutModal_text}>
        If you’re inactive on the app for up to {second} seconds, we’ll sign you
        out to protect your account.
      </p>
      <div className={styles.timeoutModal_buttons}>
        <button className={styles.inactiveButton} onClick={() => logoutUser()}>
          No, I’m done.
        </button>
        <button className={styles.activeButton} onClick={() => closeModal()}>
          Yes, I’m still here.
        </button>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
