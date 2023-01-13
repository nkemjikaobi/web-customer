import React, { Fragment, useState, useEffect } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./KycInformation.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Icons from "Components/Icons";
import { kpayClassic, kpayPremium } from "../../kycData";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Accounts Upgrade", Url: "/accounts/kyc" },
];

const classic = kpayClassic.map((classic) => (
  <div key={classic.id}>
    <div className="ms-4">
      <Icons name={classic.icon} />
      <span className={styles.item}>{classic.text}</span>
    </div>
  </div>
));
const premium = kpayPremium.map((premium) => (
  <div key={premium.id}>
    <div className="ms-4">
      <Icons name={premium.icon} />
      <span className={styles.item}>{premium.text}</span>
    </div>
  </div>
));

const KycInformation: React.FunctionComponent = () => {
  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>KongaPay Tier Level</h1>
          <div className={styles.tiersContainer}>
            <div className={styles.classic}>
              <div className="mt-4 ms-3 mb-4">
                <Icons name="yellowStar" /> <Icons name="yellowStar" />
              </div>
              <h2>KongaPay Classic</h2>
              <p>
                Transaction Limit of N10,000 per transaction/ Maximum Daily
                limit of N100,000 per day.
              </p>
              <h6>Basic Requirement</h6>
              {classic}
            </div>
            <div className={styles.premium}>
              <div className="mt-4 ms-3 mb-4">
                <Icons name="blueStar" /> <Icons name="blueStar" />{" "}
                <Icons name="blueStar" />
              </div>
              <h2>KongaPay Premium</h2>
              <p>
                Transaction Limit of N10,000 per transaction/ Maximum Daily
                limit of N100,000 per day.
              </p>
              <h6>Basic Requirement</h6>
              {premium}
            </div>
          </div>
          <div className={styles.btn}>
            {isMobile ? (
              <Link to="/account/kycmobile">
                <span>Get Started</span>
              </Link>
            ) : (
              <Link to="/account/kyc">
                <span>Get Started</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default KycInformation;
