import accounting from "accounting";
import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import ITransaction from "dto/Kongapay/ITransaction";
import { CURRENCIES } from "Helpers/Constants";
import React, { useState } from "react";
import TransactionHistoryDetails from "../TransactionHistoryComponent/TransactionHistoryDetails/TransactionHistoryDetails";
import styles from "./Transactions.module.scss";

interface ITransactionDetail {
  transaction: ILastDayTransaction;
}

const TransactionDetail: React.FunctionComponent<ITransactionDetail> = (
  props: ITransactionDetail
) => {
  const { transaction } = props;

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className={styles.payBillsWrapper}>
      <div className={styles.dateContainer}>
        <p>
          {transaction.day}
          <br />
          <p className={styles.transactionDate}>{transaction.date}</p>
        </p>
      </div>
      <ul className={styles.transactionHistoryItems}>
        <li className={styles.transactionHistoryItem}>
          {transaction.transactions.map((txn: ITransaction, i: number) => {
            return (
              <div key={i}>
                <section className={styles.transactionHistory}>
                  <ul className={styles.transactionHistoryGroup}>
                    <div className="type">
                      <span className="merchant-payment">
                        <ul key={i}>
                          <li>
                            <div className={styles.transactionDetails}>
                              <div className={styles.transactionDetailsInner}>
                                <div className={styles.transactionType}>
                                  <span>{txn.service_name}</span>
                                </div>
                                <div className={styles.transactionTitle}>
                                  {showDetails && (
                                    <TransactionHistoryDetails
                                      amount={txn.amount}
                                      beneficiary_account={
                                        txn.destination_phone ?? ""
                                      }
                                      description={txn.description ?? ""}
                                      onCloseModal={() => setShowDetails(false)}
                                      transactionDate={
                                        txn.t_created_at ?? undefined
                                      }
                                      transactionId={txn.receipt_number ?? ""}
                                      transactionStatus={
                                        txn.transaction_status ?? ""
                                      }
                                      transactionType={
                                        txn.transaction_type_name
                                      }
                                    />
                                  )}
                                  <label onClick={() => setShowDetails(true)}>
                                    {txn.title}
                                  </label>
                                  {txn.description !== null ? (
                                    <p>{txn.description}</p>
                                  ) : (
                                    <p>No description</p>
                                  )}
                                </div>
                                <div className={styles.transactionAmount}>
                                  {txn.amount > 0 ? (
                                    <span className={styles.creditAmount}>
                                      {txn.amount}
                                    </span>
                                  ) : (
                                    <span className={styles.debitAmount}>
                                      {accounting.formatMoney(
                                        txn.amount,
                                        CURRENCIES.NAIRA
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </ul>
                </section>
              </div>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default TransactionDetail;
