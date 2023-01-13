import constants from "Components/constants";
import Icon from "Components/Icons/icon";
import { composeClasses } from "libs/utils/utils";
import React from "react";
import { IStarRating } from "./starRating";
import styles from "./starRating.module.scss";

const { starRatingVariants: variants, productCardVariants } = constants;

const StarFilterRating: React.FunctionComponent<IStarRating> = (
  props: IStarRating
) => {
  return (
    <div className={composeClasses(styles.starRating, props.customClass)}>
      {[...Array(props.successCount)].map((numStar, i) => (
        <Icon className={styles.starRatingYellow} key={i} name="star" />
      ))}
      {[...Array(props.numStars)].map((numStar, i) => (
        <Icon className={styles.starRatingYellow} key={i} name="star3" />
      ))}
      <span className={"ps-2"}>{"& up"}</span>
    </div>
  );
};

StarFilterRating.defaultProps = {
  customClass: "",
  numStars: 5,
  productRating: null,
  variant: variants.productRating,
  productCardVariant: productCardVariants.listing,
  show: false,
  showTotalRatings: true,
  successCount: 0,
};

export default StarFilterRating;
