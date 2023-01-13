import IPerson from "dto/Authentication/IPerson";
import IUser from "dto/Authentication/IUser";
import { SUCCESS } from "Helpers/Constants";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { GET_WALLET_BALANCE } from "Http/Routes/Authentication";
import {
  KPAY_USER_PROFILE_URL,
  SUBSCRIBE_FOR_NEWSLETTER,
  UPLOAD_PROFILE_IMAGE,
} from "Http/Routes/User";
import { isArray } from "lodash";
import IProfileImageData from "Models/FormModels/User/IProfileImageData";
import AuthService from "./AuthService";

class UserService {
  /**
   * Method that subscribes a user to konga online for news letters
   * @param email: string
   * @returns response: boolean
   */
  public static SubscribeForNewsLetter = async (
    email: string
  ): Promise<boolean> => {
    let response = false;
    try {
      const {
        data: { data },
      } = await axios.post(SUBSCRIBE_FOR_NEWSLETTER, { email: email });

      if (data && data.ok) {
        response = data.ok;
      }
    } catch (error) {}
    return response;
  };

  /**
   * Method to fetch the customer's account balance
   * @returns balance: float
   */
  public static GetWalletBalance = async (): Promise<number> => {
    let balance = 0.0;
    const headers = await AuthService.CreateTempHeaders();

    try {
      const {
        data: { data },
      } = await axios.get(GET_WALLET_BALANCE, { headers: headers });

      if (isArray(data) && data.length > 0) {
        const { amount } = data[0];
        balance = amount;
      }
    } catch (error: unknown) {}

    return balance;
  };

  /**
   * Method to upload a customer's / user's profile image
   * @param userImage
   */
  public static UploadUserProfileImage = async (
    imageData: IProfileImageData
  ): Promise<string> => {
    const headers = await AuthService.CreateTempHeaders();
    try {
      const { data } = await axios.post(UPLOAD_PROFILE_IMAGE, {}, { headers });

      if (data.status === SUCCESS) return data.data;
    } catch (exception: unknown) {}
    return "";
  };

  /***
   * TODO: Implement method
   * Method to update the user's KYC
   */

  /**
   * Method to get query user profile from konga pay.
   *
   * @return person: IPerson | null
   */
  public static GetUserProfileFromKPay = async (): Promise<IPerson | null> => {
    const headers = await AuthService.CreateTempHeaders();
    try {
      const user: IUser | null = AuthService.GetLoggedInUser();

      if (user) {
        const { data } = await axios.get(
          `${KPAY_USER_PROFILE_URL}=${user.phoneNumber || ""}`,
          { headers: headers }
        );

        if (data.status === SUCCESS) return data.data;
      }
    } catch (exception: unknown) {}
    return null;
  };
}

export default UserService;
