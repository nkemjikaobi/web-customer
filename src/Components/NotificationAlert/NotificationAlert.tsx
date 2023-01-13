/* eslint-disable @typescript-eslint/ban-types */
import INotification from "dto/Notification/INotification";
import { connect } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import { NotifyUserAction } from "Http/Redux/Actions/NotificationAction";
import AuthNotification from "PagesComponents/NotificationComponent/NotificationComponent";
import styles from "./NotificationAlert.module.scss";
import { composeClasses } from "libs/utils/utils";
import {
  NOTIFICATION_ERROR_COLOR,
  NOTIFICATION_SUCCESS_COLOR,
} from "Helpers/Constants";

//In the future if we are to make use of the remaining classes, replace them with their color codes
export const NotificationAlertType = {
  Error: `${NOTIFICATION_ERROR_COLOR}`,
  Primary: "bg-primary text-white",
  Secondary: "bg-secondary text-white",
  Success: `${NOTIFICATION_SUCCESS_COLOR}`,
  Warning: "bg-warning text-white",
  Info: "bg-info text-white",
  Light: "bg-light",
  Dark: "bg-dark text-white",
};

interface INotificationAlert {
  notification?: INotification;
  NotifyUserAction: Function;
  flashShow?: any;
}

const NotificationAlert: React.FunctionComponent<INotificationAlert> = (
  props: INotificationAlert
) => {
  const [show, setShow] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    let mounted = props.notification;

    if (mounted) {
      setShow(mounted.show ?? false);
      setBody(mounted.body ?? "");
    }
    return () => {
      mounted = undefined;
    };
  }, [props]);

  useEffect(() => {
    let mounted = false;
    mounted &&
      setTimeout(() => {
        setShow(mounted);
      }, 2000);
    return () => {
      mounted = false;
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    props.NotifyUserAction({
      body: "",
      show: false,
      title: "",
      type: "",
    });
  };

  return (
    <>
      {show === true ? (
        <div
          className={composeClasses(
            props.flashShow ? styles.notificationBase : styles.notificationBase2
          )}
        >
          <AuthNotification
            className={"float-end"}
            closeNotification={handleClose}
            message={body}
            type={props.notification?.type}
          />
        </div>
      ) : (
        <Fragment />
      )}
    </>
  );
};

NotificationAlert.defaultProps = {
  notification: undefined,
  flashShow: null,
};

const mapStateToProps = (state: any) => ({
  notification: state.notification,
  flashShow: state.flashBanner.show,
});

export default connect(mapStateToProps, { NotifyUserAction })(
  NotificationAlert
);
