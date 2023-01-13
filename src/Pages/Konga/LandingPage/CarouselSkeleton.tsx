import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./landingPage.module.scss";
const CarouselSkeleton: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_1}>
        <Skeleton height={370} width={1500} />
        <div className={styles.sideBannerWrappers}>
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
