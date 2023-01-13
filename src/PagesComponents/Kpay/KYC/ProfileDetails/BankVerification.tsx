import Icon from "Components/Icons";
import React from "react";
import styles from "./ProfileDetails.module.scss";

interface Props {
  bvn: any;
  bvnValue: any;
  personDetails: any;
  handleShowBankDetails: any;
  showBankDetails: boolean;
  kycIdStatusLabel: string;
  kycStatusLabelStyle: string;
}

const BankVerification: React.FunctionComponent<Props> = ({
  bvn,
  bvnValue,
  personDetails,
  handleShowBankDetails,
  showBankDetails,
  kycIdStatusLabel,
  kycStatusLabelStyle,
}) => {
  let kycBankStatusLabel = "";

  if (bvn && bvn !== null && personDetails.dob) {
    kycBankStatusLabel = "Verified";
    kycStatusLabelStyle = "verified";
  }
  return (
    <>
      {bvn && personDetails.dob && (
        <div className={styles.kycDetail} onClick={handleShowBankDetails}>
          <div className={styles.left}>
            <span className={showBankDetails === true ? styles.active : ""}>
              Bank Verification
            </span>
            <span
              className={
                kycBankStatusLabel === "Verified" ? styles.verified : ""
              }
            >
              {kycBankStatusLabel}
            </span>
          </div>
          <Icon
            name={showBankDetails === true ? "chevronDownActive" : "arrowRight"}
          />
        </div>
      )}
      {showBankDetails && (
        <div className={styles.details}>
          <div className={styles.item}>
            <span>BVN</span>
            <span className={styles.bold}>{bvnValue}</span>
          </div>
          <div className={styles.item}>
            <span>Date of Birth</span>
            <span className={styles.bold}>
              {personDetails && personDetails.dob.replace(/-/g, "/")}
            </span>
          </div>
          {/* <div className={styles.item}>
                <span>Document Upload</span>
                <span className={styles.upload}>View Document</span>
              </div> */}
        </div>
      )}
    </>
  );
};

export default BankVerification;
