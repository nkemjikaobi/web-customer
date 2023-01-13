import INotification from "dto/Notification/INotification";
import { NOTIFY_USER, UNNOTIFY_USER } from "Http/Redux/Types/Types";

export interface INotifyUserActionCreator {
  type: typeof NOTIFY_USER;
  payload: INotification;
}

export const NotifyUserActionCreator = (
  payload: INotification
): INotifyUserActionCreator => ({ type: NOTIFY_USER, payload });

export interface IUnNotifyUserActionCreator {
  type: typeof UNNOTIFY_USER;
  payload: INotification;
}

export const UnNotifyUserActionCreator = (
  payload: INotification
): IUnNotifyUserActionCreator => ({
  type: UNNOTIFY_USER,
  payload,
});

export type NotificationAction =
  | INotifyUserActionCreator
  | IUnNotifyUserActionCreator;
