import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_COMPONENT,
} from "Http/Redux/Types/Modal/Types";

export const closeModal = (value: boolean) => {
  return {
    type: CLOSE_MODAL,
    payload: value,
  };
};

export const openModal = (value: boolean) => {
  return {
    type: OPEN_MODAL,
    payload: value,
  };
};

export const setComponent = (componentName: any) => {
  return {
    type: SET_COMPONENT,
    payload: componentName,
  };
};

export interface IModalState {
  open: false | true | null;
  close: true | false | null;
  component: "" | null;
}
