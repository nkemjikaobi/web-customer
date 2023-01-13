/* eslint-disable @typescript-eslint/ban-types */
import accounting from "accounting";
import Icon from "Components/Icons";
import { IAirlineMetric, IJourney } from "dto/KongaTravel/ISearchResponse";
import { CURRENCIES } from "Helpers/Constants";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToWords } from "to-words";
import styles from "./AirlineMatrixPageComponent.module.scss";

interface IAirlineMatrixPageComponent {
  travel: any;
  matrix: Array<IAirlineMetric>;
  tripSchedules?: Array<IJourney>;
  onShowMobileSearch: Function;
}
const AirlineMatrixPageComponent: React.FunctionComponent<
  IAirlineMatrixPageComponent
> = (properties: IAirlineMatrixPageComponent) => {
  const [airlineMetrics, setAirlineMetrics] = useState<Array<IAirlineMetric>>(
    []
  );
  const [headers, setHeaders] = useState<
    Array<{
      logo: string;
      name: string;
    }>
  >([]);
  const [tripStops, setTripStops] = useState<Array<any>>([]);
  const [airlines, setAirlines] = useState<Array<Array<any>>>([]);
  const [startLocation, setStartLocation] = useState<string>("");
  const [stopLocation, setStopLocation] = useState<string>("");
  const [slice, setSlice] = useState<number>(7);
  const [travellersCount, setTravellersCount] = useState<{
    adults: number;
    children: number;
    infant: number;
    total: number;
  }>({ adults: 0, children: 0, infant: 0, total: 0 });
  const [flightDate, setFlightDate] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (properties.tripSchedules) {
        updateTrips();
      }
    }

    return () => {
      mounted = false;
    };
  }, [properties.tripSchedules]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (properties.matrix) {
        updateMatrix(properties.matrix, 0, 7);
      }
    }

    return () => {
      mounted = false;
    };
  }, [properties.matrix]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      updateMatrix(properties.matrix, slice - 7, slice);
    }

    return () => {
      mounted = false;
    };
  }, [slice]);

  useEffect(() => {
    let mounted = true;
    const search: ISearchForm = properties.travel.SearchedData;

    if (mounted && search) {
      setTravellersCount({
        adults: search.AdultCount,
        children: search.ChildCount,
        infant: search.InfantCount,
        total: search.AdultCount + search.ChildCount,
      });
    }
    return () => {
      mounted = false;
    };
  }, [properties.travel.SearchedData]);

  const updateTrips = () => {
    const toWords = new ToWords();
    if (properties.tripSchedules && properties.tripSchedules?.length > 0) {
      const schedule = properties.tripSchedules[0];
      const summary = schedule.flight_details.summary[0];
      if (summary) {
        setFlightDate(summary.origin.date);
        setStartLocation(summary.origin.city);
        setStopLocation(summary.destination.city);
      }
    }
  };

  const updateMatrix = (
    matrix: Array<IAirlineMetric>,
    start: number,
    end: number
  ) => {
    const toWords = new ToWords();
    if (matrix) {
      const heads = matrix.map((matric: IAirlineMetric) => {
        return {
          logo: "planeTakingOff",
          name: matric.airline_name,
        };
      });
      const stops: any[] = [];
      matrix.forEach((matric: IAirlineMetric) => {
        try {
          stops[matric.stop_count].push(matric);
        } catch (error: any) {
          stops[matric.stop_count] = [matric];
        }
      });

      start = slice - 7;
      end = slice;

      if (end >= matrix.length) {
        end = matrix.length;
        end >= 7 ? (start = end - 7) : (start = 0);
      }
      if (start < 0) {
        start = 0;
        end = 7;
      }
      setSlice(end);
      const slicedHeaders = heads.slice(start, end);
      const slicedMatrix = matrix.slice(start, end);
      setTripStops(stops);
      setHeaders(slicedHeaders);
      setAirlineMetrics(slicedMatrix);
      const rows: Array<Array<any>> = stops.map((stop: any, index: number) => {
        const re: Array<any> = slicedMatrix.map((x: IAirlineMetric) => (
          <td
            className={"border-bottom py-4 " + styles.fare}
            key={x.airline_code}
          >
            {x.stop_count === index
              ? accounting.formatMoney(x.price, CURRENCIES.NAIRA)
              : ""}
          </td>
        ));
        return [
          <tr key={index}>
            <td className={"border-bottom py-4"}>
              {index === 0 ? "Direct Flight" : `${toWords.convert(index)} Stop`}
            </td>
            {re}
          </tr>,
        ];
      });
      setAirlines(rows);
    }
  };

  const childrenCount =
    travellersCount.children > 0 ? (
      <span>, {travellersCount.children} Child(ren)</span>
    ) : (
      <span />
    );
  const infantCount =
    travellersCount.infant > 0 ? (
      <span>, {travellersCount.infant} Infant(s)</span>
    ) : (
      <span />
    );

  return (
    <Fragment>
      <div className={styles.webView}>
        {airlines && airlines.length > 0 ? (
          <Fragment>
            <table
              className={
                "table mt-4 w-100 ms-0 pe-0 border-top-0 border-bottom mb-5 " +
                styles.resultTable
              }
            >
              <caption
                className={"text-end text-primary " + styles.tableCaption}
              >
                <Icon name={"chevron-left"} />
                <a
                  className={styles.designedButton}
                  href="#"
                  onClick={() => setSlice(slice - 7)}
                >
                  Back
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  className={styles.designedButton}
                  href="#"
                  onClick={() => setSlice(slice + 7)}
                >
                  Next
                </a>
                <Icon name={"chevron-right"} />
              </caption>
              <thead className={styles.theadBackground}>
                <tr>
                  <th
                    className={"border-bottom py-4 " + styles.airlineHeader}
                    scope="col"
                  >
                    Airline ({startLocation} {">"} {stopLocation})
                  </th>
                  {headers.map((header: any, key: number) => (
                    <th
                      className={"border-bottom py-4 px-2"}
                      key={key}
                      scope="col"
                    >
                      <Icon name={header.logo} />
                      <div>
                        <span>{header.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.tbodyBackground}>
                {airlines.map((airline: any, index: number) => (
                  <Fragment key={index}>{airline}</Fragment>
                ))}
              </tbody>
            </table>
          </Fragment>
        ) : (
          <Fragment />
        )}
      </div>
      <div className={styles.mobileView}>
        <div className={styles.detailsWrapper}>
          <div className={styles.originDestinationWrapper}>
            <label>{startLocation}</label>
            <Icon name="arrowRightWithTail" />
            <label>{stopLocation}</label>
          </div>
          <div className={styles.littleDetail}>
            <p>
              {flightDate}
              {`${travellersCount.adults}`} Adult {childrenCount} {infantCount}
            </p>
          </div>
        </div>
        <div
          className={styles.modifySearch}
          onClick={() => properties.onShowMobileSearch()}
        >
          <Icon name="write" />
        </div>
      </div>
    </Fragment>
  );
};

AirlineMatrixPageComponent.defaultProps = {
  tripSchedules: [],
};

const mapStateToProps = (state: any) => ({ travel: state.travel });
export default connect(mapStateToProps, {})(AirlineMatrixPageComponent);
