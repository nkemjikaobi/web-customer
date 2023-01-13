import Icons from "Components/Icons";
import React from "react";
import styles from "./MobilePromos.module.scss";

const MobilePromos = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Icons name="promoSettings" />
      </div>
      <p>
        Offers and promo will appear here when it’s available. Get notified when
        offers is available. Turn on your notifications.
      </p>
    </div>
  );
};

export default MobilePromos;
