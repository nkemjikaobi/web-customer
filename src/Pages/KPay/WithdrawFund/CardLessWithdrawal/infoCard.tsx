import React, { Fragment } from "react";
import styles from "./infoCard.module.scss";

interface Props {
  img?: string;
  accountNumber?: string;
  accountName?: string;
}

const InfoCard: React.FunctionComponent<Props> = ({
  img,
  accountNumber,
  accountName,
}) => {
  return (
    <Fragment>
      <div className={styles.infoCard}>
        <div>
          <p className={styles.heading}>Amount</p>
          <p className={styles.heading_text}>N30,00</p>
        </div>
        <div>
          <p className={styles.heading}>Generated Code</p>
          <p className={styles.heading_text}>REF-35674223GH</p>
        </div>
        <div>
          <p className={styles.heading}>Status</p>
          <p className={styles.status}>Active</p>
        </div>
      </div>
    </Fragment>
  );
};

InfoCard.defaultProps = {
  img: "",
  accountName: "",
  accountNumber: "",
};

export default InfoCard;
