/* eslint-disable @typescript-eslint/ban-types */

import { IndexActions } from "Http/Redux/Actions/ActionCreators/Index";
import { MarketplaceAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import {
  IMarketplaceState,
  SELECT_MARKETPLACE_CATEGORY,
  SELECT_MARKETPLACE_PRODUCT,
} from "Http/Redux/Types/Marketplace/Types";
import { REHYDRATE } from "redux-persist/es/constants";

export const MarketplaceInitState: IMarketplaceState = {
  SelectedCategory: null,
  SelectedProduct: null,
  MatchedProducts: null,
};

const MarketplaceReducer = (
  state: IMarketplaceState = MarketplaceInitState,
  action: MarketplaceAction | IndexActions
): IMarketplaceState => {
  switch (action.type) {
    case REHYDRATE:
      return { ...action.payload?.marketplace };
    case SELECT_MARKETPLACE_CATEGORY:
      return {
        ...state,
        SelectedCategory: action.payload,
      };
    case SELECT_MARKETPLACE_PRODUCT:
      return {
        ...state,
        SelectedProduct: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default MarketplaceReducer;
