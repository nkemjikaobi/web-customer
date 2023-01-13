import Button from "Components/Button/button";
import React from "react";
import Icon from "Components/Icons/icon";
import styles from "./checkoutMobile.module.scss";
import { CURRENCIES } from "Helpers/Constants";
const checkoutMobile: React.FunctionComponent = () => {
  return (
    <>
      <div className={styles.checkoutMobile}>
        <div className={styles.heading}>
          <div>
            <p>check</p>
          </div>
          <p>Deliver to me</p>
        </div>
        <div className={styles.addressContainer}>
          <div className={styles.noAddress}>
            <Icon name="book" />
            <p>No Address Found. Please Add New Address</p>
            <div>
              <Button
                btnClass={"btn-primary text-white"}
                title="Add New Address"
              />
            </div>
          </div>
        </div>
        <div className={styles.selectPickUp}>
          <div className={styles.radio}>
            <input type="radio" />
          </div>
          <p>Pickup Location</p>
        </div>

        <div className={styles.orderDetials}>
          <p>Order detials (3 items)</p>

          <a>View cart</a>
        </div>
        <div className={styles.total}>
          <div>
            <p>Subtotal</p>
            <p>{CURRENCIES.NAIRA} 472,000</p>
          </div>
          <div>
            <p>Total</p>
            <p>{CURRENCIES.NAIRA} 472,000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default checkoutMobile;
