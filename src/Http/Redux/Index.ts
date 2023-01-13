import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import AuthReducer from "./Reducers/AuthReducer";
import FlashBannerReducer from "./Reducers/FlashBanner/FlashBannerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import DGReducer from "./Reducers/KPay/DGReducer";
import DGMiddlware from "Http/Middlwares/DGMiddlware";
import LogisticsReducer from "./Reducers/KExpress/LogisticsReducer";
import MarketplaceReducer from "./Reducers/Marketplace/MarketplaceReducer";
import TravelReducer from "./Reducers/Travel/TravelReducer";
import ModalReducer from "./Reducers/Modal/ModalReducer";
import CartReducer from "./Reducers/Cart/CartReducer";
import FoodReducer from "./Reducers/Food/FoodReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import NotificationReducer from "./Reducers/NotificationReducer";
import { SIGNOUT_SUCEESS } from "./Types/Types";

export interface IRootReducer {
  auth: any;
  cart: any;
  kpay: any;
  logistics: any;
  marketplace: any;
  travel: any;
  food: any;
  modal: any;
  notification: any;
  flashBanner: any;
}

export const AllReducers: IRootReducer = {
  auth: AuthReducer,
  cart: CartReducer,
  kpay: DGReducer,
  logistics: LogisticsReducer,
  marketplace: MarketplaceReducer,
  travel: TravelReducer,
  food: FoodReducer,
  modal: ModalReducer,
  notification: NotificationReducer,
  flashBanner: FlashBannerReducer,
};

export const PersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appReducer: any = combineReducers(AllReducers);

const rootReducer = (state: any, action: any) => {
  if (action.type === SIGNOUT_SUCEESS) {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const PersistReducer = persistReducer(PersistConfig, rootReducer);

// MiddlewareClient
const store: Store = createStore(
  PersistReducer,
  composeWithDevTools(applyMiddleware(thunk, DGMiddlware))
);

export type RootState = ReturnType<typeof PersistReducer>;

export default store;
