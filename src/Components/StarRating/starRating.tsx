import React, { Fragment } from "react";
import styles from "./starRating.module.scss";
import Icon from "Components/Icons/icon";
import constants from "Components/constants";
import { composeClasses } from "libs/utils/utils";

const { starRatingVariants: variants, productCardVariants } = constants;

export interface IStarRating {
  customClass?: any;
  numStars?: any;
  productRating?: any;
  show?: any;
  showTotalRatings?: any;
  variant?: any;
  productCardVariant?: any;
  successCount?: number;
}

const StarRating: React.FunctionComponent<IStarRating> = ({
  customClass,
  numStars,
  productRating,
  show,
  showTotalRatings,
  variant,
  productCardVariant,
}) => {
  const totalRatings = productRating && productRating.total_ratings;
  const isProductReview = variant === variants.productReviewRating;
  let rating = isProductReview
    ? productRating && productRating.quality_rating
    : productRating && productRating.quality && productRating.quality.average;
  const reviewText = `${totalRatings} ${
    totalRatings > 1 ? "Reviews" : "Review"
  }`;

  if (!rating && productRating && productRating.average_rating)
    rating = productRating.average_rating;

  // if (!(isProductReview || show) && totalRatings < 1) return null;
  return (
    <div
      className={composeClasses(
        styles.starRating,
        // isMerchantRating ? styles.merchantRating : " ",
        customClass
      )}
    >
      {numStars > 0 ? (
        [...Array(Math.ceil(numStars))].map((numStar, i) => (
          <Icon
            className={
              typeof rating === "number" && i < Math.round(rating)
                ? styles.starRatingYellow
                : ""
            }
            key={i}
            name="star3"
          />
        ))
      ) : (
        <Icon className={styles.starRatingYellow} name="star3" />
      )}
      {showTotalRatings && (
        <Fragment>
          {totalRatings > 0 ? (
            <span className={styles.reviewText}>
              {productCardVariant === productCardVariants.recommendations
                ? `(${reviewText})`
                : reviewText}
            </span>
          ) : (
            <span className={styles.reviewText}>(No reviews yet)</span>
          )}
        </Fragment>
      )}
    </div>
  );
};

StarRating.defaultProps = {
  customClass: "",
  numStars: 5,
  productRating: null,
  variant: variants.productRating,
  productCardVariant: productCardVariants.listing,
  show: false,
  showTotalRatings: true,
  successCount: 0,
};

export default StarRating;
