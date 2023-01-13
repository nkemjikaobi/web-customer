import Icon from "Components/Icons";
import React from "react";
import styles from "./ProfileDetails.module.scss";

interface Props {
  handleShowAddressDetails: any;
  showAddressDetails: boolean;
  kycStatusLabelStyle: string;
  addressDetails: any;
}

const AddressVerification: React.FunctionComponent<Props> = ({
  addressDetails,
  handleShowAddressDetails,
  showAddressDetails,
  kycStatusLabelStyle,
}) => {
  let kycBankStatusLabel = "";

  if (addressDetails) {
    kycBankStatusLabel = "Verified";
    kycStatusLabelStyle = "verified";
  }
  return (
    <>
      {addressDetails && (
        <div className={styles.kycDetail} onClick={handleShowAddressDetails}>
          <div className={styles.left}>
            <span className={showAddressDetails === true ? styles.active : ""}>
              Address Verification
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
            name={
              showAddressDetails === true ? "chevronDownActive" : "arrowRight"
            }
          />
        </div>
      )}

      {showAddressDetails && (
        <div className={styles.details}>
          <div className={styles.item}>
            <span>Utility Bill Type</span>
            <span className={styles.bold}>NEPA Bill</span>
          </div>
          <div className={styles.item}>
            <span>Address</span>
            <span className={styles.bold}>
              {`${addressDetails.street} ${addressDetails.lga} ${addressDetails.state}`}
            </span>
          </div>
          <div className={styles.item}>
            <span>Document Upload</span>
            <span className={styles.upload}>
              <a
                href={addressDetails.document_url}
                rel="nofollow
                noopener noreferrer"
                target="_blank"
              >
                View Document
              </a>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressVerification;
