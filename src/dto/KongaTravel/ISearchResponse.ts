import { IAirport } from "./ITrip";

export interface IFlightDetailsJourneyLocation {
  loc: string;
  city: string;
  datetime: string;
  date: string;
  time: string;
  fatv: number;
  terminal: string;
  airport?: IAirport;
}

export interface IFlightDetailsJourney {
  journey_number: string;
  origin: IFlightDetailsJourneyLocation;
  destination: IFlightDetailsJourneyLocation;
  operator_code: string;
  display_operator_code: string;
  operator_name: string;
  flight_number: string;
  cabin_class: string;
  fare_class: string;
  no_of_stops: number;
  is_leg: boolean;
  cabin_bag: string;
  duration_seconds: string;
  duration: string;
  APIDuration: any | null;
  layover_time: string;
}

export interface IFlightDetails {
  summary: Array<IFlightDetailsJourney>;
  details: Array<Array<IFlightDetailsJourney>>;
}

export interface IJourneyPrice {
  api_currency: string;
  api_total_display_fare: number;
  total_breakup: {
    api_total_tax: number;
    api_total_fare: number;
    meal_and_baggage_fare: number;
  };
}

export interface IJourneyPassengerBreakup {
  ADT: {
    base_price: number;
    total_price: number;
    tax: number;
    pass_no: string;
    per_tax: number;
    per_basic_amount: number;
  };
}

export interface IJourneyTaxDetails {
  ADT: number;
}

export interface IJourneyFare {
  api_currency: string;
  api_total_display_fare: number;
  total_breakup: {
    api_total_tax: number;
    api_total_fare: number;
  };
  price_breakup: {
    basic_fare: number;
    fuel_charge: number;
    handling_charge: number;
    service_tax: number;
    agent_commission: number;
    agent_tds_on_commision: number;
    admin_commission: number;
    admin_tds_on_commission: number;
    agent_markup: number;
    admin_markup: number;
    app_user_buying_price: number;
    APICommission: number;
    discount: number;
  };
}
export interface IJourneyAttr {
  isrefundable: string;
  markup_type: string;
}
export interface IJourneyKeys {
  TrackId: string;
  FlightId: string | null;
  FlightNum: string;
  AirlineId: string;
  ClassCode: string;
}

export interface IJourney {
  flight_details: IFlightDetails;
  price: IJourneyPrice;
  passenger_breakup: IJourneyPassengerBreakup;
  tax_details: IJourneyTaxDetails;
  fare: Array<IJourneyFare>;
  attr: IJourneyAttr;
  keys: Array<IJourneyKeys>;
  token: string;
  token_key: string;
  access_key: string;
}

export interface IAirlineMetric {
  airline_code: string;
  airline_name: string;
  stop_count: number;
  price: number;
}

interface ISearchResponse {
  journey_list: Array<IJourney>;
  airline_metrix: Array<IAirlineMetric>;
}

export default ISearchResponse;
