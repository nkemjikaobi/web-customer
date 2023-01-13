import Icon from "Components/Icons";
import IQuality from "dto/KongaOnline/IQuality";
import { range } from "lodash";
import React, { Fragment } from "react";
import styles from "./starListing.module.scss";
interface IStarListing {
  count: IQuality | null;
  reviews: number;
}

const StarListing: React.FunctionComponent<IStarListing> = (
  props: IStarListing
) => {
  return (
    <>
      {props.count !== null ? (
        <>
          {range(props.count.average).map((index: number) => (
            <Icon key={index} name="star" />
          ))}
          <small className={styles.reviews}>{`${props.reviews} review`}</small>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default StarListing;
