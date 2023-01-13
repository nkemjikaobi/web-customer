/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { Link } from "react-router-dom";
import MerchantProfileImg from "Assets/images/png/payMerchantImg.png";
import Icon from "Components/Icons/icon";
interface Props {
  styles: any;
}
const MerchantInfoCard: React.FunctionComponent<Props> = ({ styles }) => {
  return (
    <div className={styles.merchantInfoCard}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <img alt="this is an image" src={MerchantProfileImg} />
        </div>
        <p>Alabaster Juice</p>
      </div>
      <div className={styles.merchantInfo}>
        <Link to="#">
          <p>Pay</p>
        </Link>
      </div>
    </div>
  );
};

export default MerchantInfoCard;
