/* eslint-disable @typescript-eslint/ban-types */
import IPlaceOrder from "dto/Cart/IPlaceOrder";
import IPlaceOrderResult from "dto/Cart/IPlaceOrderResult";
import IUpdateCartItemQty from "dto/Cart/IUpdateCartItemQty";
import CartService, { CartHolders } from "Http/Services/CartService";
import FoodService from "Http/Services/FoodService";
import MarketplaceService from "Http/Services/MarketplaceService";
import {
  AddItemToSavedListCreator,
  GetSavedListItemsCreator,
  IAddItemToSavedListCreator,
  IGetSavedListItemsCreator,
  IMakePaymentActionCreator,
  IOpenCartActionCreator,
  IPlaceOrderActionCreator,
  ISetCartAddressActionCreator,
  ISetCartToOpenActionCreator,
  ISetSelectedPaymentOptionActionCreator,
  IUpdateCartItemQtyActionCreator,
  MakePaymentActionCreator,
  OpenCartActionCreator,
  PlaceOrderActionCreator,
  SetCartToOpenActionCreator,
  UpdateCartItemQtyActionCreator,
} from "../ActionCreators/Cart/CartActionCreators";
import { AddToMarketplaceCart } from "../ActionCreators/Cart/MarketPlaceCartCreator";
import { AddToFoodCartActionCreator } from "../ActionCreators/Cart/FoodCartCreator";
import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import IAddItemToList from "dto/KongaOnline/IAddItemToList";

export const MakePaymentAction =
  () =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      dispatch(MakePaymentActionCreator());
      return true;
    } catch (error: any) {}
    return false;
  };

export const PlaceOrderAction =
  (payload: IPlaceOrder, store_id: number) =>
  async (dispatch: Function): Promise<IPlaceOrderResult | null> => {
    let done = null;
    try {
      dispatch(PlaceOrderActionCreator(payload));
      done = await CartService.PlaceOrder(payload, store_id);
    } catch (error: any) {}
    return done;
  };

export const OpenCartAction =
  (payload: boolean) =>
  async (dispatch: Function): Promise<boolean> => {
    let done = false;
    try {
      dispatch(OpenCartActionCreator(payload));
      done = true;
    } catch (error: any) {}
    return done;
  };

export const SetCartToOpenAction =
  (payload: number) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      dispatch(SetCartToOpenActionCreator(payload));
      response = true;
    } catch (error: any) {}
    return response;
  };

export const UpdateCartItemQtyAction =
  (
    payload: IUpdateCartItemQty,
    cartToUpdate: number = MarketplaceService.STORE_ID
  ) =>
  async (dispatch: Function): Promise<CartHolders> => {
    let response: CartHolders = null;
    try {
      const cart = await CartService.UpdateCartItemQty(payload, cartToUpdate);
      response = cart;
      dispatch(UpdateCartItemQtyActionCreator(payload));
      if (cart) {
        switch (cartToUpdate) {
          case MarketplaceService.STORE_ID:
            console.log("UpdateCartItemQtyAction");
            dispatch(AddToMarketplaceCart(cart));
            break;
          case FoodService.STORE_ID:
            dispatch(AddToFoodCartActionCreator(cart));
            break;
        }
      }
    } catch (error: any) {}
    return response;
  };

/**
 * Action Method to remove an item from the cart
 * @param cart_id
 * @param sku
 * @param cart_to_update
 * @returns
 */
export const RemoveItemFromCartAction =
  (cart_id: number, sku: number, cart_to_update: any) =>
  async (dispatch: Function): Promise<CartHolders> => {
    let cart = null;
    try {
      cart = await CartService.RemoveItemFromCart(cart_id, sku, cart_to_update);
      const newCartToUpdate = parseInt(cart_to_update);
      if (cart) {
        switch (newCartToUpdate) {
          case MarketplaceService.STORE_ID:
            dispatch(AddToMarketplaceCart(cart));
            break;
          case FoodService.STORE_ID:
            dispatch(AddToFoodCartActionCreator(cart));
            break;
        }
      }
    } catch (error: any) {}
    return cart;
  };

export const RemoveItemFromSavedList =
  (sku: number) =>
  async (dispatch: Function): Promise<any> => {
    let savedData: any;
    try {
      savedData = await MarketplaceService.deleteSavedListItem("default", sku);
      if (savedData) {
        dispatch(GetSavedListItemsCreator(savedData));
      }
    } catch (error: any) {}
    return savedData;
  };

/**
 * Action Method to add an item to saved list
 * @param sku
 * @returns
 */

export const AddItemToSavedListAction =
  (sku: number) =>
  async (dispatch: Function): Promise<IAddItemToList[]> => {
    let savedItems: Array<IAddItemToList> = [];
    await MarketplaceService.addItemToSavedList("default", sku)
      .then((data) => {
        const fullData = {
          sku: data.sku,
          created_at: null,
          product: data,
        };
        savedItems = dispatch(AddItemToSavedListCreator(fullData));
      })
      .catch((err) => console.log(err));
    return savedItems;
  };

export const GetSavedListItemsAction =
  (savedListItems: Array<IAddItemToSavedList>) =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(GetSavedListItemsCreator(savedListItems));
    return true;
  };

export type ICartAction =
  | IUpdateCartItemQtyActionCreator
  | ISetCartToOpenActionCreator
  | IOpenCartActionCreator
  | IMakePaymentActionCreator
  | IPlaceOrderActionCreator
  | ISetCartAddressActionCreator
  | IAddItemToSavedListCreator
  | IGetSavedListItemsCreator
  | ISetSelectedPaymentOptionActionCreator;
