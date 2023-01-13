import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import styles from "./bankAccount.module.scss";

interface Props {
  img?: string;
  accountNumber: string;
  accountName: string;
}

const BankAccount: React.FunctionComponent<Props> = ({
  img,
  accountNumber,
  accountName,
}) => {
  return (
    <Fragment>
      <div className={styles.bankAccount}>
        <div className={styles.bankAccount_left}>
          <div className={styles.img}>
            <img src={img} />
          </div>
          <div className={styles.accountDetails}>
            <p>{accountNumber}</p>
            <p>{accountName}</p>
          </div>
        </div>
        <div className={styles.bankAccount_right}>
          <Icon name="arrowRight" />
        </div>
      </div>
    </Fragment>
  );
};

BankAccount.defaultProps = { img: "" };
export default BankAccount;
