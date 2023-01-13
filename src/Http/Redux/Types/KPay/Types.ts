/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import {
  IOrderDetails,
  TransferReducer,
  WalletReducer,
} from "dto/Kongapay/IOrderDetails";

export const SELECT_AIRTIME_OPERATOR = "SELECT_AIRTIME_OPERATOR";
export const BUY_AIRTIME_REQUEST = "BUY_AIRTIME_REQUEST";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const INITIATE_FUND_WALLET = "INITIATE_FUND_WALLET";
export const COMPLETE_FUND_WALLET = "COMPLETE_FUND_WALLET";
export const SELF_WITHDRAW = "SELF_WITHDRAW";

export const TRANSFER_FUNDS = "TRANSFER_FUNDS";
export const COMPLETE_ORDER_REQUEST = "COMPLETE_ORDER_REQUEST";
export const COMPLETE_ORDER_FAILURE_RESPONSE =
  "COMPLETE_ORDER_FAILURE_RESPONSE";
export const COMPLETE_ORDER_SUCCESS_RESPONSE =
  "COMPLETE_ORDER_SUCCESS_RESPONSE";
export const OTP_VERIFIED = "OTP_VERIFIED";

export interface IDGState {
  SelectedOperator: string | null;
  SelectedCategory: string | null;
  OrderResponseStatus: boolean;
  OrderResponseMessage: string | null;
  OrderDetails: IOrderDetails | null;
  OrderResponse: object | null;
  RequestId: string | null;
  OrderRefenceNumber: string | null;
  Wallet: WalletReducer | null;
  Transfer: TransferReducer | null;
  SelfWithdraw: IPersonBankAccount | null;
}
