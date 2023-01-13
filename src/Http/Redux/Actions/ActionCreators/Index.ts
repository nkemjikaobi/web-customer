import { REHYDRATE } from "redux-persist/es/constants";

export interface IRehydrate {
  type: typeof REHYDRATE;
  payload: any;
}

export type IndexActions = IRehydrate;
