/* eslint-disable @typescript-eslint/ban-types */
import IFundWalletInit from "dto/Kongapay/IFundWalletInit";
import { ERROR } from "Helpers/Constants";
import AirtimeService from "Http/Services/AirtimeService";
import PaymentService from "Http/Services/PaymentService";
import {
  FundWalletInitActionCreator,
  GetProductsByCategory,
  IFundWalletCompleteActionCreator,
  IFundWalletInitActionCreator,
  IGetProductsByCategory,
} from "../ActionCreators/KPayActionCreator/DGActionRequestCreator";

export const LoadProductsByCategory =
  (payload: string) =>
  async (dispatch: Function): Promise<any> => {
    dispatch(GetProductsByCategory(payload));
    try {
      return await AirtimeService.loadProductsByCategory(payload);
    } catch (error: any) {
      throw Error(error);
    }
  };

/**
 * Action method to initialize a wallet funding
 * @param payload: IFundWalletInit
 * @returns result: boolean
 */
export const InitiateFundWalletAction =
  (payload: IFundWalletInit) =>
  async (dispatch: Function): Promise<string | null> => {
    let result = null;
    try {
      const payment = await PaymentService.FundWallet(payload);
      if (payment && payment.status !== ERROR) {
        dispatch(FundWalletInitActionCreator(payment));
        result = null;
      } else {
        result = payment.data && payment.data.message;
      }
    } catch (error: unknown) {}
    return result;
  };

export type DGActionRequest =
  | IGetProductsByCategory
  | IFundWalletInitActionCreator
  | IFundWalletCompleteActionCreator;
