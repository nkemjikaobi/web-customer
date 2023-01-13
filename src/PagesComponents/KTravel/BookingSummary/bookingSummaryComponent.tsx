/* eslint-disable @typescript-eslint/ban-types */
import { IDestination } from "dto/KongaTravel/ITrip";
import IDate from "dto/Utils/IDate";
import { formatDate } from "libs/utils/utils";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./BookingSummaryComponent.module.scss";

export interface IBookingSummaryComponent {
  travel?: any;
  destination?: IDestination;
  onModify: Function;
  modify?: boolean;
}

const BookingSummaryComponent: React.FunctionComponent<
  IBookingSummaryComponent
> = ({ travel, destination, onModify, modify }: IBookingSummaryComponent) => {
  const [fromAirportCode, setFromAirportCode] = useState<string>("");
  const [toAirportCode, setToAirportCode] = useState<string>("");
  const [fromAirportName, setFromAirportName] = useState<string>("");
  const [toAirportName, setToAirportName] = useState<string>("");

  const [travellersCount, setTravellersCount] = useState<{
    adults: number;
    children: number;
    total: number;
  }>({ adults: 0, children: 0, total: 0 });

  const [tripType, setTripType] = useState<string>("oneway");
  const [startDate, setStartDate] = useState<IDate>(formatDate(new Date()));
  const [endDate, setEndDate] = useState<IDate>({
    date: 0,
    day: "",
    month: "",
    year: new Date().getFullYear(),
  });
  const [showFinished, setShowFinished] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (mounted && destination) {
      const toDate = new Date(destination.toDate);
      const fromDate = new Date(destination.fromDate);
      setEndDate(formatDate(toDate));
      setStartDate(formatDate(fromDate));
      setFromAirportCode(destination.fromAirport?.airport_code ?? "");
      setFromAirportName(destination.fromAirport?.airport_name ?? "");
      setToAirportCode(destination.toAirport?.airport_code ?? "");
      setToAirportName(destination.toAirport?.airport_name ?? "");

      return () => {
        mounted = false;
      };
    }
  }, [destination]);

  useEffect(() => {
    let mounted = true;
    const search: ISearchForm = travel.SearchedData;

    if (mounted && search) {
      setTripType(search.JourneyType);
      setTravellersCount({
        adults: search.AdultCount,
        children: search.ChildCount,
        total: search.AdultCount + search.ChildCount,
      });
    }
    return () => {
      mounted = false;
    };
  }, [travel.SearchedData]);

  const handleModify = () => {
    setShowFinished(!showFinished);
    onModify();
  };

  return (
    <Fragment>
      <div className={"row mt-4 mb-5 " + styles.summaryWrapper}>
        <div className={"col border p-4"}>
          <div className={"row"}>
            <div className={"col-2"}>
              <h1 className={"h2 mt-3"}>{fromAirportCode}</h1>
            </div>
            <div className={"col"}>
              <p className={"text-muted"}>Departure</p>
              <p>{fromAirportName}</p>
            </div>
            <div className={"col-2"}>
              <h1 className={"h2 mt-3"}>{toAirportCode}</h1>
            </div>
            <div className={"col"}>
              <span className={"text-muted"}>Destination</span>
              <p>{toAirportName}</p>
            </div>
          </div>
        </div>
        <div className={"col-md-4 border p-4"}>
          <div className={"row"}>
            <Fragment>
              <div
                className={`col-2 ${
                  tripType === "oneway" ? "offset-md-3" : ""
                }`}
              >
                <h1 className={"h2 mt-3"}>{startDate.date}</h1>
              </div>
              <div className={"col-3 mt-2"}>
                <p>
                  {startDate.month}, {startDate.year}
                </p>
                <p className={"text-muted"}>{startDate.day}</p>
              </div>
            </Fragment>
            {tripType !== "oneway" ? (
              <Fragment>
                <div className={"col"}>
                  <img
                    className={"mt-4 pt-2"}
                    src={"/images/ktravel/double-arrow.svg"}
                  />
                </div>
                <div className={"col-2"}>
                  <h1 className={"h2 mt-3"}>{endDate.date}</h1>
                </div>
                <div className={"col-3 mt-2"}>
                  <p>
                    {endDate.month}, {endDate.year}
                  </p>
                  <p className={"text-muted"}>{endDate.day}</p>
                </div>
              </Fragment>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
        <div className={"col-md-2 border p-4"}>
          <div className={"row"}>
            <div className={"col-md-3"}>
              <h1 className={"h2 mt-3"}>{travellersCount.total}</h1>
            </div>
            <div className={"col mt-2"}>
              <p>Travellers</p>
              <small className={"text-muted"}>
                {`${travellersCount.adults}`} Adult,{" "}
                {`${travellersCount.children}`} Child(ren)
              </small>
            </div>
          </div>
        </div>
        <div
          className={"col-md-1 border text-center pt-3 " + styles.buttonOptions}
        >
          <button
            className={"btn btn-lg btn-primary text-white mt-3"}
            onClick={handleModify}
          >
            {modify ? "Finished" : "Modify"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ travel: state.travel });

BookingSummaryComponent.defaultProps = {
  travel: undefined,
  destination: undefined,
  modify: false,
};

export default connect(mapStateToProps, {})(BookingSummaryComponent);
