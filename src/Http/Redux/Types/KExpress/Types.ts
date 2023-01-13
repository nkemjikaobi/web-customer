import ITracking from "dto/KongaExpress/ITracking";
import IWaybill from "dto/KongaExpress/IWaybill";

export const SAVE_TOTAL = "SAVE_TOTAL";
export const INIT_WAYBILL = "INIT_WAYBILL";
export const STEP_ONE_COMPLETED = "STEP_ONE_COMPLETED";
export const STEP_TWO_COMPLETED = "STEP_TWO_COMPLETED";
export const GENERATE_WAY_BILL = "GENERATE_WAY_BILL";
export const TRACK_PACKAGE = "TRACK_PACKAGE";

export const MOVE_STEPPER = "MOVE_STEPPER";

export interface ILogisticsState {
  CurrentStep: number;
  TrackingResult: ITracking | null;
  WayBillRequestAmount: number;
  WayBillRequest: IWaybill;
}
