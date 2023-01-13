/* eslint-disable @typescript-eslint/ban-types */

import { DGActionEvent } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { DGActionRequest } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import {
  COMPLETE_ORDER_FAILURE_RESPONSE,
  COMPLETE_ORDER_REQUEST,
  COMPLETE_ORDER_SUCCESS_RESPONSE,
  GET_PRODUCTS_BY_CATEGORY,
  IDGState,
  INITIATE_FUND_WALLET,
  OTP_VERIFIED,
  SELECT_AIRTIME_OPERATOR,
  SELF_WITHDRAW,
  TRANSFER_FUNDS,
} from "Http/Redux/Types/KPay/Types";

export const DGInitialState: IDGState = {
  SelectedOperator: null,
  SelectedCategory: null,
  OrderResponseStatus: false,
  OrderResponseMessage: null,
  OrderDetails: null,
  OrderResponse: null,
  OrderRefenceNumber: null,
  RequestId: null,
  Wallet: null,
  Transfer: null,
  SelfWithdraw: null,
};

const DGReducer = (
  state: IDGState = DGInitialState,
  action: DGActionEvent | DGActionRequest
): IDGState => {
  switch (action.type) {
    case SELECT_AIRTIME_OPERATOR:
      return {
        ...state,
        SelectedOperator: action.payload,
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        SelectedCategory: action.payload,
      };
    case SELF_WITHDRAW:
      return {
        ...state,
        SelfWithdraw: action.payload,
      };
    case COMPLETE_ORDER_REQUEST:
      return {
        ...state,
        OrderDetails: action.payload,
      };
    case COMPLETE_ORDER_SUCCESS_RESPONSE:
      return {
        ...state,
        OrderResponseStatus: true,
        OrderResponseMessage: action.payload.response,
        RequestId: action.payload.request_id,
        OrderResponse: action.payload.order_response,
      };
    case COMPLETE_ORDER_FAILURE_RESPONSE:
      return {
        ...state,
        OrderResponseStatus: false,
        OrderResponseMessage: action.payload,
      };
    case OTP_VERIFIED:
      return {
        ...state,
        OrderRefenceNumber: action.payload,
      };
    case INITIATE_FUND_WALLET:
      return {
        ...state,
        Wallet: { ...state.Wallet, FundingInit: action.payload },
      };
    case TRANSFER_FUNDS:
      return {
        ...state,
        RequestId: action.payload.request_id ?? "",
        Transfer: {
          TransferDetails: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default DGReducer;
