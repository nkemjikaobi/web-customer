/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import CartService from "Http/Services/CartService";
import FoodService from "Http/Services/FoodService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./foodOrderListCard.module.scss";
import { connect } from "react-redux";
import { AddFoodItemCartAction } from "Http/Redux/Actions/Cart/IFoodCartAction";

interface IProps {
  AddFoodItemToCart?: any;
}

const FoodOrderListCard: React.FunctionComponent<IProps> = ({
  AddFoodItemToCart,
}) => {
  const [cartProductList, setCartProductList] = useState<any>();
  const [cartSubtotal, setCartSubtotal] = useState<any>({});
  const [cartGrandtotal, setCartGrandtotal] = useState<any>({});
  const [orderDisplay, setOrderDisplay] = useState<any>(
    <div className={styles.defaultText}>
      <h6>
        Your Order List is Empty. <br /> Add your favourite Meal to List
      </h6>
    </div>
  );

  const cartInfoUpdate = async () => {
    const getCart = await CartService.GetCart(
      AddFoodItemToCart.id,
      FoodService.STORE_ID
    );
    const cartProducts = getCart?.items?.map((item, idx) => {
      return item.products;
    });

    if (typeof cartProducts !== "undefined") {
      const orderItems = cartProducts![0].map((product) => (
        <div className={styles.orderItems} key={product!.sku}>
          <span className={styles.darkFont}>
            {" "}
            + {product.requested_quantity} -{" "}
          </span>
          <span className={styles.darkFont}>{product.name}</span>
          <span className={styles.darkFont}>N{product.subtotal}</span>
        </div>
      ));

      const orderSubTotal = getCart?.amounts?.filter((amount) => {
        if (amount.code === "subtotal") {
          return amount;
        }
      });

      const orderGrandTotal = getCart?.amounts?.filter((amount) => {
        if (amount.code === "grand_total") {
          return amount;
        }
      });
      setCartProductList(orderItems);
      setCartSubtotal(orderSubTotal![0]);
      setCartGrandtotal(orderGrandTotal![0]);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (AddFoodItemToCart) {
      cartInfoUpdate();
      const displayUpdate = (
        <div>
          <div className="">{cartProductList}</div>
          <div className={styles.orderItems}>
            <span className={styles.lightFont}>{cartSubtotal?.title}</span>
            <span className={styles.lightFont}>N{cartSubtotal?.amount}</span>
          </div>
          <div className={styles.orderItems}>
            <span className={styles.lightFont}>Delivery Fee</span>
            <span className={styles.lightFont}>N0.00</span>
          </div>
          <div className={styles.orderItems}>
            <span>{cartGrandtotal?.title}</span>
            <span>N{cartGrandtotal?.amount}</span>
          </div>
          <div>
            <Link to={`/food/checkout/shopping-cart/${AddFoodItemToCart?.id}`}>
              <button className={"btn btn-block btn-primary w-100 text-white"}>
                View Cart and Checkout
              </button>
            </Link>
          </div>
        </div>
      );
      setOrderDisplay(displayUpdate);
    }

    return () => {
      mounted = false;
    };
  }, [AddFoodItemToCart]);

  return (
    <div className={styles.vendorOrderCard}>
      <div className={styles.orderContent}>{orderDisplay}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  AddFoodItemToCart: state.cart.Food,
});

export default connect(mapStateToProps, {
  AddFoodItemCartAction,
})(FoodOrderListCard);
