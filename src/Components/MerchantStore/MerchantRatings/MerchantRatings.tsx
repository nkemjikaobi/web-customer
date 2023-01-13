import React from "react";
import styles from "./merchantRatings.module.scss";
import Icon from "Components/Icons/icon";
import ProgressBar from "@ramonak/react-progress-bar";
import IMerchantStore from "dto/KongaOnline/IMerchantStore";
import StarRatings from "react-star-ratings";

interface IMerchantRatings {
  merchantDetails: IMerchantStore | null;
}

const MerchantRatings = (props: IMerchantRatings) => {
  const qualityPercentage = props?.merchantDetails?.rating?.quality.percentage;
  const merchantName = props?.merchantDetails?.name;

  const deliveryPercentage =
    props?.merchantDetails?.rating?.delivery_percentage;

  const communicationPercentage =
    props?.merchantDetails?.rating?.communication.percentage;

  const averageRatings = props?.merchantDetails?.rating?.quality.average;
  return (
    <div className={styles.merchantRatingsWrapper}>
      <div className={styles.starsReviewWrapper}>
        <div className={styles.stars}>
          <span className={styles.iconWrapper}>
            <span>{merchantName}</span>
            <StarRatings
              name="rating"
              numberOfStars={5}
              rating={averageRatings !== undefined ? averageRatings : 0}
              starDimension={"20px"}
              starEmptyColor="#DBDBDB"
              starRatedColor="#FFBC56"
            />
          </span>
        </div>
        <p>
          {props?.merchantDetails?.rating?.quality.average} from{" "}
          {props?.merchantDetails?.rating?.quality.number_of_ratings} reviews
        </p>
      </div>
      <div className={styles.merchantAssessmentWrapper}>
        <div className={styles.productQuality}>
          <p>product quality:</p>
          <div>
            <ProgressBar
              bgColor={"#5DB150"}
              borderRadius={"0"}
              className={styles.progressBar}
              completed={
                qualityPercentage !== undefined ? qualityPercentage : 0
              }
              height={"30"}
              width={"180"}
            />
          </div>
        </div>
        <div className={styles.deliveryRate}>
          <p>delivery rate</p>
          <div>
            <ProgressBar
              bgColor={"#5DB150"}
              borderRadius={"0"}
              className={styles.progressBar}
              completed={
                deliveryPercentage !== undefined ? deliveryPercentage : 0
              }
              height={"30"}
              width={"180"}
            />
          </div>
        </div>
        <div className={styles.communication}>
          <p>communication</p>
          <div>
            <ProgressBar
              bgColor={"#5DB150"}
              borderRadius={"0"}
              className={styles.progressBar}
              completed={
                communicationPercentage !== undefined
                  ? communicationPercentage
                  : 0
              }
              height={"30"}
              width={"180"}
            />
          </div>
        </div>
      </div>
      <div className={styles.badgeWrapper}>
        <div className={styles.salesWrapper}>
          <div className={styles.icons}>
            <Icon name="sales" />
          </div>
          <div className={styles.figures}>
            <span>{props?.merchantDetails?.rating?.delivered_orders}</span>
            <p>Successful Sales</p>
          </div>
        </div>
        <div className={styles.durationWrapper}>
          <div className={styles.icons}>
            <Icon name="hourGlass" />
          </div>
          <div className={styles.figures}>
            <span>{props?.merchantDetails?.rating?.seller_since}</span>
            <p>Selling on Konga</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRatings;
