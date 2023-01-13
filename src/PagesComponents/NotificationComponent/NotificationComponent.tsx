/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import {
  NOTIFICATION_ERROR_SECONDARY_COLOR,
  NOTIFICATION_SUCCESS_COLOR,
  NOTIFICATION_SUCCESS_SECONDARY_COLOR,
} from "Helpers/Constants";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import React, { Fragment } from "react";
import styles from "./NotificationComponent.module.scss";

interface IProps {
  className?: string;
  closeNotification: Function;
  messageHeader?: string;
  message: string;
  type?: string;
}

const AuthNotification: React.FunctionComponent<IProps> = ({
  className,
  closeNotification,
  messageHeader,
  message,
  type,
}: IProps) => {
  const backGroundColor: any = type;
  const iconBg: any =
    type === NOTIFICATION_SUCCESS_COLOR
      ? NOTIFICATION_SUCCESS_SECONDARY_COLOR
      : NOTIFICATION_ERROR_SECONDARY_COLOR;
  const customStyle = {
    backgroundColor: backGroundColor,
    color: "#fff",
  };
  const iconStyle = {
    backgroundColor: iconBg,
  };
  return (
    <Fragment>
      <div
        className={composeClasses(
          className ?? "",
          composeClasses(styles.loginWrapper)
        )}
        style={customStyle}
      >
        <div className={styles.loginNotification}>
          <div className={styles.tick}>
            {type === NOTIFICATION_SUCCESS_COLOR ? (
              <Icon name="tick" />
            ) : (
              <Icon name="exclamation" />
            )}
          </div>
          <div className={styles.message}>
            <label
              dangerouslySetInnerHTML={getSanitizedHtml(messageHeader ?? "")}
            />
            <p dangerouslySetInnerHTML={getSanitizedHtml(message ?? "")} />
          </div>
        </div>
        <div
          className={styles.closeButton}
          onClick={(e) => closeNotification(e)}
          style={iconStyle}
        >
          <Icon name="closeWhite" />
        </div>
      </div>
    </Fragment>
  );
};

AuthNotification.defaultProps = {
  className: "",
  messageHeader: undefined,
  type: "",
};

export default AuthNotification;
