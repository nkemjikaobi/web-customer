/* eslint-disable @typescript-eslint/ban-types */
import accounting from "accounting";
import Icon from "Components/Icons";
import useClickOutSide from "CustomHooks/useClickOutSide";
import { CURRENCIES } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment } from "react";
import styles from "./TransactionHistoryDetails.module.scss";

interface IProps {
  onCloseModal: Function;
  transactionDate: Date | undefined;
  transactionStatus: string;
  transactionType: string;
  transactionId: string;
  description: string;
  amount: number;
  beneficiary_account: string;
}

const TransactionHistoryDetails: React.FunctionComponent<IProps> = (
  properties: IProps
) => {
  const closeModal = useClickOutSide(() => {
    properties.onCloseModal();
  });

  return (
    <Fragment>
      <div className={styles.transactionHistoryDetails}>
        <div className={styles.details} ref={closeModal}>
          <div className={composeClasses(styles.strip, styles.header)}>
            <span>Transaction Details</span>
            <div
              className={styles.close}
              onClick={() => properties.onCloseModal()}
            >
              <Icon name="closeBordered" />
            </div>
          </div>

          <div className={composeClasses(styles.strip, styles.split)}>
            <div>
              <span>Amount</span>
              <p>
                {accounting.formatMoney(properties.amount, CURRENCIES.NAIRA)}
              </p>
            </div>

            <div className={styles.right}>
              <span>Transaction Type</span>
              <p>{properties.transactionType}</p>
            </div>
          </div>

          <div className={styles.strip}>
            <div>
              <span>Transaction ID</span>
              <p>{properties.transactionId}</p>
            </div>
          </div>

          <div className={styles.strip}>
            <div>
              <span>Description</span>
              <p>
                {properties.description} {" | "}
                {properties.beneficiary_account}
              </p>
            </div>
          </div>

          <div className={composeClasses(styles.strip, styles.split)}>
            <div>
              <span>Date</span>
              <p>
                {properties.transactionDate
                  ? properties.transactionDate?.toDateString()
                  : ""}
              </p>
            </div>

            <div className={styles.right}>
              <span>Status</span>
              <p>{properties.transactionStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionHistoryDetails;
