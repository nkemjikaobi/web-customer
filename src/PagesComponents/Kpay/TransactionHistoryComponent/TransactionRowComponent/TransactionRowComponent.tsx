import accounting from "accounting";
import ITransaction from "dto/Kongapay/ITransaction";
import { CURRENCIES } from "Helpers/Constants";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import TransactionHistoryDetails from "../TransactionHistoryDetails/TransactionHistoryDetails";
import styles from "./TransactionRowComponent.module.scss";

export interface ITransactionRowComponent {
  alertType: string;
  alertMessage: string;
  title: string;
  description: string;
  amount: number;
  transactionDate?: Date;
  transactionStatus?: string;
  transactionId?: string;
  beneficiary_account?: string;
  transaction?: ITransaction;
}

const TransactionRowComponent: React.FunctionComponent<
  ITransactionRowComponent
> = (properties: ITransactionRowComponent) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Fragment>
      <div className={styles.transactionDetails}>
        <div className={styles.transactionDetailsInner}>
          <div className={styles.transactionType}>
            <span>{properties.alertMessage}</span>
          </div>
          <div className={styles.transactionTitle}>
            {showDetails && (
              <TransactionHistoryDetails
                amount={properties.amount}
                beneficiary_account={properties.beneficiary_account ?? ""}
                description={properties.description ?? ""}
                onCloseModal={() => setShowDetails(false)}
                transactionDate={properties.transactionDate ?? undefined}
                transactionId={properties.transactionId ?? ""}
                transactionStatus={properties.transactionStatus ?? ""}
                transactionType={properties.alertType}
              />
            )}

            <label onClick={() => setShowDetails(true)}>
              {properties.title}
            </label>
            {properties.description !== null ? (
              <p>{properties.description}</p>
            ) : (
              " "
            )}
          </div>
          <div className={styles.transactionAmount}>
            {properties.amount > 0 ? (
              <span className={styles.creditAmount}>
                {accounting.formatMoney(properties.amount, CURRENCIES.NAIRA)}
              </span>
            ) : (
              <span className={styles.debitAmount}>
                {accounting.formatMoney(properties.amount, CURRENCIES.NAIRA)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TransactionRowComponent.defaultProps = {
  transactionDate: new Date(),
  transactionStatus: "",
  transactionId: "",
  beneficiary_account: "",
  transaction: undefined,
};
export default connect(null, null)(TransactionRowComponent);
