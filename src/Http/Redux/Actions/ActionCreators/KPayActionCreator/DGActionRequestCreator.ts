import IFundInitAccountResponse from "dto/Kongapay/IFundInitAccountResponse";
import IFundWalletCompleteResponse from "dto/Kongapay/IFundWalletCompleteResponse";
import {
  COMPLETE_FUND_WALLET,
  GET_PRODUCTS_BY_CATEGORY,
  INITIATE_FUND_WALLET,
} from "Http/Redux/Types/KPay/Types";

// Interfaces
export interface IGetProductsByCategory {
  type: typeof GET_PRODUCTS_BY_CATEGORY;
  payload: string;
}

// Events
export const GetProductsByCategory = (
  category: string
): IGetProductsByCategory => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    payload: category,
  };
};

export interface IFundWalletInitActionCreator {
  type: typeof INITIATE_FUND_WALLET;
  payload: IFundInitAccountResponse;
}

export const FundWalletInitActionCreator = (
  payload: IFundInitAccountResponse
): IFundWalletInitActionCreator => ({
  type: INITIATE_FUND_WALLET,
  payload,
});

export interface IFundWalletCompleteActionCreator {
  type: typeof COMPLETE_FUND_WALLET;
  payload: IFundWalletCompleteResponse;
}

export const FundWalletCompleteActionCreator = (
  payload: IFundWalletCompleteResponse
): IFundWalletCompleteActionCreator => ({
  type: COMPLETE_FUND_WALLET,
  payload,
});
