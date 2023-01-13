import accounting from "accounting";
import cart from "Components/Cart/cart";
import ICartAmount from "dto/Cart/ICartAmount";
import { CURRENCIES } from "Helpers/Constants";
import MarketplaceService from "Http/Services/MarketplaceService";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./OrderDetails.module.scss";

export interface IOrderDetailsTotalComponent {
  cart?: any;
}

const OrderDetailsTotalComponent: React.FunctionComponent<
  IOrderDetailsTotalComponent
> = (props: IOrderDetailsTotalComponent) => {
  const [prices, setPrices] = useState<Array<ICartAmount>>([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const amounts =
        props.cart.CartToOpen === MarketplaceService.STORE_ID
          ? props.cart.Marketplace?.amounts ?? [0]
          : props.cart.Food?.amounts ?? [0];
      setPrices(
        amounts?.filter((amount: ICartAmount) => amount.amount > 0) ?? []
      );
    }

    return () => {
      mounted = false;
    };
  }, [cart]);
  return (
    <Fragment>
      {prices.map((price: ICartAmount, index: number) => (
        <div className={styles.subTotal} key={index}>
          <p>{price.title}:</p>
          <p>{accounting.formatMoney(price.amount, CURRENCIES.NAIRA)}</p>
        </div>
      ))}
    </Fragment>
  );
};

OrderDetailsTotalComponent.defaultProps = {
  cart: undefined,
};
const mapStateToProps = (state: any) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(OrderDetailsTotalComponent);
