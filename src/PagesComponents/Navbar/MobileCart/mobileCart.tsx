import Icon from "Components/Icons";
import React, { Fragment, useState } from "react";
import styles from "./mobileCart.module.scss";
import Cart from "Components/Cart/cart";
interface IProps {
  cartSize: number;
}

const MobileCart: React.FunctionComponent<IProps> = ({ cartSize }: IProps) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  return (
    <Fragment>
      <div className={styles.mobileCart} onClick={() => setShowCart(true)}>
        <Icon name="mobileCart" />
        <div className={styles.badgeCounter}>
          <span>{cartSize}</span>
        </div>
      </div>
      {showCart && (
        <div className={styles.mainWrapper}>
          <div className={styles.closeSection}>
            <div className={styles.close} onClick={() => setShowCart(false)}>
              <Icon name="arrowLeft" />
            </div>
            <span>Active Carts</span>
          </div>
          <Cart />
        </div>
      )}
    </Fragment>
  );
};

export default MobileCart;
