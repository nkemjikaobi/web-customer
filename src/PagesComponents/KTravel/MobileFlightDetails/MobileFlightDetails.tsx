/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import {
  IFlightDetailsJourney,
  IFlightDetailsJourneyLocation,
  IJourneyPrice,
} from "dto/KongaTravel/ISearchResponse";
import { composeClasses } from "libs/utils/utils";
import AirlineMatrixMobile from "PagesComponents/KTravel/AirlineMatrixMobile/AirlineMatrixMobile";
import React, { Fragment, useEffect, useState } from "react";
import BaggageAllowance from "./MobileBaggageAllowance/BaggageAllowance";
import FareBreakdown from "./MobileFareBreakdown/FareBreakdown";
import styles from "./MobileFlightDetails.module.scss";

interface IProps {
  matrix: IFlightDetailsJourney | undefined;
  onClose: Function;
  priceBreakdown: IJourneyPrice;
  onBookFlight: Function;
}

const MobileFlightDetails: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [origin, setOrigin] = useState<IFlightDetailsJourneyLocation>();
  const [destination, setDestination] =
    useState<IFlightDetailsJourneyLocation>();
  const [summary, setSummary] = useState<IFlightDetailsJourney>();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (props.matrix) {
        updateTrips();
        setSummary(props.matrix);
      }
    }

    return () => {
      mounted = false;
    };
  }, [props.matrix]);

  const updateTrips = () => {
    if (props.matrix) {
      const origin_ = props.matrix.origin;
      const destination_ = props.matrix.destination;
      if (origin_) {
        setOrigin(origin_);
      }
      if (destination_) {
        setDestination(destination_);
      }
    }
  };

  return (
    <Fragment>
      <div className={styles.flightDetails}>
        <div className={styles.closeSection}>
          <div className={styles.close} onClick={() => props.onClose()}>
            <Icon name="closeBordered" />
          </div>
          <span>Flight Information</span>
        </div>
        <AirlineMatrixMobile matrix={props.matrix} />
        <div className={styles.fullDetails}>
          <div className={styles.airlineInfo}>
            <div className={styles.nameNumber}>
              <Icon name="travelTempLogo" />
              <span>
                {summary?.operator_name} {summary?.operator_code}-
                {summary?.flight_number}
              </span>
            </div>
            <div className={styles.aircraft} />
          </div>
          <div className={styles.durationInfo}>
            <div className={styles.takeOffLanding}>
              <span>{origin?.city}</span>
              <p className={styles.time}>{origin?.time}</p>
            </div>
            <div className={styles.duration}>
              <p>{summary?.duration}</p>
              <Icon name="arrowRightWithTail" />
            </div>
            <div className={styles.takeOffLanding}>
              <span>{destination?.city}</span>
              <p className={styles.time}>{destination?.time}</p>
            </div>
          </div>
          <div className={styles.terminalInfo}>
            <div className={composeClasses(styles.terminal, styles.origin)}>
              <span>{origin?.date}</span>
              <p>{origin?.airport?.airport_name}</p>
            </div>
            <div
              className={composeClasses(styles.terminal, styles.destination)}
            >
              <span>{destination?.date}</span>
              <p>{destination?.airport?.airport_name}</p>
            </div>
          </div>
        </div>
        <BaggageAllowance />
        <FareBreakdown priceBreakdown={props.priceBreakdown} />
        <Button
          className={composeClasses(
            "btn-primary text-white",
            styles.bookNowButton
          )}
          handleClick={props.onBookFlight}
          title={"Book Flight"}
          type="submit"
          value="Book Now"
        />
      </div>
    </Fragment>
  );
};

export default MobileFlightDetails;
