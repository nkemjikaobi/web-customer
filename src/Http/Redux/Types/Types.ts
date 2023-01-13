import IUser from "dto/Authentication/IUser";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";
export const SIGNOUT_SUCEESS = "SIGNOUT_SUCEESS";
export const SIGNOUT_FAILURE = "SIGNOUT_FAILURE";

export const NOTIFY_USER = "NOTIFY_USER";
export const UNNOTIFY_USER = "UNNOTIFY_USER";

export const REHYDRATE = "persist/REHYDRATE";

export interface IAuthState {
  CurrentUser: IUser | null;
  Token: string | null;
  Loading: boolean;
  Error: string;
  IsAuthenticated: boolean;
}
