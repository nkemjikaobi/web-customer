import React from "react";
import Icon from "Components/Icons/icon";
import styles from "./foodHomeListingCard.module.scss";
import IMerchantRating from "dto/KongaFood/IMerchantRating";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  banner: string;
  average_delivery_time?: string;
  ratings: IMerchantRating;
  url_key?: string;
}
const FoodListingCard: React.FunctionComponent<Props> = ({
  name,
  banner,
  average_delivery_time,
  ratings,
  url_key,
}) => {
  return (
    <Link to={"/food/restaurant/" + url_key}>
      <div className={styles.listingCard}>
        <div className={styles.listingCard_top}>
          <img src={banner} />
        </div>
        <div className={styles.listingCard_bottom}>
          <h1>{name}</h1>
          <p>
            {ratings.total_ratings +
              "(" +
              ratings.delivery_percentage +
              ")" +
              ""}
          </p>
          <div className={styles.labels}>
            <div className={styles.label}>
              <p>{average_delivery_time + " Min"}</p>
            </div>
            <div className={styles.label}>
              <Icon name="star" />
              <span>{ratings.total_ratings}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

FoodListingCard.defaultProps = {
  average_delivery_time: "",
  url_key: "",
};
export default FoodListingCard;
