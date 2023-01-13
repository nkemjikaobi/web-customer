import {
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCEESS,
} from "Http/Redux/Types/Types";

export interface ISignOutRequest {
  type: typeof SIGNOUT_REQUEST;
}

export interface ISignOutSuccess {
  type: typeof SIGNOUT_SUCEESS;
}

export interface ISignOutFailure {
  type: typeof SIGNOUT_FAILURE;
  payload: string;
}

export const SignOutRequest = (): ISignOutRequest => {
  return {
    type: SIGNOUT_REQUEST,
  };
};

export const SignOutSuccess = (): ISignOutSuccess => {
  return {
    type: SIGNOUT_SUCEESS,
  };
};

export const SignOutFailure = (error: string): ISignOutFailure => {
  return {
    type: SIGNOUT_FAILURE,
    payload: error,
  };
};
