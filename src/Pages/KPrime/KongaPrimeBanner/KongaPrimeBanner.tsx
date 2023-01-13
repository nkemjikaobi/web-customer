import React from "react";

import styles from "./KongaPrimeBanner.module.scss";
import { Link } from "react-router-dom";

/**
 *
 * @param {*} props Takes in data for the mobile and desktop images
 */
function KongaPrimeBanner(props: any) {
  const desktopImg = props.desktopBannerData.map(
    (element: any, index: number) => (
      <div className={styles.bannerDesktop} key={index + 1}>
        <Link to={"/konga-prime"}>
          <img
            alt={element.alt}
            className={styles.bannerImage}
            key={index}
            src={element.name}
          />
        </Link>
      </div>
    )
  );

  const mobileImg = props.mobileBannerData.map(
    (element: any, index: number) => (
      <div className={styles.bannerMobile} key={index + 1}>
        <Link to={"/konga-prime"}>
          <img
            alt={element.alt}
            className={styles.bannerImage}
            key={index}
            src={element.name}
          />
        </Link>
      </div>
    )
  );

  return (
    <>
      {desktopImg}
      {mobileImg}
    </>
  );
}

export default KongaPrimeBanner;
