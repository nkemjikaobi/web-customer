import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import TransactionHistoryComponent from "../TransactionHistoryComponent";
import Icon from "Components/Icons";
import ILastDayTransaction from "dto/Kongapay/ILastDayTransaction";
import styles from "./TransactionHistoriesComponent.module.scss";
import FilterComponent from "../FilterComponent/filterComponent";
import { channelsData } from "../FilterComponent/FilterAttributes/data";
import { composeClasses } from "libs/utils/utils";

export interface ITransactionHistoriesComponent {
  histories: Array<ILastDayTransaction>;
}

const TransactionHistoriesComponent: React.FunctionComponent<
  ITransactionHistoriesComponent
> = (properties: ITransactionHistoriesComponent) => {
  const [filterIsDisplayed, setFilterIsDisplayed] = useState<boolean>(false);
  const [activeTabType, setActiveTabType] = useState<string>();
  const [filtered, setFiltered] = useState<any>();
  const [newHistory, setNewHistory] = useState<any>(properties.histories);
  useEffect(() => {
    setActiveTabType("All");
    return () => {
      setActiveTabType("");
    };
  }, []);

  useEffect(() => {
    setNewHistory(properties.histories);
  }, [properties.histories]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setNewHistory(filtered);
      handleFilterDisplay();
    }
    return () => {
      mounted = false;
    };
  }, [filtered]);

  const handleFilter = (attributes: any) => {
    if (attributes !== undefined) {
      let from_date = new Date();
      let to_date = new Date();

      if (attributes.range.type === "range") {
        if (attributes.range.from > 0) {
          from_date = new Date(
            new Date().setDate(new Date().getDate() - attributes.range.from)
          );
        }
        to_date = new Date(
          new Date().setDate(new Date().getDate() - attributes.range.to)
        );
      } else if (attributes.range.type === "month") {
        setFiltered(
          newHistory.filter((history: any) => {
            from_date = new Date(history.day);
            if (
              from_date.getMonth() ===
              to_date.getMonth() - attributes.range.to
            ) {
              return history;
            }
          })
        );
      } else if (attributes.range.type === "date-range") {
        from_date = new Date(attributes.range.from);
        to_date = new Date(attributes.range.to);
      }

      setFiltered(
        newHistory.filter((history: any) => {
          const d = new Date(history.day);
          if (from_date <= d && to_date >= d) {
            return history;
          }
        })
      );
    }
  };

  const channels = channelsData.map((channel, i) => {
    return (
      <span
        className={
          activeTabType === channel.text
            ? composeClasses(styles.channelStyles, styles.active)
            : styles.channelStyles
        }
        key={i}
        onClick={(e) => handleChangeTab(e, channel.text)}
      >
        {channel.text}
      </span>
    );
  });

  const handleFilterDisplay = () => {
    setFilterIsDisplayed(false);
  };

  const handleChangeTab = (event: any, tabString: string) => {
    setActiveTabType(tabString);
  };

  const handleExportHistoryAction = (event: any) => {
    /** Method to handle exporting of transactions into an pdf document. */
    event.preventDefault();
  };

  return (
    <Fragment>
      <div className={styles.transactionHistories}>
        <div className={styles.transactionHistoryHeader}>
          <div className={styles.transactionHistoryHeading}>
            <label>Transaction History</label>
          </div>
          <div className={styles.filterExportWrapper}>
            <div
              className={styles.filter}
              onClick={() => setFilterIsDisplayed(true)}
            >
              <Icon name={"sliders"} />
              <span>Filters</span>
            </div>
            <div className={styles.export} onClick={handleExportHistoryAction}>
              <Icon name={"export"} />
              <span>Export</span>
            </div>
          </div>
        </div>
        <div className={styles.filterButtons}>{channels}</div>
        <ul className={styles.transactionHistoryItems}>
          <li className={styles.transactionHistoryItem}>
            {newHistory &&
              newHistory.length > 0 &&
              newHistory.map((history: ILastDayTransaction, key: number) => (
                <TransactionHistoryComponent key={key} transaction={history} />
              ))}
            {!newHistory && (
              <div className={styles.noHistory}>
                <p>You have no transaction history</p>
              </div>
            )}
          </li>
        </ul>
        <div>
          <FilterComponent
            hideFilter={handleFilterDisplay}
            isDisplayed={filterIsDisplayed}
            onFilter={handleFilter}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, null)(TransactionHistoriesComponent);
