/* eslint-disable @typescript-eslint/ban-types */
import INotification from "dto/Notification/INotification";
import {
  NotifyUserActionCreator,
  UnNotifyUserActionCreator,
} from "./ActionCreators/NotificationActionCreator/NotificationActionCreator";

export const NotifyUserAction =
  (notification: INotification) =>
  (dispatch: Function): boolean => {
    let done = false;
    try {
      dispatch(NotifyUserActionCreator(notification));

      setTimeout(() => {
        dispatch(UnNotifyUserActionCreator(notification));
      }, 3000);

      done = true;
    } catch (err) {}
    return done;
  };
