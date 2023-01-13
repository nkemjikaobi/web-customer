import Icon from "Components/Icons";
import { IFlightDetailsJourney } from "dto/KongaTravel/ISearchResponse";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import { ToWords } from "to-words";
import styles from "./FlightDirection.module.scss";

interface IProps {
  details: IFlightDetailsJourney | undefined;
}

const FlightDirection: React.FunctionComponent<IProps> = (props: IProps) => {
  const [summary, setSummary] = useState<IFlightDetailsJourney>();
  const [stops, setStops] = useState("");
  const toWords = new ToWords();

  useEffect(() => {
    let mounted = true;
    if (mounted && props.details) {
      setSummary(props.details);
      setStops(toWords.convert(summary?.no_of_stops ?? 0));
    }
    return () => {
      mounted = false;
    };
  }, [props.details]);

  return (
    <Fragment>
      <div className={styles.flightDirection}>
        <div className={styles.col1}>
          <div className={styles.details}>
            <Icon name="planeTakingOff" />
            <div className={styles.carrierDetails}>
              <p>{summary?.operator_name}</p>
              <p>
                {summary?.display_operator_code}
                {"-"}
                {summary?.flight_number}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.tripDuration}>
          <div className={styles.flightLogo}>
            <Icon name="travelTempLogo" />
            <br />
            <span>
              {summary?.operator_code}
              {"-"}
              {summary?.flight_number}
            </span>
          </div>
          <div
            className={composeClasses(styles.timeHolders, "px-3 text-center")}
          >
            <p className={styles.time}>{summary?.origin.time}</p>
            <p className={styles.city}>
              {summary?.origin.city} ({summary?.origin.loc})
            </p>
          </div>
          <div className={styles.rule} />
          <div className={styles.icon}>
            <Icon name="aeroplane" />
          </div>

          <div className={styles.rule} />
          <div className={styles.durationClass}>
            <p className={styles.duration}>{summary?.duration}</p>
            <Icon name="arrowRightWithTail" />
            <p className={styles.cabinClass}>{summary?.cabin_class}</p>
          </div>
          <div
            className={composeClasses(styles.timeHolders, "px-3 text-center")}
          >
            <p className={styles.time}>{summary?.destination.time}</p>
            <p className={styles.city}>
              {summary?.destination.city} ({summary?.destination.loc})
            </p>
          </div>
        </div>
        <div className={composeClasses(styles.col3, styles.col3Web)}>
          <p className={"pb-0 text-center"}>{summary?.duration}</p>
          <div className={styles.button}>
            <button className={styles.oneStopButton}> {stops} Stop(s)</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FlightDirection;
