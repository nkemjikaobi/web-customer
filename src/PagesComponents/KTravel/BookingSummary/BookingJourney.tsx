import accounting from "accounting";
import Icon from "Components/Icons";
import { IJourney } from "dto/KongaTravel/ISearchResponse";
import { CURRENCIES } from "Helpers/Constants";
import React, { Fragment, useEffect, useState } from "react";
import numWords from "number-to-words";

export interface IBookingJourney {
  image: string;
  journey: IJourney;
}

const BookingJourney: React.FunctionComponent<IBookingJourney> = ({
  image,
  journey,
}: IBookingJourney) => {
  const [stops, setStops] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [departure, setDeparture] = useState<{
    time: string;
    location: string;
  }>({ time: "", location: "" });
  const [arrival, setArrival] = useState<{ time: string; location: string }>({
    time: "",
    location: "",
  });

  useEffect(() => {
    let mounted = true;

    setPrice(journey.price.api_total_display_fare);

    const summary = journey.flight_details.summary[0];
    const origin = summary.origin;
    const destination = summary.destination;

    setArrival({
      time: destination.time,
      location: destination.city,
    });
    setDeparture({
      time: origin.time,
      location: origin.city,
    });

    setDuration(summary.duration);
    setStops(summary.no_of_stops);

    return () => {
      mounted = false;
    };
  }, [journey]);

  return (
    <Fragment>
      <div className={"row mt-5"}>
        <div className={"col-md-2 text-center py-3"}>
          <img src={image} />
        </div>
        <div className={"col-md-2 text-end py-3"}>
          <p>{departure.time}</p>
          <p>{departure.location}</p>
        </div>
        <div className={"col-md-2 text-center py-3"}>
          <Icon className={"me-2"} name={"dash"} />
          <Icon name={"aeroplane"} />
          <Icon className={"ms-2"} name={"dash"} />
        </div>
        <div className={"col-md-2 text-left py-3"}>
          <p>{arrival.time}</p>
          <p>{arrival.location}</p>
        </div>
        <div className={"col-md-2 text-center py-3"}>
          <p className={"text-muted"}>{duration}</p>
          <span className={"badge rounded-pill bg-warning text-capitalize"}>
            {numWords.toWords(stops)} Stop(s)
          </span>
        </div>
        <div className={"col-md-2 text-center py-3"}>
          <p className={"fw-bolder h4"}>
            {accounting.formatMoney(price, CURRENCIES.NAIRA)}
          </p>
          <button className={"btn btn-primary mt-3 text-white"}>
            Book Now
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BookingJourney;
