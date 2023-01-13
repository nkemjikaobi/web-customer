/* eslint-disable @typescript-eslint/ban-types */
import ICartAddress from "dto/Cart/ICartAddress";
import IAddress from "dto/KongaOnline/IAddress";
import IDeliveryAddress from "dto/KongaOnline/IDeliveryAddress";
import {
  ADDRESS_TAG,
  DELIVERY_TAG,
  PICKUP_TAG,
} from "Http/Redux/Types/Cart/Types";
import CartService from "Http/Services/CartService";
import IDeliveryAddressForm from "Models/FormModels/Marketplace/IDeliveryAddressForm";
import {
  AddressToEditActionCreator,
  IAddressToEditActionCreator,
  AddCustomerAddressActionCreator,
  IAddCustomerAddressActionCreator,
  IHideAddressCardsActionCreator,
  ISelectShippingAddress,
  ISetCustomerAddressesActionCreator,
  ISetDeliveryAddressActionCreator,
  IShowAddressBookCard,
  IShowDeliveryAddressCard,
  IShowPickupAddressCard,
  SelectShippingAddressActionCreator,
  SetCustomerAddressesActionCreator,
  SetDeliveryAddressActionCreator,
  ShowAddressBookCardActionCreator,
  ShowDeliveryAddressCardActionCreator,
  ShowPickupAddressCardActionCreator,
} from "../ActionCreators/Cart/CardDisplayActionCreator";
import { SetCartAddressActionCreator } from "../ActionCreators/Cart/CartActionCreators";

export const SelectShippingAddressAction =
  (payload: IAddress, cart_id: number) =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(SelectShippingAddressActionCreator(payload));
    dispatch(SetCartAddressActionCreator());
    const cart_address: ICartAddress = {
      address_type: "shipping",
      address_id: payload ? payload.id : 0,
      cart_id: cart_id !== 0 ? cart_id : 0,
      phone_number: "",
    };
    await CartService.SetCartAddress(cart_address);
    return true;
  };

export const RemoveShippingAddressAction = (payload: any) => {
  async (dispatch: Function) => {
    dispatch(SelectShippingAddressActionCreator(payload));
  };
};

export const ShowSideMenu =
  (type: string) =>
  async (dispatch: Function): Promise<boolean> => {
    switch (type) {
      case ADDRESS_TAG:
        dispatch(ShowAddressBookCardActionCreator());
        break;
      case DELIVERY_TAG:
        dispatch(ShowDeliveryAddressCardActionCreator());
        break;
      case PICKUP_TAG:
        dispatch(ShowPickupAddressCardActionCreator());
        break;
      default:
        return false;
    }
    return true;
  };

export const SetDeliveryAddressAction =
  (payload: IDeliveryAddress) =>
  async (dispatch: Function): Promise<null> => {
    dispatch(SetDeliveryAddressActionCreator(payload));
    dispatch(ShowAddressBookCardActionCreator());

    // convert from IDeliveryAddress to IAddress;
    const addressForm: IDeliveryAddressForm =
      payload.form as IDeliveryAddressForm;
    const address: IAddress = {
      firstname: addressForm.firstName,
      lastname: addressForm.lastName,
      is_default: "false",
      telephone: addressForm.phoneNumber,
      street: addressForm.deliveryAddress,
      city: addressForm.city,
      id: new Date().getTime(),
      is_active: true,
      country: null,
      region: null,
      area: null,
      postcode: "",
      landmark: "",
      email: "",
    };
    dispatch(AddCustomerAddressActionCreator(address));
    return null;
  };

export const SetCustomerAddressesAction =
  (addresses: Array<IAddress>) =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(SetCustomerAddressesActionCreator(addresses));
    return true;
  };

export const AddCustomerAddressAction =
  (address: IAddress) =>
  async (dispatch: Function): Promise<Array<IAddress>> => {
    let addresses: Array<IAddress> = [];
    try {
      dispatch(ShowAddressBookCardActionCreator());
      dispatch(AddCustomerAddressActionCreator(address));
      addresses = await CartService.AddCustomerAddress(address);
      if (addresses) {
        dispatch(SetCustomerAddressesAction(addresses));
      }
    } catch (error: any) {}
    return addresses;
  };

export const EditCustomerAddressAction =
  (address: IAddress | null) =>
  async (dispatch: Function): Promise<IAddress | null> => {
    try {
      dispatch(AddressToEditActionCreator(address));
    } catch (error: any) {
      console.log(error);
    }
    return address;
  };

export type ICardDisplayAction =
  | ISelectShippingAddress
  | IShowAddressBookCard
  | IShowPickupAddressCard
  | IShowDeliveryAddressCard
  | ISetDeliveryAddressActionCreator
  | ISetCustomerAddressesActionCreator
  | IAddCustomerAddressActionCreator
  | IAddressToEditActionCreator
  | IHideAddressCardsActionCreator;
