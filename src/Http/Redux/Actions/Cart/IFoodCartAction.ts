/* eslint-disable @typescript-eslint/ban-types */
import {
  IAddToFoodCartActionCreator,
  AddToFoodCartActionCreator,
} from "../ActionCreators/Cart/FoodCartCreator";
import CartService from "Http/Services/CartService";
import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import FoodService from "Http/Services/FoodService";

export type IFoodCartAction = IAddToFoodCartActionCreator;

/**
 * Method to set the food cart
 * @param payload IFoodCart
 * @returns boolean
 */
export const AddFoodItemCartAction =
  (form: IMarketplaceCartForm) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      const data: IFoodCart | null = await CartService.AddItemToMarketplaceCart(
        form,
        FoodService.STORE_ID
      );
      dispatch(AddToFoodCartActionCreator(data));
      response = true;
    } catch (error: any) {}
    return response;
  };
