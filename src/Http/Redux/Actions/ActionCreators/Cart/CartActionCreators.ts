import IPlaceOrder from "dto/Cart/IPlaceOrder";
import IUpdateCartItemQty from "dto/Cart/IUpdateCartItemQty";
import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import {
  MAKE_PAYMENT,
  OPEN_CART,
  PLACE_ORDER,
  SET_CART_ADDRESS,
  SET_CART_TO_OPEN,
  SET_SELECTED_PAYMENT_OPTION,
  UPDATE_CART_ITEM_QUANTITY,
  ADD_ITEM_TO_SAVED_LIST,
  GET_SAVED_LIST_ITEMS,
} from "Http/Redux/Types/Cart/Types";

export interface IMakePaymentActionCreator {
  type: typeof MAKE_PAYMENT;
}

export const MakePaymentActionCreator = (): IMakePaymentActionCreator => ({
  type: MAKE_PAYMENT,
});

export interface IPlaceOrderActionCreator {
  type: typeof PLACE_ORDER;
  payload: IPlaceOrder;
}

export const PlaceOrderActionCreator = (
  payload: IPlaceOrder
): IPlaceOrderActionCreator => ({ type: PLACE_ORDER, payload });

export interface ISetSelectedPaymentOptionActionCreator {
  type: typeof SET_SELECTED_PAYMENT_OPTION;
  payload: string;
}

export const SetSelectedPaymentOptionActionCreator = (
  payload: string
): ISetSelectedPaymentOptionActionCreator => ({
  type: SET_SELECTED_PAYMENT_OPTION,
  payload,
});

export interface ISetCartAddressActionCreator {
  type: typeof SET_CART_ADDRESS;
}

export const SetCartAddressActionCreator =
  (): ISetCartAddressActionCreator => ({
    type: SET_CART_ADDRESS,
  });

export interface IOpenCartActionCreator {
  type: typeof OPEN_CART;
  payload: boolean;
}

export const OpenCartActionCreator = (
  payload: boolean
): IOpenCartActionCreator => ({ type: OPEN_CART, payload });

export interface ISetCartToOpenActionCreator {
  type: typeof SET_CART_TO_OPEN;
  payload: number;
}

export const SetCartToOpenActionCreator = (
  payload: number
): ISetCartToOpenActionCreator => ({ type: SET_CART_TO_OPEN, payload });

export interface IUpdateCartItemQtyActionCreator {
  type: typeof UPDATE_CART_ITEM_QUANTITY;
  payload: IUpdateCartItemQty;
}

export const UpdateCartItemQtyActionCreator = (
  payload: IUpdateCartItemQty
): IUpdateCartItemQtyActionCreator => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload,
});

export interface IAddItemToSavedListCreator {
  type: typeof ADD_ITEM_TO_SAVED_LIST;
  payload: IAddItemToSavedList;
}

export const AddItemToSavedListCreator = (
  payload: any
): IAddItemToSavedListCreator => ({
  type: ADD_ITEM_TO_SAVED_LIST,
  payload,
});
export interface IGetSavedListItemsCreator {
  type: typeof GET_SAVED_LIST_ITEMS;
  payload: Array<IAddItemToSavedList>;
}

export const GetSavedListItemsCreator = (
  payload: Array<IAddItemToSavedList>
): IGetSavedListItemsCreator => ({
  type: GET_SAVED_LIST_ITEMS,
  payload,
});
