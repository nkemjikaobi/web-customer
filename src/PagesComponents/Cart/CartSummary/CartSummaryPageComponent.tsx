import accounting from "accounting";
import KongaPrimeLabel from "Components/KongaPrimeLabel/kongaPrimeLabel";
import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import { CURRENCIES, SUB_TOTAL_FIELD_KEY } from "Helpers/Constants";
import CartService from "Http/Services/CartService";
import FoodService from "Http/Services/FoodService";
import MarketplaceService from "Http/Services/MarketplaceService";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./CartSummaryPageComponent.module.scss";
import masterCard from "Assets/images/png/masterCard.png";
import verve from "Assets/images/png/verve.png";
import visa from "Assets/images/png/visa.png";
import kongaPay from "Assets/images/png/KongaPayLogo2.png";
import padlock from "Assets/images/png/Padlock.png";
import AuthService from "Http/Services/AuthService";

export interface ICartSummaryPageComponent {
  cartToOpen?: number | null;
  foodCart?: IFoodCart | null;
  marketplaceCart?: IMarketplaceCart | null;
}

const CartSummaryPageComponent: React.FunctionComponent<
  ICartSummaryPageComponent
> = (props: ICartSummaryPageComponent) => {
  const [total, setTotal] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [orderSummary, setOrderSummary] = useState<number>(0);
  const [openTheCart, setOpenTheCart] = useState(1);
  const [showkongaPrimeSignUp, setShowtKongaPrimeSignUp] =
    useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const user = AuthService.GetLoggedInUser();

    if (mounted && user) {
      const isKongaPrimeCustomer = user.isKongaPrime;
      if (isKongaPrimeCustomer === "1") {
        setShowtKongaPrimeSignUp(false);
      } else {
        setShowtKongaPrimeSignUp(true);
      }
    } else {
      setShowtKongaPrimeSignUp(true);
    }

    return () => {
      mounted = false;
      setOpenTheCart(0);
    };
  }, []);

  useEffect(() => {
    const mounted = true;
    if (mounted && openTheCart && props.cartToOpen) {
      let cart: IMarketplaceCart | IFoodCart | null | undefined = null;
      switch (props.cartToOpen) {
        case MarketplaceService.STORE_ID:
          cart = props.marketplaceCart;
          break;
        case FoodService.STORE_ID:
          cart = props.foodCart;
      }
      return () => {
        setOpenTheCart(0);
      };
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && openTheCart && props.cartToOpen) {
      let cart: IMarketplaceCart | IFoodCart | null | undefined = null;
      switch (props.cartToOpen) {
        case MarketplaceService.STORE_ID:
          cart = props.marketplaceCart;
          break;
        case FoodService.STORE_ID:
          cart = props.foodCart;
      }
      if (cart) {
        setTotal(
          CartService.ExtractValuesFromCartAmountsField(
            cart,
            SUB_TOTAL_FIELD_KEY
          )
        );
        setSubTotal(
          CartService.ExtractValuesFromCartAmountsField(
            cart,
            SUB_TOTAL_FIELD_KEY
          )
        );
        setOrderSummary(CartService.ExtractProductsFromCart(cart).length);
      }
    }
    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.right}>
        <div className={styles.orderSummary}>
          <div className={styles.header}>
            <p className={styles.weightFiveHundred}>Order Summary</p>
            <p>{orderSummary} Item(s)</p>
          </div>
          <div className={styles.subTotal}>
            <p className={styles.fontThirteen}>Subtotal:</p>
            <p className={styles.fontFourteen}>
              {accounting.formatMoney(subTotal, CURRENCIES.NAIRA)}
            </p>
          </div>
          <div className={styles.deliveryCharges}>
            <p className={styles.fontThirteen}>Delivery Charges:</p>
            <p className={styles.subText}>
              Delivery charges not included yet, Add your delivery address at
              checkout to see your delivery charges
            </p>
          </div>
          <div className={styles.total}>
            <p className={styles.weightFiveHundred}>Total</p>
            <p className={styles.weightFiveHundred}>
              {accounting.formatMoney(total, CURRENCIES.NAIRA)}
            </p>
          </div>
        </div>
        {showkongaPrimeSignUp && <KongaPrimeLabel />}
        <div className={styles.paymentOptions}>
          <div className={styles.cards}>
            <span>We accept:</span>
            <div>
              <img alt="master card" src={masterCard} />
            </div>
            <div>
              <img alt="visa card" src={visa} />
            </div>
            <div>
              <img alt="verve card" src={verve} />
            </div>
            <div>
              <img alt="konga pay" src={kongaPay} />
            </div>
          </div>
          <div className={styles.secure}>
            <img alt="secure" src={padlock} />
            <span>Transactions are 100% Safe and Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  cartToOpen: state.cart.CartToOpen,
  foodCart: state.cart.Food,
  marketplaceCart: state.cart.Marketplace,
});

CartSummaryPageComponent.defaultProps = {
  cartToOpen: undefined,
  foodCart: undefined,
  marketplaceCart: undefined,
};

export default connect(mapStateToProps, null)(CartSummaryPageComponent);
