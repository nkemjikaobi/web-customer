import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import { formatDate2 } from "libs/utils/utils";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./FoodOrderHistory.module.scss";

interface IProps {
  orderData: any;
  paginate: any;
}

const FoodOrderHistory: React.FunctionComponent<IProps> = ({
  orderData,
  paginate,
}) => {
  const myOrders = orderData.map((orderDatum: any, i: number) => {
    const orderDate = orderDatum.createdAt.replace(/-/g, "/");
    const formattedOrderDate = formatDate2(orderDate);

    return (
      <div className={styles.container} key={i}>
        <div className={styles.headerList}>
          <span className={styles.date}>
            {`Order Date : ${formattedOrderDate}
                 `}
          </span>
          <div className={styles.detailsButton}>
            <Link to={`/online-shopping/food-orders/${orderDatum.order_id}`}>
              View Details
            </Link>
          </div>
        </div>
        <div className={styles.ordersCard}>
          <div className={styles.left}>
            <div className={styles.details}>
              <div>
                <p>{orderDatum["merchant"].seller_name}</p>
              </div>
              <div>
                <span>Order Number: </span>
                <span>{orderDatum.order_id}</span>
              </div>
              <div>
                <span>Total: </span>
                <span>
                  {accounting.formatMoney(
                    orderDatum.grand_total,
                    CURRENCIES.NAIRA
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.address}>
              <Link to={`/food/restaurant/${orderDatum.merchant.shop_id}`}>
                <p>Buy Again</p>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.img}>
          {orderDatum["items"].map((e: any, i: any) => (
            <div key={i}>
              <div className={styles.itemImg}>
                <img src={e.image} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });
  return (
    <Fragment>
      <div className={styles.accountLayoutContent}>
        <div className={styles.header}>Orders</div>
        {myOrders}
      </div>
    </Fragment>
  );
};

export default FoodOrderHistory;
