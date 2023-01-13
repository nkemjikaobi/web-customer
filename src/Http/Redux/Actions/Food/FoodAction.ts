/* eslint-disable @typescript-eslint/ban-types */

import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import {
  ISelectLocationActionCreator,
  SelectLocationActionCreator,
  IMerchantByLocationActionCreator,
  MerchantByLocationActionCreator,
  FoodStatesActionCreator,
  FoodAreasActionCreator,
  IFoodStatesActionCreator,
  IFoodAreasActionCreator,
  SelectedRestaurantActionCreator,
  ISelectedRestaurantActionCreator,
  ISelectedFoodProductActionCreator,
  SelectedFoodProductActionCreator,
} from "../ActionCreators/FoodActionCreator/FoodActionCreator";
import IProduct from "dto/KongaOnline/IProduct";

export const SelectedLocationAction =
  (payload: IFoodDeliveryArea) =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      dispatch(SelectLocationActionCreator(payload));
      return true;
    } catch (error) {}
    return false;
  };

export const MerchantByLocationAction =
  (payload: IMerchantLocation) => async (dispatch: Function) => {
    try {
      dispatch(MerchantByLocationActionCreator(payload));
    } catch (errror) {}
    return null;
  };

export const FoodStatesAction =
  (payload: IDeliveryState) => async (dispatch: Function) => {
    try {
      dispatch(FoodStatesActionCreator(payload));
    } catch (error: any) {}
    return null;
  };

export const FoodAreasAction =
  (payload: IFoodDeliveryArea) => async (dispatch: Function) => {
    try {
      dispatch(FoodAreasActionCreator(payload));
    } catch (error: any) {}
    return null;
  };

export const SelectedRestaurant =
  (payload: IMerchantLocation) => async (dispatch: Function) => {
    try {
      dispatch(SelectedRestaurantActionCreator(payload));
    } catch (error: any) {}
    return null;
  };

export const SelectedFoodProduct =
  (payload: IProduct) => async (dispatch: Function) => {
    try {
      dispatch(SelectedFoodProductActionCreator(payload));
    } catch (error: any) {}
    return null;
  };

export type FoodActions =
  | ISelectLocationActionCreator
  | IMerchantByLocationActionCreator
  | IFoodStatesActionCreator
  | IFoodAreasActionCreator
  | ISelectedRestaurantActionCreator
  | ISelectedFoodProductActionCreator;
