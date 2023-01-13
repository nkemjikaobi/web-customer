/* eslint-disable @typescript-eslint/ban-types */

import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import IBuyAirtime from "dto/Kongapay/IBuyAirtime";
import { IOrderDetails, IOrderResponse } from "dto/Kongapay/IOrderDetails";
import ITransferDetails from "dto/Kongapay/ITransferDetails";
import {
  BUY_AIRTIME_REQUEST,
  SELECT_AIRTIME_OPERATOR,
  COMPLETE_ORDER_REQUEST,
  COMPLETE_ORDER_SUCCESS_RESPONSE,
  COMPLETE_ORDER_FAILURE_RESPONSE,
  OTP_VERIFIED,
  TRANSFER_FUNDS,
  SELF_WITHDRAW,
} from "Http/Redux/Types/KPay/Types";

// Interfaces
export interface IBuyAirtimeRequest {
  type: typeof BUY_AIRTIME_REQUEST;
}

export interface ISelectAirtimeOperator {
  type: typeof SELECT_AIRTIME_OPERATOR;
  payload: string;
}

export interface ICompleteOrderRequest {
  type: typeof COMPLETE_ORDER_REQUEST;
  payload: IOrderDetails;
}

export interface ICompleteOrderSuccessResponse {
  type: typeof COMPLETE_ORDER_SUCCESS_RESPONSE;
  payload: {
    response: string;
    request_id: string;
    order_response: IOrderResponse;
  };
}

export interface ICompleteOrderFailureResponse {
  type: typeof COMPLETE_ORDER_FAILURE_RESPONSE;
  payload: string;
}
export interface ISelfWithdrawResponse {
  type: typeof SELF_WITHDRAW;
  payload: IPersonBankAccount;
}

export interface IOtpVerified {
  type: typeof OTP_VERIFIED;
  payload: string;
}

export interface ITransferFundsActionCreator {
  type: typeof TRANSFER_FUNDS;
  payload: ITransferDetails;
}

// Events
export const SelectAirtimeOperator = (
  operator: string
): ISelectAirtimeOperator => {
  return {
    type: SELECT_AIRTIME_OPERATOR,
    payload: operator,
  };
};

export const CompleteOrderPost = (
  orderPayload: IBuyAirtime
): ICompleteOrderRequest => {
  return {
    type: COMPLETE_ORDER_REQUEST,
    payload: {
      phoneNumber: `${orderPayload.countryCode || ""}${
        orderPayload.phoneNumber || ""
      }`,
      amount: orderPayload.amount,
      operator: orderPayload.operator.name,
      saveBeneficiary: orderPayload.saveBeneficiary,
    },
  };
};

export const CompleteOrderPostSucceed = (
  payload: string,
  request_id: string,
  order_response: IOrderResponse
): ICompleteOrderSuccessResponse => {
  return {
    type: COMPLETE_ORDER_SUCCESS_RESPONSE,
    payload: {
      response: payload,
      request_id,
      order_response,
    },
  };
};

export const CompleteOrderPostFailed = (
  message: string
): ICompleteOrderFailureResponse => {
  return {
    type: COMPLETE_ORDER_FAILURE_RESPONSE,
    payload: message,
  };
};

export const OtpVerified = (payload: string): IOtpVerified => {
  return {
    type: OTP_VERIFIED,
    payload: payload,
  };
};

export const TransferFundsActionCreator = (
  payload: ITransferDetails
): ITransferFundsActionCreator => ({ type: TRANSFER_FUNDS, payload });
