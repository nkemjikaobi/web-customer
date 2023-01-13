import React from "react";
import Icon from "Components/Icons/icon";
import styles from "./addressCard.module.scss";

const addressCardMobile: React.FunctionComponent = () => {
  return (
    <div className={styles.addressCard}>
      <div className={styles.checkmanr}>-</div>
      <div>
        <h1 className={styles.name}>Akanni Oluwatobi</h1>
        <p>
          8 Karimu Street Agege lagos, Adealu Road, Dopemu, Agege, Lagos,
          Nigeria
        </p>
        <p>+23481281424</p>
      </div>
      <div>
        <a>Use This Address</a>
      </div>
    </div>
  );
};
export default addressCardMobile;
