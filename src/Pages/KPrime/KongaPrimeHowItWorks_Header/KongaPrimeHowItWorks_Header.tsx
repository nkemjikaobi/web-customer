import React from "react";
import KongaPrimeHowItWorks from "../KongaPrimeHowItWorks/KongaPrimeHowItWorks";
import styles from "./KongaPrimeHowItWorks_Header.module.scss";

/**
 *
 * @param {*} props This takes in the currentIndex props
 *  @returns {React.Component} Returns a react component (KongaPrimeHowItWorks) after the requred mapping
 */
function KongaPrimeHowItWorks_Header(props: any) {
  const navItems = props.kongaPrimePageData.howItWorks.map(
    (element: any, index: number) => (
      <KongaPrimeHowItWorks
        currentIndex={props.currentIndex}
        id={index}
        key={index + 2}
        switchToCurrent={props.switchToCurrent}
        title={element.title}
      />
    )
  );
  return <div className={styles.nav}>{navItems}</div>;
}

export default KongaPrimeHowItWorks_Header;
