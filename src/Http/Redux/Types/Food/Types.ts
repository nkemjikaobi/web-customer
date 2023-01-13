import IFoodCart from "dto/Cart/IFoodCart";
import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import IProduct from "dto/KongaOnline/IProduct";
export const SELECTED_LOCATION = "SELECTED_LOCATION";
export const MERCHANT_BY_LOCATION = "MERCHANT_BY_LOCATION";
export const FOOD_STATES = "FOOD_STATES";
export const FOOD_AREAS = "FOOD_AREAS";
export const SELECTED_RESTAURANT = "SELECTED_RESTAURANT";
export const SELECT_LOCTION = "SELECT_LOCTION";
export const ADD_TO_FOOD_CART = "ADD_TO_FOOD_CART";
export const CHECKOUT_FOOD_CART = "CHECKOUT_FOOD_CART";
export const SELECTED_FOOD_PRODUCT = "SELECTED_FOOD_PRODUCT";
export interface IFoodState {
  SelectedLocation: IFoodDeliveryArea | null;
  MerchantsByLocation: IMerchantLocation | null;
  FoodStates: IDeliveryState | null;
  FoodAreas: IFoodDeliveryArea | null;
  SelectedRestaurant: IMerchantLocation | null;
  SelectedFoodProduct: IProduct | null;
}
