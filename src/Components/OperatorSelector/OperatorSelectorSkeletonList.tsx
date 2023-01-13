import { composeClasses } from "libs/utils/utils";
import { range } from "lodash";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./operatorSelector.module.scss";

const OperatorSelectorSkeletonList: React.FunctionComponent = () => (
  <div className={"row w-100"}>
    {range(4).map((index: number) => (
      <div className={composeClasses(` ${styles.skeleton}`)} key={index}>
        <Skeleton className={"p-4"} />
      </div>
    ))}
  </div>
);

export default OperatorSelectorSkeletonList;
