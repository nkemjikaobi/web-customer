/* eslint-disable @typescript-eslint/ban-types */
import {
  closeModal,
  openModal,
  setComponent,
} from "../ActionCreators/Modal/modalActionCreator";

export const CloseModalAction =
  (payload: any) =>
  (dispatch: Function): void => {
    return dispatch(closeModal(payload));
  };

export const OpenModalAction =
  (payload: any) =>
  (dispatch: Function): void => {
    return dispatch(openModal(payload));
  };

export const SetComponentAction =
  (payload: any) =>
  (dispatch: Function): void => {
    return dispatch(setComponent(payload));
  };
