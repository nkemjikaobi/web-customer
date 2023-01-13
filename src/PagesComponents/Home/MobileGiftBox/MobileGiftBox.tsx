import React from "react";
import styles from "./MobileGiftBox.module.scss";
import GiftBox from "Assets/images/giftbox.gif";

const MobileGiftBox: React.FunctionComponent = () => {
  return (
    <div className={styles.mobilePromoWrapper}>
      <div className={styles.mobilePromo}>
        <img src={GiftBox} />
      </div>
    </div>
  );
};

export default MobileGiftBox;
