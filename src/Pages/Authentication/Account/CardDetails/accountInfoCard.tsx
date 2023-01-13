import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import styles from "./accountInfoCard.module.scss";

interface Props {
  img?: string;
  accountNumber?: string;
  accountName?: string;
}

const ProfileSettings: React.FunctionComponent<Props> = ({
  img,
  accountNumber,
  accountName,
}) => {
  return (
    <Fragment>
      <div className={styles.accountInfoCard}>
        <div className={styles.accountInfoCard_left}>
          <div className={styles.img}>
            <img src={img} />
          </div>
          <div className={styles.accountDetails}>
            <p>{accountNumber}</p>
            <p>{accountName}</p>
          </div>
        </div>
        <div className={styles.accountInfoCard_right}>
          <Icon name="delete" />
        </div>
      </div>
    </Fragment>
  );
};

ProfileSettings.defaultProps = {
  img: "",
  accountName: "",
  accountNumber: "",
};
export default ProfileSettings;
