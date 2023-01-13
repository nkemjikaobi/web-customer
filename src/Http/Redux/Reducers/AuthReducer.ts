/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_HOLDER } from "Helpers/Constants";
import jwt from "jsonwebtoken";
import { AuthAction } from "../Actions/AuthAction";

import {
  IAuthState,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCEESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../Types/Types";

/**
 * Method to check if the token is still valid
 * @param token string - token to confirm
 * @returns any | null
 */
export const IsValidToken = (token: string): any | null => {
  const decoded: any = jwt.decode(token);
  return decoded && new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

let token: string | null = localStorage?.getItem(USER_HOLDER);
token = token && IsValidToken(token);

export const AuthInitialState: IAuthState = {
  CurrentUser: null,
  Token: token,
  Error: "",
  Loading: false,
  IsAuthenticated: false,
};

const AuthReducer = (
  state = AuthInitialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case SIGNIN_REQUEST:
    case SIGNUP_REQUEST:
    case SIGNOUT_REQUEST:
      return {
        ...state,
        Loading: true,
        IsAuthenticated: false,
      };
    case SIGNIN_FAILURE:
    case SIGNOUT_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        Token: null,
        Loading: false,
        IsAuthenticated: false,
        CurrentUser: null,
        Error: action.payload,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        Token: action.payload.token,
        CurrentUser: action.payload.user,
        IsAuthenticated: action.payload.user ? true : false,
      };
    case SIGNUP_SUCCESS:
    case SIGNOUT_SUCEESS:
    default:
      return { ...state };
  }
};

export default AuthReducer;
