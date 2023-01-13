import React from "react";
import styles from "./KongaPrimeSubMainCard.module.scss";
import KongaPrimeSubscriptionImgCard from "../KongaPrimeSubscriptionImgCard/KongaPrimeSubscriptionImgCard";
import { specialPrices } from "../data";
import Icon from "Components/Icons";
import { Link } from "react-router-dom";

/**
 * @returns {React.Component} This returns a list of react components
 */
const KongaPrimeSubMainCard = ({
  img,
  name,
  prices,
  productId,
  title,
  iconColor,
}: any) => {
  const productName = name !== "" ? name.toLowerCase() : "";
  const subscriptionCard =
    prices &&
    prices.values &&
    prices.values.map((element: any, index: number) => {
      return (
        <Link key={index} to={`/konga-prime/${productId}/${element.sku}`}>
          <KongaPrimeSubscriptionImgCard
            img={img}
            price={element.price}
            specialPrice={specialPrices[productName][element.sku]}
            title={element.title}
          />
        </Link>
      );
    });

  if (!subscriptionCard) return null;

  return (
    <div className={styles.KongaPrimeSubscriptionMainCard}>
      <div className={styles.header}>
        <span className={styles.Icon} style={{ backgroundColor: iconColor }}>
          <Icon name="konga-prime-tag" />
        </span>
        <h3>{title}</h3>
      </div>
      <div className={styles.subs}>{subscriptionCard}</div>
    </div>
  );
};
export default KongaPrimeSubMainCard;
