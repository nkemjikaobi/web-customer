import React from "react";
import styles from "./customerRatingCard.module.scss";
import StarRatings from "react-star-ratings";
import { composeClasses, parseTimestamp } from "libs/utils/utils";

interface ICustomerRatingCard {
  reviews: any;
}
const CustomerRatngCard = (props: ICustomerRatingCard): any => {
  return (
    <>
      <div className={composeClasses(styles.customerRatingCard, "row")}>
        <div className={composeClasses(styles.profileImage, "col-2")}>
          {props.reviews?.customer_name.charAt(0).toUpperCase()}
        </div>
        <div className={composeClasses(styles.details, "col-2")}>
          <h1>{props.reviews?.customer_name}</h1>
          <br />
          <small className={styles.date}>
            {parseTimestamp(props.reviews?.created_at)}
          </small>
        </div>
        <div className={composeClasses(styles.ratings, "col me-2")}>
          <div className={styles.ratingIcons}>
            <StarRatings
              name="rating"
              numberOfStars={5}
              rating={
                props.reviews?.quality_rating ? props.reviews.quality_rating : 0
              }
              starDimension={"15px"}
              starEmptyColor="#DBDBDB"
              starRatedColor="#F9DB79"
              starSpacing="2px"
            />
          </div>
          <p>{props.reviews?.comment}</p>
        </div>
      </div>
    </>
  );
};
export default CustomerRatngCard;
