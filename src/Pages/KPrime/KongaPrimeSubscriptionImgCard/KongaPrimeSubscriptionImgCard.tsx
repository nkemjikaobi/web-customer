import React from "react";
import styles from "./KongaPrimeSubscriptionImgCard.module.scss";
import PrimeSubscriptionPlan from "Assets/images/png/primesubscription.png";
import { convertNumber } from "libs/utils/utils";
import { CURRENCIES } from "Helpers/Constants";
import Asset from "Components/Asset/asset";
import constants from "Helpers/cloudinaryConstants";
/**
 *  @returns {React.Component} This returns react component
 */
const KongaPrimeSubscriptionImgCard = ({
  img,
  price,
  title,
  specialPrice,
}: any) => {
  const word = title !== "" ? title.split(" ")[0] : "";
  const month = title !== "" ? title.split(" ")[1] : "";
  return (
    <div className={styles.mainContainer}>
      <Asset
        alt="konga prime order img"
        name={`${img}`}
        type={constants.asset.cloudinaryType}
      />
      <p className={styles.title}>{`${convertNumber(word)} ${month}`} </p>
      <h1 className={styles.price}>{parseFloat(price)}</h1>
      <h1 className={styles.specialPrice}>
        {CURRENCIES.NAIRA}
        {specialPrice}
      </h1>
    </div>
  );
};

export default KongaPrimeSubscriptionImgCard;
