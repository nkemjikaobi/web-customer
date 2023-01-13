import React from "react";
import Icon from "Components/Icons";
import styles from "./NoBeneficiary.module.scss";

const NoBeneficiary = () => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <Icon name="file" />
        <p>You do not have any saved beneficiary</p>
      </div>
      {/* <BeneficiaryInfocard styles={styles} /> */}
    </div>
  );
};

export default NoBeneficiary;
