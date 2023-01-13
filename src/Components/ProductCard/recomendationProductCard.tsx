import React from "react";
import Img from "Assets/images/png/pots.png";
import styles from "./recomendationProductCard.module.scss";
import { CURRENCIES } from "Helpers/Constants";

const ProductCard: React.FunctionComponent = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard_Top}>
        <img src={Img} />
      </div>
      <div className={styles.productCard_Bottom}>
        <h1>HP Sprocket Photo Printer - Black +10 Free Zinc Sticky Paper</h1>
        <div className={styles.prices}>
          <p className={styles.dicountPrice}>{CURRENCIES.NAIRA} 28,500</p>
          <p className={styles.originalPrice}>{CURRENCIES.NAIRA} 32,500</p>
        </div>
        <p className={styles.amountSaved}>You Save {CURRENCIES.NAIRA} 1,000</p>
      </div>
    </div>
  );
};
export default ProductCard;
