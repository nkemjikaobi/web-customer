import { composeClasses } from "libs/utils/utils";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./categoriesCarousel.module.scss";

const CategoryInfoLoading: React.FunctionComponent = () => {
  return (
    <div className={`ms-3 mt-3 ${composeClasses(styles.categoryInfo)}`}>
      <div className={styles.img}>
        <Skeleton circle={false} height={80} width={80} />
      </div>
      <div className={"text-sm"}>
        <Skeleton />
      </div>
    </div>
  );
};

export default CategoryInfoLoading;
