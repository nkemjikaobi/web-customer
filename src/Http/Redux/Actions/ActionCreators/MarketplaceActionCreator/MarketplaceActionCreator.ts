import ICategory from "dto/KongaOnline/ICategory";
import IProduct from "dto/KongaOnline/IProduct";
import {
  SELECT_MARKETPLACE_CATEGORY,
  SELECT_MARKETPLACE_PRODUCT,
} from "Http/Redux/Types/Marketplace/Types";

export interface ISelectedCategory {
  type: typeof SELECT_MARKETPLACE_CATEGORY;
  payload: ICategory;
}

export interface ISelectedProduct {
  type: typeof SELECT_MARKETPLACE_PRODUCT;
  payload: IProduct;
}

export const SelectCategoryActionCreator = (
  category: ICategory
): ISelectedCategory => {
  return {
    type: SELECT_MARKETPLACE_CATEGORY,
    payload: category,
  };
};

export const SelectProductActionCreator = (
  product: IProduct
): ISelectedProduct => {
  return {
    type: SELECT_MARKETPLACE_PRODUCT,
    payload: product,
  };
};
