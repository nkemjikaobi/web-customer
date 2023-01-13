import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import IProduct from "dto/KongaOnline/IProduct";
import {
  SELECTED_LOCATION,
  MERCHANT_BY_LOCATION,
  FOOD_STATES,
  FOOD_AREAS,
  SELECTED_RESTAURANT,
  SELECTED_FOOD_PRODUCT,
} from "Http/Redux/Types/Food/Types";

export interface ISelectLocationActionCreator {
  type: typeof SELECTED_LOCATION;
  payload: IFoodDeliveryArea;
}

export interface IFoodAreasActionCreator {
  type: typeof FOOD_AREAS;
  payload: IFoodDeliveryArea;
}
export interface IFoodStatesActionCreator {
  type: typeof FOOD_STATES;
  payload: IDeliveryState;
}

export interface IMerchantByLocationActionCreator {
  type: typeof MERCHANT_BY_LOCATION;
  payload: IMerchantLocation;
}

export interface ISelectedRestaurantActionCreator {
  type: typeof SELECTED_RESTAURANT;
  payload: IMerchantLocation;
}

export interface ISelectedFoodProductActionCreator {
  type: typeof SELECTED_FOOD_PRODUCT;
  payload: IProduct;
}

export const SelectLocationActionCreator = (
  payload: IFoodDeliveryArea
): ISelectLocationActionCreator => ({ type: SELECTED_LOCATION, payload });

export const FoodStatesActionCreator = (
  payload: IDeliveryState
): IFoodStatesActionCreator => ({ type: FOOD_STATES, payload });

export const FoodAreasActionCreator = (
  payload: IFoodDeliveryArea
): IFoodAreasActionCreator => ({ type: FOOD_AREAS, payload });

export const MerchantByLocationActionCreator = (
  payload: IMerchantLocation
): IMerchantByLocationActionCreator => ({
  type: MERCHANT_BY_LOCATION,
  payload,
});

export const SelectedRestaurantActionCreator = (
  payload: IMerchantLocation
): ISelectedRestaurantActionCreator => ({
  type: SELECTED_RESTAURANT,
  payload,
});

export const SelectedFoodProductActionCreator = (
  payload: IProduct
): ISelectedFoodProductActionCreator => ({
  type: SELECTED_FOOD_PRODUCT,
  payload,
});
