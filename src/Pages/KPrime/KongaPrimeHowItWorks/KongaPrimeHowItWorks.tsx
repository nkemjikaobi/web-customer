import React from "react";
import styles from "./KongaPrimeHowitWorks.module.scss";

/**
 *
 * @param {*} props{
 * @param {number} currentIndex The current index of passed as props
 * @param {number} id The id of each element
 * @param {string} title
 * }
 * @returns {string} The title passed as props
 *
 */

function KongaPrimeHowItWorks({
  currentIndex,
  id,
  title,
  switchToCurrent,
}: any) {
  return (
    <div
      className={
        currentIndex === id
          ? [styles.container, styles.active].join(" ")
          : styles.container
      }
    >
      <h1 onClick={() => switchToCurrent(id)}>{title}</h1>
    </div>
  );
}
export default KongaPrimeHowItWorks;
