import { IModalState } from "Http/Redux/Actions/ActionCreators/Modal/modalActionCreator";
import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_COMPONENT,
} from "Http/Redux/Types/Modal/Types";

export const ModalInitialState: IModalState = {
  open: false,
  close: true,
  component: null,
};
const ModalReducer = (
  state: IModalState = ModalInitialState,
  action: { type: any; payload: any }
): IModalState => {
  const { type, payload } = action;
  switch (type) {
    case CLOSE_MODAL:
      return { ...state, close: payload };
    case OPEN_MODAL:
      return {
        ...state,
        open: payload,
      };
    case SET_COMPONENT:
      return {
        ...state,
        component: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ModalReducer;
