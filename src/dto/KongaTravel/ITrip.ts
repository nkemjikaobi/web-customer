interface ITrip {
  destinations: Array<IDestination>;
}

export interface IDestination {
  fromAirport: IAirport | null;
  toAirport: IAirport | null;
  fromDate: string;
  toDate: string;
}

export interface IAirport {
  origin: string;
  airport_code: string;
  airport_name: string;
  airport_city: string;
  country: string;
  country_code: string;
  city_code: string;
  updated_datetime: string;
  image?: string;
  top_destination?: string;
  airport_status?: boolean;
  seq_no?: string;
}

export default ITrip;
