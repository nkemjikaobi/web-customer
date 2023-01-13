import React from "react";
import StarListing from "./StarListing";
import styles from "./listingCard4.module.scss";
import IQuality from "dto/KongaOnline/IQuality";

interface IRatingsComponent {
  starsCount: IQuality | undefined;
  reviewsCount: number;
}

const RatingsComponent: React.FunctionComponent<IRatingsComponent> = (
  props: IRatingsComponent
) => {
  return (
    <>
      {props.reviewsCount > 0 && props.starsCount !== undefined ? (
        <div className={`${styles.reviews} text-start`}>
          <StarListing count={props.starsCount} reviews={props.reviewsCount} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RatingsComponent;
