import React, { Fragment, useEffect, useState } from "react";
import styles from "./flightDetailsCard.module.scss";
import Icon from "Components/Icons";
import {
  IFlightDetailsJourney,
  IJourney,
} from "dto/KongaTravel/ISearchResponse";
import { connect } from "react-redux";
import AirlineMatrixMobile from "PagesComponents/KTravel/AirlineMatrixMobile/AirlineMatrixMobile";
import { useHistory } from "react-router-dom";

interface IFlightDetailsCard {
  selectedFlight?: IJourney;
}

const flightDetailsCard: React.FunctionComponent<IFlightDetailsCard> = (
  properties: IFlightDetailsCard
) => {
  const [flight, setFlight] = useState<IJourney>();
  const [destination, setDestination] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [originLocation, setOriginLocation] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [summaryTab, setSummaryTab] = useState<IFlightDetailsJourney>();
  const [flightDetails, setFlightDetails] = useState<
    Array<IFlightDetailsJourney>
  >([]);

  const history = useHistory();

  useEffect(() => {
    let selectedFlight = properties.selectedFlight;
    if (selectedFlight) {
      const summary = selectedFlight.flight_details.summary[0];

      setFlight(selectedFlight);
      setOrigin(summary.origin.city);
      setOriginLocation(summary.origin.loc);
      setDestination(summary.destination.city);
      setDestinationLocation(summary.destination.loc);
      setBookingDate(summary.origin.date);
      setFlightDetails(selectedFlight.flight_details.details[0]);
      setSummaryTab(summary);
    }

    return () => {
      selectedFlight = undefined;
    };
  }, [properties]);

  return (
    <Fragment>
      <div className={styles.flightDetailsCard}>
        <div className={styles.heading}>
          <div className={styles.left}>
            <div className={styles.flightDirection}>
              <p>
                {origin} ({originLocation})
              </p>
              <div className={styles.airplaneIcon}>
                <Icon name="airplane" />
              </div>
              <p>
                {destination} ({destinationLocation})
              </p>
            </div>
            <p className={styles.date}>
              {bookingDate} |{" "}
              {flight?.passenger_breakup.ADT
                ? flight?.passenger_breakup.ADT.pass_no
                : "0"}{" "}
              Adult
            </p>
          </div>
          <div
            className={styles.right}
            onClick={() => history.push("/travel/booking-result")}
          >
            <div className={styles.changeFlightIcon}>
              <Icon name="change" />
            </div>
            <p>Change Flight</p>
          </div>
        </div>
        <div className={styles.flightDetails}>
          <p className={styles.flightDetails_heading}>Flight Details</p>
          <div className={styles.flightDetails_info}>
            <div className={"w-100"}>
              <div className={`${styles.row1} row`}>
                <p className={"col-md-3"}>{summaryTab?.operator_name}</p>
                <p className={"col-md-2"}>{summaryTab?.journey_number} | </p>
                <p className={"col-md-4"}>{summaryTab?.cabin_class}</p>
                <p className={"col-md-3"}>Duration</p>
              </div>
              {flightDetails.map(
                (flightDetail: IFlightDetailsJourney, key: number) => (
                  <Fragment key={key}>
                    <div className={`${styles.row2} row`}>
                      <p className={"col-md-3"}>
                        {flightDetail.destination?.date}
                      </p>
                      <p className={"col-md-2"}>
                        {flightDetail.destination?.time}
                      </p>
                      <p className={"col-md-4"}>
                        {flightDetail.destination?.airport?.airport_name}
                      </p>
                      <p className={"col-md-3"}> {flightDetail.duration} </p>
                    </div>
                  </Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.airlineMatrixMobile}>
        <AirlineMatrixMobile matrix={summaryTab} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  selectedFlight: state.travel.SelectedFlight,
});

export default connect(mapStateToProps, null)(flightDetailsCard);
