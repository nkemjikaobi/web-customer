import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import { IndexActions } from "Http/Redux/Actions/ActionCreators/Index";
import { ICardDisplayAction } from "Http/Redux/Actions/Cart/ICardDisplayAction";
import { ICartAction } from "Http/Redux/Actions/Cart/ICartAction";
import { IFoodCartAction } from "Http/Redux/Actions/Cart/IFoodCartAction";
import { IMarketplaceCartAction } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  ADDRESS_TO_EDIT,
  ADD_CUSTOMER_ADDRESS,
  ADD_ITEM_TO_SAVED_LIST,
  GET_SAVED_LIST_ITEMS,
  HIDE_ALL_ADDRESS_CARDS,
  ICartState,
  OPEN_CART,
  PLACE_ORDER,
  SET_CART_TO_OPEN,
  SET_CUSTOMER_ADDRESSES,
  SET_DELIVERY_ADDRESS,
  SET_SHIPPING_ADDRESS,
  SHOW_ADDRESS_BOOK_CARD,
  SHOW_CART_ALERT,
  SHOW_DELIVERY_ADDRESS_CARD,
  SHOW_PICKUP_ADDRESS_CARD,
} from "Http/Redux/Types/Cart/Types";
import { ADD_TO_FOOD_CART } from "Http/Redux/Types/Food/Types";
import {
  ADD_TO_MARKET_PLACE_CART,
  REMOVE_CART_ITEMS,
} from "Http/Redux/Types/Marketplace/Types";
import { REHYDRATE } from "Http/Redux/Types/Types";

export const CartInitialState: ICartState = {
  AddressToEdit: null,
  CustomerAddresses: [],
  CartDisplayAddressForm: false,
  CartDisplayAddressBook: false,
  CartDisplayPickupAddressForm: false,
  CartToOpen: null,
  Food: null,
  Marketplace: null,
  OpenTheCart: false,
  SavedList: null,
  SelectedCheckoutAddress: null,
  SelectedDeliveryAddress: null,
  SelectedPaymentOption: "",
};

const CartReducer = (
  state: ICartState = CartInitialState,
  action:
    | IFoodCartAction
    | IMarketplaceCartAction
    | ICardDisplayAction
    | ICartAction
    | IndexActions
): ICartState => {
  switch (action.type) {
    case ADDRESS_TO_EDIT:
      return { ...state, AddressToEdit: action.payload };
    case REHYDRATE:
      return { ...action.payload?.cart };
    case ADD_TO_MARKET_PLACE_CART:
      return { ...state, Marketplace: action.payload };
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        Marketplace: { ...state.Marketplace, items: [] },
      };
    case ADD_TO_FOOD_CART:
      return { ...state, Food: action.payload };
    case ADD_ITEM_TO_SAVED_LIST:
      return {
        ...state,
        SavedList: {
          ...state.SavedList,
          items: [...state.SavedList.items, action.payload],
        },
      };
    // return {
    //   ...state,
    //   SavedList: [...state.SavedList.items, action.payload],
    // };
    // return { ...state, SavedList: action.payload };
    case GET_SAVED_LIST_ITEMS:
      return { ...state, SavedList: action.payload };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        SelectedCheckoutAddress: action.payload,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: false,
      };
    case SET_DELIVERY_ADDRESS:
      return { ...state, SelectedDeliveryAddress: action.payload };
    case SET_CUSTOMER_ADDRESSES:
      return { ...state, CustomerAddresses: action.payload };
    case ADD_CUSTOMER_ADDRESS:
      return {
        ...state,
        CustomerAddresses: [...state.CustomerAddresses, action.payload],
      };
    case SET_CART_TO_OPEN:
      return {
        ...state,
        CartToOpen: action.payload,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: false,
      };
    case OPEN_CART:
      return {
        ...state,
        OpenTheCart: action.payload,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: false,
      };
    case SHOW_DELIVERY_ADDRESS_CARD:
      return {
        ...state,
        CartDisplayAddressForm: true,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: false,
      };
    case SHOW_ADDRESS_BOOK_CARD:
      return {
        ...state,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: true,
        CartDisplayPickupAddressForm: false,
      };
    case SHOW_PICKUP_ADDRESS_CARD:
      return {
        ...state,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: true,
      };
    case HIDE_ALL_ADDRESS_CARDS:
    case PLACE_ORDER:
      return {
        ...state,
        CartDisplayAddressForm: false,
        CartDisplayAddressBook: false,
        CartDisplayPickupAddressForm: false,
      };
    case SHOW_CART_ALERT:
      return {
        ...state,
        Marketplace: { ...state.Marketplace, alertMessage: action.payload },
      };
    default:
      return { ...state };
  }
};

export default CartReducer;
