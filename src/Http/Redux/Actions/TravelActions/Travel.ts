/* eslint-disable @typescript-eslint/ban-types */
import { travelTimeData } from "dto/KongaTravel/data";
import ISearchResponse, {
  IAirlineMetric,
  IFlightDetailsJourney,
  IJourney,
} from "dto/KongaTravel/ISearchResponse";
import ITravelSearchFilter from "dto/KongaTravel/ITravelSearchFilter";
import ITrip from "dto/KongaTravel/ITrip";
import { TRAVEL_STOPS_COUNTS } from "Helpers/Constants";
import TravelService from "Http/Services/TravelService";
import { convertStringToDashed } from "libs/utils/utils";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import {
  FilterFlightActionCreator,
  FlightSearchResponse,
  SelectFlightActionCreator,
  SelectTripAirport,
  SetSearchIdActionCreator,
  TriggerFlightSearch,
} from "../ActionCreators/TravelActionCreator/TravelActionCreator";

export const SearchFlightsAction =
  (payload: ISearchForm) =>
  async (dispatch: Function): Promise<boolean> => {
    let data_response = false;
    try {
      dispatch(TriggerFlightSearch(payload));
      const response = await TravelService.SearchFlights(payload);
      if (response === null) {
        dispatch(FlightSearchResponse(null));
        return false;
      }
      if (response && response.flight) {
        const trips: ITrip = TravelService.GetTrips(response.flight);
        dispatch(FlightSearchResponse(response.flight));
        dispatch(SelectTripAirport(trips));
        data_response = true;
      }
      if (response && response.search_id) {
        dispatch(SetSearchIdActionCreator(response.search_id));
        data_response = true;
      }
    } catch (error) {}
    return data_response;
  };

export const SelectedFlightAction =
  (payload: IJourney) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      dispatch(SelectFlightActionCreator(payload));
      response = true;
    } catch (error) {}
    return response;
  };

export const SetSearchIdAction =
  (payload: number) =>
  async (dispatch: Function): Promise<boolean> => {
    let response = false;
    try {
      dispatch(SetSearchIdActionCreator(payload));
      response = true;
    } catch (error) {}
    return response;
  };

export const FilterFlightAction =
  (
    completeResponseResults: ISearchResponse,
    filterProperties: ITravelSearchFilter
  ) =>
  async (dispatch: Function): Promise<ISearchResponse | null> => {
    const response = completeResponseResults;
    const getStopAbbreviation = (count: number): string => {
      let result = "";
      try {
        result = TRAVEL_STOPS_COUNTS[count];
      } catch (error) {
        result = TRAVEL_STOPS_COUNTS[0];
      }
      return result;
    };

    try {
      const journeiesBucket = [...completeResponseResults.journey_list];
      const airlinesBucket = [...completeResponseResults.airline_metrix];

      let journey_list: any = [];
      let airline_metrix: any = [];
      // check if empty
      if (
        filterProperties.flightByAirlines.length === 0 &&
        filterProperties.flightsByArrivalTime.length === 0 &&
        filterProperties.flightsByDepartureTime.length === 0 &&
        filterProperties.flightsByStop.length === 0
      ) {
        journey_list = journeiesBucket;
        airline_metrix = airlinesBucket;
        dispatch(
          FilterFlightActionCreator({
            journey_list,
            airline_metrix,
          })
        );
        return journey_list;
      }

      let search_result = [];

      /** filter the flights by the amount of stops */
      if (filterProperties.flightsByStop.length > 0) {
        search_result = journeiesBucket.filter((metric: IJourney) =>
          filterProperties.flightsByStop.includes(
            `${getStopAbbreviation(
              metric.flight_details?.summary[0]?.no_of_stops ?? 0
            )}`
          )
        );
        journey_list = journey_list.concat(search_result);
        search_result = [];
        airline_metrix = airlinesBucket.filter((metric: IAirlineMetric) =>
          filterProperties.flightsByStop.includes(
            `${getStopAbbreviation(metric.stop_count ?? 0)}`
          )
        );
      }

      /** filter the flights by the departure time */
      if (filterProperties.flightsByDepartureTime.length > 0) {
        search_result = journeiesBucket.filter((metric: IJourney) => {
          if (
            metric &&
            metric.flight_details &&
            metric.flight_details.summary.length > 0
          ) {
            const origin = metric.flight_details.summary[0].origin;
            const departureDate = new Date(origin.datetime).getHours();
            const timeLabel = travelTimeData.find(
              (time: {
                label: string;
                time: string;
                start: number;
                stop: number;
              }) => time.start <= departureDate && time.stop >= departureDate
            );
            return filterProperties.flightsByDepartureTime.includes(
              convertStringToDashed(timeLabel?.label ?? "")
            );
          }
        });
        journey_list = journey_list.concat(search_result);
        search_result = [];
      }

      /** filter the flights by the arrival time */
      if (filterProperties.flightsByArrivalTime.length > 0) {
        search_result = journeiesBucket.filter((metric: IJourney) => {
          if (
            metric &&
            metric.flight_details &&
            metric.flight_details.summary.length > 0
          ) {
            const destination = metric.flight_details.summary[0].destination;
            const departureDate = new Date(destination.datetime).getHours();
            const timeLabel = travelTimeData.find(
              (time: {
                label: string;
                time: string;
                start: number;
                stop: number;
              }) => time.start <= departureDate && time.stop >= departureDate
            );
            return filterProperties.flightsByArrivalTime.includes(
              convertStringToDashed(timeLabel?.label ?? "")
            );
          }
        });
        journey_list = journey_list.concat(search_result);
        search_result = [];
      }

      /** filter the flights by the airlines */
      if (filterProperties.flightByAirlines.length > 0) {
        search_result = journeiesBucket.filter((journey: IJourney) => {
          if (
            journey &&
            journey.flight_details &&
            journey.flight_details.details.length > 0
          ) {
            return filterProperties.flightByAirlines.includes(
              journey.flight_details.summary[0].operator_code.toLowerCase()
            );
          }
        });
        journey_list = journey_list.concat(search_result);

        airline_metrix = airline_metrix.filter((metric: IAirlineMetric) =>
          filterProperties.flightByAirlines.includes(
            `${metric.airline_code.toLowerCase()}`
          )
        );
      }

      dispatch(
        FilterFlightActionCreator({
          journey_list,
          airline_metrix,
        })
      );
      return journey_list;
    } catch (error: any) {}

    return response;
  };
