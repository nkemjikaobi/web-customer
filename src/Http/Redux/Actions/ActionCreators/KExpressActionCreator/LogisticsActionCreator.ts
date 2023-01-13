/* eslint-disable @typescript-eslint/ban-types */

import IWaybill from "dto/KongaExpress/IWaybill";
import ICalculateRateForm from "Models/FormModels/KExpress/CalculateRateForm";

import {
  GENERATE_WAY_BILL,
  INIT_WAYBILL,
  MOVE_STEPPER,
  SAVE_TOTAL,
  STEP_ONE_COMPLETED,
  STEP_TWO_COMPLETED,
  TRACK_PACKAGE,
} from "Http/Redux/Types/KExpress/Types";
import IStepOneForm from "Models/FormModels/KExpress/StepOneForm";
import IStepTwoForm from "Models/FormModels/KExpress/StepTwoForm";
import ITracking from "dto/KongaExpress/ITracking";

export interface IMoveSteperAction {
  type: typeof MOVE_STEPPER;
  payload: number;
}
export interface IGenerateWayBillRequest {
  type: typeof GENERATE_WAY_BILL;
  payload: IWaybill;
}

export interface ISaveTotal {
  type: typeof SAVE_TOTAL;
  payload: number;
}
export interface IWayBillInit {
  type: typeof INIT_WAYBILL;
  payload: ICalculateRateForm;
}
export interface IStepOneCompleted {
  type: typeof STEP_ONE_COMPLETED;
  payload: IStepOneForm;
}
export interface IStepTwoCompleted {
  type: typeof STEP_TWO_COMPLETED;
  payload: IStepTwoForm;
}

export interface ITrackPackage {
  type: typeof TRACK_PACKAGE;
  payload: ITracking | null;
}

export const MoveStepper = (payload: number): IMoveSteperAction => ({
  type: MOVE_STEPPER,
  payload: payload,
});

export const initWayBillForm = (payload: ICalculateRateForm): IWayBillInit => ({
  type: INIT_WAYBILL,
  payload: payload,
});

export const saveWaybillTotal = (payload: number): ISaveTotal => ({
  type: SAVE_TOTAL,
  payload: payload,
});

export const StepOneRequest = (payload: IStepOneForm): IStepOneCompleted => ({
  type: STEP_ONE_COMPLETED,
  payload: payload,
});

export const StepTwoRequest = (payload: IStepTwoForm): IStepTwoCompleted => ({
  type: STEP_TWO_COMPLETED,
  payload: payload,
});

export const GenerateWayBillRequest = (
  payload: IWaybill
): IGenerateWayBillRequest => ({
  type: GENERATE_WAY_BILL,
  payload: payload,
});

export const TrackPackageActionCreator = (
  payload: ITracking | null
): ITrackPackage => ({
  type: TRACK_PACKAGE,
  payload: payload,
});
