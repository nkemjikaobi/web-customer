import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import ITransaction from "dto/Kongapay/ITransaction";
import React, { Fragment } from "react";
import styles from "./TransactionHistoryComponent.module.scss";
import TransactionRowComponent from "./TransactionRowComponent/TransactionRowComponent";

export interface ITransactionHistoryComponent {
  transaction: ILastDayTransaction;
}

const TransactionHistoryComponent: React.FunctionComponent<
  ITransactionHistoryComponent
> = (properties: ITransactionHistoryComponent) => {
  const { transaction } = properties;
  return (
    <Fragment>
      <div className={styles.transactionHistory}>
        <div className={styles.header}>
          <h6>{transaction.day}</h6>
        </div>
        <div>
          <div>
            <section className={styles.transactionHistory}>
              <ul className={styles.transactionHistoryItems}>
                <li className={styles.transactionHistoryItem}>
                  {" "}
                  {transaction.transactions.map(
                    (history: ITransaction, key: number) => (
                      <TransactionRowComponent
                        alertMessage={history.transaction_type_name}
                        alertType={history.transaction_type_name}
                        amount={history.amount}
                        beneficiary_account={history.destination_phone}
                        description={history.description}
                        key={key}
                        title={history.title}
                        transaction={history}
                        transactionDate={history.t_created_at}
                        transactionId={history.receipt_number}
                        transactionStatus={history.transaction_status}
                      />
                    )
                  )}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionHistoryComponent;
