import React from "react";
import styles from "./KongaPrimeWorksInfo.module.scss";

/**
 * @param {props} props Takes in the required props
 *  @returns {React.Component} This returns react component
 */
const KongaPrimeWorksInfo = (props: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.textHeading}>
          <div className={styles.textHeading_text}>{props.number}</div>
        </div>
        <h1>{props.heading}</h1>
        <p>{props.content}</p>
      </div>
      <div className={styles.gif}>
        <img src={props.gif} />
      </div>
    </div>
  );
};

export default KongaPrimeWorksInfo;
