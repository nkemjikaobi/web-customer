/* eslint-disable @typescript-eslint/ban-types */
import ICategory from "dto/KongaOnline/ICategory";
import IProduct from "dto/KongaOnline/IProduct";
import {
  ISelectedCategory,
  ISelectedProduct,
  SelectCategoryActionCreator,
  SelectProductActionCreator,
} from "../ActionCreators/MarketplaceActionCreator/MarketplaceActionCreator";

export const SelectMarketplaceProductAction =
  (payload: IProduct) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      dispatch(SelectProductActionCreator(payload));
      response = true;
    } catch (error: any) {}
    return response;
  };

export const SelectCategoryAction =
  (payload: ICategory) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      dispatch(SelectCategoryActionCreator(payload));
      response = true;
    } catch (error: any) {}
    return response;
  };

export type MarketplaceAction = ISelectedCategory | ISelectedProduct;
