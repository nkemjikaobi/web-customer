import React from "react";
import Icon from "Components/Icons";
import styles from "./EmptyState.module.scss";

const EmptyState = () => {
  return (
    <div className={styles.container}>
      <h1>Profile Details</h1>
      <div className={styles.icon}>
        <Icon name="emptyProfile" />
      </div>
      <div className={styles.text}>
        <p>
          Something went wrong. Can’t fetch your data at the moment. Please try
          again later
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
