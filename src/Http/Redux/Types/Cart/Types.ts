import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import IAddress from "dto/KongaOnline/IAddress";
import IDeliveryAddress from "dto/KongaOnline/IDeliveryAddress";

export const GET_ALL_CART_ITEMS = "GET_ALL_CART_ITEMS";
export const SHOW_CART_ALERT = "SHOW_CART_ALERT";

export const SET_SHIPPING_ADDRESS = "SET_SHIPPING_ADDRESS";
export const HIDE_ALL_ADDRESS_CARDS = "HIDE_ALL_ADDRESS_CARDS";
export const SHOW_DELIVERY_ADDRESS_CARD = "SHOW_DELIVERY_ADDRESS_CARD";
export const SHOW_ADDRESS_BOOK_CARD = "SHOW_ADDRESS_BOOK_CARD";
export const SHOW_PICKUP_ADDRESS_CARD = "SHOW_PICKUP_ADDRESS_CARD";

export const SET_DELIVERY_ADDRESS = "SET_DELIVERY_ADDRESS";
export const SET_CUSTOMER_ADDRESSES = "SET_CUSTOMER_ADDRESSES";
export const ADD_CUSTOMER_ADDRESS = "ADD_CUSTOMER_ADDRESS";
export const ADDRESS_TO_EDIT = "ADDRESS_TO_EDIT";

export const MAKE_PAYMENT = "MAKE_PAYMENT";
export const PLACE_ORDER = "PLACE_ORDER";
export const SET_SELECTED_PAYMENT_OPTION = "SET_SELECTED_PAYMENT_OPTION";
export const SET_CART_ADDRESS = "SET_CART_ADDRESS";
export const OPEN_CART = "OPEN_CART";
export const SET_CART_TO_OPEN = "SET_CART_TO_OPEN";

export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const ADD_ITEM_TO_SAVED_LIST = "ADD_ITEM_TO_SAVED_LIST";
export const GET_SAVED_LIST_ITEMS = "GET_SAVED_LIST_ITEMS";

// Items
export const ADDRESS_TAG = "ADDRESS";
export const DELIVERY_TAG = "DELIVERY";
export const PICKUP_TAG = "PICKUP";

export interface ICartState {
  AddressToEdit: IAddress | null;
  CustomerAddresses: Array<IAddress>;
  CartDisplayAddressForm: boolean;
  CartDisplayAddressBook: boolean;
  CartDisplayPickupAddressForm: boolean;
  CartToOpen: number | null;
  Food: IFoodCart | null;
  Marketplace: IMarketplaceCart | null;
  OpenTheCart: boolean;
  SavedList: any;
  SelectedDeliveryAddress: IDeliveryAddress | null;
  SelectedCheckoutAddress: IAddress | null;
  SelectedPaymentOption: string;
}
