import Icon from "Components/Icons/icon";
import React, { Fragment } from "react";
import { instructions } from "./data";
import styles from "./Step4.module.scss";

interface IProps {
  wayBillNumber: string;
}

const Step4: React.FunctionComponent<IProps> = (properties: IProps) => {
  return (
    <Fragment>
      <div className={styles.lastStep}>
        <div className={styles.header}>
          <p>Delivery ID</p>
        </div>
        <div className={styles.options}>
          <div className={styles.deliveryId}>
            <span>
              {properties.wayBillNumber === ""
                ? "Nil"
                : properties.wayBillNumber}
            </span>
          </div>
          <div className={styles.print}>
            <Icon name="print" />
            <span>Print</span>
          </div>
          <div className={styles.save}>
            <Icon name="sheet" />
            <span>Save as PDF</span>
          </div>
        </div>
        <div className={styles.instructions}>
          <p>Follow up instructions:</p>
          {instructions.map((instruction: any, index: number) => {
            return <p key={index}>{instruction.text}</p>;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Step4;
