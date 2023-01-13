import IUser from "dto/Authentication/IUser";
import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
} from "Http/Redux/Types/Types";

export interface ISignInRequest {
  type: typeof SIGNIN_REQUEST;
}

export interface ISignInSuccessPayload {
  token: string | null;
  user: IUser;
}

export interface ISignInSuccess {
  type: typeof SIGNIN_SUCCESS;
  payload: ISignInSuccessPayload;
}

export interface ISignInFailure {
  type: typeof SIGNIN_FAILURE;
  payload: string;
}

export const SignInRequest = (): ISignInRequest => {
  return {
    type: SIGNIN_REQUEST,
  };
};

export const SignInSuccess = (
  token: string | null,
  user: IUser
): ISignInSuccess => {
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

export const SignInFailure = (error: string): ISignInFailure => {
  return {
    type: SIGNIN_FAILURE,
    payload: error,
  };
};
