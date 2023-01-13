import { NotificationAction } from "../Actions/ActionCreators/NotificationActionCreator/NotificationActionCreator";
import { NOTIFY_USER, UNNOTIFY_USER } from "../Types/Types";

export interface INotificationState {
  body: string;
  show: boolean;
  title: string;
  type: string;
}

export const NotificationInitialState: INotificationState = {
  body: "",
  show: false,
  title: "",
  type: "",
};

const NotificationReducer = (
  state = NotificationInitialState,
  action: NotificationAction
): INotificationState => {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        show: action.payload.show,
        body: action.payload.body,
        title: action.payload.title,
        type: action.payload.type,
      };
    case UNNOTIFY_USER:
      return {
        ...state,
        show: false,
        body: "",
        title: "",
        type: "",
      };
    default:
      return { ...state };
  }
};

export default NotificationReducer;
