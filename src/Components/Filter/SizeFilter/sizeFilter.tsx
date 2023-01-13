import React, { Fragment } from "react";
import styles from "./sizeFilter.module.scss";

const generalSizeData = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const regularSizeData = ["0.2", "4", "6", "8", "10", "12", "13"];
const generalSizes = generalSizeData.map((e, i: number) => {
  return (
    <Fragment key={i}>
      <button>{e}</button>
    </Fragment>
  );
});

const regularSizes = regularSizeData.map((e, i: number) => {
  return (
    <Fragment key={i}>
      <button>{e}</button>
    </Fragment>
  );
});

const sizeFilter: React.FunctionComponent = () => {
  return (
    <div className={styles.sizeFilter}>
      <div className={styles.sizeFilterWrapper}>
        <p>General Sizes</p>
        <div className={styles.sizes}>{generalSizes}</div>
      </div>
      <div className={styles.sizeFilterWrapper}>
        <p>Regular Sizes</p>
        <div className={styles.sizes}>{regularSizes}</div>
      </div>
    </div>
  );
};

export default sizeFilter;
