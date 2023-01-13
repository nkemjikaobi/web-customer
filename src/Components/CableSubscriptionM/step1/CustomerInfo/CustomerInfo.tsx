/* eslint-disable @typescript-eslint/ban-types */
import accounting from "accounting";
import Icon from "Components/Icons";
import { CURRENCIES } from "Helpers/Constants";
import { formatDate2 } from "libs/utils/utils";
import React, { useEffect, useState } from "react";
import styles from "./CustomerInfo.module.scss";

interface IProps {
  responseData: any;
  hasData: boolean;
  handleChangePlan: Function;
}

const CustomerInfo: React.FunctionComponent<IProps> = (props: IProps) => {
  const [hasData, setHasData] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setHasData(mounted && props && props.hasData);

    return () => {
      mounted = false;
    };
  }, [props]);

  return hasData === true ? (
    <>
      <div className={styles.infoHolder}>
        <div className={styles.customerInfo}>
          <div>
            <p>Customer Name</p>
          </div>
          <div>
            <p>{props.responseData.CustomerName}</p>
          </div>
        </div>
        <div className={styles.customerInfo}>
          <div>
            <p>Current Plan</p>
          </div>
          <div>
            <div>
              <p>{props.responseData.CurrentBouquet}</p>
            </div>
            <div
              className={styles.changePlan}
              onClick={() => props.handleChangePlan()}
            >
              <Icon name="changePlan" />
              <small>Change plan</small>
            </div>
          </div>
        </div>
        <div className={styles.customerInfo}>
          <div>
            <p>Amount to Pay</p>
          </div>
          <div>
            <p>
              {accounting.formatMoney(
                props.responseData.OutstandingBalance,
                CURRENCIES.NAIRA
              )}
            </p>
          </div>
        </div>
        <div className={styles.customerInfo}>
          <div>
            <p>Renewal Date</p>
          </div>
          <div>
            <p>{formatDate2(props.responseData.DueDate?.replace(/T/g, " "))}</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default CustomerInfo;
