/* eslint-disable @typescript-eslint/ban-types */
import { AxiosResponse } from "axios";
import {
  HTTP_OK,
  INVALID_ENTRY_ERROR_MSG,
  PWA_HEADER,
} from "Helpers/Constants";
import {
  BANK_TRANSFER_URL,
  GET_ACCT_NAME_FROM_BANK_URL,
  GET_ACCT_NAME_FROM_KP_URL,
  GET_BANKS_URL,
  LOAD_PRODUCTS_BY_CATEGORY,
  VALIDATE_CUSTOMER_URL,
  VALIDATE_OTP,
  WALLET_TRANSFER_URL,
} from "Http/Routes/Kpay";
import SavedBeneficiary from "../../dto/Kongapay/ISavedBeneficiary";
import AuthService from "./AuthService";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import IBuyOTP from "dto/Kongapay/IBuyOTP";
import HttpService from "./HttpService";
import IBank from "dto/Kongapay/IBank";
import IGetBankAcctNameQuery from "dto/Kongapay/IGetBankAcctNameQuery";
import ITransfer from "dto/Kongapay/ITransfer";

class DigitalGoodService extends HttpService {
  /**
   * Method to load Products by Category
   * @param category string - The category to fetch
   * @returns any
   */
  public static loadProductsByCategory = async (
    category: string
  ): Promise<any> => {
    const token = AuthService.GetLoggedInUserToken();
    const config = {
      headers: {
        source: PWA_HEADER,
        token: token !== "undefined" ? token : null,
      },
    };
    const { status, data }: AxiosResponse<any> = await axios.get(
      LOAD_PRODUCTS_BY_CATEGORY(category),
      config
    );

    if (status !== HTTP_OK) {
      throw new Error(INVALID_ENTRY_ERROR_MSG);
    }
    return data;
  };

  /**
   * Deprecated Method
   * Method to load beneficiaries for airtime purchase
   */
  public static loadBeneficiaries = (): Array<SavedBeneficiary> => {
    return [
      // {
      //   Id: 1,
      //   BeneficiaryType: "9Mobile",
      //   PhoneNumber: "09020303030",
      // },
      // {
      //   Id: 2,
      //   BeneficiaryType: "Mtn",
      //   PhoneNumber: "08063512000",
      // },
    ];
  };

  /**
   * Method to validate the customer on konga pay
   * @param payload any
   */
  public static ValidateCustomer = async (
    payload: any
  ): Promise<AxiosResponse<any>> => {
    const validateCustomerHeaders =
      AuthService.GetPopulatedAuthenticatedHeader();
    return await axios.post(
      VALIDATE_CUSTOMER_URL,
      payload,
      validateCustomerHeaders
    );
  };

  /**
   * Method to call the initial order step
   */
  public static InitialOrderCall = async (
    payload: any,
    customerId?: string
  ): Promise<any> => {
    const request: any = {
      productId: payload.operator.product_id,
    };
    if (customerId) {
      request["customerId"] = customerId;
    }
    return await DigitalGoodService.ValidateCustomer(request);
  };

  /**
   * Method to validate otp verificaion
   *
   * @param payload string - otp entered by the customer
   */
  public static VerifyOTP = async (payload: IBuyOTP): Promise<any> => {
    const validateCustomerHeaders =
      AuthService.GetPopulatedAuthenticatedHeader();
    return await axios.post(VALIDATE_OTP, payload, validateCustomerHeaders);
  };

  /**
   * Method to get banks
   * @returns banks: Array<IBank>
   */
  public static GetBanks = async (): Promise<Array<IBank>> => {
    let banks: Array<IBank> = [];
    try {
      const {
        data: { data },
      } = await axios.get(GET_BANKS_URL);
      banks = data;
    } catch (error: any) {}
    return banks;
  };

  /**
   * Method to fetch customer name from the bank
   * @param payload: IGetBankAcctNameQuery
   * @returns customerNameData: any
   */
  public static GetAcctNameFromBank = async (
    payload: IGetBankAcctNameQuery
  ): Promise<any> => {
    const headers = await AuthService.CreateTempHeaders();
    try {
      return await axios.get(GET_ACCT_NAME_FROM_BANK_URL(payload), { headers });
    } catch (error: unknown) {}
    return null;
  };

  /**
   * Method to fetch customer name from Konga Pay
   * @param payload: string - the customer's phone number
   * @returns customerDetails: any
   */
  public static GetKPayAcctNameQuery = async (
    payload: string
  ): Promise<any> => {
    const headers = await AuthService.CreateTempHeaders();
    try {
      const { data } = await axios.get(GET_ACCT_NAME_FROM_KP_URL(payload), {
        headers,
      });

      return data;
    } catch (error: unknown) {}
    return null;
  };

  /**
   * Method to handle the transfer of funds
   * @param payload: ITransfer
   * @param isBankTransfer: boolean - check if the transfer should be a bank transfer
   * @returns boolean
   */
  public static TransferFunds = async (
    payload: ITransfer,
    isBankTransfer = false
  ): Promise<any | null> => {
    const headers = await AuthService.CreateTempHeaders();
    try {
      const url: string = isBankTransfer
        ? BANK_TRANSFER_URL
        : WALLET_TRANSFER_URL;
      const {
        data: { data },
      } = await axios.post(url, payload, { headers });
      return data;
    } catch (error: any) {}
    return null;
  };
}

export default DigitalGoodService;
