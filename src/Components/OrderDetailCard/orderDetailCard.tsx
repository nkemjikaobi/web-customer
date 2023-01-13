/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import ProductImg from "Assets/images/png/orderDetailCardImg.png";
import ItemQuantity from "Components/ItemQuantity/itemQuantity";
import Icon from "Components/Icons/icon";
import styles from "./orderDetailCard.module.scss";
import ICartProduct from "dto/Cart/ICartProduct";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";

export interface IOrderDetailCard {
  cartProduct: ICartProduct;
  setSubTotal: Function;
}

const OrderDetailCard: React.FunctionComponent<IOrderDetailCard> = ({
  cartProduct,
  setSubTotal,
}: IOrderDetailCard) => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [sellerName, setSellerName] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productImage, setProductImage] = useState<string>(ProductImg);

  useEffect(() => {
    let mounted = true;
    if (mounted && cartProduct) {
      setProductName(cartProduct.name);
      setProductQuantity(cartProduct.requested_quantity);
      setProductPrice(cartProduct.subtotal);
      setSellerName(cartProduct.seller?.name ?? "");
      setProductImage(cartProduct.small_image ?? ProductImg);
    }
    return () => {
      mounted = false;
    };
  }, [cartProduct]);

  useEffect(() => {
    let mounted = true;
    if (cartProduct) {
      const currentPrice = cartProduct.subtotal * productQuantity;
      setProductPrice(currentPrice);
      setSubTotal(cartProduct, currentPrice);
    }
    return () => {
      mounted = false;
    };
  }, [productQuantity]);

  return (
    <div className={styles.orderDetail}>
      <div className={styles.image}>
        <img alt="jafdjakhf" src={productImage} />
      </div>
      <div className={styles.orderInfo}>
        <h1 className={"h2 text-capitalise"}>{productName}</h1>
        <p className={styles.brandName}>
          Sold by <span className={"fw-bold"}>{sellerName}</span>
        </p>
        <div>
          <p className={composeClasses("mt-0", styles.quantityLabel)}>
            Quantity: {productQuantity}
          </p>
          <h6 className={composeClasses("mt-0")}>
            Price: {accounting.formatMoney(productPrice, CURRENCIES.NAIRA)}
          </h6>
          {/* <div className={styles.itemQuantityWrapper}>
            {
              //Check availableQty fix
            }
            <ItemQuantity availableQty={0} onChange={(newQty: number) => setProductQuantity(newQty)} value={productQuantity} />
          </div> */}
        </div>
      </div>
      <div className={styles.orderInfoOptions}>
        {/* <div className={styles.saveItem}>
          <div className={styles.iconWrapper}>
            <Icon name="heart" />
          </div>
          <p>Save Item</p>
        </div>
        <div className={styles.removeItem}>
          <Icon name="trash" />
          <p>Remove</p>
        </div> */}
      </div>
    </div>
  );
};
export default OrderDetailCard;
