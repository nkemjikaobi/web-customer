import React from "react";
import Img from "Assets/images/png/pots.png";
import styles from "./listingCard.module.scss";
import { CURRENCIES } from "Helpers/Constants";

const ProductCard: React.FunctionComponent = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCard_Top}>
        <img src={Img} />
        <p>prima Baking Pan set 3pc non stick</p>
      </div>
      <div className={styles.productCard_Bottom}>
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
