import React from "react";
import styles from "./OrderHistorySkeleton.module.scss";
import Skeleton from "react-loading-skeleton";

const OrderHistorySkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerList}>
        <span className={styles.date}>
          <Skeleton />
        </span>
        <div className={styles.detailsButton}>
          <Skeleton />
        </div>
      </div>
      <div className={styles.ordersCard}>
        <div className={styles.left}>
          <div className={styles.details}>
            <div>
              <span>
                <Skeleton width={200} />{" "}
              </span>
              <span>
                <Skeleton />
              </span>
            </div>
            <div>
              <span>
                <Skeleton width={100} />
              </span>
              <span>
                <Skeleton />
              </span>
            </div>
            <div>
              <span>
                <Skeleton width={300} />
              </span>
              <span>
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.address}>
            <p>
              <Skeleton width={200} />
            </p>
            <p>
              <Skeleton width={300} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderHistorySkeleton;
