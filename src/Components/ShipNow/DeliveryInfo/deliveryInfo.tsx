import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import styles from "./deliveryInfo.module.scss";
import Button from "Components/Button/button";

const Step2: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles.deliveryInfo}>
        <div className={styles.deliveryInfo_content}>
          <h1>Delivery ID</h1>
          <div className={styles.reciept}>
            <p className={styles.deliveryId}>EED365B1</p>
            <div className={styles.print}>
              <Icon name="print" />
              <p>Print</p>
            </div>
            <div className={styles.save}>
              <Icon name="pdfSave" />
              <p>Save as PDF</p>
            </div>
          </div>
          <div className={styles.instructions}>
            <h2>Follow up instructions:</h2>
            <p>1. Save the delivery ID code</p>
            <p>
              2. Search & Select for a nearby store location Drop your package
              to the location.
            </p>
            <p>3. Provide them with the delivery ID code</p>
            <p>4. Make Payment</p>
          </div>
          <div className={styles.button}>
            <Button
              btnClass={"btn-primary text-white"}
              title="Return to Home"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Step2;
