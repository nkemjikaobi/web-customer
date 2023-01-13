import ISearchResponse, { IJourney } from "dto/KongaTravel/ISearchResponse";
import ITrip from "dto/KongaTravel/ITrip";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import {
  FILTER_SEARCH_RESULT,
  SEARCH_FLIGHT,
  SEARCH_TRIGGERED,
  SELECT_AIRPORTS,
  SELECT_FLIGHT,
  SET_SEARCH_ID,
} from "../../../Types/Travel/Types";

export interface ISearchResult {
  type: typeof SEARCH_FLIGHT;
  payload: ISearchResponse;
}

export interface ISearchedData {
  type: typeof SEARCH_TRIGGERED;
  payload: ISearchForm;
}

export interface ISelectedTripAirports {
  type: typeof SELECT_AIRPORTS;
  payload: ITrip;
}

export interface ISelectFlightActionCreator {
  type: typeof SELECT_FLIGHT;
  payload: IJourney;
}

export interface ISetSearchIdActionCreator {
  type: typeof SET_SEARCH_ID;
  payload: number;
}

export interface IFilterFlightActionCreator {
  type: typeof FILTER_SEARCH_RESULT;
  payload: ISearchResponse;
}

export const TriggerFlightSearch = (form: ISearchForm): ISearchedData => ({
  type: SEARCH_TRIGGERED,
  payload: form,
});

export const FlightSearchResponse = (response: any): ISearchResult => ({
  type: SEARCH_FLIGHT,
  payload: response,
});

export const SelectTripAirport = (payload: ITrip): ISelectedTripAirports => ({
  type: SELECT_AIRPORTS,
  payload: payload,
});

export const SelectFlightActionCreator = (
  payload: IJourney
): ISelectFlightActionCreator => ({ type: SELECT_FLIGHT, payload });

export const SetSearchIdActionCreator = (
  payload: number
): ISetSearchIdActionCreator => ({ type: SET_SEARCH_ID, payload });

export const FilterFlightActionCreator = (
  payload: ISearchResponse
): IFilterFlightActionCreator => ({ type: FILTER_SEARCH_RESULT, payload });

export type ITravelActionCreator =
  | ISearchResult
  | ISearchedData
  | ISelectedTripAirports
  | ISetSearchIdActionCreator
  | IFilterFlightActionCreator
  | ISelectFlightActionCreator;
