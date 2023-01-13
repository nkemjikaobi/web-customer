/* eslint-disable @typescript-eslint/ban-types */
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import TransactionHistoriesComponent from "PagesComponents/Kpay/TransactionHistoryComponent/TransactionHistoriesComponent/TransactionHistoriesComponent";
import TransactionService from "Http/Services/TransactionService";
import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import PaginationComponent from "Components/Pagination/pagination";
import ITransactionsResponse from "dto/Kongapay/ITransactionsResponse";
import styles from "./TransactionHistory.module.scss";

const TransctionHistoryPage: React.FunctionComponent = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [resetCounter, setResetCounter] = useState<boolean>(false);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [histories, setHistories] = useState<Array<ILastDayTransaction>>([]);
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/pay-bills/" },
    { Text: "Transaction History" },
  ];

  const fetchTransactions = async (page?: number): Promise<any> => {
    return await TransactionService.loadKpayTransactions(10, page).then(
      (transactions: ITransactionsResponse | null) => {
        if (transactions) {
          if (transactions.items && transactions.items.length > 0) {
            const data: Array<ILastDayTransaction> =
              TransactionService.loadFormattedTransactions(transactions.items);
            setHistories(data);
          }
          if (transactions.pagination) {
            setCurrentPageNumber(transactions.pagination.current);
            setPageCount(transactions.pagination.last);
          }
        }
      }
    );
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && currentPageNumber) {
      fetchTransactions(currentPageNumber);
    }

    return () => {
      mounted = false;
    };
  }, [currentPageNumber]);

  const onPageChange = (pageNumber: any) => {
    setCurrentPageNumber(pageNumber + 1);
  };

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.payBillsContainer}>
          <div className={styles.payBillsWrapper}>
            <div className={styles.payBills}>
              <div className={styles.transactionContainer}>
                <TransactionHistoriesComponent histories={histories} />
              </div>
            </div>
            <div>
              <PaginationComponent
                onPageChange={onPageChange}
                pageCount={pageCount}
                resetCounterListener={resetCounter}
              />
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default connect(null, null)(TransctionHistoryPage);
