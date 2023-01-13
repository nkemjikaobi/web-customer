import IAddress from "dto/KongaOnline/IAddress";
import IDeliveryAddress from "dto/KongaOnline/IDeliveryAddress";
import {
  ADDRESS_TO_EDIT,
  ADD_CUSTOMER_ADDRESS,
  HIDE_ALL_ADDRESS_CARDS,
  SET_CUSTOMER_ADDRESSES,
  SET_DELIVERY_ADDRESS,
  SET_SHIPPING_ADDRESS,
  SHOW_ADDRESS_BOOK_CARD,
  SHOW_DELIVERY_ADDRESS_CARD,
  SHOW_PICKUP_ADDRESS_CARD,
} from "Http/Redux/Types/Cart/Types";

export interface ISelectShippingAddress {
  type: typeof SET_SHIPPING_ADDRESS;
  payload: IAddress | null;
}

export const SelectShippingAddressActionCreator = (
  payload: IAddress
): ISelectShippingAddress => ({
  type: SET_SHIPPING_ADDRESS,
  payload: payload,
});

export interface IShowDeliveryAddressCard {
  type: typeof SHOW_DELIVERY_ADDRESS_CARD;
}

export const ShowDeliveryAddressCardActionCreator =
  (): IShowDeliveryAddressCard => ({
    type: SHOW_DELIVERY_ADDRESS_CARD,
  });

export interface IShowAddressBookCard {
  type: typeof SHOW_ADDRESS_BOOK_CARD;
}

export const ShowAddressBookCardActionCreator = (): IShowAddressBookCard => ({
  type: SHOW_ADDRESS_BOOK_CARD,
});

export interface IShowPickupAddressCard {
  type: typeof SHOW_PICKUP_ADDRESS_CARD;
}

export const ShowPickupAddressCardActionCreator =
  (): IShowPickupAddressCard => ({
    type: SHOW_PICKUP_ADDRESS_CARD,
  });

export interface IHideAddressCardsActionCreator {
  type: typeof HIDE_ALL_ADDRESS_CARDS;
}

export const HideAddressCardsActionCreator =
  (): IHideAddressCardsActionCreator => ({
    type: HIDE_ALL_ADDRESS_CARDS,
  });

export interface ISetDeliveryAddressActionCreator {
  type: typeof SET_DELIVERY_ADDRESS;
  payload: IDeliveryAddress;
}

export const SetDeliveryAddressActionCreator = (
  payload: IDeliveryAddress
): ISetDeliveryAddressActionCreator => ({
  type: SET_DELIVERY_ADDRESS,
  payload,
});

export interface ISetCustomerAddressesActionCreator {
  type: typeof SET_CUSTOMER_ADDRESSES;
  payload: Array<IAddress>;
}

export const SetCustomerAddressesActionCreator = (
  payload: Array<IAddress>
): ISetCustomerAddressesActionCreator => ({
  type: SET_CUSTOMER_ADDRESSES,
  payload,
});

export interface IAddCustomerAddressActionCreator {
  type: typeof ADD_CUSTOMER_ADDRESS;
  payload: IAddress;
}

export const AddCustomerAddressActionCreator = (
  payload: IAddress
): IAddCustomerAddressActionCreator => ({
  type: ADD_CUSTOMER_ADDRESS,
  payload,
});

export interface IAddressToEditActionCreator {
  type: typeof ADDRESS_TO_EDIT;
  payload: IAddress | null;
}

export const AddressToEditActionCreator = (
  payload: IAddress | null
): IAddressToEditActionCreator => ({
  type: ADDRESS_TO_EDIT,
  payload,
});
