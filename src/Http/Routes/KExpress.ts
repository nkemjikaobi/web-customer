/**
 * File holding Konga Express routes
 */

import ICalculateRateForm from "Models/FormModels/KExpress/CalculateRateForm";
import { GATEWAY_API_ROUTE } from "./Authentication";

export const CALCULATE_RATE_URL = (props: ICalculateRateForm): string =>
  `${GATEWAY_API_ROUTE}/mercury/calculate-rate?from_lga=${props.fromLocalGovernmentArea}&state=${props.to_state}&lga=${props.toLocalGovernmentArea}&weight=${props.weight}&client_id=${props.clientId}`;
export const GET_STATES = `${GATEWAY_API_ROUTE}/mercury/get-state-and-lga?expand=lgas&per-page=-1`;
export const GET_LOCATIONS = `${GATEWAY_API_ROUTE}/mercury/get-locations?sort=name&expand=lga,state&active=1&is_public=1&per-page=-1`;
export const TRACK_PARCELS = `${GATEWAY_API_ROUTE}/mercury/track`;
export const GENERATE_WAY_BILL_URL = `${GATEWAY_API_ROUTE}/mercury/temp-waybill`;
