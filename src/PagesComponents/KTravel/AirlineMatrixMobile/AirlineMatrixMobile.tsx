import Icon from "Components/Icons";
import { IFlightDetailsJourney } from "dto/KongaTravel/ISearchResponse";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./AirlineMatrixMobile.module.scss";

interface IProps {
  matrix: IFlightDetailsJourney | undefined;
  travel: any;
}

const AirlineMatrixMobile: React.FunctionComponent<IProps> = (
  properties: IProps
) => {
  const [startLocation, setStartLocation] = useState<string>("");
  const [stopLocation, setStopLocation] = useState<string>("");
  const [flightDate, setFlightDate] = useState<string>("");
  const [travellersCount, setTravellersCount] = useState<{
    adults: number;
    children: number;
    infant: number;
    total: number;
  }>({ adults: 0, children: 0, infant: 0, total: 0 });

  useEffect(() => {
    let mounted = true;
    const search: ISearchForm = properties.travel;

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
  }, [properties.travel]);

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.matrix) {
      const origin_ = properties.matrix.origin;
      const destination_ = properties.matrix.destination;
      if (origin_) {
        setStartLocation(origin_.city);
        setFlightDate(origin_.date);
      }
      if (destination_) {
        setStopLocation(destination_.city);
      }
    }

    return () => {
      mounted = false;
    };
  }, [properties.matrix]);

  const childrenCount =
    travellersCount.children > 0 ? (
      <span>{travellersCount.children}, Child(ren)</span>
    ) : (
      <span />
    );
  const infantCount =
    travellersCount.infant > 0 ? (
      <span>{travellersCount.infant}, Infant(s)</span>
    ) : (
      <span />
    );

  return (
    <Fragment>
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ travel: state.travel.SearchedData });
export default connect(mapStateToProps, {})(AirlineMatrixMobile);
