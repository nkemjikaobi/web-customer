import Icon from "Components/Icons";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./CategoryListingCard.module.scss";

const CategoryListPlaceholder: React.FunctionComponent = () => {
  return (
    <div className={styles.listingCard}>
      <div className={styles.listingCard_top}>
        <div className={styles.img}>
          <div className={"text-center"}>
            <Skeleton className={"ms-2"} height={200} width={200} />
          </div>
          <div className={styles.icon}>
            <div className={styles.iconWrapper}>
              <Icon name="heart" />
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <h1>
            <Skeleton />
          </h1>
        </div>
      </div>
      <div className={styles.listingCard_bottom}>
        <div className={styles.prices}>
          <p className={styles.dicountPrice}>
            <Skeleton />
          </p>
          <p className={styles.originalPrice}>
            <Skeleton />
          </p>
        </div>
        <p className={`my-1 ${styles.merchantInfo}`}>
          <span>
            <Skeleton />
          </span>
        </p>
        <div className={styles.button}>
          <button className={"my-2 w-100 btn btn-outline-danger"} disabled>
            {"Choose Option"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryListPlaceholder;
