/* eslint-disable @typescript-eslint/ban-types */
import { AuthAction } from "Http/Redux/Actions/AuthAction";
import { DGActionEvent } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { DGActionRequest } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { SIGNIN_SUCCESS } from "Http/Redux/Types/Types";

type IMiddleWareAction = AuthAction | DGActionEvent | DGActionRequest;

/**
 * Method to run all the middleware clients
 */
const DGMiddlware: any =
  (api: { getState: any; dispatch: Function }) =>
  (next: Function) =>
  (action: IMiddleWareAction) => {
    switch (action.type) {
      case SIGNIN_SUCCESS:
    }
    return next(action);
  };

export default DGMiddlware;
