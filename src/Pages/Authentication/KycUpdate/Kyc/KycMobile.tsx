/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./Kyc.module.scss";
import { kycData } from "../kycData";
import Icon from "Components/Icons";
import { Link } from "react-router-dom";
import { composeClasses } from "libs/utils/utils";

const KycPage: React.FunctionComponent = () => {
  const [active, setActive] = useState(1);

  const handleSetActive = (id: number) => {
    setActive(id);
  };

  const kycSteps = kycData.map((menuItem, i) => {
    return (
      <div
        className={styles.menuItem}
        key={i}
        onClick={() => handleSetActive(menuItem.id)}
      >
        <Link to={menuItem.route}>
          <div className={styles.menuItemLeft}>
            <div className={styles.left}>
              <Icon name={menuItem.icon} />
              <p>{menuItem.name}</p>
            </div>
            <Icon name="arrowRight" />
          </div>
        </Link>
      </div>
    );
  });
  return (
    <BasePageLayout
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div>
        <h1 className={composeClasses("ms-4 pt-4 mb-4", styles.header)}>
          Update KYC
        </h1>
        <div className={styles.container}>{kycSteps}</div>
      </div>
    </BasePageLayout>
  );
};

export default KycPage;
