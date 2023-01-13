/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./TravelCard.module.scss";
import { CURRENCIES } from "Helpers/Constants";
import { SearchFlightsAction } from "Http/Redux/Actions/TravelActions/Travel";
import { connect } from "react-redux";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import { useHistory } from "react-router-dom";
import IProductList from "dto/KongaTravel/IProductList";
import accounting from "accounting";

const formatLocation = (location: string) => {
  return location.split(",")[0];
};
const getLocationCode = (location: string) => {
  return location.split("(").splice(-1)[0].replace(/[()]/g, "");
};
interface ITravelList extends IProductList {
  // eslint-disable-next-line @typescript-eslint/ban-types
  SearchFlightsAction: Function;
}

const TravelCard: React.FunctionComponent<ITravelList> = (
  props: ITravelList
) => {
  const history = useHistory();
  const {
    origin,
    destination,
    price,
    direction,
    class_type,
    date,
    adult_count,
    infant_count,
    child_count,
    image,
    SearchFlightsAction,
  } = props;
  const search = async (
    origin: string,
    destination: string,
    direction: string,
    class_type: string,
    date: string,
    adult_count: string,
    infant_count: string,
    child_count: string
  ) => {
    const paylaod: ISearchForm = {
      AdultCount: parseInt(adult_count),
      CabinClass: class_type,
      ChildCount: parseInt(child_count),
      InfantCount: parseInt(infant_count),
      JourneyType: direction.replace(/[ ]/g, "").toLocaleLowerCase(),
      PreferredAirlines: [],
      Segments: [
        {
          Origin: getLocationCode(origin),
          Destination: getLocationCode(destination),
          OriginAirport: origin,
          DestinationAirport: destination,
          DepartureDate: date,
          ReturnDate: date,
        },
      ],
      tripType: true,
    };
    await SearchFlightsAction(paylaod);
    history.push("/travel/booking-result");
  };
  return (
    <div
      className={styles.TravelCard}
      onClick={() =>
        search(
          origin,
          destination,
          direction,
          class_type,
          date,
          adult_count,
          infant_count,
          child_count
        )
      }
    >
      <div className={styles.listingCardTop}>
        <img src={image} />
      </div>
      <div className={styles.listingCard3Bottom}>
        <div className={styles.listingCard3Bottom_left}>
          <p className={styles.location}>
            {formatLocation(`${origin}`)} - {formatLocation(`${destination}`)}
          </p>
          <p className={styles.direction}>{direction}</p>
        </div>
        <div className={styles.listingCard3Bottom_right}>
          <p className={styles.priceHeading}>From</p>
          <p className={styles.price}>
            {accounting.formatMoney(price, CURRENCIES.NAIRA)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  SearchFlightsAction,
})(TravelCard);
