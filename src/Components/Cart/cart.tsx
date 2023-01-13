/* eslint-disable react/require-default-props */
import React, { Fragment, useEffect, useState } from "react";
import KonlineCartCard from "Components/KonlineCartCard/konlineCartCard";
import FoodCartCard from "Components/FoodCartCard/foodCartCard";
import Icon from "Components/Icons/icon";
import styles from "./cart.module.scss";
import { connect } from "react-redux";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IFoodCart from "dto/Cart/IFoodCart";
import ICartItem from "dto/Cart/ICartItem";
import ICartProduct from "dto/Cart/ICartProduct";
import ICartAmount from "dto/Cart/ICartAmount";
import { CURRENCIES } from "Helpers/Constants";
import MarketplaceService from "Http/Services/MarketplaceService";
import FoodService from "Http/Services/FoodService";
import SubTotal from "./SubTotal";
import CartService from "Http/Services/CartService";
import accounting from "accounting";
import { AddToMarketplaceCart } from "Http/Redux/Actions/ActionCreators/Cart/MarketPlaceCartCreator";

interface ICartComponent {
  foodCart?: IFoodCart | null;
  marketplaceCart?: IMarketplaceCart | null;

  // eslint-disable-next-line @typescript-eslint/ban-types
  AddToMarketplaceCart?: Function;
}

const Cart: React.FunctionComponent<ICartComponent> = (
  props: ICartComponent
) => {
  const [activeSection, setActiveSection] = useState(
    MarketplaceService.STORE_ID
  );
  const [marketPlaceProducts, setMarketPlaceProducts] = useState<
    Array<ICartProduct>
  >([]);
  const [foodProducts, setFoodProducts] = useState<Array<ICartProduct>>([]);

  const [foodCartItems, setFoodCartItems] = useState(<Fragment />);
  const [marketplaceCartItems, setMarketplaceCartItems] = useState(
    <Fragment />
  );

  const [marketplaceTotal, setMarketplaceTotal] = useState<number>(0);
  const [foodTotal, setFoodTotal] = useState<number>(0);

  useEffect(() => {
    let marketplaceCart = props.marketplaceCart;
    if (props.marketplaceCart?.cart_id) {
      CartService.GetCart(props.marketplaceCart?.cart_id, 1);
    }
    if (marketplaceCart) {
      if (marketplaceCart.items) {
        setMarketPlaceProducts(
          marketplaceCart.items.map((item: ICartItem) => item.products).flat(2)
        );
      }
      if (marketplaceCart.amounts) {
        const amt = marketplaceCart.amounts.find(
          (amount: ICartAmount) => amount.code === "subtotal"
        );
        if (amt) {
          setMarketplaceTotal(amt.amount);
        }
      }
    }
    if (props.foodCart) {
      if (props.foodCart.items) {
        setFoodProducts(
          props.foodCart.items.map((item: ICartItem) => item.products).flat(2)
        );
      }
      if (props.foodCart.amounts) {
        const amt = props.foodCart.amounts.find(
          (amount: ICartAmount) => amount.code === "subtotal"
        );
        if (amt) {
          setFoodTotal(amt.amount);
        }
      }
    }

    return () => {
      marketplaceCart = null;
    };
  }, [props]);

  useEffect(() => {
    let items = marketPlaceProducts.map((product: ICartProduct) => (
      <KonlineCartCard key={product.product_id} product={product} />
    ));
    setMarketplaceCartItems(<Fragment>{items}</Fragment>);
    return () => {
      items = [];
    };
  }, [marketPlaceProducts]);

  useEffect(() => {
    let items = foodProducts.map((product: ICartProduct) => (
      <FoodCartCard key={product.product_id} product={product} />
    ));
    setFoodCartItems(<Fragment>{items}</Fragment>);
    return () => {
      items = [];
    };
  }, [foodProducts]);

  return marketPlaceProducts.length < 1 && foodProducts.length < 1 ? (
    <div className={styles.cartIconContainer}>
      <div className={styles.cartIcon}>
        <div className={styles.tabletAndAboveOnly}>
          <Icon name="cartIcon" />
        </div>
        <div className={styles.mobileOnly}>
          <Icon name="cartIcon2" />
        </div>
      </div>
      <p>Your Shopping cart is empty.</p>
    </div>
  ) : (
    <div className={styles.cart}>
      <div className={styles.cart_kongaOnline}>
        <div
          className={styles.heading}
          onClick={() => setActiveSection(MarketplaceService.STORE_ID)}
        >
          <div className={styles.heading_content}>
            <p>
              Online Shopping, <span>{marketPlaceProducts.length} items</span>
            </p>
          </div>
          <div className={styles.arrowIcon}>
            <Icon
              name={
                activeSection === MarketplaceService.STORE_ID
                  ? "chevron-up"
                  : "arrowRight"
              }
            />
          </div>
        </div>
        {activeSection === MarketplaceService.STORE_ID && (
          <Fragment>
            <div className={styles.activeSection}>{marketplaceCartItems}</div>
            <SubTotal
              id={MarketplaceService.STORE_ID}
              total={marketplaceTotal}
            />
          </Fragment>
        )}
      </div>
      <div className={styles.cart_kongaFood}>
        <div
          className={styles.heading}
          onClick={() => setActiveSection(FoodService.STORE_ID)}
        >
          <div className={styles.heading_content}>
            <p>
              Konga Food, <span>{foodProducts.length} items</span>
            </p>
          </div>
          <div className={styles.arrowIcon}>
            <Icon
              name={
                activeSection === FoodService.STORE_ID
                  ? "chevron-up"
                  : "arrowRight"
              }
            />
          </div>
        </div>
        {activeSection === FoodService.STORE_ID && (
          <Fragment>
            <div className={styles.activeSection}>{foodCartItems}</div>
            <SubTotal id={FoodService.STORE_ID} total={foodTotal} />
          </Fragment>
        )}
      </div>
      <div className={styles.agregatedCartTotal}>
        <h3>Total</h3>
        <div className={styles.total}>
          <p>Aggregated Cart Total</p>
          <p>
            {accounting.formatMoney(
              marketplaceTotal + foodTotal,
              CURRENCIES.NAIRA
            )}
          </p>
        </div>
        <div className={styles.deliveryFee}>
          <p className={styles.deliveryFee_name}>Delivery Fee:</p>
          <p className={styles.deliveryFee_info}>
            Delivery fee calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};

Cart.defaultProps = {
  foodCart: undefined,
  marketplaceCart: undefined,
};

const mapStateToProps = (state: any) => ({
  foodCart: state.cart.Food,
  marketplaceCart: state.cart.Marketplace,
});

export default connect(mapStateToProps, { AddToMarketplaceCart })(Cart);
