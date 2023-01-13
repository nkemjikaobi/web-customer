import React, { useEffect, useState } from "react";
import styles from "./foodCartCard.module.scss";
import ICartProduct from "dto/Cart/ICartProduct";
import FoodService from "Http/Services/FoodService";
import { connect } from "react-redux";

interface IFoodCartCardProp {
  product?: ICartProduct;
  cart: any;
}

const foodCartCard: React.FunctionComponent<IFoodCartCardProp> = (
  props: IFoodCartCardProp
) => {
  const [cartId, setCartId] = useState<number | null>(0);
  const [productImage, setProductImage] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productAmount, setProductAmount] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [productDescription, setProductDescription] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (props.product) {
      setProductImage(props.product.small_image);
      setProductAmount(props.product.price);
      setProductName(props.product.name);
      setProductQuantity(props.product.requested_quantity);
      setProductDescription(props.product.description);
    }

    if (props.cart && mounted) {
      let cart_id = null;
      switch (props.cart.CartToOpen) {
        case FoodService.STORE_ID:
          cart_id = props.cart.Food?.id || props.cart.Food?.cart_id;
          break;
      }
      setCartId(cart_id);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <div className={styles.foodCartCard}>
      <div className={styles.logo}>
        <img alt="image description" src={productImage} />
      </div>
      <div className={styles.content}>
        <p className={styles.productName}>{productName}</p>
        <p className={styles.productDescription}>{productDescription}</p>
        <div className={styles.priceQuantityWrapper}>
          <p className={styles.productPrice}>{productAmount}</p>
          <p className={styles.productQuantity}>Qty: {productQuantity}</p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {})(foodCartCard);
