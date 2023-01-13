import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import styles from "./deliveryReturns.module.scss";

const deliveryReturnsData = [
  {
    icon: "deliveryLabel",
    title: "Delivery",
    label: "Estimated delivery time 1-9 business days",
  },
  {
    icon: "returnLabel",
    title: "Return Policy",
    subtitle: "No returns or exchange for this items.",
    label:
      "Free returns within 15 days for Official store items and 7 days for other eligible items.",
  },
  {
    icon: "warrantyLabel",
    title: "Warranty",
    label: "Warranty information unavailable for this item.",
  },
];
const deliveryList = deliveryReturnsData.map((e, i) => {
  return (
    <div className={styles.deliveryItems} key={i}>
      <div className={styles.iconWrapper}>
        <Icon name={e.icon} />
      </div>
      <div className={styles.deliveryItems_text}>
        <p className={styles.title}>{e.title}</p>
        {e.subtitle && <p className={styles.subtitle}>{e.subtitle}</p>}
        <p className={styles.label}>{e.label}</p>
      </div>
    </div>
  );
});
const DeliveryReturns: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles.deliveryReturns}>
        <div className={styles.deliveryReturns_header}>
          <h1>Delivery & Returns</h1>
        </div>
        <div>{deliveryList}</div>
      </div>
    </Fragment>
  );
};

export default DeliveryReturns;
