/* eslint-disable @typescript-eslint/ban-types */
import {
  IFlightDetails,
  IFlightDetailsJourney,
  IJourney,
  IJourneyPrice,
} from "dto/KongaTravel/ISearchResponse";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToWords } from "to-words";
import styles from "./SearchResultComponent.module.scss";
import Icon from "Components/Icons/icon";
import Button from "Components/Button/button";
import { SelectedFlightAction } from "Http/Redux/Actions/TravelActions/Travel";
import accounting from "accounting";
import { composeClasses } from "libs/utils/utils";
import MobileFlightDetails from "../MobileFlightDetails/MobileFlightDetails";
import FlightSearchDetails from "./FlightSearchDetails/FlightSearchDetails";
import FlightDirection from "./FlightDirection/FlightDirection";

export interface ISearchResultComponent {
  report: IJourney;
  SelectedFlightAction: Function;
}

const SearchResultComponent: React.FunctionComponent<ISearchResultComponent> = (
  properties: ISearchResultComponent
) => {
  const history = useHistory();
  const [summary, setSummary] = useState<Array<IFlightDetailsJourney>>([]);
  const [matrix, setMatrix] = useState<IFlightDetailsJourney>();
  const [flightDetail, setFlightDetail] = useState<IFlightDetails>();
  const [fare, setFare] = useState<IJourneyPrice>();
  const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
  const [toggleFlightDetails, setToggleFlightDetails] =
    useState<boolean>(false);
  const toWords = new ToWords();

  useEffect(() => {
    let summary = null;
    let matrix = null;
    if (properties.report.flight_details) {
      matrix = properties.report.flight_details.summary[0];
      setMatrix(matrix);
      summary = properties.report.flight_details.summary;
      setSummary(summary);
      setFare(properties.report.price);
      setFlightDetail(properties.report.flight_details);
    }
    return () => {
      summary = null;
    };
  }, [properties.report]);

  const handleBookNowBtnClicked = (event: any) => {
    if (properties.SelectedFlightAction && properties.report) {
      properties.SelectedFlightAction(properties.report);
      history.push("/travel/traveler-info");
    }
  };

  const handleCloseFlightDetails = () => {
    setShowFlightDetails(false);
  };

  const handleToggleFlightDetails = () => {
    setToggleFlightDetails(!toggleFlightDetails);
  };

  return (
    <Fragment>
      <div className={styles.resultWrapper}>
        <div className={styles.searchResult}>
          <div className={styles.direction}>
            {summary?.map((sum, key: number) => {
              return <FlightDirection details={sum} key={key} />;
            })}
          </div>

          <div className={styles.col4}>
            <p className={styles.fare}>{`${
              fare?.api_currency
            } ${accounting.formatNumber(
              parseInt(fare?.api_total_display_fare.toString() || "")
            )}`}</p>
            <Button
              className={composeClasses(
                "btn-primary text-white",
                styles.bookNowButton
              )}
              handleClick={handleBookNowBtnClicked}
              title={"Book Now"}
              type="submit"
              value="Book Now"
            />
            <Button
              className={composeClasses(
                "btn-primary text-white",
                styles.viewFlight
              )}
              handleClick={() => setShowFlightDetails(true)}
              title={"View Flight"}
              type="submit"
              value="View Flight"
            />
          </div>
        </div>
        <div className={composeClasses(styles.optionsStrip)}>
          <span onClick={handleToggleFlightDetails}>
            Show Flight Details
            <Icon
              name={
                toggleFlightDetails !== true
                  ? "doubleArrowRight"
                  : "doubleArrowDown"
              }
            />
          </span>
          <span>Fare Rules</span>
          <span>Baggage Info</span>
        </div>
        {toggleFlightDetails && (
          <FlightSearchDetails data={properties.report} />
        )}
      </div>
      {showFlightDetails && (
        <div className={styles.flightDetails}>
          <MobileFlightDetails
            matrix={matrix}
            onBookFlight={handleBookNowBtnClicked}
            onClose={() => handleCloseFlightDetails()}
            priceBreakdown={properties.report.price}
          />
        </div>
      )}
    </Fragment>
  );
};

export default connect(null, { SelectedFlightAction })(SearchResultComponent);
