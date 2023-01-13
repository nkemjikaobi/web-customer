/* eslint-disable prettier/prettier */
import React from "react";
import Icon from "Components/Icons/index";
import styles from "./iconWrapper.module.scss";

const IconWrapper = ({ name }: { name: string }) => {
  return (
    <div className={styles.iconWrapper}>
      <div className={styles.img}>
        <Icon name={name} />
      </div>
    </div>
  );
};

export default IconWrapper;
