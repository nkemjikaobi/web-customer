import IUser from "dto/Authentication/IUser";
import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "Http/Redux/Types/Types";

// SIGN UP ACTION CREATORS
export interface ISignUpRequest {
  type: typeof SIGNUP_REQUEST;
}

export const SignupRequest = (): ISignUpRequest => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export interface ISignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: string;
}

export const SignUpSuccess = (message: string): ISignupSuccess => {
  return {
    type: SIGNUP_SUCCESS,
    payload: message,
  };
};

export interface ISignUpFailure {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export const SignUpFailure = (error: string): ISignUpFailure => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};
