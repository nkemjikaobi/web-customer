import ICategory from "dto/KongaOnline/ICategory";
import IProduct from "dto/KongaOnline/IProduct";

export const SELECT_MARKETPLACE_CATEGORY = "SELECT_MARKETPLACE_CATEGORY";
export const SELECT_MARKETPLACE_PRODUCT = "SELECT_MARKETPLACE_PRODUCT";
export const ADD_TO_MARKET_PLACE_CART = "ADD_TO_MARKET_PLACE_CART";
export const CHECKOUT_MARKET_PLACE_CART = "CHECKOUT_MARKET_PLACE_CART";
export const IMATCHED_PRODUCTS = "IMATCHED_PRODUCTS";
export const REMOVE_CART_ITEMS = "REMOVE_CART_ITEMS";

export interface IMarketplaceState {
  SelectedCategory: ICategory | null;
  SelectedProduct: IProduct | null;
  MatchedProducts: Array<IProduct> | null;
}
