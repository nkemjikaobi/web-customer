import { IJourney } from "dto/KongaTravel/ISearchResponse";
import React, { Fragment } from "react";
import BookingJourney from "./BookingJourney";

export interface IBookingJournies {
  journies: Array<IJourney>;
}

const BookingJournies: React.FunctionComponent<IBookingJournies> = ({
  journies,
}: IBookingJournies) => {
  return (
    <Fragment>
      <div className={"row mt-5"}>
        <div className={"col-md-2 text-center py-3 border-end"}>Airline</div>
        <div className={"col-md-3 text-center py-3 border-end"}>Depart</div>
        <div className={"col-md-3 text-center py-3 border-end"}>Arrive</div>
        <div className={"col-md-2 text-center py-3 border-end"}>Duration</div>
        <div className={"col-md-2 text-center py-3"}>Price</div>
      </div>
      {journies.map((journey: IJourney, index: number) => (
        <BookingJourney
          image={"/images/ktravel/ArikAirLogo.svg"}
          journey={journey}
          key={index}
        />
      ))}
    </Fragment>
  );
};

export default BookingJournies;
