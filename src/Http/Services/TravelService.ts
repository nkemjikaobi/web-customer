/* eslint-disable @typescript-eslint/ban-types */

import ISearchResponse, {
  IAirlineMetric,
  IFlightDetails,
  IFlightDetailsJourney,
  IJourney,
} from "dto/KongaTravel/ISearchResponse";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import {
  BOOK_FLIGHT_URL,
  SEARCH_FOR_FLIGHTS_URL,
  TEMP_APP_REFERENCE,
} from "Http/Routes/KTravel";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import HttpService from "./HttpService";

import airports from "../../dto/KongaTravel/airports.json";
import ITrip, { IAirport, IDestination } from "dto/KongaTravel/ITrip";
import IBookingForm from "Models/FormModels/KTravel/BookingForm";
import IBookingResponse from "dto/KongaTravel/IBookingResponse";
import ITravelSearchFilter from "dto/KongaTravel/ITravelSearchFilter";

/**
 * Class to handle all travel api calls
 */
class TravelService extends HttpService {
  /**
   * Method that searchs for flights based on search query
   * @param searchParams ISearchForm
   * @returns Promise<any>
   */
  public static SearchFlights = async (
    searchForFlightsPayload: ISearchForm
  ): Promise<{ flight: ISearchResponse | null; search_id: number } | null> => {
    let flight: ISearchResponse | null = null;
    let response: {
      flight: ISearchResponse | null;
      search_id: number;
    } | null = null;
    try {
      const {
        data: {
          data: { flight_data_list },
          aData: { search_id },
        },
      } = await axios.post(SEARCH_FOR_FLIGHTS_URL, searchForFlightsPayload);
      flight = TravelService.FormatSearchResponse(flight_data_list);
      response = { flight: flight, search_id: search_id };
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to format response from searching for flights
   * @param payload any - the unformatted api response
   * @returns response ISearchResponse
   */
  public static FormatSearchResponse = (payload: any): ISearchResponse => {
    const { airline_metrix, journey_list } = payload;
    const _journey_list: Array<IJourney> = [
      ...TravelService.__formatJournies(journey_list),
    ];
    const _airline_metrix: Array<IAirlineMetric> = [
      ...TravelService.__formatAirmetrix(airline_metrix),
    ];

    const response: ISearchResponse = {
      journey_list: _journey_list,
      airline_metrix: _airline_metrix,
    };
    return response;
  };

  /**
   * Method to filte the response from getting flights to get out the trips
   * @param payload: ISearchResponse
   * @returns trips ITrip
   */
  public static GetTrips = (payload: ISearchResponse): ITrip => {
    const trips: ITrip = { destinations: [] };
    payload.journey_list.map((journey: IJourney) => {
      trips.destinations = [
        ...journey.flight_details.summary.map(
          (summary: IFlightDetailsJourney) => {
            const destination: IDestination = {
              fromAirport: summary.origin?.airport ?? null,
              toAirport: summary.destination?.airport ?? null,
              toDate: summary.destination?.date,
              fromDate: summary.destination?.date,
            };
            return destination;
          }
        ),
      ];
    });
    return trips;
  };

  /**
   * Method to book a flight
   * @param payload IBookingForm
   * @returns response IBookingResponse
   */
  public static BookFlight = async (
    payload: IBookingForm
  ): Promise<IBookingResponse | null> => {
    let response = null;
    try {
      // TODO:
      // except for production this api call should not run
      // console.log("Booking payload", payload);

      // const {
      //   data: { data },
      // } = await axios.post(BOOK_FLIGHT_URL, payload);
      // response = data;
      // console.log("Booking response", response);
      response = {
        app_reference: `${TEMP_APP_REFERENCE}${Math.random() * 1000}`, //Temp app reference till booking is available
        AirItinerary: null,
        PriceInfo: null,
        TravelerInfo: null,
        TicketDesignator: null,
        BookingReferenceID: null,
      };
    } catch (error: any) {}
    return response;
  };

  public static ApplySearchFilter = async (
    parameters: ITravelSearchFilter
  ): Promise<boolean> => {
    let response = false;
    try {
      response = true;
    } catch (error: any) {}
    return response;
  };

  // PROTECTED METHODS
  protected static __provideAirport = (
    origin: string,
    destination: string
  ): Array<IAirport> => {
    const locations: Array<any> = airports.filter(
      (airport: any) =>
        airport.airport_city.toLowerCase().trim() ===
          origin?.toLowerCase().trim() ||
        airport.airport_city.toLowerCase().trim() ===
          destination?.toLowerCase().trim()
    );
    return locations;
  };

  protected static __formatFlightDetails = (
    payload: IFlightDetails
  ): IFlightDetails => {
    // add the airport to each detail
    payload.summary = payload.summary.map((summary: IFlightDetailsJourney) => {
      const airport = TravelService.__provideAirport(
        summary.origin?.city,
        summary.destination?.city
      );
      summary.origin.airport = airport.find(
        (a: IAirport) =>
          a.city_code.toLowerCase().trim() ===
          summary.origin?.loc.toLowerCase().trim()
      );
      summary.destination.airport = airport.find(
        (a: IAirport) =>
          a.airport_code.toLowerCase().trim() ===
          summary.destination?.loc.toLowerCase().trim()
      );
      return summary;
    });

    return payload;
  };

  protected static __formatJournies = (payload: any): Array<IJourney> => {
    const journies: Array<IJourney> = (payload[0] ?? []).map((journey: any) => {
      const flight_details = TravelService.__formatFlightDetails(
        journey.flight_details
      );
      return {
        flight_details: flight_details,
        price: journey.price,
        passenger_breakup: journey.passenger_breakup,
        tax_details: journey.tax_details,
        fare: journey.fare,
        attr: journey.attr,
        keys: journey.keys,
        token: journey.token,
        token_key: journey.token_key,
        access_key: journey.access_key,
      };
    });

    return journies;
  };

  protected static __formatAirmetrix = (payload: any): Array<IAirlineMetric> =>
    Object.entries(payload).map((item: any): IAirlineMetric => {
      let response = item[1];
      try {
        if (!Array.isArray(response)) {
          response = Object.values(response);
        }
        response = response[0];
      } catch (error: any) {}
      return response;
    });
}

export default TravelService;
