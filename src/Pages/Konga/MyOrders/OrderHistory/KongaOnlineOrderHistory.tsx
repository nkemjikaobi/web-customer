import React, { Fragment } from "react";
import { formatDate2, normalizeAddress } from "libs/utils/utils";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import styles from "./KongaOnlineOrderHistory.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  orderData: any;
  paginate: any;
}

const KongaOnlineOrderHistory: React.FunctionComponent<IProps> = ({
  orderData,
  paginate,
}) => {
  const myOrders = orderData.map((orderDatum: any, i: number) => {
    const orderDate = orderDatum.createdAt.replace(/-/g, "/");
    const formattedOrderDate = formatDate2(orderDate);

    const deliveryAddress = normalizeAddress(orderDatum.shipping_address);
    const normalizedDeliveryAddress = `${deliveryAddress.street} ${deliveryAddress.area} ${deliveryAddress.region}`;
    return (
      <div className={styles.container} key={i}>
        <div className={styles.headerList}>
          <span className={styles.date}>
            {`Order Date : ${formattedOrderDate}
             `}
          </span>
          <div className={styles.detailsButton}>
            <Link to={`/online-shopping/orderDetail/${orderDatum.order_id}`}>
              View Details
            </Link>
          </div>
        </div>
        <div className={styles.ordersCard}>
          <div className={styles.left}>
            <div className={styles.details}>
              <div>
                <span>Total: </span>
                <span>
                  {accounting.formatMoney(
                    orderDatum.grand_total,
                    CURRENCIES.NAIRA
                  )}
                </span>
              </div>
              <div>
                <span>Order Number: </span>
                <span>{orderDatum.order_id}</span>
              </div>
              <div>
                <span>Payment Method: </span>
                <span>{orderDatum["payment_methods"][0]}</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.address}>
              <p>Delivery Address</p>
              <p>{normalizedDeliveryAddress}</p>
            </div>
          </div>
        </div>
        <div className={styles.img}>
          {orderDatum["items"].map((e: any, i: any) => (
            <div key={i}>
              <div>
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

export default KongaOnlineOrderHistory;
