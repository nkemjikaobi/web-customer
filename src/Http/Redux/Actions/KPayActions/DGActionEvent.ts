/* eslint-disable @typescript-eslint/ban-types */
import IBuyAirtime from "dto/Kongapay/IBuyAirtime";
import IBuyOTP from "dto/Kongapay/IBuyOTP";
import ITransfer from "dto/Kongapay/ITransfer";
import ITransferDetails from "dto/Kongapay/ITransferDetails";
import { ERROR, SUCCESS } from "Helpers/Constants";
import AirtimeService from "Http/Services/AirtimeService";
import DigitalGoodService from "Http/Services/DigitalGoodService";
import {
  CompleteOrderPost,
  CompleteOrderPostFailed,
  CompleteOrderPostSucceed,
  IBuyAirtimeRequest,
  ICompleteOrderFailureResponse,
  ICompleteOrderRequest,
  ICompleteOrderSuccessResponse,
  IOtpVerified,
  ISelectAirtimeOperator,
  ISelfWithdrawResponse,
  ITransferFundsActionCreator,
  OtpVerified,
  SelectAirtimeOperator,
  TransferFundsActionCreator,
} from "../ActionCreators/KPayActionCreator/DGActionEventCreator";

export const OperatorSelected =
  (payload: string) =>
  (dispatch: Function): void => {
    dispatch(SelectAirtimeOperator(payload));
  };

/**
 * Method to handle the initial step in
 * stepped order requests.
 *
 * @param payload any - payload holding airtime request.
 * @param customerId string - the customer's email address or mobile number.
 * @return response any | null - object or null response after performing transaction.
 */
export const InitiateOrderAction =
  (payload: any, customerId: string) =>
  async (dispatch: Function): Promise<any | null> => {
    try {
      const { data } = await DigitalGoodService.InitialOrderCall(
        payload,
        customerId
      );
      return data;
    } catch (error: any) {
      return null;
    }
  };

/**
 * Method to handle the final step in
 * stepped order requests.
 *
 * @param payload IBuyAirtime - payload holding airtime request.
 * @param customerId string - the customer's email address or mobile number.
 * @param initiateOrderActionResponse any | null - response from InitiateOrderAction
 * @return response string | null - an error message or nothing.
 */
export const FinalStepForOrderRequest =
  (
    payload: IBuyAirtime,
    customerId: string,
    initiateOrderActionResponse: any | null
  ) =>
  async (dispatch: Function): Promise<string | null> => {
    dispatch(CompleteOrderPost(payload));
    let error: string | null = null;
    try {
      const { data } = await AirtimeService.RequestOrderCompletion(
        payload,
        initiateOrderActionResponse,
        customerId
      );
      if (data.status === SUCCESS) {
        dispatch(
          CompleteOrderPostSucceed(data.message, data.data.request_id, data)
        );
        return null;
      } else {
        const message = data.data.message;
        dispatch(CompleteOrderPostFailed(message));
        error = data.data.message || null;
      }
    } catch (error: any) {
      dispatch(CompleteOrderPostFailed(error));
    }
    return error;
  };

/**
 * Method to handle all the steps
 * stepped order requests.
 *
 * @param payload IBuyAirtime - payload holding airtime request.
 * @param customerId string - the customer's email address or mobile number.
 * @return response boolean - positive or negative response after performing transaction.
 */
export const CompleteOrderRequestAction =
  (payload: IBuyAirtime, customerId: string) =>
  async (dispatch: Function): Promise<string | null> => {
    dispatch(CompleteOrderPost(payload));
    try {
      const { data } = await AirtimeService.CompleteOrder(payload, customerId);
      if (data.status === SUCCESS) {
        dispatch(
          CompleteOrderPostSucceed(data.message, data.data.request_id, data)
        );
        return null;
      } else {
        dispatch(CompleteOrderPostFailed(data.message));
        return data.message;
      }
    } catch (error: any) {
      dispatch(CompleteOrderPostFailed(error));
    }
    return null;
  };

export const VerifyOTP =
  (otpPayload: IBuyOTP) =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      const { data } = await AirtimeService.VerifyOTP(otpPayload);
      if (data.status === SUCCESS) {
        dispatch(OtpVerified(data.data.receipt_number));
        return true;
      }
    } catch (error: any) {}
    return false;
  };

export const TransferFundsAction =
  (
    payload: ITransfer,
    selectedBankName: string,
    charges: number,
    isBank = false
  ) =>
  async (dispatch: Function): Promise<string> => {
    let response = "";
    try {
      const request_id = await DigitalGoodService.TransferFunds(
        payload,
        isBank
      );
      if (request_id) {
        const transferPayload: ITransferDetails = {
          transfer: payload,
          bank_name: selectedBankName,
          charges: charges,
          request_id: request_id.request_id,
        };
        dispatch(TransferFundsActionCreator(transferPayload));
      } else if (request_id && request_id.status === ERROR) {
        response = request_id.message;
      }
    } catch (error: any) {}
    return response;
  };

export type DGActionEvent =
  | IOtpVerified
  | IBuyAirtimeRequest
  | ISelectAirtimeOperator
  | ICompleteOrderRequest
  | ITransferFundsActionCreator
  | ICompleteOrderSuccessResponse
  | ICompleteOrderFailureResponse
  | ISelfWithdrawResponse;
