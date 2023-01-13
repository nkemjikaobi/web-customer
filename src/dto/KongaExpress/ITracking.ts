import ITrackingResult from "./ITrackingResult";

interface ITracking {
  message?: string;
  tracking_no: string;
  tracking_status: string;
  results: Array<ITrackingResult>;
}

export default ITracking;
