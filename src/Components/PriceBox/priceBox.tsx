import React from "react";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";
import styles from "./priceBox.module.scss";

const { priceBox, priceBoxFreeDelivery, priceBoxOriginalPrice, priceBoxPrice } =
  styles;

/**
 *
 */
const renderPrice = (price: any, className: string | undefined) => {
  return (
    <div className={className}>
      {accounting.formatMoney(price.toLocaleString(), CURRENCIES.NAIRA)}
    </div>
  );
};

/**
 *
 */
export const Price = ({ className, price }: any) => {
  const priceClass = composeClasses(priceBoxPrice, className);

  return renderPrice(price, priceClass);
};

/**
 *
 */
export const OriginalPrice = ({ className, price }: any) => {
  const priceClass = composeClasses(priceBoxOriginalPrice, className);

  return renderPrice(price, priceClass);
};

export interface IPriceBox {
  originalPrice?: number;
  specialPrice?: number;
  freeShipping?: boolean;
  showFreeShipping?: boolean;
  wrapperClass?: string;
}
const PriceBox: React.FunctionComponent<IPriceBox> = ({
  originalPrice,
  specialPrice,
  freeShipping,
  showFreeShipping,
  wrapperClass,
}) => (
  <div className={`${priceBox} ${wrapperClass}`}>
    <div className={priceBox}>
      <Price price={specialPrice ? specialPrice : originalPrice} />
      {specialPrice &&
        specialPrice !== originalPrice &&
        (originalPrice ?? 0) > 0 && <OriginalPrice price={originalPrice} />}
    </div>

    {showFreeShipping && (specialPrice || freeShipping) && (
      <div className={priceBoxFreeDelivery}>
        {originalPrice !== specialPrice && (
          <span className={styles.youSave}>
            You save{" "}
            {accounting.formatMoney(
              (originalPrice ?? 0) - (specialPrice ?? 0),
              CURRENCIES.NAIRA
            )}
          </span>
        )}
        {specialPrice && freeShipping && <span> + </span>}
        {freeShipping && (
          <span className={styles.freeDelivery}>Free Shipping</span>
        )}
      </div>
    )}
  </div>
);

PriceBox.defaultProps = {
  originalPrice: 0,
  specialPrice: 0,
  freeShipping: false,
  showFreeShipping: false,
  wrapperClass: "",
};

export default PriceBox;
