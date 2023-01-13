import Icon from "Components/Icons";
import React from "react";
import styles from "./ProfileDetails.module.scss";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

interface Props {
  kycLevel: any;
}

const UpgradeKyc: React.FunctionComponent<Props> = ({ kycLevel }) => {
  return (
    <>
      {kycLevel !== null && kycLevel < 3 && (
        <div className={styles.upgradeKyc}>
          <div className={styles.info}>
            <Icon name="caution" />
            <p>Limited access, Please upgrade to Premium</p>
          </div>
          <div className={styles.upgradeBtnHolder}>
            <Link to={isMobile ? "/account/kycmobile" : "/account/kyc"}>
              <span className={styles.upgradeButton} role="button">
                Upgrade Account
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradeKyc;
