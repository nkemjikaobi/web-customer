import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./kongaServices.module.scss";

const KongaServiceSkeleton: React.FunctionComponent = () => {
  return (
    <div className={styles.itemWrapper}>
      <Skeleton />
    </div>
  );
};

export default KongaServiceSkeleton;
