import ICartAlert from "dto/Cart/ICartAlert";
import ICartItem from "dto/Cart/ICartItem";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import { SHOW_CART_ALERT } from "Http/Redux/Types/Cart/Types";
import {
  ADD_TO_MARKET_PLACE_CART,
  REMOVE_CART_ITEMS,
} from "Http/Redux/Types/Marketplace/Types";

export interface IAddToMarketplaceCart {
  type: typeof ADD_TO_MARKET_PLACE_CART;
  payload: IMarketplaceCart | null;
}

export const AddToMarketplaceCart = (
  payload: IMarketplaceCart | null
): IAddToMarketplaceCart => ({
  type: ADD_TO_MARKET_PLACE_CART,
  payload: payload,
});

export interface IRemoveCartItems {
  type: typeof REMOVE_CART_ITEMS;
}

export const removeCartItems = (): IRemoveCartItems => ({
  type: REMOVE_CART_ITEMS,
});

export interface IShowCartAlert {
  type: typeof SHOW_CART_ALERT;
  payload: ICartAlert | null;
}

export const ShowCartAlert = (payload: ICartAlert): IShowCartAlert => ({
  type: SHOW_CART_ALERT,
  payload: payload,
});
