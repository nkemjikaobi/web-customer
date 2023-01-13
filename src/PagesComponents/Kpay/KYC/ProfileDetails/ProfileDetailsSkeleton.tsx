import { composeClasses } from "libs/utils/utils";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./ProfileDetails.module.scss";

interface Props {
  kycLevel: number;
}
const ProfileDetailsSkeleton: React.FunctionComponent<Props> = ({
  kycLevel,
}) => {
  const styleHolders = [
    styles.customerTier,
    styles.customerTier2,
    styles.customerTier3,
  ];
  return (
    <div
      className={composeClasses(
        styles.profileSettings_profileDetails,
        styles.padding
      )}
    >
      <Skeleton height="25px" width="50%" />
      <div className={composeClasses("mt-4", styles.header)}>
        <div className={composeClasses("mb-4", styles.img)}>
          <div className={styles.icon}>
            <label htmlFor="icon">
              <Skeleton className="mt-3" />
            </label>
            <Skeleton className="mt-3" />
          </div>
        </div>
        {/* )} */}
        <Skeleton className={styles.accountNo} />
        <div className={styleHolders[kycLevel - 1]}>
          <div className={styles.staricons}>
            {[...Array(kycLevel)].map((e, i) => {
              return <Skeleton key={i} />;
            })}
          </div>
        </div>
      </div>
      <form className={composeClasses("mt-4", styles.profileDetailsForm)}>
        <div className={styles.formGroup}>
          <Skeleton />
          <Skeleton />
          <div className={styles.userInfo}>
            <div className={styles.input}>
              <Skeleton />
              <Skeleton />
            </div>

            <div className={styles.input}>
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>
        <div className={styles.kycDetailsContainer}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsSkeleton;
