import { FoodActions } from "Http/Redux/Actions/Food/FoodAction";
import {
  IFoodState,
  SELECTED_LOCATION,
  MERCHANT_BY_LOCATION,
  FOOD_STATES,
  FOOD_AREAS,
  SELECTED_RESTAURANT,
  SELECTED_FOOD_PRODUCT,
} from "Http/Redux/Types/Food/Types";

export const FoodInitState: IFoodState = {
  SelectedLocation: null,
  MerchantsByLocation: null,
  FoodStates: null,
  FoodAreas: null,
  SelectedRestaurant: null,
  SelectedFoodProduct: null,
};

const FoodReducer = (
  state: IFoodState = FoodInitState,
  action: FoodActions
): IFoodState => {
  switch (action.type) {
    case SELECTED_LOCATION:
      return { ...state, SelectedLocation: action.payload };
    case MERCHANT_BY_LOCATION:
      return { ...state, MerchantsByLocation: action.payload };
    case FOOD_STATES:
      return { ...state, FoodStates: action.payload };
    case FOOD_AREAS:
      return { ...state, FoodAreas: action.payload };
    case SELECTED_RESTAURANT:
      return { ...state, SelectedRestaurant: action.payload };
    case SELECTED_FOOD_PRODUCT:
      return { ...state, SelectedFoodProduct: action.payload };
    default:
      return state;
  }
};

export default FoodReducer;
