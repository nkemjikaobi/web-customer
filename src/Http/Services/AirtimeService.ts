/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */

import axios from "axios";
import IBeneficiary from "dto/Kongapay/IBeneficiary";
import ICompleteOrderRequestType, {
  ICompleteOrderRequestParams,
} from "dto/Kongapay/ICompleteOrderRequestType";
import { PWA_HEADER } from "Helpers/Constants";
import {
  COMPLETE_ORDER_URL,
  GET_SAVED_BENEFICIARIES,
  SAVE_BENEFICIARY,
} from "Http/Routes/Kpay";
import AuthService from "./AuthService";
import DigitalGoodService from "./DigitalGoodService";
import PaymentService from "./PaymentService";

class AirtimeService extends DigitalGoodService {
  /**
   * Method to complete an order
   * @param requestCompleteOrderPayload ICompleteOrderRequestType
   * @returns response Promise
   */
  public static RequestOrderCompletion = async (
    payload: any,
    responseData: any,
    mobileNumber: string
  ): Promise<any> => {
    const requestCompleteOrderHeaders =
      AuthService.GetPopulatedAuthenticatedHeader();
    const requestCompleteOrderPayload: ICompleteOrderRequestType =
      PaymentService.FormatCompleteOrder(payload, responseData, mobileNumber);

    const response = await axios.post(
      COMPLETE_ORDER_URL,
      requestCompleteOrderPayload,
      requestCompleteOrderHeaders
    );
    return response;
  };

  /**
   * Method to make a raw complete order request
   * @param payload - the sdk complete order request
   * @returns response: any
   */
  public static RawOrderCompletion = async (
    payload: ICompleteOrderRequestParams
  ): Promise<any> => {
    const headers = AuthService.CreateTempHeaders();
    return await axios.post(COMPLETE_ORDER_URL, payload, {
      headers: headers,
    });
  };

  /**
   * Method to Complete an order
   * @param payload any
   * @returns response Promise - from the completed order
   */
  public static CompleteOrder = async (
    payload: any,
    customerId: string
  ): Promise<any> => {
    // firstly validate customer - kpay request
    const {
      data: { data },
    } = await AirtimeService.InitialOrderCall(payload, customerId);

    return await AirtimeService.RequestOrderCompletion(
      payload,
      data,
      customerId
    );
  };

  /**
   * Method to get the saved beneficiaries for a service
   * @param service: string - the service to query for.
   */
  public static GetSavedBeneficiaries = async (
    service: string
  ): Promise<Array<IBeneficiary>> => {
    let beneficiaries: Array<IBeneficiary> = [];
    const config = {
      ...AuthService.GetPopulatedAuthenticatedHeader(),
      params: { request_type: service },
    };
    try {
      const {
        data: { data },
      } = await axios.get(GET_SAVED_BENEFICIARIES, config);
      beneficiaries = Array.isArray(data) ? data : [];
    } catch (error: unknown) {}

    return beneficiaries;
  };

  /**
   * Method to get the saved beneficiaries for a service
   * @param service: string - the service to query for
   * @param customer: string
   * @param beneficiary: string
   * @param source: string
   */
  public static SaveBeneficiary = async (
    service: string,
    customer: string,
    beneficiary: string,
    source: string
  ): Promise<IBeneficiary | undefined> => {
    const savedBeneficiary: IBeneficiary | undefined = undefined;
    const headers = {
      source: PWA_HEADER,
      token: AuthService.GetLoggedInUserToken(),
    };

    try {
      await axios.post(
        SAVE_BENEFICIARY,
        {
          request_type: service,
          beneficiary_value: customer,
          beneficiary: beneficiary,
          beneficiary_source: source,
        },
        { headers }
      );
    } catch (error: unknown) {}

    return savedBeneficiary;
  };
}

export default AirtimeService;
