/* eslint-disable @typescript-eslint/ban-types */

import { ITravelActionCreator } from "Http/Redux/Actions/ActionCreators/TravelActionCreator/TravelActionCreator";
import {
  FILTER_SEARCH_RESULT,
  ITravelState,
  SEARCH_FLIGHT,
  SEARCH_TRIGGERED,
  SELECT_AIRPORTS,
  SELECT_FLIGHT,
  SET_SEARCH_ID,
} from "Http/Redux/Types/Travel/Types";

export const TravelInitState: ITravelState = {
  SearchId: null,
  SelectedTrip: null,
  SearchResult: null,
  SearchedData: null,
  SelectedFlight: null,
  OriginalSearchedResult: null,
};

const TravelReducer = (
  state: ITravelState,
  action: ITravelActionCreator
): ITravelState => {
  switch (action.type) {
    case SEARCH_TRIGGERED:
      return { ...state, SearchedData: action.payload };
    case SEARCH_FLIGHT:
      return {
        ...state,
        SearchResult: action.payload,
        OriginalSearchedResult: action.payload,
      };
    case SELECT_AIRPORTS:
      return { ...state, SelectedTrip: action.payload };
    case SELECT_FLIGHT:
      return { ...state, SelectedFlight: action.payload };
    case SET_SEARCH_ID:
      return { ...state, SearchId: action.payload };
    case FILTER_SEARCH_RESULT:
      return { ...state, SearchResult: action.payload };
    default:
      return { ...state };
  }
};

export default TravelReducer;
