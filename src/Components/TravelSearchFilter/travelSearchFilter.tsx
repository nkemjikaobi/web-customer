/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import FilterWrapper from "Components/FilterWrapper/filterWrapper";
import styles from "./travelSearchFilter.module.scss";
import FlightStopsFilterComponent from "PagesComponents/KTravel/Search/FlightSearchWidgetComponent/FlightStopsFilterComponent/FlightStopsFilterComponent";
import ISearchResponse, {
  IAirlineMetric,
} from "dto/KongaTravel/ISearchResponse";
import ITravelSearchFilter from "dto/KongaTravel/ITravelSearchFilter";
import { connect } from "react-redux";
import { FilterFlightAction } from "Http/Redux/Actions/TravelActions/Travel";
import FlightMovementFilterComponent from "PagesComponents/KTravel/Search/FlightSearchWidgetComponent/FlightMovementFilterComponent/FlightMovementFilterComponent";
import FlightAirlinesFilterComponent from "PagesComponents/KTravel/Search/FlightSearchWidgetComponent/FlightAirlinesFilterComponent/FlightAirlinesFilterComponent";
import { composeClasses } from "libs/utils/utils";

interface IProps {
  matrix: Array<IAirlineMetric>;
  length: number;

  OriginalSearchedResult: ISearchResponse | undefined;
  FilterFlightAction: Function;
}

const travelSearchFilter: React.FunctionComponent<IProps> = (props: IProps) => {
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [matrix, setMatrix] = useState<Array<IAirlineMetric>>([]);

  const [flightsByStop, setFlightsByStop] = useState<Array<string>>([]);
  const [flightByAirlines, setFlightByAirlines] = useState<Array<string>>([]);
  const [flightsByArrivalTime, setFlightsByArrivalTime] = useState<
    Array<string>
  >([]);
  const [flightsByDepartureTime, setFlightsByDepartureTime] = useState<
    Array<string>
  >([]);
  const [searchRequest, setSearchRequest] = useState<ITravelSearchFilter>({
    flightsByStop: [],
    flightByAirlines: [],
    flightsByArrivalTime: [],
    flightsByDepartureTime: [],
  });

  useEffect(() => {
    let properties: IProps | null = props;
    if (properties) {
      if (properties.length) {
        setResultsCount(properties.length);
      }
      if (properties.matrix) {
        setMatrix(properties.matrix);
      }
    }
    return () => {
      properties = null;
    };
  }, [props]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      searchRequest.flightsByStop = flightsByStop;
      runSearch(searchRequest);
    }

    return () => {
      mounted = false;
    };
  }, [flightsByStop]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      searchRequest.flightsByDepartureTime = flightsByDepartureTime;
      runSearch(searchRequest);
    }

    return () => {
      mounted = false;
    };
  }, [flightsByDepartureTime]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      searchRequest.flightsByArrivalTime = flightsByArrivalTime;
      runSearch(searchRequest);
    }
    return () => {
      mounted = false;
    };
  }, [flightsByArrivalTime]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      searchRequest.flightByAirlines = flightByAirlines;
      runSearch(searchRequest);
    }

    return () => {
      mounted = false;
    };
  }, [flightByAirlines]);

  const runSearch = async (searchFilter: ITravelSearchFilter) => {
    if (props.OriginalSearchedResult) {
      const response: ISearchResponse | null = await props.FilterFlightAction(
        props.OriginalSearchedResult,
        searchFilter
      );
    }
  };

  const filterFlightByStops = (event: Array<string>) => {
    setFlightsByStop(event);
    searchRequest.flightsByStop = flightsByStop;
  };

  const filterFlightsByDepartureTime = (event: Array<string>) => {
    setFlightsByDepartureTime(event);
    searchRequest.flightsByDepartureTime = flightsByDepartureTime;
  };

  const filterFlightsByArrivalTime = (event: Array<string>) => {
    setFlightsByArrivalTime(event);
    searchRequest.flightsByArrivalTime = flightsByArrivalTime;
  };

  const filterFlightByAirlines = (event: Array<string>) => {
    setFlightByAirlines(event);
    searchRequest.flightByAirlines = flightByAirlines;
  };

  return (
    <div>
      <p className={composeClasses(styles.resultsCount, "p-2")}>
        {resultsCount} Results Found
      </p>
      <div className={styles.travelFilter}>
        <div className={styles.travelFilter_flightStops}>
          <FilterWrapper heading="Flight Stops" type="travel">
            <FlightStopsFilterComponent onChange={filterFlightByStops} />
          </FilterWrapper>
        </div>
        <div className={styles.depatureTime}>
          <FilterWrapper heading="Depature Time" type="travel">
            <FlightMovementFilterComponent
              onChange={filterFlightsByDepartureTime}
            />
          </FilterWrapper>
        </div>
        <div className={styles.brandsFilter}>
          <FilterWrapper heading="Arrival Time" type="travel">
            <FlightMovementFilterComponent
              onChange={filterFlightsByArrivalTime}
            />
          </FilterWrapper>
        </div>
        <div className={styles.brandsFilter}>
          <FilterWrapper heading="Airlines" type="travel">
            <FlightAirlinesFilterComponent
              items={matrix}
              onChange={filterFlightByAirlines}
            />
          </FilterWrapper>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  OriginalSearchedResult: state.travel.OriginalSearchedResult,
});

export default connect(mapStateToProps, { FilterFlightAction })(
  travelSearchFilter
);
