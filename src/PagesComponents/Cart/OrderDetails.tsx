/* eslint-disable no-console */
import KongaPrimeLabel from "Components/KongaPrimeLabel/kongaPrimeLabel";
import OrderDetailCard from "Components/OrderDetailCard/orderDetailCard";
import ICartItem from "dto/Cart/ICartItem";
import ICartProduct from "dto/Cart/ICartProduct";
import MarketplaceService from "Http/Services/MarketplaceService";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
import OrderDetailsTotalComponent from "./OrderDetailsTotalComponent";
import AuthService from "Http/Services/AuthService";

export interface IOrderDetails {
  cartEntity?: any;
}

export interface IOrderDetailsPrice {
  [key: string]: number;
}

const OrderDetails: React.FunctionComponent<IOrderDetails> = ({
  cartEntity,
}: IOrderDetails) => {
  const [products, setProducts] = useState<Array<ICartProduct>>([]);
  const [showkongaPrimeSignUp, setShowtKongaPrimeSignUp] =
    useState<boolean>(true);

  const isKongaPrimeCustomer = AuthService.GetLoggedInUser().isKongaPrime;

  useEffect(() => {
    let mounted = true;

    if (isKongaPrimeCustomer === "1") {
      setShowtKongaPrimeSignUp(false);
    } else {
      setShowtKongaPrimeSignUp(true);
    }
    const cart =
      cartEntity.CartToOpen === MarketplaceService.STORE_ID
        ? cartEntity.Marketplace
        : cartEntity.Food;

    if (cart && cart.items) {
      const products = cart.items
        .map((item: ICartItem) => item.products)
        .flat(2);
      setProducts(products);

      //To understand use of this method

      const tempPrices: Array<IOrderDetailsPrice> =
        products &&
        products.map((product: any) => ({
          [`${product.sku}`]: product.subtotal,
        }));

      tempPrices.length > 0 &&
        tempPrices.reduce((previous: IOrderDetails, current: IOrderDetails) => {
          const score: number =
            Object.entries(previous)[0][1] + Object.entries(current)[0][1];
          return { ["sub_total"]: score };
        });
    }
    return () => {
      mounted = false;
    };
  }, [cartEntity]);

  const handleSubtotalChange = (product: ICartProduct, amount: number) => {
    // console.log(product, amount);
  };

  return (
    <Fragment>
      <div className={styles.right}>
        <div className={styles.orderDetails}>
          <div className={styles.header}>
            <h1>ORDER DETAILS</h1>
            <Link to="/online-shopping/checkout/shopping-cart/1">
              Modify Cart
            </Link>
          </div>
          <div className={styles.items}>
            {products.map((product: ICartProduct, index: number) => (
              <OrderDetailCard
                cartProduct={product}
                key={index}
                setSubTotal={handleSubtotalChange}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <OrderDetailsTotalComponent />
          </div>
        </div>
        {showkongaPrimeSignUp && <KongaPrimeLabel />}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ cartEntity: state.cart });

OrderDetails.defaultProps = {
  cartEntity: undefined,
};

export default connect(mapStateToProps, null)(OrderDetails);
