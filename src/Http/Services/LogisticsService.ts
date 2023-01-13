/* eslint-disable @typescript-eslint/ban-types */

import IOurLocation from "dto/KongaExpress/IOurLocation";
import IState from "dto/KongaExpress/IState";
import ITracking from "dto/KongaExpress/ITracking";
import IWaybill from "dto/KongaExpress/IWaybill";
import { SUCCESS } from "Helpers/Constants";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import {
  CALCULATE_RATE_URL,
  GENERATE_WAY_BILL_URL,
  GET_LOCATIONS,
  GET_STATES,
  TRACK_PARCELS,
} from "Http/Routes/KExpress";
import ICalculateRateForm from "Models/FormModels/KExpress/CalculateRateForm";
import HttpService from "./HttpService";

/**
 * Class to handle all travel api calls
 */
class LogisticsService extends HttpService {
  /**
   * method that calculates the rate for shipment.
   * @param caculateRateParam ICalculateRateForm
   * @return data any
   */
  public static CalculateRate = async (
    caculateRateParam: ICalculateRateForm
  ): Promise<number> => {
    let total = 0;
    const { data } = await axios.get(CALCULATE_RATE_URL(caculateRateParam));

    if (data && data.status === SUCCESS) {
      try {
        total = data.data;
      } catch (error: any) {}
    }
    return total;
  };

  /**
   * Method that gets all the states
   * @returns states Array<IState>
   */
  public static GetStates = async (): Promise<Array<IState>> => {
    let states: Array<IState> = new Array<IState>();
    try {
      const {
        data: { data },
      } = await axios.get(GET_STATES);

      if (data) {
        states = data.data ? data.data : data;
      }
    } catch (error: any) {}
    return states;
  };

  /**
   * Method to generate a waybill
   * @param payload IWayBill
   * @returns Promise<{ message: string; data: any } | null>
   */
  public static GenerateWayBill = async (
    payload: IWaybill
  ): Promise<{ message: string; data: any } | null> => {
    try {
      const { data } = await axios.post(GENERATE_WAY_BILL_URL, payload);
      return {
        data: data.data,
        message: data.message,
      };
    } catch (error: any) {
      return null;
    }
  };

  /**
   * Method / Service call to track parcels.
   * @param trackingNumber string
   * @returns tempParcelResponse ITracking | null
   */
  public static TrackParcel = async (
    trackingNumber: string
  ): Promise<ITracking | null> => {
    try {
      const {
        data: { data },
      } = await axios.post(TRACK_PARCELS, {
        order_no: trackingNumber,
        domain_name: "kos.ng/track",
      });

      // format the result
      const indexKey: any = Object.keys(data.packages);
      const packages: any = data.packages[indexKey];
      const tempParcelResponse: ITracking = {
        tracking_no: data?.tracking_no,
        results: packages?.results ?? [],
        tracking_status: packages?.tag ?? "",
      };
      return tempParcelResponse;
    } catch (error: any) {
      return null;
    }
  };

  /**
   * Method / Service call to fetch all our locations
   * @returns ourLocations Array<IOurLocation>
   */
  public static GetOurLocations = async (): Promise<Array<IOurLocation>> => {
    let ourLocations: Array<IOurLocation> = [];
    try {
      const {
        data: { data },
      } = await axios.get(GET_LOCATIONS);
      ourLocations = data.data ? data.data : data;
    } catch (error: any) {}
    return ourLocations;
  };
}

export default LogisticsService;
