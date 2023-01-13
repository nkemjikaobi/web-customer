import React from "react";
import styles from "./KongaPrimeInfoCard.module.scss";

/**
 * @param {*} props{
 * @param {string} icon This is the icon data
 * @param {string} content This is the content data
 * @param {heading} heading This is the heading data
 * }
 * @returns {div} This returns the KongaPrimeInfoCard
 */
function KongaPrimeInfoCard(props: any) {
  return (
    <div className={styles.KongaPrimeInfoCard}>
      <span className={styles.KongaPrimeInfoCard_Icon}>
        <img src={props.iconName} />
      </span>
      <div className={styles.KongaPrimeInfoCard_Info}>
        <h1>{props.heading}</h1>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default KongaPrimeInfoCard;
