import Icon from "Components/Icons";
import React from "react";
import styles from "./ProfileDetails.module.scss";

interface Props {
  governmentId: any;
  handleShowIdDetails: any;
  showIdDetails: boolean;
  kycIdStatusLabel: string;
  kycStatusLabelStyle: string;
}

const IdVerifcation: React.FunctionComponent<Props> = ({
  governmentId,
  handleShowIdDetails,
  showIdDetails,
  kycIdStatusLabel,
  kycStatusLabelStyle,
}) => {
  return (
    <>
      {governmentId && (
        <div className={styles.kycDetail} onClick={handleShowIdDetails}>
          <div className={styles.left}>
            <span className={showIdDetails === true ? styles.active : ""}>
              Identity Verification
            </span>
            <span className={kycStatusLabelStyle}>{kycIdStatusLabel}</span>
          </div>
          <Icon
            name={showIdDetails === true ? "chevronDownActive" : "arrowRight"}
          />
        </div>
      )}
      {showIdDetails && (
        <div className={styles.details}>
          <div className={styles.item}>
            <span>Government ID</span>
            <span className={styles.bold}>
              {governmentId && governmentId.id_type}
            </span>
          </div>
          <div className={styles.item}>
            <span>ID Number</span>
            <span className={styles.bold}>
              {governmentId && governmentId.id_number}
            </span>
          </div>
          <div className={styles.item}>
            <span>Expire Date</span>
            <span className={styles.bold}>
              {governmentId && governmentId.expiry_date.replace(/-/g, "/")}
            </span>
          </div>
          <div className={styles.item}>
            <span>Document Upload</span>
            <span className={styles.upload}>
              <a
                href={governmentId && governmentId.id_url}
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

export default IdVerifcation;
