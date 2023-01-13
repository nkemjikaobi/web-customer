import React from "react";
import styles from "./priceRangeSlider.module.scss";
const PriceRangeSlider: React.FunctionComponent = () => {
  return (
    <div className={styles.priceRangeSlider}>
      <p className={styles.rangeValue}>
        <input id="amount" readOnly type="text" />
      </p>
      <div className={styles.rangeBar} id="slider-range" />
    </div>
  );
};
export default PriceRangeSlider;
