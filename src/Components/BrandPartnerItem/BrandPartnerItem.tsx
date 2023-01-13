import React from "react";
import constants from "Helpers/cloudinaryConstants";
import styles from "./BrandPartnerItem.module.scss";
import Asset from "Components/Asset/asset";
import { Link } from "react-router-dom";
import { constant } from "lodash";

/**
 * Banner component
 * @param {Object}
 * @param {String} alternativeText alternative text
 * @param {String} href Image link
 * @param {String} name Link to the image
 * @returns {React.Component} Banner Component
 */

interface IProps {
  // eslint-disable-next-line react/require-default-props
  alternativeText?: string;
  brandImage: string;
  brandLogo: string;
  storeId: string;
}

const BrandPartnerItem: React.FunctionComponent<IProps> = ({
  alternativeText,
  brandLogo,
  brandImage,
  storeId,
}: IProps) => {
  return (
    <Link to={storeId}>
      <div className={styles.brandPartnerItem}>
        <div className={styles.brandLogo}>
          <img alt={"brand logo"} src={brandLogo} />
          {/* <Asset
          alt={alternativeText}
          name={image}
          type={cloudinaryConstants.asset.cloudinaryType}
        /> */}
        </div>
        <div className={styles.brandImage}>
          <img alt={alternativeText} src={brandImage} />
        </div>
      </div>
    </Link>
  );
};

export default BrandPartnerItem;
