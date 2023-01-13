/* eslint-disable @typescript-eslint/ban-types */
/**
 * Class to handle auth api calls to the external server
 */

import { AxiosResponse } from "axios";
import IUser from "dto/Authentication/IUser";
import * as CONSTANTS from "Helpers/Constants";
import LoginForm from "Models/FormModels/Authentication/LoginForm";
import SignupForm from "Models/FormModels/Authentication/SignupForm";
import {
  FORGOT_PASSWORD_URL,
  GET_MAGENTTO_TOKEN_URL,
  LOGIN_URL,
  REGISTRATION_URL,
  RESET_PASSWORD_URL,
  VERIFY_TOKEN_PASSWORD_URL,
} from "../Routes/Authentication";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import HttpService from "./HttpService";
import MarketplaceService from "./MarketplaceService";
import IMap from "dto/Utils/IMap";
import storage from "redux-persist/lib/storage";

export interface IAuthFormatter {
  token: string;
  user: IUser;
}

class AuthService extends HttpService {
  /**
   * Method to get the account balance from local storage
   * @returns accountBalance number
   */
  static GetUserBalance: Function = (): number => {
    const accountBalance = localStorage.getItem(CONSTANTS.USER_BALANCE);
    return parseFloat(accountBalance ?? "0");
  };

  /**
   * Method to get the magentto token for marketplace calls
   * @returns magentto token
   */
  static getStoredMagenttoToken = (): string => {
    return "";
  };

  /**
   * Method to get the first name of logged in user from local storage
   * @returns firstName string
   */
  static GetFirstName: Function = (): string => {
    try {
      const userDetails: any = localStorage.getItem(CONSTANTS.USER_HOLDER);
      const formattedUserDetails = userDetails && JSON.parse(userDetails);
      const firstName: string =
        formattedUserDetails && formattedUserDetails.firstName.split(" ")[0];
      return firstName;
    } catch (error: any) {
      return "";
    }
  };

  /**
   * Method to extract tht user account balance from the api response
   * @param payload Object - balance data from api response
   * @returns balance number
   */
  static FormatUserBalance: Function = (payload: any): number => {
    let balance = 0;
    try {
      const balanceObject = payload.kpay.find(
        (wallet: any) =>
          wallet.wallet_type_name.toLowerCase() === "Standard".toLowerCase()
      );
      balance = parseFloat(balanceObject.amount) ?? 0;
    } catch (error: unknown) {}
    return balance;
  };

  /**
   * Method to get response from auth on silkroad and format
   * as a user and token
   */
  static FormatUserData: Function = (payload: any): IAuthFormatter => {
    return {
      token: payload.token,
      user: {
        firstName: payload.firstname,
        lastName: payload.lastname,
        username: payload.username,
        phoneNumber: payload.phone_number,
        isKongaPrime: payload.is_konga_prime_customer,
        emailAddress: payload.email,
        createdAt: payload.created_at,
      },
    };
  };

  /**
   * Method to get the current logged in user from local stroage
   * @returns User user | null
   */
  static GetLoggedInUser: Function = (): IUser | null =>
    JSON.parse(`${localStorage.getItem(CONSTANTS.USER_HOLDER)}`);

  /**
   * Fetch the magentto token via the api and set the token
   * @return isSet: boolean
   */
  static SetMagenttoToken: Function = async (): Promise<boolean> => {
    try {
      const payload = {
        content: "token",
        token: AuthService.GetToken(),
      };
      const {
        data: {
          data: {
            getAuthTokenForSSO: { token },
          },
        },
      } = await axios.post(GET_MAGENTTO_TOKEN_URL, payload);
      await storage.setItem(CONSTANTS.MAGENTTO_TOKEN_HOLDER, token);
      return true;
    } catch (execption: unknown) {}
    return false;
  };

  /**
   * Method to handle authentication of a user
   * @param payload LoginForm - Authentication Payload from the PWA
   * @returns AxiosResponse.data
   */
  static AuthenticateUserRequest: Function = async (
    payload: LoginForm
  ): Promise<any> => {
    const headers = {
      "Content-Type": "application/json",
      source: CONSTANTS.PWA_HEADER,
      Authorization: localStorage.getItem(CONSTANTS.USER_HOLDER),
    };
    const { data }: AxiosResponse<any> = await axios.post(LOGIN_URL, payload, {
      headers,
    });
    const responseStatus: string = data.status;
    const responseData: any = data.data;

    if (responseStatus === CONSTANTS.SUCCESS) {
      // set the data sent from the server in the localstorage
      // set the user data
      // set the token

      const storageData = AuthService.FormatUserData(responseData.login);
      const accountBalance = AuthService.FormatUserBalance(
        responseData.balance
      );

      localStorage.setItem(
        CONSTANTS.USER_HOLDER,
        JSON.stringify(storageData.user)
      ); // this would be moved to firebase
      localStorage.setItem(CONSTANTS.TOKEN_HOLDER, storageData.token); // this would be moved to firebase
      localStorage.setItem(CONSTANTS.USER_BALANCE, accountBalance);

      AuthService.GetLoggedInUser();
      await AuthService.SetMagenttoToken();
      return data;
    } else {
      throw new Error(CONSTANTS.FAILED_AUTHENTICATION_ERROR_MSG);
    }
  };

  /**
   * Method to signup a user.
   * @param payload :SignupForm - register user / signup form payload
   * @returns Error|bool
   */
  static RegisterUserRequest: Function = async (
    payload: SignupForm
  ): Promise<any> => {
    const { status, data }: AxiosResponse<any> = await axios.post(
      REGISTRATION_URL,
      payload
    );

    if (status !== CONSTANTS.HTTP_CREATED) {
      throw new Error(CONSTANTS.INVALID_ENTRY_ERROR_MSG);
    }
    return data;
  };

  /**
   * Method to manage user forgot password.
   * @param payload :ForgotPasswordForm - forgot password, payload data
   * @returns
   */
  static ForgotPasswordRequest: Function = async (
    payload: string
  ): Promise<any> => {
    const result: any = await axios.post(FORGOT_PASSWORD_URL, {
      email: payload,
    });
    if (result.status === CONSTANTS.SUCCESS) {
      return true;
    }
    return false;
  };

  /**
   * Method to sign out the user
   */
  static SignOutRequest: Function = () => {
    localStorage.clear();
    if (localStorage.getItem(CONSTANTS.USER_HOLDER)) {
      throw new Error(CONSTANTS.USER_HOLDER_DELETION_ERROR);
    }
  };

  /**
   * Method to get the token from the local storage
   * @returns token string
   */
  static GetToken = (): string | null =>
    localStorage.getItem(CONSTANTS.TOKEN_HOLDER);

  /**
   * Method to get the token from the local storage
   * @returns token string
   */
  static GetMagenttoToken: Function = async (): Promise<string | null> =>
    await storage.getItem(CONSTANTS.MAGENTTO_TOKEN_HOLDER);

  /**
   * Method to generate a header for axios requests
   * @returns header
   */
  public static CreateTempHeaders = async (
    store_id = MarketplaceService.STORE_ID,
    is_a_guest = false
  ): Promise<IMap> => await AuthService.SetRequestHeaders(store_id, is_a_guest);

  /**
   * Method to set the request headers.
   * @param store_id: number - the store that the request is being sent to.
   * @param is_a_guest: boolean - is the request sent by a guest or logged in user.
   * @param isMarketplace: boolean - is it a marketplace / igbimo call
   * @returns response: IMap
   */
  public static SetRequestHeaders: Function = async (
    store_id = MarketplaceService.STORE_ID,
    is_a_guest = false,
    isMarketplace = false
  ): Promise<IMap> => {
    let payload: IMap = {
      "Content-Type": "application/json",
      storeid: store_id,
      source: CONSTANTS.PWA_HEADER,
      "Access-Control-Allow-Origin": "*",
    };

    if (!is_a_guest) {
      if (isMarketplace) {
        payload = {
          ...payload,
          token: (await AuthService.GetMagenttoToken()) ?? null,
        };
      } else {
        payload = { ...payload, token: AuthService.GetToken() ?? null };
      }
    }

    return payload;
  };

  /**
   * Method to generate a header for axios requests (magentto)
   * @returns header
   */
  public static CreateMagenttoHeaders = (
    store_id = MarketplaceService.STORE_ID,
    is_a_guest = false
  ): IMap => {
    let payload: IMap = {
      "Content-Type": "application/json",
      storeid: store_id,
      source: CONSTANTS.PWA_HEADER,
    };

    if (!is_a_guest) {
      payload = {
        ...payload,
        token: AuthService.getStoredMagenttoToken() ?? null,
      };
    }

    return payload;
  };

  /**
   * Method to verify user forgot password one time password (OTP).
   *
   * @param otp: string - OTP sent to user via email.
   * @param email: string - user email address.
   */
  public static VerifyPasswordOTP = async (
    otp: string,
    emailAddress: string
  ): Promise<any> => {
    const { data }: any = await axios.post(VERIFY_TOKEN_PASSWORD_URL, {
      email: emailAddress,
      otp: otp,
    });

    if (data.status === CONSTANTS.SUCCESS) {
      return { request_id: data.data.request_id, status: data.status };
    }
    return data.status;
  };

  /**
   * Method to reset the user forgot password.
   *
   * @param password: string - new password.
   * @param cpassword: string - text to confirm the new password.
   * @param email: string - user email address.
   */
  public static ResetPassword = async (
    password: string,
    cpassword: string,
    emailAddress: string,
    requestId: string
  ): Promise<any> => {
    const res: any = await axios.post(RESET_PASSWORD_URL(requestId), {
      email: emailAddress,
      password: password,
      cpassword: cpassword,
    });
    if (res.data.status === CONSTANTS.SUCCESS) {
      return true;
    }
    return false;
  };
}

export default AuthService;
