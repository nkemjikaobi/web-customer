import IFoodCart from "dto/Cart/IFoodCart";
import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import { ADD_TO_FOOD_CART } from "Http/Redux/Types/Food/Types";

export interface IAddToFoodCartActionCreator {
  type: typeof ADD_TO_FOOD_CART;
  payload: IFoodCart | null;
}

export const AddToFoodCartActionCreator = (
  payload: IFoodCart | null
): IAddToFoodCartActionCreator => ({
  type: ADD_TO_FOOD_CART,
  payload,
});
