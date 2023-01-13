/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import {
  FAILED_AUTHENTICATION_ERROR_MSG,
  TOKEN_HOLDER,
  USER_HOLDER,
} from "Helpers/Constants";
import AuthService from "Http/Services/AuthService";
import CartService from "Http/Services/CartService";
import LoginForm from "Models/FormModels/Authentication/LoginForm";
import SignupForm from "Models/FormModels/Authentication/SignupForm";
import { AddToMarketplaceCart } from "./ActionCreators/Cart/MarketPlaceCartCreator";
import {
  ISignInFailure,
  ISignInRequest,
  ISignInSuccess,
  SignInFailure,
  SignInRequest,
  SignInSuccess,
} from "./ActionCreators/SignInActionCreator";
import {
  ISignOutFailure,
  ISignOutRequest,
  ISignOutSuccess,
  SignOutRequest,
  SignOutSuccess,
} from "./ActionCreators/SignOutActionCreator";
import {
  ISignUpFailure,
  ISignUpRequest,
  ISignupSuccess,
  SignUpFailure,
  SignupRequest,
  SignUpSuccess,
} from "./ActionCreators/SignUpActionCreator";

export const PopulateCartAction =
  (current_cart: IMarketplaceCart | IFoodCart | null) =>
  async (dispatch: Function): Promise<boolean> => {
    let done = false;
    let cart: IMarketplaceCart | null = null;
    try {
      if (current_cart && current_cart.id) {
        // merge carts
        cart = await CartService.MergeCart(
          current_cart.cart_id || current_cart.id
        );
        dispatch(AddToMarketplaceCart(cart));
      }
      done = true;
    } catch (error: any) {}

    // dispatch an update to update the cart
    return done;
  };

export const SignInAction =
  (payload: LoginForm, current_cart: IMarketplaceCart | null) =>
  async (dispatch: Function): Promise<any> => {
    dispatch(SignInRequest);
    try {
      const response = await AuthService.AuthenticateUserRequest(payload);
      const formatted_response = AuthService.FormatUserData(
        response.data.login
      );
      if (formatted_response.token) {
        dispatch(
          SignInSuccess(formatted_response.token, formatted_response.user)
        );
        if (current_cart && current_cart.cart_id) {
          await AuthService.SetMagenttoToken();
          const cart = await CartService.MergeCart(current_cart.cart_id);
        }
        dispatch(PopulateCartAction(current_cart));
      } else {
        dispatch(SignInFailure(FAILED_AUTHENTICATION_ERROR_MSG));
      }
    } catch (error: any) {
      if (error.hasOwnProperty("message")) {
        dispatch(SignInFailure(error.message));
      }
    }
  };

export const SignUpAction =
  (User: SignupForm, history: any) =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(SignupRequest());
    try {
      const response = await AuthService.RegisterUserRequest(User);
      dispatch(SignUpSuccess(response));

      // TODO: Log user in before redirecting
      //history.push("/login"); // redirect to the home page or the login page
      if (response["status"] === "success") return true;
      return false;
    } catch (error: any) {
      if (error.hasOwnProperty("message")) {
        dispatch(SignUpFailure(error.message));
      }
      return false;
    }
  };

export const PersistUser =
  () =>
  async (dispatch: Function): Promise<void> => {
    const token = localStorage.getItem(TOKEN_HOLDER);
    const user = JSON.parse(`${localStorage.getItem(USER_HOLDER)}`);
    if (token && user && token !== undefined && token !== "undefined") {
      dispatch(SignInSuccess(token, user));
    }
    // else {
    //   dispatch(SignOutSuccess());
    // }
  };

export const SignOutAction =
  (history: any, pathname?: string) =>
  async (dispatch: Function): Promise<void> => {
    dispatch(SignOutRequest());
    try {
      await AuthService.SignOutRequest();
      dispatch(SignOutSuccess());
      history.push("/login", pathname !== "" && { from: pathname });
    } catch (error: any) {
      if (error.hasOwnProperty("message")) {
        dispatch(SignUpFailure(error.message));
      }
    }
  };

export type AuthAction =
  | ISignInRequest
  | ISignInSuccess
  | ISignInFailure
  | ISignOutRequest
  | ISignOutSuccess
  | ISignOutFailure
  | ISignUpRequest
  | ISignupSuccess
  | ISignUpFailure;
