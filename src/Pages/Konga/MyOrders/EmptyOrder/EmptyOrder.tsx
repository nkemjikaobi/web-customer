import React, { Fragment } from "react";
import styles from "./EmptyOrder.module.scss";
import styles2 from "../OrderHistory/KongaOnlineOrderHistory.module.scss";
import Icon from "Components/Icons";
import Button from "Components/Button/button";
import { useHistory } from "react-router-dom";

const EmptyOrder = () => {
  const history = useHistory();
  return (
    <Fragment>
      <div className={styles2.accountLayoutContent}>
        <div className={styles2.header}>Orders</div>
        <div className={styles.emptyOrder}>
          <Icon name="emptyOrder" />
          <p>No current Orders</p>
          <p>
            Visit Konga{" "}
            <span onClick={() => history.push("/online-shopping")}>
              homepage
            </span>{" "}
            and shop now!
          </p>
          <div className={styles.shoppingBtn}>
            <Button title="Go Shopping" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EmptyOrder;
