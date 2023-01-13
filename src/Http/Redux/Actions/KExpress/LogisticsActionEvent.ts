/* eslint-disable @typescript-eslint/ban-types */
import ITracking from "dto/KongaExpress/ITracking";
import IWaybill from "dto/KongaExpress/IWaybill";
import LogisticsService from "Http/Services/LogisticsService";
import ICalculateRateForm from "Models/FormModels/KExpress/CalculateRateForm";
import IStepOneForm from "Models/FormModels/KExpress/StepOneForm";
import IStepTwoForm from "Models/FormModels/KExpress/StepTwoForm";
import {
  GenerateWayBillRequest,
  IGenerateWayBillRequest,
  IMoveSteperAction,
  initWayBillForm,
  ISaveTotal,
  IStepOneCompleted,
  IStepTwoCompleted,
  ITrackPackage,
  IWayBillInit,
  MoveStepper,
  saveWaybillTotal,
  StepOneRequest,
  StepTwoRequest,
  TrackPackageActionCreator,
} from "../ActionCreators/KExpressActionCreator/LogisticsActionCreator";

export const InitializeWayBill =
  (payload: ICalculateRateForm) =>
  async (dispatch: Function): Promise<number> => {
    try {
      const result = await LogisticsService.CalculateRate(payload);
      dispatch(initWayBillForm(payload));
      return result;
    } catch (error: any) {
      return 0;
    }
  };

export const SaveShippingAmount = (payload: number) => (dispatch: Function) => {
  dispatch(saveWaybillTotal(payload));
};

export const StepOneAction =
  (payload: IStepOneForm) =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      dispatch(StepOneRequest(payload));
      return true;
    } catch (error: any) {
      return false;
    }
  };

export const StepTwoAction =
  (payload: IStepTwoForm) =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      dispatch(StepTwoRequest(payload));
      return true;
    } catch (error: any) {
      return false;
    }
  };

export const GenerateWayBillAction =
  (payload: IWaybill) =>
  async (dispatch: Function): Promise<any> => {
    try {
      const result = await LogisticsService.GenerateWayBill(payload);
      dispatch(GenerateWayBillRequest(payload));
      return result;
    } catch (error: any) {
      return false;
    }
  };

export const TrackParcelAction =
  (payload: string) =>
  async (dispatch: Function): Promise<boolean> => {
    try {
      const result = await LogisticsService.TrackParcel(payload);
      if (result !== null) {
        dispatch(TrackPackageActionCreator(result));
        return true;
      }
    } catch (error: any) {}

    return false;
  };

export const MoveSteperAction =
  (payload: number) =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(MoveStepper(payload));
    return true;
  };

export type LogisticsActionEvent =
  | ISaveTotal
  | IWayBillInit
  | IGenerateWayBillRequest
  | IStepOneCompleted
  | IStepTwoCompleted
  | IMoveSteperAction
  | ITrackPackage;
