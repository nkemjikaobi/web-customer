/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CartDropdown.module.scss";
import Cart from "Components/Cart/cart";
import config from "Configurations/configurations";
import useClickOutSide from "CustomHooks/useClickOutSide";

interface IProps {
  cartSize: number;
}

const CartDropdown: React.FunctionComponent<IProps> = (properties: IProps) => {
  const [showCart, setShowCart] = useState<boolean>(false);

  const cartDomNode = useClickOutSide(() => {
    setShowCart(false);
  });

  return (
    <Fragment>
      <div className={styles.cartContainer}>
        <li
          className={`nav-item ${styles.cartList}`}
          onMouseLeave={() => setShowCart(false)}
        >
          <Link
            aria-expanded={"false"}
            className={`nav-link dropdown-toggle ${styles.margin_top_two} ${styles.standardFont}`}
            data-bs-toggle={"dropdown"}
            id={"cart-dropdown"}
            onMouseEnter={() => setShowCart(true)}
            ref={cartDomNode}
            role={"button"}
            to={"#"}
          >
            <img
              alt={""}
              className={"icon nav-icon me-1"}
              src={config.web.public_url + "/icons/Checkout-cart.svg"}
            />
            {"Cart"}
            <div className={styles.cartCounter}>
              <span>{properties.cartSize}</span>
            </div>
            {showCart && (
              <div className={styles.cart}>
                <Cart />
              </div>
            )}
          </Link>
        </li>
      </div>
    </Fragment>
  );
};

export default CartDropdown;
