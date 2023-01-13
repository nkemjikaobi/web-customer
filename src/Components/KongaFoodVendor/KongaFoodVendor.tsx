import Button from "Components/Button/button";
import React from "react";
import styles from "./KongaFoodVendor.module.scss";

const KongaFoodVendor = () => {
  return (
    <div className={styles.wrapper}>
      <h4>Get your restaurant on board</h4>
      <p>
        To reach a larger customer audience and also make more money by
        partnering with us.
      </p>
      <div className={styles.button}>
        <Button title={"Become a Vendor"} />
      </div>
    </div>
  );
};

export default KongaFoodVendor;
