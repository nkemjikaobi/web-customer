import ITrip from "dto/KongaTravel/ITrip";
import ISearchResponse, { IJourney } from "dto/KongaTravel/ISearchResponse";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";

export const SEARCH_TRIGGERED = "SEARCH_TRIGGERED";

export const SEARCH_FLIGHT = "SEARCH_FLIGHT";

export const SELECT_AIRPORTS = "SELECT_AIRPORTS";
export const SELECT_FLIGHT = "SELECT_FLIGHT";
export const SET_SEARCH_ID = "SET_SEARCH_ID";
export const FILTER_SEARCH_RESULT = "FILTER_SEARCH_RESULT";

export interface ITravelState {
  SearchId: number | null;
  SelectedTrip: ITrip | null;
  SearchedData: ISearchForm | null;
  SearchResult: ISearchResponse | null;
  OriginalSearchedResult: ISearchResponse | null;
  SelectedFlight: IJourney | null;
}
