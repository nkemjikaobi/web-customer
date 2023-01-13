/* eslint-disable @typescript-eslint/ban-types */

import { LogisticsActionEvent } from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import {
  GENERATE_WAY_BILL,
  ILogisticsState,
  INIT_WAYBILL,
  MOVE_STEPPER,
  SAVE_TOTAL,
  STEP_ONE_COMPLETED,
  STEP_TWO_COMPLETED,
  TRACK_PACKAGE,
} from "Http/Redux/Types/KExpress/Types";

export const LogisticsInitialState: ILogisticsState = {
  CurrentStep: 0,
  TrackingResult: null,
  WayBillRequestAmount: 0,
  WayBillRequest: {
    shipper_firstname: "",
    shipper_lastname: "",
    shipper_state: "",
    shipper_city: "",
    shipper_lga: "",
    shipper_street: "",
    shipper_telephone: "",
    shipper_email: "",
    receiver_firstname: "",
    receiver_lastname: "",
    receiver_state: "",
    receiver_city: "",
    receiver_lga: "",
    receiver_street: "",
    receiver_telephone: "",
    receiver_email: "",
    package_weight: 0,
    package_pieces: 0,
    package_name: "",
    description: "",
    delivery_type: "",
  },
};

const LogisticsReducer = (
  state: ILogisticsState = LogisticsInitialState,
  action: LogisticsActionEvent
): ILogisticsState => {
  switch (action.type) {
    case MOVE_STEPPER:
      return {
        ...state,
        ["CurrentStep"]: action.payload,
      };
    case SAVE_TOTAL:
      return {
        ...state,
        ["WayBillRequestAmount"]: action.payload,
      };
    case INIT_WAYBILL:
      return {
        ...state,
        WayBillRequest: {
          ...state.WayBillRequest,
          ["description"]: action.payload.description,
          ["delivery_type"]: action.payload.deliveryType,
          ["receiver_lga"]: action.payload.toLocalGovernmentArea,
          ["shipper_lga"]: action.payload.fromLocalGovernmentArea,
          ["shipper_state"]: action.payload.from_state,
          ["receiver_state"]: action.payload.to_state,
          ["package_weight"]: action.payload.weight,
        },
      };
    case STEP_ONE_COMPLETED:
      return {
        ...state,
        WayBillRequest: { ...state.WayBillRequest, ...action.payload },
      };
    case STEP_TWO_COMPLETED:
      return {
        ...state,
        WayBillRequest: { ...state.WayBillRequest, ...action.payload },
      };
    case GENERATE_WAY_BILL:
      return { ...state, WayBillRequest: action.payload };
    case TRACK_PACKAGE:
      return { ...state, TrackingResult: action.payload };
    default:
      return { ...state };
  }
};

export default LogisticsReducer;
